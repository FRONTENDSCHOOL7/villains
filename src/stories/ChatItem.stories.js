import ChatItem from '../components/card/ChatItem.jsx';

export default {
  title: 'Comp/ChatItem',
  component: ChatItem,
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
    title: 'string',
    acceptUser: 'string',
    createdAt: {
      control: 'date',
      defaultValue: new Date(),
    },
  },
};

export const Default = {
  args: {
    title: '게시물 제목',
    acceptUser: '수락자 이름',
    createdAt: new Date(),
    accountname: '작성자 계정명',
  },
};
