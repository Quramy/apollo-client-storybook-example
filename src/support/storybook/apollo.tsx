import type { Decorator } from "@storybook/react";

import {
  type ApolloCache,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

loadDevMessages();
loadErrorMessages();

type Resolver<TResult extends Record<string, unknown>> =
  | TResult
  | Promise<TResult>
  | (() => TResult)
  | (() => Promise<TResult>);

async function resolveData<TData extends Record<string, unknown>>(
  resolver: Resolver<TData>
): Promise<TData> {
  if (typeof resolver === "function") {
    return await resolver();
  }
  return await resolver;
}

type PreloadFragmentOptions<TResult extends Record<string, unknown>> = {
  readonly fragment: TypedDocumentNode<TResult>;
  readonly fragmentName?: string;
  readonly id?: string;
  readonly data: Resolver<TResult>;
};

type PreloadOperationOptions<
  TResult extends Record<string, unknown>,
  TValiables extends Record<string, unknown>,
> = {
  readonly query: TypedDocumentNode<TResult, TValiables>;
  readonly data: Resolver<TResult>;
  readonly variables?: TValiables;
};

const apolloCacheKey = "$apolloCache";

type CachePreloaderContext = {
  readonly [apolloCacheKey]: ApolloCache<any>;
};

function isCachePreloaderLoadersContext(context: {
  readonly loaded: unknown;
}): context is { loaded: CachePreloaderContext } {
  return !!(context.loaded as any)[apolloCacheKey];
}

function isCachePreloaderParametersContext(context: {
  readonly parameters: unknown;
}): context is { parameters: CachePreloaderContext } {
  return !!(context.parameters as any)[apolloCacheKey];
}

function getPreloadedCacheFromContext(context: {
  readonly parameters: unknown;
  readonly loaded: unknown;
}) {
  if (isCachePreloaderParametersContext(context)) {
    return context.parameters[apolloCacheKey];
  } else if (isCachePreloaderLoadersContext(context)) {
    return context.loaded[apolloCacheKey];
  }
  return undefined;
}

function genDefaultId(data: { __typename?: string; id?: string }) {
  if (data.__typename && data.id) {
    return `${data.__typename}:${data.id}`;
  }
  return undefined;
}

class CachePreloader {
  private fragmentDefs: PreloadFragmentOptions<Record<string, unknown>>[] = [];
  private operationDefs: PreloadOperationOptions<
    Record<string, unknown>,
    any
  >[] = [];

  private async loadToCache(
    cache = new InMemoryCache()
  ): Promise<ApolloCache<any>> {
    const [fragmentDefs, operationDefs] = await Promise.all([
      Promise.all(
        this.fragmentDefs.map(({ data: resolver, ...rest }) =>
          resolveData(resolver).then((data) => ({ ...rest, data }))
        )
      ),
      Promise.all(
        this.operationDefs.map(({ data: resolver, ...rest }) =>
          resolveData(resolver).then((data) => ({ ...rest, data }))
        )
      ),
    ]);
    fragmentDefs.forEach((def) =>
      cache.writeFragment({
        id: genDefaultId(def.data),
        ...def,
      })
    );
    operationDefs.forEach((def) => cache.writeQuery(def));
    return cache;
  }

  preloadFragment<TResult extends Record<string, unknown>>(
    options: PreloadFragmentOptions<TResult>
  ) {
    this.fragmentDefs.push(options);
    return this;
  }

  preloadQuery<
    TResult extends Record<string, unknown>,
    TValiables extends Record<string, unknown>,
  >(options: PreloadOperationOptions<TResult, TValiables>) {
    this.operationDefs.push(options);
    return this;
  }

  toLoader() {
    return (): Promise<CachePreloaderContext> =>
      this.loadToCache().then((cache) => ({
        [apolloCacheKey]: cache,
      }));
  }

  async load() {
    return this.toLoader()();
  }
}

/**
 *
 * [Storybook loaders](https://storybook.js.org/docs/writing-stories/loaders) utility to prepare Apollo Cache instance.
 * You can preload fragment stub data to write stories for components which depend on `useFragment` hook.
 *
 * This function returns {@link CachePreloader} instance.
 * And {@link CachePreloader#preloadFragment} method is available to write fragment data, like {@link ApolloCache#writeFragment }.
 *
 * @example
 *
 * ```tsx
 * const fragment = graphql(`
 *   fragment MyComponent_User on User {
 *     id
 *     name
 *   }
 * `);
 *
 * function MyComponent({ userId }: { userId: string }) {
 *   const { complete, data } = useFragment({
 *     fragment,
 *     from: { __typename: "User", id: userId },
 *   });
 *
 *   if (!complete) return null;
 *
 *   // render using data;
 * }
 *
 * const Meta = {
 *   title: "MyComponent",
 *   component: MyComponent,
 *   loaders: createCachePreloader()
 *     .preloadFragment({
 *       fragment,
 *       data: async () => ({
 *         id: "user01",
 *         name: "Test User",
 *       }),
 *     })
 *     .toLoader(),
 *   decorators: [apolloDecorator],
 *   args: {
 *     id: "user01",
 *   },
 * };
 *
 * export default Meta;
 * ```
 *
 */
export function createCachePreloader() {
  return new CachePreloader();
}

export const apolloDecorator: Decorator = (Story, context) => {
  const cache = getPreloadedCacheFromContext(context) ?? new InMemoryCache();

  const mockSchema = context.parameters.mockSchema;
  const link = mockSchema ? new SchemaLink({ schema: mockSchema }) : undefined;

  const client = new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <Story />
    </ApolloProvider>
  );
};
