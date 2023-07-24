import config from '../../../config/config';
import { ISearchInput } from './search.interface';
import Search from './search.model';
import { generateStudentId } from './search.utlis';

const createNewSearchService = async (
  payload: ISearchInput
): Promise<ISearchInput | null> => {
  // generate id
  const id = await generateStudentId();
  const idParts = id.split(' ');
  const lastPart = idParts[idParts.length - 1];
  payload.user_id = lastPart;

  if (!payload.role) {
    payload.role = config.user_default_role as string;
  }

  if (!payload.status) {
    payload.status = 'success' as string;
  }

  payload.payload.forEach(data => {
    const currentValue = data.input_values;
    const newArray = currentValue.sort((a, b) => b - a);

    payload.payload.find(firstValue => {
      firstValue.input_values = newArray;
    });
  });

  // True or False return
  payload.payload.find(firstData => {
    if (firstData.input_values.includes(payload.search_value as never)) {
      payload.result = 'True';
    } else {
      payload.result = 'False';
    }
  });

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
