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
    //ToDo: url들을 imageUrls에 넣는 방법
    imageUrls: {
      type: 'array',
    },
    onClick: { action: 'clicked' },
  },
};

// const Template = (args) => Image.Default;
//error: SyntaxError: Unexpected token '<'
export const DefaultImage = Image.Default;

export const SingleImage = Image.Single;
SingleImage.url = '';

export const MultiImage = Image.Multi;
MultiImage.imageUrls = {
  imageUrls: [SingleImage.url],
};
