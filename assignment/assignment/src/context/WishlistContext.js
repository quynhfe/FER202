import React, { createContext, useContext, useReducer, useEffect } from "react";

// Tạo Context
export const WishlistContext = createContext();

// Tạo custom hook để sử dụng context dễ dàng hơn
export const useWishlist = () => useContext(WishlistContext);

// Reducer để xử lý logic thêm/xóa sản phẩm
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        // Nếu sản phẩm đã có, xóa nó khỏi danh sách
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      // Nếu chưa có, thêm vào danh sách
      return { ...state, items: [...state.items, action.payload] };
    }
    case "LOAD_WISHLIST":
      // Load dữ liệu từ localStorage
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

// Provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Lấy dữ liệu từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      dispatch({ type: "LOAD_WISHLIST", payload: JSON.parse(storedWishlist) });
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items));
  }, [state.items]);

  // Các hàm và giá trị sẽ được cung cấp cho toàn bộ ứng dụng
  const toggleWishlist = (product) =>
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  const isWished = (id) => state.items.some((item) => item.id === id);
  const wishlistCount = state.items.length;

  const value = {
    wishlistState: state,
    toggleWishlist,
    isWished,
    wishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
