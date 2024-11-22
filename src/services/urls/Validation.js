export const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]*\.[A-Z]{2,}$/i,
    message: "inavlid email",
  },
};
export const PASSWORD_VALIDATION = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  maxLength: {
    value: 16,
    message: "Password must not exceed 16 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
  },
};

export const PHONE_VALIDATION = {
  required: "phone number is required",
  pattern: {
    value: /^\d+$/,
    message: "Mobile phone number must contain numbers only",
  },
  minLength: {
    value: 10,
    message: "Mobile phone number must be at least 10 digits",
  },
  maxLength: {
    value: 15,
    message: "Mobile phone number must not exceed 15 digits",
  },
};
