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
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = `✓ ${message}`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function bindComponents() {
    bindGlobalSearch();
    bindNotifications();
    document.querySelectorAll('[data-toast-demo]').forEach((button) => button.addEventListener('click', () => toast('Registro salvo no protótipo.')));
    document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.modalOpen)?.classList.add('is-open')));
    document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => button.closest('.modal-backdrop')?.classList.remove('is-open')));
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.classList.remove('is-open'); }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.is-open').forEach((backdrop) => backdrop.classList.remove('is-open'));
        document.querySelector('[data-user-dropdown]')?.classList.remove('is-open');
      }
    });
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


  function bindGlobalSearch() {
    const input = document.querySelector('.global-search input');
    if (!input || input.dataset.boundSearch) return;
    input.dataset.boundSearch = 'true';
    const panel = document.createElement('div');
    panel.className = 'global-results';
    panel.hidden = true;
    document.body.appendChild(panel);
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      if (term.length < 2) { panel.hidden = true; return; }
      const d = window.MeloMockData || {};
      const byId = (list, id) => (list || []).find((item) => item.id === id) || {};
      const groups = [
        ['Ordens de Serviço', (d.ordensServico || []).filter((os) => [os.numero, os.id, os.numeroOrcamento].join(' ').toLowerCase().includes(term)).map((os) => ({ title: os.numero, text: `${byId(d.veiculos, os.veiculoId).placa} · ${byId(d.clientes, os.clienteId).nome}`, href: `ordem-servico-detalhes.html?id=${os.id}` }))],
        ['Placas e veículos', (d.veiculos || []).filter((v) => [v.placa, v.marca, v.modelo].join(' ').toLowerCase().includes(term)).map((v) => ({ title: `${v.placa} · ${v.marca} ${v.modelo}`, text: byId(d.clientes, v.clienteId).nome, href: `veiculo-detalhes.html?id=${v.id}` }))],
        ['Clientes', (d.clientes || []).filter((cli) => [cli.nome, cli.telefone, cli.email].join(' ').toLowerCase().includes(term)).map((cli) => ({ title: cli.nome, text: `${cli.telefone} · ${cli.email}`, href: `cliente-detalhes.html?id=${cli.id}` }))],
        ['Orçamentos', (d.ordensServico || []).filter((os) => [os.numeroOrcamento, os.origem, os.idExterno].join(' ').toLowerCase().includes(term)).map((os) => ({ title: os.numeroOrcamento, text: `${os.origem} · ${os.numero}`, href: `ordem-servico-detalhes.html?id=${os.id}` }))],
        ['Complementos', (d.complementos || []).filter((x) => [x.id, x.osId, x.descricao, x.status].join(' ').toLowerCase().includes(term)).map((x) => ({ title: x.id, text: `${x.osId} · ${x.status}`, href: `complemento-detalhes.html?id=${x.id}` }))],
        ['Pedidos e fornecedores', [...(d.compras || []).filter((x) => [x.id, x.status].join(' ').toLowerCase().includes(term)).map((x) => ({ title: x.id, text: `${byId(d.fornecedores, x.fornecedorId).nome} · ${money(x.valor)}`, href: `compra-detalhes.html?id=${x.id}` })), ...(d.fornecedores || []).filter((x) => [x.nome, x.telefone, x.email].join(' ').toLowerCase().includes(term)).map((x) => ({ title: x.nome, text: x.telefone, href: `fornecedor-detalhes.html?id=${x.id}` }))]],
        ['Financeiro', [...(d.contasPagar || []), ...(d.contasReceber || [])].filter((x) => [x.id, x.descricao, x.status].join(' ').toLowerCase().includes(term)).map((x) => ({ title: x.id, text: `${x.descricao} · ${money(x.valor)}`, href: x.fornecedorId ? 'contas-pagar.html' : 'contas-receber.html' }))]
      ].filter(([, items]) => items.length);
      panel.innerHTML = groups.length ? groups.map(([name, items]) => `<div class="global-group"><h4>${name}</h4>${items.slice(0, 5).map((item) => `<a class="global-item" href="${item.href}"><strong>${item.title}</strong><small>${item.text}</small></a>`).join('')}</div>`).join('') : '<p class="empty-mini">Nenhum resultado encontrado.</p>';
      panel.hidden = false;
    });
    document.addEventListener('click', (event) => { if (!event.target.closest('.global-search') && !event.target.closest('.global-results')) panel.hidden = true; });
  }

  function bindNotifications() {
    const button = document.querySelector('[aria-label="Notificações"]');
    if (!button || button.dataset.boundNotifications) return;
    button.dataset.boundNotifications = 'true';
    button.removeAttribute('data-toast-demo');
    const panel = document.createElement('div');
    panel.className = 'notifications-panel';
    panel.hidden = true;
    document.body.appendChild(panel);
    const notifications = [
      ['Veículo atrasado', 'OS 1042 pode impactar entrega por peça pendente.', 'ordem-servico-detalhes.html?id=os-1042', true],
      ['Peça recebida', 'Paralama da OS 1042 recebido parcialmente.', 'compras.html', true],
      ['Peça atrasada', 'Kit tinta azul perolizado passou da previsão.', 'compras.html', false],
      ['Complemento aprovado', 'CMP-002 aprovado pela seguradora.', 'complementos.html', false],
      ['Complemento aguardando', 'CMP-001 aguarda aprovação.', 'complementos.html', true],
      ['Conta vencida', 'REC-006 está vencida desde 08/06.', 'contas-receber.html', true],
      ['Compra sem lançamento', 'COM-004 não possui conta a pagar.', 'compras.html', false],
      ['OS finalizada', 'OS-1007 aguarda fechamento financeiro.', 'rentabilidade.html', false],
      ['Importação concluída', 'Lote Cilia validado com avisos.', 'importacoes.html', false]
    ];
    const render = (onlyUnread = false) => {
      const list = notifications.filter((n) => !onlyUnread || n[3]);
      panel.innerHTML = `<h4>Notificações</h4><div class="notification-actions"><button class="btn btn-secondary btn-sm" data-only-unread>Não lidas</button><button class="btn btn-secondary btn-sm" data-mark-all>Ler todas</button></div>${list.map((n, idx) => `<a class="notification-item ${n[3] ? 'unread' : ''}" href="${n[2]}" data-notification="${idx}"><strong>${n[0]}</strong><small>${n[1]}</small></a>`).join('') || '<p class="empty-mini">Sem notificações não lidas.</p>'}`;
      panel.querySelector('[data-only-unread]')?.addEventListener('click', (event) => { event.preventDefault(); render(true); });
      panel.querySelector('[data-mark-all]')?.addEventListener('click', (event) => { event.preventDefault(); notifications.forEach((n) => { n[3] = false; }); toast('Todas as notificações foram marcadas como lidas.'); render(false); });
      panel.querySelectorAll('[data-notification]').forEach((item) => item.addEventListener('click', () => { notifications[Number(item.dataset.notification)][3] = false; }));
    };
    render(false);
    button.addEventListener('click', (event) => { event.stopPropagation(); panel.hidden = !panel.hidden; });
    document.addEventListener('click', (event) => { if (!event.target.closest('.notifications-panel') && !event.target.closest('[aria-label="Notificações"]')) panel.hidden = true; });
  }

  return { money, statusBadge, kpiCard, emptyState, loading, pagination, table, toast, bindComponents };
})();
