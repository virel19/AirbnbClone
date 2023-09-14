/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { addDays, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchQuery } from "../context/SearchQueryContext";
import { useFavorites } from "../FavoritesUtil";
import { UserContext } from "../context/UserContext";
import { Place as BasePlace } from '../Interfaces';
import { getCookie } from 'typescript-cookie'

interface Place extends BasePlace {
    currentPhotoIndex: number;
}

function HomePage() {
    const { searchQuery } = useSearchQuery();
    const [places, setPlaces] = useState<Place[]>([]);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const { addFavorite, removeFavorite, setFavorites, favorites } = useFavorites();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<Place[]>('/places').then(response => {
            const updatedPlaces = response.data.map(place => ({ ...place, currentPhotoIndex: 0 }));
            const filteredPlaces = searchQuery
                ? updatedPlaces.filter(place =>
                    place.address.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : updatedPlaces;

            setPlaces(filteredPlaces);
        });
    }, [searchQuery]);

    useEffect(() => {

        if (user === null || user === undefined) {
            return;
        }

        const token = getCookie('token');

        if (user && token != '' && token != undefined) { 

            
            axios.get(`/api/user/favorites`)
                .then((response) => {
                    if (response.status === 200) {
                        
                        const favorites = response.data;

                        setFavorites(favorites);
                    } else {
                        console.error('Failed to fetch user favorites.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user favorites:', error);
                });
        }
    }, [user]);

    function handleNextPhoto(placeId: string, event: React.MouseEvent) {
        event.stopPropagation();
        setPlaces(prevPlaces => {
            return prevPlaces.map(place => {
                if (place._id === placeId) {
                    const nextIndex = Math.min(place.currentPhotoIndex + 1, place.photos.length - 1);
                    return { ...place, currentPhotoIndex: nextIndex };
                }
                return place;
            });
        });
    }

    function handlePrevPhoto(placeId: string, event: React.MouseEvent) {
        event.stopPropagation();
        setPlaces(prevPlaces => {
            return prevPlaces.map(place => {
                if (place._id === placeId) {
                    const prevIndex = Math.max(place.currentPhotoIndex - 1, 0);
                    return { ...place, currentPhotoIndex: prevIndex };
                }
                return place;
            });
        });
    }

    const handleMouseEnter = (placeId: string) => {
        setHoveredCard(placeId);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleCardClickToPage = (placeId: string) => {
        navigate("/place/" + placeId);
    };

    function handleHeartClick(placeId: string, event: React.MouseEvent<SVGSVGElement>) {
        event.stopPropagation();

        if (!user) {
            alert("You must be logged in to favorite");
        }

        if (user) {
            if (favorites.includes(placeId)) {
               
                axios.post('/api/user/favorites/remove', { placeId })
                    .then((response) => {
                        console.log(response.data.message);
                        removeFavorite(placeId);
                    })
                    .catch((error) => {
                        console.error('Error removing favorite:', error);
                    });
            } else {
                
                axios.post('/api/user/favorites/add', { placeId })
                    .then((response) => {
                        console.log(response.data.message);
                        addFavorite(placeId);
                    })
                    .catch((error) => {
                        console.error('Error adding favorite:', error);
                    });
            }
        }
    }

    return (
        <div className="homepage-grid-container">
            {places.map(place => (
                <div className="homepage-card"
                    key={place._id}
                    onMouseEnter={() => handleMouseEnter(place._id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCardClickToPage(place._id)}
                >
                    <div className="homepage-card-img">
                        <img src={"http://localhost:4000/" + place.photos[place.currentPhotoIndex]} alt=""></img>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={user && favorites.includes(place._id) ? '#ff385c' : 'rgb(0, 0, 0, 0.5)'}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="heart"
                            onClick={(event) => handleHeartClick(place._id, event)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <div className="arrow" onClick={(event) => handleNextPhoto(place._id, event)} style={{

                            display: place.currentPhotoIndex != place.photos.length - 1 ? "flex" : "none",
                            position: "absolute",
                            width: "15px",
                            top: "125px",
                            right: "10px",
                            zIndex: "1",
                            color: 'white',
                            padding: "7px",
                            borderRadius: "50%",
                            backgroundColor: 'white',
                            boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
                            opacity: hoveredCard === place._id ? '1' : '0',
                            transition: 'opacity 0.3s ease',
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                        <div className="arrow" onClick={(event) => handlePrevPhoto(place._id, event)} style={{

                            display: place.currentPhotoIndex != 0 ? "flex" : "none",
                            position: "absolute",
                            width: "15px",
                            top: "125px",
                            left: "10px",
                            zIndex: "1",
                            color: "white",
                            padding: "7px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
                            opacity: hoveredCard === place._id ? '1' : '0',
                            transition: 'opacity 0.3s ease',
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    {/* textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" */}
                    <div style={{ fontWeight: "500" }}>
                        {place.address}
                    </div>
                    <div style={{ color: "grey" }}>
                        50 miles away
                    </div>
                    <div style={{ color: "grey" }}>
                        {format(new Date(), 'MMM d')} - {format(addDays(new Date(), 5), ' d')}
                    </div>
                    <div className="price">
                        <span style={{ fontWeight: "500" }}>${place.price.toLocaleString()}</span>
                        night
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;