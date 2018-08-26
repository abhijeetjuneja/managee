import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Search } from './styles';
import {DebounceInput} from 'react-debounce-input';

const SearchBox = ({ value, type, onChange, name,placeholder,style }) => {
  return (
      <DebounceInput
        minLength={0}
        debounceTimeout={1000}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        style={style}
        element={Search}
      />
    );
}

SearchBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

SearchBox.defaultProps = {
  type: 'text'
}

export default SearchBox;
