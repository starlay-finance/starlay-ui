import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/src/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Pair = {
  __typename?: 'Pair'
  address: Scalars['String']
  token0: Token
  token1: Token
}

export type Price = {
  __typename?: 'Price'
  priceInQuoteToken?: Maybe<Scalars['String']>
  token: Scalars['String']
}

export type Prices = {
  __typename?: 'Prices'
  prices: Array<Price>
  quoteToken: Scalars['String']
  quoteTokenPriceInUSD?: Maybe<Scalars['String']>
  timestamp: Scalars['String']
}

export type PricesQueryInput = {
  quoteToken: Scalars['String']
  tokens: Array<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getPairs?: Maybe<Array<Pair>>
  getPrices: Prices
}

export type QueryGetPricesArgs = {
  input: PricesQueryInput
}

export type Token = {
  __typename?: 'Token'
  address: Scalars['String']
  symbol: Scalars['String']
}

export type ListPricesQueryVariables = Exact<{
  input: PricesQueryInput
}>

export type ListPricesQuery = {
  __typename?: 'Query'
  getPrices: {
    __typename?: 'Prices'
    quoteToken: string
    quoteTokenPriceInUSD?: string | null
    timestamp: string
    prices: Array<{
      __typename?: 'Price'
      token: string
      priceInQuoteToken?: string | null
    }>
  }
}

export const ListPricesDocument = gql`
  query ListPrices($input: PricesQueryInput!) {
    getPrices(input: $input) {
      prices {
        token
        priceInQuoteToken
      }
      quoteToken
      quoteTokenPriceInUSD
      timestamp
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    ListPrices(
      variables: ListPricesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ListPricesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ListPricesQuery>(ListPricesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ListPrices',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
