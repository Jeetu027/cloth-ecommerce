export interface AddressType {
  id?: string;
  user_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
}

export interface AddressTypeUpdate {
  address_line1?: string;
  address_line2?: string;
  city?: string;
  pincode?: string;
  state?: string;
  country?: string;
}
