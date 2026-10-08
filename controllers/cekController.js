const Cek = require('../models/Cek');
const riwayat = require('../models/Riwayat');

// halaman utama: form + tabel riwayat + statistik (READ)
exports.index = (req, res) => {
  res.render('cek/index', {
    judul: 'Cek Karakter',
    riwayat: riwayat.all(),
    stat: riwayat.statistik(),
    hasil: null, input1: '', input2: '', tipe: 'sensitive', error: '',
  });
};

// proses hitung + simpan (CREATE)
exports.simpan = (req, res) => {
  const { input1 = '', input2 = '', tipe = 'sensitive' } = req.body;

  const error = Cek.cekError(input1, input2);
  if (error) {
    return res.render('cek/index', {
      judul: 'Cek Karakter', riwayat: riwayat.all(), stat: riwayat.statistik(), hasil: null, input1, input2, tipe, error,
    });
  }

  const cek = riwayat.add(riwayat.cek(tipe, input1, input2));
  res.redirect('/cek/' + cek.id);
};

// lihat hasil (muncul sebagai modal di halaman utama)
exports.detail = (req, res) => {
  const cek = riwayat.search(req.params.id);
  if (!cek) return res.redirect('/cek');
  res.render('cek/index', {
    judul: 'Hasil Cek', riwayat: riwayat.all(), stat: riwayat.statistik(),
    hasil: cek, input1: '', input2: '', tipe: 'sensitive', error: '',
  });
};

// form edit
exports.formEdit = (req, res) => {
  const cek = riwayat.search(req.params.id);
  if (!cek) return res.redirect('/cek');
  const tipe = cek.type() === 'Case sensitive' ? 'sensitive' : 'insensitive';
  res.render('cek/edit', { judul: 'Edit Cek', cek, input1: cek.input1, input2: cek.input2, tipe, error: '' });
};

// update
exports.update = (req, res) => {
  const { input1 = '', input2 = '', tipe = 'sensitive' } = req.body;
  const cek = riwayat.search(req.params.id);
  if (!cek) return res.redirect('/cek');

  const error = Cek.cekError(input1, input2);
  if (error) {
    return res.render('cek/edit', { judul: 'Edit Cek', cek, input1, input2, tipe, error });
  }

  riwayat.update(req.params.id, riwayat.cek(tipe, input1, input2));
  req.session.pesan = { jenis: 'sukses', isi: 'Data berhasil diubah' };
  res.redirect('/cek/' + req.params.id);
};

// delete 
exports.delete = (req, res) => {
  riwayat.delete(req.params.id);
  req.session.pesan = { jenis: 'sukses', isi: 'Data berhasil didelete' };
  res.redirect('/cek');
};