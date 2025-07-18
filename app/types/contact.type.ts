export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContact {
  name: string;
  phone: string;
  email: string;
  address: Address;
}