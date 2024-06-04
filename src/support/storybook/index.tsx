import type { Decorator } from "@storybook/react";

import type {
  TypedDocumentNode,
  ResultOf,
} from "@graphql-typed-document-node/core";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { InMemoryCache } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { MockedProvider } from "@apollo/client/testing";

export type WritableFragmentData<TDocumentNode extends TypedDocumentNode> = {
  fragment: TDocumentNode;
  fragmentName?: string;
  id?: string;
  data: Omit<ResultOf<TDocumentNode>, " $fragmentName">;
};

export type WritableOperationData<TDocumentNode extends TypedDocumentNode> = {
  query: TDocumentNode;
  data: ResultOf<TDocumentNode>;
};

export type LoadedFragments = {
  mockDefinitions: ResolvedData<any>[];
};

type ResolvedData<TDocumentNode extends TypedDocumentNode> =
  | WritableFragmentData<TDocumentNode>
  | WritableOperationData<TDocumentNode>;

export type MockDefResolver<TDocumentNode extends TypedDocumentNode> =
  | ResolvedData<TDocumentNode>
  | PromiseLike<ResolvedData<TDocumentNode>>
  | (() => ResolvedData<TDocumentNode>)
  | (() => PromiseLike<ResolvedData<TDocumentNode>>);

type FragmentResolvers<TDocumentNodeList extends TypedDocumentNode[]> = {
  [K in keyof TDocumentNodeList]: MockDefResolver<TDocumentNodeList[K]>;
};

async function resolveMockData(resolver: MockDefResolver<any>) {
  if (typeof resolver === "function") {
    return await resolver();
  }
  return await resolver;
}

export function mockFragmentLoader<
  TDocumentNodeList extends TypedDocumentNode[],
>(...args: FragmentResolvers<TDocumentNodeList>) {
  const loaderFn = async () => {
    const fragments = await Promise.all(args.map(resolveMockData));
    const loadedContext: LoadedFragments = {
      mockDefinitions: fragments,
    };
    return loadedContext;
  };
  return loaderFn;
}

function isFragmentMockDef(
  def: ResolvedData<any>
): def is WritableFragmentData<any> {
  return !!(def as any)["fragment"];
}

function isOperationMockDef(
  def: ResolvedData<any>
): def is WritableOperationData<any> {
  return !!(def as any)["query"];
}

export const mockLoadDecorator: Decorator = (Story, context) => {
  const loaded = context.loaded as unknown as LoadedFragments;
  if (!loaded.mockDefinitions) {
    return (
      <MockedProvider>
        <Story />
      </MockedProvider>
    );
  }
  const fragmentDocuments = [
    ...new Set(
      loaded.mockDefinitions.reduce(
        (acc, def) => (isFragmentMockDef(def) ? [...acc, def.fragment] : acc),
        [] as TypedDocumentNode[]
      )
    ),
  ];
  const fragmentRegistry = createFragmentRegistry(...fragmentDocuments);
  const cache = new InMemoryCache({
    fragments: fragmentRegistry,
  });
  for (const def of loaded.mockDefinitions) {
    if (isFragmentMockDef(def)) {
      const d = def.data as any;
      cache.writeFragment({
        id: `${d.__typename}:${d.id}`,
        ...def,
      });
    } else if (isOperationMockDef(def)) {
      cache.writeQuery({
        query: def.query,
        data: def.data,
      });
    }
  }
  return (
    <MockedProvider cache={cache}>
      <Story />
    </MockedProvider>
  );
};

loadDevMessages();
loadErrorMessages();
