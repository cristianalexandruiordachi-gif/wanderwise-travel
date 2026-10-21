document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !message) return;
  const subject = encodeURIComponent(`WanderWise message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nReply to: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@wanderwise.example?subject=${subject}&body=${body}`;
  document.getElementById('contact-status').textContent = 'Your email app will open a draft. Review it and send when ready.';
});
