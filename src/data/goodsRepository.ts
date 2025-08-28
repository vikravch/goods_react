import { colors } from '../api/colors';
import { goodsFromServer } from '../api/goods';
import { Good } from '../types';
import { Color } from '../types';
import { httpClient } from './httpClient';

export type GoodsRepository = {
  getColors: () => Promise<Color[]>;
  getGoods: () => Promise<Good[]>;

  addGood: (newGood: Omit<Good, 'id'>) => void;
  removeGood: (goodId: number) => void;
  updateGood: (newGood: Good) => void;
};

export const publicApiGoodsRepository: GoodsRepository = {
  getColors: () => {
    return fetch('http://localhost:3000/api/colors.json').then(
      response => response.json() as Promise<Color[]>,
    );
  },
  getGoods: () => {
    return fetch('http://localhost:3000/api/goods.json').then(
      response => response.json() as Promise<Good[]>,
    );
  },
  addGood: function (newGood: Omit<Good, 'id'>): void {
    throw new Error('Function not implemented. Good - ' + newGood);
  },
  removeGood: function (goodId: number): void {
    throw new Error('Function not implemented. GoodId - ' + goodId);
  },
  updateGood: function (newGood: Good): void {
    throw new Error('Function not implemented. New good - ' + newGood);
  },
};

export const expressGoodsRepository: GoodsRepository = {
  getColors: () => {
    return fetch('http://localhost:3010/colors').then(
      response => response.json() as Promise<Color[]>,
    );
  },
  getGoods: () => {
    return fetch('http://localhost:3010/goods').then(
      response => response.json() as Promise<Good[]>,
    );
  },
  addGood: function (newGood: Omit<Good, 'id'>): void {
    throw new Error('Function not implemented. Good - ' + newGood);
  },
  removeGood: function (goodId: number): void {
    throw new Error('Function not implemented. GoodId - ' + goodId);
  },
  updateGood: function (newGood: Good): void {
    throw new Error('Function not implemented. New good - ' + newGood);
  },
};

export const collectionGoodsRepository: GoodsRepository = {
  getColors: () => {
    return Promise.resolve(colors);
  },
  getGoods: () => {
    return Promise.resolve(goodsFromServer);
  },
  addGood: function (newGood: Omit<Good, 'id'>): void {
    throw new Error('Function not implemented. Good - ' + newGood);
  },
  removeGood: function (goodId: number): void {
    throw new Error('Function not implemented. GoodId - ' + goodId);
  },
  updateGood: function (newGood: Good): void {
    throw new Error('Function not implemented. New good - ' + newGood);
  },
};

export const httpClientGoodsRepository: GoodsRepository = {
  getColors: () => {
    return httpClient.get<Color[]>('/colors');
  },
  getGoods: () => {
    return httpClient.get<Good[]>('/goods');
  },
  addGood: (newGood: Omit<Good, 'id'>) => {
    httpClient.post<Omit<Good, 'id'>>('/goods', newGood);
  },
  removeGood: (goodId: number) => {
    httpClient.delete<Good>('/goods/' + goodId);
  },
  updateGood: (newGood: Good) => {
    httpClient.patch<Good>('/goods/' + newGood.id, newGood);
  },
};

export default httpClientGoodsRepository;
