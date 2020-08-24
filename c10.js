const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tuliskan kalimatmu di sini > '
})
rl.prompt()
rl.on('line', (line) => {
    let splitStc = line.split(' ')
    let joinWords = []
    for (i = 0; i < splitStc.length; i++) {
        if (splitStc[i].charAt(0) == 'a' ||
            splitStc[i].charAt(0) == 'i' ||
            splitStc[i].charAt(0) == 'u' ||
            splitStc[i].charAt(0) == 'e' ||
            splitStc[i].charAt(0) == 'o') {
            joinWords.push(splitStc[i])
        } else {
            joinWords.push(`${splitStc[i].substr(1)}${splitStc[i].charAt(0)}nyo`)
        }
    }
    console.log(`hasil konversi: ${joinWords.join(' ')}`)
    rl.prompt()
}).on('close', () => { //ketik ctrl+c
    console.log('Good bye!')
    process.exit(0)
})