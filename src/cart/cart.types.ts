export interface CartTypes {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
}

export interface CartTypeUpdate {
  quantity: number;
}
