import reset from '../IMGS/ic-reset.svg';

function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>{children}
      <img src={reset} alt={reset}></img>
    </button>
  );
}

export default Button;
