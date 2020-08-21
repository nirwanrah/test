function pola(str) {
    let bilangan = str.split(' ')
    let bil1 = bilangan[0]
    let bil2 = bilangan[2]
    let bil3 = bilangan[4]
    for (i = 0; i <= 9; i++) {
        for (j = 0; j <= 9; j++) {
            while (bil1.replace('#', i) * bil2 == bil3.replace('#', j)) {
                return [i, j]
            }
        }
    }
}
console.log(pola("42#3 * 188 = 80#204")) //result 8, 5
console.log(pola("8#61 * 895 = 78410#5")) //result 7, 9