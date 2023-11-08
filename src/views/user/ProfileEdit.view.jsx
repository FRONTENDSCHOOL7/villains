import React, { useEffect, useState, useRef } from 'react';
import { useRouteLoaderData } from 'react-router-dom'; 
import styled from 'styled-components';
import PageTemplate from '../../components/layout/PageTemplate';import { useRecoilValue, useRecoilState } from 'recoil';
import basicProfile from '../../assets/img/basic-profile.svg';
import { Input } from '../../components/default/Input.style';
import profileAtom from '../../atoms/profileAtom';
import FloatingButton from '../../components/default/FloatingButton.style';
import imageIcon from '../../assets/img/image-icon.svg';
import theme from '../../style/theme';
import ResizingTextarea from '../../components/feed/ResizingTextarea';
// import imgIcon from `../assets/img/image-icon.svg`

const ProfileEditPage = () => {
  const user = useRouteLoaderData('user');
  const myProfileInfo = useRecoilValue(profileAtom);

  const [name, setName] = useState(myProfileInfo.username);
  const [intro, setIntro] = useState(myProfileInfo?.intro ?? "");

  const fileInputRef = useRef();
  const [imagesData, setImagesData] = useState([]);
  
  const handleChangeName = (event) => {
    setName(event.target.value);
  }
  const handleChangeIntro = (event) => {
    setIntro(event.target.value);
  }

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    if (imagesData.length + files.length > 3) {
      alert('최대 3개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    try {
      const uploadedImageUrls = await postImages(files);
      setImagesData((prevData) => [...prevData, ...uploadedImageUrls]);
    } catch (error) {
      console.error('이미지 업로드에 실패했습니다:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <PageTemplate>
      <ImgSection>
        <ProfileImg src={basicProfile} alt="프로필 이미지" />
        <InsertImageBtn htmlFor="file">
          <FloatingButton img={imageIcon} type="button" onClick={triggerFileInput} style={{
            top: `180px`, bottom: `auto`, right: `calc(50% - 50px)`
          }} />
        </InsertImageBtn>
        <InputFile
          ref={fileInputRef}
          type="file"
          id="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </ImgSection>

<InputSection>
          <Label>사용자 이름
          <Input placeholder="2~10자 이내" value={name} onChange={handleChangeName}/>
          </Label>
  
          <Label>소개
          <ResizingTextarea placeholder="자기소개" value={intro} onChange={handleChangeIntro} />
          </Label>
</InputSection>
    </PageTemplate>
  );
};

export default ProfileEditPage;

const ImgSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin: 0 auto;
  width: 100%;
`;
const InputSection = styled.section`
  width: 100%;
  padding: 34px;
`;

const ProfileImg = styled.img`
  max-width: 100%;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 30px;
`;

const InsertImageBtn = styled.label`
  width: 50px;
  height: 50px;
  z-index: 10;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label`
  font-size: ${theme.fontSize.caption};
  color: ${theme.color.grey};
  &, input {
    display: block;
    padding: 10px 0 ;
    width: 100%;
  }
`;