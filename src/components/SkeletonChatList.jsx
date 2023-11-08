import { Skeleton, Divider } from 'antd';
import styled from 'styled-components';

const SkeletonChatList = () => {
  return (
    <>
      <StyledSkeleton>
        <Skeleton.Avatar active />
        <Skeleton paragraph={{ rows: 2 }} title={false} />
      </StyledSkeleton>
      <Divider style={{margin : "0" , marginTop: "20px"}} />
    </>
  );
};

export default SkeletonChatList;

const StyledSkeleton = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
  gap: 20px;
  align-items: center;
`;
