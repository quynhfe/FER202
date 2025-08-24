export const API_CONFIG = {
  BASE_URL: "http://localhost:3001",
  ENDPOINTS: {
    PRODUCTS: "products",
    ACCOUNTS: "accounts",
  },
};

export const PRODUCT_FIELD_MAP = {
  id: "id",
  title: "title",
  brand: "name",
  image: "image",
  price: "price",
  salePrice: "salePrice",
  description: "description",
  tags: "tags",
};

export const APP_CONFIG = {
  DEBOUNCE_DELAY: 300,
  ITEMS_PER_PAGE_OPTIONS: [6, 9, 12],
  SECRET_QUESTIONS: [
    "What was your first pet's name?",
    "What is your mother's maiden name?",
    "What was the name of your elementary school?",
    "In what city were you born?",
  ],
};
