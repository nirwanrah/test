function pola(str) {
    let pjg = str.length
    let j = 0
    let angka = []
    for (i=0; i<=pjg; i++) {
        let op = str.charAt(i)
        if (op === '*' || op === '=') {
            let ketemu = str.slice(j,i)
            let noSpasi = ketemu.trim()
            angka.push(noSpasi)
            j = i +1
        } else if (i === pjg) {
            let ketemu = str.slice(j,pjg)
            let noSpasi = ketemu.trim()
            angka.push(noSpasi) 
        }
    }
    let a1 = angka[0]
    let a2 = angka[1]
    let a3 = angka[2]
    for (i=0; i<=9; i++) {
        let ki = a1.replace('#', i)
        for (j=0; j<=9; j++) {
            let kj = a3.replace('#', j)
            let g = parseInt(kj)
            let kali = ki*a2
            if (kali === g) {
                return [i,j]
            } 
        } 
    }
}
console.log(pola("42#3 * 188 = 80#204")) //result 8, 5
console.log(pola("8#61 * 895 = 78410#5")) //result 7, 9