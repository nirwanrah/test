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
    var a = array.length;
    //create empty 2d array
    var startRow = 0;
    var endRow = a - 1;
    var startColumn = 0;
    var endColumn = a - 1
    var newArray = [];
    // While loop is used to spiral into the 2d array.
    while (startRow <= endRow && startColumn <= endColumn) {
        // Reading top row, from left to right
        for (var i = startColumn; i <= endColumn; i++) {
            newArray.push(array[startColumn][i]);
        }
        startRow++; // Top row read.
        // Reading right column from top right to bottom right
        for (var i = startRow; i <= endRow; i++) {
            newArray.push(array[i][endColumn]);
        }
        endColumn--; // Right column read
        // Reading bottom row, from bottom right to bottom left
        for (var i = endColumn; i >= startColumn; i--) {
            newArray.push(array[endRow][i]);
        }
        endRow--; // Bottom row read
        // Reading left column, from bottom left to top left
        for (var i = endRow; i >= startRow; i--) {
            newArray.push(array[i][startColumn]);
        }
        startColumn++; // left column now read.
    } // While loop will now spiral in the matrix.
    console.log(newArray);
}
spiral(5)
spiral(6)
spiral(7)