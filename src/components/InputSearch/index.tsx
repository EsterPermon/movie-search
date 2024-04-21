import React from 'react';
import Button from '../UI/Button';
import InputField from '../UI/InputField';
import InputSearchStyles from './styles';
import translate from '../../locales/i18n';
import SelectField from '../UI/Select';
import { SearchType } from '../../workers/types';

type EventType = React.ChangeEvent<HTMLInputElement>;
type InputSearchProps = {
  handleOnClick: (title: string, type: SearchType) => void;
};

const InputSearch = (props: InputSearchProps) => {
  const { handleOnClick } = props;
  const searchTypes: SearchType[] = ['', 'movie', 'series'];
  const initialValue = searchTypes[0];
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchType, setSearchType] = React.useState<SearchType>(initialValue);

  const handleOnChangeInput = React.useCallback((event: EventType) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  }, []);

  return (
    <InputSearchStyles>
      <SelectField options={searchTypes} initialValue={initialValue} onChange={setSearchType} />
      <InputField
        placeholder={translate(`inputSearch.input.placeholder.${searchType}`)}
        onChange={handleOnChangeInput}
      />
      <Button label={translate('inputSearch.button.label')} onClick={() => handleOnClick(searchTerm, searchType)} />
    </InputSearchStyles>
  );
};

export default InputSearch;
