// validation.js
import { validateByType } from './regex.js';

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let hasError = false;

      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        const { valid, message } = validateByType(input);

        let errorMsg = input.parentElement.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.classList.add('error-message');
          input.parentElement.appendChild(errorMsg);
        }

        if (!valid) {
          hasError = true;
          input.classList.add('input-error');
          errorMsg.textContent = message;
        } else {
          input.classList.remove('input-error');
          errorMsg.textContent = '';
        }
      });

      if (!hasError) {
        form.submit();
      }
    });
  });
});
