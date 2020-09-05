export default class mesinHitung {
    constructor() {
        this.initial = 1
        this.jari
    }
    add(i) { 
        this.initial += i; 
        return this 
    }
    substract(i) { 
        this.initial -= i; 
        return this 
    }
    divide(i) { 
        this.initial /= i; 
        return this 
    }
    multiply(i) { 
        this.initial *= i; 
        return this 
    }
    squareRoot() { 
        this.initial = Math.sqrt(this.initial); 
        return this 
    }
    exponent(i) { 
        this.initial **= i; 
        return this 
    }
    square() { 
        this.initial = Math.pow(this.initial, 2); 
        return this 
    }
    result() {
        console.log(this.initial);
        return this
    }
    get x() {
        return this.jari
    }
    set x(value){
        this.jari = value
        this.initial = value
        return this
    }
}
export const Pi = 22/7