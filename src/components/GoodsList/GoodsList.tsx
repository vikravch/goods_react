import React from 'react';
import { Good } from '../../types';
import { GoodCard } from '../GoodCard/GoodCard';
//import '../GoodCard'

type Props = {
  goods: Good[];
  onDelete: (goodId: number) => void;
  onUpdate: (newGood: Good) => void;
};

/*export function GoodsList({goods}: Props) {
  return <h1>Good List {goods.length}</h1>;
}*/

export const GoodsList: React.FC<Props> = ({ goods, onDelete, onUpdate }) => {
  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard
          good={good}
          key={good.id}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export const MemoGoodsList = React.memo(GoodsList, (prevProps, nextProps) => {
  return (
    prevProps.goods.length === nextProps.goods.length &&
    JSON.stringify(prevProps.goods) === JSON.stringify(nextProps.goods)
  );
});

//class MyComp extends React.Component {}
