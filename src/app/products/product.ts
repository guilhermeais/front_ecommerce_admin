
export interface ItensProductData {
  createdBy: {
    id: string,
    name: string
  },
  category: {
    description: string,
    id: string,
    name: string
    rootCategory: {
      description: string,
      id: string,
      name: string
    }
  },  
  description: string,
  id: string,
  image: string,
  isShown: boolean,
  name: string
  price: number
  updatedBy: string | null
}

export interface ProductsPage {
  total: number,
  pages: number,
  currentPage: number,
  items: ItensProductData[]
}

export interface ProductCreateData {
  name: string
  description?: string
  price: number
  image?: any
  subCategoryId: string
  isShown?: boolean
}


