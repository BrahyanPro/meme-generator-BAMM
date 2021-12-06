import './app.css';
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className="buttom">
      {text}
    </button>
  );
};

export default Button;
