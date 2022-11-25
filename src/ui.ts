import { Character } from './entitites/Character';

export let timer = 99;
let timerId: number;
export function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector(".timer")!.innerHTML = timer.toString();
  } else {
    clearTimeout(timerId);
  }
}

export function determineWinner(player1: Character, player2: Character) {
  clearTimeout(timerId)
  // document.querySelector('#displayText')!.style.display = 'flex'
  if (player1.battleStats.actualHp === player2.battleStats.actualHp) {
    document.querySelector('#displayText')!.innerHTML = 'Empate'
  } else if (player1.battleStats.actualHp > player2.battleStats.actualHp) {
    document.querySelector('#displayText')!.innerHTML = player1.name + ' Wins'
  } else if (player1.battleStats.actualHp < player2.battleStats.actualHp) {
    document.querySelector('#displayText')!.innerHTML = player2.name + ' Wins'
  }
}