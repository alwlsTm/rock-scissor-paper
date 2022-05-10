import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';
import { useState } from 'react';

//승패 판단
function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

const INITIAL_VALUE = 'rock';   //초기값

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);    //내 손 state
  const [other, setOther] = useState(INITIAL_VALUE);  //상대 손 state

  //가위바위보 버튼 클릭
  const handleButtonClick = (nextHand) => {
    const nextOther = generateRandomHand();   //상대 손 랜덤 생성
    setHand(nextHand);
    setOther(nextOther);
  };

  //처음부터(초기화)
  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOther(INITIAL_VALUE);
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <p>{getResult(hand, other)}</p>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={other} />
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
