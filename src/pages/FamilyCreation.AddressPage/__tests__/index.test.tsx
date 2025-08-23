import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AddressPage from '../index';
import { registerRecipient } from '../../../api/familyApi';

// Mock the APIs and dependencies
vi.mock('../../../api/familyApi');
vi.mock('../../../shared/ui/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));
vi.mock('../../../widgets/ProgressIndicator', () => ({
  default: ({ stepData }: { stepData: Array<{ number: number; isActive: boolean; isCompleted: boolean }> }) => (
    <div data-testid="progress-indicator">
      {stepData.map((step) => (
        <div key={step.number} data-testid={`step-${step.number}`}>
          Step {step.number} - {step.isActive ? 'active' : step.isCompleted ? 'completed' : 'pending'}
        </div>
      ))}
    </div>
  )
}));

// Mock react-daum-postcode
interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

vi.mock('react-daum-postcode', () => ({
  default: ({ onComplete }: { onComplete: (data: DaumPostcodeData) => void }) => (
    <div data-testid="daum-postcode">
      <button
        onClick={() => onComplete({
          address: 'Test Address',
          addressType: 'R',
          bname: 'Test Bname',
          buildingName: 'Test Building',
          zonecode: '12345'
        })}
        data-testid="select-address"
      >
        Select Address
      </button>
    </div>
  )
}));

// Mock useNavigate and useParams
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ groupId: 'test-group-id' })
  };
});

const mockedRegisterRecipient = vi.mocked(registerRecipient);

describe('AddressPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.alert
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderAddressPage = () => {
    return render(
      <MemoryRouter>
        <AddressPage />
      </MemoryRouter>
    );
  };

  it('should render all form fields correctly', () => {
    renderAddressPage();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(screen.getByLabelText(/받는 분/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/우편 번호/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/주소/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/연락처/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /우편 번호 찾기/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /등록/i })).toBeInTheDocument();
  });

  it('should render progress indicator with correct step data', () => {
    renderAddressPage();

    expect(screen.getByTestId('step-1')).toHaveTextContent('Step 1 - completed');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Step 2 - active');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Step 3 - pending');
  });

  it('should update input values when user types', () => {
    renderAddressPage();

    const nameInput = screen.getByLabelText(/받는 분/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/연락처/i) as HTMLInputElement;
    const addressInput = screen.getByLabelText(/주소/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(phoneInput, { target: { value: '010-1234-5678' } });
    fireEvent.change(addressInput, { target: { value: 'Test Detail Address' } });

    expect(nameInput.value).toBe('Test Name');
    expect(phoneInput.value).toBe('010-1234-5678');
    expect(addressInput.value).toBe('Test Detail Address');
  });

  it('should open postcode modal when clicking address search button', () => {
    renderAddressPage();

    const searchButton = screen.getByRole('button', { name: /우편 번호 찾기/i });
    fireEvent.click(searchButton);

    expect(screen.getByTestId('daum-postcode')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /닫기/i })).toBeInTheDocument();
  });

  it('should update address fields when selecting address from postcode modal', () => {
    renderAddressPage();

    const searchButton = screen.getByRole('button', { name: /우편 번호 찾기/i });
    fireEvent.click(searchButton);

    const selectAddressButton = screen.getByTestId('select-address');
    fireEvent.click(selectAddressButton);

    const postcodeInput = screen.getByLabelText(/우편 번호/i) as HTMLInputElement;
    const addressInput = screen.getByLabelText(/주소/i) as HTMLInputElement;

    expect(postcodeInput.value).toBe('12345');
    expect(addressInput.value).toBe('Test Address (Test Bname, Test Building)');
  });

  it('should close postcode modal when clicking close button', () => {
    renderAddressPage();

    const searchButton = screen.getByRole('button', { name: /우편 번호 찾기/i });
    fireEvent.click(searchButton);

    expect(screen.getByTestId('daum-postcode')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /닫기/i });
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('daum-postcode')).not.toBeInTheDocument();
  });

  it('should show alert when submitting with empty fields', async () => {
    renderAddressPage();

    const submitButton = screen.getByRole('button', { name: /등록/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('모든 정보를 입력해주세요.');
    });

    expect(mockedRegisterRecipient).not.toHaveBeenCalled();
  });

  it('should show alert when groupId is missing', async () => {
    // Mock useParams to return undefined groupId
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ groupId: undefined })
      };
    });

    renderAddressPage();

    // Fill all fields
    fireEvent.change(screen.getByLabelText(/받는 분/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/연락처/i), { target: { value: '010-1234-5678' } });
    fireEvent.change(screen.getByLabelText(/주소/i), { target: { value: 'Test Address' } });

    // Open postcode modal and select address
    fireEvent.click(screen.getByRole('button', { name: /우편 번호 찾기/i }));
    fireEvent.click(screen.getByTestId('select-address'));

    const submitButton = screen.getByRole('button', { name: /등록/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('잘못된 접근입니다. 그룹 ID가 없습니다.');
    });

    expect(mockedRegisterRecipient).not.toHaveBeenCalled();
  });

  it('should submit successfully with all fields filled', async () => {
    mockedRegisterRecipient.mockResolvedValue();

    renderAddressPage();

    // Fill all fields
    fireEvent.change(screen.getByLabelText(/받는 분/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/연락처/i), { target: { value: '010-1234-5678' } });
    fireEvent.change(screen.getByLabelText(/주소/i), { target: { value: 'Test Address Detail' } });

    // Open postcode modal and select address
    fireEvent.click(screen.getByRole('button', { name: /우편 번호 찾기/i }));
    fireEvent.click(screen.getByTestId('select-address'));

    const submitButton = screen.getByRole('button', { name: /등록/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedRegisterRecipient).toHaveBeenCalledWith('test-group-id', {
        name: 'Test Name',
        postcode: '12345',
        detailAddress: 'Test Address (Test Bname, Test Building)',
        phoneNumber: '010-1234-5678'
      });
    });

    expect(window.alert).toHaveBeenCalledWith('주소 정보가 성공적으로 등록되었습니다!');
    expect(mockNavigate).toHaveBeenCalledWith('/family/create-complete/test-group-id');
  });

  it('should handle registration error', async () => {
    mockedRegisterRecipient.mockRejectedValue(new Error('Registration failed'));

    renderAddressPage();

    // Fill all fields
    fireEvent.change(screen.getByLabelText(/받는 분/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/연락처/i), { target: { value: '010-1234-5678' } });
    fireEvent.change(screen.getByLabelText(/주소/i), { target: { value: 'Test Address Detail' } });

    // Open postcode modal and select address
    fireEvent.click(screen.getByRole('button', { name: /우편 번호 찾기/i }));
    fireEvent.click(screen.getByTestId('select-address'));

    const submitButton = screen.getByRole('button', { name: /등록/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('주소 등록 중 오류가 발생했습니다.');
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should show loading state during submission', async () => {
    mockedRegisterRecipient.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderAddressPage();

    // Fill all fields
    fireEvent.change(screen.getByLabelText(/받는 분/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/연락처/i), { target: { value: '010-1234-5678' } });
    fireEvent.change(screen.getByLabelText(/주소/i), { target: { value: 'Test Address Detail' } });

    // Open postcode modal and select address
    fireEvent.click(screen.getByRole('button', { name: /우편 번호 찾기/i }));
    fireEvent.click(screen.getByTestId('select-address'));

    const submitButton = screen.getByRole('button', { name: /등록/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /등록 중.../i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /등록/i })).toBeInTheDocument();
    });
  });
});