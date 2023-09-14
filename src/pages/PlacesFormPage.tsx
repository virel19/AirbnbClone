import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UploadPhotos from "../UploadPhotos";
import Features from "../Features";
import AccountNav from "../AccountNav";
import { UserContext } from "../context/UserContext";


function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(1);
    const [beds, setBeds] = useState(1);
    const [baths, setBaths] = useState(1);
    const [username, setUserName] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setPhotos(data.photos);
            setDescription(data.description);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuest);
            setPrice(data.price);
            setBedrooms(data.bedrooms);
            setBeds(data.beds);
            setBaths(data.baths);
        })
    }, [id])

    useEffect(() => {
        if (user) {
            setUserName(user.name);
        }
    }, [user]);

    async function savePlace(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const placeData = {
            title,
            address,
            photos,
            description,
            features,
            extraInfo,
            checkIn,
            checkOut,
            maxGuest,
            price,
            bedrooms,
            beds,
            baths,
            username,
        }

        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            //new place
            await axios.post('/places', {...placeData});
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div className="">
                <AccountNav />
                <form onSubmit={savePlace}>
                    <h3>Title</h3>
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="title" className="add-new-place-input"></input>
                    <h3>Address</h3>
                    <input type="text" value={address} onChange={event => setAddress(event.target.value)} placeholder="address" className="add-new-place-input"></input>
                    <h3>Photos</h3>
                    <UploadPhotos photos={photos} onChange={setPhotos} />
                    <h3>Description</h3>
                    <textarea value={description} onChange={event => setDescription(event.target.value)} />
                    <h3>Features</h3>
                    <Features selected={features} onChange={setFeatures} />
                    <h3>Extra info</h3>
                    <textarea value={extraInfo} onChange={event => setExtraInfo(event.target.value)} />
                    <h3>Check in & out times</h3>
                    <div className="check-in-container">
                        <div>
                            <h4>Check in time</h4>
                            <input type="text" value={checkIn} onChange={event => setCheckIn(event.target.value)} placeholder="14:00"></input>
                        </div>
                        <div>
                            <h4>Check out time</h4>
                            <input type="text" value={checkOut} onChange={event => setCheckOut(event.target.value)} placeholder="11:00"></input>
                        </div>
                        <div>
                            <h4>Max guest</h4>
                            <input type="number" value={maxGuest} onChange={event => setMaxGuest(parseInt(event.target.value))}></input>
                        </div>
                        <div>
                            <h4>Price per night</h4>
                            <input type="number" value={price} onChange={event => setPrice(parseInt(event.target.value))}></input>
                        </div>
                    </div>
                    <div>
                            <h4>Bedrooms</h4>
                            <input type="number" value={bedrooms} min="1" max="16" onChange={event => setBedrooms(parseInt(event.target.value))}></input>
                        </div>
                        <div>
                            <h4>Beds</h4>
                            <input type="number" value={beds} min="1" max="16" onChange={event => setBeds(parseInt(event.target.value))}></input>
                        </div>
                        <div>
                            <h4>Baths</h4>
                            <input type="number" value={baths} min="1" max="16" onChange={event => setBaths(parseInt(event.target.value))}></input>
                        </div>
                    <div>
                        <button className="save-button">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PlacesFormPage;