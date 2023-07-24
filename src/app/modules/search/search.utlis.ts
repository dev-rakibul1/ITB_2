import { payloadTypeString } from './search.interface';
import Search from './search.model';

// Find the last student id
const findLastStudentId = async (): Promise<number> => {
  const lastUser = await Search.findOne({ role: 'user' })
    .sort({ createdAt: -1 })
    .lean();

  const uniqueId = lastUser?.user_id;
  return uniqueId ? parseInt(uniqueId.replace('id: ', '')) : 0;
};

// Generate student id
export const generateStudentId = async (): Promise<string> => {
  const lastId = await findLastStudentId();
  const newId = lastId + 1;

  return `id: ${newId}`;
};

//
export const checkIfNumberExists = (
  numberToFind: number,
  payload: payloadTypeString[]
) => {
  const inputValuesArray = payload.map(item =>
    item?.input_values.split(', ').map(Number)
  );
  for (const valuesArray of inputValuesArray) {
    if (valuesArray.includes(numberToFind)) {
      return true;
    }
  }

  return false;
};
