const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Places'},
    user: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    numberOfGuest: Number,
    price: Number,
});

const BookinModel = mongoose.model('Booking', bookingSchema);

module.exports = BookinModel;