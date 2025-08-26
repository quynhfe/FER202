// src/features/products/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  {
    id: 1,
    title: "Xe đạp địa hình",
    price: 3000000,
    image: "https://picsum.photos/300/200?1",
  },
  {
    id: 2,
    title: "Mũ bảo hiểm",
    price: 500000,
    image: "https://picsum.photos/300/200?2",
  },
  {
    id: 3,
    title: "Găng tay xe đạp",
    price: 200000,
    image: "https://picsum.photos/300/200?3",
  },
  {
    id: 4,
    title: "Bình nước thể thao",
    price: 150000,
    image: "https://picsum.photos/300/200?4",
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: initialProducts,
    filtered: [],
  },
  reducers: {
    setFilter: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.filtered = state.list.filter((p) =>
        p.title.toLowerCase().includes(keyword)
      );
    },
  },
});

export const { setFilter } = productsSlice.actions;
export default productsSlice.reducer;
