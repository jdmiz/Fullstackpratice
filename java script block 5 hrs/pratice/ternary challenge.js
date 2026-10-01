const playerguess = 7
const correctguess = 9
let answer = playerguess == correctguess?'bingo ':playerguess <correctguess?'too low':playerguess > correctguess?'too high':'wrong'
console.log(answer)