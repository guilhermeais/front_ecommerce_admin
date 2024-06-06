import {ResponseData} from "../@shared/interface/response-interface.data";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface SubCategory {
  id: string;
  name: string;
  editMode?: boolean;
  rootCategory: {
    id: string,
    name: string,
    description: string
  }
}

export interface CreateSubCaategoryObject {
  name: string;
  description: string;
  categoryId: string;
}

export interface CategoryResponseData extends ResponseData<Category> {
  total: number;
  pages: number;
  currentPage: number;
  items: Category[];
}

export interface SubCategoryResponseData extends ResponseData<SubCategory> {
  total: number;
  pages: number;
  currentPage: number;
  items: SubCategory[];
}


