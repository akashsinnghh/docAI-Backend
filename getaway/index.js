const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();
app.use(cors());
app.use(express.json());

const services = {
    user: 'http://localhost:8001',
    home: 'http://localhost:8002',
    shopping: 'http://localhost:3003',
};

app.use('/:service', (req, res, next) => {
    console.log(`Proxying to ${req.params.service}`);
    const target = services[req.params.service];
    if (target) {
        proxy(target)(req, res, next);
    } else {
        res.status(404).send('Service not found');
    }
});

app.listen(8000, () => {
    console.log('Gateway is running on port 8000');
});
