const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/univ.db";
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    //console.log("Koneksi ke database berhasil!");
});
module.exports = db;

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    //prompt: ['username:','password']
})

class Univ {
    Header() {
        console.log(`
=============================================================
Welcome to UPI
Jl. Setiabudi No. 255
=============================================================
`)
    }
    Login() {
        rl.question(`username:`, (username) => {
            console.log(`=============================================================`)
            rl.question(`password:`, (password) => {
                console.log(`=============================================================`)
                db.serialize(function () {
                    let sql = "SELECT * FROM user WHERE username = ? and password = ?";
                    db.get(sql, [username, password], (err, row) => {
                        if (err) throw err;
                        if (row) {
                            let name = row.username[0].toUpperCase() + row.username.slice(1)
                            console.log(`Welcome, ${name}. Your acces level is ${row.level.toUpperCase()}`);
                            menu.mainMenu()
                        } else {
                            console.log(`Username atau password salah. Coba lagi!
                            `)
                            menu.Login()
                        }
                    })
                })
            })
        })
    }

    mainMenu() {
        console.log(`=============================================================
Menu Utama
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
=============================================================`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.opsiMhs()
                    break
                case '2':
                    menu.opsiJur()
                    break
                case '3':
                    menu.opsiDosen()
                    break
                case '4':
                    menu.opsiMatkul()
                    break
                case '5':
                    menu.opsiKontrak()
                    break
                case '6':
                    console.log(`Kamu keluar dari sistem.`)
                    menu.Header()
                    menu.Login()
                    break
                default:
                    console.log('Please input number option from 1 to 6')
                    menu.mainMenu()
                    break
            }

        })
    }

    opsiMhs() {
        console.log(`=============================================================
Menu Mahasiswa
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.mhsTable()
                    break
                case '2':
                    menu.inputNimMhs()
                    break
                case '3':
                    menu.addMhs()
                    break
                case '4':
                    menu.deleteMhs()
                    break
                case '5':
                    menu.mainMenu()
                    break
                default:
                    console.log('Please input number option from 1 to 5')
                    menu.opsiMhs()
                    break
            }
        })
    }

    deleteMhs() {
        console.log(`Masukkan NIM mahasiswa yang akan dihapus:`)
        rl.question(`NIM        :`, (inputNIM) => {
            db.serialize(function () {
                let sql = "DELETE FROM mahasiswa WHERE nim=?"
                let id = inputNIM
                db.run(sql, [id], (err) => {
                    if (err) console.log("Error")
                    console.log(`Mahasiswa dengan NIM ${inputNIM} telah dihapus`)
                    menu.mhsTable()
                })

            })
        })
    }

    addMhs() {
        console.log(`Lengkapi data di bawah ini:`)
        rl.question(`NIM        :`, (inputNIM) => {
            rl.question(`Nama       :`, (inputNama) => {
                rl.question(`Alamat     :`, (inputAlamat) => {
                    rl.question(`Jurusan    :`, (inputJurusan) => {
                        db.serialize(function () {
                            let sql = `INSERT INTO mahasiswa(nim, mhs_name, mhs_address, jur_name) VALUES(${inputNIM}, '${inputNama}', '${inputAlamat}', '${inputJurusan}')`
                            db.run(sql, (err) => {
                                if (err) console.log("Error");
                                menu.mhsTable()

                            })
                        })
                    })
                })
            })
        })
    }

    mhsTable() {
        var Table = require('cli-table');
        var tableCli = new Table({
            head: ['NIM', 'Nama', 'Alamat', 'Jurusan'], colWidths: [30, 30, 30, 30]
        })
        db.serialize(function () {
            let sql = "SELECT * FROM mahasiswa"
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        tableCli.push([row.nim, row.mhs_name, row.mhs_address, row.jur_name])
                    })
                } else {
                    console.log("Error");
                }
                console.log(tableCli.toString())
                menu.opsiMhs()
            })
        })
    }

    inputNimMhs() {
        rl.question(`=============================================================
Masukkan NIM:`, (nimMhs) => {
            console.log(`=============================================================`)
            db.serialize(function () {
                let sql = "SELECT * FROM mahasiswa WHERE nim = ?";
                db.get(sql, [nimMhs], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Student Details
=============================================================
id      : ${row.nim}
nama    : ${row.mhs_name}
alamat  : ${row.mhs_address}
jurusan : ${row.jur_name}
=============================================================`);
                        menu.opsiMhs()
                    } else {
                        console.log(`Mahasiswa dengan NIM ${nimMhs} tidak terdaftar.`)
                        menu.inputNimMhs()
                    }
                })
            })

        })
    }

    opsiJur() {
        console.log(`=============================================================
Silakan pilih opsi di bawah ini
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
=============================================================`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.jurTable()
                    break
                case '2':
                    menu.inputJur()
                    break
                case '3':
                    menu.addJur()
                    break
                case '4':
                    menu.deleteJur()
                    break
                case '5':
                    menu.mainMenu()
                    break
                default:
                    console.log('Please input number option from 1 to 5')
                    menu.opsiJur()
                    break
            }
        })
    }

    deleteJur() {
        console.log(`Masukkan nama jurusan yang akan dihapus:`)
        rl.question(`Nama jurusan   :`, (input) => {
            db.serialize(function () {
                let sql = "DELETE FROM jurusan WHERE jur_name=?"
                let id = input
                db.run(sql, [id], (err) => {
                    if (err) console.log("Error")
                    console.log(`Jurusan ${input} telah dihapus`)
                    menu.jurTable()
                })

            })
        })
    }

    addJur() {
        console.log(`Lengkapi data di bawah ini:`)
        rl.question(`Nama Jurusan   :`, (inputNIM) => {
            db.serialize(function () {
                let sql = `INSERT INTO jurusan(jur_name) VALUES('${inputJurusan}')`
                db.run(sql, (err) => {
                    if (err) console.log("Error");
                    menu.jurTable()

                })
            })

        })

    }

    inputJur() {
        rl.question(`=============================================================
Masukkan Nama Jurusan:`, (input) => {
            console.log(`=============================================================`)
            db.serialize(function () {
                let sql = "SELECT * FROM jurusan WHERE jur_name = ?";
                db.get(sql, [input], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Jurusan Details
=============================================================
nama jurusan : ${row.jur_name}
=============================================================`);
                        menu.opsiJur()
                    } else {
                        console.log(`Jurusan ${input} tidak terdaftar.`)
                        menu.inputJur()
                    }
                })
            })

        })
    }

    jurTable() {
        var Table = require('cli-table');
        var tableCli = new Table({
            head: ['Nama Jurusan'], colWidths: [30]
        })
        db.serialize(function () {
            let sql = "SELECT * FROM jurusan"
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        tableCli.push([row.jur_name])
                    })
                } else {
                    console.log("Error");
                }
                console.log(tableCli.toString())
                menu.opsiJur()
            })
        })
    }

    opsiDosen() {
        console.log(`=============================================================
Silakan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
=============================================================`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.dosenTable()
                    break
                case '2':
                    menu.inputDosen()
                    break
                case '3':
                    menu.addDosen()
                    break
                case '4':
                    menu.deleteDosen()
                    break
                case '5':
                    menu.mainMenu()
                    break
                default:
                    console.log('Please input number option from 1 to 5')
                    menu.opsiDosen()
                    break
            }
        })
    }

    deleteDosen() {
        console.log(`Masukkan nama dosen yang akan dihapus:`)
        rl.question(`Nama dosen:`, (input) => {
            db.serialize(function () {
                let sql = "DELETE FROM dosen WHERE dsn_name=?"
                let id = input
                db.run(sql, [id], (err) => {
                    if (err) console.log("Error")
                    console.log(`Dosen ${input} telah dihapus`)
                    menu.dosenTable()
                })
            })
        })
    }

    addDosen() {
        console.log(`Lengkapi data di bawah ini:`)
        rl.question(`Nama Dosen :`, (input) => {
            db.serialize(function () {
                let sql = `INSERT INTO dosen(dsn_name) VALUES('${input}')`
                db.run(sql, (err) => {
                    if (err) console.log("Error");
                    menu.dosenTable()

                })
            })
        })
    }

    inputDosen() {
        rl.question(`=============================================================
Masukkan Nama Dosen:`, (input) => {
            console.log(`=============================================================`)
            db.serialize(function () {
                let sql = "SELECT * FROM dosen WHERE dsn_name = ?";
                db.get(sql, [input], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Dosen Details
=============================================================
nama dosen : ${row.dsn_name}
=============================================================`);
                        menu.opsiDosen()
                    } else {
                        console.log(`Dosen atas nama ${input} tidak terdaftar.`)
                        menu.inputDosen()
                    }
                })
            })

        })
    }

    dosenTable() {
        var Table = require('cli-table');
        var tableCli = new Table({
            head: ['Nama Dosen'], colWidths: [30]
        })
        db.serialize(function () {
            let sql = "SELECT * FROM dosen"
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        tableCli.push([row.dsn_name])
                    })
                } else {
                    console.log("Error");
                }
                console.log(tableCli.toString())
                menu.opsiDosen()
            })
        })
    }

    opsiMatkul() {
        console.log(`=============================================================
Silakan pilih opsi di bawah ini
[1] Daftar Matkul
[2] Cari Matkul
[3] Tambah Matkul
[4] Hapus Matkul
[5] Kembali
=============================================================`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.matkulTable()
                    break
                case '2':
                    menu.inputMatkul()
                    break
                case '3':
                    menu.addMatkul()
                    break
                case '4':
                    menu.deleteMatkul()
                    break
                case '5':
                    menu.mainMenu()
                    break
                default:
                    console.log('Please input number option from 1 to 5')
                    menu.opsiMatkul()
                    break
            }
        })
    }

    deleteMatkul() {
        console.log(`Masukkan nama mata kuliah yang akan dihapus:`)
        rl.question(`Nama mata kuliah:`, (input) => {
            db.serialize(function () {
                let sql = "DELETE FROM matkul WHERE mk_name=?"
                let id = input
                db.run(sql, [id], (err) => {
                    if (err) console.log("Error")
                    console.log(`Mata kuliah ${input} telah dihapus`)
                    menu.matkulTable()
                })
            })
        })
    }

    addMatkul() {
        console.log(`Lengkapi data di bawah ini:`)
        rl.question(`Nama mata kuliah :`, (input) => {
            db.serialize(function () {
                let sql = `INSERT INTO matkul(mk_name) VALUES('${input}')`
                db.run(sql, (err) => {
                    if (err) console.log("Error");
                    menu.matkulTable()

                })
            })
        })
    }

    inputMatkul() {
        rl.question(`=============================================================
Masukkan nama mata kuliah:`, (input) => {
            console.log(`=============================================================`)
            db.serialize(function () {
                let sql = "SELECT * FROM matkul WHERE mk_name = ?";
                db.get(sql, [input], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Mata Kuliah Details
=============================================================
nama mata kuliah : ${row.mk_name}
jumlah sks       : ${row.sks}
jurusan          : ${row.jur_name}
=============================================================`);
                        menu.opsiMatkul()
                    } else {
                        console.log(`Mata kuliah ${input} tidak terdaftar.`)
                        menu.inputMatkul()
                    }
                })
            })

        })
    }

    matkulTable() {
        var Table = require('cli-table');
        var tableCli = new Table({
            head: ['Nama Mata Kuliah', 'Jumlah SKS', 'Nama Jurusan'], colWidths: [30, 30, 30]
        })
        db.serialize(function () {
            let sql = "SELECT * FROM matkul"
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        tableCli.push([row.mk_name, row.sks, row.jur_name])
                    })
                } else {
                    console.log("Error");
                }
                console.log(tableCli.toString())
                menu.opsiMatkul()
            })
        })
    }

    opsiKontrak() {
        console.log(`=============================================================
Silakan pilih opsi di bawah ini
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali
=============================================================`)
        rl.question(`Masukkan salah satu nomor opsi di atas:`, (input) => {
            switch (input) {
                case '1':
                    menu.kontrakTable()
                    break
                case '2':
                    menu.inputKontrak()
                    break
                case '3':
                    menu.addKontrak()
                    break
                case '4':
                    menu.deleteKontrak()
                    break
                case '5':
                    menu.mainMenu()
                    break
                default:
                    console.log('Please input number option from 1 to 5')
                    menu.opsiKontrak()
                    break
            }
        })
    }

    deleteKontrak() {
        console.log(`Masukkan id kontrak yang akan dihapus:`)
        rl.question(`ID Kontrak:`, (input) => {
            db.serialize(function () {
                let sql = "DELETE FROM kontrak WHERE kontrak_id=?"
                let id = input
                db.run(sql, [id], (err) => {
                    if (err) console.log("Error")
                    console.log(`ID kontrak ${input} telah dihapus`)
                    menu.kontrakTable()
                })
            })
        })
    }

    addKontrak() {
        console.log(`Lengkapi data di bawah ini:`)
        rl.question(`ID Kontak          :`, (inputID) => {
            rl.question(`Score              :`, (inputScore) => {
                rl.question(`NIM                :`, (inputNIM) => {
                    rl.question(`Nama mata kuliah   :`, (inputMatkul) => {
                        rl.question(`Nama dosen         :`, (inputDosen) => {
                            db.serialize(function () {
                                let sql = `INSERT INTO kontrak(kontrak_id, score, nim, mk_name, dsn_name) VALUES(${inputID}, '${inputScore}', '${inputNIM}', '${inputMatkul}', '${inputDosen}')`
                                db.run(sql, (err) => {
                                    if (err) console.log("Error");
                                    menu.kontrakTable()

                                })
                            })
                        })
                    })
                })
            })
        })
    }

    inputKontrak() {
        rl.question(`=============================================================
Masukkan ID kontrak :`, (input) => {
            console.log(`=============================================================`)
            db.serialize(function () {
                let sql = "SELECT * FROM kontrak WHERE kontrak_id = ?";
                db.get(sql, [input], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Kontrak Details
=============================================================
id kontrak       : ${row.kontrak_id}
score            : ${row.score}
nim              : ${row.nim}
nama mata kuliah : ${row.mk_name}
nama dosen       : ${row.dsn_name}
=============================================================`);
                        menu.opsiKontrak()
                    } else {
                        console.log(`ID Kontrak ${input} tidak terdaftar.`)
                        menu.inputKontrak()
                    }
                })
            })

        })
    }
    //kontrak_id, score, nim, mk_name, dsn_name
    kontrakTable() {
        var Table = require('cli-table');
        var tableCli = new Table({
            head: ['ID Kontrak', 'Score', 'Nim', 'Mata Kuliah', 'Dosen'], colWidths: [30, 30, 30, 30, 30]
        })
        db.serialize(function () {
            let sql = "SELECT * FROM kontrak"
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        tableCli.push([row.kontrak_id, row.score, row.nim, row.mk_name, row.dsn_name])
                    })
                } else {
                    console.log("Error");
                }
                console.log(tableCli.toString())
                menu.opsiKontrak()
            })
        })
    }
}

const menu = new Univ()

menu.Header()
menu.Login()
