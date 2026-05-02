export type ID = string;


export interface Item {
  id: ID;

  name: string;
  company: string;

  form: string; 

  concent?: {
    value: number;
    unit: string; 
  };

  titer?: {
    value: number;
    unit: string; 
  };

  package_type?: string;
  quantity: number;

  price: number; 
  profit: number; 

  sell_price: number;   

  code: string;        

  expiry_date?: string; 

  createdAt: string;
  updatedAt: string;
}
export interface ItemForm {
     name?:string,
    company?:string,
    form?:string,
    concent?: {
    value: number;
    unit: string; 
  },

    titer?: {
    value: number;
    unit: string; 
  };
    package_type?:string,
    quantity?:number,
    price?:number,
    profit?:number,
    code?:string,
    expiry_date?:string
}
