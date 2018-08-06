// Data Store - this is just a quick in-memory data storage module for demonstration purposes.
import * as _ from 'lodash';

export interface FoodRecord {
  name: string;
  price: number;
}

const createFoodStore = () => {
  return {
    1: {
      name: 'Milk',
      price: 1.05,
    },
    2: {
      name: 'Cookies',
      price: 3.50,
    },
    3: {
      name: 'Pancakes',
      price: 4.32,
    },
  };
};

let foodStore;

export const getFoodRecordFromStore = (id: number): FoodRecord | null => {
  const record = foodStore[id];
  if (!record) {
    return null;
  }
  return record;
};

interface FindAllOptions {
}
export const getAllFoodRecords = (opts: FindAllOptions): FoodRecord[] => {
  return _.values(foodStore);
};

export const insertFoodRecord = (record: FoodRecord): number => {
  const currentIds = _.keys(foodStore).map(_.parseInt);
  if (currentIds.length === 0) {
    foodStore[1] = record;
    return 1;
  }
  const maxId = _.max(currentIds);
  const newId = maxId + 1;
  foodStore[newId] = record;
  return newId;
};

export const initialize = () => {
  foodStore = createFoodStore();
}
