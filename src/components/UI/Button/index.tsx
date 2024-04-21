import { MouseEvent } from 'react';
import StyledButton from './styles';

type EventType = MouseEvent<HTMLButtonElement>;
type ButtonProps = {
  onClick: (event: EventType) => void;
  label: string;
};

const Button = (props: ButtonProps) => {
  const { onClick, label } = props;

  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
