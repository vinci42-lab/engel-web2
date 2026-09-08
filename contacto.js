const form = document.querySelector('#contact-form');
const statusBox = document.querySelector('#form-status');
const startedAt = document.querySelector('#started-at');

startedAt.value = String(Date.now());

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.className = 'form-status';

  if (!form.checkValidity()) {
    form.reportValidity();
    statusBox.textContent = 'Revise los campos obligatorios antes de continuar.';
    statusBox.classList.add('error');
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());
  const mailServiceHost = 'engel-propuesta-digital.vsaffio62.chatgpt.site';
  const endpoint = location.hostname === mailServiceHost || location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/api/contacto'
    : `https://${mailServiceHost}/api/contacto`;

  button.disabled = true;
  button.textContent = 'Enviando…';
  statusBox.textContent = '';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.message || 'No fue posible enviar la solicitud.');

    form.reset();
    startedAt.value = String(Date.now());
    statusBox.textContent = 'Gracias. Su solicitud fue enviada correctamente. El equipo ENGEL se pondrá en contacto con usted.';
    statusBox.classList.add('success');
  } catch (error) {
    statusBox.textContent = error.message || 'No fue posible enviar la solicitud. También puede escribirnos a v.saffioti@zernikeal.com.';
    statusBox.classList.add('error');
  } finally {
    button.disabled = false;
    button.textContent = 'Enviar solicitud';
  }
});
