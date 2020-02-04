const path = require('path');
const express = require('express');
const hbs = require('hbs');
const scraper = require('./utils/scraper');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express configuration.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Root page.
// Making use of dynamic page attributes.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'The Greek Freek'
    });
});

// Weather endpoint
app.get('/weather', (req, res) => {

    const address = req.query.address;

    // Error handling.
    // in case there is no address property in the query string.
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    scraper(address, (error, data) => {
        if(error) {
            return res.send({error});
        }

        res.send(data);
    });
});

// 404 page, case general.
// Any page that was not mentioned above will come under this.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});