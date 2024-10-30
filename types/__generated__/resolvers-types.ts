import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Destination = {
  __typename?: 'Destination';
  alt: Scalars['String']['output'];
  categories: Array<Maybe<Scalars['String']['output']>>;
  country: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  longdescription: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  region?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  titlequestion?: Maybe<Scalars['String']['output']>;
};

export type DestinationInput = {
  alt: Scalars['String']['input'];
  categories: Array<InputMaybe<Scalars['String']['input']>>;
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  longdescription: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  titlequestion?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDestination?: Maybe<Destination>;
  createDestinations: Array<Destination>;
  createReview?: Maybe<Review>;
  createTable?: Maybe<Table>;
  createUser?: Maybe<User>;
  deleteDestination?: Maybe<Destination>;
  deleteReview?: Maybe<Review>;
  deleteTable?: Maybe<Table>;
  deleteUser?: Maybe<User>;
  updateReview?: Maybe<Review>;
  updateUser?: Maybe<User>;
};


export type MutationCreateDestinationArgs = {
  destination?: InputMaybe<DestinationInput>;
};


export type MutationCreateDestinationsArgs = {
  destinations: Array<DestinationInput>;
};


export type MutationCreateReviewArgs = {
  rating: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  user: UserInput;
};


export type MutationCreateTableArgs = {
  columns: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  hashedpassword: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteDestinationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTableArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateReviewArgs = {
  review: ReviewInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllDestinations?: Maybe<Array<Maybe<Destination>>>;
  getDestination?: Maybe<Destination>;
  getReviewByID?: Maybe<Review>;
  getReviews?: Maybe<Array<Maybe<Review>>>;
  getReviewsByID?: Maybe<Array<Maybe<Review>>>;
  getUserByID?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  getUsersByID?: Maybe<Array<User>>;
};


export type QueryGetDestinationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetReviewByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetReviewsByIdArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersByIdArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type ReviewInput = {
  rating: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  user: UserInput;
};

export type Table = {
  __typename?: 'Table';
  columns: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  favorites?: Maybe<Array<Destination>>;
  hashedpassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  favorites?: InputMaybe<Array<DestinationInput>>;
  hashedpassword: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  reviews?: InputMaybe<Array<ReviewInput>>;
  username: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Destination: ResolverTypeWrapper<Destination>;
  DestinationInput: DestinationInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ReviewInput: ReviewInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Table: ResolverTypeWrapper<Table>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Destination: Destination;
  DestinationInput: DestinationInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Review: Review;
  ReviewInput: ReviewInput;
  String: Scalars['String']['output'];
  Table: Table;
  User: User;
  UserInput: UserInput;
}>;

export type DestinationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']> = ResolversObject<{
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longdescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  titlequestion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDestination?: Resolver<Maybe<ResolversTypes['Destination']>, ParentType, ContextType, Partial<MutationCreateDestinationArgs>>;
  createDestinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType, RequireFields<MutationCreateDestinationsArgs, 'destinations'>>;
  createReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'rating' | 'text' | 'title' | 'user'>>;
  createTable?: Resolver<Maybe<ResolversTypes['Table']>, ParentType, ContextType, RequireFields<MutationCreateTableArgs, 'columns' | 'name'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'hashedpassword' | 'name' | 'username'>>;
  deleteDestination?: Resolver<Maybe<ResolversTypes['Destination']>, ParentType, ContextType, RequireFields<MutationDeleteDestinationArgs, 'id'>>;
  deleteReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  deleteTable?: Resolver<Maybe<ResolversTypes['Table']>, ParentType, ContextType, RequireFields<MutationDeleteTableArgs, 'name'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'review'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllDestinations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Destination']>>>, ParentType, ContextType>;
  getDestination?: Resolver<Maybe<ResolversTypes['Destination']>, ParentType, ContextType, RequireFields<QueryGetDestinationArgs, 'id'>>;
  getReviewByID?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryGetReviewByIdArgs, 'id'>>;
  getReviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  getReviewsByID?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType, Partial<QueryGetReviewsByIdArgs>>;
  getUserByID?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  getUsersByID?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryGetUsersByIdArgs>>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Table'] = ResolversParentTypes['Table']> = ResolversObject<{
  columns?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  favorites?: Resolver<Maybe<Array<ResolversTypes['Destination']>>, ParentType, ContextType>;
  hashedpassword?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Destination?: DestinationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

