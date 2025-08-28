import { Good } from '../types';
import { Color, emptyColor } from '../types';
import repository from './goodsRepository';

export const getColorById = (colorId: number): Promise<Color> => {
  return repository.getColors().then(colorList => {
    return colorList.find(color => color.id === colorId) || emptyColor;
  });
};

export async function getAllGoods(): Promise<Good[]> {
  const goodsList = await repository.getGoods();

  const goodsListRes = await Promise.all(
    goodsList.map(async good => ({
      ...good,
      color: await getColorById(good.colorId),
    })),
  );

  return goodsListRes;
}

export function addGood(newGood: Omit<Good, 'id'>) {
  return repository.addGood(newGood);
}

export function updateGood(newGood: Good) {
  return repository.updateGood(newGood);
}

export function deleteGood(goodId: number) {
  return repository.removeGood(goodId);
}

/*const goodsWithColors: Good[] = goodsFromServer.map(good => ({
    ...good,
    color: getColorById(good.colorId),
  }));*/
