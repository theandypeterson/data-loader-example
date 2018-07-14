import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

export const run = async () => {
  console.log('------------Example 2------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 2');
  await FoodRepository.findById(appContext, 2);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  AppContext.clearDataLoaders(appContext);
  console.log('cleared data loaders');

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));

  console.log('fetching id 1');
  await FoodRepository.findById(appContext, 1);
  console.log(`fetch count: `, AppContext.getFetchCount(appContext));
  console.log('------------Finished------------');
};
