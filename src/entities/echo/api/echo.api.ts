import { http } from '../../../shared/api/request';
import type {
    EchoRequest,
    EchoResponse,
    HealthResponse,
} from '../model/types';

export function health() {
    return http.get<HealthResponse>('/health');
}

export function echo(body: EchoRequest) {
    return http.post<EchoResponse, EchoRequest>(
        '/echo',
        body
    );
}
