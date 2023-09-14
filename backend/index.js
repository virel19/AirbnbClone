const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Place = require('./models/Places');
const Booking = require('./models/Booking');
const Favorite = require('./models/Favorite');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const secret = bcrypt.genSaltSync(10);
const jwtTokenSecret = 'S3CR3T';

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.REACT_APP_DB_URL);

function getUserDataFromToken(request) {
    return new Promise((resolve) => {
        jwt.verify(request.cookies.token, jwtTokenSecret, {}, async (error, userData) => {
            if (error) throw error;
            resolve(userData);
        });
    });
}

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userReg = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, secret),
        });
        res.json(userReg);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userReg = await User.findOne({ email })
    if (userReg) {
        const passCheck = bcrypt.compareSync(password, userReg.password);
        if (passCheck) {
            jwt.sign({
                email: userReg.email,
                id: userReg._id,
            },
                jwtTokenSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userReg);
                });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtTokenSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});



const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 20), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const splitOriginalName = originalname.split('.');
        const extension = splitOriginalName[splitOriginalName.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, photos, description,
        features, extraInfo, checkIn, checkOut, maxGuest,
        price, bedrooms, beds, baths, username
    } = req.body;
    jwt.verify(token, jwtTokenSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
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
            username
        })
        res.json(placeDoc);
    })
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtTokenSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});


app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, photos, description,
        features, extraInfo, checkIn, checkOut, maxGuest,
        price, bedrooms, beds, baths, username
    } = req.body;
    jwt.verify(token, jwtTokenSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
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
                username
            })
            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const {
        place, name, email, phone, checkIn, checkOut, numberOfGuest, price } = req.body;
    Booking.create({
        place, name, email, phone, checkIn, checkOut, numberOfGuest, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((error) => {
        throw error;
    })
})


app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
})

app.post('/api/user/favorites/add', async (req, res) => {
    try {

        const userData = await getUserDataFromToken(req);

        const userId = userData.id;
        const placeId = req.body.placeId;

        
        let user = await Favorite.findOne({ user: userId });

        if (!user) {
            user = new Favorite({ user: userId, places: [] });
        }

        if (!user.places.includes(placeId)) {
            user.places.push(placeId);
        }

        await user.save();

        res.status(200).json({ message: 'Place added to favorites' });
    } catch (error) {
        console.error('Error adding place to favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/user/favorites/remove', async (req, res) => {
    try {

        const userData = await getUserDataFromToken(req);

        const userId = userData.id;
        const placeId = req.body.placeId;

        let user = await Favorite.findOne({ user: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        user.places = user.places.filter((place) => place.toString() !== placeId);
        await user.save();

        res.status(200).json({ message: 'Place removed from favorites' });
    } catch (error) {
        console.error('Error removing place from favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/user/favorites', async (req, res) => {
    try {
        
        const userData = await getUserDataFromToken(req);

        
        const userId = userData.id;

        const favorites = await Favorite.findOne({ user: userId });

        if (!favorites) {
            return res.status(404).json({ message: 'User has no favorites or user not found' });
        }


        const favoritePlaceIds = favorites.places.map((place) => place.toString());

        res.status(200).json(favoritePlaceIds);
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getFavorites', async (req, res) => {
    try {
        const userData = await getUserDataFromToken(req);

        const userId = userData.id;

        const favorites = await Favorite.findOne({ user: userId }).populate('places');

        if (!favorites) {
            return res.status(404).json({ message: 'User has no favorites or user not found' });
        }

        res.status(200).json(favorites.places);
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(4000);