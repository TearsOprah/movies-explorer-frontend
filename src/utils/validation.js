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
  } else if (!isPasswordValid(formValue.password)) {
    errors.password = 'Пароль должен содержать не менее 8 символов';
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

export function isNameValid(name) {
  // Валидация имени (латиница, кириллица, пробелы и дефис)
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  return nameRegex.test(name);
}

export function isEmailValid(email) {
  // Валидация email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export function isPasswordValid(password) {
  // Валидация пароля (не менее 8 символов)
  return password.length >= 8;
}
