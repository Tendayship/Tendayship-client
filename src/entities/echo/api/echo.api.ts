import { http } from '../../../shared/api/request';
import type {
    EchoRequest,
    EchoResponse,
    HealthResponse,
} from '../model/types';

export function ping() {
    return http.get<HealthResponse>('/ping');
}

export function echo(body: EchoRequest) {
    return http.post<EchoResponse, EchoRequest>(
        '/echo',
        body
    );
}
