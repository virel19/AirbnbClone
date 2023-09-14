import React, { createContext, useState } from "react";
import { Place } from '../Interfaces'

export interface BookingData {
  place: Place;
  checkIn: string;
  checkOut: string;
  numberOfNights: number;
  nightPrice: number;
  serviceFee: number;
  totalBeforeTaxes: number;
  numberOfGuest: number;
}

export interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData | null) => void;
}

export const BookingContext = createContext<Partial<BookingContextType>>({});

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}
