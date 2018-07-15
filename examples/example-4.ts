import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

// Example 4 - Demonstrate an improved create function that deals with caching issues.
// To avoid stale data sets, we want to clear out the cache any time we change the data store.
export const run = async () => {
  console.log('------------Example 4------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  // Lookup all the records. Results are cached.
  const allFoods1 = await FoodRepository.findAll(appContext);
  console.log(`first food list: `, allFoods1);

  // Create a new record. This version of the create function will clear out the cache.
  await FoodRepository.createFoodV2(appContext, 'Waffles', 2.12);

  // The new record is now included in the data set as expected.
  const allFoods2 = await FoodRepository.findAll(appContext);
  console.log(`second food list: `, allFoods2);

  console.log('------------Finished------------');
};
