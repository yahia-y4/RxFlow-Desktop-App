export type ID = string;

export interface Item {
  id: ID;
  name: string;
  company: string;
  form: string;
  concent?: string;
  concent_unit?: string;
  package_type?: string;
  quantity: number;
  price: number;
  profit: number;
  sell_price: number;
  price_buy: number;
  code: string;
  expiry_date: string | Date;
  createdAt: string;
  updatedAt: string;
}
export interface ItemForm {
  name?: string;
  company?: string;
  form?: string;
  concent?: number | string;
  concent_unit?: string;
  package_type?: string;
  quantity?: number;
  price?: number;
  profit?: number;
  code?: string;
  expiry_date?: Date | string;
}

export interface ItemPreview  {
  id: ID;
  name: string;
  company: string;
  form: string;
  concent: number;
  sell_price: number;
  quantity: number;
  expiry_date: string;
};
export type columnType<T> = {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
};
