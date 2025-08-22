/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { MemoGoodsList } from './components/GoodsList/GoodsList';
import { Good } from './types';
import { MemoGoodsForm } from './components/GoodsForm/GoodsForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllGoods } from './data/goodsUseCases';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllGoods().then(list => setGoods(list));
  }, []);

  const onHandleAddGood = (newGood: Good) => {
    setGoods(stateGoods => [...stateGoods, newGood]);
  };

  const onHandleRemoveGood = useCallback((goodId: number) => {
    setGoods(stateGoods => stateGoods.filter(good => good.id !== goodId));
  }, []);

  const onHandleEditGood = useCallback((newGood: Good) => {
    setGoods(stateGoods =>
      stateGoods.map(good => (good.id === newGood.id ? newGood : good)),
    );
  }, []);

  const onHandleSearchClicked = () => {
    setSearchQuery(searchRef.current?.value || '');
  };

  const normalizeSearch = searchQuery.toLocaleLowerCase().trim();
  const goodsAfterSearch = goods.filter(good =>
    good.name.toLocaleLowerCase().includes(normalizeSearch),
  );

  return (
    <div className="App">
      <h1>Goods</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          ref={searchRef}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(event.target.value)
          }
        />
        <button onClick={() => onHandleSearchClicked()}>Search</button>
      </div>

      <MemoGoodsList
        goods={goodsAfterSearch}
        onDelete={onHandleRemoveGood}
        onUpdate={onHandleEditGood}
      />
      <MemoGoodsForm onAddGood={onHandleAddGood} />
    </div>
  );
};
