/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
  ],

  docs: {
    autodocs: 'tag',
  },
};
export default config;
