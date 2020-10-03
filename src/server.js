const express = require('express');
const bodyParser = require('body-parser');
let cabs = require('./data.json');

const cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
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
    console.log("cABS", cabs);
    cabs.forEach(cab => {
        if(!cab.isBooking) {
            if(color) {
                if(color === cab.color) {
                    const distance = getDistance(position, cab.location);
                    if(distance < minDistance) {
                        minDistance = distance;
                        closestCab = cab; 
                    }                
                }
            }
            else {
                const distance = getDistance(position, cab.location);
                if(distance < minDistance) {
                    minDistance = distance;
                    closestCab = cab; 
                }
            }
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
    if(latitude && longitude) {
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
    }
    else {
        res.json({msg: 'No parameters found.'})
    }
})

const getPrice = (locationFrom, locationTo, color) => {
    let returnPrice = null;
    const distance = getDistance(locationFrom, locationTo);
    if(color === 'pink') {
        returnPrice = (distance * 2) + 5;
    }
    else {
        returnPrice = (distance * 2)
    }
    return returnPrice;
}

app.post('/completeRide', (req, res) => {
    const cabId = req.body.id;
    const locationFrom = req.body.locationFrom;
    const locationTo = req.body.locationTo;
    if(cabId && locationFrom && locationTo) {
        let bookedCab = null;
        cabs.forEach(cab => {
            if(cab.id === cabId) {
                bookedCab = cab;
            }
        })
        if(bookedCab) {
            if(bookedCab.isBooking) {
                bookedCab.isBooking = false;
                const color = bookedCab.color;
                const price = getPrice(locationFrom, locationTo, color);
                res.json({
                    msg: "Ride Completed Successfully",
                    totalPrice: price,
                })
            }
            else {
                res.json({msg: "You need to book a cab first"});
            }
        }
        else {
            res.json({ msg: "No cabs Found" });
        }
    }
    else {
        res.json({msg: "Requests cannot proceed"});
    }
    
})

app.listen(4000, () => console.log('Listening on port 4000'));