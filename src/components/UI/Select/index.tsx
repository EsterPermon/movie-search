import React from 'react';
import { StyledSelect, StyledOption } from './styles';
import translate from '../../../locales/i18n';
import { SearchType } from '../../../workers/types';

type EventType = React.ChangeEvent<HTMLSelectElement>;
type SelectFieldProps = {
  initialValue: SearchType;
  options: string[];
  onChange: (value: SearchType) => void;
};

const SelectField = (props: SelectFieldProps) => {
  const { initialValue, options, onChange } = props;

  const [selectedOption, setSelectedOption] = React.useState<SearchType>(initialValue);

  const handleOnChange = React.useCallback(
    (event: EventType) => {
      const value = event.target.value as SearchType;
      setSelectedOption(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <StyledSelect value={selectedOption} onChange={handleOnChange}>
      {options.map((option, i) => {
        return (
          <StyledOption key={i} value={option}>
            {translate(`inputSearch.select.options.${option}`)}
          </StyledOption>
        );
      })}
    </StyledSelect>
  );
};

export default SelectField;
