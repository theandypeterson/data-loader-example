import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

export const run = async () => {
  console.log('------------Example 4------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();

  const allFoods1 = await FoodRepository.findAll(appContext);
  console.log(`first food list: `, allFoods1);

  await FoodRepository.createFoodV2(appContext, 'Waffles', 2.12);

  const allFoods2 = await FoodRepository.findAll(appContext);
  console.log(`second food list: `, allFoods2);

  console.log('------------Finished------------');
};
