import { mesinHitung, Pi } from './c17export'
//import mesinHitung from './c17export'
var mh = new mesinHitung()
mh.add(10).substract(5).result() //1 + 10 - 5 = 6
mh.add(3).multiply(4).divide(6).result() //current result is 2 then mh is 6+3*4/6=6
mh.x = 7 // set jari-jari 7 setter
console.log(`Nilai sekarang: ${mh.x}`)
mh.multiply(2).multiply(Pi).result() //keliling lingkaran r=7 => 7 x 2 x Pi = 44 //2 x pi x R
mh.x = 7 //set r=7
mh.square().multiply(Pi).result() //luas lingkaran r=7 => Pi x r pangkat2 = 154 //pi x r kuadrat
mh.x = 4 // set r=4
mh.exponent(3).result() // 4 pangkat 3 = 64
mh.squareRoot().result() //akar pangkat 2 dari 64 = 8 