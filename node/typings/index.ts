export interface SearchArgs {
  productId: string
}

export interface Product {
  Id: number
  DepartmentId: number
  CategoryId: number
  BrandId: number
  Name: string
  LinkId: string
  RefId: string
  Description: string
  DescriptionShort: string
  ReleaseDate: string
  KeyWords: string
  Title: string
  TaxCode: string
  MetaTagDescription: string

  IsActive: boolean
  IsVisible: boolean
  ShowWithoutStock: boolean
}
