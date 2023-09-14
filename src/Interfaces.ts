export interface Place {
  _id: string;
  owner: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  features: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuest: number;
  price: number;
  bedrooms: number;
  beds: number;
  baths: number;
  username: string;
  __v: number;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  place: Place;
  price: number;
}