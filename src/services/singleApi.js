
import { getFirebaseData } from 'src/utils/httpRequest'; // Sửa đường dẫn import

export const singleApi = async (id) => {
  try {
    const res = await getFirebaseData(`data/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
