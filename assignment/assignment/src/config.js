// src/config.js

const config = {
  // URL cơ sở của API
  dbUrl: "http://localhost:3000",

  // Tên các collection trong API
  collections: {
    products: "products",
    accounts: "accounts",
  },

  // Cấu hình cho collection chính (sản phẩm)
  mainCollection: "products",
  mainCollectionLabel: "Products",

  // Ánh xạ tên thuộc tính chung sang tên trường cụ thể trong JSON
  fields: {
    // Product fields
    productId: "id",
    productTitle: "title",
    productBrand: "name",
    productImage: "image",
    productPrice: "price",
    productSalePrice: "salePrice",
    productDescription: "description",
    productTags: "tags",

    // Account fields
    userId: "id",
    userFullName: "fullName",
    userEmail: "email",
    userAvatar: "avatar",
    userName: "username",
    userPassword: "password",
  },

  // Cấu hình chung cho ứng dụng
  app: {
    DEBOUNCE_DELAY: 300,
    ITEMS_PER_PAGE_OPTIONS: [6, 9, 12],
    SECRET_QUESTIONS: [
      "What was your first pet's name?",
      "What is your mother's maiden name?",
      "What was the name of your elementary school?",
      "In what city were you born?",
    ],
  },

  /**
   * Hàm trợ giúp để lấy giá trị từ một đối tượng một cách an toàn
   * bằng cách sử dụng tên trường nội bộ đã được định nghĩa.
   * @param {string} internalFieldName - Tên trường nội bộ (ví dụ: 'productTitle').
   * @param {object} object - Đối tượng chứa dữ liệu (ví dụ: một sản phẩm).
   * @returns {*} - Giá trị của trường tương ứng hoặc chuỗi rỗng nếu không tìm thấy.
   */
  getField: (internalFieldName, object) => {
    if (!object) return "";
    const externalFieldName = config.fields[internalFieldName];
    return object[externalFieldName] || "";
  },
};

export default config;
