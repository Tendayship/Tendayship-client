import { http } from '../../../shared/api/request';
import type { HealthResponse } from '../model/types';

export function health() {
    return http.get<HealthResponse>('/health');
}
