import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from '../utils';
import { useState } from 'react';
import './App.css';
import './HandButton.css';

//승패 판단
function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) {
    return '승리';
  }
  if (comparison < 0) {
    return '패배';
  }
  return '무승부';
}

const INITIAL_VALUE = 'rock';   //초기값 변수

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);    //내 손 state
  const [other, setOther] = useState(INITIAL_VALUE);  //상대 손 state
  const [gameHistory, setGameHistory] = useState([]); //나 vs 상대 승부 기록 state
  const [score, setScore] = useState(0);              //내 스코어 state
  const [otherScore, setOtherScore] = useState(0);    //상대방 스코어 state
  const [bet, setBet] = useState(1);                  //점수 배팅 state
  const [won, setWon] = useState(null);               //나의 승리 state (상태에 따라서 className 적용)
  const [otherWon, setOtherWon] = useState(null);     //상대 승리 state (상태에 따라서 className 적용)

  //가위바위보 버튼 클릭
  const handleButtonClick = (nextHand) => {
    const nextOther = generateRandomHand();   //상대 손 랜덤 생성
    const nextHistoryItem = getResult(nextHand, nextOther);
    const comparison = compareHand(nextHand, nextOther);
    setHand(nextHand);
    setOther(nextOther);
    setGameHistory([...gameHistory, nextHistoryItem]);  //승부 기록 추가
    if (comparison > 0) {
      setWon(true);
      setOtherWon(false);
      setScore(score + bet);            //승리 시, 내 점수 + 베팅 점수
    } else if (comparison < 0) {
      setWon(false);
      setOtherWon(true);
      setOtherScore(otherScore + bet);  //패배 시, 상대 점수 + 베팅 점수
    } else {
      setWon(false);
      setOtherWon(false);
    }
  };

  //처음부터(초기화)
  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOther(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
    setWon(null);
    setOtherWon(null);
  };

  //점수 베팅
  const handleBetChange = (e) => {
    //1 ~ 9 사이의 정수만 입력 가능
    //문자 & 소수점 입력 불가
    let num = Number(e.target.value); //input의 value 속성 참조
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className='App'>
      <h1>가위바위보</h1>
      <Button className='App-reset' onClick={handleClearClick}></Button>

      <div className='App-scores'>
        <div className='Score'>
          <p className='Score-num'>{score}</p>
          <p className='Score-name'>나</p>
        </div>
        <p className='App-versus'>:</p>
        <div className='Score'>
          <p className='Score-num'>{otherScore}</p>
          <p className='Score-name'>상대</p>
        </div>
      </div>

      <div className='Box'>
        <div className='Box-inner'>

          <div className='App-hands'>
            <div className={won ? 'Hand-winner' : 'Hand'}>
              <HandIcon className='Hand-icon' value={hand} />
            </div>
            <p className='App-versus'>VS</p>
            <div className={otherWon ? 'Hand-winner' : 'Hand'}>
              <HandIcon className='Hand-icon' value={other} />
            </div>
          </div>

          <div className='App-bet'>
            <span>배점</span><input onChange={handleBetChange} type="number" value={bet} min={1} max={9}></input>
          </div>

          <div className='App-history'>
            <h2>승부 기록</h2>
            <p>{gameHistory.join(', ')}</p>
          </div>

        </div>
      </div>

      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
