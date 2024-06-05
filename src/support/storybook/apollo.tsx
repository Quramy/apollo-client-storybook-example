import type { Decorator } from "@storybook/react";

import { type ApolloCache, InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

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

function isCachePreloaderLoaderContext(context: {
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
  } else if (isCachePreloaderLoaderContext(context)) {
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

  private async load(cache = new InMemoryCache()): Promise<ApolloCache<any>> {
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
      this.load().then((cache) => ({
        [apolloCacheKey]: cache,
      }));
  }
}

export function createCachePreloader() {
  return new CachePreloader();
}

export const preloadedCacheDecorator: Decorator = (Story, context) => {
  const cache = getPreloadedCacheFromContext(context);
  if (!cache) {
    return (
      <MockedProvider>
        <Story />
      </MockedProvider>
    );
  }
  return (
    <MockedProvider cache={cache}>
      <Story />
    </MockedProvider>
  );
};
