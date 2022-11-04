import { ParsedUrlQuery } from "querystring";

export interface IResponseItem {
  fields: {};
}

export interface IPost {
  slug: string;
  mainImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface IPosts {
  posts: Array<IPost>;
}

export interface IProps {
  props: Array<IPost>;
  revalidate: number;
}

export interface ICategoryResponse {
  fields: {
    slug: string;
    category: string;
  };
}

export interface IParam {
  slug: string;
}

export interface Params extends ParsedUrlQuery {
  slug: string;
}

export interface IFullPostData {
  metadata: { tags: [] };
  sys: {
    space: [Object];
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: [Object];
    revision: number;
    contentType: [Object];
    locale: string;
  };
  fields: {
    mainImage: [Object];
    title: string;
    content: [Object];
    slug: string;
    postCategory: string;
  };
}

export interface IFullCategoryData {
  metadata: { tags: any };
  sys: {
    space: [Object];
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: [Object];
    revision: number;
    contentType: [Object];
    locale: string;
  };
  fields: { category: string; slug: string };
}

export interface ICategoryProps {
  targetCategory: string;
}

export interface CategoryParams extends ParsedUrlQuery {
  slug: string;
}
