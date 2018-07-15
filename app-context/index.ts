import * as DataLoader from 'dataloader';
import { FoodRecord } from '../data-store';

interface AppContext {
  dataLoaders: DataLoaders;
  fetchCounter: number;
}

export type Type = AppContext;

interface DataLoaders {
  foodRepository: {
    findById?: DataLoader<number, FoodRecord | null>
    findAll?: DataLoader<{}, FoodRecord[]>
  }
}

const buildDataLoaders = (): DataLoaders => {
  return {
    foodRepository: { },
  };
}

export const buildAppContext = (): AppContext => {
  return {
    dataLoaders: buildDataLoaders(),
    fetchCounter: 0,
  };
}
export const getFetchCount = (appContext: AppContext) => appContext.fetchCounter;
export const incrementFetchCounter = (appContext: AppContext) => {
  appContext.fetchCounter += 1;
  return appContext;
};
export const clearDataLoaders = (appContext: AppContext) => {
  appContext.dataLoaders = buildDataLoaders();
}