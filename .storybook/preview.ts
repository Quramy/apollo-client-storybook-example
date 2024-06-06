import type { Preview } from "@storybook/react";

import { apolloDecorator } from "../src/support/storybook/apollo";

const preview: Preview = {
  decorators: [apolloDecorator],
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
