import { useContext, useEffect, useState } from "react"
import { BookingContext } from "../context/BookingContext"
import { Link, Navigate } from "react-router-dom";
import logo from '../assets/homeColor.png';
import axios from "axios";
import { UserContext } from "../context/UserContext";


export default function ReservationConfirmationPage() {
  const { bookingData } = useContext(BookingContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  async function handleOnSubmit() {
    await axios.post('/bookings',  {
      place: bookingData?.place._id,
      name,
      email,
      phone,
      checkIn: bookingData?.checkIn,
      checkOut: bookingData?.checkOut,
      numberOfGuest: bookingData?.numberOfGuest,
      price: bookingData?.nightPrice,
    });
    setRedirect(`/account/bookings/`);
  }

  if(redirect) {
    return <Navigate to={redirect}/>
  }

  return (
    <>
      <div className="reservation-confirmation-header">
        <Link to={'/'} className='logo-button'>
          <img src={logo} alt='Home' className='logo' />
          <span className='logo-name'>airbnb</span>
        </Link>
      </div>

      <div className="reservation-grid">
        <div className="reservation-grid1">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100vh", marginBottom: "50px" }}>
            <div style={{ fontWeight: "500", fontSize: "x-large" }}>Your trip</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: "500", fontSize: "medium" }}>Check in</div>
              <div>{bookingData?.checkIn}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: "500", fontSize: "medium" }}>Check Out</div>
              <div>{bookingData?.checkOut}</div>
            </div>
            <div>
              <div style={{ fontWeight: "500", fontSize: "medium" }}>Guests</div>
              <div> {bookingData?.numberOfGuest} guest</div>
            </div>
            <div>
              <div style={{ fontWeight: "500", fontSize: "x-large" }}>Your info</div>
            </div>
            <div>
              <div>Name</div>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} required></input>
            </div>
            <div>
              <div>Email</div>
              <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
            </div>
            <div>
              <div>Phone Number</div>
              <input type="tel" value={phone} onChange={(event) => setPhone((event.target.value))} required></input>
            </div>
            <div>
              <div style={{ fontWeight: "500", fontSize: "x-large" }}>Your payment</div>
            </div>
            <div className="pay-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: '20px' }}>
                <div>
                  <div>Cardholder name</div>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    required
                  >
                  </input>
                </div>
                <div>
                  <div>Card number</div>
                  <input
                    type="tel"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    pattern="[0-9\s]{16,19}"
                    maxLength={19}
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                  >
                  </input>
                </div>
              </div>
              <div style={{ display: "flex", gap: '20px' }}>
                <div>
                  <div>Experiation date</div>
                  <input
                    type="text"
                    value={expiration}
                    onChange={(event) => setExpiration(event.target.value)}
                    placeholder="MM/YY"
                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                    maxLength={5}
                    required
                  >
                  </input>
                </div>
                <div>
                  <div>CVV</div>
                  <input
                    type="tel"
                    value={cvv}
                    onChange={(event) => setCVV(event.target.value)}
                    pattern="^\d{3,4}$"
                    maxLength={3}
                    placeholder="XXX"
                    required
                  >
                  </input>
                </div>
              </div>
            </div>
            <Link to={'#'} className="reserve-button" onClick={handleOnSubmit}>
              Book now
            </Link>
          </div>
        </div>
        <div className="reservation-grid2">
          <div className="reservation-card">
            <div style={{ display: "flex", gap: "10px", borderBottom: "solid grey 1px", paddingBottom: "20px" }}>
              <img className="photo-size" src={"http://localhost:4000/" + bookingData?.place.photos[0]} alt=""></img>
              <div>{bookingData?.place.title}</div>
            </div>
            <div style={{ fontWeight: "500", fontSize: "x-large", marginBottom: "5px" }}>Price details</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>${bookingData?.place.price.toLocaleString()} x {bookingData?.numberOfNights} nights</div>
              <div>${bookingData?.nightPrice.toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Airbnb service fee</div>
              <div>${bookingData?.serviceFee.toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
              <div>Total</div>
              <div>${bookingData?.totalBeforeTaxes.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
