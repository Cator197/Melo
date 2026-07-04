window.MeloOSModule = (() => {
  const today = '2026-06-11';
  const storageKey = 'melo-os-stage3-state';
  const d = () => window.MeloOSModule.state;
  const c = () => window.MeloComponents;
  const byId = (list, id) => (list || []).find((item) => item.id === id) || {};
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const parseDate = (date) => new Date(`${date || today}T00:00:00`);
  const dayMs = 86400000;
  const daysBetween = (start, end = today) => start ? Math.max(0, Math.floor((parseDate(end) - parseDate(start)) / dayMs)) : 0;
  const fmtDate = (date) => date ? parseDate(date).toLocaleDateString('pt-BR') : '—';
  const fmtDateTime = (value) => value ? new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';
  const money = (value) => c().money(value || 0);
  const slug = (text) => String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const escapeHTML = (text) => String(text || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const activeStatuses = ['Vistoria agendada', 'Em análise seguradora', 'Sem orçamento', 'Orçamento importado', 'Aguardando aprovação', 'Aprovado', 'Aguardando agendamento', 'Agendado', 'Na oficina', 'Em produção', 'Finalizado'];
  const closedStatuses = ['Entregue', 'Fechado', 'Cancelado'];

  const state = loadState();
  let modalKeyboardBound = false;

  function loadState() {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (error) { /* sessão indisponível: usa dados do mock */ }
    return clone(window.MeloMockData);
  }
  function saveState() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(d())); } catch (error) { /* sem persistência real */ }
  }
  function setContent(html) { document.querySelector('[data-page-content]').innerHTML = html; }
  function pageHero(title, desc, actions = '') {
    return `<nav class="breadcrumb"><a href="inicio.html">Início</a><span>›</span><span>Operação</span><span>›</span><strong>${title}</strong></nav><section class="hero os-hero"><div><h2>${title}</h2><p>${desc}</p></div><div class="hero-actions">${actions}</div></section>`;
  }
  const client = (os) => byId(d().clientes, os.clienteId);
  const vehicle = (os) => byId(d().veiculos, os.veiculoId);
  const stage = (os) => byId(d().etapasProducao, os.etapaId);
  const conditionName = (id) => byId(d().condicoesParalelas, id).nome || id;
  const isOverdue = (os) => os.previsao && os.previsao < today && !['Entregue', 'Fechado', 'Cancelado'].includes(os.status);
  const isUnderAnalysis = (os) => ['Em análise seguradora','Sem orçamento','Orçamento importado','Aguardando aprovação','Aprovado'].includes(os.status);
  const inShop = (os) => Boolean(os.entrada) && !closedStatuses.includes(os.status);
  const badge = (text) => c().statusBadge(text || '—');
  const condBadges = (os) => (os.condicoes || []).length ? os.condicoes.map((id) => `<span class="badge warning">${conditionName(id)}</span>`).join(' ') : '<span class="badge success">Sem condição ativa</span>';
  const payer = (os) => (d().financeiroOS?.[os.id]?.receitas?.[0]?.pagador || os.seguradora || '—');
  const actionDisabledReason = (os, action) => {
    if (os.status === 'Cancelado' && !['detalhes','reabrir'].includes(action)) return 'OS cancelada não pode receber esta ação sem reabertura.';
    if (['Entregue','Fechado'].includes(os.status) && ['mover','finalizar','entregar'].includes(action)) return 'OS entregue/fechada precisa ser reaberta antes.';
    if (action === 'finalizar' && !os.entrada) return 'OS sem entrada real não pode ser finalizada.';
    if (action === 'entregar' && os.status !== 'Finalizado') return 'Somente OS finalizada pode ser marcada como entregue.';
    return '';
  };
  const btnAction = (label, action, id, cls = 'btn btn-secondary') => {
    const os = d().ordensServico.find((item) => item.id === id);
    const reason = actionDisabledReason(os, action);
    return `<button class="${cls}" type="button" data-os-action="${action}" data-os-id="${id}" ${reason ? `disabled title="${reason}"` : ''}>${label}</button>`;
  };

  function renderList() {
    const actions = `<button class="btn btn-primary" data-open-modal="new-os">Nova OS</button><button class="btn btn-secondary" data-open-modal="import-os">Importar orçamento</button>`;
    setContent(`${pageHero('Ordens de Serviço', 'Fila operacional para priorizar atrasos, bloqueios, entregas e próximas ações por OS.', actions)}
      <section data-os-list-root class="os-shell"></section>${modalsMarkup()}`);
    initList();
  }

  function initList() {
    const root = document.querySelector('[data-os-list-root]');
    const pref = localStorage.getItem('melo-os-view') || (window.matchMedia('(max-width: 700px)').matches ? 'cards' : 'table');
    root.dataset.view = pref;
    root.dataset.indicator = '';
    root.dataset.sortKey = '';
    root.dataset.sortDir = 'asc';
    root.innerHTML = `${indicatorCards()}<div class="card os-results-card">${filtersMarkup()}<div class="os-list-toolbar"><div><strong data-result-count></strong><div class="active-filters" data-active-filters></div></div><div class="view-switch"><button class="btn btn-secondary" data-view="table">Tabela</button><button class="btn btn-secondary" data-view="cards">Cards</button></div></div><div data-os-results></div></div>`;
    populateFilterOptions(root);
    bindList(root);
    renderResults(root);
  }

  function indicatorCards() {
    const orders = d().ordensServico;
    const cards = [
      ['abertas', 'OS abertas', orders.filter((os) => activeStatuses.includes(os.status)).length, 'Não encerradas'],
      ['analise', 'OS em análise', orders.filter(isUnderAnalysis).length, 'Orçamento/aprovação'],
      ['aguardando-peca', 'Aguardando peça', orders.filter((os) => os.condicoes?.includes('CON-01')).length, 'Condição paralela'],
      ['atrasadas', 'Atrasadas', orders.filter(isOverdue).length, 'Previsão vencida'],
      ['finalizadas', 'Prontas para entrega', orders.filter((os) => os.status === 'Finalizado').length, 'Finalizadas']
    ];
    return `<section class="os-indicators-wrap"><div class="os-kpi-header"><strong>Prioridades da fila</strong><button class="btn btn-secondary btn-sm" type="button" data-toggle-indicators>Ocultar prioridades</button></div><div class="os-indicators compact-kpis" data-os-indicators>${cards.map(([key, label, value, note]) => `<button class="os-priority-chip os-indicator" data-indicator="${key}"><span>${label}</span><strong>${value}</strong><small>${note}</small></button>`).join('')}</div></section>`;
  }

  function filtersMarkup() {
    return `<section class="os-filter-card"><div class="section-header"><div><h3 class="section-title">Busca avançada</h3><p class="muted">Use quando precisar refinar por cliente, placa, etapa, status ou período.</p></div><button class="btn btn-secondary os-filter-toggle" data-toggle-filters>Mostrar filtros</button></div><form class="filters-card os-filters is-collapsed" data-os-filters>
      ${field('Pesquisa livre','q','search','OS, placa, cliente, orçamento ou sinistro')}${field('Número da OS','numero','text','1042')}${field('Placa','placa','text','ABC1D23')}${field('Cliente','cliente','text','Roberto')}
      ${field('Veículo','veiculo','text','Onix')}${selectField('Seguradora','seguradora')}${selectField('Origem','origem')}${selectField('Status da OS','status')}
      ${selectField('Etapa principal','etapa')}${selectField('Condição paralela','condicao')}${selectField('Responsável','responsavel')}${field('Entrega prevista','previsao','date')}
      <label class="form-field"><span>Atrasadas</span><select name="atrasadas"><option value="">Todas</option><option value="sim">Somente atrasadas</option><option value="nao">Não atrasadas</option></select></label>
      ${field('Entrada de','entradaDe','date')}${field('Entrada até','entradaAte','date')}${field('Entrega de','entregaDe','date')}${field('Entrega até','entregaAte','date')}
      <div class="filter-actions"><button class="btn btn-primary" type="submit">Aplicar filtros</button><button class="btn btn-secondary" type="button" data-clear-filters>Limpar filtros</button></div>
    </form></section>`;
  }
  const field = (label, name, type = 'text', placeholder = '', attrs = '') => `<label class="form-field"><span>${label}</span><input class="input" type="${type}" name="${name}" placeholder="${placeholder}" ${attrs}></label>`;
  const selectField = (label, name) => `<label class="form-field"><span>${label}</span><select class="select" name="${name}"><option value="">Todos</option></select></label>`;

  function populateFilterOptions(root) {
    fillSelect(root, 'seguradora', uniq(d().ordensServico.map((os) => os.seguradora)));
    fillSelect(root, 'origem', ['Cilia','Soma','Manual']);
    fillSelect(root, 'status', ['Vistoria agendada','Em análise seguradora','Sem orçamento','Orçamento importado','Aguardando aprovação','Aprovado','Aguardando agendamento','Agendado','Na oficina','Em produção','Finalizado','Entregue','Fechado','Cancelado']);
    fillSelect(root, 'etapa', d().etapasProducao.map((e) => e.nome));
    fillSelect(root, 'condicao', d().condicoesParalelas.map((e) => e.nome));
    fillSelect(root, 'responsavel', uniq(d().ordensServico.map((os) => os.responsavel)));
  }
  function fillSelect(root, name, values) { root.querySelector(`[name="${name}"]`).insertAdjacentHTML('beforeend', values.map((v) => `<option value="${v}">${v}</option>`).join('')); }
  const uniq = (items) => [...new Set(items.filter(Boolean))];

  function bindList(root) {
    root.querySelector('[data-os-filters]').addEventListener('submit', (event) => { event.preventDefault(); root.dataset.indicator = ''; renderResults(root); });
    root.querySelector('[data-clear-filters]').addEventListener('click', () => { root.querySelector('[data-os-filters]').reset(); root.dataset.indicator = ''; renderResults(root); });
    root.querySelector('[data-toggle-filters]').addEventListener('click', (event) => { const form = root.querySelector('[data-os-filters]'); form.classList.toggle('is-collapsed'); event.currentTarget.textContent = form.classList.contains('is-collapsed') ? 'Mostrar filtros' : 'Ocultar filtros'; });
    root.querySelector('[data-toggle-indicators]').addEventListener('click', (event) => {
      const indicators = root.querySelector('[data-os-indicators]');
      indicators.classList.toggle('is-collapsed');
      event.currentTarget.textContent = indicators.classList.contains('is-collapsed') ? 'Mostrar prioridades' : 'Ocultar prioridades';
    });
    root.querySelectorAll('[data-indicator]').forEach((btn) => btn.addEventListener('click', () => { root.dataset.indicator = root.dataset.indicator === btn.dataset.indicator ? '' : btn.dataset.indicator; root.querySelector('[data-os-filters]').reset(); renderResults(root); }));
    root.querySelectorAll('[data-view]').forEach((btn) => btn.addEventListener('click', () => { root.dataset.view = btn.dataset.view; localStorage.setItem('melo-os-view', btn.dataset.view); renderResults(root); }));
    root.addEventListener('click', (event) => {
      const sort = event.target.closest('[data-sort-key]');
      if (!sort) return;
      const key = sort.dataset.sortKey;
      root.dataset.sortDir = root.dataset.sortKey === key && root.dataset.sortDir === 'asc' ? 'desc' : 'asc';
      root.dataset.sortKey = key;
      renderResults(root);
    });
    root.addEventListener('click', handleActionClick);
    document.querySelector('[data-os-export]')?.addEventListener('click', () => c().toast('Exportação simulada gerada com sucesso.'));
    document.querySelectorAll('[data-open-modal]').forEach((btn) => btn.addEventListener('click', () => openGeneralModal(btn.dataset.openModal)));
    document.querySelector('[data-new-os-form]')?.addEventListener('submit', handleNewOS);
    document.querySelectorAll('[data-modal-close-custom]').forEach((btn) => btn.addEventListener('click', closeModals));
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModals(); }));
    if (!modalKeyboardBound) {
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModals(); });
      modalKeyboardBound = true;
    }
  }

  function filters(root) {
    return Object.fromEntries(new FormData(root.querySelector('[data-os-filters]')).entries());
  }
  function filteredOrders(root) {
    const f = filters(root);
    return d().ordensServico.filter((os) => {
      const v = vehicle(os), cl = client(os), et = stage(os), haystack = [os.numero, os.id, v.placa, cl.nome, v.marca, v.modelo, os.numeroOrcamento, os.sinistro].map(slug).join(' ');
      if (root.dataset.indicator === 'abertas' && !activeStatuses.includes(os.status)) return false;
      if (root.dataset.indicator === 'oficina' && !inShop(os)) return false;
      if (root.dataset.indicator === 'analise' && !isUnderAnalysis(os)) return false;
      if (root.dataset.indicator === 'aguardando-peca' && !os.condicoes?.includes('CON-01')) return false;
      if (root.dataset.indicator === 'atrasadas' && !isOverdue(os)) return false;
      if (root.dataset.indicator === 'finalizadas' && os.status !== 'Finalizado') return false;
      if (root.dataset.indicator === 'entregues-mes' && !(os.status === 'Entregue' && os.entregaReal?.startsWith('2026-06'))) return false;
      if (f.q && !haystack.includes(slug(f.q))) return false;
      if (f.numero && !slug(os.numero || os.id).includes(slug(f.numero))) return false;
      if (f.placa && !slug(v.placa).includes(slug(f.placa))) return false;
      if (f.cliente && !slug(cl.nome).includes(slug(f.cliente))) return false;
      if (f.veiculo && !slug(`${v.marca} ${v.modelo}`).includes(slug(f.veiculo))) return false;
      if (f.seguradora && os.seguradora !== f.seguradora) return false;
      if (f.origem && os.origem !== f.origem) return false;
      if (f.status && os.status !== f.status) return false;
      if (f.etapa && et.nome !== f.etapa) return false;
      if (f.condicao && !(os.condicoes || []).some((id) => conditionName(id) === f.condicao)) return false;
      if (f.responsavel && os.responsavel !== f.responsavel) return false;
      if (f.previsao && os.previsao !== f.previsao) return false;
      if (f.atrasadas === 'sim' && !isOverdue(os)) return false;
      if (f.atrasadas === 'nao' && isOverdue(os)) return false;
      if (f.entradaDe && (!os.entrada || os.entrada < f.entradaDe)) return false;
      if (f.entradaAte && (!os.entrada || os.entrada > f.entradaAte)) return false;
      if (f.entregaDe && (!os.previsao || os.previsao < f.entregaDe)) return false;
      if (f.entregaAte && (!os.previsao || os.previsao > f.entregaAte)) return false;
      return true;
    });
  }

  function renderResults(root) {
    root.querySelectorAll('[data-indicator]').forEach((b) => b.classList.toggle('is-active', root.dataset.indicator === b.dataset.indicator));
    root.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('active', root.dataset.view === b.dataset.view));
    const list = sortedOrders(root, filteredOrders(root));
    root.querySelector('[data-result-count]').textContent = `${list.length} resultado(s) de ${d().ordensServico.length} OS`;
    renderActiveFilters(root);
    root.querySelector('[data-os-results]').innerHTML = root.dataset.view === 'cards' ? cardsView(list) : tableView(list);
  }
  function renderActiveFilters(root) {
    const f = filters(root);
    const tags = [];
    if (root.dataset.indicator) tags.push(`<button data-remove-indicator>Indicador: ${root.dataset.indicator} ×</button>`);
    Object.entries(f).filter(([, v]) => v).forEach(([k, v]) => tags.push(`<button data-remove-filter="${k}">${k}: ${v} ×</button>`));
    const el = root.querySelector('[data-active-filters]');
    el.innerHTML = tags.length ? tags.join('') : '<span>Nenhum filtro ativo.</span>';
    el.querySelectorAll('[data-remove-filter]').forEach((btn) => btn.addEventListener('click', () => { root.querySelector(`[name="${btn.dataset.removeFilter}"]`).value = ''; renderResults(root); }));
    el.querySelector('[data-remove-indicator]')?.addEventListener('click', () => { root.dataset.indicator = ''; renderResults(root); });
  }
  function sortedOrders(root, items) {
    const key = root.dataset.sortKey;
    if (!key) return items;
    const dir = root.dataset.sortDir === 'desc' ? -1 : 1;
    return [...items].sort((a, b) => compareSortValue(sortValue(a, key), sortValue(b, key)) * dir);
  }
  function sortValue(os, key) {
    const v = vehicle(os), cl = client(os);
    const map = {
      os: os.numero || os.id,
      orcamento: budgetId(os),
      placa: v.placa,
      veiculo: `${v.marca || ''} ${v.modelo || ''}`,
      cliente: cl.nome,
      pagador: payer(os),
      etapa: stage(os).nome,
      condicoes: (os.condicoes || []).map(conditionName).join(', '),
      entrada: os.entrada || '',
      previsao: os.previsao || '',
      dias: daysBetween(os.entrada),
      status: os.status
    };
    return map[key] ?? '';
  }
  function compareSortValue(a, b) {
    if (typeof a === 'number' || typeof b === 'number') return Number(a || 0) - Number(b || 0);
    return String(a || '').localeCompare(String(b || ''), 'pt-BR', { numeric: true, sensitivity: 'base' });
  }
  function sortHeader(root, key, label) {
    const active = root.dataset.sortKey === key;
    const dir = active ? root.dataset.sortDir : '';
    const suffix = active ? (dir === 'desc' ? ' ↓' : ' ↑') : '';
    return `<button class="table-sort-btn ${active ? 'is-active' : ''}" type="button" data-sort-key="${key}" aria-label="Ordenar por ${label}${dir === 'desc' ? ' decrescente' : ' crescente'}">${label}${suffix}</button>`;
  }
  function tableView(items) {
    const root = document.querySelector('[data-os-list-root]');
    const headers = [
      ['os','OS'],
      ['orcamento','ID orçamento'],
      ['placa','Placa'],
      ['veiculo','Veículo'],
      ['cliente','Cliente'],
      ['pagador','Pagador principal'],
      ['etapa','Etapa principal'],
      ['condicoes','Condições paralelas'],
      ['entrada','Entrada'],
      ['previsao','Previsão'],
      ['dias','Dias oficina'],
      ['status','Status']
    ];
    const rows = items.map((os) => {
      const v = vehicle(os), cl = client(os);
      return [linkOS(os), budgetId(os), `<strong>${v.placa}</strong>`, `${v.marca || ''} ${v.modelo}`, cl.nome, payer(os), `<span class="badge primary">${stage(os).nome}</span>`, condBadges(os), fmtDate(os.entrada), fmtDate(os.previsao), `${daysBetween(os.entrada)} dias`, badge(os.status)];
    });
    return `<div class="table-wrap"><table class="table os-sortable-table"><thead><tr>${headers.map(([key,label]) => `<th>${sortHeader(root, key, label)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function cardsView(items) {
    return `<div class="os-card-grid">${items.map((os) => { const v = vehicle(os), cl = client(os), next = nextAction(os); return `<a class="card os-card ${isOverdue(os) ? 'risk-danger' : (os.condicoes || []).length ? 'risk-warning' : ''}" href="ordem-servico-detalhes.html?id=${os.id}"><div class="os-card-top"><div><span class="os-number">${os.numero || os.id}</span><strong class="plate">${v.placa || 'Sem placa'}</strong></div>${badge(os.status)}</div><p>${v.marca || ''} ${v.modelo} · ${cl.nome}</p><div class="os-next-action"><span>Próxima ação</span><strong>${next.label}</strong><small>${next.reason}</small></div><div class="os-card-lines"><span>Etapa</span><b>${stage(os).nome}</b><span>Responsável</span><b>${os.responsavel || 'Sem responsável'}</b><span>Previsão</span><b>${fmtDate(os.previsao)} ${isOverdue(os) ? '<span class="badge danger">Atrasada</span>' : '<span class="badge success">No prazo</span>'}</b></div></a>`; }).join('')}</div>`;
  }
  const linkOS = (os) => `<a class="link-strong" href="ordem-servico-detalhes.html?id=${os.id}">${os.numero || os.id}</a>`;
  const budgetId = (os) => [os.numeroOrcamento, os.idExterno].filter(Boolean).join(' / ') || 'Sem orçamento';
  function nextAction(os) {
    const checks = osChecklist(os);
    if (isOverdue(os)) return { action: 'previsao', label: 'Revisar previsão', reason: `Entrega prevista para ${fmtDate(os.previsao)} já venceu.` };
    if (checks.pecasPendentes) return { action: 'servicos', label: 'Cobrar peças', reason: `${checks.pecasPendentes} item(ns) ainda não recebido(s).` };
    if (checks.compPendente) return { action: 'complementos', label: 'Tratar complemento', reason: `${checks.compPendente} complemento(s) aguardam retorno.` };
    if (checks.checkinPendente) return { action: 'checkin', label: 'Completar check-in', reason: 'Fotos ou observação de entrada pendentes.' };
    if (os.status === 'Finalizado') return { action: 'entregas', label: 'Preparar entrega', reason: 'Checklist, cliente e financeiro antes da liberação.' };
    return { action: 'producao', label: 'Acompanhar etapa', reason: `${stage(os).nome || 'Etapa atual'} com responsável ${os.responsavel || 'não definido'}.` };
  }
  function quickActions(os) { return `<div class="action-cluster"><a class="btn btn-secondary" href="ordem-servico-detalhes.html?id=${os.id}">Detalhes</a>${btnAction('Editar','editar',os.id)}${btnAction('Mover','mover',os.id)}${btnAction('Condição','condicao',os.id)}${btnAction('Obs.','observacao',os.id)}${btnAction('Foto','foto',os.id)}${btnAction('Previsão','previsao',os.id)}${btnAction('Finalizar','finalizar',os.id)}${btnAction('Entregar','entregar',os.id)}</div>`; }

  function handleActionClick(event) {
    const btn = event.target.closest('[data-os-action]');
    if (!btn) return;
    openActionModal(btn.dataset.osAction, btn.dataset.osId);
  }

  function openGeneralModal(type) {
    const modal = document.querySelector('[data-general-modal]');
    const active = document.activeElement;
    if (active?.id) modal.dataset.lastFocus = `#${active.id}`;
    if (type === 'new-os') modal.querySelector('[data-general-body]').innerHTML = newOSForm();
    if (type === 'import-os') modal.querySelector('[data-general-body]').innerHTML = `<h3 id="generalModalTitle">Importar orçamento</h3><p>Simulação de importação do Cilia ou Soma. No sistema real, esta ação buscará orçamentos aprovados, validará itens e criará a OS vinculada a um único veículo.</p><div class="grid grid-2"><button class="btn btn-primary" data-toast-import>Cilia</button><button class="btn btn-secondary" data-toast-import>Soma</button></div>`;
    modal.classList.add('is-open');
    const form = modal.querySelector('[data-new-os-form]');
    if (form) bindNewOSForm(form);
    modal.querySelectorAll('[data-toast-import]').forEach((b) => b.addEventListener('click', () => c().toast('Importação simulada validada.')));
    modal.querySelectorAll('[data-modal-close-custom]').forEach((btn) => btn.addEventListener('click', closeModals));
    (form?.querySelector('[data-client-search]') || modal.querySelector('input, select, textarea, button'))?.focus();
  }
  function closeModals() { document.querySelectorAll('.modal-backdrop').forEach((m) => { m.classList.remove('is-open'); m.dataset.lastFocus?.length && document.querySelector(m.dataset.lastFocus)?.focus?.(); delete m.dataset.lastFocus; }); }

  function newOSForm() {
    const seguros = ['Particular', 'Lojista', ...uniq(d().ordensServico.map((os) => os.seguradora).filter((item) => item && !['Cliente particular','Não informada'].includes(item)))];
    return `<h3 id="generalModalTitle">Nova OS manual</h3><p class="muted">Abra uma OS rápida sem importação. Cadastros, orçamento e valores podem ser completados depois.</p><form data-new-os-form class="os-form-grid quick-os-form" aria-labelledby="generalModalTitle" novalidate>
      <fieldset class="quick-os-primary"><legend>1. Cliente</legend>
        <input type="hidden" name="clienteId">
        <label class="form-field wide"><span>Buscar cliente por nome, celular ou CPF</span><input class="input" type="search" name="clienteBusca" data-client-search placeholder="Ex.: Roberto, (11) 99999-9999 ou 123.456.789-00" autocomplete="off" required></label>
        <div class="client-match-list" data-client-results aria-live="polite"><span>Digite para buscar. Se não encontrar, preencha o cadastro rápido abaixo.</span></div>
        ${field('Nome para cadastro rápido','clienteNome','text','Obrigatório se for novo cliente')}
        ${field('Celular','telefone','tel','(11) 99999-9999')}
        ${field('CPF ou documento','documento','text','Opcional')}
      </fieldset>
      <fieldset class="quick-os-primary"><legend>2. Veículo nesta OS</legend>
        ${field('Placa','placa','text','ABC1D23')}
        ${field('Marca','marca','text','Chevrolet')}
        ${field('Modelo','modelo','text','Onix', 'required')}
        ${field('Ano','ano','number','2021')}
        ${field('Cor','cor','text','Prata')}
        <p class="form-hint wide">Estes dados identificam o veículo nesta OS. Não é necessário abrir um cadastro de veículo agora.</p>
      </fieldset>
      <fieldset><legend>3. Status e atendimento</legend>
        <label class="form-field"><span>Status inicial</span><select class="select" name="statusInicial"><option>Vistoria agendada</option><option>Em análise seguradora</option></select></label>
        <label class="form-field"><span>Seguro / particular / lojista</span><select class="select" name="atendimentoOrigem">${seguros.map((item) => `<option>${item}</option>`).join('')}</select></label>
      </fieldset>
      <details class="quick-os-optional">
        <summary>Dados opcionais de orçamento e valores</summary>
        <fieldset><legend>Orçamento</legend>
          ${field('Número do orçamento','numeroOrcamento','text','Opcional')}
          ${field('ID externo Cilia/Soma','idExterno','text','Opcional')}
          ${field('Número do sinistro','sinistro','text','Opcional')}
          ${field('Data de aprovação','aprovacao','date')}
        </fieldset>
        <fieldset><legend>Valores</legend>
          ${field('Mão de obra','maoObra','number')}
          ${field('Peças','pecas','number')}
          ${field('Materiais','materiais','number')}
          ${field('Serviços terceirizados','terceiros','number')}
          ${field('Desconto','desconto','number')}
          ${field('Valor aprovado','valor','number')}
        </fieldset>
      </details>
      <div class="modal-actions"><button class="btn btn-secondary" type="button" data-modal-close-custom>Cancelar</button><button class="btn btn-primary" type="submit">Criar OS</button></div></form>`;
  }

  function bindNewOSForm(form) {
    form.addEventListener('submit', handleNewOS);
    form.querySelector('[data-client-search]')?.addEventListener('input', () => updateClientMatches(form));
    form.addEventListener('click', (event) => {
      const pick = event.target.closest('[data-client-pick]');
      if (!pick) return;
      const cli = byId(d().clientes, pick.dataset.clientPick);
      form.querySelector('[name="clienteId"]').value = cli.id;
      form.querySelector('[name="clienteBusca"]').value = clientSearchLabel(cli);
      form.querySelector('[name="clienteNome"]').value = cli.nome || '';
      form.querySelector('[name="telefone"]').value = cli.telefone || '';
      form.querySelector('[name="documento"]').value = cli.documento || '';
      updateClientMatches(form);
    });
    updateClientMatches(form);
  }

  function clientSearchLabel(cli) {
    return [cli.nome, cli.telefone, cli.documento].filter(Boolean).join(' · ');
  }

  function clientMatches(query) {
    const q = slug(query);
    if (!q) return [];
    return d().clientes.filter((cli) => slug([cli.nome, cli.telefone, cli.documento, cli.email].join(' ')).includes(q)).slice(0, 5);
  }

  function updateClientMatches(form) {
    const box = form.querySelector('[data-client-results]');
    if (!box) return;
    const hiddenId = form.querySelector('[name="clienteId"]');
    const search = form.querySelector('[name="clienteBusca"]');
    const matches = clientMatches(search.value);
    const selected = matches.find((cli) => cli.id === hiddenId.value);
    if (!selected) hiddenId.value = '';
    if (!search.value.trim()) {
      box.innerHTML = '<span>Digite para buscar. Se não encontrar, preencha o cadastro rápido abaixo.</span>';
      return;
    }
    box.innerHTML = matches.length
      ? matches.map((cli) => `<button type="button" class="${cli.id === hiddenId.value ? 'is-selected' : ''}" data-client-pick="${cli.id}"><strong>${cli.nome}</strong><span>${cli.telefone || 'Sem celular'}${cli.documento ? ` · ${cli.documento}` : ''}</span></button>`).join('')
      : '<span>Nenhum cliente encontrado. Complete nome e celular para criar rápido.</span>';
  }

  function handleNewOS(event) {
    event.preventDefault();
    const form = event.currentTarget, values = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    form.querySelectorAll('[data-field-error]').forEach((el) => el.remove());
    const existingClient = values.clienteId ? byId(d().clientes, values.clienteId) : null;
    const newClient = !existingClient?.id;
    const missing = ['modelo'].filter((k) => !values[k]);
    if (newClient && !values.clienteNome && !values.clienteBusca) missing.push('clienteBusca');
    if (newClient && !values.telefone && !values.documento) missing.push('telefone');
    if (missing.length) {
      showNewOSErrors(form, missing);
      c().toast('Revise os campos destacados para criar a OS.');
      return;
    }
    let clienteId = values.clienteId;
    if (newClient) {
      clienteId = `CLI-N${Date.now()}`;
      d().clientes.unshift({ id: clienteId, nome: values.clienteNome || values.clienteBusca, telefone: values.telefone || 'Não informado', email: values.email || '', documento: values.documento || '', status: 'Ativo' });
    }
    const veiculoId = `VEI-OS-${Date.now()}`;
    d().veiculos.unshift({ id: veiculoId, clienteId, placa: values.placa || 'Sem placa', marca: values.marca || '', modelo: values.modelo, ano: values.ano || '', cor: values.cor || '', chassi: '', status: 'Digitado na OS' });
    const next = 1100 + d().ordensServico.filter((os) => os.id.startsWith('OS-N')).length;
    const atendimento = values.atendimentoOrigem || 'Particular';
    const tipoAtendimento = atendimento === 'Particular' ? 'Particular' : atendimento === 'Lojista' ? 'Lojista' : 'Seguro';
    const seguradora = tipoAtendimento === 'Seguro' ? atendimento : atendimento === 'Lojista' ? 'Lojista' : 'Cliente particular';
    const os = { id: `OS-N${next}`, numero: `OS ${next}`, clienteId, veiculoId, origem: 'Manual', numeroOrcamento: values.numeroOrcamento, idExterno: values.idExterno, sinistro: values.sinistro || 'Sem sinistro', seguradora, tipoAtendimento, responsavel: 'Marina Lopes', etapaId: 'ETP-01', etapaEntrada: '', condicoes: [], condicoesDetalhes: [], status: values.statusInicial || 'Vistoria agendada', entradaPrevista: '', entrada: '', aprovacao: values.aprovacao, previsaoInicial: '', previsao: '', entregaReal: '', valor: Number(values.valor || 0), valores: { maoObra: Number(values.maoObra || 0), pecas: Number(values.pecas || 0), materiais: Number(values.materiais || 0), terceiros: Number(values.terceiros || 0), desconto: Number(values.desconto || 0), aprovado: Number(values.valor || 0) }, observacoesAbertura: '', conclusao: 0 };
    d().ordensServico.unshift(os);
    addHistory(os.id, 'criação', `${os.numero} aberta manualmente${newClient ? ' com cliente criado rapidamente' : ' para cliente existente'}.`, '', os.status);
    saveState(); closeModals(); c().toast(`${os.numero} criada. Complete orçamento e valores depois, se necessário.`); initList();
  }

  function showNewOSErrors(form, fields) {
    const labels = { clienteBusca: 'Informe ou selecione um cliente.', telefone: 'Para cliente novo, informe celular ou CPF/documento.', modelo: 'Informe ao menos o modelo do veículo.' };
    fields.forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (!input) return;
      input.classList.add('is-invalid');
      input.insertAdjacentHTML('afterend', `<small class="field-error" data-field-error>${labels[name] || 'Campo obrigatório.'}</small>`);
    });
    form.querySelector('.is-invalid')?.focus();
  }

  function openActionModal(action, id) {
    const os = d().ordensServico.find((item) => item.id === id); if (!os) return;
    const modal = document.querySelector('[data-action-modal]');
    const active = document.activeElement;
    if (active?.id) modal.dataset.lastFocus = `#${active.id}`;
    modal.querySelector('[data-action-title]').textContent = actionLabel(action, os);
    modal.querySelector('[data-action-body]').innerHTML = actionForm(action, os);
    modal.classList.add('is-open');
    modal.querySelector('button, input, select, textarea')?.focus();
    modal.querySelector('[data-action-form]')?.addEventListener('submit', (event) => handleActionSubmit(event, action, os.id));
    modal.querySelectorAll('[data-modal-close-custom]').forEach((btn) => btn.addEventListener('click', closeModals));
  }
  const actionLabel = (action, os) => ({ editar: `Editar ${os.numero}`, mover: `Movimentar ${os.numero}`, condicao: 'Adicionar condição paralela', observacao: 'Adicionar observação', foto: 'Adicionar foto', previsao: 'Alterar previsão', finalizar: 'Finalizar produção', entregar: 'Marcar entrega', complemento: 'Novo complemento', documento: 'Adicionar documento', cancelar: 'Cancelar OS', reabrir: 'Reabrir OS', fechar: 'Fechar OS', 'add-servico': 'Incluir serviço', 'add-peca': 'Incluir peça' }[action] || 'Ação simulada');

  function actionForm(action, os) {
    if (action === 'mover') return `<form data-action-form class="os-form-grid"><label class="form-field"><span>Etapa atual</span><input value="${stage(os).nome}" disabled></label><label class="form-field"><span>Nova etapa</span><select name="novaEtapa">${d().etapasProducao.map((e) => `<option value="${e.id}">${e.nome}</option>`).join('')}</select></label>${field('Data e hora','dataHora','datetime-local')}<label class="form-field"><span>Motivo</span><input name="motivo" placeholder="Obrigatório em retorno"></label><label class="checkline"><input type="checkbox" name="retrabalho"> Retorno/retrabalho</label><label class="form-field"><span>Observação</span><textarea name="observacao"></textarea></label><label class="checkline"><input type="checkbox" name="alterarPrevisao"> Alterar previsão de entrega</label>${field('Nova previsão','novaPrevisao','date')}<button class="btn btn-primary" type="submit">Confirmar movimentação</button></form>`;

    if (action === 'add-servico') return `<form data-action-form class="os-form-grid">${field('Descrição','descricao','text')}<label class="form-field"><span>Setor</span><select name="setor"><option>Funilaria</option><option>Preparação</option><option>Pintura</option><option>Montagem</option><option>Polimento</option><option>Terceiros</option></select></label>${field('Quantidade','quantidade','number')}${field('Valor unitário','valorUnitario','number')}<label class="form-field"><span>Origem</span><input name="origem" value="Orçamento Cilia"></label><label class="form-field"><span>Status</span><select name="status"><option>Autorizado</option><option>Previsto</option><option>Em execução</option><option>Concluído</option><option>Cancelado</option></select></label><button class="btn btn-primary" type="submit">Adicionar serviço</button></form>`;
    if (action === 'add-peca') return `<form data-action-form class="os-form-grid">${field('Descrição','descricao','text')}${field('Código','codigo','text','SEM-CODIGO')}${field('Quantidade','quantidade','number')}${field('Previsão','previsao','date')}${field('Custo estimado','custoEstimado','number')}<label class="form-field"><span>Troca</span><select name="troca"><option>Sim</option><option>Não</option></select></label><label class="form-field"><span>Fornecimento</span><select name="fornecimento"><option>Oficina</option><option>Cliente</option><option>Seguradora</option></select></label><label class="form-field"><span>Fornecedor inicial</span><input name="fornecedor" value="Oficina"></label><label class="form-field"><span>Situação</span><select name="situacao"><option>A comprar</option><option>Pedido</option><option>Parcialmente recebido</option><option>Recebido</option><option>Devolvido</option><option>Cancelado</option></select></label><button class="btn btn-primary" type="submit">Adicionar peça</button></form>`;
    if (action === 'condicao') return `<form data-action-form class="os-form-grid"><label class="form-field"><span>Condição</span><select name="condicaoId">${d().condicoesParalelas.map((co) => `<option value="${co.id}">${co.nome}</option>`).join('')}</select></label>${field('Início','inicio','date')}<label class="form-field"><span>Responsável</span><input name="responsavel" value="${os.responsavel}"></label><label class="form-field"><span>Observação</span><textarea name="observacao"></textarea></label><button class="btn btn-primary" type="submit">Adicionar condição</button></form>`;
    if (action === 'observacao') return `<form data-action-form class="os-form-grid"><label class="form-field"><span>Categoria</span><select name="categoria"><option>geral</option><option>produção</option><option>compras</option><option>financeiro</option><option>cliente</option><option>seguradora</option><option>alerta interno</option></select></label><label class="form-field"><span>Texto</span><textarea name="texto" required></textarea></label><label class="checkline"><input type="checkbox" name="fixada"> Fixar observação</label><button class="btn btn-primary" type="submit">Adicionar observação</button></form>`;
    if (action === 'foto') return `<form data-action-form class="os-form-grid"><label class="form-field"><span>Categoria</span><select name="categoria"><option>entrada</option><option>desmontagem</option><option>funilaria</option><option>preparação</option><option>pintura</option><option>montagem</option><option>polimento</option><option>entrega</option><option>outros</option></select></label>${field('Legenda','legenda','text')}<button class="btn btn-primary" type="submit">Adicionar foto simulada</button></form>`;
    if (action === 'previsao') return `<form data-action-form class="os-form-grid">${field('Nova previsão','novaPrevisao','date')}<label class="form-field"><span>Motivo</span><textarea name="motivo"></textarea></label><button class="btn btn-primary" type="submit">Salvar previsão</button></form>`;
    if (action === 'complemento') return `<form data-action-form class="os-form-grid">${field('Motivo','motivo','text')}<label class="form-field"><span>Descrição</span><textarea name="descricao"></textarea></label>${field('Serviços','servicos','text')}${field('Peças','pecas','text')}${field('Valor solicitado','valorSolicitado','number')}${field('Documento','documento','text','laudo.pdf')}${field('Impacto na previsão','impacto','text','+1 dia')}${field('Nova previsão sugerida','novaPrevisao','date')}<button class="btn btn-primary" type="submit">Criar complemento</button></form>`;
    if (action === 'documento') return `<form data-action-form class="os-form-grid">${field('Nome do documento','nome','text','documento.pdf')}<label class="form-field"><span>Categoria</span><select name="categoria"><option>orçamento</option><option>autorização</option><option>complemento</option><option>nota fiscal</option><option>recibo</option><option>laudo</option><option>comprovante</option><option>outros</option></select></label><button class="btn btn-primary" type="submit">Anexar simulado</button></form>`;
    if (['finalizar','entregar','cancelar','reabrir','fechar'].includes(action)) return criticalActionForm(action, os);
    return `<form data-action-form class="os-form-grid"><label class="form-field"><span>Observação da edição</span><textarea name="observacao"></textarea></label><button class="btn btn-primary" type="submit">Salvar edição simulada</button></form>`;
  }

  function criticalActionForm(action, os) {
    const checks = osChecklist(os);
    const warnings = [];
    if (checks.pecasPendentes) warnings.push(`${checks.pecasPendentes} peça(s) ainda pendente(s).`);
    if (checks.compPendente) warnings.push(`${checks.compPendente} complemento(s) em aberto.`);
    if (checks.checkinPendente) warnings.push('Check-in incompleto.');
    if (isOverdue(os)) warnings.push(`Previsão vencida em ${fmtDate(os.previsao)}.`);
    const impact = {
      finalizar: { title: 'Finalizar produção', text: `A OS será marcada como Finalizado e a etapa será movida para Finalizado em ${fmtDate(today)}.`, button: 'Marcar como finalizada' },
      entregar: { title: 'Registrar entrega', text: `A entrega real será registrada em ${fmtDate(today)} e a OS ficará como Entregue.`, button: `Registrar entrega em ${fmtDate(today)}` },
      cancelar: { title: 'Cancelar OS', text: 'A OS ficará cancelada e não deve receber movimentação até ser reaberta.', button: 'Cancelar OS' },
      reabrir: { title: 'Reabrir OS', text: 'A OS volta para Em produção para ajustes operacionais.', button: 'Reabrir OS' },
      fechar: { title: 'Fechar OS', text: 'A OS ficará fechada operacionalmente para conferência final e histórico.', button: 'Fechar OS' }
    }[action];
    return `<form data-action-form class="critical-action-form">
      <div class="critical-action-summary">
        <span class="eyebrow">${impact.title}</span>
        <p>${impact.text}</p>
      </div>
      <dl>
        <dt>OS</dt><dd>${os.numero || os.id}</dd>
        <dt>Status atual</dt><dd>${os.status}</dd>
        <dt>Etapa</dt><dd>${stage(os).nome || 'Sem etapa'}</dd>
        <dt>Previsão</dt><dd>${fmtDate(os.previsao)}</dd>
      </dl>
      <div class="critical-after">
        <strong>Depois da confirmação</strong>
        <span>Status, histórico e responsáveis visíveis nesta OS serão atualizados na sessão.</span>
      </div>
      ${warnings.length ? `<div class="alert-inline critical-warning"><strong>Atenção antes de confirmar</strong><ul>${warnings.map((item) => `<li>${item}</li>`).join('')}</ul></div>` : '<p class="success-note">Nenhum bloqueio crítico visível nesta simulação.</p>'}
      <label class="form-field wide"><span>Justificativa da decisão</span><textarea name="observacao" required placeholder="Registre o motivo ou contexto da decisão."></textarea></label>
      <div class="modal-actions"><button class="btn btn-secondary" type="button" data-modal-close-custom>Voltar</button><button class="btn ${action === 'cancelar' ? 'btn-danger' : 'btn-primary'}" type="submit">${impact.button}</button></div>
    </form>`;
  }

  function handleActionSubmit(event, action, id) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const os = d().ordensServico.find((item) => item.id === id);
    const oldStatus = os.status;
    const oldStage = stage(os).nome || 'Sem etapa';
    const oldForecast = os.previsao;
    if (action === 'mover') moveOS(os, values);
    else if (action === 'condicao') addCondition(os, values);
    else if (action === 'add-servico') addService(os, values);
    else if (action === 'add-peca') addPart(os, values);
    else if (action === 'observacao') addObservation(os, values);
    else if (action === 'foto') addPhoto(os, values);
    else if (action === 'previsao') { const old = os.previsao; os.previsao = values.novaPrevisao || os.previsao; addHistory(id, 'previsão', 'Previsão de entrega alterada.', old, os.previsao); }
    else if (action === 'complemento') addComplement(os, values);
    else if (action === 'documento') addDocument(os, values);
    else if (action === 'finalizar') { os.status = 'Finalizado'; os.etapaId = 'ETP-07'; os.etapaEntrada = today; addHistory(id, 'finalização', 'Produção marcada como finalizada.', 'Em produção', 'Finalizado'); }
    else if (action === 'entregar') { os.status = 'Entregue'; os.entregaReal = today; addHistory(id, 'entrega', 'OS marcada como entregue.', 'Finalizado', 'Entregue'); }
    else if (action === 'fechar') { os.status = 'Fechado'; addHistory(id, 'fechamento', 'OS fechada operacionalmente.', '', 'Fechado'); }
    else if (action === 'cancelar') { os.status = 'Cancelado'; addHistory(id, 'cancelamento', 'OS cancelada no protótipo.', '', 'Cancelado'); }
    else if (action === 'reabrir') { os.status = 'Em produção'; addHistory(id, 'reabertura', 'OS reaberta para ajustes.', '', 'Em produção'); }
    else addHistory(id, 'alterações cadastrais', 'Edição cadastral simulada.', '', values.observacao || 'Dados revisados');
    const changed = [
      oldStatus !== os.status ? `status: ${oldStatus} → ${os.status}` : '',
      oldStage !== (stage(os).nome || 'Sem etapa') ? `etapa: ${oldStage} → ${stage(os).nome}` : '',
      oldForecast !== os.previsao ? `previsão: ${fmtDate(oldForecast)} → ${fmtDate(os.previsao)}` : ''
    ].filter(Boolean).join(' · ');
    saveState(); closeModals(); c().toast(changed ? `OS atualizada (${changed}).` : 'Ação registrada no histórico da OS.'); rerenderCurrent();
  }
  function moveOS(os, values) {
    const current = stage(os), next = byId(d().etapasProducao, values.novaEtapa);
    const isReturn = next.ordem < current.ordem;
    if (isReturn && (!values.motivo || !values.retrabalho)) { c().toast('Retorno para etapa anterior exige motivo e indicação de retrabalho.'); return; }
    const currentOpen = d().movimentacoesOS.find((m) => m.osId === os.id && !m.saida); if (currentOpen) currentOpen.saida = values.dataHora || `${today}T12:00:00`;
    d().movimentacoesOS.push({ id: `MOV-${Date.now()}`, osId: os.id, entrada: values.dataHora || `${today}T12:00:00`, saida: '', etapaId: next.id, responsavel: os.responsavel, motivo: values.motivo || 'Movimentação de etapa', observacao: values.observacao || '', retrabalho: Boolean(values.retrabalho || isReturn) });
    os.etapaId = next.id; os.etapaEntrada = (values.dataHora || today).slice(0,10); os.status = next.id === 'ETP-07' ? 'Finalizado' : 'Em produção';
    if (values.alterarPrevisao && values.novaPrevisao) os.previsao = values.novaPrevisao;
    addHistory(os.id, isReturn ? 'retorno' : 'movimentação', `Movimentação para ${next.nome}${isReturn ? ' com retorno/retrabalho' : ''}.`, current.nome, next.nome);
  }
  function addService(os, values) { const qty = Number(values.quantidade || 1); const unit = Number(values.valorUnitario || 0); d().servicosOS.unshift({ id: `SRV-${Date.now()}`, osId: os.id, descricao: values.descricao || 'Serviço adicionado', setor: values.setor || 'Funilaria', quantidade: qty, valorUnitario: unit, origem: values.origem || 'Inclusão manual', status: values.status || 'Previsto', complementoId: '' }); os.valor = Number(os.valor || 0) + (qty * unit); os.valores = os.valores || {}; os.valores.maoObra = Number(os.valores.maoObra || 0) + (qty * unit); addHistory(os.id, 'alterações financeiras', 'Serviço incluído e totais atualizados na sessão.', '', money(qty * unit)); }
  function addPart(os, values) {
    const qty = Number(values.quantidade || 1), cost = Number(values.custoEstimado || 0), troca = values.troca || 'Sim', fornecimento = values.fornecimento || 'Oficina';
    const shouldCreatePurchase = troca === 'Sim' && fornecimento === 'Oficina';
    const purchaseId = shouldCreatePurchase ? `COM-CILIA-${Date.now()}` : '—';
    const part = { id: `PEC-${Date.now()}`, osId: os.id, descricao: values.descricao || 'Peça adicionada', codigo: values.codigo || 'SEM-CODIGO', quantidade: qty, fornecedor: values.fornecedor || 'Oficina', situacao: values.situacao || 'A comprar', compraId: purchaseId, previsao: values.previsao || '', custoEstimado: cost, custoReal: 0, recebido: `0/${qty}`, troca, fornecimento };
    d().pecasOS.unshift(part);
    if (shouldCreatePurchase) addPurchaseFromPart(os, part, cost);
    os.valores = os.valores || {}; os.valores.pecas = Number(os.valores.pecas || 0) + cost;
    addHistory(os.id, 'alterações financeiras', shouldCreatePurchase ? 'Peça incluída e compra gerada por troca/oficina.' : 'Peça incluída sem geração de compra automática.', '', money(cost));
  }
  function addPurchaseFromPart(os, part, cost) {
    const qty = Number(part.quantidade || 1), unit = qty ? cost / qty : cost;
    d().compras.unshift({ id: part.compraId, pedido: part.compraId.replace('COM-', 'PED-'), fornecedorId: null, dataCompra: today, responsavel: os.responsavel || 'Caio Dicieri', previsaoEntrega: part.previsao || '', formaPagamento: 'a definir', condicaoPagamento: 'a definir', observacoes: `Gerada pela peça ${part.id} (${part.troca}/${part.fornecimento}).`, necessitaContaPagar: true, contaPagarId: null, status: 'em aberto', statusRecebimento: 'não comprado', statusFinanceiro: 'lançamento pendente', item: part.descricao, quantidade: qty, quantidadeRecebida: 0, osId: os.id, osIds: [os.id], valor: cost, origem: 'Orçamento Cilia', troca: part.troca, fornecimento: part.fornecimento, itens: [{ id: `pci-${Date.now()}`, descricao: part.descricao, codigo: part.codigo, quantidade: qty, unidade: 'un', quantidadeRecebida: 0, quantidadePendente: qty, custoUnitario: unit, desconto: 0, freteProporcional: 0, custoTotal: cost, previsao: part.previsao || '', status: 'a comprar', observacao: 'Gerado automaticamente por peça com troca = Sim e fornecimento = Oficina.', complementoId: '', fornecedorId: null, compraId: part.compraId, pedido: part.compraId.replace('COM-', 'PED-'), troca: part.troca, fornecimento: part.fornecimento, alocacoes: [{ osId: os.id, quantidade: qty, valor: cost, percentual: 100 }] }], recebimentos: [], divergencias: [], devolucoes: [], documentos: [], historico: [] });
  }
  function addCondition(os, values) { if (!os.condicoes.includes(values.condicaoId)) os.condicoes.push(values.condicaoId); os.condicoesDetalhes.push({ id: `CP-${Date.now()}`, tipoId: values.condicaoId, inicio: values.inicio || today, fim: '', status: 'Ativa', observacao: values.observacao || '', responsavel: values.responsavel || os.responsavel }); addHistory(os.id, 'condições paralelas', `Condição ${conditionName(values.condicaoId)} adicionada.`, '', 'Ativa'); }
  function closeCondition(os, condId) { const cp = os.condicoesDetalhes.find((item) => item.id === condId); if (cp) { cp.status = 'Encerrada'; cp.fim = today; os.condicoes = os.condicoes.filter((id) => id !== cp.tipoId || os.condicoesDetalhes.some((other) => other.id !== cp.id && other.tipoId === id && other.status === 'Ativa')); addHistory(os.id, 'condições paralelas', `Condição ${conditionName(cp.tipoId)} encerrada.`, 'Ativa', 'Encerrada'); saveState(); c().toast('Condição encerrada na sessão.'); rerenderCurrent(); } }
  function addObservation(os, values) { d().observacoesOS.unshift({ id: `OBS-${Date.now()}`, osId: os.id, autor: 'Caio Dicieri', dataHora: new Date().toISOString(), categoria: values.categoria || 'geral', texto: values.texto || 'Observação simulada.', fixada: Boolean(values.fixada) }); addHistory(os.id, 'observações', 'Observação adicionada.', '', values.categoria || 'geral'); }
  function addPhoto(os, values) { d().fotosOS.unshift({ id: `FOT-${Date.now()}`, osId: os.id, categoria: values.categoria || 'outros', legenda: values.legenda || 'Foto adicionada na sessão', data: today, usuario: 'Caio Dicieri', cor: '#ede9fe' }); addHistory(os.id, 'fotos', 'Foto simulada adicionada.', '', values.categoria || 'outros'); }
  function addDocument(os, values) { d().documentosOS.unshift({ id: `DOC-${Date.now()}`, osId: os.id, nome: values.nome || 'documento-simulado.pdf', categoria: values.categoria || 'outros', data: today, usuario: 'Caio Dicieri', tamanho: '120 KB' }); addHistory(os.id, 'documentos', 'Documento simulado anexado.', '', values.nome || 'documento-simulado.pdf'); }
  function addComplement(os, values) { const comp = { id: `CMP-${Date.now()}`, osId: os.id, numero: `COMP-${(os.numero || os.id).replace(/\D/g,'')}-${d().complementos.filter((x) => x.osId === os.id).length + 1}`, motivo: values.motivo || 'Complemento operacional', data: today, descricao: values.descricao || '', status: 'Rascunho', valorSolicitado: Number(values.valorSolicitado || 0), valorAprovado: 0, impactoPrevisao: values.impacto || 'A avaliar', novaPrevisao: values.novaPrevisao || os.previsao, itens: [values.servicos, values.pecas].filter(Boolean), documentos: [values.documento].filter(Boolean), observacoes: 'Criado durante a sessão.' }; d().complementos.unshift(comp); if (!os.condicoes.includes('CON-03')) os.condicoes.push('CON-03'); addHistory(os.id, 'complemento', `Complemento ${comp.numero} criado.`, '', comp.status); }
  function addProductionTag(os, text) { const label = escapeHTML(text).trim(); if (!label) return; os.etiquetasProducao = os.etiquetasProducao || []; os.etiquetasProducao.unshift({ id: `TAG-${Date.now()}`, texto: label, autor: 'Caio Dicieri', data: today }); addHistory(os.id, 'etiquetas', 'Etiqueta de produção adicionada.', '', label); saveState(); c().toast('Etiqueta adicionada à OS.'); renderDetail(); }
  function removeProductionTag(os, tagId) { const tag = (os.etiquetasProducao || []).find((item) => item.id === tagId); os.etiquetasProducao = (os.etiquetasProducao || []).filter((item) => item.id !== tagId); addHistory(os.id, 'etiquetas', 'Etiqueta de produção removida.', tag?.texto || '', ''); saveState(); c().toast('Etiqueta removida.'); renderDetail(); }
  function addHistory(osId, tipo, descricao, antes = '', depois = '') { d().historicoOS.unshift({ id: `HIS-${Date.now()}-${Math.random().toString(36).slice(2,5)}`, osId, dataHora: new Date().toISOString(), usuario: 'Caio Dicieri', tipo, descricao, antes, depois }); }
  function rerenderCurrent() { window.MeloNavigation.currentFile() === 'ordens-servico.html' ? renderList() : renderDetail(); }

  function renderDetail() {
    const id = new URLSearchParams(window.location.search).get('id');
    const os = d().ordensServico.find((item) => item.id === id || item.numero === id);
    if (!os) return setContent(`${pageHero('OS não encontrada', 'O ID informado não existe nos dados fictícios.', '<a class="btn btn-secondary" href="ordens-servico.html">Voltar à lista</a>')}<section class="card empty-state"><div class="empty-icon">?</div><strong>Registro não encontrado</strong><span>ID buscado: ${id || 'não informado'}</span></section>`);
    setContent(`${detailHeader(os)}<div class="os-detail-layout"><aside class="card os-summary" data-summary>${summaryV2(os)}</aside><section class="os-tabs-area">${tabsV2()}<div data-tab-content></div></section></div>${modalsMarkup()}`);
    bindDetail(os);
    bindDetailExtensions(os);
    renderTab(os, sessionStorage.getItem(`melo-os-tab-${os.id}`) || 'visao');
  }
  function osChecklist(os) { const checkinPendente = isCheckinPending(os) ? 1 : 0; const pecasPendentes = d().pecasOS.filter((p)=>p.osId===os.id&&!slug(p.situacao).includes('recebido')).length; const compPendente=d().complementos.filter((co)=>co.osId===os.id&&!['Concluído','Cancelado','Recusado','Aprovado'].includes(co.status)).length; const tintaPendente=(os.condicoes||[]).includes('CON-02')?1:0; return { checkinPendente, pecasPendentes, compPendente, tintaPendente }; }
  function checkinPhotos(os) { return d().fotosOS.filter((f)=>f.osId===os.id && ['entrada','checkin','check-in'].includes(slug(f.categoria))); }
  function checkinObservations(os) { return d().observacoesOS.filter((o)=>o.osId===os.id && ['checkin','check-in','entrada'].includes(slug(o.categoria))); }
  function isCheckinPending(os) { return !checkinPhotos(os).length || !checkinObservations(os).length; }
  function deliveryStatusClass(os) { if (isOverdue(os)) return 'status-danger'; if (os.previsao && daysBetween(today, os.previsao) <= 2 && !closedStatuses.includes(os.status)) return 'status-warning'; return 'status-ok'; }
  function osInfoTile(label, value, cls = '') { return `<div class="os-info-tile ${cls}"><span>${label}</span><strong>${value}</strong></div>`; }
  function insurerLogo(os, tipo) {
    if (tipo !== 'Seguro') return '<span class="insurance-na">Particular</span>';
    if (slug(os.seguradora).includes('porto seguro')) {
      return '<img class="insurance-logo-img" src="../assets/img/porto-seguro-logo.jpg" alt="Porto Seguro">';
    }
    const initials = (os.seguradora || 'NA').split(/\s+/).map((word)=>word[0]).join('').slice(0,2).toUpperCase();
    return `<span class="insurance-logo" title="${os.seguradora || 'Seguradora'}">${initials || 'NA'}</span>`;
  }
  function detailHeader(os) {
    const v = vehicle(os);
    const tipo = os.tipoAtendimento?.toLowerCase().includes('segur') ? 'Seguro' : os.tipoAtendimento?.toLowerCase().includes('loj') ? 'Lojista' : 'Particular';
    const checks = osChecklist(os);
    const headerOk = !checks.checkinPendente && !checks.pecasPendentes && !checks.compPendente && !checks.tintaPendente;
    const pendingCount = Number(Boolean(checks.checkinPendente)) + Number(checks.pecasPendentes || 0) + Number(checks.compPendente || 0) + Number(Boolean(checks.tintaPendente));
    const stateTitle = headerOk ? 'Tudo ok' : `${pendingCount} pendência(s)`;
    const stateText = headerOk ? 'Sem ações pendentes para esta OS.' : 'Existem ações pendentes antes da entrega.';
    const vehicleName = `${v.marca || ''} ${v.modelo || ''}`.trim() || 'Veículo não informado';
    const vehicleMeta = [v.ano, v.cor].filter(Boolean).join(' · ');
    const vehicleTitle = [vehicleName, vehicleMeta].filter(Boolean).join(' · ');
    const plateTitle = v.placa || 'Placa não informada';
    const osTitle = os.numero || os.id || 'OS não informada';
    return `<section class="card os-detail-head strong-os-header ${headerOk ? 'header-ok' : 'header-warning'}">
      <div class="os-header-main">
        <div class="os-header-title">
          <span class="os-header-eyebrow">Veículo</span>
          <h2>${vehicleTitle}</h2>
          <p>${plateTitle}</p>
        </div>
        <div class="os-header-number">
          <span>OS</span>
          <strong>${osTitle}</strong>
        </div>
        <div class="os-header-state ${headerOk ? 'state-ok' : 'state-warning'}">
          <strong>${stateTitle}</strong>
          <span>${stateText}</span>
        </div>
      </div>
      <div class="os-header-metrics">${[
        osInfoTile('Status', badge(os.status), 'summary-status'),
        osInfoTile('Tipo', tipo, 'summary-extra'),
        osInfoTile('Seguro', insurerLogo(os, tipo), 'insurance-tile summary-extra'),
        osInfoTile('Etapa atual', `<span class="badge primary">${stage(os).nome}</span>`, 'summary-stage'),
        osInfoTile('Previsão de entrega', fmtDate(os.previsao), `summary-forecast ${deliveryStatusClass(os)}`),
        osInfoTile('Valor total', money(os.valor), 'summary-value')
      ].join('')}</div>
    </section>`;
  }

  function summary(os) { const v = vehicle(os), cl = client(os); return `<details open><summary>Resumo da OS</summary><h4>Identificação</h4><dl><dt>Cliente</dt><dd>${cl.nome}</dd><dt>Telefone</dt><dd>${cl.telefone}</dd><dt>Veículo</dt><dd>${v.marca || ''} ${v.modelo}</dd><dt>Placa</dt><dd>${v.placa}</dd><dt>Cor / ano</dt><dd>${v.cor} · ${v.ano}</dd><dt>Seguradora</dt><dd>${os.seguradora}</dd><dt>Sinistro</dt><dd>${os.sinistro}</dd><dt>Orçamento</dt><dd>${os.numeroOrcamento}</dd><dt>Origem</dt><dd>${os.origem}</dd></dl><h4>Datas</h4><dl><dt>Aprovação</dt><dd>${fmtDate(os.aprovacao)}</dd><dt>Entrada prevista</dt><dd>${fmtDate(os.entradaPrevista)}</dd><dt>Entrada real</dt><dd>${fmtDate(os.entrada)}</dd><dt>Previsão inicial</dt><dd>${fmtDate(os.previsaoInicial)}</dd><dt>Previsão atual</dt><dd>${fmtDate(os.previsao)}</dd><dt>Entrega real</dt><dd>${fmtDate(os.entregaReal)}</dd></dl><h4>Situação</h4><dl><dt>Status</dt><dd>${os.status}</dd><dt>Etapa</dt><dd>${stage(os).nome}</dd><dt>Condições</dt><dd>${condBadges(os)}</dd><dt>Dias na etapa</dt><dd>${daysBetween(os.etapaEntrada)} dias</dd><dt>Dias na oficina</dt><dd>${daysBetween(os.entrada)} dias</dd></dl></details>`; }
  function tabs() { const items = [['visao','Visão geral'],['checkin','Check-in'],['producao','Produção'],['servicos','Serviços e peças'],['complementos','Complementos'],['compras','Compras'],['financeiro','Financeiro'],['documentos','Documentos e fotos'],['entregas','Entregas'],['historico','Histórico']]; return `<div class="tabs os-tabs">${items.map(([id,label]) => `<button class="tab" data-tab="${id}" type="button">${label}</button>`).join('')}</div>`; }
  function bindDetail(os) { document.querySelector('.content').addEventListener('input', (event) => { if (event.target.matches('[data-history-search], [data-history-type]')) filterHistory(os); }); document.querySelector('.content').addEventListener('change', (event) => { if (event.target.matches('[data-history-type]')) filterHistory(os); }); document.querySelector('.content').addEventListener('keydown', (event) => { if (event.target.matches('[data-open-checkin]') && ['Enter',' '].includes(event.key)) { event.preventDefault(); renderTab(os, 'checkin'); } }); document.querySelector('.content').addEventListener('click', (event) => { const a = event.target.closest('[data-os-action]'); if (a) openActionModal(a.dataset.osAction, a.dataset.osId); const tab = event.target.closest('[data-tab]'); if (tab) renderTab(os, tab.dataset.tab); const close = event.target.closest('[data-close-condition]'); if (close) closeCondition(os, close.dataset.closeCondition); const pin = event.target.closest('[data-pin-obs]'); if (pin) togglePin(pin.dataset.pinObs, os); const photo = event.target.closest('[data-photo-view]'); if (photo) c().toast('Visualização de foto simulada aberta.'); const doc = event.target.closest('[data-doc-action]'); if (doc) c().toast(`${doc.dataset.docAction} simulado.`); const compra = event.target.closest('[data-compra-modal]'); if (compra) c().toast('Detalhe simplificado da compra aberto em modal simulado.'); const checkinShortcut = event.target.closest('[data-open-checkin]'); if (checkinShortcut) renderTab(os, 'checkin'); const checkinAction = event.target.closest('[data-checkin-action]'); if (checkinAction) c().toast(`${checkinAction.dataset.checkinAction} do check-in simulado.`); }); document.querySelector('[data-action-modal]')?.addEventListener('click', (e)=>{ if(e.target.matches('[data-modal-close-custom]')) closeModals(); }); document.querySelector('[data-more-toggle]')?.addEventListener('click', () => document.querySelector('.more-menu')?.classList.toggle('is-open')); }
  function statusKpi(label, pending, note, attrs = '') { return `<article class="card kpi-card os-status-kpi ${pending ? 'status-warning' : 'status-ok'}" ${attrs}><div class="kpi-label">${label}</div><div class="kpi-value">${pending ? 'Pendente' : 'OK'}</div><div class="kpi-note">${note}</div></article>`; }
  function tabOverview(os) { const obs = d().observacoesOS.filter((o)=>o.osId===os.id).slice(0,4); const checks = osChecklist(os); return `<section class="section"><div class="grid grid-4 compact-kpis">${statusKpi('Check-in', checks.checkinPendente, checks.checkinPendente ? 'fotos ou observação pendentes' : 'fotos e observação registradas', 'role="button" tabindex="0" data-open-checkin')}${statusKpi('Peças', checks.pecasPendentes, checks.pecasPendentes ? `${checks.pecasPendentes} item(ns) não recebido(s)` : 'sem peças pendentes')}${statusKpi('Complemento', checks.compPendente, checks.compPendente ? `${checks.compPendente} em aberto` : 'sem bloqueio')}${statusKpi('Tinta', checks.tintaPendente, checks.tintaPendente ? 'acompanhar autorização/insumo' : 'controle liberado')}${c().kpiCard({label:'Dias na etapa atual', value:daysBetween(os.etapaEntrada), note:stage(os).nome})}</div><article class="card observations-section"><h3>Observações</h3><div class="new-observation"><textarea class="textarea" placeholder="Digite uma nova observação"></textarea><button class="btn btn-secondary" type="button" data-toast-demo>Adicionar</button></div>${obs.map(obsCard).join('') || c().emptyState('Sem observações','Nenhuma observação cadastrada.')}</article></section>`; }

  function backToOverview() { return '<div class="detail-subnav"><button class="btn btn-secondary btn-sm" type="button" data-open-tab="visao">Voltar ao resumo</button></div>'; }
  function tabCheckin(os) { const photos = checkinPhotos(os), observations = checkinObservations(os); return `<section class="section">${backToOverview()}<div class="section-header"><h3 class="section-title">Check-in da OS</h3><button class="btn btn-secondary" type="button" data-checkin-action="Impressão">Imprimir check-in</button></div><article class="card"><div class="section-header"><h3>Fotos do check-in</h3><div class="action-cluster"><button class="btn btn-secondary" type="button" data-checkin-action="Upload de fotos">Upload</button><button class="btn btn-primary" type="button" data-checkin-action="Captura de foto">Tirar fotos</button></div></div><div class="photo-grid">${photos.map((f)=>`<button class="photo-card" data-photo-view="${f.id}" style="--photo-bg:${f.cor}"><span>${f.categoria}</span><b>${f.legenda}</b><small>${fmtDate(f.data)} · ${f.usuario}</small></button>`).join('') || c().emptyState('Sem fotos de check-in','Use Upload ou Tirar fotos para registrar as imagens de entrada.')}</div></article><article class="card observations-section"><h3>Observação do check-in</h3><div class="new-observation"><textarea class="textarea" placeholder="Digite uma observação do check-in"></textarea><button class="btn btn-secondary" type="button" data-checkin-action="Observação adicionada">Adicionar</button></div>${observations.map(obsCard).join('') || c().emptyState('Sem observações de check-in','Nenhuma observação de entrada cadastrada.')}</article></section>`; }

  function tabProduction(os) { const movs = d().movimentacoesOS.filter((m)=>m.osId===os.id); return `<section class="section"><div class="section-header"><h3 class="section-title">Produção</h3><div class="action-cluster">${btnAction('Movimentar etapa','mover',os.id,'btn btn-primary')}${btnAction('Inserir foto da etapa','foto',os.id,'btn btn-secondary')}${btnAction('Tirar foto da etapa','foto',os.id,'btn btn-secondary')}</div></div><article class="card"><h3>Etapa principal atual</h3><div class="grid grid-4"><p><b>Nome</b><br>${stage(os).nome}</p><p><b>Entrada</b><br>${fmtDate(os.etapaEntrada)}</p><p><b>Dias</b><br>${daysBetween(os.etapaEntrada)}</p><p><b>Setor</b><br>${stage(os).setor}</p></div></article><article class="card"><h3>Linha das etapas</h3><div class="stage-line">${d().etapasProducao.map((e)=>`<span class="stage-pill ${e.id===os.etapaId?'current':e.ordem<stage(os).ordem?'done':'future'} ${movs.some(m=>m.etapaId===e.id&&m.retrabalho)?'rework':''}">${e.nome}</span>`).join('')}</div></article><article class="card"><h3>Histórico de movimentações</h3>${c().table(['Entrada','Saída','Etapa','Duração','Responsável','Motivo','Observação','Retrabalho'], movs.map((m)=>[fmtDateTime(m.entrada),fmtDateTime(m.saida),byId(d().etapasProducao,m.etapaId).nome,`${daysBetween((m.entrada||'').slice(0,10),(m.saida||`${today}T00:00:00`).slice(0,10))} dias`,m.responsavel,m.motivo,m.observacao,m.retrabalho?'<span class="badge danger">Sim</span>':'<span class="badge success">Não</span>']))}</article><article class="card"><h3>Condições paralelas</h3><div class="grid grid-2">${(os.condicoesDetalhes||[]).map(conditionCard).join('') || c().emptyState('Sem condições','Nenhum bloqueio ativo.')}</div></article></section>`; }
  function conditionCard(item) { return `<div class="parallel-card"><h4>${conditionName(item.tipoId)}</h4>${badge(item.status)}<p>${item.observacao || 'Sem observação.'}</p><small>Início ${fmtDate(item.inicio)} · Fim ${fmtDate(item.fim)} · ${item.responsavel}</small>${item.status==='Ativa'?`<button class="btn btn-secondary" data-close-condition="${item.id}">Encerrar</button>`:''}</div>`; }
  const partSupplier = (p) => p.fornecedor || byId(d().fornecedores, p.fornecedorId).nome || 'Oficina';
  const partCost = (p) => Number(p.custoEstimado ?? p.valorRateado ?? 0);
  const partRealCost = (p) => Number(p.custoReal ?? (Number(p.quantidadeRecebida || 0) > 0 ? p.valorRateado || 0 : 0));
  const partReceived = (p) => p.recebido || `${Number(p.quantidadeRecebida || 0)}/${Number(p.quantidade || 0)}`;
  const partTroca = (p) => p.troca || (p.compraId && p.compraId !== '—' ? 'Sim' : 'Não');
  const partFornecimento = (p) => p.fornecimento || (p.compraId && p.compraId !== '—' ? 'Oficina' : '—');
  const purchaseItemTroca = (co, it) => it.troca || co.troca || 'Sim';
  const purchaseItemFornecimento = (co, it) => it.fornecimento || co.fornecimento || 'Oficina';

  function tabServices(os) {
    const services = d().servicosOS.filter((s)=>s.osId===os.id);
    const parts = d().pecasOS.filter((p)=>p.osId===os.id);
    const purchaseable = parts.filter((p)=>partTroca(p)==='Sim' && partFornecimento(p)==='Oficina');
    return `<section class="section"><div class="section-header"><div><h3 class="section-title">Serviços e peças</h3><p class="muted">Formato Cilia: serviços entram em serviços da OS; peças com troca = Sim e fornecimento = Oficina alimentam Compras.</p></div><button class="btn btn-primary" data-os-action="add-servico" data-os-id="${os.id}">Incluir serviço</button><button class="btn btn-secondary" data-os-action="add-peca" data-os-id="${os.id}">Incluir peça</button></div><div class="grid grid-4 compact-kpis">${c().kpiCard({label:'Serviços',value:services.length,note:'linhas autorizadas'})}${c().kpiCard({label:'Total serviços',value:money(services.reduce((sum,s)=>sum+(Number(s.quantidade||0)*Number(s.valorUnitario||0)),0)),note:'valor aprovado'})}${c().kpiCard({label:'Peças',value:parts.length,note:'linhas controladas'})}${c().kpiCard({label:'Geram compras',value:purchaseable.length,note:'troca Sim / oficina'})}</div><article class="card"><h3>Serviços</h3>${c().table(['Descrição','Setor','Qtd.','Unitário','Total','Origem','Status','Complemento'], services.map((s)=>[s.descricao,s.setor,s.quantidade,money(s.valorUnitario),money(s.valorUnitario*s.quantidade),s.origem,badge(s.status),s.complementoId||'—']))}</article><article class="card"><h3>Peças</h3>${c().table(['Descrição','Código','Qtd.','Troca','Fornecimento','Fornecedor','Situação','Compra','Previsão','Custo estimado','Custo real','Recebido'], parts.map((p)=>[p.descricao,p.codigo || 'SEM-CODIGO',p.quantidade,badge(partTroca(p)),partFornecimento(p),partSupplier(p),badge(p.situacao),p.compraId || '—',fmtDate(p.previsao),money(partCost(p)),money(partRealCost(p)),partReceived(p)]))}</article></section>`;
  }
  function tabPurchases(os) {
    const rows = d().compras.flatMap((co)=>(co.itens||[]).flatMap((it)=>(it.alocacoes||[]).filter((al)=>al.osId===os.id).map((al)=>[co.pedido,byId(d().fornecedores,co.fornecedorId).nome||'A definir',it.descricao,it.codigo || 'SEM-CODIGO',al.quantidade,purchaseItemTroca(co,it),purchaseItemFornecimento(co,it),`${it.quantidadeRecebida||0}/${it.quantidade}`,Math.max(0,(al.quantidade||0)-Math.min(al.quantidade||0,it.quantidadeRecebida||0)),fmtDate(it.previsao||co.previsaoEntrega),badge(co.status),money(al.valor||0),money((it.quantidadeRecebida||0)>0 ? (al.valor||0) : 0),co.contaPagarId||'<span class="badge warning">Sem conta</span>',`<a class="btn btn-secondary" href="compra-detalhes.html?id=${co.id}">Abrir compra</a>`])));
    const eligibleParts = d().pecasOS.filter((p)=>p.osId===os.id && partTroca(p)==='Sim' && partFornecimento(p)==='Oficina');
    return `<section class="section"><article class="card"><div class="section-header"><div><h3>Compras geradas por peças da OS</h3><p>Compras devem nascer apenas de peças com troca = Sim e fornecimento = Oficina, mantendo vínculo com a peça por compraId.</p></div></div><div class="grid grid-4 compact-kpis">${c().kpiCard({label:'Peças elegíveis',value:eligibleParts.length,note:'troca/oficina'})}${c().kpiCard({label:'Compras vinculadas',value:rows.length,note:'itens rateados para a OS'})}${c().kpiCard({label:'Valor estimado',value:money(rows.reduce((sum,row)=>sum+(Number(String(row[11]).replace(/\D/g,''))||0)/100,0)),note:'linhas de compra'})}${c().kpiCard({label:'Sem conta',value:rows.filter((row)=>String(row[13]).includes('Sem conta')).length,note:'pendência financeira'})}</div>${rows.length?c().table(['Pedido','Fornecedor','Item','Código','Qtd.','Troca','Fornecimento','Recebido item','Pendência OS','Previsão','Status compra','Custo estimado','Custo real','Conta a pagar','Ação'], rows):c().emptyState('Sem compras vinculadas','Nenhuma peça elegível foi transformada em compra para esta OS.')}</article></section>`;
  }
  function tabComplements(os) { const comps = d().complementos.filter((co)=>co.osId===os.id); const feito=comps.length>0; const retornado=comps.some((co)=>['Aprovado','aprovado','aprovado parcialmente','Recusado','recusado','Concluído'].includes(co.status)); return `<section class="section"><article class="card"><h3>Controle simples do complemento</h3><div class="form-grid compact"><label class="check-field"><input type="checkbox" ${feito?'checked':''}> Complemento feito?</label><label class="check-field"><input type="checkbox" ${retornado?'checked':''}> Complemento retornado/respondido?</label><label class="form-field"><span>Observação do complemento</span><textarea> ${comps[0]?.observacoes || comps[0]?.descricao || 'Registrar aqui o retorno da seguradora/cliente.'}</textarea></label></div><p class="muted">Controle visual simples nesta etapa; sem fluxo complexo.</p></article><div class="grid grid-2">${comps.map((co)=>`<article class="card"><h3>${co.numero}</h3>${badge(co.status)}<p><b>Motivo:</b> ${co.motivo}</p><p>${co.descricao}</p><p><b>Solicitado:</b> ${money(co.valorSolicitado)} · <b>Aprovado:</b> ${money(co.valorAprovado)}</p><p><b>Impacto:</b> ${co.impactoPrevisao} · ${fmtDate(co.novaPrevisao)}</p></article>`).join('') || c().emptyState('Sem complemento','Nenhum complemento registrado para esta OS.')}</div></section>`; }

  function tabFinance(os) { if (window.MeloFinanceModule?.renderOSFinance) return window.MeloFinanceModule.renderOSFinance(os); const fin = d().financeiroOS?.[os.id] || { receitas: [{ pagador: os.seguradora, descricao:'Valor aprovado', bruto:os.valor, taxa:0, liquido:os.valor, vencimento:os.previsao, status:'Previsto' }], custos: { pecas: os.valores?.pecas||0, materiais: os.valores?.materiais||0, terceiros: os.valores?.terceiros||0, taxas:0, outros:0 } }; const receita = fin.receitas.reduce((s,r)=>s+r.bruto,0), liquida=fin.receitas.reduce((s,r)=>s+r.liquido,0), custos=Object.values(fin.custos).reduce((s,v)=>s+v,0); return `<section class="section"><div class="grid grid-4">${c().kpiCard({label:'Receita aprovada',value:money(receita),note:'bruta'})}${c().kpiCard({label:'Receita líquida prevista',value:money(liquida),note:'após taxas'})}${c().kpiCard({label:'Custos estimados',value:money(custos),note:'provisórios'})}${c().kpiCard({label:'Lucro estimado',value:money(liquida-custos),note:'margem prevista'})}</div></section>`; }
  function tabDeliveries(os) { const checks=['produção finalizada','peças conferidas','fotos finais','documentos anexados','financeiro conferido','cliente avisado','veículo liberado']; return `<section class="section"><article class="card"><h3>Entregas da OS</h3><div class="grid grid-4"><p><b>Previsão</b><br>${fmtDate(os.previsao)}</p><p><b>Entrega real</b><br>${fmtDate(os.entregaReal)}</p><p><b>Status</b><br>${badge(os.entregaReal?'Entregue':'A preparar')}</p><p><b>Responsável</b><br>${os.responsavel || '—'}</p></div><div class="form-grid compact">${checks.map((x,i)=>`<label class="check-field"><input type="checkbox" ${i<3||os.entregaReal?'checked':''}> ${x}</label>`).join('')}<label class="form-field"><span>Observações da entrega</span><textarea>${os.entregaReal?'Entrega registrada nos dados fictícios.':'Conferir pendências antes da liberação.'}</textarea></label></div></article></section>`; }
  function tabDocs(os) { const docs=d().documentosOS.filter((doc)=>doc.osId===os.id), photos=d().fotosOS.filter((f)=>f.osId===os.id); return `<section class="section"><div class="section-header"><h3 class="section-title">Documentos e fotos</h3>${btnAction('Adicionar documento','documento',os.id,'btn btn-secondary')}${btnAction('Adicionar foto','foto',os.id,'btn btn-primary')}</div><article class="card"><h3>Documentos</h3>${c().table(['Nome','Categoria','Data','Usuário','Tamanho','Ações'], docs.map((doc)=>[doc.nome,badge(doc.categoria),fmtDate(doc.data),doc.usuario,doc.tamanho,`<button class="btn btn-secondary" data-doc-action="visualizar">Visualizar</button><button class="btn btn-secondary" data-doc-action="baixar">Baixar</button><button class="btn btn-secondary" data-doc-action="renomear">Renomear</button><button class="btn btn-danger" data-doc-action="excluir">Excluir</button>`]))}</article><article class="card"><h3>Fotos</h3><div class="photo-grid">${photos.map((f)=>`<button class="photo-card" data-photo-view="${f.id}" style="--photo-bg:${f.cor}"><span>${f.categoria}</span><b>${f.legenda}</b><small>${fmtDate(f.data)} · ${f.usuario}</small></button>`).join('')}</div></article></section>`; }
  function tabHistory(os) { const types=uniq(d().historicoOS.filter((h)=>h.osId===os.id).map((h)=>h.tipo)); return `<section class="section"><article class="card"><div class="section-header"><h3 class="section-title">Histórico completo</h3><div class="history-filters"><input data-history-search placeholder="Buscar no histórico"><select data-history-type><option value="">Todos os tipos</option>${types.map((t)=>`<option>${t}</option>`).join('')}</select></div></div><div data-history-list>${timeline(d().historicoOS.filter((h)=>h.osId===os.id))}</div></article></section>`; }
  function filterHistory(os) { const q = slug(document.querySelector('[data-history-search]')?.value || ''); const t = document.querySelector('[data-history-type]')?.value || ''; const items = d().historicoOS.filter((h)=>h.osId===os.id).filter((h)=> (!t || h.tipo===t) && (!q || slug(`${h.tipo} ${h.descricao} ${h.usuario} ${h.antes} ${h.depois}`).includes(q))); const el = document.querySelector('[data-history-list]'); if (el) el.innerHTML = timeline(items); }
  function timeline(items, compact=false) { return `<div class="timeline-list">${items.map((h)=>`<article class="timeline-item"><div><strong>${h.tipo}</strong><span>${fmtDateTime(h.dataHora)} · ${h.usuario}</span></div><p>${h.descricao}</p>${compact?'':`<small>Antes: ${h.antes || '—'} · Depois: ${h.depois || '—'}</small>`}</article>`).join('')}</div>`; }
  function obsCard(o) { return `<div class="obs-card ${o.fixada?'pinned':''}"><span>${o.categoria} · ${fmtDateTime(o.dataHora)} · ${o.autor}</span><p>${o.texto}</p><button class="btn btn-secondary" data-pin-obs="${o.id}">${o.fixada?'Desafixar':'Fixar'}</button></div>`; }
  function togglePin(id, os) { const obs=d().observacoesOS.find((o)=>o.id===id); if(obs){obs.fixada=!obs.fixada; addHistory(os.id,'observações',`Observação ${obs.fixada?'fixada':'desafixada'}.`,'',obs.categoria); saveState(); c().toast('Observação atualizada.'); renderDetail();} }
  function modalsMarkup() { return `<div class="modal-backdrop" data-general-modal><div class="modal large" role="dialog" aria-modal="true" aria-labelledby="generalModalTitle"><button class="modal-close" type="button" data-modal-close-custom aria-label="Fechar modal">×</button><div data-general-body></div></div></div><div class="modal-backdrop" data-action-modal><div class="modal large" role="dialog" aria-modal="true" aria-labelledby="actionModalTitle"><button class="modal-close" type="button" data-modal-close-custom aria-label="Fechar modal">×</button><h3 id="actionModalTitle" data-action-title></h3><div data-action-body></div></div></div>`; }

  function summaryV2(os) {
    const v = vehicle(os), cl = client(os), tags = os.etiquetasProducao || [];
    const open = window.matchMedia('(min-width: 901px)').matches ? ' open' : '';
    return `<details${open}><summary>Resumo da OS</summary><h4>Etiquetas de produção</h4><div class="os-tags">${tags.map((tag)=>`<span class="os-tag">${tag.texto}<button type="button" aria-label="Remover etiqueta ${tag.texto}" data-remove-tag="${tag.id}">x</button></span>`).join('') || '<span class="muted">Nenhuma etiqueta importante.</span>'}</div><form class="os-tag-form" data-tag-form><label class="sr-only" for="osTagInput">Nova etiqueta</label><input id="osTagInput" class="input" name="tag" maxlength="64" placeholder="Ex.: Priorizar pintura"><button class="btn btn-secondary btn-sm" type="submit">Adicionar</button></form><h4>Identificação</h4><dl><dt>Cliente</dt><dd>${cl.nome}</dd><dt>Telefone</dt><dd>${cl.telefone}</dd><dt>Veículo</dt><dd>${v.marca || ''} ${v.modelo}</dd><dt>Placa</dt><dd>${v.placa}</dd><dt>Cor / ano</dt><dd>${v.cor} - ${v.ano}</dd><dt>Seguradora</dt><dd>${os.seguradora}</dd><dt>Sinistro</dt><dd>${os.sinistro}</dd><dt>Orçamento</dt><dd>${os.numeroOrcamento}</dd><dt>Origem</dt><dd>${os.origem}</dd></dl><h4>Datas</h4><dl><dt>Aprovação</dt><dd>${fmtDate(os.aprovacao)}</dd><dt>Entrada prevista</dt><dd>${fmtDate(os.entradaPrevista)}</dd><dt>Entrada real</dt><dd>${fmtDate(os.entrada)}</dd><dt>Previsão inicial</dt><dd>${fmtDate(os.previsaoInicial)}</dd><dt>Previsão atual</dt><dd>${fmtDate(os.previsao)}</dd><dt>Entrega real</dt><dd>${fmtDate(os.entregaReal)}</dd></dl><h4>Situação</h4><dl><dt>Status</dt><dd>${os.status}</dd><dt>Etapa</dt><dd>${stage(os).nome}</dd><dt>Condições</dt><dd>${condBadges(os)}</dd><dt>Dias na etapa</dt><dd>${daysBetween(os.etapaEntrada)} dias</dd><dt>Dias na oficina</dt><dd>${daysBetween(os.entrada)} dias</dd></dl></details>`;
  }
  function tabsV2() {
    const items = [['visao','Resumo'],['producao','Produção'],['suprimentos','Suprimentos'],['financeiroEntrega','Financeiro e entrega'],['historico','Histórico']];
    return `<div class="tabs os-tabs os-workspace-tabs" aria-label="Áreas da ordem de serviço">${items.map(([id,label]) => `<button class="tab" data-tab="${id}" type="button">${label}</button>`).join('')}</div>`;
  }
  function bindDetailExtensions(os) {
    const content = document.querySelector('.content');
    content.addEventListener('submit', (event) => {
      if (event.target.matches('[data-tag-form]')) { event.preventDefault(); addProductionTag(os, new FormData(event.target).get('tag')); }
      if (event.target.matches('[data-complement-form]')) { event.preventDefault(); createComplementRequest(os, event.target); }
      if (event.target.matches('[data-os-payment-form]')) { event.preventDefault(); window.MeloFinanceModule?.addOSPayment?.(os.id, event.target); renderTab(os, 'financeiro'); }
    });
    content.addEventListener('keydown', (event) => { const card = event.target.closest('[data-open-tab]'); if (card && ['Enter',' '].includes(event.key)) { event.preventDefault(); renderTab(os, card.dataset.openTab); } });
    content.addEventListener('click', (event) => { const card = event.target.closest('[data-open-tab]'); if (card) renderTab(os, card.dataset.openTab); const removeTag = event.target.closest('[data-remove-tag]'); if (removeTag) removeProductionTag(os, removeTag.dataset.removeTag); const status = event.target.closest('[data-complement-status]'); if (status) setComplementRequestStatus(os, status.dataset.complementId, status.dataset.complementStatus); const paymentStatus = event.target.closest('[data-os-payment-realize]'); if (paymentStatus) { window.MeloFinanceModule?.realizeOSPayment?.(os.id, paymentStatus.dataset.osPaymentRealize); renderTab(os, 'financeiro'); } });
  }
  function workspaceForTab(tab) {
    if (tab === 'checkin') return 'visao';
    if (['servicos','compras','complementos','tinta'].includes(tab)) return 'suprimentos';
    if (['financeiro','entregas','documentos'].includes(tab)) return 'financeiroEntrega';
    return tab;
  }
  function renderTab(os, tab) {
    sessionStorage.setItem(`melo-os-tab-${os.id}`, tab);
    const active = workspaceForTab(tab);
    document.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === active));
    const renderer = ({ visao: tabOverviewV2, producao: tabProduction, suprimentos: tabSuppliesWorkspace, financeiroEntrega: tabFinanceDeliveryWorkspace, checkin: tabCheckin, servicos: tabServices, complementos: tabComplementsV2, tinta: tabPaint, compras: tabPurchases, financeiro: tabFinance, documentos: tabDocs, entregas: tabDeliveries, historico: tabHistory }[tab] || tabOverviewV2);
    const body = renderer(os);
    const wrapped = ['servicos','compras','complementos','tinta'].includes(tab)
      ? `<section class="section workspace-panel">${suppliesNav(os, tab)}${body}</section>`
      : ['financeiro','entregas','documentos'].includes(tab)
        ? `<section class="section workspace-panel">${financeDeliveryNav(tab)}${body}</section>`
        : body;
    document.querySelector('[data-tab-content]').innerHTML = wrapped;
  }
  function workspaceCard(title, text, tab, tone = '', active = '') { return `<button class="workspace-card ${tone} ${active === tab ? 'is-active' : ''}" type="button" data-open-tab="${tab}"><strong>${title}</strong><span>${text}</span></button>`; }
  function suppliesNav(os, active = 'servicos') {
    const checks = osChecklist(os);
    return `<div class="workspace-grid workspace-subnav">${workspaceCard('Serviços e peças', `${checks.pecasPendentes || 0} peça(s) pendente(s)`, 'servicos', checks.pecasPendentes ? 'needs-attention' : '', active)}${workspaceCard('Compras', 'Pedidos, recebimentos e contas a pagar vinculadas', 'compras', '', active)}${workspaceCard('Complementos', `${checks.compPendente || 0} complemento(s) em aberto`, 'complementos', checks.compPendente ? 'needs-attention' : '', active)}${workspaceCard('Tinta', checks.tintaPendente ? 'Acompanhar autorização/insumo' : 'Controle liberado', 'tinta', checks.tintaPendente ? 'needs-attention' : '', active)}</div>`;
  }
  function financeDeliveryNav(active = 'financeiro') {
    return `<div class="workspace-grid workspace-subnav">${workspaceCard('Financeiro', 'Receitas, custos e baixas da OS', 'financeiro', '', active)}${workspaceCard('Entregas', 'Checklist e liberação do veículo', 'entregas', '', active)}${workspaceCard('Documentos e fotos', 'Anexos, laudos e registros visuais', 'documentos', '', active)}</div>`;
  }
  function tabSuppliesWorkspace(os) {
    return `<section class="section workspace-panel">${suppliesNav(os, 'servicos')}${tabServices(os)}</section>`;
  }
  function tabFinanceDeliveryWorkspace(os) {
    return `<section class="section workspace-panel">${financeDeliveryNav('financeiro')}${tabFinance(os)}</section>`;
  }
  function statusKpiV2(label, pending, note, tab, value = '') { return `<button class="card kpi-card os-status-kpi ${pending ? 'status-warning' : 'status-ok'}" type="button" data-open-tab="${tab}"><span class="kpi-label">${label}</span><strong class="kpi-value">${value || (pending ? 'Pendente' : 'OK')}</strong><span class="kpi-note">${note}</span></button>`; }
  function tabOverviewV2(os) {
    const obs = d().observacoesOS.filter((o)=>o.osId===os.id).slice(0,4);
    const checks = osChecklist(os);
    const next = nextAction(os);
    return `<section class="section os-overview-cockpit">
      <article class="card os-next-panel">
        <div>
          <span class="eyebrow">Próxima ação</span>
          <h3>${next.label}</h3>
          <p>${next.reason}</p>
        </div>
        <div class="os-next-meta">
          <span><b>Responsável</b>${os.responsavel || 'Sem responsável'}</span>
          <span><b>Previsão</b>${fmtDate(os.previsao)}</span>
          <span><b>Etapa</b>${stage(os).nome || 'Sem etapa'}</span>
        </div>
        <button class="btn btn-primary" type="button" data-open-tab="${next.action}">Abrir ${next.label.toLowerCase()}</button>
      </article>
      <div class="os-status-row compact-kpis">${statusKpiV2('Entrada', checks.checkinPendente, checks.checkinPendente ? 'check-in pendente' : 'check-in registrado', 'checkin')}${statusKpiV2('Suprimentos', checks.pecasPendentes || checks.compPendente, `${checks.pecasPendentes} peça(s) · ${checks.compPendente} complemento(s)`, 'suprimentos')}${statusKpiV2('Produção', 0, `${stage(os).nome} · ${daysBetween(os.etapaEntrada)} dias`, 'producao', `${daysBetween(os.etapaEntrada)}`)}</div>
      <article class="card observations-section"><h3>Observações</h3><div class="new-observation"><textarea class="textarea" placeholder="Digite uma nova observação"></textarea><button class="btn btn-secondary" type="button" data-toast-demo>Adicionar</button></div>${obs.map(obsCard).join('') || c().emptyState('Sem observações','Nenhuma observação cadastrada.')}</article>
    </section>`;
  }
  function complementPhotoLabels(value) { return String(value || '').split(/\n|,/).map((item) => escapeHTML(item).trim()).filter(Boolean); }
  function complementPhotosMarkup(comp) {
    const photos = comp.fotos || comp.fotosComplemento || comp.documentos || [];
    if (!photos.length) return '<p class="muted">Sem fotos vinculadas.</p>';
    return `<div class="complement-photo-list">${photos.map((photo, index)=>`<span>${escapeHTML(photo.legenda || photo.nome || photo)}${index === 0 ? '' : ''}</span>`).join('')}</div>`;
  }
  function createComplementRequest(os, form) {
    const values = Object.fromEntries(new FormData(form).entries());
    const descricao = escapeHTML(values.descricao).trim();
    if (!descricao) { c().toast('Informe a descricao do complemento.'); form.querySelector('[name="descricao"]')?.focus(); return; }
    const count = d().complementos.filter((item) => item.osId === os.id).length + 1;
    const fileLabels = [...(form.querySelector('[name="fotos"]')?.files || [])].map((file) => escapeHTML(file.name)).filter(Boolean);
    const photos = (fileLabels.length ? fileLabels : complementPhotoLabels(values.fotos)).map((label, index) => ({ id: `CMP-FOTO-${Date.now()}-${index}`, legenda: label, data: today, usuario: 'Caio Dicieri' }));
    const comp = { id: `CMP-${Date.now()}`, osId: os.id, numero: `COMP-${(os.numero || os.id).replace(/\D/g,'')}-${count}`, motivo: values.motivo || 'Solicitação de complemento', data: today, descricao, status: 'Criado', valorSolicitado: 0, valorAprovado: 0, impactoPrevisao: 'A avaliar', novaPrevisao: os.previsao, itens: [], documentos: photos.map((photo) => photo.legenda), fotos: photos, observacoes: values.observacoes || '' };
    d().complementos.unshift(comp);
    if (!os.condicoes.includes('CON-03')) os.condicoes.push('CON-03');
    addHistory(os.id, 'complemento', `Complemento ${comp.numero} criado para solicitacao.`, '', comp.status);
    saveState();
    c().toast('Complemento criado na lista.');
    renderTab(os, 'complementos');
  }
  function setComplementRequestStatus(os, compId, status) {
    const comp = d().complementos.find((item) => item.id === compId && item.osId === os.id);
    if (!comp) return;
    const old = comp.status;
    comp.status = status;
    if (status === 'Enviado') comp.enviadoEm = today;
    if (status === 'Retornado') comp.retornadoEm = today;
    addHistory(os.id, 'complemento', `Complemento ${comp.numero} marcado como ${status.toLowerCase()}.`, old, status);
    saveState();
    c().toast(`Complemento marcado como ${status.toLowerCase()}.`);
    renderTab(os, 'complementos');
  }
  function complementRequestCard(comp, os) {
    const sent = ['Enviado','Retornado','Aprovado','Aprovado parcialmente','Recusado','Concluido','Concluído'].includes(comp.status);
    const returned = ['Retornado','Aprovado','Aprovado parcialmente','Recusado','Concluido','Concluído'].includes(comp.status);
    return `<article class="card complement-request-card"><header><div><span class="eyebrow">${fmtDate(comp.data)}</span><h3>${comp.numero}</h3></div>${badge(comp.status || 'Criado')}</header><p>${comp.descricao || 'Sem descricao.'}</p>${comp.observacoes ? `<p class="muted">${comp.observacoes}</p>` : ''}${complementPhotosMarkup(comp)}<dl><dt>Enviado</dt><dd>${comp.enviadoEm ? fmtDate(comp.enviadoEm) : 'Pendente'}</dd><dt>Retornado</dt><dd>${comp.retornadoEm ? fmtDate(comp.retornadoEm) : 'Pendente'}</dd></dl><footer><button class="btn btn-secondary btn-sm" type="button" data-complement-status="Enviado" data-complement-id="${comp.id}" ${sent ? 'disabled' : ''}>Marcar enviado</button><button class="btn btn-primary btn-sm" type="button" data-complement-status="Retornado" data-complement-id="${comp.id}" ${returned ? 'disabled' : ''}>Marcar retornado</button></footer></article>`;
  }
  function tabComplementsV2(os) {
    const comps = d().complementos.filter((co)=>co.osId===os.id);
    return `<section class="section complement-workflow"><article class="card"><div class="section-header"><div><h3 class="section-title">Solicitar complemento</h3><p class="muted">Registre a descricao do complemento e as fotos que acompanham a solicitacao.</p></div></div><form class="os-form-grid complement-form" data-complement-form><label class="form-field wide"><span>Descricao do complemento</span><textarea class="textarea" name="descricao" required placeholder="Descreva o dano, servico ou peca adicional identificada."></textarea></label><label class="form-field"><span>Motivo</span><input class="input" name="motivo" placeholder="Ex.: Dano interno identificado"></label><label class="form-field"><span>Fotos</span><input class="input" type="file" name="fotos" accept="image/*" multiple></label><label class="form-field wide"><span>Observacoes internas</span><textarea class="textarea" name="observacoes" placeholder="Informacoes importantes para a producao ou seguradora."></textarea></label><button class="btn btn-primary" type="submit">Criar complemento</button></form></article><article class="card"><div class="section-header"><div><h3 class="section-title">Complementos da OS</h3><p class="muted">${comps.length} complemento(s) registrado(s).</p></div></div><div class="complement-list">${comps.map((comp)=>complementRequestCard(comp, os)).join('') || c().emptyState('Sem complementos','Crie uma solicitacao para acompanhar envio e retorno.')}</div></article></section>`;
  }
  function tabPaint(os) { const checks = osChecklist(os); const paintNotes = d().observacoesOS.filter((o)=>o.osId===os.id && ['tinta','pintura','preparacao'].includes(slug(o.categoria))); return `<section class="section"><div class="section-header"><h3 class="section-title">Tinta</h3>${btnAction('Adicionar observação','observacao',os.id,'btn btn-secondary')}</div><article class="card"><div class="grid grid-4"><p><b>Status</b><br>${checks.tintaPendente ? badge('Pendente') : badge('Liberado')}</p><p><b>Etapa atual</b><br>${stage(os).nome}</p><p><b>Cor do veículo</b><br>${vehicle(os).cor || 'Não informada'}</p><p><b>Previsão</b><br>${fmtDate(os.previsao)}</p></div><p class="muted">Controle visual para destacar insumos, autorização e observações importantes de pintura.</p></article><article class="card observations-section"><h3>Observações de tinta e pintura</h3>${paintNotes.map(obsCard).join('') || c().emptyState('Sem observações','Nenhuma observação de tinta cadastrada para esta OS.')}</article></section>`; }

  return { state, renderList, renderDetail };
})();
