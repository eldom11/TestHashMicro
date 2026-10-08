require('dotenv').config();
const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;

exports.halamanLogin = (req, res) => {
  if (req.session.sudahLogin) return res.redirect('/cek');
  res.render('login', { judul: 'Login' });
};

exports.prosesLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.sudahLogin = true;
    req.session.username = username;
    return res.redirect('/cek');
  }
  req.session.pesan = { jenis: 'error', isi: 'Username atau password salah' };
  res.redirect('/login');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
