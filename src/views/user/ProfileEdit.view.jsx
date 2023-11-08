import React, { useEffect, useState, useRef } from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTemplate from '../../components/layout/PageTemplate';
import { useRecoilValue, useRecoilState } from 'recoil';
import basicProfile from '../../assets/img/basic-profile.svg';
import { Input } from '../../components/default/Input.style';
import profileAtom from '../../atoms/profileAtom';
import FloatingButton from '../../components/default/FloatingButton.style';
import imageIcon from '../../assets/img/image-icon.svg';
import theme from '../../style/theme';
import ResizingTextarea from '../../components/feed/ResizingTextarea';
import triggerAtom from '../../atoms/tirggerAtom';
import updateUser from '../../api/update/updateUser.api';
import pageUrlConfig from '../../config/pageUrlConfig';
import postImage from '../../api/post/postImage.api';
// import imgIcon from `../assets/img/image-icon.svg`

const ProfileEditPage = () => {
  const user = useRouteLoaderData('user');
  const [myProfileInfo, setMyProfileInfo] = useRecoilState(profileAtom);

  const [name, setName] = useState(myProfileInfo.username);
  const [intro, setIntro] = useState(myProfileInfo?.intro ?? '');
  const [image, setImage] = useState({
    file: '',
    url: myProfileInfo?.image ?? 'https://api.mandarin.weniv.co.kr/Ellipse.png',
  });

  const [saveContents, setSaveContetns] = useRecoilState(triggerAtom);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeIntro = (event) => {
    setIntro(event.target.value);
  };
  const navigate = useNavigate();

  useEffect(async () => {
    const urls = image.file ? await postImage(image.file) : image.url;
    const newInfo = {
      user: {
        username: name,
        intro: intro,
        image: urls,
      },
    };
    console.log(newInfo);
    if (saveContents) {
      updateUser(newInfo, user.token)
        .then((result) => {
          navigate(`${pageUrlConfig.profilePage}/${user.accountname}`, { state: newInfo });
        })
        .catch((error) => {
          alert('이미 사용 중인 이름입니다');
          console.error(error);
        });
      setSaveContetns(false);
    }
  }, [saveContents]);

  let inputRef;

  const handleSaveImage = async (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        file: e.target.files[0],
        url: fileReader.result,
      });
    };
  };

  // const handleImageChange = async (event) => {
  //   try {
  //     const urls = image.file ? await postImage(image.file) : image.url;
  //     console.log(uploadedImageUrls);
  //     setImagesData((prevData) => [...prevData, ...uploadedImageUrls]);
  //   } catch (error) {
  //     console.error('이미지 업로드에 실패했습니다:', error);
  //   }
  // };

  const triggerFileInput = (e) => {
    e.preventDefault();
    inputRef.click();
  };
  return (
    <PageTemplate>
      <ImgSection>
        <ProfileImg
          src={
            image.url === 'http://146.56.183.55:5050/Ellipse.png'
              ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
              : image.url
          }
          alt="프로필 이미지"
        />
        <InsertImageBtn htmlFor="file">
          <FloatingButton
            img={imageIcon}
            type="button"
            onClick={triggerFileInput}
            style={{
              top: `180px`,
              bottom: `auto`,
              right: `calc(50% - 50px)`,
            }}
          />
        </InsertImageBtn>
        <InputFile
          ref={(refParam) => (inputRef = refParam)}
          type="file"
          id="file"
          accept="image/*"
          multiple
          onChange={handleSaveImage}
        />
      </ImgSection>

      <InputSection>
        <Label>
          사용자 이름
          <Input placeholder="2~10자 이내" value={name} onChange={handleChangeName} />
        </Label>

        <Label>
          소개
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 30px;
  object-fit: cover;
`;

const InsertImageBtn = styled.label`
  z-index: 10;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label`
  font-size: ${theme.fontSize.caption};
  color: ${theme.color.grey};
  &,
  input {
    display: block;
    padding: 10px 0;
    width: 100%;
  }
`;
