// Data Loader code can get complex (potentially even messy), so I've found it useful
// to seperate it from the other repository code that actually uses the data loaders.
import * as DataLoader from 'dataloader';
import * as DataStore from '../data-store';
import * as AppContext from '../app-context';

// getFoodRepositoryFindByIdDataLoader - returns a data loader with "find by id" capabilities.
// We check to see if the current appContext has this data loader. If not, create a new one.
export const getFoodRepositoryFindByIdDataLoader = (appContext: AppContext.Type) => {
  let findByIdDataLoader = appContext.dataLoaders.foodRepository.findById;
  if (!findByIdDataLoader) {
    findByIdDataLoader = new DataLoader<number, DataStore.FoodRecord | null>(findByIdDataLoaderFunction(appContext));
    appContext.dataLoaders.foodRepository.findById = findByIdDataLoader;
  }
  return findByIdDataLoader;
};

// findByIdDataLoaderFunction - returns a function that accepts an array of ids. This inner function is used by data loader
// to process the incoming ids for load() calls. We're closing over the app context here to demonstrate some more advanced
// capabilites that can be implemented. For example, we're updating a counter here that can be read outside this function.
// Other uses I have found for the app context is transaction management. When dealing with databases as the data store,
// I've found success passing the transaction around via the app context instead of another argument to data loader.
const findByIdDataLoaderFunction = (appContext: AppContext.Type) => (ids: number[]): Promise<Array<DataStore.FoodRecord | null>> => {
  AppContext.incrementFetchCounter(appContext)
  return Promise.resolve(ids.map(DataStore.getFoodRecordFromStore));
};

// getFoodRepositoryFindAllDataLoader - returns a data load with "find all" capabilities.
// Similar to getFoodRepositoryFindByIdDataLoader.
export const getFoodRepositoryFindAllDataLoader = (appContext: AppContext.Type) => {
  let findAllDataLoader = appContext.dataLoaders.foodRepository.findAll;
  if (!findAllDataLoader) {
    findAllDataLoader = new DataLoader<FindAllOptions, DataStore.FoodRecord[]>(findAllDataLoaderFunction(appContext), {
      // This option allows us to create out own key to cache by. Since the parameter to this data loader
      // is an object, the default cacheKeyFn won't properly cache results (it uses some hash for the object instead, or something like that).
      // Since we don't have an options defined for this function, I'm just using a placeholder cache key for now.
      // This means there will only be one value cached for this function.
      cacheKeyFn: (opt) => '-',
    });
    appContext.dataLoaders.foodRepository.findAll = findAllDataLoader;
  }
  return findAllDataLoader;
}

interface FindAllOptions {
}
// findAllDataLoaderFunction - returns a function that accepts an array of otions. Similar to findByIdDataLoaderFunction.
// The app context is not used at the moment, but can be helpful in a more complex data store system (see example in findByIdDataLoaderFunction docs).
const findAllDataLoaderFunction = (appContext: AppContext.Type) => (opts: FindAllOptions[]): Promise<DataStore.FoodRecord[][]> => {
  return Promise.resolve(opts.map(DataStore.getAllFoodRecords));
};

