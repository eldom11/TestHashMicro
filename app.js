const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const riwayat = require('./models/Riwayat');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
  })
);

app.use((req, res, next) => {
  res.locals.pesan = req.session.pesan || null;
  delete req.session.pesan;
  res.locals.sudahLogin = !!req.session.sudahLogin;
  res.locals.username = req.session.username;
  res.locals.tanggal = (d) => d.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  next();
});

app.use('/', routes);

app.use((req, res) => res.status(404).send('Halaman tidak ditemukan'));

riwayat.isiDataContoh();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Jalan di http://localhost:' + PORT));
