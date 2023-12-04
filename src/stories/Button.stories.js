import DefaultBtn from '../components/button/GlobalButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Comp/Button',
  component: DefaultBtn,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ChSjZuBQFDF8FJxwrXAgja/villains_figma?type=design&node-id=103616-8446&mode=design&t=pvc13VjkCnk6ogRf-4',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'basic'],
      description: 'The value of the variant',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Basic = {
  args: {
    variant: 'basic',
    children: 'Button',
  },
};
