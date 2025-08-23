import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import {
  setupFamilyGroup,
  getMyGroupDetails,
  validateInviteCode,
  deleteMyGroup,
  joinGroupByCode,
  registerRecipient,
  preparePayment,
  type FamilyGroupSetupPayload,
  type RecipientPayload,
  type JoinGroupPayload
} from '../familyApi';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('familyApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('setupFamilyGroup', () => {
    it('should create family group successfully', async () => {
      const mockPayload: FamilyGroupSetupPayload = {
        group_name: 'Test Family',
        deadline_type: 'SECOND_SUNDAY',
        leader_relationship: 'DAUGHTER',
        recipient_name: 'Test Recipient',
        recipient_address: 'Test Address',
        recipient_address_detail: 'Test Detail',
        recipient_postal_code: '12345',
        recipient_phone: '010-1234-5678'
      };

      const mockResponse = {
        data: {
          message: '가족 그룹이 성공적으로 생성되었습니다',
          group: {
            id: 'test-group-id',
            group_name: 'Test Family',
            invite_code: 'ABCD1234',
            deadline_type: 'SECOND_SUNDAY',
            status: 'ACTIVE'
          },
          recipient: {
            id: 'test-recipient-id',
            name: 'Test Recipient',
            address: 'Test Address'
          },
          issue: {
            id: 'test-issue-id',
            issue_number: 1,
            deadline_date: '2024-02-11',
            status: 'OPEN'
          }
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await setupFamilyGroup(mockPayload);

      expect(mockedAxios.post).toHaveBeenCalledWith('/family/setup', mockPayload);
      expect(result).toEqual(mockResponse.data);
      expect(result.group.group_name).toBe('Test Family');
      expect(result.recipient.name).toBe('Test Recipient');
    });

    it('should handle setup failure', async () => {
      const mockPayload: FamilyGroupSetupPayload = {
        group_name: 'Test Family',
        deadline_type: 'SECOND_SUNDAY',
        leader_relationship: 'DAUGHTER',
        recipient_name: 'Test Recipient',
        recipient_address: 'Test Address',
        recipient_address_detail: 'Test Detail',
        recipient_postal_code: '12345',
        recipient_phone: '010-1234-5678'
      };

      mockedAxios.post.mockRejectedValue(new Error('Setup failed'));

      await expect(setupFamilyGroup(mockPayload)).rejects.toThrow('Setup failed');
      expect(mockedAxios.post).toHaveBeenCalledWith('/family/setup', mockPayload);
    });
  });

  describe('getMyGroupDetails', () => {
    it('should retrieve group details successfully', async () => {
      const mockResponse = {
        data: {
          id: 'test-group-id',
          group_name: 'Test Family',
          invite_code: 'ABCD1234',
          deadline_type: 'SECOND_SUNDAY',
          status: 'ACTIVE',
          created_at: '2024-01-01T00:00:00Z',
          member_count: 3,
          current_issue: {
            id: 'test-issue-id',
            issue_number: 1,
            deadline_date: '2024-02-11',
            status: 'OPEN'
          }
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMyGroupDetails();

      expect(mockedAxios.get).toHaveBeenCalledWith('/family/my-group');
      expect(result).toEqual(mockResponse.data);
      expect(result.member_count).toBe(3);
    });
  });

  describe('validateInviteCode', () => {
    it('should validate invite code successfully', async () => {
      const mockResponse = {
        data: {
          valid: true,
          group_name: 'Test Family',
          member_count: 2
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await validateInviteCode('ABCD1234');

      expect(mockedAxios.get).toHaveBeenCalledWith('/members/validate-invite/ABCD1234');
      expect(result.valid).toBe(true);
      expect(result.group_name).toBe('Test Family');
    });

    it('should handle invalid invite code', async () => {
      const mockResponse = {
        data: {
          valid: false
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await validateInviteCode('INVALID');

      expect(result.valid).toBe(false);
      expect(result.group_name).toBeUndefined();
    });
  });

  describe('joinGroupByCode', () => {
    it('should join group successfully', async () => {
      const mockPayload: JoinGroupPayload = {
        inviteCode: 'ABCD1234',
        relationship: 'SON'
      };

      const mockResponse = {
        data: {
          groupId: 'test-group-id',
          groupName: 'Test Family',
          message: '그룹에 성공적으로 가입했습니다'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await joinGroupByCode(mockPayload);

      expect(mockedAxios.post).toHaveBeenCalledWith('/members/join', mockPayload);
      expect(result.groupName).toBe('Test Family');
    });
  });

  describe('registerRecipient', () => {
    it('should register recipient successfully', async () => {
      const mockPayload: RecipientPayload = {
        name: 'Test Recipient',
        postcode: '12345',
        detailAddress: 'Test Detail Address',
        phoneNumber: '010-1234-5678'
      };

      mockedAxios.post.mockResolvedValue({});

      await registerRecipient('test-group-id', mockPayload);

      expect(mockedAxios.post).toHaveBeenCalledWith('/family/test-group-id/recipient', mockPayload);
    });
  });

  describe('deleteMyGroup', () => {
    it('should delete group successfully', async () => {
      const mockResponse = {
        data: {
          message: '가족 그룹이 완전히 삭제되었습니다',
          subscription_cancel: {
            cancelled: true,
            subscription_id: 'test-sub-id',
            payment_cancel_status: 'SUCCESS',
            refund_amount: 6900,
            reason: 'USER_CANCEL'
          },
          subscription_deleted: true,
          pending_books_count: 0
        }
      };

      mockedAxios.delete.mockResolvedValue(mockResponse);

      const result = await deleteMyGroup(true);

      expect(mockedAxios.delete).toHaveBeenCalledWith('/family/my-group', { params: { force: true } });
      expect(result.message).toBe('가족 그룹이 완전히 삭제되었습니다');
      expect(result.subscription_deleted).toBe(true);
    });
  });

  describe('preparePayment', () => {
    it('should prepare payment successfully', async () => {
      const mockResponse = {
        data: {
          tid: 'test-tid',
          next_redirect_pc_url: 'https://test.com/pc',
          next_redirect_mobile_url: 'https://test.com/mobile',
          partner_order_id: 'test-order-id'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await preparePayment();

      expect(mockedAxios.post).toHaveBeenCalledWith('/subscription/payment/ready', {});
      expect(result.tid).toBe('test-tid');
    });
  });
});