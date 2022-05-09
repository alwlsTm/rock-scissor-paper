import rockImg from './IMGS/rock.svg';
import scissorImg from './IMGS/scissor.svg';
import paperImg from './IMGS/paper.svg';

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

function HandIcon({ value }) {
  const src = IMAGES[value];
  return <img src={src} alt={value} />;
}

export default HandIcon;
