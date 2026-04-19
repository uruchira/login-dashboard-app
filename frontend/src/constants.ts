// --- Login Page --- //

// FORM
export const USERNAME = "username";
export const PASSWORD = "password";

// FORM ERRORS
export const USERNAME_REQUIRED_ERROR = "Email is required";
export const USERNAME_INVALID_ERROR = "Invalid email format";
export const PASSWORD_REQUIRED_ERROR = "Password is required";
export const PASSWORD_MIN_LENGTH_ERROR =
  "Password must be at least 8 characters";

// API
export const NETWORK_DELAY = 500;
export const SAMPLE_USER_USERNAME = "a@a.com";
export const SAMPLE_USER_PASSWORD = "admin!@#";
export const LOGIN_ERROR_MESSAGE = "Invalid Username or Password";

// DEFAULTS
export const DEFAULT_LOGIN_DATA = { username: "", password: "" };

// --- Dashboard Page --- //

// FORM
export const SKU = "sku";
export const PRODUCT_NAME = "productName";
export const PRICE = "price";
export const QUANTITY = "quantity";
export const CATEGORY = "category";
export const DESCRIPTION = "description";
export const STATUS = "status";

// FORM ERRORS
export const SKU_REQUIRED_ERROR = "SKU is required";
export const PRODUCT_NAME_REQUIRED_ERROR = "Product name is required";
export const PRODUCT_NAME_LENGTH_ERROR =
  "Product name must be at least 10 characters long";
export const PRICE_REQUIRED_ERROR = "Price is required";
export const PRICE_INVALID_ERROR = "Invalid price format";
export const QUANTITY_REQUIRED_ERROR = "Quantity is required";
export const QUANTITY_INVALID_ERROR = "Invalid quantity format";
export const DESCRIPTION_TOO_LONG_ERROR =
  "Description should have at most 10 characters";

// DEFAULTS
export const DEFAULT_PRODUCT_DATA = {
  sku: "",
  productName: "",
  price: 0,
  quantity: 0,
  category: "",
  description: "",
  status: false,
};
