import { Skeleton, Card } from 'antd';

const SkeletonCard = () => (
  <Card style={{ width: '90%', marginTop: 16, margin: '16px auto' }}>
    <Skeleton loading={true} active avatar={false} />
  </Card>
);

export default SkeletonCard;
