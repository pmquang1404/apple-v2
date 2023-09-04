import { dbRef } from 'src/utils/httpRequest'; // Sửa đường dẫn import

export const search = async (name_like) => {
  try {
    const searchValue = name_like
    // Sử dụng `orderByChild` và `equalTo` để thực hiện truy vấn dựa trên chỉ mục
    const snapshot = await dbRef.child('data').orderByChild('name').startAt(searchValue).endAt(searchValue + "\uf8ff").once('value');
    const data = snapshot.val();

    // Chuyển đổi dữ liệu thành mảng đối tượng
    const products = data ? Object.values(data) : [];

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};


