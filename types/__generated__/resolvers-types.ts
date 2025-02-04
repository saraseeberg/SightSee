import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Upload: { input: any; output: any }
}

export type Destination = {
  __typename?: 'Destination'
  alt: Scalars['String']['output']
  categories: Array<Scalars['String']['output']>
  country: Scalars['String']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  image: Scalars['String']['output']
  longdescription: Scalars['String']['output']
  rating: Scalars['Float']['output']
  region?: Maybe<Scalars['String']['output']>
  reviews?: Maybe<Array<Review>>
  title: Scalars['String']['output']
  titlequestion?: Maybe<Scalars['String']['output']>
}

export type DestinationInput = {
  alt: Scalars['String']['input']
  categories: Array<Scalars['String']['input']>
  country: Scalars['String']['input']
  description: Scalars['String']['input']
  image: Scalars['String']['input']
  longdescription: Scalars['String']['input']
  rating: Scalars['Float']['input']
  region?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
  titlequestion?: InputMaybe<Scalars['String']['input']>
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  addFavoriteToUser: User
  addReviewToUser: User
  createDestination?: Maybe<Destination>
  createDestinations: Array<Destination>
  createReview?: Maybe<Review>
  createUser: User
  deleteDestination?: Maybe<Destination>
  deleteReview?: Maybe<Review>
  deleteUser: User
  login?: Maybe<User>
  removeFavoriteFromUser: User
  updateUser: User
}

export type MutationAddFavoriteToUserArgs = {
  destinationID: Scalars['ID']['input']
  userID: Scalars['ID']['input']
}

export type MutationAddReviewToUserArgs = {
  reviewID: Scalars['ID']['input']
  userID: Scalars['ID']['input']
}

export type MutationCreateDestinationArgs = {
  destination: DestinationInput
}

export type MutationCreateDestinationsArgs = {
  destinations: Array<DestinationInput>
}

export type MutationCreateReviewArgs = {
  destinationid: Scalars['ID']['input']
  rating: Scalars['Int']['input']
  text: Scalars['String']['input']
  title: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type MutationCreateUserArgs = {
  name: Scalars['String']['input']
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type MutationDeleteDestinationArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRemoveFavoriteFromUserArgs = {
  destinationID: Scalars['ID']['input']
  userID: Scalars['ID']['input']
}

export type MutationUpdateUserArgs = {
  user: UserInput
}

export type PaginatedDestinations = {
  __typename?: 'PaginatedDestinations'
  destinations: Array<Destination>
  totalCount: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  getAllCountries: Array<Scalars['String']['output']>
  getAllDestinations?: Maybe<PaginatedDestinations>
  getAvailableCategories: Array<Scalars['String']['output']>
  getAvailableCountries: Array<Scalars['String']['output']>
  getDestination?: Maybe<Destination>
  getDestinationsByTextSimilarity?: Maybe<Array<Maybe<Destination>>>
  getFavoritesByUserID?: Maybe<Array<Destination>>
  getFeaturedDestinations?: Maybe<Array<Maybe<Destination>>>
  getReviewByID?: Maybe<Review>
  getReviews?: Maybe<Array<Review>>
  getReviewsByDestinationID?: Maybe<Array<Review>>
  getReviewsByUserID?: Maybe<Array<Review>>
  getUserByID?: Maybe<User>
  getUsers?: Maybe<Array<User>>
  getUsersByID?: Maybe<Array<User>>
  me?: Maybe<User>
}

export type QueryGetAllDestinationsArgs = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>
  countries?: InputMaybe<Array<Scalars['String']['input']>>
  limit: Scalars['Int']['input']
  page: Scalars['Int']['input']
  sorting?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetAvailableCategoriesArgs = {
  countries?: InputMaybe<Array<Scalars['String']['input']>>
}

export type QueryGetAvailableCountriesArgs = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>
}

export type QueryGetDestinationArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetDestinationsByTextSimilarityArgs = {
  searchText: Scalars['String']['input']
}

export type QueryGetFavoritesByUserIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetReviewByIdArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetReviewsByDestinationIdArgs = {
  destinationid: Scalars['ID']['input']
}

export type QueryGetReviewsByUserIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetUsersByIdArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type Review = {
  __typename?: 'Review'
  destinationid: Scalars['ID']['output']
  destinationname?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  rating: Scalars['Int']['output']
  text: Scalars['String']['output']
  title: Scalars['String']['output']
  user_avatar?: Maybe<Scalars['String']['output']>
  username: Scalars['String']['output']
}

export type ReviewInput = {
  destinationid: Scalars['ID']['input']
  rating: Scalars['Int']['input']
  text: Scalars['String']['input']
  title: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type User = {
  __typename?: 'User'
  favorites?: Maybe<Array<Destination>>
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  password: Scalars['String']['output']
  reviews?: Maybe<Array<Review>>
  username: Scalars['String']['output']
}

export type UserData = {
  __typename?: 'UserData'
  token: Scalars['String']['output']
  user: User
}

export type UserInput = {
  favorites?: InputMaybe<Array<DestinationInput>>
  id: Scalars['ID']['input']
  image?: InputMaybe<Scalars['Upload']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  reviews?: InputMaybe<Array<ReviewInput>>
  username?: InputMaybe<Scalars['String']['input']>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  Destination: ResolverTypeWrapper<Destination>
  DestinationInput: DestinationInput
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  LoginInput: LoginInput
  Mutation: ResolverTypeWrapper<{}>
  PaginatedDestinations: ResolverTypeWrapper<PaginatedDestinations>
  Query: ResolverTypeWrapper<{}>
  Review: ResolverTypeWrapper<Review>
  ReviewInput: ReviewInput
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>
  User: ResolverTypeWrapper<User>
  UserData: ResolverTypeWrapper<UserData>
  UserInput: UserInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output']
  Destination: Destination
  DestinationInput: DestinationInput
  Float: Scalars['Float']['output']
  ID: Scalars['ID']['output']
  Int: Scalars['Int']['output']
  LoginInput: LoginInput
  Mutation: {}
  PaginatedDestinations: PaginatedDestinations
  Query: {}
  Review: Review
  ReviewInput: ReviewInput
  String: Scalars['String']['output']
  Upload: Scalars['Upload']['output']
  User: User
  UserData: UserData
  UserInput: UserInput
}>

export type DestinationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination'],
> = ResolversObject<{
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  longdescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  titlequestion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  addFavoriteToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAddFavoriteToUserArgs, 'destinationID' | 'userID'>
  >
  addReviewToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAddReviewToUserArgs, 'reviewID' | 'userID'>
  >
  createDestination?: Resolver<
    Maybe<ResolversTypes['Destination']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDestinationArgs, 'destination'>
  >
  createDestinations?: Resolver<
    Array<ResolversTypes['Destination']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDestinationsArgs, 'destinations'>
  >
  createReview?: Resolver<
    Maybe<ResolversTypes['Review']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateReviewArgs, 'destinationid' | 'rating' | 'text' | 'title' | 'username'>
  >
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'name' | 'password' | 'username'>
  >
  deleteDestination?: Resolver<
    Maybe<ResolversTypes['Destination']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDestinationArgs, 'id'>
  >
  deleteReview?: Resolver<
    Maybe<ResolversTypes['Review']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReviewArgs, 'id'>
  >
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>
  removeFavoriteFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveFavoriteFromUserArgs, 'destinationID' | 'userID'>
  >
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>
}>

export type PaginatedDestinationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedDestinations'] = ResolversParentTypes['PaginatedDestinations'],
> = ResolversObject<{
  destinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  getAllCountries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  getAllDestinations?: Resolver<
    Maybe<ResolversTypes['PaginatedDestinations']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAllDestinationsArgs, 'limit' | 'page'>
  >
  getAvailableCategories?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<QueryGetAvailableCategoriesArgs>
  >
  getAvailableCountries?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<QueryGetAvailableCountriesArgs>
  >
  getDestination?: Resolver<
    Maybe<ResolversTypes['Destination']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetDestinationArgs, 'id'>
  >
  getDestinationsByTextSimilarity?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Destination']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetDestinationsByTextSimilarityArgs, 'searchText'>
  >
  getFavoritesByUserID?: Resolver<
    Maybe<Array<ResolversTypes['Destination']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetFavoritesByUserIdArgs, 'id'>
  >
  getFeaturedDestinations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Destination']>>>, ParentType, ContextType>
  getReviewByID?: Resolver<
    Maybe<ResolversTypes['Review']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetReviewByIdArgs, 'id'>
  >
  getReviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>
  getReviewsByDestinationID?: Resolver<
    Maybe<Array<ResolversTypes['Review']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetReviewsByDestinationIdArgs, 'destinationid'>
  >
  getReviewsByUserID?: Resolver<
    Maybe<Array<ResolversTypes['Review']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetReviewsByUserIdArgs, 'id'>
  >
  getUserByID?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByIdArgs, 'id'>
  >
  getUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
  getUsersByID?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUsersByIdArgs, 'ids'>
  >
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}>

export type ReviewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review'],
> = ResolversObject<{
  destinationid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  destinationname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  favorites?: Resolver<Maybe<Array<ResolversTypes['Destination']>>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserData'] = ResolversParentTypes['UserData'],
> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = any> = ResolversObject<{
  Destination?: DestinationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PaginatedDestinations?: PaginatedDestinationsResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Review?: ReviewResolvers<ContextType>
  Upload?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  UserData?: UserDataResolvers<ContextType>
}>

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: string
    name: string
    username: string
    image?: string | null
    reviews?: Array<{
      __typename?: 'Review'
      id: string
      title: string
      text: string
      rating: number
      username: string
      destinationid: string
      destinationname?: string | null
    }> | null
    favorites?: Array<{
      __typename?: 'Destination'
      id: string
      title: string
      titlequestion?: string | null
      description: string
      longdescription: string
      categories: Array<string>
      country: string
      region?: string | null
      image: string
      alt: string
      rating: number
    }> | null
  } | null
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    id: string
    name: string
    username: string
    image?: string | null
    reviews?: Array<{
      __typename?: 'Review'
      id: string
      title: string
      text: string
      rating: number
      destinationid: string
    }> | null
    favorites?: Array<{
      __typename?: 'Destination'
      id: string
      title: string
      region?: string | null
      rating: number
      description: string
      image: string
      alt: string
      country: string
    }> | null
  } | null
}

export type GetAllDestinationsQueryVariables = Exact<{
  page: Scalars['Int']['input']
  limit: Scalars['Int']['input']
  categories?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
  countries?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
  sorting?: InputMaybe<Scalars['String']['input']>
}>

export type GetAllDestinationsQuery = {
  __typename?: 'Query'
  getAllDestinations?: {
    __typename?: 'PaginatedDestinations'
    totalCount: number
    destinations: Array<{
      __typename?: 'Destination'
      id: string
      title: string
      country: string
      region?: string | null
      image: string
      description: string
      rating: number
      categories: Array<string>
    }>
  } | null
}

export type GetDestinationsByTextSimilarityQueryVariables = Exact<{
  searchText: Scalars['String']['input']
}>

export type GetDestinationsByTextSimilarityQuery = {
  __typename?: 'Query'
  getDestinationsByTextSimilarity?: Array<{
    __typename?: 'Destination'
    id: string
    title: string
    country: string
    region?: string | null
    image: string
    description: string
    rating: number
    categories: Array<string>
  } | null> | null
}

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCountriesQuery = { __typename?: 'Query'; getAllCountries: Array<string> }

export type GetDestinationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetDestinationByIdQuery = {
  __typename?: 'Query'
  getDestination?: {
    __typename?: 'Destination'
    id: string
    title: string
    region?: string | null
    rating: number
    description: string
    longdescription: string
    image: string
    alt: string
    country: string
    categories: Array<string>
  } | null
}

export type GetFeaturedDestinationsQueryVariables = Exact<{ [key: string]: never }>

export type GetFeaturedDestinationsQuery = {
  __typename?: 'Query'
  getFeaturedDestinations?: Array<{
    __typename?: 'Destination'
    id: string
    image: string
    alt: string
    categories: Array<string>
    titlequestion?: string | null
    country: string
  } | null> | null
}

export type GetAvailableCategoriesQueryVariables = Exact<{
  countries?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
}>

export type GetAvailableCategoriesQuery = { __typename?: 'Query'; getAvailableCategories: Array<string> }

export type GetAvailableCountriesQueryVariables = Exact<{
  categories?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
}>

export type GetAvailableCountriesQuery = { __typename?: 'Query'; getAvailableCountries: Array<string> }

export type CreateReviewMutationVariables = Exact<{
  destinationid: Scalars['ID']['input']
  title: Scalars['String']['input']
  text: Scalars['String']['input']
  rating: Scalars['Int']['input']
  username: Scalars['String']['input']
}>

export type CreateReviewMutation = {
  __typename?: 'Mutation'
  createReview?: {
    __typename?: 'Review'
    id: string
    rating: number
    title: string
    username: string
    text: string
  } | null
}

export type GetReviewsByDestinationIdQueryVariables = Exact<{
  destinationid: Scalars['ID']['input']
}>

export type GetReviewsByDestinationIdQuery = {
  __typename?: 'Query'
  getReviewsByDestinationID?: Array<{
    __typename?: 'Review'
    id: string
    rating: number
    title: string
    username: string
    user_avatar?: string | null
    text: string
    image?: string | null
  }> | null
}

export type GetReviewByUserIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetReviewByUserIdQuery = {
  __typename?: 'Query'
  getReviewsByUserID?: Array<{
    __typename?: 'Review'
    id: string
    title: string
    text: string
    rating: number
    destinationid: string
    destinationname?: string | null
  }> | null
}

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteReviewMutation = {
  __typename?: 'Mutation'
  deleteReview?: { __typename?: 'Review'; id: string } | null
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input']
  password: Scalars['String']['input']
  name: Scalars['String']['input']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'User'
    id: string
    name: string
    username: string
    image?: string | null
    reviews?: Array<{
      __typename?: 'Review'
      id: string
      title: string
      text: string
      rating: number
      destinationid: string
    }> | null
    favorites?: Array<{
      __typename?: 'Destination'
      id: string
      title: string
      region?: string | null
      rating: number
      description: string
      image: string
      alt: string
      country: string
    }> | null
  }
}

export type AddReviewToUserMutationVariables = Exact<{
  userID: Scalars['ID']['input']
  reviewID: Scalars['ID']['input']
}>

export type AddReviewToUserMutation = {
  __typename?: 'Mutation'
  addReviewToUser: { __typename?: 'User'; id: string; name: string; username: string }
}

export type UpdateUserMutationVariables = Exact<{
  user: UserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: { __typename?: 'User'; id: string; name: string; username: string; image?: string | null }
}

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteUserMutation = {
  __typename?: 'Mutation'
  deleteUser: { __typename?: 'User'; id: string; name: string; username: string }
}

export type AddFavoriteToUserMutationVariables = Exact<{
  userID: Scalars['ID']['input']
  destinationID: Scalars['ID']['input']
}>

export type AddFavoriteToUserMutation = {
  __typename?: 'Mutation'
  addFavoriteToUser: { __typename?: 'User'; id: string; name: string; username: string }
}

export type RemoveFavoriteFromUserMutationVariables = Exact<{
  userID: Scalars['ID']['input']
  destinationID: Scalars['ID']['input']
}>

export type RemoveFavoriteFromUserMutation = {
  __typename?: 'Mutation'
  removeFavoriteFromUser: { __typename?: 'User'; id: string; name: string; username: string }
}

export type GetReviewsByUserIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetReviewsByUserIdQuery = {
  __typename?: 'Query'
  getReviewsByUserID?: Array<{
    __typename?: 'Review'
    id: string
    title: string
    text: string
    rating: number
    username: string
    destinationid: string
  }> | null
}

export type GetFavoritesByUserIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetFavoritesByUserIdQuery = {
  __typename?: 'Query'
  getFavoritesByUserID?: Array<{
    __typename?: 'Destination'
    id: string
    title: string
    region?: string | null
    rating: number
    description: string
    image: string
    alt: string
    country: string
  }> | null
}

export const GetMeDocument = gql`
  query getMe {
    me {
      id
      name
      username
      image
      reviews {
        id
        title
        text
        rating
        username
        destinationid
        destinationname
      }
      favorites {
        id
        title
        titlequestion
        description
        longdescription
        categories
        country
        region
        image
        alt
        rating
      }
    }
  }
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export function useGetMeSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      id
      name
      username
      image
      reviews {
        id
        title
        text
        rating
        destinationid
      }
      favorites {
        id
        title
        region
        rating
        description
        image
        alt
        country
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const GetAllDestinationsDocument = gql`
  query GetAllDestinations($page: Int!, $limit: Int!, $categories: [String!], $countries: [String!], $sorting: String) {
    getAllDestinations(page: $page, limit: $limit, categories: $categories, countries: $countries, sorting: $sorting) {
      destinations {
        id
        title
        country
        region
        image
        description
        rating
        categories
      }
      totalCount
    }
  }
`

/**
 * __useGetAllDestinationsQuery__
 *
 * To run a query within a React component, call `useGetAllDestinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDestinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDestinationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      categories: // value for 'categories'
 *      countries: // value for 'countries'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useGetAllDestinationsQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllDestinationsQuery, GetAllDestinationsQueryVariables> &
    ({ variables: GetAllDestinationsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllDestinationsQuery, GetAllDestinationsQueryVariables>(GetAllDestinationsDocument, options)
}
export function useGetAllDestinationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllDestinationsQuery, GetAllDestinationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllDestinationsQuery, GetAllDestinationsQueryVariables>(
    GetAllDestinationsDocument,
    options,
  )
}
export function useGetAllDestinationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllDestinationsQuery, GetAllDestinationsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAllDestinationsQuery, GetAllDestinationsQueryVariables>(
    GetAllDestinationsDocument,
    options,
  )
}
export type GetAllDestinationsQueryHookResult = ReturnType<typeof useGetAllDestinationsQuery>
export type GetAllDestinationsLazyQueryHookResult = ReturnType<typeof useGetAllDestinationsLazyQuery>
export type GetAllDestinationsSuspenseQueryHookResult = ReturnType<typeof useGetAllDestinationsSuspenseQuery>
export type GetAllDestinationsQueryResult = Apollo.QueryResult<
  GetAllDestinationsQuery,
  GetAllDestinationsQueryVariables
>
export const GetDestinationsByTextSimilarityDocument = gql`
  query GetDestinationsByTextSimilarity($searchText: String!) {
    getDestinationsByTextSimilarity(searchText: $searchText) {
      id
      title
      country
      region
      image
      description
      rating
      categories
    }
  }
`

/**
 * __useGetDestinationsByTextSimilarityQuery__
 *
 * To run a query within a React component, call `useGetDestinationsByTextSimilarityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDestinationsByTextSimilarityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDestinationsByTextSimilarityQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useGetDestinationsByTextSimilarityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDestinationsByTextSimilarityQuery,
    GetDestinationsByTextSimilarityQueryVariables
  > &
    ({ variables: GetDestinationsByTextSimilarityQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDestinationsByTextSimilarityQuery, GetDestinationsByTextSimilarityQueryVariables>(
    GetDestinationsByTextSimilarityDocument,
    options,
  )
}
export function useGetDestinationsByTextSimilarityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDestinationsByTextSimilarityQuery,
    GetDestinationsByTextSimilarityQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDestinationsByTextSimilarityQuery, GetDestinationsByTextSimilarityQueryVariables>(
    GetDestinationsByTextSimilarityDocument,
    options,
  )
}
export function useGetDestinationsByTextSimilaritySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDestinationsByTextSimilarityQuery,
        GetDestinationsByTextSimilarityQueryVariables
      >,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetDestinationsByTextSimilarityQuery, GetDestinationsByTextSimilarityQueryVariables>(
    GetDestinationsByTextSimilarityDocument,
    options,
  )
}
export type GetDestinationsByTextSimilarityQueryHookResult = ReturnType<typeof useGetDestinationsByTextSimilarityQuery>
export type GetDestinationsByTextSimilarityLazyQueryHookResult = ReturnType<
  typeof useGetDestinationsByTextSimilarityLazyQuery
>
export type GetDestinationsByTextSimilaritySuspenseQueryHookResult = ReturnType<
  typeof useGetDestinationsByTextSimilaritySuspenseQuery
>
export type GetDestinationsByTextSimilarityQueryResult = Apollo.QueryResult<
  GetDestinationsByTextSimilarityQuery,
  GetDestinationsByTextSimilarityQueryVariables
>
export const GetAllCountriesDocument = gql`
  query GetAllCountries {
    getAllCountries
  }
`

/**
 * __useGetAllCountriesQuery__
 *
 * To run a query within a React component, call `useGetAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options)
}
export function useGetAllCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options)
}
export function useGetAllCountriesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options)
}
export type GetAllCountriesQueryHookResult = ReturnType<typeof useGetAllCountriesQuery>
export type GetAllCountriesLazyQueryHookResult = ReturnType<typeof useGetAllCountriesLazyQuery>
export type GetAllCountriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCountriesSuspenseQuery>
export type GetAllCountriesQueryResult = Apollo.QueryResult<GetAllCountriesQuery, GetAllCountriesQueryVariables>
export const GetDestinationByIdDocument = gql`
  query GetDestinationById($id: ID!) {
    getDestination(id: $id) {
      id
      title
      region
      rating
      description
      longdescription
      image
      alt
      country
      categories
    }
  }
`

/**
 * __useGetDestinationByIdQuery__
 *
 * To run a query within a React component, call `useGetDestinationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDestinationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDestinationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDestinationByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetDestinationByIdQuery, GetDestinationByIdQueryVariables> &
    ({ variables: GetDestinationByIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDestinationByIdQuery, GetDestinationByIdQueryVariables>(GetDestinationByIdDocument, options)
}
export function useGetDestinationByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDestinationByIdQuery, GetDestinationByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDestinationByIdQuery, GetDestinationByIdQueryVariables>(
    GetDestinationByIdDocument,
    options,
  )
}
export function useGetDestinationByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetDestinationByIdQuery, GetDestinationByIdQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetDestinationByIdQuery, GetDestinationByIdQueryVariables>(
    GetDestinationByIdDocument,
    options,
  )
}
export type GetDestinationByIdQueryHookResult = ReturnType<typeof useGetDestinationByIdQuery>
export type GetDestinationByIdLazyQueryHookResult = ReturnType<typeof useGetDestinationByIdLazyQuery>
export type GetDestinationByIdSuspenseQueryHookResult = ReturnType<typeof useGetDestinationByIdSuspenseQuery>
export type GetDestinationByIdQueryResult = Apollo.QueryResult<
  GetDestinationByIdQuery,
  GetDestinationByIdQueryVariables
>
export const GetFeaturedDestinationsDocument = gql`
  query GetFeaturedDestinations {
    getFeaturedDestinations {
      id
      image
      alt
      categories
      titlequestion
      country
    }
  }
`

/**
 * __useGetFeaturedDestinationsQuery__
 *
 * To run a query within a React component, call `useGetFeaturedDestinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedDestinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedDestinationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturedDestinationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>(
    GetFeaturedDestinationsDocument,
    options,
  )
}
export function useGetFeaturedDestinationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>(
    GetFeaturedDestinationsDocument,
    options,
  )
}
export function useGetFeaturedDestinationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetFeaturedDestinationsQuery, GetFeaturedDestinationsQueryVariables>(
    GetFeaturedDestinationsDocument,
    options,
  )
}
export type GetFeaturedDestinationsQueryHookResult = ReturnType<typeof useGetFeaturedDestinationsQuery>
export type GetFeaturedDestinationsLazyQueryHookResult = ReturnType<typeof useGetFeaturedDestinationsLazyQuery>
export type GetFeaturedDestinationsSuspenseQueryHookResult = ReturnType<typeof useGetFeaturedDestinationsSuspenseQuery>
export type GetFeaturedDestinationsQueryResult = Apollo.QueryResult<
  GetFeaturedDestinationsQuery,
  GetFeaturedDestinationsQueryVariables
>
export const GetAvailableCategoriesDocument = gql`
  query GetAvailableCategories($countries: [String!]) {
    getAvailableCategories(countries: $countries)
  }
`

/**
 * __useGetAvailableCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAvailableCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableCategoriesQuery({
 *   variables: {
 *      countries: // value for 'countries'
 *   },
 * });
 */
export function useGetAvailableCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>(
    GetAvailableCategoriesDocument,
    options,
  )
}
export function useGetAvailableCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>(
    GetAvailableCategoriesDocument,
    options,
  )
}
export function useGetAvailableCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAvailableCategoriesQuery, GetAvailableCategoriesQueryVariables>(
    GetAvailableCategoriesDocument,
    options,
  )
}
export type GetAvailableCategoriesQueryHookResult = ReturnType<typeof useGetAvailableCategoriesQuery>
export type GetAvailableCategoriesLazyQueryHookResult = ReturnType<typeof useGetAvailableCategoriesLazyQuery>
export type GetAvailableCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAvailableCategoriesSuspenseQuery>
export type GetAvailableCategoriesQueryResult = Apollo.QueryResult<
  GetAvailableCategoriesQuery,
  GetAvailableCategoriesQueryVariables
>
export const GetAvailableCountriesDocument = gql`
  query GetAvailableCountries($categories: [String!]) {
    getAvailableCountries(categories: $categories)
  }
`

/**
 * __useGetAvailableCountriesQuery__
 *
 * To run a query within a React component, call `useGetAvailableCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableCountriesQuery({
 *   variables: {
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useGetAvailableCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>(
    GetAvailableCountriesDocument,
    options,
  )
}
export function useGetAvailableCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>(
    GetAvailableCountriesDocument,
    options,
  )
}
export function useGetAvailableCountriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAvailableCountriesQuery, GetAvailableCountriesQueryVariables>(
    GetAvailableCountriesDocument,
    options,
  )
}
export type GetAvailableCountriesQueryHookResult = ReturnType<typeof useGetAvailableCountriesQuery>
export type GetAvailableCountriesLazyQueryHookResult = ReturnType<typeof useGetAvailableCountriesLazyQuery>
export type GetAvailableCountriesSuspenseQueryHookResult = ReturnType<typeof useGetAvailableCountriesSuspenseQuery>
export type GetAvailableCountriesQueryResult = Apollo.QueryResult<
  GetAvailableCountriesQuery,
  GetAvailableCountriesQueryVariables
>
export const CreateReviewDocument = gql`
  mutation createReview($destinationid: ID!, $title: String!, $text: String!, $rating: Int!, $username: String!) {
    createReview(destinationid: $destinationid, title: $title, text: $text, rating: $rating, username: $username) {
      id
      rating
      title
      username
      text
    }
  }
`
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      destinationid: // value for 'destinationid'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      rating: // value for 'rating'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options)
}
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateReviewMutation,
  CreateReviewMutationVariables
>
export const GetReviewsByDestinationIdDocument = gql`
  query getReviewsByDestinationID($destinationid: ID!) {
    getReviewsByDestinationID(destinationid: $destinationid) {
      id
      rating
      title
      username
      user_avatar
      text
      image
    }
  }
`

/**
 * __useGetReviewsByDestinationIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByDestinationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByDestinationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByDestinationIdQuery({
 *   variables: {
 *      destinationid: // value for 'destinationid'
 *   },
 * });
 */
export function useGetReviewsByDestinationIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables> &
    ({ variables: GetReviewsByDestinationIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables>(
    GetReviewsByDestinationIdDocument,
    options,
  )
}
export function useGetReviewsByDestinationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables>(
    GetReviewsByDestinationIdDocument,
    options,
  )
}
export function useGetReviewsByDestinationIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetReviewsByDestinationIdQuery, GetReviewsByDestinationIdQueryVariables>(
    GetReviewsByDestinationIdDocument,
    options,
  )
}
export type GetReviewsByDestinationIdQueryHookResult = ReturnType<typeof useGetReviewsByDestinationIdQuery>
export type GetReviewsByDestinationIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByDestinationIdLazyQuery>
export type GetReviewsByDestinationIdSuspenseQueryHookResult = ReturnType<
  typeof useGetReviewsByDestinationIdSuspenseQuery
>
export type GetReviewsByDestinationIdQueryResult = Apollo.QueryResult<
  GetReviewsByDestinationIdQuery,
  GetReviewsByDestinationIdQueryVariables
>
export const GetReviewByUserIdDocument = gql`
  query getReviewByUserID($id: ID!) {
    getReviewsByUserID(id: $id) {
      id
      title
      text
      rating
      destinationid
      destinationname
    }
  }
`

/**
 * __useGetReviewByUserIdQuery__
 *
 * To run a query within a React component, call `useGetReviewByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReviewByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables> &
    ({ variables: GetReviewByUserIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>(GetReviewByUserIdDocument, options)
}
export function useGetReviewByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>(
    GetReviewByUserIdDocument,
    options,
  )
}
export function useGetReviewByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>(
    GetReviewByUserIdDocument,
    options,
  )
}
export type GetReviewByUserIdQueryHookResult = ReturnType<typeof useGetReviewByUserIdQuery>
export type GetReviewByUserIdLazyQueryHookResult = ReturnType<typeof useGetReviewByUserIdLazyQuery>
export type GetReviewByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetReviewByUserIdSuspenseQuery>
export type GetReviewByUserIdQueryResult = Apollo.QueryResult<GetReviewByUserIdQuery, GetReviewByUserIdQueryVariables>
export const DeleteReviewDocument = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
    }
  }
`
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options)
}
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>
export const CreateUserDocument = gql`
  mutation createUser($username: String!, $password: String!, $name: String!) {
    createUser(username: $username, password: $password, name: $name) {
      id
      name
      username
      image
      reviews {
        id
        title
        text
        rating
        destinationid
      }
      favorites {
        id
        title
        region
        rating
        description
        image
        alt
        country
      }
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options)
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>
export const AddReviewToUserDocument = gql`
  mutation addReviewToUser($userID: ID!, $reviewID: ID!) {
    addReviewToUser(userID: $userID, reviewID: $reviewID) {
      id
      name
      username
    }
  }
`
export type AddReviewToUserMutationFn = Apollo.MutationFunction<
  AddReviewToUserMutation,
  AddReviewToUserMutationVariables
>

/**
 * __useAddReviewToUserMutation__
 *
 * To run a mutation, you first call `useAddReviewToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewToUserMutation, { data, loading, error }] = useAddReviewToUserMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      reviewID: // value for 'reviewID'
 *   },
 * });
 */
export function useAddReviewToUserMutation(
  baseOptions?: Apollo.MutationHookOptions<AddReviewToUserMutation, AddReviewToUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddReviewToUserMutation, AddReviewToUserMutationVariables>(AddReviewToUserDocument, options)
}
export type AddReviewToUserMutationHookResult = ReturnType<typeof useAddReviewToUserMutation>
export type AddReviewToUserMutationResult = Apollo.MutationResult<AddReviewToUserMutation>
export type AddReviewToUserMutationOptions = Apollo.BaseMutationOptions<
  AddReviewToUserMutation,
  AddReviewToUserMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
      name
      username
      image
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options)
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      username
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options)
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>
export const AddFavoriteToUserDocument = gql`
  mutation addFavoriteToUser($userID: ID!, $destinationID: ID!) {
    addFavoriteToUser(userID: $userID, destinationID: $destinationID) {
      id
      name
      username
    }
  }
`
export type AddFavoriteToUserMutationFn = Apollo.MutationFunction<
  AddFavoriteToUserMutation,
  AddFavoriteToUserMutationVariables
>

/**
 * __useAddFavoriteToUserMutation__
 *
 * To run a mutation, you first call `useAddFavoriteToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteToUserMutation, { data, loading, error }] = useAddFavoriteToUserMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      destinationID: // value for 'destinationID'
 *   },
 * });
 */
export function useAddFavoriteToUserMutation(
  baseOptions?: Apollo.MutationHookOptions<AddFavoriteToUserMutation, AddFavoriteToUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddFavoriteToUserMutation, AddFavoriteToUserMutationVariables>(
    AddFavoriteToUserDocument,
    options,
  )
}
export type AddFavoriteToUserMutationHookResult = ReturnType<typeof useAddFavoriteToUserMutation>
export type AddFavoriteToUserMutationResult = Apollo.MutationResult<AddFavoriteToUserMutation>
export type AddFavoriteToUserMutationOptions = Apollo.BaseMutationOptions<
  AddFavoriteToUserMutation,
  AddFavoriteToUserMutationVariables
>
export const RemoveFavoriteFromUserDocument = gql`
  mutation removeFavoriteFromUser($userID: ID!, $destinationID: ID!) {
    removeFavoriteFromUser(userID: $userID, destinationID: $destinationID) {
      id
      name
      username
    }
  }
`
export type RemoveFavoriteFromUserMutationFn = Apollo.MutationFunction<
  RemoveFavoriteFromUserMutation,
  RemoveFavoriteFromUserMutationVariables
>

/**
 * __useRemoveFavoriteFromUserMutation__
 *
 * To run a mutation, you first call `useRemoveFavoriteFromUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavoriteFromUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavoriteFromUserMutation, { data, loading, error }] = useRemoveFavoriteFromUserMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      destinationID: // value for 'destinationID'
 *   },
 * });
 */
export function useRemoveFavoriteFromUserMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveFavoriteFromUserMutation, RemoveFavoriteFromUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveFavoriteFromUserMutation, RemoveFavoriteFromUserMutationVariables>(
    RemoveFavoriteFromUserDocument,
    options,
  )
}
export type RemoveFavoriteFromUserMutationHookResult = ReturnType<typeof useRemoveFavoriteFromUserMutation>
export type RemoveFavoriteFromUserMutationResult = Apollo.MutationResult<RemoveFavoriteFromUserMutation>
export type RemoveFavoriteFromUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveFavoriteFromUserMutation,
  RemoveFavoriteFromUserMutationVariables
>
export const GetReviewsByUserIdDocument = gql`
  query getReviewsByUserID($id: ID!) {
    getReviewsByUserID(id: $id) {
      id
      title
      text
      rating
      username
      destinationid
    }
  }
`

/**
 * __useGetReviewsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReviewsByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables> &
    ({ variables: GetReviewsByUserIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(GetReviewsByUserIdDocument, options)
}
export function useGetReviewsByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(
    GetReviewsByUserIdDocument,
    options,
  )
}
export function useGetReviewsByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetReviewsByUserIdQuery, GetReviewsByUserIdQueryVariables>(
    GetReviewsByUserIdDocument,
    options,
  )
}
export type GetReviewsByUserIdQueryHookResult = ReturnType<typeof useGetReviewsByUserIdQuery>
export type GetReviewsByUserIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByUserIdLazyQuery>
export type GetReviewsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetReviewsByUserIdSuspenseQuery>
export type GetReviewsByUserIdQueryResult = Apollo.QueryResult<
  GetReviewsByUserIdQuery,
  GetReviewsByUserIdQueryVariables
>
export const GetFavoritesByUserIdDocument = gql`
  query getFavoritesByUserID($id: ID!) {
    getFavoritesByUserID(id: $id) {
      id
      title
      region
      rating
      description
      image
      alt
      country
    }
  }
`

/**
 * __useGetFavoritesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetFavoritesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoritesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoritesByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFavoritesByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables> &
    ({ variables: GetFavoritesByUserIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables>(
    GetFavoritesByUserIdDocument,
    options,
  )
}
export function useGetFavoritesByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables>(
    GetFavoritesByUserIdDocument,
    options,
  )
}
export function useGetFavoritesByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetFavoritesByUserIdQuery, GetFavoritesByUserIdQueryVariables>(
    GetFavoritesByUserIdDocument,
    options,
  )
}
export type GetFavoritesByUserIdQueryHookResult = ReturnType<typeof useGetFavoritesByUserIdQuery>
export type GetFavoritesByUserIdLazyQueryHookResult = ReturnType<typeof useGetFavoritesByUserIdLazyQuery>
export type GetFavoritesByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetFavoritesByUserIdSuspenseQuery>
export type GetFavoritesByUserIdQueryResult = Apollo.QueryResult<
  GetFavoritesByUserIdQuery,
  GetFavoritesByUserIdQueryVariables
>
