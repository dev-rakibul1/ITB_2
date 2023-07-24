import { Date, Model } from 'mongoose';

export type payloadItem = {
  timestamp: Date;
  input_values: number[];
};

export type ISearchInput = {
  status?: string;
  user_id?: string;
  payload: payloadItem[];
  search_value: number;
  result?: string;
  role?: string;
};

export type ISearchInputModel = Model<ISearchInput, Record<string, unknown>>;

export type payloadTypeString = {
  input_values: string;
};
