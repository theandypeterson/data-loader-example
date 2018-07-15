import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';


// Example 2 - Demonstrate the caching of data loaders.
// If we look up the same id twice, it will only access the data store once
export const run = async () => {
  console.log('------------Example 2------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  // Fetch count is one since cache is empty.
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  // Fetch count is still one since id 1 is in the cache.
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 2');
  await FoodRepository.findById(appContext, 2);
  // Id 2 is not in the cache, for the fetch count increase to two.
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  // Id 1 is in the cache, for the fetch count stays at two.
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  // By clearing the data loaders, fetching a particular id will increase the fetch count
  // since the cache is now empty.
  AppContext.clearDataLoaders(appContext);
  console.log('cleared data loaders');

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  // Id 1 is no longer in the cache, so the fetch count increases to 3
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  // Id 1 is in the cache, so the count stays at 3
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));
  console.log('------------Finished------------');
};
