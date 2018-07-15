// Food Repository - handles the retrieval of data from the data store using data loaders.
// By using data loaders at this layer, we not only hide the data retrival code from outside
// intefaces, but we also only worry about the cache mechanics here. Users of this repository
// should not have to worry about caching.
import * as AppContext from '../app-context';
import * as FoodRepoDataLoaders from './data-loaders';
import * as DataStore from '../data-store';

// findById - returns a food record for the given id. If none is found, return null.
// Instead of accessing the data store directly, we retrieve a data loaders
export const findById = async (appContext: AppContext.Type, id: number): Promise<DataStore.FoodRecord | null> => {
  const record = await FoodRepoDataLoaders.getFoodRepositoryFindByIdDataLoader(appContext).load(id);
  if (!record) {
    return null;
  }
  return record;
};

// findAll - returns all the food records in the data store. Ideally, we could add additional arguements
// for this function, such as sorting and filtering. These would be passed down as an object. For now,
// an empty object is passed to the data loader instead.
export const findAll = async (appContext: AppContext.Type): Promise<DataStore.FoodRecord[]> => {
  return FoodRepoDataLoaders.getFoodRepositoryFindAllDataLoader(appContext).load({});
};

// createFood - creates a new food record in the data store, returning the id of the newly create record.
// The appContext is not used in this version of the function, but will be used in V2
export const createFood = async (appContext: AppContext.Type, name: string, price: number): Promise<number> => {
  const newId = DataStore.insertFoodRecord({ name, price });
  return Promise.resolve(newId);
};

// createFoodV2 - same as createFood, but clears out the cache after the change to the data store is made.
export const createFoodV2 = async (appContext: AppContext.Type, name: string, price: number): Promise<number> => {
  const newId = DataStore.insertFoodRecord({ name, price });
  AppContext.clearDataLoaders(appContext);
  return Promise.resolve(newId);
};