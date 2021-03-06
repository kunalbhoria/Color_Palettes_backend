require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/colorPalette';
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const UserRoutes = require('./Routes/user.routes');
const UserPalettesRoutes = require('./Routes/userPalette.route');
const DefaultRoutes = require('./Routes/palette.route');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

app.get('/', (req, res) => {
    res.cookie('name', 'color')
    res.json({ name: 'kunal' });
})

app.use('/user', UserRoutes);
app.use('/user/palette', UserPalettesRoutes);
app.use('/default', DefaultRoutes);


app.listen(3001, () => {
    console.log('connected to port 3001');
});