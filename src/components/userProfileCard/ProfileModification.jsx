import React from 'react';

const ProfileModification = () => {
  return (
    <>
      <div>Header</div>
      <div>profileImg</div>
      <div>PutImgBtn</div>
      <input placeholder="2~10자 이내" />
      <input placeholder="자기소개" />
    </>
  );
};

export default ProfileModification;

// const ProfileModificaton = () => {
//   return (
//     <div className="upc">
//       <div className="profile-up">
//         <Header>
//           <BackButton>뒤로가기 버튼</BackButton>
//         </Header>
//         <div className="followers"></div>
//         <div className="followings"></div>
//         <img src={profile_icon} alt="" />
//         <div className="profile-name">나야나</div>
//         <div className="profile-email">@villain_no1</div>
//         <div className="profile-description">1호선 빌런 꿈나무</div>
//         <div className="profile-correctBtn">
//           <a href={ProfileModification}>프로필 수정</a>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfileModificaton;
