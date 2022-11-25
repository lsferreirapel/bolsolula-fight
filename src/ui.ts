import { Character } from './entitites/Character';

export let timer = 30;
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
  const player1HpPorcentage = (100 * player1.battleStats.actualHp) / player1.battleStats.totalHp
  const player2HpPorcentage = (100 * player2.battleStats.actualHp) / player2.battleStats.totalHp

  // document.querySelector('#displayText')!.style.display = 'flex'
  if (player1HpPorcentage === player2HpPorcentage) {
    document.querySelector('#displayText')!.innerHTML = 'Empate'
  } else if (player1HpPorcentage > player2HpPorcentage) {
    document.querySelector('#displayText')!.innerHTML = player1.name + ' Wins'
  } else if (player1HpPorcentage < player2HpPorcentage) {
    document.querySelector('#displayText')!.innerHTML = player2.name + ' Wins'
  }
}