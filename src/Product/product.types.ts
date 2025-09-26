export interface ProductType {
  id?: string;
  name: string;
  description: string;
  parent_product_id?: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  product_image: string;
}
