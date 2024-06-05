import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";

import { preloadStory } from "../../support/storybook/testing";

import Meta, { Default } from "./index.stories";

describe(Meta.title, () => {
  test("render fragment", async () => {
    // Arrange
    const loaded = await preloadStory(Default, Meta);
    const Component = composeStory(Default, Meta, {
      parameters: {
        ...loaded,
      },
    });

    // Act
    render(<Component />);

    // Assert
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
