import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

// Example 3 - Demonstrate the potential caching issues caused by data loaders.
// If we look up a data set before a record is added to the data store, future
// lookups may include stale data sets if the cache is mishandled, as demonstrated here.
export const run = async () => {
  console.log('------------Example 3------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  // Lookup all records in the data store. These results are cached.
  const allFoods1 = await FoodRepository.findAll(appContext);
  console.log(`first food list: `, allFoods1);

  // Create a new record in the data store.
  await FoodRepository.createFood(appContext, 'Waffles', 2.12);

  // Repeat the same lookup. The new record is not in the list since the cache is still around.
  const allFoods2 = await FoodRepository.findAll(appContext);
  console.log(`second food list: `, allFoods2);

  // Clear the cache.
  AppContext.clearDataLoaders(appContext);

  // The new record is now included in the data set.
  const allFoods3 = await FoodRepository.findAll(appContext);
  console.log(`third food list: `, allFoods3);

  console.log('------------Finished------------');
};
