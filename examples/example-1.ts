import * as FoodRepository from '../food-repository';
import * as AppContext from '../app-context';
import * as DataStore from '../data-store';

export const run = async () => {
  console.log('------------Example 1------------');
  DataStore.initialize();
  const appContext = AppContext.buildAppContext();
  const a = AppContext.buildAppContext();

  const food1 = await FoodRepository.findById(appContext, 1);
  console.log(`First food record: ${JSON.stringify(food1)}`);

  const food2 = await FoodRepository.findById(appContext, 2);
  console.log(`Second food record: ${JSON.stringify(food2)}`);

  console.log('-------------Finshed-------------');
};
