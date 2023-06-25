import {
  PASSWORD_REG,
  NAME_REG,
  EMAIL_REG,
  MIN_PASSWORD_LENGTH
} from "./constants";

export function validateRegisterForm(formValue) {
  const errors = {};

  if (!formValue.name) {
    errors.name = 'Введите имя';
  } else if (!isNameValid(formValue.name)) {
    errors.name = 'Имя может содержать только символы латиницы, кириллицы, пробел или дефис';
  }

  if (!formValue.email) {
    errors.email = 'Введите email';
  } else if (!isEmailValid(formValue.email)) {
    errors.email = 'Введите корректный email';
  }

  if (!formValue.password) {
    errors.password = 'Введите пароль';
  } else if (!PASSWORD_REG.test(formValue.password)) {
    errors.password = 'Пароль должен содержать латинские буквы, цифры, специальные символы и быть не менее 8 символов';
  }

  return errors;
}

export function validateLoginForm(formValue) {
  const errors = {};

  if (!formValue.email) {
    errors.email = "Введите email";
  } else if (!isEmailValid(formValue.email)) {
    errors.email = "Введите корректный email";
  }

  if (!formValue.password) {
    errors.password = "Введите пароль";
  } else if (!isPasswordValid(formValue.password)) {
    errors.password = "Пароль должен содержать не менее 8 символов";
  }

  return errors;
}

export function validateProfileForm(formValue, fieldToValidate) {
  const errors = {};

  if (fieldToValidate === 'name') {
    if (!formValue.name) {
      errors.name = 'Введите имя';
    } else if (!isNameValid(formValue.name)) {
      errors.name = 'Имя может содержать только символы латиницы, кириллицы, пробел или дефис';
    }
  }

  if (fieldToValidate === 'email') {
    if (!formValue.email) {
      errors.email = 'Введите email';
    } else if (!isEmailValid(formValue.email)) {
      errors.email = 'Введите корректный email';
    }
  }

  return errors;
}

export function isNameValid(name) {
  // Валидация имени (латиница, кириллица, пробелы и дефис)
  return NAME_REG.test(name);
}

export function isEmailValid(email) {
  // Валидация email
  return EMAIL_REG.test(email);
}

export function isPasswordValid(password) {
  // Валидация длины пароля
  return password.length >= MIN_PASSWORD_LENGTH;
}
