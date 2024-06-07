import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";

import { preloadStory } from "@/support/storybook/testing";

import { createCachePreloader } from "@/support/storybook/apollo";

import { fragment } from ".";
import Meta, { Default, UserFragmentFactory } from "./index.stories";

describe(Meta.title, () => {
  // Use story's loader
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
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // Explicit stub data injection
  test("alt attribute", async () => {
    // Arrange
    const loaded = await createCachePreloader()
      .preloadFragment({
        fragment,
        fragmentName: "Avatar_User",
        data: UserFragmentFactory.build({
          id: "test_user",
          name: "quramy",
        }),
      })
      .load();
    const Component = composeStory(
      {
        ...Default,
        args: {
          id: "test_user",
        },
      },
      Meta,
      {
        parameters: {
          ...loaded,
        },
      }
    );

    // Act
    render(<Component />);

    // Assert
    expect(screen.getByAltText("quramy")).toBeInTheDocument();
  });
});
