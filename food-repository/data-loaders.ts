import * as DataLoader from 'dataloader';
import * as DataStore from '../data-store';
import * as AppContext from '../app-context';

const findByIdDataLoaderFunction = (appContext: AppContext.Type) => (ids: number[]): Promise<Array<DataStore.FoodRecord | null>> => {
  AppContext.incrementFetchCounter(appContext)
  return Promise.resolve(ids.map((id) => DataStore.getFoodRecordFromStore(id)));
};

export const getFoodRepositoryFindByIdDataLoader = (appContext: AppContext.Type) => {
  let findByIdDataLoader = appContext.dataLoaders.foodRepository.findById;
  if (!findByIdDataLoader) {
    findByIdDataLoader = new DataLoader<number, DataStore.FoodRecord | null>(findByIdDataLoaderFunction(appContext));
    appContext.dataLoaders.foodRepository.findById = findByIdDataLoader;
  }
  return findByIdDataLoader;
};

interface FindAllOptions {
}
const findAllDataLoaderFunction = (appContext: AppContext.Type) => (opts: FindAllOptions[]): Promise<DataStore.FoodRecord[][]> => {
  return Promise.resolve(opts.map((opt) => DataStore.getAllFoodRecords(opt)));
};

export const getFoodRepositoryFindAllDataLoader = (appContext: AppContext.Type) => {
  let findAllDataLoader = appContext.dataLoaders.foodRepository.findAll;
  if (!findAllDataLoader) {
    findAllDataLoader = new DataLoader<FindAllOptions, DataStore.FoodRecord[]>(findAllDataLoaderFunction(appContext), {
      cacheKeyFn: () => '-',
    });
    appContext.dataLoaders.foodRepository.findAll = findAllDataLoader;
  }
  return findAllDataLoader;
}
