import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

// Example 1 - Demonstrate repositories working with data loaders.
// There is no data loader specific functionality shown here.
export const run = async () => {
  console.log('------------Example 1------------');

  // Initialize the store with food data.
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  const food1 = await FoodRepository.findById(appContext, 1);
  console.log(`First food record: ${JSON.stringify(food1)}`);

  const food2 = await FoodRepository.findById(appContext, 2);
  console.log(`Second food record: ${JSON.stringify(food2)}`);

  console.log('-------------Finshed-------------');
};
