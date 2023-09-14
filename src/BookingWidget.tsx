import { differenceInCalendarDays } from "date-fns";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "./context/BookingContext";
import { Place } from "./Interfaces"

interface BookingWidgetProps {
  place: Place;
}

function BookingWidget({ place }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const { setBookingData } = useContext(BookingContext);
  const fee = .12;

  let numberOfNights = 5;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const nightPrice = numberOfNights * place.price;
  const serviceFee = nightPrice * fee;
  const totalBeforeTaxes = nightPrice + serviceFee;

  const updateBookingData = () => {
    const bookingData = {
      place,
      checkIn,
      checkOut,
      numberOfNights,
      nightPrice,
      serviceFee,
      totalBeforeTaxes,
      numberOfGuest,
    };

    if (setBookingData) {
      setBookingData(bookingData);
    }
  };

  return (
    <div className="place-page-about-col2" >
      <div className="booking-card">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="reserve-price">${place.price.toLocaleString()} night</div>
          <div className="reserve-date">
            <div className="input-group">
              <label>Check in</label>
              <input type="date"
                value={checkIn}
                onChange={event => setCheckIn(event.target.value)}
                required
                >
              </input>
            </div>
            <div className="input-group">
              <label>Check out</label>
              <input type="date"
                value={checkOut}
                onChange={event => setCheckOut(event.target.value)}
                required
                >
              </input>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "small" }}>
            <label>Guests</label>
            <input type="number"
              min="1"
              max={place.maxGuest}
              value={numberOfGuest}
              onChange={event => setNumberOfGuest(parseInt(event.target.value))}
              required
              >
            </input>
          </div>
          <Link to={'/reservation-confirmation'} className="reserve-button" onClick= {checkIn && checkOut ? updateBookingData : (e) => e.preventDefault()}>
            Reserve
          </Link>
          {numberOfNights > 0 && (
            <>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "25px", fontWeight: "300" }}>You won't be charged yet</div>
              <div style={{ display: "flex", flexDirection: "column", marginTop: "", paddingBottom: "20px", gap: "10px", fontWeight: "300", borderBottom: "lightgrey solid 1px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>${place.price.toLocaleString()} * {numberOfNights} nights</span>
                  <div>${nightPrice.toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Airbnb service fee</div>
                  <div>${serviceFee.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <div style={{ fontWeight: "500" }}>Total before taxes</div>
                <div style={{ fontWeight: "500" }}>${totalBeforeTaxes.toLocaleString()}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div >
  )
}


export default BookingWidget;
