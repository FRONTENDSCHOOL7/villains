import FollowerItem from '../components/card/FollowerItem';

export default {
  title: 'Comp/FollowerItem',
  component: FollowerItem,
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
    data: { type: 'array' },
  },
};

export const Default = {
  args: {
    data: [
      {
        _id: 1,
        isfollow: true,
        image: '',
        username: 'villains',
        accountname: 'villains123',
      },
      {
        _id: 3,
        isfollow: false,
        image: '',
        username: 'villains',
        accountname: 'villains123',
      },
    ],
  },
};
