import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { colors } from '../../api/colors';
import { Good } from '../../types';
import { getColorById } from '../../api/colors';

type Props = {
  onAddGood?: (good: Good) => void;
  good?: Good;
  onReset?: () => void;
};

export const GoodsForm: React.FC<Props> = ({
  onAddGood = () => {},
  good,
  onReset = () => {},
}) => {
  const [newGoodName, setNewGoodName] = useState(good?.name || '');
  const [selectedColorId, setSelectedColorId] = useState(good?.colorId || 0);
  const [nameError, setNameError] = useState('');
  const [colorIdError, setColorIdError] = useState('');

  const handleFormSubmit = () => {
    //event.preventDefault();

    if (newGoodName.length === 0) {
      setNameError('Name is empty');

      return;
    }

    if (selectedColorId === 0) {
      setColorIdError('Color is empty');

      return;
    }

    onAddGood({
      name: newGoodName,
      colorId: selectedColorId,
      id: good?.id || 87,
      color: getColorById(selectedColorId),
    });
  };

  const handleChangeName = (newName: string) => {
    setNewGoodName(newName);
    setNameError('');
  };

  const handleChangeColorId = (newColorId: number) => {
    setSelectedColorId(newColorId);
    setColorIdError('');
  };

  const handleResetForm = (event: React.FormEvent) => {
    event.preventDefault();
    setNewGoodName(good?.name || '');
    setSelectedColorId(good?.colorId || 0);
    setNameError('');
    setColorIdError('');
    onReset();
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <div className="field">
        <input
          type="text"
          className={classNames({ 'with-error': nameError })}
          value={newGoodName}
          onChange={event => handleChangeName(event.target.value)}
        />
        <span className="error">{nameError}</span>
      </div>

      <div className="field">
        <select
          className={classNames({ 'with-error': colorIdError })}
          value={selectedColorId}
          onChange={event => {
            handleChangeColorId(+event.target.value);
          }}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
        <span className="error">{colorIdError}</span>
      </div>

      <button type="submit">Add</button>
      <button type="reset" onClick={handleResetForm}>
        Reset
      </button>
    </form>
  );
};

export const MemoGoodsForm = React.memo(GoodsForm, () => true);
