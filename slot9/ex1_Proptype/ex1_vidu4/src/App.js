import React from "react";
import MyForm2 from "././components/MyForm2"; // Giả sử MyForm được lưu trong thư mục cùng với App.js

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
  };

  return (
    <div className="App">
      <h1>Ứng Dụng React</h1>
      <MyForm2 title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
