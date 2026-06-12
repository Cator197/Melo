window.MeloComponents = (() => {
  const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  const badgeClass = (status = '') => {
    const text = status.toLowerCase();
    if (text.includes('final') || text.includes('recebido') || text.includes('pago') || text.includes('entregue') || text.includes('aprovado')) return 'success';
    if (text.includes('aguard') || text.includes('aberto') || text.includes('vencendo')) return 'warning';
    if (text.includes('pendente') || text.includes('atras') || text.includes('vencido')) return 'danger';
    if (text.includes('terceir')) return 'purple';
    return 'primary';
  };
  const statusBadge = (status) => `<span class="badge ${badgeClass(status)}">${status}</span>`;
  const kpiCard = ({ label, value, note }) => `<article class="card kpi-card"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-note">${note || ''}</div></article>`;
  const emptyState = (title, text) => `<div class="empty-state"><div class="empty-icon">◌</div><strong>${title}</strong><span>${text}</span></div>`;
  const loading = (text = 'Carregando dados') => `<div class="loading"><span class="spinner"></span>${text}</div>`;
  const pagination = () => `<nav class="pagination" aria-label="Paginação"><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn">›</button></nav>`;
  const table = (headers, rows) => `<div class="table-wrap"><table class="table"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  function toast(message = 'Ação realizada com sucesso.') {
    const container = document.querySelector('[data-toast-container]');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = `✓ ${message}`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function bindComponents() {
    document.querySelectorAll('[data-toast-demo]').forEach((button) => button.addEventListener('click', () => toast('Registro salvo no protótipo.')));
    document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.modalOpen)?.classList.add('is-open')));
    document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => button.closest('.modal-backdrop')?.classList.remove('is-open')));
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.classList.remove('is-open'); }));
    document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
      const tabs = tab.closest('.tabs');
      tabs?.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
    }));
    document.querySelector('[data-user-button]')?.addEventListener('click', () => document.querySelector('[data-user-dropdown]')?.classList.toggle('is-open'));
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.user-menu')) document.querySelector('[data-user-dropdown]')?.classList.remove('is-open');
    });
  }

  return { money, statusBadge, kpiCard, emptyState, loading, pagination, table, toast, bindComponents };
})();
