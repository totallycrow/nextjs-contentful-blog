export interface IResponseItem {
  fields: {};
}

// ???
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
