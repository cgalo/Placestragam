import express from 'express';

const route = express.Router();

const DUMMY_PLACES = [
    // We'll be replaced when we link a DB
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the tallest buildings in NYC',
        location: {
            lat: 40.74844,
            lng: -73.98715
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Coca Cola Rotulo',
        description: 'Rotulo de Coca-Cola en la montaña Merendon',
        location: {
            lat: 15.5083608,
            lng: -88.0608642
        },
        address: '21104, Honduras',
        creator: 'u1'
    }
];

route.get('/:pId', (req, res, next) => {
    const placeId = req.params.pId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    console.log('GET request in Places');
    res.json({place: place});
});

route.get('/user/:uId', (req, res, next) => {
    const userId = req.params.uId;
    const userPlace = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    console.log('inside places/user/');
    res.json({userPlace: userPlace});
});

export = route;