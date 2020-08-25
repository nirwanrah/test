function indexPrime(index) {
    let number = 2
    let counter = 0
    while (counter < index){
        let isPrime = number > 1
        for (var i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                isPrime = false;
            }
        }
        if (isPrime){
            counter++
        }
        number++
    }
    return number-1
}
console.log(indexPrime(10));// 7
console.log(indexPrime(500)); // 3571
console.log(indexPrime(37786)); // 450881