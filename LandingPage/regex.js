// ================= REGEX DE VALIDAÇÃO (FUNÇÕES PURAS) =================
const __regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const __regexSenha = /^(?=.[A-Z])(?=.[!#@$%&])(?=.\d)(?=.[a-z]).{6,15}$/;
const __regexCPF = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
const __regexEmail = /^(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-][a-z0-9])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))]$/i;
const __regexCNPJ = /^(\d{2}\.\d{3}\.\d{3}\/)\d{4}-\d{2}$/;

function __result(valid, message) {
	return { valid, message };
}

function validateEmail(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'E-mail é obrigatório.');
	if (!__regexEmail.test(v)) return __result(false, 'Informe um e-mail válido.');
	return __result(true, '');
}

function validatePassword(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'Senha é obrigatória.');
	if (!__regexSenha.test(v)) return __result(false, 'A senha deve ter 6–15 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 símbolo (!#@$%&).');
	return __result(true, '');
}

function validateName(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'Nome é obrigatório.');
	if (v.length < 3) return __result(false, 'Informe pelo menos 3 caracteres.');
	return __result(true, '');
}

function validateCNPJ(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'CNPJ é obrigatório.');
	if (!__regexCNPJ.test(v)) return __result(false, 'CNPJ inválido. Use o formato 00.000.000/0000-00.');
	return __result(true, '');
}

function validateCPF(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'CPF é obrigatório.');
	if (!__regexCPF.test(v)) return __result(false, 'CPF inválido.');
	return __result(true, '');
}

function validateTelefone(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'Telefone é obrigatório.');
	if (!__regexTelefone.test(v)) return __result(false, 'Telefone inválido. Use o formato (11) 99999-9999.');
	return __result(true, '');
}

function validateEndereco(value) {
	const v = String(value || '').trim();
	if (!v) return __result(false, 'Campo obrigatório.');
	if (v.length < 2) return __result(false, 'Informe pelo menos 2 caracteres.');
	return __result(true, '');
}

// Exposição global (sem listeners automáticos)
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.validateName = validateName;
window.validateCNPJ = validateCNPJ;
window.validateCPF = validateCPF;
window.validateTelefone = validateTelefone;
window.validateEndereco = validateEndereco;
window.__validationHelpers = { __result };