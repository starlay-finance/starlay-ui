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
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['BigDecimal'];
  cancellable: Scalars['Boolean'];
  cap: Scalars['BigDecimal'];
  id: Scalars['ID'];
  multiplied: Scalars['BigDecimal'];
  project: Project;
  timestamp: Scalars['BigInt'];
};

export type Bid_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cancellable?: InputMaybe<Scalars['Boolean']>;
  cancellable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancellable_not?: InputMaybe<Scalars['Boolean']>;
  cancellable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cap?: InputMaybe<Scalars['BigDecimal']>;
  cap_gt?: InputMaybe<Scalars['BigDecimal']>;
  cap_gte?: InputMaybe<Scalars['BigDecimal']>;
  cap_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cap_lt?: InputMaybe<Scalars['BigDecimal']>;
  cap_lte?: InputMaybe<Scalars['BigDecimal']>;
  cap_not?: InputMaybe<Scalars['BigDecimal']>;
  cap_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  multiplied?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_gt?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_gte?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  multiplied_lt?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_lte?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_not?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  project?: InputMaybe<Scalars['String']>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Bid_OrderBy {
  Amount = 'amount',
  Cancellable = 'cancellable',
  Cap = 'cap',
  Id = 'id',
  Multiplied = 'multiplied',
  Project = 'project',
  Timestamp = 'timestamp'
}

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type LockedBidSummary = {
  __typename?: 'LockedBidSummary';
  amount: Scalars['BigDecimal'];
  id: Scalars['ID'];
  multiplied: Scalars['BigDecimal'];
};

export type LockedBidSummary_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  multiplied?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_gt?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_gte?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  multiplied_lt?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_lte?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_not?: InputMaybe<Scalars['BigDecimal']>;
  multiplied_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum LockedBidSummary_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Multiplied = 'multiplied'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  bids: Array<Bid>;
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  no: Scalars['Int'];
  paymentToken: Token;
  saleEndTimestamp: Scalars['BigInt'];
  saleStartTimestamp: Scalars['BigInt'];
};


export type ProjectBidsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bid_Filter>;
};

export type ProjectStatistic = {
  __typename?: 'ProjectStatistic';
  bottomPrice: Scalars['BigDecimal'];
  id: Scalars['ID'];
  numOfBidders: Scalars['BigInt'];
  totalAmount: Scalars['BigDecimal'];
  totalMultiplied: Scalars['BigDecimal'];
};

export type ProjectStatistic_Filter = {
  bottomPrice?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  bottomPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  bottomPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  numOfBidders?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_gt?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_gte?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numOfBidders_lt?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_lte?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_not?: InputMaybe<Scalars['BigInt']>;
  numOfBidders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalMultiplied?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalMultiplied_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_not?: InputMaybe<Scalars['BigDecimal']>;
  totalMultiplied_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum ProjectStatistic_OrderBy {
  BottomPrice = 'bottomPrice',
  Id = 'id',
  NumOfBidders = 'numOfBidders',
  TotalAmount = 'totalAmount',
  TotalMultiplied = 'totalMultiplied'
}

export type Project_Filter = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  deleted_in?: InputMaybe<Array<Scalars['Boolean']>>;
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  deleted_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  no?: InputMaybe<Scalars['Int']>;
  no_gt?: InputMaybe<Scalars['Int']>;
  no_gte?: InputMaybe<Scalars['Int']>;
  no_in?: InputMaybe<Array<Scalars['Int']>>;
  no_lt?: InputMaybe<Scalars['Int']>;
  no_lte?: InputMaybe<Scalars['Int']>;
  no_not?: InputMaybe<Scalars['Int']>;
  no_not_in?: InputMaybe<Array<Scalars['Int']>>;
  paymentToken?: InputMaybe<Scalars['String']>;
  paymentToken_contains?: InputMaybe<Scalars['String']>;
  paymentToken_contains_nocase?: InputMaybe<Scalars['String']>;
  paymentToken_ends_with?: InputMaybe<Scalars['String']>;
  paymentToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  paymentToken_gt?: InputMaybe<Scalars['String']>;
  paymentToken_gte?: InputMaybe<Scalars['String']>;
  paymentToken_in?: InputMaybe<Array<Scalars['String']>>;
  paymentToken_lt?: InputMaybe<Scalars['String']>;
  paymentToken_lte?: InputMaybe<Scalars['String']>;
  paymentToken_not?: InputMaybe<Scalars['String']>;
  paymentToken_not_contains?: InputMaybe<Scalars['String']>;
  paymentToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  paymentToken_not_ends_with?: InputMaybe<Scalars['String']>;
  paymentToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  paymentToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  paymentToken_not_starts_with?: InputMaybe<Scalars['String']>;
  paymentToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  paymentToken_starts_with?: InputMaybe<Scalars['String']>;
  paymentToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  saleEndTimestamp?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  saleEndTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  saleEndTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  saleStartTimestamp?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  saleStartTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  saleStartTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Project_OrderBy {
  Bids = 'bids',
  Deleted = 'deleted',
  Id = 'id',
  Name = 'name',
  No = 'no',
  PaymentToken = 'paymentToken',
  SaleEndTimestamp = 'saleEndTimestamp',
  SaleStartTimestamp = 'saleStartTimestamp'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  lockedBidSummaries: Array<LockedBidSummary>;
  lockedBidSummary?: Maybe<LockedBidSummary>;
  project?: Maybe<Project>;
  projectStatistic?: Maybe<ProjectStatistic>;
  projectStatistics: Array<ProjectStatistic>;
  projects: Array<Project>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bid_Filter>;
};


export type QueryLockedBidSummariesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedBidSummary_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedBidSummary_Filter>;
};


export type QueryLockedBidSummaryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectStatisticArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectStatistic_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectStatistic_Filter>;
};


export type QueryProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  lockedBidSummaries: Array<LockedBidSummary>;
  lockedBidSummary?: Maybe<LockedBidSummary>;
  project?: Maybe<Project>;
  projectStatistic?: Maybe<ProjectStatistic>;
  projectStatistics: Array<ProjectStatistic>;
  projects: Array<Project>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bid_Filter>;
};


export type SubscriptionLockedBidSummariesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedBidSummary_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedBidSummary_Filter>;
};


export type SubscriptionLockedBidSummaryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectStatisticArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectStatistic_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectStatistic_Filter>;
};


export type SubscriptionProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type Token_Filter = {
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetBidQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBidQuery = { __typename?: 'Query', bid?: { __typename?: 'Bid', amount: string, multiplied: string, cap: string, cancellable: boolean } | null };

export type GetCurrentDataQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCurrentDataQuery = { __typename?: 'Query', projectStatistic?: { __typename?: 'ProjectStatistic', numOfBidders: string } | null };


export const GetBidDocument = gql`
    query GetBid($id: ID!) {
  bid(id: $id) {
    amount
    multiplied
    cap
    cancellable
  }
}
    `;
export const GetCurrentDataDocument = gql`
    query GetCurrentData($id: ID!) {
  projectStatistic(id: $id) {
    numOfBidders
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetBid(variables: GetBidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBidQuery>(GetBidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetBid');
    },
    GetCurrentData(variables: GetCurrentDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentDataQuery>(GetCurrentDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentData');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;