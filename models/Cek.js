class Cek {
  constructor(data) {
    this.id = data.id || null;
    this.input1 = String(data.input1 || '');
    this.input2 = String(data.input2 || '');
    this.hitung();
  }
  type() {
    return 'umum';
  }
  normalisasi(teks) {
    return teks;
  }
  hitung() {
    const asli = Array.from(this.input1);
    const kata1 = Array.from(this.normalisasi(this.input1));
    const kata2 = Array.from(this.normalisasi(this.input2));

    this.detail = []; 
    this.jumlahCocok = 0;
    // nasted loop
    for (let i = 0; i < kata1.length; i++) {
      let ketemu = false;
      for (let j = 0; j < kata2.length; j++) {
        if (kata1[i] === kata2[j]) {
          ketemu = true;
          break;
        }
      }
      if (ketemu) this.jumlahCocok++;
      this.detail.push({ huruf: asli[i], ketemu: ketemu });
    }

    this.total = kata1.length;
    // matematika
    this.persen = this.total === 0 ? 0 : Math.round((this.jumlahCocok / this.total) * 10000) / 100;
  }

  // nasted if
  kategori() {
    if (this.total === 0) {
      return 'Kosong';
    }

    if (this.persen === 100) {
      if (this.input1.length === this.input2.length) {
        return 'Semua cocok, panjang sama';
      } else {
        return 'Semua karakter ada di input 2';
      }
    } else {
      if (this.persen >= 50) {
        return 'Sebagian besar cocok';
      } else {
        if (this.persen > 0) {
          return 'Sebagian kecil cocok';
        } else {
          return 'Tidak ada yang cocok';
        }
      }
    }
  }

  static cekError(input1, input2) {
    if (!input1 || !input2) {
      return 'Input 1 dan Input 2 wajib diisi';
    }
    return '';
  }
}

module.exports = Cek;
