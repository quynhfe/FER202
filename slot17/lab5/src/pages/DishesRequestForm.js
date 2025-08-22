import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Image,
  InputGroup,
} from "react-bootstrap";
import { FaUtensils, FaImage } from "react-icons/fa";
import { ToastContext } from "../context/ToastContext";
import { DishesContext } from "../context/DishesContext";

const DishesRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const { showToast } = useContext(ToastContext);
  const { addDish } = useContext(DishesContext);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Dish name is required.";
    if (formData.description.trim().length < 10)
      newErrors.description =
        "Description must be at least 10 characters long.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0)
      newErrors.price = "Please enter a valid price.";
    if (!imageFile) newErrors.image = "An image of the dish is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.image) {
        setErrors({ ...errors, image: null });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const newDish = {
        id: Date.now(),
        name: formData.name,
        image: previewUrl,
        price: parseFloat(formData.price).toFixed(2), // Định dạng lại giá
        category: formData.category,
        description: formData.description,
      };

      addDish(newDish);

      showToast(
        "Your new dish has been added to the list temporarily!",
        "success"
      );

      // Reset form
      setFormData({ name: "", description: "", category: "", price: "" });
      setImageFile(null);
      setPreviewUrl("");
      setErrors({});
    } else {
      showToast("Please correct the errors in the form.", "danger");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card className="p-4 p-md-5 shadow-lg border-0">
        <Card.Body>
          <h1 className="text-center mb-4">
            <FaUtensils className="me-2" /> Request a New Dish
          </h1>
          <p className="text-center text-muted mb-4">
            Fill in the details below to add a new dish to our menu temporarily.
          </p>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Dish Image *</Form.Label>
              <Form.Label
                htmlFor="dish-image-upload"
                className={`image-upload-box ${
                  errors.image ? "is-invalid" : ""
                }`}
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <div className="image-placeholder">
                    <FaImage size={40} className="mb-2" />
                    <span>Click to upload image</span>
                  </div>
                )}
              </Form.Label>
              <Form.Control
                type="file"
                id="dish-image-upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
              />
              {errors.image && (
                <div className="invalid-feedback d-block">{errors.image}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDishName">
              <Form.Label>Dish Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="e.g., Spicy Thai Green Curry"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDishCategory">
              <Form.Label>Category *</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="e.g., Appetizer, Main Course, Dessert"
                value={formData.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDishPrice">
              <Form.Label>Price *</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="e.g., 9.99"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  min="0"
                  step="0.01"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formDishDescription">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                placeholder="Describe the dish, its main ingredients, and why you love it."
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Submit Dish
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DishesRequestForm;
