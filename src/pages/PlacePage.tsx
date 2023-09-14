import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import { Place } from '../Interfaces'


export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [showPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get<Place>(`/places/${id}`).then(response => {
      setPlace(response.data);
    })
  }, [id]);

  function scrollToTop() {
    window.scrollTo({ top: 0 }); //behavior: 'smooth'
  }

  if (!place) {
    return <div>Loading...</div>;
  }

  if (showPhotos) {
    return (
      <>
        <div className="close-button-container">
          <button className="close-button" onClick={() => { setShowAllPhotos(false); scrollToTop(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            background: "black",
            position: "absolute",
            minWidth: "100dvw",
            minHeight: "100dvh",
            top: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div className="show-all-photos-container">
            {place.photos.map((photo, index) => (
              <div className="show-all-photos-size" key={index}>
                <img
                  src={"http://localhost:4000/" + photo}
                >
                </img>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  function handleImageClick() {
    setShowAllPhotos(false);
  }

  return (
    <div id="parentDiv" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className='place-page-title'>{place?.title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <a target="_blank" href={"https://maps.google.com/?q=" + place?.address} className='place-page-address' style={{ textDecoration: "underline" }}>
          {place?.address}
        </a>
      </div>
      <div style={{ position: "relative", width: "100%", }}>
        <div className="place-page-img-grid" style={{ gridAutoRows: "minmax(auto, 250px)" }}>
          <div>
            <img
              src={"http://localhost:4000/" + place?.photos[0]}
              alt=""
              onClick={handleImageClick}
              style={{ borderRadius: "10px 0 0 10px", cursor: "pointer" }}
            >
            </img>
          </div>
          <div>
            <img
              src={"http://localhost:4000/" + place?.photos[1]}
              alt=""
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
            </img>
          </div>
          <div>
            <img
              src={"http://localhost:4000/" + place?.photos[2]}
              alt=""
              onClick={handleImageClick}
              style={{ borderRadius: "0 10px 0 0", cursor: "pointer" }}
            >
            </img>
          </div>
          <div>
            <img
              src={"http://localhost:4000/" + place?.photos[3]}
              alt=""
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
            </img>
          </div>
          <div>
            <img
              src={"http://localhost:4000/" + place?.photos[4]}
              alt=""
              onClick={handleImageClick}
              style={{ borderRadius: "0 0 10px 0", cursor: "pointer" }}
            >
            </img>
          </div>
        </div>
        <button className="show-all-photos-button" style={{
          position: 'absolute',
          display: "flex",
          alignItems: "center",
          bottom: "30px",
          right: "20px",
          padding: "8px",
          borderRadius: "10px",
          width: "150px",
          cursor: "pointer",
          gap: "8px",
        }} onClick={() => setShowAllPhotos(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Show all photos
        </button>
      </div>
      <div className="place-page-about-grid">
        <div className="place-page-about-col1">
          <div className="owner-container">
            <div style={{ fontWeight: "500", fontSize: "x-large" }}>
              Hosted by {place.username}
              <div style={{ fontSize: "large", fontWeight: "300", }}>
                {place.maxGuest} guests • {place.bedrooms} bedrooms • {place.beds} beds • {place.baths} baths
              </div>
            </div>
            <div className='profile-avatar-placepage-container'>
              <div className='profile-avatar-placepage'></div>
            </div>
          </div>
          {place.description ? (
            <div style={{ color: "grey", borderBottom: "solid lightgrey 1px", paddingBottom: "20px" }}>
              {place.description}
            </div>
          ) : null}
          {place.extraInfo ? (
            <div style={{ color: "grey", borderBottom: "solid lightgrey 1px", paddingBottom: "20px" }}>
              <div style={{ fontWeight: "500", fontSize: "large", color: "black" }}>
                More info
              </div>
              {place.extraInfo}
            </div>
          ) : null}
          {place.features ? (
            <div className="features-container" style={{ color: "grey", borderBottom: "solid lightgrey 1px", paddingBottom: "20px" }} >
              <div style={{ fontWeight: "500", fontSize: "large", color: "black" }}>
                What this place offers
              </div>
              <div>{place.features.join(', ')}</div>
            </div>
          ) : null}
        </div>
        <BookingWidget place={place} />
      </div>
    </div >
  )
}
