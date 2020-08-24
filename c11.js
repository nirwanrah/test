const fs = require('fs')
let data = fs.readFileSync('data.json', 'utf8')
let objectData = JSON.parse(data);

let i = 0
let rightAnswers = 0
const readline = require('readline')
console.log(`\nSelamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n`)
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout, 
    prompt: `Tebakan: ` })
console.log(`Pertanyaan: ${objectData[i].question}`)
rl.prompt()
rl.on('line', (guess) => {
    if (guess == objectData[i].answer) {
        console.log(`Selamat Anda Benar!\n`)
        i += 1
        rightAnswers += 1
        while (i == 3) {
            rl.close()
        }
        console.log(`Pertanyaan: ${objectData[i].question}`)
        rl.prompt()

    } else {
        console.log(`Wkwkwkwk, Anda kurang beruntung!\n`)
        i += 1
        while (i == 3) {
            rl.close()
        }
        console.log(`Pertanyaan: ${objectData[i].question}`)
        rl.prompt()
    }
}).on('close', () => {
    if (rightAnswers >= 2) {
        console.log(`Hore Anda Menang!\n`)
    } else {
        console.log(`23 hours, 59 minutes to try again...\n`)
    }
    process.exit(0)
})