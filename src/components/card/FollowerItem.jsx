import React from 'react';
import styled from 'styled-components';
import DefaultBtn from '../button/GlobalButton';
import basicProfile from '../../assets/img/basic-profile.svg';

const FollowerItem = ({data}) => {
  return (
    <List>
        {data.map((arg)=>{
            return(
            <Card key={arg._id}>
                <ProfileImg
                    src={arg.image || basicProfile} alt='프로필'
                    />
                <Wrap >
                    <UserName>{arg.username}</UserName>
                    <UserAccountname>@ {arg.accountname}</UserAccountname>
                </Wrap>
                <BtnArea>
                    {!arg.isfollow ? (
                        <DefaultBtn variant={'basic'}>
                            팔로우
                        </DefaultBtn>
                        )
                        : (
                        <DefaultBtn variant={'basic'}>
                            언팔로우
                        </DefaultBtn>
                        )}
                </BtnArea>
            </Card>
            )
        })}
    </List>
        
  );
};

export default FollowerItem;
const List = styled.ul`
    padding: 0;
    width: 100%;
`;
const Card = styled.li`
  width: 100%;
  height: 60px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    margin-left: 0;
`;
const UserName = styled.span`
  font-size: 14px;
`;
const UserAccountname = styled.span`
  color: #767676;
  font-size: 12px;
`;
const BtnArea = styled.div`
    margin-right: 0;
    margin-left: 1rem;
    button {
        padding: 8px;
    }
`;
