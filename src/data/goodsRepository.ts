import { colors } from '../api/colors';
import { goodsFromServer } from '../api/goods';
import { Good } from '../types';
import { Color } from '../types';

export type GoodsRepository = {
  getColors: () => Promise<Color[]>;
  getGoods: () => Promise<Good[]>;
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
};

export const collectionGoodsRepository: GoodsRepository = {
  getColors: () => {
    return Promise.resolve(colors);
  },
  getGoods: () => {
    return Promise.resolve(goodsFromServer);
  },
};

export default expressGoodsRepository;
