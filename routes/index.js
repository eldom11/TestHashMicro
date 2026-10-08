const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const cek = require('../controllers/cekController');

// middleware: harus login dulu
function harusLogin(req, res, next) {
  if (!req.session.sudahLogin) return res.redirect('/login');
  next();
}

router.get('/login', auth.halamanLogin);
router.post('/login', auth.prosesLogin);
router.post('/logout', auth.logout);

router.get('/', (req, res) => res.redirect('/cek'));

router.get('/cek', harusLogin, cek.index);
router.post('/cek', harusLogin, cek.simpan);
router.get('/cek/:id', harusLogin, cek.detail);
router.get('/cek/:id/edit', harusLogin, cek.formEdit);
router.post('/cek/:id/update', harusLogin, cek.update);
router.post('/cek/:id/hapus', harusLogin, cek.delete);

module.exports = router;
