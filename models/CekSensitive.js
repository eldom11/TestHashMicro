const Cek = require('./Cek');

class CekSensitive extends Cek {
  type() {
    return 'Case sensitive';
  }

  normalisasi(teks) {
    return teks;
  }
}

module.exports = CekSensitive;
