import type { Decorator } from "@storybook/react";

import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

type PreloadFragmentOptions<TResult extends Record<string, any>> = {
  fragment: TypedDocumentNode<TResult>;
  fragmentName?: string;
  id?: string;
  data: Resolver<TResult>;
};

type PreloadOperationOptions<
  TResult extends Record<string, any>,
  TValiables extends Record<string, any>,
> = {
  query: TypedDocumentNode<TResult, TValiables>;
  data: Resolver<TResult>;
  variables?: TValiables;
};

type Resolver<TResolved extends Record<string, any>> =
  | TResolved
  | Promise<TResolved>
  | (() => TResolved)
  | (() => Promise<TResolved>);

async function resolveData<T extends Record<string, any>>(
  resolver: Resolver<T>
): Promise<T> {
  if (typeof resolver === "function") {
    return await resolver();
  }
  return await resolver;
}

function genDefaultId(data: { __typename?: string; id?: string }) {
  if (data.__typename && data.id) {
    return `${data.__typename}:${data.id}`;
  }
  return undefined;
}

type CachePreloaderContext = {
  __cache: InMemoryCache;
};

function isCachePreloaderContext(context: {
  loaded: unknown;
}): context is { loaded: CachePreloaderContext } {
  return !!(context.loaded as any).__cache;
}

class CachePreloader {
  private fragmentDefs: PreloadFragmentOptions<any>[] = [];
  private operationDefs: PreloadOperationOptions<any, any>[] = [];

  preloadFragment<TResult extends Record<string, any>>(
    options: PreloadFragmentOptions<TResult>
  ) {
    this.fragmentDefs.push(options);
    return this;
  }

  preloadQuery<
    TResult extends Record<string, any>,
    TValiables extends Record<string, any>,
  >(options: PreloadOperationOptions<TResult, TValiables>) {
    this.operationDefs.push(options);
    return this;
  }

  toLoader() {
    const loader = async () => {
      const fragmentDefs = await Promise.all(
        this.fragmentDefs.map(({ data: resolver, ...rest }) =>
          resolveData(resolver).then((data) => ({ ...rest, data }))
        )
      );
      const operationDefs = await Promise.all(
        this.operationDefs.map(({ data: resolver, ...rest }) =>
          resolveData(resolver).then((data) => ({ ...rest, data }))
        )
      );
      const cache = new InMemoryCache();
      for (const def of fragmentDefs) {
        cache.writeFragment({
          id: genDefaultId(def.data),
          ...def,
        });
      }
      for (const def of operationDefs) {
        cache.writeQuery({
          ...def,
        });
      }
      const loaded: CachePreloaderContext = {
        __cache: cache,
      };
      return loaded;
    };
    return loader;
  }
}

export function createCachePreloader() {
  return new CachePreloader();
}

export const preloadedCacheDecorator: Decorator = (Story, context) => {
  if (!isCachePreloaderContext(context)) {
    return (
      <MockedProvider>
        <Story />
      </MockedProvider>
    );
  }
  const cache = context.loaded.__cache;
  return (
    <MockedProvider cache={cache}>
      <Story />
    </MockedProvider>
  );
};
