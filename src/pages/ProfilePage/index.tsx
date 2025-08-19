import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/ui/Header';
import { registerProfile, uploadProfileImage, UserProfilePayload } from '../../api/userApi'; 

import defaultProfileIcon from '../../assets/Iconwhite.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);


<<<<<<< Updated upstream
  const [userProfile, setUserProfile] = useState<Omit<UserProfilePayload, 'profileImageUrl'>>({
    name: '',
    dob: '',
    phone: '',
  });
=======
    const [profileImage, setProfileImage] = useState<{
        file: File | null;
        preview: string;
    }>({
        file: null,
        preview: defaultProfileIcon,
    });
>>>>>>> Stashed changes


<<<<<<< Updated upstream
  const [profileImage, setProfileImage] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: "/path/to/humanIconwhite.svg", // Default icon path
  });


  const [errors, setErrors] = useState({
    name: false,
    dob: false,
    phone: false,
  });

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Handles changes for text inputs (name, dob, phone)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserProfile(prevProfile => ({ ...prevProfile, [id]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [id]: false }));
  };

  // Triggers the hidden file input when the profile picture button is clicked
  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handles the file selection for the profile image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { 
      name: !userProfile.name, 
      dob: !/^\d{6}$/.test(userProfile.dob), 
      phone: !userProfile.phone 
=======
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
>>>>>>> Stashed changes
    };
    const hasError = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);

<<<<<<< Updated upstream
    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = '';
      // 1. If a profile image file is selected, upload it first.
      if (profileImage.file) {
        // The API function `uploadProfileImage` would take the file and return the URL.
        const response = await uploadProfileImage(profileImage.file);
        imageUrl = response.profile_image_url; // Assuming the API returns an object with the URL
      }
=======
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
>>>>>>> Stashed changes

      // 2. Prepare the final payload with the image URL.
      const finalProfilePayload: UserProfilePayload = {
        ...userProfile,
        profileImageUrl: imageUrl,
      };

      // 3. Register the user's profile with all data.
      await registerProfile(finalProfilePayload);

      alert('프로필이 성공적으로 등록되었습니다!');
      navigate('/family/create'); // Navigate to the next page on success.

<<<<<<< Updated upstream
    } catch (error) {
      console.error('프로필 등록 실패:', error);
      alert('프로필 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false); // Stop loading, whether success or failure.
    }
  };

  return (
    <div className="bg-[#F1F1F1] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#FFF] w-[500px] h-[800px] p-[50px] text-center rounded-[15px] shadow-lg">
          <h1 className="text-[32px] text-[#000] mt-[-10px] mb-[20px] font-bold">내 프로필 등록</h1>
          <p className="text-[#6A6A6A] text-[18px] mb-[46px] font-medium">"소중한 이야기, 가족과 함께 이어드립니다."</p>
          
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-[44px]">
            <div className="relative">
              <button 
                type="button" 
                onClick={handleProfileImageClick}
                className="w-[150px] h-[150px] rounded-full bg-[#018941] border-2 border-[#018941] flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={profileImage.preview} 
                  alt="프로필 사진" 
                  className="w-full h-full object-cover" // Ensures the preview image fills the circle
                />
              </button>
              <div className="absolute -bottom-7 w-full text-center text-[14px] font-medium text-black">프로필 사진</div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange}
                accept="image/*" // Only accept image files
                className="hidden" 
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            {/* Name Input Field */}
            <div className="w-[400px] text-left mb-[16px]">
              <label htmlFor="name" className="block text-[16px] text-[#000] font-semibold mb-[8px]">이름</label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                className="w-full h-[52px] p-[16px] bg-[#F1F1F1] rounded-[5px] text-[16px] focus:outline-none focus:border-[#018941]"
                value={userProfile.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <p className={`text-red-500 text-[14px] mt-[4px] ${errors.name ? 'block' : 'hidden'}`}>이름을 입력해주세요.</p>
            </div>
            
            {/* Date of Birth Input Field */}
            <div className="w-[400px] text-left mb-[16px]">
              <label htmlFor="dob" className="block text-[16px] text-[#000] font-Pretandard mb-[8px]">생년월일</label>
              <input
                type="text"
                id="dob"
                placeholder="6자리 (ex. 990102)"
                className="w-full h-[52px] p-[16px] bg-[#F1F1F1] rounded-[5px] text-[16px] focus:outline-none focus:border-[#018941]"
                value={userProfile.dob}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength={6}
              />
              <p className={`text-red-500 text-[14px] mt-[4px] ${errors.dob ? 'block' : 'hidden'}`}>생년월일 형식이 올바르지 않습니다.</p>
            </div>
            
            {/* Phone Number Input Field */}
            <div className="w-[400px] text-left mb-[32px]">
              <label htmlFor="phone" className="block text-[16px] text-[#000] font-Pretandard mb-[8px]">전화번호</label>
              <input
                type="text"
                id="phone"
                placeholder="전화번호를 입력하세요"
                className="w-full h-[52px] p-[16px] bg-[#F1F1F1] rounded-[5px] text-[16px] focus:outline-none focus:border-[#018941]"
                value={userProfile.phone}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <p className={`text-red-500 text-[14px] mt-[4px] ${errors.phone ? 'block' : 'hidden'}`}>전화번호를 입력해주세요.</p>
            </div>
            
            <button
              type="submit"
              id="next-button"
              className="bg-[#018941] text-[#FFF] w-[400px] h-[48px] rounded-[5px] hover:bg-[#018941]/90 transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              <span className="text-[20px] font-Pretandard">
                {isLoading ? '등록 중...' : '다음'}
              </span>
            </button>
          </form>
=======
        try {
            let imageUrl = '';
            if (profileImage.file) {
                const response = await uploadProfileImage(profileImage.file);
                imageUrl = response.profile_image_url;
            }

            const finalProfilePayload: UserProfilePayload = {
                ...userProfile,
                profileImageUrl: imageUrl,
            };

            await registerProfile(finalProfilePayload);

            alert('프로필이 성공적으로 등록되었습니다!');
            navigate('/family/create');
        } catch (error) {
            console.error('프로필 등록 실패:', error);
            alert('프로필 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F1F1F1]">
            <Header />
            <main className="flex flex-grow items-center justify-center p-4">
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

                                    className={
                                        profileImage.file
                                            ? 'h-full w-full object-cover'
                                            : 'h-[60px] w-[60px]'
                                    }
                                />
                            </button>
                            <div className="absolute -bottom-7 w-full text-center text-[14px] font-medium text-black">
                                프로필 사진
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
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

                                className="h-[48px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none focus:ring-0"
                                value={userProfile.name}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <p
                                className={`mt-[4px] text-[14px] text-red-500 ${
                                    errors.name ? 'block' : 'hidden'
                                }`}
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

                                className="h-[48px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none focus:ring-0"
                                value={userProfile.dob}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                maxLength={6}
                            />
                            <p
                                className={`mt-[4px] text-[14px] text-red-500 ${
                                    errors.dob ? 'block' : 'hidden'
                                }`}
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

                                className="h-[48px] w-full rounded-[5px] bg-[#F1F1F1] p-[16px] text-[16px] focus:border-[#018941] focus:outline-none focus:ring-0"
                                value={userProfile.phone}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <p
                                className={`mt-[4px] text-[14px] text-red-500 ${
                                    errors.phone ? 'block' : 'hidden'
                                }`}
                            >
                                전화번호를 입력해주세요.
                            </p>
                        </div>

                        <button
                            type="submit"
                            id="next-button"

                            className="h-[48px] w-[400px] rounded-[5px] bg-[#018941] text-[#FFF] transition-colors hover:bg-[#018941]/90 focus:outline-none focus:ring-0 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            <span className="font-Pretandard text-[20px]">
                                {isLoading ? '등록 중...' : '다음'}
                            </span>
                        </button>
                    </form>
                </div>
            </main>
>>>>>>> Stashed changes
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;