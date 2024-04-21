import { ChangeEvent } from 'react';
import StyledInput from './styles';

type EventType = ChangeEvent<HTMLInputElement>;
type InputFieldProps = {
  placeholder: string;
  onChange: (event: EventType) => void;
};

const InputField = (props: InputFieldProps) => {
  const { placeholder, onChange } = props;

  return <StyledInput required onChange={onChange} placeholder={placeholder} />;
};

export default InputField;
