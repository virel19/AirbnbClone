import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Place } from '../Interfaces';
import { Link } from "react-router-dom";


export default function FavoritesPage() {

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    axios.get('/getFavorites').then((response) => {
      setPlaces(response.data);
    })
  }, []);

  console.log(places);

  return (
    <div className="account-page-layout">
      <AccountNav />
      {places?.length === 0 ? (
        <div style={{ fontWeight: '500', marginTop: '20px' }}>
          You don't have any favorite places yet.
        </div>
      ) : (
        <div className="my-booking-container">
          {places.map((place) => (
            <Link to={"/place/" + place._id} className="my-booking-card">
              <div className="photo-size">
                <img src={"http://localhost:4000/" + place.photos[0]} alt="" />
              </div>
              <div key={place._id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{fontSize: "20px", fontWeight: '500'}}>{place.title}</div>
                <div>{place.address}</div>
                <div style={{display: 'flex', gap: '20px'}}>
                  <div style={{display: 'flex', alignItems: "center", gap: '5px'}}>
                    {place.beds}
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/bed.png" alt="bed"/>
                  </div>
                  <div style={{display: 'flex', alignItems: "center", gap: '5px'}}>
                    {place.baths}
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/shower-and-tub.png" alt="shower-and-tub"/>
                  </div>
                  <div style={{display: 'flex', alignItems: "center", gap: '5px'}}>
                    {place.maxGuest}
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/guest-male.png" alt="guest-male"/>
                  </div>
                </div>
                <div><span style={{fontWeight: '500'}}>${place.price.toLocaleString()}</span> per night</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}