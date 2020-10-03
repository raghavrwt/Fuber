const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

app.use(cors());

const cabs = [
    {
        id: 1,
        isBooking: false,
        location: {
            latitude: 0,
            longitude: 0,
        },
        color: "white"
    }, 
    {
        id: 2,
        isBooking: false,
        location: {
            latitude: 10,
            longitude: 10,
        },
        color: "pink",
    }, 
    {
        id: 3,
        isBooking: false,
        location: {
            latitude: 20,
            longitude: 20,
        },
        color: "pink",
    }, 
    {
        id: 4,
        isBooking: false,
        location: {
            latitude: 30,
            longitude: 30,
        },
        color: "white",
    },
    {
        id: 5,
        isBooking: false,
        location: {
            latitude: 40,
            longitude: 40,
        },
        color: "white",
    },
    {
        id: 6,
        isBooking: false,
        location: {
            latitude: 50,
            longitude: 50,
        },
        color: "pink",
    },
];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/showAllCabs', (req, res) => {
    res.json({ cabs });
})

const getDistance = (customerLocation, cabLocation) => {
    const latitude = customerLocation.latitude - cabLocation.latitude;
    const longitude = customerLocation.longitude - cabLocation.longitude;
    const distance = Math.sqrt(Math.pow(latitude, 2) + Math.pow(longitude, 2));
    return distance;
}

const getNearestCab = (position, color) => {
    let closestCab = null;
    let minDistance = Infinity;
    cabs.forEach(cab => {
        const distance = getDistance(position, cab.location);
        if(distance < minDistance) {
            minDistance = distance;
            closestCab = cab; 
        } 
    })
    return closestCab;
}

app.get('/bookCab', (req, res) => {
    const {
        latitude,
        longitude,
        color
    } = req.query;
    const customerLocation = {
        latitude,
        longitude,
    };
    const bookedCab = getNearestCab(customerLocation, color)
    if(bookedCab) {
        bookedCab.isBooking = true;
        res.json({
            bookedCab : {
                msg: "Cab is Booked!",
                ...bookedCab,
            }
        })
    }
    else {
        res.json({msg: "No cabs are available"});
    }
})

app.listen(4000, () => console.log('Listening on port 4000'));