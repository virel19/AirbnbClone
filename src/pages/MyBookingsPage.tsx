import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { Booking } from '../Interfaces' 


function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
            <div className="account-page-layout">
                <AccountNav />
                <div className="my-booking-container">
                    {bookings.length > 0 && bookings.map(booking => (
                        <Link to={"/place/" + booking.place._id} className="my-booking-card">
                            <div className="photo-size">
                                <img src={"http://localhost:4000/" + booking.place.photos[0]} alt="" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                                <div style={{ fontSize: "20px", fontWeight: "500" }}>{booking.place.title}</div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        {formatDate(booking.checkIn)}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>

                                        {formatDate(booking.checkOut)}
                                    </div>
                                </div>
                                <div style={{ display: "flex", fontSize: "20px", alignItems: "center", gap: "5px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    Total charged: ${booking.price.toLocaleString()}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BookingsPage;