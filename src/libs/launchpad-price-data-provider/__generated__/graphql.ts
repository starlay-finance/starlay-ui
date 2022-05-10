import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Price = {
  __typename?: 'Price';
  bottomPrice: Scalars['Float'];
  data: Scalars['Float'];
  timestamp: Scalars['Int'];
};

export type PricesInput = {
  fromTimestamp?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
};

export type PricesOutput = {
  __typename?: 'PricesOutput';
  items: Array<Price>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  priceCurrent?: Maybe<Price>;
  prices5Min: PricesOutput;
  pricesHour: PricesOutput;
};


export type QueryPriceCurrentArgs = {
  projectId: Scalars['String'];
};


export type QueryPrices5MinArgs = {
  input: PricesInput;
};


export type QueryPricesHourArgs = {
  input: PricesInput;
};

export type GetCurrentPriceQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetCurrentPriceQuery = { __typename?: 'Query', priceCurrent?: { __typename?: 'Price', data: number, bottomPrice: number, timestamp: number } | null };

export type ListPricesHistoricalQueryVariables = Exact<{
  input: PricesInput;
}>;


export type ListPricesHistoricalQuery = { __typename?: 'Query', prices5Min: { __typename?: 'PricesOutput', items: Array<{ __typename?: 'Price', data: number, bottomPrice: number, timestamp: number }> } };


export const GetCurrentPriceDocument = gql`
    query GetCurrentPrice($projectId: String!) {
  priceCurrent(projectId: $projectId) {
    data
    bottomPrice
    timestamp
  }
}
    `;
export const ListPricesHistoricalDocument = gql`
    query ListPricesHistorical($input: PricesInput!) {
  prices5Min(input: $input) {
    items {
      data
      bottomPrice
      timestamp
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetCurrentPrice(variables: GetCurrentPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentPriceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentPriceQuery>(GetCurrentPriceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentPrice');
    },
    ListPricesHistorical(variables: ListPricesHistoricalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ListPricesHistoricalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListPricesHistoricalQuery>(ListPricesHistoricalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ListPricesHistorical');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;