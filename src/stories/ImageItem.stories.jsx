import Image from '../components/card/ImageItem';

export default {
  title: 'Comp/ImageItem',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: { type: 'file', accept: '.png' },
    },
    onClick: { action: 'clicked' },
  },
};

export const DefaultImage = () => <Image.Default />

export const SingleImage = () => <Image.Single />;

export const MultiImage = () => <Image.Multi imageUrls={['']}/>
