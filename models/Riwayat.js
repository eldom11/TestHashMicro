const CekSensitive = require('./CekSensitive');
const CekNonSensitive = require('./CekNonSensitive');

// Tempat nyimpen semua hasil pengecekan pakai array
class Riwayat {
  constructor() {
    this.daftar = [];
    this.idBerikutnya = 1;
  }

  cek(tipe, input1, input2) {
    if (tipe === 'insensitive') {
      return new CekNonSensitive({ input1, input2 });
    }
    return new CekSensitive({ input1, input2 });
  }

  // read
  all() {
    return this.daftar;
  }

  search(id) {
    return this.daftar.find((c) => c.id === Number(id));
  }

  // create
  add(cek) {
    cek.id = this.idBerikutnya++;
    this.daftar.push(cek);
    return cek;
  }

  // update
  update(id, cekBaru) {
    const index = this.daftar.findIndex((c) => c.id === Number(id));
    if (index === -1) return false;
    cekBaru.id = Number(id);
    cekBaru.dibuat = this.daftar[index].dibuat;
    this.daftar[index] = cekBaru;
    return true;
  }

  // delete
  delete(id) {
    const index = this.daftar.findIndex((c) => c.id === Number(id));
    if (index === -1) return false;
    this.daftar.splice(index, 1);
    return true;
  }

  // matematika
  statistik() {
    const jumlah = this.daftar.length;
    if (jumlah === 0) {
      return { jumlah: 0, rataRata: 0, tertinggi: 0, terendah: 0 };
    }

    let totalPersen = 0;
    let tertinggi = this.daftar[0].persen;
    let terendah = this.daftar[0].persen;

    for (let i = 0; i < this.daftar.length; i++) {
      const p = this.daftar[i].persen;
      totalPersen += p;
      if (p > tertinggi) tertinggi = p;
      if (p < terendah) terendah = p;
    }

    const rataRata = Math.round((totalPersen / jumlah) * 100) / 100;
    return { jumlah, rataRata, tertinggi, terendah };
  }

  // contoh dari soal
  isiDataContoh() {
    this.add(this.cek('sensitive', 'ABBCD', 'Gallant Duck'));
    this.add(this.cek('insensitive', 'ABBCD', 'Gallant Duck'));
  }
}

module.exports = new Riwayat();
