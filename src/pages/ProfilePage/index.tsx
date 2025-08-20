import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { registerProfile, uploadProfileImage } from '../../api/userApi';
import type { UserProfilePayload } from '../../api/userApi';
=======
import Header from '../../shared/ui/Header';
import { updateProfile, uploadProfileImage } from '../../api/userApi';

// UserProfilePayload 타입 정의가 파일에 없어서 추가했습니다.
// 실제 프로젝트의 타입 정의에 맞게 수정해주세요.
interface UserProfilePayload {
    name: string;
    phone: string;
    birth_date: string;
}

>>>>>>> Stashed changes
import defaultProfileIcon from '../../assets/Iconwhite.svg';

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [userProfile, setUserProfile] = useState({
        name: '',
        dob: '', // YYMMDD 형식
        phone: '',
    });

    const [profileImage, setProfileImage] = useState<{
        file: File | null;
        preview: string;
    }>({
        file: null,
        preview: defaultProfileIcon,
    });

    const [errors, setErrors] = useState({
        name: false,
        dob: false,
        phone: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
    };

    const handleProfileImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // [수정] 유효성 검사 로직 강화
        const newErrors = {
            name: !userProfile.name,
            dob: !isValidDate(userProfile.dob),
            // 전화번호 형식 검사 (하이픈 제외하고 010으로 시작하는 11자리)
            phone: !/^010\d{8}$/.test(userProfile.phone.replace(/-/g, '')),
        };
        
        const hasError = Object.values(newErrors).some(Boolean);
        setErrors(newErrors);

        if (hasError) {
            if (newErrors.dob) {
                alert('생년월일 6자리가 유효한 날짜가 아닙니다.');
            } else if (newErrors.phone) {
                alert('전화번호 형식이 올바르지 않습니다. (예: 01012345678)');
            }
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';
            if (profileImage.file) {
                const response = await uploadProfileImage(profileImage.file);
                imageUrl = response.profile_image_url;
            }

            const { name, phone, dob } = userProfile;
            
            const yearPrefix = parseInt(dob.substring(0, 2), 10) > 50 ? '19' : '20';
            const birth_date = `${yearPrefix}${dob.substring(0, 2)}-${dob.substring(2, 4)}-${dob.substring(4, 6)}`;

            const profileData: UserProfilePayload = {
                name,
                phone,
                birth_date,
            };

            await updateProfile(profileData);
            
            alert('프로필이 성공적으로 등록되었습니다!');
            navigate('/family/create-name');
        } catch (error) {
            console.error('프로필 등록 실패:', error);
            alert('프로필 등록 중 오류가 발생했습니다. 입력한 정보를 다시 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] p-4">
            <div className="h-[800px] w-[500px] rounded-[15px] bg-[#FFF] p-[50px] text-center shadow-lg">
                <h1 className="mt-[-10px] mb-[20px] text-[32px] font-bold text-[#000]">
                    내 프로필 등록
                </h1>
                <p className="mb-[46px] text-[18px] font-medium text-[#6A6A6A]">
                    "소중한 이야기, 가족과 함께 이어드립니다."
                </p>

                {/* Profile Picture Section */}
                <div className="mb-[44px] flex justify-center">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={handleProfileImageClick}
                            className="flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full border-2 border-[#018941] bg-[#018941]"
                        >
                            <img
                                src={profileImage.preview}
                                alt="프로필 사진"
                                className="h-full w-full object-cover" // Ensures the preview image fills the circle
                            />
                        </button>
                        <div className="absolute -bottom-7 w-full text-center text-[14px] font-medium text-black">
                            프로필 사진
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*" // Only accept image files
                            className="hidden"
                        />
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col items-center"
                >
                    {/* Name Input Field */}
                    <div className="mb-[16px] w-[400px] text-left">
                        <label
                            htmlFor="name"
                            className="mb-[8px] block text-[16px] font-semibold text-[#000]"
                        >
                            이름
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름을 입력하세요"
                            className="h-[52px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none"
                            value={userProfile.name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <p
                            className={`mt-[4px] text-[14px] text-red-500 ${errors.name ? 'block' : 'hidden'}`}
                        >
                            이름을 입력해주세요.
                        </p>
                    </div>

                    {/* Date of Birth Input Field */}
                    <div className="mb-[16px] w-[400px] text-left">
                        <label
                            htmlFor="dob"
                            className="font-Pretandard mb-[8px] block text-[16px] text-[#000]"
                        >
                            생년월일
                        </label>
                        <input
                            type="text"
                            id="dob"
                            placeholder="6자리 (ex. 990102)"
                            className="h-[52px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none"
                            value={userProfile.dob}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            maxLength={6}
                        />
                        <p
                            className={`mt-[4px] text-[14px] text-red-500 ${errors.dob ? 'block' : 'hidden'}`}
                        >
                            생년월일 형식이 올바르지 않습니다.
                        </p>
                    </div>

                    {/* Phone Number Input Field */}
                    <div className="mb-[32px] w-[400px] text-left">
                        <label
                            htmlFor="phone"
                            className="font-Pretandard mb-[8px] block text-[16px] text-[#000]"
                        >
                            전화번호
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="전화번호를 입력하세요"
                            className="h-[52px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none"
                            value={userProfile.phone}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <p
                            className={`mt-[4px] text-[14px] text-red-500 ${errors.phone ? 'block' : 'hidden'}`}
                        >
                            전화번호를 입력해주세요.
                        </p>
                    </div>

                    <button
                        type="submit"
                        id="next-button"
                        className="h-[48px] w-[400px] rounded-[5px] bg-[#018941] text-[#FFF] transition-colors hover:bg-[#018941]/90 disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        <span className="font-Pretandard text-[20px]">
                            {isLoading ? '등록 중...' : '다음'}
                        </span>
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ProfilePage;
