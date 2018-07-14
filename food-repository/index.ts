import * as AppContext from "../app-context";
import * as FoodRepoDataLoaders from "./data-loaders";
import * as DataStore from '../data-store';
import { FoodRecord } from "../data-store";

export const findById = async (appContext: AppContext.Type, id: number): Promise<FoodRecord | null> => {
  const record = await FoodRepoDataLoaders.getFoodRepositoryFindByIdDataLoader(appContext).load(id);
  if (!record) {
    return null;
  }
  return record;
};

export const findAll = async (appContext: AppContext.Type): Promise<FoodRecord[]> => {
  return FoodRepoDataLoaders.getFoodRepositoryFindAllDataLoader(appContext).load({});
};

export const createFood = async (appContext: AppContext.Type, name: string, price: number): Promise<number> => {
  const newId = DataStore.insertFoodRecord({ name, price });
  return Promise.resolve(newId);
};

export const createFoodV2 = async (appContext: AppContext.Type, name: string, price: number): Promise<number> => {
  const newId = DataStore.insertFoodRecord({ name, price });
  AppContext.clearDataLoaders(appContext);
  return Promise.resolve(newId);
};