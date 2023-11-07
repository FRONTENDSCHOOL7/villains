import styled from 'styled-components';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import pageUrlConfig from '../../config/pageUrlConfig';
import useFormatDate from '../../hooks/useFormatDate';
import { useState, useEffect } from 'react';

const ChatListItem = ({ post }) => {
  const navigate = useNavigate();

  const handleChatDetailNav = () => {
    navigate(`${pageUrlConfig.chatPage}/${post._id}/${post.author.accountname}`);
  };

  return (
    <>
      {post.content.title && (
        <StyledUserHeader onClick={handleChatDetailNav}>
          <ProfileImage>
            {/* 프로필 기본이미지 수정 필요 */}
            {/* <img src={post.author.image} alt="" /> */}
            <img src={basicProfile} alt="" />
          </ProfileImage>
          <UserInfo>
            <UserName>{post.content.title}</UserName>
            <Contents>배달 수락자 : {post.content.acceptUser}</Contents>
          </UserInfo>
          <DateText>{useFormatDate(post.createdAt)}</DateText>
        </StyledUserHeader>
      )}
    </>
  );
};

export default ChatListItem;

const StyledUserHeader = styled.li`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #c4c4c4;
`;

const UserInfo = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
`;

const UserName = styled.span`
  display: block;
`;

const Contents = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
  max-width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled(Contents)`
  font-size: 10px;
  align-self: flex-end;
`;
