import React, {useState} from 'react';
import {Dropdown} from '../../Dropdown/Dropdown.jsx';

import classes from './MenuPage.scss';

const options = [
  {value: 'dog', label: 'Dog'},
  {value: 'cat', label: 'Cat'},
  {value: 'turtle', label: 'Turtle'},
  {value: 'parrot', label: 'Parrot'},
  {value: 'hamster', label: 'Hamster'},
  {value: 'goldfish', label: 'Goldfish'},
  {value: 'owl', label: 'Owl'},
  {value: 'spider', label: 'Spider'},
];

const selectId = 'pet-select';

function MenuPage() {
  const [selectedValue, setSelectedValue] = useState(options[3].value);

  return (
    <div className={classes.container}>
      <label
        htmlFor={selectId}
        className={classes.label}
      >Select your favorite pet
      </label>
      <Dropdown
        options={options}
        id={selectId}
        onSelect={setSelectedValue}
        selectedValue={selectedValue}
        selectClassName={classes.select}
      />
      <div>{selectedValue} was selected as favorite</div>
    </div>
  );
}

export {MenuPage};
