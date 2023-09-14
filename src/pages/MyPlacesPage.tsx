import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Place } from '../Interfaces'

function PlacesPage() {

    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <>
            <div className="account-page-layout">
                <AccountNav />
                <Link to={'/account/places/new'} className="add-new-places-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Add New Place
                </Link>
                <div className="add-place-container">
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/' + place._id} className="add-place-card">
                            <div className="photo-size">
                                <img src={"http://localhost:4000/" + place.photos[0]} alt="" />
                            </div>
                            <div className="add-place-card-tpc">
                                <div className="add-place-card-title">{place.title}</div>
                                <div style={{display: 'flex', flexDirection:'column', gap: '10px' }}>
                                    <div>{place.address}</div>
                                    <div style={{ display: 'flex', flexDirection:'row', marginTop: '30px', alignItems: 'center', gap: '10px'}}>
                                        <span style={{ fontSize: 'x-large'}}>
                                            ${place.price.toLocaleString()}
                                        </span> 
                                        per night</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PlacesPage;