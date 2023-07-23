import { Model } from 'mongoose';

export type ISearchInput = {
  inputValues: number[];
  searchValue: number;
  result?: string;
};

export type ISearchInputModel = Model<ISearchInput, Record<string, unknown>>;
