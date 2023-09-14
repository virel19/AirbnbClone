const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    features: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuest: Number,
    price: Number,
    bedrooms: Number,
    beds: Number,
    baths: Number,
    username: String,
});


const PlacesModel = mongoose.model('Places', placesSchema);

module.exports = PlacesModel;