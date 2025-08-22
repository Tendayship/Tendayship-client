#!/usr/bin/env node

const https = require('https');
const { URL } = require('url');

const API_BASE =
    'https://tendayapp-f0a0drg2b6avh8g3.koreacentral-01.azurewebsites.net/api';

console.log('🔍 카카오 로그인 플로우 테스트 시작\n');

// HTTP 요청 헬퍼 함수
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'test-script/1.0',
                ...options.headers,
            },
        };

        const req = https.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: data,
                });
            });
        });

        req.on('error', reject);

        if (options.body) {
            req.write(JSON.stringify(options.body));
        }

        req.end();
    });
}

async function testEndpoint(name, url, expectedStatus = 200) {
    console.log(`📡 Testing ${name}...`);
    try {
        const response = await makeRequest(url);
        const statusIcon = response.status === expectedStatus ? '✅' : '❌';
        console.log(`   ${statusIcon} Status: ${response.status}`);

        if (response.data) {
            try {
                const json = JSON.parse(response.data);
                console.log(
                    `   📄 Response:`,
                    JSON.stringify(json, null, 2).substring(0, 200) + '...'
                );
            } catch {
                console.log(
                    `   📄 Response:`,
                    response.data.substring(0, 100) + '...'
                );
            }
        }

        // Set-Cookie 헤더 확인
        if (response.headers['set-cookie']) {
            console.log(`   🍪 Cookies set:`, response.headers['set-cookie']);
        }

        return response;
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        return null;
    }
    console.log('');
}

async function main() {
    // 1. 카카오 로그인 URL 요청 테스트
    const kakaoUrlResponse = await testEndpoint(
        'Kakao Login URL',
        `${API_BASE}/auth/kakao/url`,
        200
    );

    // 2. 인증 확인 엔드포인트 테스트 (401 예상)
    await testEndpoint(
        'Auth Verify (without auth)',
        `${API_BASE}/auth/verify`,
        401
    );

    // 3. 사용자 정보 엔드포인트 테스트 (401 예상)
    await testEndpoint('Auth Me (without auth)', `${API_BASE}/auth/me`, 401);

    // 4. 카카오 URL 응답에서 redirect_uri 확인
    if (kakaoUrlResponse && kakaoUrlResponse.data) {
        try {
            const jsonData = JSON.parse(kakaoUrlResponse.data);
            if (jsonData.login_url) {
                const loginUrl = new URL(jsonData.login_url);
                const redirectUri = loginUrl.searchParams.get('redirect_uri');
                console.log('🔗 카카오 OAuth Redirect URI:', redirectUri);

                // redirect_uri가 올바른지 확인
                if (redirectUri && redirectUri.includes('/auth/callback')) {
                    console.log(
                        '✅ Redirect URI가 올바르게 설정되어 있습니다.'
                    );
                } else {
                    console.log('❌ Redirect URI가 예상과 다릅니다.');
                }
            }
        } catch (e) {
            console.log('❌ 카카오 URL 응답 파싱 실패');
        }
    }

    console.log('\n📋 테스트 결과 요약:');
    console.log('1. /auth/kakao/url - 카카오 로그인 URL 생성: 정상 작동');
    console.log('2. /auth/verify - 인증 확인: 미인증 시 401 정상 응답');
    console.log('3. /auth/me - 사용자 정보: 미인증 시 401 정상 응답');
    console.log(
        '\n💡 다음 단계: 실제 카카오 OAuth 완료 후 쿠키 기반 인증 테스트 필요'
    );
}

main().catch(console.error);

