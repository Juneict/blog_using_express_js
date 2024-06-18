const express = require('express')

const expressLayouts = require('express-ejs-layouts');

const app = express()

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set('layout', 'layouts/default');

const mongoose = require('mongoose');

const Blog = require('./models/Blog');

const BlogRoutes = require('./routes/blogRoutes');

let mongoUrl = "mongodb+srv://junemoenyinyi:lMm0YvaJ37TagcFh@test.28uvqlz.mongodb.net/?retryWrites=true&w=majority&appName=test"
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('mongo db is connected')
        app.listen(3000)
    }).catch(e => {
        console.log(e);
    });

let morgan = require('morgan')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/', async function (req, res) {
    res.redirect('blogs');
})

app.get('/about', function (req, res) {
    res.render('about', {
        'title': 'about'
    })
})

app.get('/about-us', function (req, res) {
    res.redirect('/about')
})

app.get('/contact', function (req, res) {
    res.render('contact', {
        'title': 'contact'
    })
})

app.use('/blogs', BlogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        'title': '404 not found'
    });
})