import { Schema, model } from 'mongoose';
import { ISearchInput, ISearchInputModel } from './search.interface';

const searchSchema = new Schema<ISearchInput, ISearchInputModel>(
  {
    inputValues: {
      type: [Number],
    },
    searchValue: {
      type: Number,
    },
    result: {
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
