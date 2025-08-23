// src/api/issuesApi.ts

import axiosInstance from '../shared/api/axiosInstance';

// Issue 관련 타입 정의
export interface Issue {
    id: string;
    issue_number: number;
    deadline_date: string;
    status: 'OPEN' | 'CLOSED';
    days_until_deadline: number;
    created_at: string;
}

export interface CurrentIssueResponse {
    current_issue: Issue;
    group_id: string;
}

export interface CreateIssuePayload {
    group_id: string;
    issue_number: number;
    deadline_date: string;
    status: 'OPEN' | 'CLOSED';
}

export interface IssuesListResponse {
    issues: Issue[];
    total_count: number;
}

// 현재 회차 조회
export const getCurrentIssue = async (): Promise<CurrentIssueResponse> => {
    const response = await axiosInstance.get<CurrentIssueResponse>('/issues/current');
    return response.data;
};

// 그룹의 모든 회차 조회
export const getIssues = async (): Promise<IssuesListResponse> => {
    const response = await axiosInstance.get<IssuesListResponse>('/issues/');
    return response.data;
};

// 새 회차 생성 (리더만 가능)
export const createIssue = async (payload: CreateIssuePayload): Promise<Issue> => {
    const response = await axiosInstance.post<Issue>('/issues/create', payload);
    return response.data;
};

// 특정 회차 조회
export const getIssue = async (issueId: string): Promise<Issue> => {
    const response = await axiosInstance.get<Issue>(`/issues/${issueId}`);
    return response.data;
};

// 회차 상태 업데이트 (리더만 가능)
export const updateIssueStatus = async (
    issueId: string, 
    status: 'OPEN' | 'CLOSED'
): Promise<Issue> => {
    const response = await axiosInstance.put<Issue>(`/issues/${issueId}/status`, { status });
    return response.data;
};