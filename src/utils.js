const HANDS = ['rock', 'scissor', 'paper'];

const WINS = {
  rock: 'scissor',
  scissor: 'paper',
  paper: 'rock',
};

//나 vs 상대 비교
export function compareHand(a, b) {
  if (WINS[a] === b) return 1;    //승리
  if (WINS[b] === a) return -1;   //패배
  return 0;                       //무승부
}

function random(n) {
  return Math.floor(Math.random() * n);
}

//상대 손 랜덤 생성
export function generateRandomHand() {
  const idx = random(HANDS.length);
  return HANDS[idx];
}
