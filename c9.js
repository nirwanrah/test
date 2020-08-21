function spiral(n) {
    let array = []
    let index = n - 1
    let count = 0
    for (i = 0; i <= index; i++) { //jumlah array besar
        array[i] = [] //buat array besar yg masih kosong
        for (j = 0; j <= index; j++) { //isi array besar
            array[i][j] = count //
            count += 1 //selisih index
        }
    }
    console.log(array)
}
spiral(5)
spiral(6)
spiral(7)