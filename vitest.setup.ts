import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { setProjectAnnotations } from "@storybook/react";
import * as globalStorybookConfig from "./.storybook/preview";

setProjectAnnotations(globalStorybookConfig);

afterEach(() => {
  cleanup();
});
