import type { Preview } from "@storybook/react";

import { preloadedCacheDecorator } from "../src/support/storybook/apollo";

const preview: Preview = {
  decorators: [preloadedCacheDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
