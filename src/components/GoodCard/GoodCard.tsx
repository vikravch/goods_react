import { useState } from 'react';
import { Good } from '../../types';
import './GoodCard.scss';
import { GoodsForm } from '../GoodsForm/GoodsForm';

type Props = {
  good: Good;
  onDelete: (goodId: number) => void;
  onUpdate: (good: Good) => void;
};

export const GoodCard: React.FC<Props> = ({ good, onDelete, onUpdate }) => {
  const [isEditGood, setIsEditGood] = useState(false);

  return (
    <article key={good.id} className="GoodCard">
      {isEditGood ? (
        <GoodsForm
          onAddGood={newGood => {
            onUpdate(newGood);
            setIsEditGood(false);
          }}
          good={good}
          onReset={() => setIsEditGood(false)}
        />
      ) : (
        <>
          <p
            className="GoodCard__title"
            style={{ color: good.color?.name || 'black' }}
          >
            {good.name}
          </p>
          <button onClick={() => onDelete(good.id)}>X</button>
          <button onClick={() => setIsEditGood(true)}>Edit</button>
        </>
      )}
    </article>
  );
};
