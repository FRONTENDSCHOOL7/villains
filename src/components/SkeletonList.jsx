import { Skeleton, Divider } from 'antd';
import styled from 'styled-components';

const SkeletonList = () => {
  return (
    <>
      <StyledSkeleton>
        <Skeleton.Image active />
        <Skeleton paragraph={{ rows: 3 }} title={false} />
      </StyledSkeleton>
      <Divider />
    </>
  );
};

export default SkeletonList;

const StyledSkeleton = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
  gap: 20px;

  align-items: center;
`;
