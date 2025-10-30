document.addEventListener('DOMContentLoaded', () => {
	function ensureErrorEl(input) {
		let el = input.parentElement.querySelector('.error-message');
		if (!el) {
			el = document.createElement('div');
			el.className = 'error-message';
			input.parentElement.appendChild(el);
		}
		return el;
	}

	function setError(input, message) {
		const msgEl = ensureErrorEl(input);
		if (message) {
			input.classList.add('input-error');
			msgEl.textContent = message;
		} else {
			input.classList.remove('input-error');
			msgEl.textContent = '';
		}
	}

	function validateField(input) {
		const id = input.id;
		const value = input.value;
		switch (id) {
			case 'nome_empresa': return window.validateName(value);
			case 'cnpj': return window.validateCNPJ(value);
			case 'senha': return window.validatePassword(value);
			case 'cat_empresa': return window.validateEndereco(value);
			case 'porteEmpresa': return window.validateEndereco(value);
			case 'estado': return window.validateEndereco(value);
			case 'cidade': return window.validateEndereco(value);
			default: return { valid: !!value?.trim(), message: !!value?.trim() ? '' : 'Campo obrigatório.' };
		}
	}

	function handleSubmit(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const overlay = document.getElementById('loadingOverlay');
			if (overlay) overlay.style.display = 'flex';
			let hasError = false;
			const inputs = Array.from(form.querySelectorAll('input'));
			inputs.forEach((input) => {
				const required = input.hasAttribute('required');
				if (!required && !input.value.trim()) { setError(input, ''); return; }
				const { valid, message } = validateField(input);
				if (!valid) { hasError = true; setError(input, message); } else { setError(input, ''); }
			});
			if (!hasError) {
				form.submit();
			} else {
				if (overlay) overlay.style.display = 'none';
			}
		});
	}

	const loginForm = document.getElementById('loginForm');
	if (loginForm) handleSubmit(loginForm);

	const cadastroForm = document.getElementById('cadastroForm');
	if (cadastroForm) handleSubmit(cadastroForm);

    // Create minimal overlay if not present and desired by page owners
    if (!document.getElementById('loadingOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);display:none;align-items:center;justify-content:center;z-index:9999;';
        const box = document.createElement('div');
        box.className = 'loading-box';
        box.textContent = 'Enviando, aguarde…';
        box.style.cssText = 'background:#fff;padding:16px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-weight:600;';
        overlay.appendChild(box);
        document.body.appendChild(overlay);
    }
});