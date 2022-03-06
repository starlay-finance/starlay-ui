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

export type AssetData = {
  __typename?: 'AssetData';
  id: Scalars['ID'];
  poolData: PoolData;
  reservesIncentives: Array<ReservesIncentivesData>;
  timestamp: Scalars['String'];
};

export type BaseCurrencyData = {
  __typename?: 'BaseCurrencyData';
  marketReferenceCurrencyDecimals: Scalars['Int'];
  marketReferenceCurrencyPriceInUsd: Scalars['String'];
  networkBaseTokenPriceDecimals: Scalars['Int'];
  networkBaseTokenPriceInUsd: Scalars['String'];
};

export type IncentivesWithFeeds = {
  __typename?: 'IncentivesWithFeeds';
  emissionEndTimestamp: Scalars['Int'];
  emissionPerSecond: Scalars['String'];
  incentiveControllerAddress: Scalars['String'];
  incentivesLastUpdateTimestamp: Scalars['Int'];
  precision: Scalars['Int'];
  priceFeed: Scalars['String'];
  rewardTokenAddress: Scalars['String'];
  rewardTokenDecimals: Scalars['Int'];
  tokenAddress: Scalars['String'];
  tokenIncentivesIndex: Scalars['String'];
};

export type PoolData = {
  __typename?: 'PoolData';
  baseCurrencyData: BaseCurrencyData;
  reservesData: Array<ReservesData>;
};

export type Query = {
  __typename?: 'Query';
  getAssetData?: Maybe<AssetData>;
};


export type QueryGetAssetDataArgs = {
  date: Scalars['String'];
};

export type ReservesData = {
  __typename?: 'ReservesData';
  availableLiquidity: Scalars['String'];
  averageStableRate: Scalars['String'];
  baseLTVasCollateral: Scalars['String'];
  borrowingEnabled: Scalars['Boolean'];
  decimals: Scalars['Int'];
  id: Scalars['String'];
  interestRateStrategyAddress: Scalars['String'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  lTokenAddress: Scalars['String'];
  lastUpdateTimestamp: Scalars['Int'];
  liquidityIndex: Scalars['String'];
  liquidityRate: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priceInMarketReferenceCurrency: Scalars['String'];
  reserveFactor: Scalars['String'];
  reserveLiquidationBonus: Scalars['String'];
  reserveLiquidationThreshold: Scalars['String'];
  stableBorrowRate: Scalars['String'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  stableDebtLastUpdateTimestamp: Scalars['Int'];
  stableDebtTokenAddress: Scalars['String'];
  stableRateSlope1: Scalars['String'];
  stableRateSlope2: Scalars['String'];
  symbol: Scalars['String'];
  totalPrincipalStableDebt: Scalars['String'];
  totalScaledVariableDebt: Scalars['String'];
  underlyingAsset: Scalars['String'];
  usageAsCollateralEnabled: Scalars['String'];
  variableBorrowIndex: Scalars['String'];
  variableBorrowRate: Scalars['String'];
  variableDebtTokenAddress: Scalars['String'];
  variableRateSlope1: Scalars['String'];
  variableRateSlope2: Scalars['String'];
};

export type ReservesIncentivesData = {
  __typename?: 'ReservesIncentivesData';
  lIncentiveData: IncentivesWithFeeds;
  sdIncentiveData: IncentivesWithFeeds;
  underlyingAsset: Scalars['String'];
  vdIncentiveData: IncentivesWithFeeds;
};

export type GetAssetDataQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type GetAssetDataQuery = { __typename?: 'Query', getAssetData?: { __typename?: 'AssetData', id: string, timestamp: string, poolData: { __typename?: 'PoolData', baseCurrencyData: { __typename?: 'BaseCurrencyData', marketReferenceCurrencyDecimals: number, marketReferenceCurrencyPriceInUsd: string, networkBaseTokenPriceDecimals: number, networkBaseTokenPriceInUsd: string }, reservesData: Array<{ __typename?: 'ReservesData', availableLiquidity: string, averageStableRate: string, baseLTVasCollateral: string, borrowingEnabled: boolean, decimals: number, id: string, interestRateStrategyAddress: string, isActive: boolean, isFrozen: boolean, lTokenAddress: string, lastUpdateTimestamp: number, liquidityIndex: string, liquidityRate: string, name?: string | null, priceInMarketReferenceCurrency: string, reserveFactor: string, reserveLiquidationBonus: string, reserveLiquidationThreshold: string, stableBorrowRate: string, stableBorrowRateEnabled: boolean, stableDebtLastUpdateTimestamp: number, stableDebtTokenAddress: string, stableRateSlope1: string, stableRateSlope2: string, symbol: string, totalPrincipalStableDebt: string, totalScaledVariableDebt: string, underlyingAsset: string, usageAsCollateralEnabled: string, variableBorrowIndex: string, variableBorrowRate: string, variableDebtTokenAddress: string, variableRateSlope1: string, variableRateSlope2: string }> }, reservesIncentives: Array<{ __typename?: 'ReservesIncentivesData', underlyingAsset: string, lIncentiveData: { __typename?: 'IncentivesWithFeeds', emissionEndTimestamp: number, emissionPerSecond: string, incentiveControllerAddress: string, incentivesLastUpdateTimestamp: number, precision: number, priceFeed: string, rewardTokenAddress: string, rewardTokenDecimals: number, tokenAddress: string, tokenIncentivesIndex: string }, sdIncentiveData: { __typename?: 'IncentivesWithFeeds', emissionEndTimestamp: number, emissionPerSecond: string, incentiveControllerAddress: string, incentivesLastUpdateTimestamp: number, precision: number, priceFeed: string, rewardTokenAddress: string, rewardTokenDecimals: number, tokenAddress: string, tokenIncentivesIndex: string }, vdIncentiveData: { __typename?: 'IncentivesWithFeeds', emissionEndTimestamp: number, emissionPerSecond: string, incentiveControllerAddress: string, incentivesLastUpdateTimestamp: number, precision: number, priceFeed: string, rewardTokenAddress: string, rewardTokenDecimals: number, tokenAddress: string, tokenIncentivesIndex: string } }> } | null };

export type BaseCurrencyDataFragment = { __typename?: 'BaseCurrencyData', marketReferenceCurrencyDecimals: number, marketReferenceCurrencyPriceInUsd: string, networkBaseTokenPriceDecimals: number, networkBaseTokenPriceInUsd: string };

export type ReservesDataFragment = { __typename?: 'ReservesData', availableLiquidity: string, averageStableRate: string, baseLTVasCollateral: string, borrowingEnabled: boolean, decimals: number, id: string, interestRateStrategyAddress: string, isActive: boolean, isFrozen: boolean, lTokenAddress: string, lastUpdateTimestamp: number, liquidityIndex: string, liquidityRate: string, name?: string | null, priceInMarketReferenceCurrency: string, reserveFactor: string, reserveLiquidationBonus: string, reserveLiquidationThreshold: string, stableBorrowRate: string, stableBorrowRateEnabled: boolean, stableDebtLastUpdateTimestamp: number, stableDebtTokenAddress: string, stableRateSlope1: string, stableRateSlope2: string, symbol: string, totalPrincipalStableDebt: string, totalScaledVariableDebt: string, underlyingAsset: string, usageAsCollateralEnabled: string, variableBorrowIndex: string, variableBorrowRate: string, variableDebtTokenAddress: string, variableRateSlope1: string, variableRateSlope2: string };

export type IncentivesWithFeedsFragment = { __typename?: 'IncentivesWithFeeds', emissionEndTimestamp: number, emissionPerSecond: string, incentiveControllerAddress: string, incentivesLastUpdateTimestamp: number, precision: number, priceFeed: string, rewardTokenAddress: string, rewardTokenDecimals: number, tokenAddress: string, tokenIncentivesIndex: string };

export const BaseCurrencyDataFragmentDoc = gql`
    fragment BaseCurrencyData on BaseCurrencyData {
  marketReferenceCurrencyDecimals
  marketReferenceCurrencyPriceInUsd
  networkBaseTokenPriceDecimals
  networkBaseTokenPriceInUsd
}
    `;
export const ReservesDataFragmentDoc = gql`
    fragment ReservesData on ReservesData {
  availableLiquidity
  averageStableRate
  baseLTVasCollateral
  borrowingEnabled
  decimals
  id
  interestRateStrategyAddress
  isActive
  isFrozen
  lTokenAddress
  lastUpdateTimestamp
  liquidityIndex
  liquidityRate
  name
  priceInMarketReferenceCurrency
  reserveFactor
  reserveLiquidationBonus
  reserveLiquidationThreshold
  stableBorrowRate
  stableBorrowRateEnabled
  stableDebtLastUpdateTimestamp
  stableDebtTokenAddress
  stableRateSlope1
  stableRateSlope2
  symbol
  totalPrincipalStableDebt
  totalScaledVariableDebt
  underlyingAsset
  usageAsCollateralEnabled
  variableBorrowIndex
  variableBorrowRate
  variableDebtTokenAddress
  variableRateSlope1
  variableRateSlope2
}
    `;
export const IncentivesWithFeedsFragmentDoc = gql`
    fragment IncentivesWithFeeds on IncentivesWithFeeds {
  emissionEndTimestamp
  emissionPerSecond
  incentiveControllerAddress
  incentivesLastUpdateTimestamp
  precision
  priceFeed
  rewardTokenAddress
  rewardTokenDecimals
  tokenAddress
  tokenIncentivesIndex
}
    `;
export const GetAssetDataDocument = gql`
    query GetAssetData($date: String!) {
  getAssetData(date: $date) {
    id
    timestamp
    poolData {
      baseCurrencyData {
        ...BaseCurrencyData
      }
      reservesData {
        ...ReservesData
      }
    }
    reservesIncentives {
      underlyingAsset
      lIncentiveData {
        ...IncentivesWithFeeds
      }
      sdIncentiveData {
        ...IncentivesWithFeeds
      }
      vdIncentiveData {
        ...IncentivesWithFeeds
      }
    }
  }
}
    ${BaseCurrencyDataFragmentDoc}
${ReservesDataFragmentDoc}
${IncentivesWithFeedsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetAssetData(variables: GetAssetDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetDataQuery>(GetAssetDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetData');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;