import styled from 'styled-components';
import { IconLabelBtn } from '../button/Buttons';
import heart from '../../assets/img/heart.svg';
import heartFilled from '../../assets/img/heart-filled.svg';
import comment from '../../assets/img/message-circle.svg';

const PostItem = (args) => {
    const date = new Date(args.createdDate);
  const firstImageUrl = args.image;
  return (
    <Card>
      {firstImageUrl && <CardImage src={firstImageUrl} alt=""/>}
      <CardContent>
        <Title>{args.content}</Title>
        <Author>@ {args.accountname}</Author>
        <Time>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</Time>
        <IconsContainer>
          <IconLabelBtn
            icon={args.isHearted ? heartFilled : heart}
            count={args.heartCount}
            onClick={()=>{
                args.isHearted = !args.isHearted
            }}
          />
          <IconLabelBtn icon={comment} count={args.comments.length} />
        </IconsContainer>
      </CardContent>
    </Card>
  );
};

export default PostItem;

const Card = styled.li`
  width: 100%;
  
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  position: relative;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 162px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #dbdbdb;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  min-height: 140px;
  flex-direction: column;
  & > :last-child{
    margin-top: auto;
    margin-bottom: 16px;
    align-self: end;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
  margin: 8px 0;
`;

const Time = styled.time`
  display: block;
  color: #767676;
  font-size: 10px;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
