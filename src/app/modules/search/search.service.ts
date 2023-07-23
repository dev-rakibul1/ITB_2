import { ISearchInput } from './search.interface';
import Search from './search.model';

const createNewSearchService = async (
  payload: ISearchInput
): Promise<ISearchInput | null> => {
  payload.inputValues.sort((a, b) => b - a);

  if (payload.inputValues.includes(payload.searchValue)) {
    payload.result = 'True';
  } else {
    payload.result = 'False';
  }

  const result = await Search.create(payload);
  return result;
};

const getSearchService = async (): Promise<ISearchInput[] | null> => {
  const result = await Search.find({});
  return result;
};

export const searchService = {
  createNewSearchService,
  getSearchService,
};
