import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({
  options = [],
  id,
  onSelect,
  selectedValue,
  selectClassName,
}) {
  return (
    <select
      className={selectClassName}
      id={id}
      onChange={(e) => onSelect(e.target.value)}
      value={selectedValue}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
        >{option.label}</option>
      ))}
    </select>
  );
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  selectClassName: PropTypes.string,
};

export {Dropdown};
