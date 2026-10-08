const Cek = require('./Cek');

class CekNonSensitive extends Cek {
  type() {
    return 'Non case sensitive';
  }

  normalisasi(teks) {
    return teks.toLowerCase();
  }
}

module.exports = CekNonSensitive;
