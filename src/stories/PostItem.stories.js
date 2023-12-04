import PostItem from '../components/card/PostItem';

export default {
  title: 'Comp/PostItem',
  component: PostItem,
  parameters: {
    layout: 'centered',
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/ChSjZuBQFDF8FJxwrXAgja/villains_figma?type=design&node-id=103616-8446&mode=design&t=pvc13VjkCnk6ogRf-4',
    // },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    image: { control: { type: 'file', accept: '.png' } },
    content: { control: 'text' },
    accountname: { control: 'text' },
    createdDate: {
      control: 'date',
      defaultValue: new Date(),
    },
    isHearted: { control: 'boolean' },
    heartCount: { control: 'number' },
    comments: { type: 'array' },
  },
};

export const Default = {
  args: {
    image: '',
    content: '게시물 내용입니다.',
    accountname: 'user123',
    createdDate: new Date(),
    isHearted: false,
    heartCount: 10,
    comments: ['댓글 1', '댓글 2', '댓글 3'],
  },
};
