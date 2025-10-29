// regex.js
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return { valid: false, message: "O campo de e-mail é obrigatório." };
  if (!regex.test(email)) return { valid: false, message: "Digite um e-mail válido (ex: exemplo@dominio.com)." };
  return { valid: true, message: "" };
}

export function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  if (!password.trim()) return { valid: false, message: "A senha é obrigatória." };
  if (!regex.test(password)) return { valid: false, message: "A senha deve ter ao menos 6 caracteres, com letras e números." };
  return { valid: true, message: "" };
}

export function validateName(name) {
  const regex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
  if (!name.trim()) return { valid: false, message: "O nome é obrigatório." };
  if (!regex.test(name)) return { valid: false, message: "O nome deve conter apenas letras e ao menos 3 caracteres." };
  return { valid: true, message: "" };
}

export function validateCNPJ(cnpj) {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  if (!cnpj.trim()) return { valid: false, message: "O CNPJ é obrigatório." };
  if (!regex.test(cnpj)) return { valid: false, message: "Formato inválido. Use: 00.000.000/0000-00." };
  return { valid: true, message: "" };
}

export function validateCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpf.trim()) return { valid: false, message: "O CPF é obrigatório." };
  if (!regex.test(cpf)) return { valid: false, message: "Formato inválido. Use: 000.000.000-00." };
  return { valid: true, message: "" };
}

export function validateTelefone(telefone) {
  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!telefone.trim()) return { valid: false, message: "O telefone é obrigatório." };
  if (!regex.test(telefone)) return { valid: false, message: "Formato inválido. Use: (11) 99999-9999." };
  return { valid: true, message: "" };
}

export function validateEndereco(endereco) {
  if (!endereco.trim()) return { valid: false, message: "O endereço é obrigatório." };
  if (endereco.length < 5) return { valid: false, message: "Endereço muito curto." };
  return { valid: true, message: "" };
}

// Função genérica para identificar o tipo de campo
export function validateByType(input) {
  const type = input.getAttribute('data-validate');
  switch (type) {
    case 'email': return validateEmail(input.value);
    case 'password': return validatePassword(input.value);
    case 'name': return validateName(input.value);
    case 'cpf': return validateCPF(input.value);
    case 'cnpj': return validateCNPJ(input.value);
    case 'telefone': return validateTelefone(input.value);
    case 'endereco': return validateEndereco(input.value);
    default:
      return { valid: input.value.trim() !== '', message: "Campo obrigatório." };
  }
}
