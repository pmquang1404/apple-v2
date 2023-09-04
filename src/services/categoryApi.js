

import { getFirebaseData } from 'src/utils/httpRequest'; // Sửa đường dẫn import

export const findProductsByCategory = async (category) => {
  try {
    const data = await getFirebaseData('data');
    const products = Object.values(data).filter(product => product.category === category);
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};
