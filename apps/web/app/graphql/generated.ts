import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CalendarDay: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  content: Action_Content_Document;
  date: Scalars['CalendarDay']['output'];
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  keywords: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  resume: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: ActionStatusType;
  title: Scalars['String']['output'];
};

export type ActionCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActionStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ActionOrderByInput = {
  date?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  keywords?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  resume?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export enum ActionStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type ActionStatusTypeNullableFilter = {
  equals?: InputMaybe<ActionStatusType>;
  in?: InputMaybe<Array<ActionStatusType>>;
  not?: InputMaybe<ActionStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<ActionStatusType>>;
};

export type ActionUpdateArgs = {
  data: ActionUpdateInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActionStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ActionWhereInput = {
  AND?: InputMaybe<Array<ActionWhereInput>>;
  NOT?: InputMaybe<Array<ActionWhereInput>>;
  OR?: InputMaybe<Array<ActionWhereInput>>;
  date?: InputMaybe<CalendarDayFilter>;
  id?: InputMaybe<IdFilter>;
  keywords?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  resume?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<ActionStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ActionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Action_Content_Document = {
  __typename?: 'Action_content_Document';
  document: Scalars['JSON']['output'];
};


export type Action_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type ActionsSection = {
  __typename?: 'ActionsSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ActionsSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ActionsSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ActionsSectionUpdateArgs = {
  data: ActionsSectionUpdateInput;
  where?: ActionsSectionWhereUniqueInput;
};

export type ActionsSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ActionsSectionWhereInput = {
  AND?: InputMaybe<Array<ActionsSectionWhereInput>>;
  NOT?: InputMaybe<Array<ActionsSectionWhereInput>>;
  OR?: InputMaybe<Array<ActionsSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ActionsSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthenticatedItem = User;

export type CalendarDayFilter = {
  equals?: InputMaybe<Scalars['CalendarDay']['input']>;
  gt?: InputMaybe<Scalars['CalendarDay']['input']>;
  gte?: InputMaybe<Scalars['CalendarDay']['input']>;
  in?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
  lt?: InputMaybe<Scalars['CalendarDay']['input']>;
  lte?: InputMaybe<Scalars['CalendarDay']['input']>;
  not?: InputMaybe<CalendarDayFilter>;
  notIn?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  facebookUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instagramUrl: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  title: Scalars['String']['output'];
  youtubeUrl: Scalars['String']['output'];
};

export type CompanyCreateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyOrderByInput = {
  address?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  facebookUrl?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  instagramUrl?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  youtubeUrl?: InputMaybe<OrderDirection>;
};

export type CompanyUpdateArgs = {
  data: CompanyUpdateInput;
  where?: CompanyWhereUniqueInput;
};

export type CompanyUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  address?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  facebookUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  instagramUrl?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  youtubeUrl?: InputMaybe<StringFilter>;
};

export type CompanyWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Event = {
  __typename?: 'Event';
  content: Event_Content_Document;
  date: Scalars['CalendarDay']['output'];
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  keywords: Scalars['String']['output'];
  link: Scalars['String']['output'];
  locale: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  resume: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: EventStatusType;
  title: Scalars['String']['output'];
  workload: Scalars['Int']['output'];
};

export type EventCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  workload?: InputMaybe<Scalars['Int']['input']>;
};

export type EventOrderByInput = {
  date?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  keywords?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  locale?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  resume?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  workload?: InputMaybe<OrderDirection>;
};

export enum EventStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type EventStatusTypeNullableFilter = {
  equals?: InputMaybe<EventStatusType>;
  in?: InputMaybe<Array<EventStatusType>>;
  not?: InputMaybe<EventStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<EventStatusType>>;
};

export type EventUpdateArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};

export type EventUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  workload?: InputMaybe<Scalars['Int']['input']>;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  date?: InputMaybe<CalendarDayFilter>;
  id?: InputMaybe<IdFilter>;
  keywords?: InputMaybe<StringFilter>;
  link?: InputMaybe<StringFilter>;
  locale?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  resume?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<EventStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
  workload?: InputMaybe<IntFilter>;
};

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Event_Content_Document = {
  __typename?: 'Event_content_Document';
  document: Scalars['JSON']['output'];
};


export type Event_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type EventsSection = {
  __typename?: 'EventsSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type EventsSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventsSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type EventsSectionUpdateArgs = {
  data: EventsSectionUpdateInput;
  where?: EventsSectionWhereUniqueInput;
};

export type EventsSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventsSectionWhereInput = {
  AND?: InputMaybe<Array<EventsSectionWhereInput>>;
  NOT?: InputMaybe<Array<EventsSectionWhereInput>>;
  OR?: InputMaybe<Array<EventsSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type EventsSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type History = {
  __typename?: 'History';
  contentFive: Scalars['String']['output'];
  contentFour: Scalars['String']['output'];
  contentOne: Scalars['String']['output'];
  contentThree: Scalars['String']['output'];
  contentTwo: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  titleFive: Scalars['String']['output'];
  titleFour: Scalars['String']['output'];
  titleOne: Scalars['String']['output'];
  titleThree: Scalars['String']['output'];
  titleTwo: Scalars['String']['output'];
};

export type HistoryCreateInput = {
  contentFive?: InputMaybe<Scalars['String']['input']>;
  contentFour?: InputMaybe<Scalars['String']['input']>;
  contentOne?: InputMaybe<Scalars['String']['input']>;
  contentThree?: InputMaybe<Scalars['String']['input']>;
  contentTwo?: InputMaybe<Scalars['String']['input']>;
  titleFive?: InputMaybe<Scalars['String']['input']>;
  titleFour?: InputMaybe<Scalars['String']['input']>;
  titleOne?: InputMaybe<Scalars['String']['input']>;
  titleThree?: InputMaybe<Scalars['String']['input']>;
  titleTwo?: InputMaybe<Scalars['String']['input']>;
};

export type HistoryOrderByInput = {
  contentFive?: InputMaybe<OrderDirection>;
  contentFour?: InputMaybe<OrderDirection>;
  contentOne?: InputMaybe<OrderDirection>;
  contentThree?: InputMaybe<OrderDirection>;
  contentTwo?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  titleFive?: InputMaybe<OrderDirection>;
  titleFour?: InputMaybe<OrderDirection>;
  titleOne?: InputMaybe<OrderDirection>;
  titleThree?: InputMaybe<OrderDirection>;
  titleTwo?: InputMaybe<OrderDirection>;
};

export type HistorySection = {
  __typename?: 'HistorySection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type HistorySectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type HistorySectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type HistorySectionUpdateArgs = {
  data: HistorySectionUpdateInput;
  where?: HistorySectionWhereUniqueInput;
};

export type HistorySectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type HistorySectionWhereInput = {
  AND?: InputMaybe<Array<HistorySectionWhereInput>>;
  NOT?: InputMaybe<Array<HistorySectionWhereInput>>;
  OR?: InputMaybe<Array<HistorySectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HistorySectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type HistoryUpdateArgs = {
  data: HistoryUpdateInput;
  where?: HistoryWhereUniqueInput;
};

export type HistoryUpdateInput = {
  contentFive?: InputMaybe<Scalars['String']['input']>;
  contentFour?: InputMaybe<Scalars['String']['input']>;
  contentOne?: InputMaybe<Scalars['String']['input']>;
  contentThree?: InputMaybe<Scalars['String']['input']>;
  contentTwo?: InputMaybe<Scalars['String']['input']>;
  titleFive?: InputMaybe<Scalars['String']['input']>;
  titleFour?: InputMaybe<Scalars['String']['input']>;
  titleOne?: InputMaybe<Scalars['String']['input']>;
  titleThree?: InputMaybe<Scalars['String']['input']>;
  titleTwo?: InputMaybe<Scalars['String']['input']>;
};

export type HistoryWhereInput = {
  AND?: InputMaybe<Array<HistoryWhereInput>>;
  NOT?: InputMaybe<Array<HistoryWhereInput>>;
  OR?: InputMaybe<Array<HistoryWhereInput>>;
  contentFive?: InputMaybe<StringFilter>;
  contentFour?: InputMaybe<StringFilter>;
  contentOne?: InputMaybe<StringFilter>;
  contentThree?: InputMaybe<StringFilter>;
  contentTwo?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  titleFive?: InputMaybe<StringFilter>;
  titleFour?: InputMaybe<StringFilter>;
  titleOne?: InputMaybe<StringFilter>;
  titleThree?: InputMaybe<StringFilter>;
  titleTwo?: InputMaybe<StringFilter>;
};

export type HistoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type HomeSection = {
  __typename?: 'HomeSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  title: Scalars['String']['output'];
};

export type HomeSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type HomeSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type HomeSectionUpdateArgs = {
  data: HomeSectionUpdateInput;
  where?: HomeSectionWhereUniqueInput;
};

export type HomeSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type HomeSectionWhereInput = {
  AND?: InputMaybe<Array<HomeSectionWhereInput>>;
  NOT?: InputMaybe<Array<HomeSectionWhereInput>>;
  OR?: InputMaybe<Array<HomeSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HomeSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createAction?: Maybe<Action>;
  createActions?: Maybe<Array<Maybe<Action>>>;
  createActionsSection?: Maybe<ActionsSection>;
  createActionsSections?: Maybe<Array<Maybe<ActionsSection>>>;
  createCompanies?: Maybe<Array<Maybe<Company>>>;
  createCompany?: Maybe<Company>;
  createEvent?: Maybe<Event>;
  createEvents?: Maybe<Array<Maybe<Event>>>;
  createEventsSection?: Maybe<EventsSection>;
  createEventsSections?: Maybe<Array<Maybe<EventsSection>>>;
  createHistories?: Maybe<Array<Maybe<History>>>;
  createHistory?: Maybe<History>;
  createHistorySection?: Maybe<HistorySection>;
  createHistorySections?: Maybe<Array<Maybe<HistorySection>>>;
  createHomeSection?: Maybe<HomeSection>;
  createHomeSections?: Maybe<Array<Maybe<HomeSection>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createNewsletterList?: Maybe<NewsletterList>;
  createNewsletterLists?: Maybe<Array<Maybe<NewsletterList>>>;
  createProject?: Maybe<Project>;
  createProjects?: Maybe<Array<Maybe<Project>>>;
  createProjectsSection?: Maybe<ProjectsSection>;
  createProjectsSections?: Maybe<Array<Maybe<ProjectsSection>>>;
  createPublication?: Maybe<Publication>;
  createPublications?: Maybe<Array<Maybe<Publication>>>;
  createPublicationsSection?: Maybe<PublicationsSection>;
  createPublicationsSections?: Maybe<Array<Maybe<PublicationsSection>>>;
  createResearchArea?: Maybe<ResearchArea>;
  createResearchAreas?: Maybe<Array<Maybe<ResearchArea>>>;
  createResearchSection?: Maybe<ResearchSection>;
  createResearchSections?: Maybe<Array<Maybe<ResearchSection>>>;
  createResearcher?: Maybe<Researcher>;
  createResearchers?: Maybe<Array<Maybe<Researcher>>>;
  createTeamMember?: Maybe<TeamMember>;
  createTeamMembers?: Maybe<Array<Maybe<TeamMember>>>;
  createTeamSection?: Maybe<TeamSection>;
  createTeamSections?: Maybe<Array<Maybe<TeamSection>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteAction?: Maybe<Action>;
  deleteActions?: Maybe<Array<Maybe<Action>>>;
  deleteActionsSection?: Maybe<ActionsSection>;
  deleteActionsSections?: Maybe<Array<Maybe<ActionsSection>>>;
  deleteCompanies?: Maybe<Array<Maybe<Company>>>;
  deleteCompany?: Maybe<Company>;
  deleteEvent?: Maybe<Event>;
  deleteEvents?: Maybe<Array<Maybe<Event>>>;
  deleteEventsSection?: Maybe<EventsSection>;
  deleteEventsSections?: Maybe<Array<Maybe<EventsSection>>>;
  deleteHistories?: Maybe<Array<Maybe<History>>>;
  deleteHistory?: Maybe<History>;
  deleteHistorySection?: Maybe<HistorySection>;
  deleteHistorySections?: Maybe<Array<Maybe<HistorySection>>>;
  deleteHomeSection?: Maybe<HomeSection>;
  deleteHomeSections?: Maybe<Array<Maybe<HomeSection>>>;
  deleteNewsletterList?: Maybe<NewsletterList>;
  deleteNewsletterLists?: Maybe<Array<Maybe<NewsletterList>>>;
  deleteProject?: Maybe<Project>;
  deleteProjects?: Maybe<Array<Maybe<Project>>>;
  deleteProjectsSection?: Maybe<ProjectsSection>;
  deleteProjectsSections?: Maybe<Array<Maybe<ProjectsSection>>>;
  deletePublication?: Maybe<Publication>;
  deletePublications?: Maybe<Array<Maybe<Publication>>>;
  deletePublicationsSection?: Maybe<PublicationsSection>;
  deletePublicationsSections?: Maybe<Array<Maybe<PublicationsSection>>>;
  deleteResearchArea?: Maybe<ResearchArea>;
  deleteResearchAreas?: Maybe<Array<Maybe<ResearchArea>>>;
  deleteResearchSection?: Maybe<ResearchSection>;
  deleteResearchSections?: Maybe<Array<Maybe<ResearchSection>>>;
  deleteResearcher?: Maybe<Researcher>;
  deleteResearchers?: Maybe<Array<Maybe<Researcher>>>;
  deleteTeamMember?: Maybe<TeamMember>;
  deleteTeamMembers?: Maybe<Array<Maybe<TeamMember>>>;
  deleteTeamSection?: Maybe<TeamSection>;
  deleteTeamSections?: Maybe<Array<Maybe<TeamSection>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateAction?: Maybe<Action>;
  updateActions?: Maybe<Array<Maybe<Action>>>;
  updateActionsSection?: Maybe<ActionsSection>;
  updateActionsSections?: Maybe<Array<Maybe<ActionsSection>>>;
  updateCompanies?: Maybe<Array<Maybe<Company>>>;
  updateCompany?: Maybe<Company>;
  updateEvent?: Maybe<Event>;
  updateEvents?: Maybe<Array<Maybe<Event>>>;
  updateEventsSection?: Maybe<EventsSection>;
  updateEventsSections?: Maybe<Array<Maybe<EventsSection>>>;
  updateHistories?: Maybe<Array<Maybe<History>>>;
  updateHistory?: Maybe<History>;
  updateHistorySection?: Maybe<HistorySection>;
  updateHistorySections?: Maybe<Array<Maybe<HistorySection>>>;
  updateHomeSection?: Maybe<HomeSection>;
  updateHomeSections?: Maybe<Array<Maybe<HomeSection>>>;
  updateNewsletterList?: Maybe<NewsletterList>;
  updateNewsletterLists?: Maybe<Array<Maybe<NewsletterList>>>;
  updateProject?: Maybe<Project>;
  updateProjects?: Maybe<Array<Maybe<Project>>>;
  updateProjectsSection?: Maybe<ProjectsSection>;
  updateProjectsSections?: Maybe<Array<Maybe<ProjectsSection>>>;
  updatePublication?: Maybe<Publication>;
  updatePublications?: Maybe<Array<Maybe<Publication>>>;
  updatePublicationsSection?: Maybe<PublicationsSection>;
  updatePublicationsSections?: Maybe<Array<Maybe<PublicationsSection>>>;
  updateResearchArea?: Maybe<ResearchArea>;
  updateResearchAreas?: Maybe<Array<Maybe<ResearchArea>>>;
  updateResearchSection?: Maybe<ResearchSection>;
  updateResearchSections?: Maybe<Array<Maybe<ResearchSection>>>;
  updateResearcher?: Maybe<Researcher>;
  updateResearchers?: Maybe<Array<Maybe<Researcher>>>;
  updateTeamMember?: Maybe<TeamMember>;
  updateTeamMembers?: Maybe<Array<Maybe<TeamMember>>>;
  updateTeamSection?: Maybe<TeamSection>;
  updateTeamSections?: Maybe<Array<Maybe<TeamSection>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateActionArgs = {
  data: ActionCreateInput;
};


export type MutationCreateActionsArgs = {
  data: Array<ActionCreateInput>;
};


export type MutationCreateActionsSectionArgs = {
  data: ActionsSectionCreateInput;
};


export type MutationCreateActionsSectionsArgs = {
  data: Array<ActionsSectionCreateInput>;
};


export type MutationCreateCompaniesArgs = {
  data: Array<CompanyCreateInput>;
};


export type MutationCreateCompanyArgs = {
  data: CompanyCreateInput;
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateEventsArgs = {
  data: Array<EventCreateInput>;
};


export type MutationCreateEventsSectionArgs = {
  data: EventsSectionCreateInput;
};


export type MutationCreateEventsSectionsArgs = {
  data: Array<EventsSectionCreateInput>;
};


export type MutationCreateHistoriesArgs = {
  data: Array<HistoryCreateInput>;
};


export type MutationCreateHistoryArgs = {
  data: HistoryCreateInput;
};


export type MutationCreateHistorySectionArgs = {
  data: HistorySectionCreateInput;
};


export type MutationCreateHistorySectionsArgs = {
  data: Array<HistorySectionCreateInput>;
};


export type MutationCreateHomeSectionArgs = {
  data: HomeSectionCreateInput;
};


export type MutationCreateHomeSectionsArgs = {
  data: Array<HomeSectionCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateNewsletterListArgs = {
  data: NewsletterListCreateInput;
};


export type MutationCreateNewsletterListsArgs = {
  data: Array<NewsletterListCreateInput>;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateProjectsArgs = {
  data: Array<ProjectCreateInput>;
};


export type MutationCreateProjectsSectionArgs = {
  data: ProjectsSectionCreateInput;
};


export type MutationCreateProjectsSectionsArgs = {
  data: Array<ProjectsSectionCreateInput>;
};


export type MutationCreatePublicationArgs = {
  data: PublicationCreateInput;
};


export type MutationCreatePublicationsArgs = {
  data: Array<PublicationCreateInput>;
};


export type MutationCreatePublicationsSectionArgs = {
  data: PublicationsSectionCreateInput;
};


export type MutationCreatePublicationsSectionsArgs = {
  data: Array<PublicationsSectionCreateInput>;
};


export type MutationCreateResearchAreaArgs = {
  data: ResearchAreaCreateInput;
};


export type MutationCreateResearchAreasArgs = {
  data: Array<ResearchAreaCreateInput>;
};


export type MutationCreateResearchSectionArgs = {
  data: ResearchSectionCreateInput;
};


export type MutationCreateResearchSectionsArgs = {
  data: Array<ResearchSectionCreateInput>;
};


export type MutationCreateResearcherArgs = {
  data: ResearcherCreateInput;
};


export type MutationCreateResearchersArgs = {
  data: Array<ResearcherCreateInput>;
};


export type MutationCreateTeamMemberArgs = {
  data: TeamMemberCreateInput;
};


export type MutationCreateTeamMembersArgs = {
  data: Array<TeamMemberCreateInput>;
};


export type MutationCreateTeamSectionArgs = {
  data: TeamSectionCreateInput;
};


export type MutationCreateTeamSectionsArgs = {
  data: Array<TeamSectionCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteActionArgs = {
  where: ActionWhereUniqueInput;
};


export type MutationDeleteActionsArgs = {
  where: Array<ActionWhereUniqueInput>;
};


export type MutationDeleteActionsSectionArgs = {
  where?: ActionsSectionWhereUniqueInput;
};


export type MutationDeleteActionsSectionsArgs = {
  where: Array<ActionsSectionWhereUniqueInput>;
};


export type MutationDeleteCompaniesArgs = {
  where: Array<CompanyWhereUniqueInput>;
};


export type MutationDeleteCompanyArgs = {
  where?: CompanyWhereUniqueInput;
};


export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteEventsArgs = {
  where: Array<EventWhereUniqueInput>;
};


export type MutationDeleteEventsSectionArgs = {
  where?: EventsSectionWhereUniqueInput;
};


export type MutationDeleteEventsSectionsArgs = {
  where: Array<EventsSectionWhereUniqueInput>;
};


export type MutationDeleteHistoriesArgs = {
  where: Array<HistoryWhereUniqueInput>;
};


export type MutationDeleteHistoryArgs = {
  where?: HistoryWhereUniqueInput;
};


export type MutationDeleteHistorySectionArgs = {
  where?: HistorySectionWhereUniqueInput;
};


export type MutationDeleteHistorySectionsArgs = {
  where: Array<HistorySectionWhereUniqueInput>;
};


export type MutationDeleteHomeSectionArgs = {
  where?: HomeSectionWhereUniqueInput;
};


export type MutationDeleteHomeSectionsArgs = {
  where: Array<HomeSectionWhereUniqueInput>;
};


export type MutationDeleteNewsletterListArgs = {
  where: NewsletterListWhereUniqueInput;
};


export type MutationDeleteNewsletterListsArgs = {
  where: Array<NewsletterListWhereUniqueInput>;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteProjectsArgs = {
  where: Array<ProjectWhereUniqueInput>;
};


export type MutationDeleteProjectsSectionArgs = {
  where?: ProjectsSectionWhereUniqueInput;
};


export type MutationDeleteProjectsSectionsArgs = {
  where: Array<ProjectsSectionWhereUniqueInput>;
};


export type MutationDeletePublicationArgs = {
  where: PublicationWhereUniqueInput;
};


export type MutationDeletePublicationsArgs = {
  where: Array<PublicationWhereUniqueInput>;
};


export type MutationDeletePublicationsSectionArgs = {
  where?: PublicationsSectionWhereUniqueInput;
};


export type MutationDeletePublicationsSectionsArgs = {
  where: Array<PublicationsSectionWhereUniqueInput>;
};


export type MutationDeleteResearchAreaArgs = {
  where: ResearchAreaWhereUniqueInput;
};


export type MutationDeleteResearchAreasArgs = {
  where: Array<ResearchAreaWhereUniqueInput>;
};


export type MutationDeleteResearchSectionArgs = {
  where?: ResearchSectionWhereUniqueInput;
};


export type MutationDeleteResearchSectionsArgs = {
  where: Array<ResearchSectionWhereUniqueInput>;
};


export type MutationDeleteResearcherArgs = {
  where: ResearcherWhereUniqueInput;
};


export type MutationDeleteResearchersArgs = {
  where: Array<ResearcherWhereUniqueInput>;
};


export type MutationDeleteTeamMemberArgs = {
  where: TeamMemberWhereUniqueInput;
};


export type MutationDeleteTeamMembersArgs = {
  where: Array<TeamMemberWhereUniqueInput>;
};


export type MutationDeleteTeamSectionArgs = {
  where?: TeamSectionWhereUniqueInput;
};


export type MutationDeleteTeamSectionsArgs = {
  where: Array<TeamSectionWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateActionArgs = {
  data: ActionUpdateInput;
  where: ActionWhereUniqueInput;
};


export type MutationUpdateActionsArgs = {
  data: Array<ActionUpdateArgs>;
};


export type MutationUpdateActionsSectionArgs = {
  data: ActionsSectionUpdateInput;
  where?: ActionsSectionWhereUniqueInput;
};


export type MutationUpdateActionsSectionsArgs = {
  data: Array<ActionsSectionUpdateArgs>;
};


export type MutationUpdateCompaniesArgs = {
  data: Array<CompanyUpdateArgs>;
};


export type MutationUpdateCompanyArgs = {
  data: CompanyUpdateInput;
  where?: CompanyWhereUniqueInput;
};


export type MutationUpdateEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateEventsArgs = {
  data: Array<EventUpdateArgs>;
};


export type MutationUpdateEventsSectionArgs = {
  data: EventsSectionUpdateInput;
  where?: EventsSectionWhereUniqueInput;
};


export type MutationUpdateEventsSectionsArgs = {
  data: Array<EventsSectionUpdateArgs>;
};


export type MutationUpdateHistoriesArgs = {
  data: Array<HistoryUpdateArgs>;
};


export type MutationUpdateHistoryArgs = {
  data: HistoryUpdateInput;
  where?: HistoryWhereUniqueInput;
};


export type MutationUpdateHistorySectionArgs = {
  data: HistorySectionUpdateInput;
  where?: HistorySectionWhereUniqueInput;
};


export type MutationUpdateHistorySectionsArgs = {
  data: Array<HistorySectionUpdateArgs>;
};


export type MutationUpdateHomeSectionArgs = {
  data: HomeSectionUpdateInput;
  where?: HomeSectionWhereUniqueInput;
};


export type MutationUpdateHomeSectionsArgs = {
  data: Array<HomeSectionUpdateArgs>;
};


export type MutationUpdateNewsletterListArgs = {
  data: NewsletterListUpdateInput;
  where: NewsletterListWhereUniqueInput;
};


export type MutationUpdateNewsletterListsArgs = {
  data: Array<NewsletterListUpdateArgs>;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateProjectsArgs = {
  data: Array<ProjectUpdateArgs>;
};


export type MutationUpdateProjectsSectionArgs = {
  data: ProjectsSectionUpdateInput;
  where?: ProjectsSectionWhereUniqueInput;
};


export type MutationUpdateProjectsSectionsArgs = {
  data: Array<ProjectsSectionUpdateArgs>;
};


export type MutationUpdatePublicationArgs = {
  data: PublicationUpdateInput;
  where: PublicationWhereUniqueInput;
};


export type MutationUpdatePublicationsArgs = {
  data: Array<PublicationUpdateArgs>;
};


export type MutationUpdatePublicationsSectionArgs = {
  data: PublicationsSectionUpdateInput;
  where?: PublicationsSectionWhereUniqueInput;
};


export type MutationUpdatePublicationsSectionsArgs = {
  data: Array<PublicationsSectionUpdateArgs>;
};


export type MutationUpdateResearchAreaArgs = {
  data: ResearchAreaUpdateInput;
  where: ResearchAreaWhereUniqueInput;
};


export type MutationUpdateResearchAreasArgs = {
  data: Array<ResearchAreaUpdateArgs>;
};


export type MutationUpdateResearchSectionArgs = {
  data: ResearchSectionUpdateInput;
  where?: ResearchSectionWhereUniqueInput;
};


export type MutationUpdateResearchSectionsArgs = {
  data: Array<ResearchSectionUpdateArgs>;
};


export type MutationUpdateResearcherArgs = {
  data: ResearcherUpdateInput;
  where: ResearcherWhereUniqueInput;
};


export type MutationUpdateResearchersArgs = {
  data: Array<ResearcherUpdateArgs>;
};


export type MutationUpdateTeamMemberArgs = {
  data: TeamMemberUpdateInput;
  where: TeamMemberWhereUniqueInput;
};


export type MutationUpdateTeamMembersArgs = {
  data: Array<TeamMemberUpdateArgs>;
};


export type MutationUpdateTeamSectionArgs = {
  data: TeamSectionUpdateInput;
  where?: TeamSectionWhereUniqueInput;
};


export type MutationUpdateTeamSectionsArgs = {
  data: Array<TeamSectionUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NewsletterList = {
  __typename?: 'NewsletterList';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NewsletterListCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NewsletterListOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
};

export type NewsletterListUpdateArgs = {
  data: NewsletterListUpdateInput;
  where: NewsletterListWhereUniqueInput;
};

export type NewsletterListUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NewsletterListWhereInput = {
  AND?: InputMaybe<Array<NewsletterListWhereInput>>;
  NOT?: InputMaybe<Array<NewsletterListWhereInput>>;
  OR?: InputMaybe<Array<NewsletterListWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type NewsletterListWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Project = {
  __typename?: 'Project';
  content: Project_Content_Document;
  endDate: Scalars['CalendarDay']['output'];
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  keywords: Scalars['String']['output'];
  link: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  researchArea?: Maybe<ResearchArea>;
  researchers?: Maybe<Array<Researcher>>;
  researchersCount?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  startDate: Scalars['CalendarDay']['output'];
  status: ProjectStatusType;
  title: Scalars['String']['output'];
};


export type ProjectResearchersArgs = {
  cursor?: InputMaybe<ResearcherWhereUniqueInput>;
  orderBy?: Array<ResearcherOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResearcherWhereInput;
};


export type ProjectResearchersCountArgs = {
  where?: ResearcherWhereInput;
};

export type ProjectCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  endDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  researchArea?: InputMaybe<ResearchAreaRelateToOneForCreateInput>;
  researchers?: InputMaybe<ResearcherRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  status?: InputMaybe<ProjectStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectManyRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByInput = {
  endDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  keywords?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  startDate?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ProjectRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
};

export type ProjectRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
  disconnect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  set?: InputMaybe<Array<ProjectWhereUniqueInput>>;
};

export enum ProjectStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type ProjectStatusTypeNullableFilter = {
  equals?: InputMaybe<ProjectStatusType>;
  in?: InputMaybe<Array<ProjectStatusType>>;
  not?: InputMaybe<ProjectStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<ProjectStatusType>>;
};

export type ProjectUpdateArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};

export type ProjectUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  endDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  researchArea?: InputMaybe<ResearchAreaRelateToOneForUpdateInput>;
  researchers?: InputMaybe<ResearcherRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  status?: InputMaybe<ProjectStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  endDate?: InputMaybe<CalendarDayFilter>;
  id?: InputMaybe<IdFilter>;
  keywords?: InputMaybe<StringFilter>;
  link?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  researchArea?: InputMaybe<ResearchAreaWhereInput>;
  researchers?: InputMaybe<ResearcherManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<CalendarDayFilter>;
  status?: InputMaybe<ProjectStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Project_Content_Document = {
  __typename?: 'Project_content_Document';
  document: Scalars['JSON']['output'];
};


export type Project_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type ProjectsSection = {
  __typename?: 'ProjectsSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ProjectsSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectsSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ProjectsSectionUpdateArgs = {
  data: ProjectsSectionUpdateInput;
  where?: ProjectsSectionWhereUniqueInput;
};

export type ProjectsSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectsSectionWhereInput = {
  AND?: InputMaybe<Array<ProjectsSectionWhereInput>>;
  NOT?: InputMaybe<Array<ProjectsSectionWhereInput>>;
  OR?: InputMaybe<Array<ProjectsSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ProjectsSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Publication = {
  __typename?: 'Publication';
  content: Publication_Content_Document;
  date: Scalars['CalendarDay']['output'];
  doi: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keywords: Scalars['String']['output'];
  license: Scalars['String']['output'];
  link: Scalars['String']['output'];
  magazine: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  researchArea?: Maybe<ResearchArea>;
  researchers?: Maybe<Array<Researcher>>;
  researchersCount?: Maybe<Scalars['Int']['output']>;
  resume: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: PublicationStatusType;
  title: Scalars['String']['output'];
};


export type PublicationResearchersArgs = {
  cursor?: InputMaybe<ResearcherWhereUniqueInput>;
  orderBy?: Array<ResearcherOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResearcherWhereInput;
};


export type PublicationResearchersCountArgs = {
  where?: ResearcherWhereInput;
};

export type PublicationCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  doi?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  magazine?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  researchArea?: InputMaybe<ResearchAreaRelateToOneForCreateInput>;
  researchers?: InputMaybe<ResearcherRelateToManyForCreateInput>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PublicationStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PublicationManyRelationFilter = {
  every?: InputMaybe<PublicationWhereInput>;
  none?: InputMaybe<PublicationWhereInput>;
  some?: InputMaybe<PublicationWhereInput>;
};

export type PublicationOrderByInput = {
  date?: InputMaybe<OrderDirection>;
  doi?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  keywords?: InputMaybe<OrderDirection>;
  license?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  magazine?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  resume?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PublicationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PublicationWhereUniqueInput>>;
  create?: InputMaybe<Array<PublicationCreateInput>>;
};

export type PublicationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PublicationWhereUniqueInput>>;
  create?: InputMaybe<Array<PublicationCreateInput>>;
  disconnect?: InputMaybe<Array<PublicationWhereUniqueInput>>;
  set?: InputMaybe<Array<PublicationWhereUniqueInput>>;
};

export enum PublicationStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type PublicationStatusTypeNullableFilter = {
  equals?: InputMaybe<PublicationStatusType>;
  in?: InputMaybe<Array<PublicationStatusType>>;
  not?: InputMaybe<PublicationStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<PublicationStatusType>>;
};

export type PublicationUpdateArgs = {
  data: PublicationUpdateInput;
  where: PublicationWhereUniqueInput;
};

export type PublicationUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['CalendarDay']['input']>;
  doi?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  magazine?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  researchArea?: InputMaybe<ResearchAreaRelateToOneForUpdateInput>;
  researchers?: InputMaybe<ResearcherRelateToManyForUpdateInput>;
  resume?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PublicationStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PublicationWhereInput = {
  AND?: InputMaybe<Array<PublicationWhereInput>>;
  NOT?: InputMaybe<Array<PublicationWhereInput>>;
  OR?: InputMaybe<Array<PublicationWhereInput>>;
  date?: InputMaybe<CalendarDayFilter>;
  doi?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  keywords?: InputMaybe<StringFilter>;
  license?: InputMaybe<StringFilter>;
  link?: InputMaybe<StringFilter>;
  magazine?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  researchArea?: InputMaybe<ResearchAreaWhereInput>;
  researchers?: InputMaybe<ResearcherManyRelationFilter>;
  resume?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<PublicationStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PublicationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Publication_Content_Document = {
  __typename?: 'Publication_content_Document';
  document: Scalars['JSON']['output'];
};


export type Publication_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type PublicationsSection = {
  __typename?: 'PublicationsSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type PublicationsSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PublicationsSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PublicationsSectionUpdateArgs = {
  data: PublicationsSectionUpdateInput;
  where?: PublicationsSectionWhereUniqueInput;
};

export type PublicationsSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PublicationsSectionWhereInput = {
  AND?: InputMaybe<Array<PublicationsSectionWhereInput>>;
  NOT?: InputMaybe<Array<PublicationsSectionWhereInput>>;
  OR?: InputMaybe<Array<PublicationsSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PublicationsSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  action?: Maybe<Action>;
  actions?: Maybe<Array<Action>>;
  actionsCount?: Maybe<Scalars['Int']['output']>;
  actionsSection?: Maybe<ActionsSection>;
  actionsSections?: Maybe<Array<ActionsSection>>;
  actionsSectionsCount?: Maybe<Scalars['Int']['output']>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  companies?: Maybe<Array<Company>>;
  companiesCount?: Maybe<Scalars['Int']['output']>;
  company?: Maybe<Company>;
  event?: Maybe<Event>;
  events?: Maybe<Array<Event>>;
  eventsCount?: Maybe<Scalars['Int']['output']>;
  eventsSection?: Maybe<EventsSection>;
  eventsSections?: Maybe<Array<EventsSection>>;
  eventsSectionsCount?: Maybe<Scalars['Int']['output']>;
  histories?: Maybe<Array<History>>;
  historiesCount?: Maybe<Scalars['Int']['output']>;
  history?: Maybe<History>;
  historySection?: Maybe<HistorySection>;
  historySections?: Maybe<Array<HistorySection>>;
  historySectionsCount?: Maybe<Scalars['Int']['output']>;
  homeSection?: Maybe<HomeSection>;
  homeSections?: Maybe<Array<HomeSection>>;
  homeSectionsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  newsletterList?: Maybe<NewsletterList>;
  newsletterLists?: Maybe<Array<NewsletterList>>;
  newsletterListsCount?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  projectsSection?: Maybe<ProjectsSection>;
  projectsSections?: Maybe<Array<ProjectsSection>>;
  projectsSectionsCount?: Maybe<Scalars['Int']['output']>;
  publication?: Maybe<Publication>;
  publications?: Maybe<Array<Publication>>;
  publicationsCount?: Maybe<Scalars['Int']['output']>;
  publicationsSection?: Maybe<PublicationsSection>;
  publicationsSections?: Maybe<Array<PublicationsSection>>;
  publicationsSectionsCount?: Maybe<Scalars['Int']['output']>;
  researchArea?: Maybe<ResearchArea>;
  researchAreas?: Maybe<Array<ResearchArea>>;
  researchAreasCount?: Maybe<Scalars['Int']['output']>;
  researchSection?: Maybe<ResearchSection>;
  researchSections?: Maybe<Array<ResearchSection>>;
  researchSectionsCount?: Maybe<Scalars['Int']['output']>;
  researcher?: Maybe<Researcher>;
  researchers?: Maybe<Array<Researcher>>;
  researchersCount?: Maybe<Scalars['Int']['output']>;
  teamMember?: Maybe<TeamMember>;
  teamMembers?: Maybe<Array<TeamMember>>;
  teamMembersCount?: Maybe<Scalars['Int']['output']>;
  teamSection?: Maybe<TeamSection>;
  teamSections?: Maybe<Array<TeamSection>>;
  teamSectionsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryActionArgs = {
  where: ActionWhereUniqueInput;
};


export type QueryActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  orderBy?: Array<ActionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ActionWhereInput;
};


export type QueryActionsCountArgs = {
  where?: ActionWhereInput;
};


export type QueryActionsSectionArgs = {
  where?: ActionsSectionWhereUniqueInput;
};


export type QueryActionsSectionsArgs = {
  cursor?: InputMaybe<ActionsSectionWhereUniqueInput>;
  orderBy?: Array<ActionsSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ActionsSectionWhereInput;
};


export type QueryActionsSectionsCountArgs = {
  where?: ActionsSectionWhereInput;
};


export type QueryCompaniesArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  orderBy?: Array<CompanyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CompanyWhereInput;
};


export type QueryCompaniesCountArgs = {
  where?: CompanyWhereInput;
};


export type QueryCompanyArgs = {
  where?: CompanyWhereUniqueInput;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  orderBy?: Array<EventOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: EventWhereInput;
};


export type QueryEventsCountArgs = {
  where?: EventWhereInput;
};


export type QueryEventsSectionArgs = {
  where?: EventsSectionWhereUniqueInput;
};


export type QueryEventsSectionsArgs = {
  cursor?: InputMaybe<EventsSectionWhereUniqueInput>;
  orderBy?: Array<EventsSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: EventsSectionWhereInput;
};


export type QueryEventsSectionsCountArgs = {
  where?: EventsSectionWhereInput;
};


export type QueryHistoriesArgs = {
  cursor?: InputMaybe<HistoryWhereUniqueInput>;
  orderBy?: Array<HistoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HistoryWhereInput;
};


export type QueryHistoriesCountArgs = {
  where?: HistoryWhereInput;
};


export type QueryHistoryArgs = {
  where?: HistoryWhereUniqueInput;
};


export type QueryHistorySectionArgs = {
  where?: HistorySectionWhereUniqueInput;
};


export type QueryHistorySectionsArgs = {
  cursor?: InputMaybe<HistorySectionWhereUniqueInput>;
  orderBy?: Array<HistorySectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HistorySectionWhereInput;
};


export type QueryHistorySectionsCountArgs = {
  where?: HistorySectionWhereInput;
};


export type QueryHomeSectionArgs = {
  where?: HomeSectionWhereUniqueInput;
};


export type QueryHomeSectionsArgs = {
  cursor?: InputMaybe<HomeSectionWhereUniqueInput>;
  orderBy?: Array<HomeSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HomeSectionWhereInput;
};


export type QueryHomeSectionsCountArgs = {
  where?: HomeSectionWhereInput;
};


export type QueryNewsletterListArgs = {
  where: NewsletterListWhereUniqueInput;
};


export type QueryNewsletterListsArgs = {
  cursor?: InputMaybe<NewsletterListWhereUniqueInput>;
  orderBy?: Array<NewsletterListOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NewsletterListWhereInput;
};


export type QueryNewsletterListsCountArgs = {
  where?: NewsletterListWhereInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type QueryProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type QueryProjectsSectionArgs = {
  where?: ProjectsSectionWhereUniqueInput;
};


export type QueryProjectsSectionsArgs = {
  cursor?: InputMaybe<ProjectsSectionWhereUniqueInput>;
  orderBy?: Array<ProjectsSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectsSectionWhereInput;
};


export type QueryProjectsSectionsCountArgs = {
  where?: ProjectsSectionWhereInput;
};


export type QueryPublicationArgs = {
  where: PublicationWhereUniqueInput;
};


export type QueryPublicationsArgs = {
  cursor?: InputMaybe<PublicationWhereUniqueInput>;
  orderBy?: Array<PublicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PublicationWhereInput;
};


export type QueryPublicationsCountArgs = {
  where?: PublicationWhereInput;
};


export type QueryPublicationsSectionArgs = {
  where?: PublicationsSectionWhereUniqueInput;
};


export type QueryPublicationsSectionsArgs = {
  cursor?: InputMaybe<PublicationsSectionWhereUniqueInput>;
  orderBy?: Array<PublicationsSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PublicationsSectionWhereInput;
};


export type QueryPublicationsSectionsCountArgs = {
  where?: PublicationsSectionWhereInput;
};


export type QueryResearchAreaArgs = {
  where: ResearchAreaWhereUniqueInput;
};


export type QueryResearchAreasArgs = {
  cursor?: InputMaybe<ResearchAreaWhereUniqueInput>;
  orderBy?: Array<ResearchAreaOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResearchAreaWhereInput;
};


export type QueryResearchAreasCountArgs = {
  where?: ResearchAreaWhereInput;
};


export type QueryResearchSectionArgs = {
  where?: ResearchSectionWhereUniqueInput;
};


export type QueryResearchSectionsArgs = {
  cursor?: InputMaybe<ResearchSectionWhereUniqueInput>;
  orderBy?: Array<ResearchSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResearchSectionWhereInput;
};


export type QueryResearchSectionsCountArgs = {
  where?: ResearchSectionWhereInput;
};


export type QueryResearcherArgs = {
  where: ResearcherWhereUniqueInput;
};


export type QueryResearchersArgs = {
  cursor?: InputMaybe<ResearcherWhereUniqueInput>;
  orderBy?: Array<ResearcherOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResearcherWhereInput;
};


export type QueryResearchersCountArgs = {
  where?: ResearcherWhereInput;
};


export type QueryTeamMemberArgs = {
  where: TeamMemberWhereUniqueInput;
};


export type QueryTeamMembersArgs = {
  cursor?: InputMaybe<TeamMemberWhereUniqueInput>;
  orderBy?: Array<TeamMemberOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TeamMemberWhereInput;
};


export type QueryTeamMembersCountArgs = {
  where?: TeamMemberWhereInput;
};


export type QueryTeamSectionArgs = {
  where?: TeamSectionWhereUniqueInput;
};


export type QueryTeamSectionsArgs = {
  cursor?: InputMaybe<TeamSectionWhereUniqueInput>;
  orderBy?: Array<TeamSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TeamSectionWhereInput;
};


export type QueryTeamSectionsCountArgs = {
  where?: TeamSectionWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type ResearchArea = {
  __typename?: 'ResearchArea';
  content: ResearchArea_Content_Document;
  icon: ImageFieldOutput;
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  publications?: Maybe<Array<Publication>>;
  publicationsCount?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  resume: Scalars['String']['output'];
  status: ResearchAreaStatusType;
  title: Scalars['String']['output'];
};


export type ResearchAreaProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type ResearchAreaProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type ResearchAreaPublicationsArgs = {
  cursor?: InputMaybe<PublicationWhereUniqueInput>;
  orderBy?: Array<PublicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PublicationWhereInput;
};


export type ResearchAreaPublicationsCountArgs = {
  where?: PublicationWhereInput;
};

export type ResearchAreaCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  icon?: InputMaybe<ImageFieldInput>;
  image?: InputMaybe<ImageFieldInput>;
  projects?: InputMaybe<ProjectRelateToManyForCreateInput>;
  publications?: InputMaybe<PublicationRelateToManyForCreateInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ResearchAreaStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResearchAreaOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  resume?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ResearchAreaRelateToOneForCreateInput = {
  connect?: InputMaybe<ResearchAreaWhereUniqueInput>;
  create?: InputMaybe<ResearchAreaCreateInput>;
};

export type ResearchAreaRelateToOneForUpdateInput = {
  connect?: InputMaybe<ResearchAreaWhereUniqueInput>;
  create?: InputMaybe<ResearchAreaCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ResearchAreaStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type ResearchAreaStatusTypeNullableFilter = {
  equals?: InputMaybe<ResearchAreaStatusType>;
  in?: InputMaybe<Array<ResearchAreaStatusType>>;
  not?: InputMaybe<ResearchAreaStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<ResearchAreaStatusType>>;
};

export type ResearchAreaUpdateArgs = {
  data: ResearchAreaUpdateInput;
  where: ResearchAreaWhereUniqueInput;
};

export type ResearchAreaUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  icon?: InputMaybe<ImageFieldInput>;
  image?: InputMaybe<ImageFieldInput>;
  projects?: InputMaybe<ProjectRelateToManyForUpdateInput>;
  publications?: InputMaybe<PublicationRelateToManyForUpdateInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ResearchAreaStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResearchAreaWhereInput = {
  AND?: InputMaybe<Array<ResearchAreaWhereInput>>;
  NOT?: InputMaybe<Array<ResearchAreaWhereInput>>;
  OR?: InputMaybe<Array<ResearchAreaWhereInput>>;
  id?: InputMaybe<IdFilter>;
  projects?: InputMaybe<ProjectManyRelationFilter>;
  publications?: InputMaybe<PublicationManyRelationFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  resume?: InputMaybe<StringFilter>;
  status?: InputMaybe<ResearchAreaStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ResearchAreaWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ResearchArea_Content_Document = {
  __typename?: 'ResearchArea_content_Document';
  document: Scalars['JSON']['output'];
};


export type ResearchArea_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type ResearchSection = {
  __typename?: 'ResearchSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ResearchSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResearchSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ResearchSectionUpdateArgs = {
  data: ResearchSectionUpdateInput;
  where?: ResearchSectionWhereUniqueInput;
};

export type ResearchSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResearchSectionWhereInput = {
  AND?: InputMaybe<Array<ResearchSectionWhereInput>>;
  NOT?: InputMaybe<Array<ResearchSectionWhereInput>>;
  OR?: InputMaybe<Array<ResearchSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ResearchSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Researcher = {
  __typename?: 'Researcher';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  publications?: Maybe<Array<Publication>>;
  publicationsCount?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  status: ResearcherStatusType;
};


export type ResearcherProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type ResearcherProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type ResearcherPublicationsArgs = {
  cursor?: InputMaybe<PublicationWhereUniqueInput>;
  orderBy?: Array<PublicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PublicationWhereInput;
};


export type ResearcherPublicationsCountArgs = {
  where?: PublicationWhereInput;
};

export type ResearcherCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<ProjectRelateToManyForCreateInput>;
  publications?: InputMaybe<PublicationRelateToManyForCreateInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ResearcherStatusType>;
};

export type ResearcherManyRelationFilter = {
  every?: InputMaybe<ResearcherWhereInput>;
  none?: InputMaybe<ResearcherWhereInput>;
  some?: InputMaybe<ResearcherWhereInput>;
};

export type ResearcherOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type ResearcherRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ResearcherWhereUniqueInput>>;
  create?: InputMaybe<Array<ResearcherCreateInput>>;
};

export type ResearcherRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ResearcherWhereUniqueInput>>;
  create?: InputMaybe<Array<ResearcherCreateInput>>;
  disconnect?: InputMaybe<Array<ResearcherWhereUniqueInput>>;
  set?: InputMaybe<Array<ResearcherWhereUniqueInput>>;
};

export enum ResearcherStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type ResearcherStatusTypeNullableFilter = {
  equals?: InputMaybe<ResearcherStatusType>;
  in?: InputMaybe<Array<ResearcherStatusType>>;
  not?: InputMaybe<ResearcherStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<ResearcherStatusType>>;
};

export type ResearcherUpdateArgs = {
  data: ResearcherUpdateInput;
  where: ResearcherWhereUniqueInput;
};

export type ResearcherUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<ProjectRelateToManyForUpdateInput>;
  publications?: InputMaybe<PublicationRelateToManyForUpdateInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ResearcherStatusType>;
};

export type ResearcherWhereInput = {
  AND?: InputMaybe<Array<ResearcherWhereInput>>;
  NOT?: InputMaybe<Array<ResearcherWhereInput>>;
  OR?: InputMaybe<Array<ResearcherWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  projects?: InputMaybe<ProjectManyRelationFilter>;
  publications?: InputMaybe<PublicationManyRelationFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<ResearcherStatusTypeNullableFilter>;
};

export type ResearcherWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  id: Scalars['ID']['output'];
  image: ImageFieldOutput;
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role: Scalars['String']['output'];
  status: TeamMemberStatusType;
};

export type TeamMemberCreateInput = {
  image?: InputMaybe<ImageFieldInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TeamMemberStatusType>;
};

export type TeamMemberOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export enum TeamMemberStatusType {
  Draft = 'draft',
  Published = 'published'
}

export type TeamMemberStatusTypeNullableFilter = {
  equals?: InputMaybe<TeamMemberStatusType>;
  in?: InputMaybe<Array<TeamMemberStatusType>>;
  not?: InputMaybe<TeamMemberStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<TeamMemberStatusType>>;
};

export type TeamMemberUpdateArgs = {
  data: TeamMemberUpdateInput;
  where: TeamMemberWhereUniqueInput;
};

export type TeamMemberUpdateInput = {
  image?: InputMaybe<ImageFieldInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TeamMemberStatusType>;
};

export type TeamMemberWhereInput = {
  AND?: InputMaybe<Array<TeamMemberWhereInput>>;
  NOT?: InputMaybe<Array<TeamMemberWhereInput>>;
  OR?: InputMaybe<Array<TeamMemberWhereInput>>;
  id?: InputMaybe<IdFilter>;
  link?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringFilter>;
  status?: InputMaybe<TeamMemberStatusTypeNullableFilter>;
};

export type TeamMemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TeamSection = {
  __typename?: 'TeamSection';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type TeamSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TeamSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type TeamSectionUpdateArgs = {
  data: TeamSectionUpdateInput;
  where?: TeamSectionWhereUniqueInput;
};

export type TeamSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TeamSectionWhereInput = {
  AND?: InputMaybe<Array<TeamSectionWhereInput>>;
  NOT?: InputMaybe<Array<TeamSectionWhereInput>>;
  OR?: InputMaybe<Array<TeamSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type TeamSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ActionPaginatedQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ActionPaginatedQuery = { __typename?: 'Query', count?: number | null, data?: Array<{ __typename?: 'Action', id: string, slug: string, title: string, date: any, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type ActionRelatedQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terms?: InputMaybe<Array<ActionWhereInput> | ActionWhereInput>;
}>;


export type ActionRelatedQuery = { __typename?: 'Query', actions?: Array<{ __typename?: 'Action', id: string, slug: string, title: string, date: any, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type ActionSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ActionSectionQuery = { __typename?: 'Query', actionsSection?: { __typename?: 'ActionsSection', id: string, title: string, content: string } | null };

export type ActionQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ActionQuery = { __typename?: 'Query', action?: { __typename?: 'Action', id: string, slug: string, title: string, resume: string, keywords: string, status: ActionStatusType, image: { __typename?: 'ImageFieldOutput', url: string }, content: { __typename?: 'Action_content_Document', document: any } } | null };

export type EventPaginatedQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EventPaginatedQuery = { __typename?: 'Query', count?: number | null, data?: Array<{ __typename?: 'Event', id: string, slug: string, title: string, date: any, locale: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type EventRelatedQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terms?: InputMaybe<Array<EventWhereInput> | EventWhereInput>;
}>;


export type EventRelatedQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: string, slug: string, title: string, date: any, locale: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type EventSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type EventSectionQuery = { __typename?: 'Query', eventsSection?: { __typename?: 'EventsSection', id: string, title: string, content: string } | null };

export type EventQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, slug: string, title: string, resume: string, keywords: string, link: string, workload: number, date: any, locale: string, status: EventStatusType, image: { __typename?: 'ImageFieldOutput', url: string }, content: { __typename?: 'Event_content_Document', document: any } } | null };

export type HistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type HistoryQuery = { __typename?: 'Query', historySection?: { __typename?: 'HistorySection', id: string, title: string, content: string } | null, homeSection?: { __typename?: 'HomeSection', id: string, title: string, content: string } | null, history?: { __typename?: 'History', id: string, titleOne: string, contentOne: string, titleTwo: string, contentTwo: string, titleThree: string, contentThree: string, titleFour: string, contentFour: string, titleFive: string, contentFive: string } | null, teamMembers?: Array<{ __typename?: 'TeamMember', id: string, name: string, role: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', homeSection?: { __typename?: 'HomeSection', id: string, title: string, content: string, image: { __typename?: 'ImageFieldOutput', url: string } } | null, researchAreas?: Array<{ __typename?: 'ResearchArea', id: string, title: string, resume: string, icon: { __typename?: 'ImageFieldOutput', url: string } }> | null, events?: Array<{ __typename?: 'Event', id: string, slug: string, title: string, resume: string, date: any, locale: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null, actions?: Array<{ __typename?: 'Action', id: string, slug: string, title: string, resume: string, date: any, image: { __typename?: 'ImageFieldOutput', url: string } }> | null, publications?: Array<{ __typename?: 'Publication', id: string, slug: string, title: string, resume: string, date: any, link: string, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null }> | null };

export type ProjectPaginatedQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProjectPaginatedQuery = { __typename?: 'Query', count?: number | null, data?: Array<{ __typename?: 'Project', id: string, slug: string, title: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type ProjectRelatedQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terms?: InputMaybe<Array<ProjectWhereInput> | ProjectWhereInput>;
}>;


export type ProjectRelatedQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, slug: string, title: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type ProjectSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectSectionQuery = { __typename?: 'Query', projectsSection?: { __typename?: 'ProjectsSection', id: string, title: string, content: string } | null };

export type ProjectQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, slug: string, title: string, keywords: string, link: string, startDate: any, endDate: any, status: ProjectStatusType, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null, image: { __typename?: 'ImageFieldOutput', url: string }, content: { __typename?: 'Project_content_Document', document: any } } | null };

export type PublicationPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicationPageQuery = { __typename?: 'Query', publicationsSection?: { __typename?: 'PublicationsSection', id: string, title: string, content: string } | null, researchAreas?: Array<{ __typename?: 'ResearchArea', id: string, title: string }> | null, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null };

export type PublicationPaginatedQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  researcher?: InputMaybe<Scalars['ID']['input']>;
  researchAreas?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  endDate?: InputMaybe<Scalars['CalendarDay']['input']>;
}>;


export type PublicationPaginatedQuery = { __typename?: 'Query', count?: number | null, data?: Array<{ __typename?: 'Publication', id: string, slug: string, title: string, link: string, date: any, resume: string, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null }> | null };

export type PublicationRelatedQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terms?: InputMaybe<Array<PublicationWhereInput> | PublicationWhereInput>;
}>;


export type PublicationRelatedQuery = { __typename?: 'Query', publications?: Array<{ __typename?: 'Publication', id: string, slug: string, title: string, resume: string, date: any, link: string, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null }> | null };

export type PublicationQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type PublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', id: string, slug: string, title: string, keywords: string, resume: string, date: any, doi: string, magazine: string, link: string, license: string, status: PublicationStatusType, content: { __typename?: 'Publication_content_Document', document: any }, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null } | null };

export type ResearchQueryVariables = Exact<{ [key: string]: never; }>;


export type ResearchQuery = { __typename?: 'Query', researchSection?: { __typename?: 'ResearchSection', id: string, title: string, content: string } | null, researchAreas?: Array<{ __typename?: 'ResearchArea', title: string, image: { __typename?: 'ImageFieldOutput', url: string }, icon: { __typename?: 'ImageFieldOutput', url: string }, content: { __typename?: 'ResearchArea_content_Document', document: any }, projects?: Array<{ __typename?: 'Project', id: string, slug: string, title: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null }> | null };

export type SearchFilterContentQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchFilterContentQuery = { __typename?: 'Query', researchAreas?: Array<{ __typename?: 'ResearchArea', id: string, title: string }> | null, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null };

export type SearchPaginatedQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  researchAreas?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  researcher?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['CalendarDay']['input']>;
  endDate?: InputMaybe<Scalars['CalendarDay']['input']>;
}>;


export type SearchPaginatedQuery = { __typename?: 'Query', actions?: Array<{ __typename: 'Action', id: string, slug: string, title: string, date: any, image: { __typename?: 'ImageFieldOutput', url: string } }> | null, publications?: Array<{ __typename: 'Publication', id: string, slug: string, title: string, resume: string, date: any, link: string, researchers?: Array<{ __typename?: 'Researcher', id: string, name: string }> | null }> | null, events?: Array<{ __typename: 'Event', id: string, slug: string, title: string, date: any, locale: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null, projects?: Array<{ __typename: 'Project', id: string, slug: string, title: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type TeamPaginatedQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TeamPaginatedQuery = { __typename?: 'Query', count?: number | null, data?: Array<{ __typename?: 'TeamMember', id: string, name: string, role: string, link: string, image: { __typename?: 'ImageFieldOutput', url: string } }> | null };

export type TeamSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamSectionQuery = { __typename?: 'Query', teamSection?: { __typename?: 'TeamSection', id: string, title: string, content: string } | null };

export type RootQueryVariables = Exact<{ [key: string]: never; }>;


export type RootQuery = { __typename?: 'Query', homeSection?: { __typename?: 'HomeSection', id: string, title: string, content: string } | null, company?: { __typename?: 'Company', id: string, title: string, address: string, email: string, phone: string, facebookUrl: string, instagramUrl: string, youtubeUrl: string } | null };

export type AddNewsletterListMutationVariables = Exact<{
  data: NewsletterListCreateInput;
}>;


export type AddNewsletterListMutation = { __typename?: 'Mutation', createNewsletterList?: { __typename?: 'NewsletterList', id: string } | null };


export const ActionPaginatedDocument = gql`
    query ActionPaginated($query: String, $take: Int, $skip: Int) {
  data: actions(
    take: $take
    skip: $skip
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}}
    orderBy: {publishedAt: desc}
  ) {
    id
    slug
    title
    date
    image {
      url
    }
  }
  count: actionsCount(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}}
  )
}
    `;
export const ActionRelatedDocument = gql`
    query ActionRelated($id: ID, $terms: [ActionWhereInput!]) {
  actions(
    where: {status: {equals: published}, id: {not: {equals: $id}}, OR: $terms}
  ) {
    id
    slug
    title
    date
    image {
      url
    }
  }
}
    `;
export const ActionSectionDocument = gql`
    query ActionSection {
  actionsSection {
    id
    title
    content
  }
}
    `;
export const ActionDocument = gql`
    query Action($slug: String) {
  action(where: {slug: $slug}) {
    id
    slug
    title
    resume
    keywords
    status
    image {
      url
    }
    content {
      document
    }
  }
}
    `;
export const EventPaginatedDocument = gql`
    query EventPaginated($query: String, $take: Int, $skip: Int) {
  data: events(
    take: $take
    skip: $skip
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}}
    orderBy: {publishedAt: desc}
  ) {
    id
    slug
    title
    date
    locale
    link
    image {
      url
    }
  }
  count: eventsCount(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}}
  )
}
    `;
export const EventRelatedDocument = gql`
    query EventRelated($id: ID, $terms: [EventWhereInput!]) {
  events(
    where: {status: {equals: published}, id: {not: {equals: $id}}, OR: $terms}
  ) {
    id
    slug
    title
    date
    locale
    link
    image {
      url
    }
  }
}
    `;
export const EventSectionDocument = gql`
    query EventSection {
  eventsSection {
    id
    title
    content
  }
}
    `;
export const EventDocument = gql`
    query Event($slug: String) {
  event(where: {slug: $slug}) {
    id
    slug
    title
    resume
    keywords
    link
    workload
    date
    locale
    status
    image {
      url
    }
    content {
      document
    }
  }
}
    `;
export const HistoryDocument = gql`
    query History {
  historySection {
    id
    title
    content
  }
  homeSection {
    id
    title
    content
  }
  history {
    id
    titleOne
    contentOne
    titleTwo
    contentTwo
    titleThree
    contentThree
    titleFour
    contentFour
    titleFive
    contentFive
  }
  teamMembers(take: 9, where: {status: {equals: published}}) {
    id
    name
    role
    link
    image {
      url
    }
  }
}
    `;
export const HomeDocument = gql`
    query Home {
  homeSection {
    id
    title
    content
    image {
      url
    }
  }
  researchAreas(where: {status: {equals: published}}) {
    id
    title
    resume
    icon {
      url
    }
  }
  events(
    take: 9
    orderBy: {publishedAt: desc}
    where: {status: {equals: published}}
  ) {
    id
    slug
    title
    resume
    date
    locale
    link
    image {
      url
    }
  }
  actions(
    take: 9
    orderBy: {publishedAt: desc}
    where: {status: {equals: published}}
  ) {
    id
    slug
    title
    resume
    date
    image {
      url
    }
  }
  publications(
    take: 5
    orderBy: {publishedAt: desc}
    where: {status: {equals: published}}
  ) {
    id
    slug
    title
    resume
    date
    link
    researchers {
      id
      name
    }
  }
}
    `;
export const ProjectPaginatedDocument = gql`
    query ProjectPaginated($take: Int, $skip: Int) {
  data: projects(
    take: $take
    skip: $skip
    where: {status: {equals: published}}
    orderBy: {publishedAt: desc}
  ) {
    id
    slug
    title
    image {
      url
    }
  }
  count: projectsCount(where: {status: {equals: published}})
}
    `;
export const ProjectRelatedDocument = gql`
    query ProjectRelated($id: ID, $terms: [ProjectWhereInput!]) {
  projects(
    where: {status: {equals: published}, id: {not: {equals: $id}}, OR: $terms}
  ) {
    id
    slug
    title
    image {
      url
    }
  }
}
    `;
export const ProjectSectionDocument = gql`
    query ProjectSection {
  projectsSection {
    id
    title
    content
  }
}
    `;
export const ProjectDocument = gql`
    query Project($slug: String) {
  project(where: {slug: $slug}) {
    id
    slug
    title
    keywords
    link
    startDate
    endDate
    status
    researchers {
      id
      name
    }
    image {
      url
    }
    content {
      document
    }
  }
}
    `;
export const PublicationPageDocument = gql`
    query PublicationPage {
  publicationsSection {
    id
    title
    content
  }
  researchAreas(where: {status: {equals: published}}) {
    id
    title
  }
  researchers(where: {publications: {every: {status: {equals: published}}}}) {
    id
    name
  }
}
    `;
export const PublicationPaginatedDocument = gql`
    query PublicationPaginated($take: Int, $skip: Int, $query: String, $researcher: ID, $researchAreas: [ID!], $startDate: CalendarDay, $endDate: CalendarDay) {
  data: publications(
    take: $take
    skip: $skip
    where: {status: {equals: published}, researchers: {some: {id: {equals: $researcher}}}, title: {contains: $query, mode: insensitive}, researchArea: {id: {in: $researchAreas}}, date: {gte: $startDate, lte: $endDate}}
    orderBy: {publishedAt: desc}
  ) {
    id
    slug
    title
    link
    date
    resume
    researchers {
      id
      name
    }
  }
  count: publicationsCount(
    where: {status: {equals: published}, researchers: {some: {id: {equals: $researcher}}}, title: {contains: $query, mode: insensitive}, researchArea: {id: {in: $researchAreas}}, date: {gte: $startDate, lte: $endDate}}
  )
}
    `;
export const PublicationRelatedDocument = gql`
    query PublicationRelated($id: ID, $terms: [PublicationWhereInput!]) {
  publications(
    where: {status: {equals: published}, id: {not: {equals: $id}}, OR: $terms}
  ) {
    id
    slug
    title
    resume
    date
    link
    researchers {
      id
      name
    }
  }
}
    `;
export const PublicationDocument = gql`
    query Publication($slug: String) {
  publication(where: {slug: $slug}) {
    id
    slug
    title
    keywords
    resume
    date
    doi
    magazine
    link
    license
    status
    content {
      document
    }
    researchers {
      id
      name
    }
  }
}
    `;
export const ResearchDocument = gql`
    query Research {
  researchSection {
    id
    title
    content
  }
  researchAreas(where: {status: {equals: published}}) {
    title
    image {
      url
    }
    icon {
      url
    }
    content {
      document
    }
    projects {
      id
      slug
      title
      image {
        url
      }
    }
  }
}
    `;
export const SearchFilterContentDocument = gql`
    query SearchFilterContent {
  researchAreas(where: {status: {equals: published}}) {
    id
    title
  }
  researchers(where: {publications: {every: {status: {equals: published}}}}) {
    id
    name
  }
}
    `;
export const SearchPaginatedDocument = gql`
    query SearchPaginated($query: String, $researchAreas: [ID!], $researcher: ID, $startDate: CalendarDay, $endDate: CalendarDay) {
  actions(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}, date: {gte: $startDate, lte: $endDate}}
  ) {
    id
    slug
    title
    image {
      url
    }
    date
    __typename
  }
  publications(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}, researchers: {some: {id: {equals: $researcher}}}, researchArea: {id: {in: $researchAreas}}, date: {gte: $startDate, lte: $endDate}}
  ) {
    id
    slug
    title
    resume
    date
    link
    researchers {
      id
      name
    }
    __typename
  }
  events(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}, date: {gte: $startDate, lte: $endDate}}
  ) {
    id
    slug
    title
    date
    locale
    link
    image {
      url
    }
    __typename
  }
  projects(
    where: {status: {equals: published}, title: {contains: $query, mode: insensitive}, researchers: {some: {id: {equals: $researcher}}}, researchArea: {id: {in: $researchAreas}}, startDate: {gte: $startDate}, endDate: {lte: $endDate}}
  ) {
    id
    slug
    title
    image {
      url
    }
    __typename
  }
}
    `;
export const TeamPaginatedDocument = gql`
    query TeamPaginated($take: Int, $skip: Int) {
  data: teamMembers(
    take: $take
    skip: $skip
    where: {status: {equals: published}}
  ) {
    id
    name
    role
    link
    image {
      url
    }
  }
  count: teamMembersCount(where: {status: {equals: published}})
}
    `;
export const TeamSectionDocument = gql`
    query TeamSection {
  teamSection {
    id
    title
    content
  }
}
    `;
export const RootDocument = gql`
    query Root {
  homeSection {
    id
    title
    content
  }
  company(where: {id: 1}) {
    id
    title
    address
    email
    phone
    facebookUrl
    instagramUrl
    youtubeUrl
  }
}
    `;
export const AddNewsletterListDocument = gql`
    mutation AddNewsletterList($data: NewsletterListCreateInput!) {
  createNewsletterList(data: $data) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ActionPaginated(variables?: ActionPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActionPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActionPaginatedQuery>(ActionPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ActionPaginated', 'query', variables);
    },
    ActionRelated(variables?: ActionRelatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActionRelatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActionRelatedQuery>(ActionRelatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ActionRelated', 'query', variables);
    },
    ActionSection(variables?: ActionSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActionSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActionSectionQuery>(ActionSectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ActionSection', 'query', variables);
    },
    Action(variables?: ActionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActionQuery>(ActionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Action', 'query', variables);
    },
    EventPaginated(variables?: EventPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventPaginatedQuery>(EventPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventPaginated', 'query', variables);
    },
    EventRelated(variables?: EventRelatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventRelatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventRelatedQuery>(EventRelatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventRelated', 'query', variables);
    },
    EventSection(variables?: EventSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventSectionQuery>(EventSectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventSection', 'query', variables);
    },
    Event(variables?: EventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventQuery>(EventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Event', 'query', variables);
    },
    History(variables?: HistoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<HistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HistoryQuery>(HistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'History', 'query', variables);
    },
    Home(variables?: HomeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<HomeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomeQuery>(HomeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Home', 'query', variables);
    },
    ProjectPaginated(variables?: ProjectPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectPaginatedQuery>(ProjectPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProjectPaginated', 'query', variables);
    },
    ProjectRelated(variables?: ProjectRelatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectRelatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectRelatedQuery>(ProjectRelatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProjectRelated', 'query', variables);
    },
    ProjectSection(variables?: ProjectSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectSectionQuery>(ProjectSectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProjectSection', 'query', variables);
    },
    Project(variables?: ProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectQuery>(ProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Project', 'query', variables);
    },
    PublicationPage(variables?: PublicationPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublicationPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublicationPageQuery>(PublicationPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PublicationPage', 'query', variables);
    },
    PublicationPaginated(variables?: PublicationPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublicationPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublicationPaginatedQuery>(PublicationPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PublicationPaginated', 'query', variables);
    },
    PublicationRelated(variables?: PublicationRelatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublicationRelatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublicationRelatedQuery>(PublicationRelatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PublicationRelated', 'query', variables);
    },
    Publication(variables?: PublicationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublicationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublicationQuery>(PublicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Publication', 'query', variables);
    },
    Research(variables?: ResearchQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ResearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResearchQuery>(ResearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Research', 'query', variables);
    },
    SearchFilterContent(variables?: SearchFilterContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SearchFilterContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchFilterContentQuery>(SearchFilterContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchFilterContent', 'query', variables);
    },
    SearchPaginated(variables?: SearchPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SearchPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchPaginatedQuery>(SearchPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchPaginated', 'query', variables);
    },
    TeamPaginated(variables?: TeamPaginatedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TeamPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TeamPaginatedQuery>(TeamPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TeamPaginated', 'query', variables);
    },
    TeamSection(variables?: TeamSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TeamSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TeamSectionQuery>(TeamSectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TeamSection', 'query', variables);
    },
    Root(variables?: RootQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RootQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RootQuery>(RootDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Root', 'query', variables);
    },
    AddNewsletterList(variables: AddNewsletterListMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddNewsletterListMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddNewsletterListMutation>(AddNewsletterListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddNewsletterList', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;