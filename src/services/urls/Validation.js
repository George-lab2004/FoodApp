export const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]*\.[A-Z]{2,}$/i,
    message: "inavlid email",
  },
};
