import type { Meta } from "@storybook/react";

type LoaderFn = Meta["loaders"];

/**
 *
 * Emulate Storybooks `loaders` annotation.
 *
 * The `composeStory` function does not execute loaders.
 * In case of unit-testing, sometimes we want loaded data (e.g. Page props stub data) and to pass them stories.
 *
 * @example
 *
 * ```ts
 * const loaded = await preloadStory(MyStory, Meta);
 *
 * const Component = composeStory(MyStory, Meta, {
 *   parameters: {
 *     stubData: loaded.stubData,
 *   },
 *   decorators: [
 *     (Story, ctx) => {
 *       const stubData = ctx.loaded.stubData ?? ctx.parameters.stubData;
 *       // Do something with stub data
 *       return (
 *         <Story />
 *       );
 *     },
 *   ],
 * });
 * ```
 *
 */
export async function preloadStory(
  ...defs: {
    readonly loaders?: LoaderFn;
  }[]
) {
  const allLoaders = defs
    .slice()
    .reverse()
    .flatMap((def) =>
      !def.loaders
        ? []
        : Array.isArray(def.loaders)
          ? def.loaders
          : [def.loaders]
    );
  const loaded = await allLoaders.reduce(
    async (queue, loader) => {
      const prev = await queue;
      const loaderContext = {} as any; // FIXME
      const result = await loader(loaderContext);
      if (!result) return prev;
      return {
        ...prev,
        ...result,
      };
    },
    Promise.resolve({} as Record<string, unknown>)
  );
  return loaded;
}
