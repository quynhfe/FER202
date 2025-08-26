import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothes", price: 40 },
  { id: 4, name: "Shoes", category: "Clothes", price: 100 },
];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: initialProducts,
    search: "",
    category: "All",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
