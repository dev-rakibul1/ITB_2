import { Schema, model } from 'mongoose';
import { ISearchInput, ISearchInputModel } from './search.interface';

const PayloadItemSchema = {
  timestamp: {
    type: Date,
    default: Date.now,
  },
  input_values: { type: [Number], required: true },
};

const searchSchema = new Schema<ISearchInput, ISearchInputModel>(
  {
    status: {
      type: String,
    },
    user_id: {
      type: String,
    },
    payload: { type: [PayloadItemSchema], required: true },
    search_value: {
      type: Number,
    },
    result: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Search = model<ISearchInput, ISearchInputModel>('search', searchSchema);
export default Search;
