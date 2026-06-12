window.MeloPages = (() => {
  const data = () => window.MeloMockData;
  const c = () => window.MeloComponents;
  const byId = (list, id) => list.find((item) => item.id === id) || {};
  const today = '2026-06-11';
  const dayMs = 24 * 60 * 60 * 1000;

  const pageConfigs = {
    'ordens-servico.html': { title: 'Ordens de Serviço', description: 'Base inicial para acompanhamento das OS, sem detalhamento completo nesta etapa.', module: 'Operação', icon: '▣' },
    'producao.html': { title: 'Produção', description: 'Visão preparatória das etapas produtivas. O Kanban completo será desenvolvido em etapa futura.', module: 'Operação', icon: '▦' },
    'agenda.html': { title: 'Agenda', description: 'Agenda operacional com visão por dia, semana e mês para compromissos da oficina.', module: 'Operação', icon: '◷' },
    'complementos.html': { title: 'Complementos', description: 'Controle inicial de complementos vinculados às ordens de serviço.', module: 'Operação', icon: '+' },
    'compras.html': { title: 'Compras', description: 'Fundação para pedidos, fornecedores e itens necessários à produção.', module: 'Suprimentos', icon: '◫' },
    'financeiro-visao-geral.html': { title: 'Visão geral', description: 'Resumo financeiro inicial com indicadores fictícios e navegação para as rotinas.', module: 'Financeiro', icon: '$' },
    'contas-receber.html': { title: 'Contas a receber', description: 'Lista inicial de recebíveis relacionados às ordens de serviço.', module: 'Financeiro', icon: '↙' },
    'contas-pagar.html': { title: 'Contas a pagar', description: 'Lista inicial de obrigações e compras vinculadas a fornecedores.', module: 'Financeiro', icon: '↗' },
    'fluxo-caixa.html': { title: 'Fluxo de caixa', description: 'Estrutura inicial para entradas, saídas e saldo projetado.', module: 'Financeiro', icon: '≋' },
    'relatorios.html': { title: 'Relatórios', description: 'Área reservada para relatórios gerenciais e indicadores consolidados.', module: 'Gestão', icon: '◰' },
    'clientes.html': { title: 'Clientes', description: 'Cadastro inicial de clientes usado pelos dados fictícios.', module: 'Cadastros', icon: '☻' },
    'veiculos.html': { title: 'Veículos', description: 'Cadastro inicial de veículos com vínculo a clientes e ordens de serviço.', module: 'Cadastros', icon: '▰' },
    'fornecedores.html': { title: 'Fornecedores', description: 'Cadastro inicial de fornecedores de peças, tintas e serviços.', module: 'Cadastros', icon: '◫' },
    'usuarios.html': { title: 'Usuários', description: 'Base inicial de usuários e perfis de acesso do protótipo.', module: 'Cadastros', icon: '◉' },
    'importacoes.html': { title: 'Importações', description: 'Espaço reservado para importações futuras. Nenhuma importação funcional nesta etapa.', module: 'Ferramentas', icon: '⇪' },
    'configuracoes.html': { title: 'Configurações', description: 'Parâmetros iniciais do sistema e preferências visuais.', module: 'Sistema', icon: '⚙' }
  };

  function render() {
    const file = window.MeloNavigation.currentFile();
    if (file === 'inicio.html') return renderInicio();
    if (file === 'agenda.html') return renderAgenda();
    if (file === 'componentes.html') return renderComponentes();
    return renderModulePage(pageConfigs[file] || { title: 'Protótipo', description: 'Página inicial do módulo.', module: 'Melo Reparos', icon: '•' }, file);
  }

  function renderInicio() {
    const d = data();
    const eventosHoje = d.agendaEventos.filter((evento) => evento.data === today);
    const carrosAtivos = d.ordensServico.filter((os) => os.status !== 'Finalizada');
    const atrasadas = carrosAtivos.filter((os) => os.previsao < today);
    const longas = longStageVehicles();
    const comprasPendentes = d.compras.filter((compra) => compra.status !== 'Entregue');
    const complementosPendentes = d.complementos.filter((comp) => comp.status === 'Aguardando aprovação');
    const receberHoje = d.contasReceber.filter((item) => item.vencimento === today && item.status !== 'Recebido');
    const pagarHoje = d.contasPagar.filter((item) => item.vencimento === today && item.status !== 'Pago');
    const kpis = [
      { label: 'Veículos na oficina', value: carrosAtivos.length, note: 'OS ativas em produção', href: 'ordens-servico.html' },
      { label: 'Veículos na fila', value: d.filaVeiculos.length, note: 'Entradas aguardando vaga', href: 'agenda.html?tipo=entrada' },
      { label: 'Entregas para hoje', value: eventosHoje.filter((e) => e.tipo === 'entrega').length, note: formatDate(today), href: 'agenda.html?tipo=entrega' },
      { label: 'Entregas atrasadas', value: atrasadas.length, note: 'Previsão anterior a hoje', href: 'ordens-servico.html?filtro=atrasadas' },
      { label: 'Compras pendentes', value: comprasPendentes.length, note: 'Peças ou serviços em aberto', href: 'compras.html?status=pendente' },
      { label: 'Complementos aguardando', value: complementosPendentes.length, note: 'Aprovação do cliente/seguradora', href: 'complementos.html?status=aguardando' },
      { label: 'Recebimentos hoje', value: c().money(sum(receberHoje)), note: `${receberHoje.length} título(s)`, href: 'contas-receber.html?periodo=hoje' },
      { label: 'Pagamentos hoje', value: c().money(sum(pagarHoje)), note: `${pagarHoje.length} obrigação(ões)`, href: 'contas-pagar.html?periodo=hoje' }
    ];

    setContent(`
      ${hero('Central do Dia', 'Painel operacional da Melo Reparos com prioridades, agenda, financeiro do dia e resumo semanal.', 'Início')}
      <div class="kpi-link-grid">${kpis.map(kpiLink).join('')}</div>
      <section class="section">
        <div class="section-header"><h3 class="section-title">⚠ Veículos há muito tempo na etapa</h3><a class="btn btn-secondary" href="producao.html?filtro=tempo-etapa">Ver produção</a></div>
        ${longStageTable(longas)}
      </section>
      <section class="section">
        <div class="section-header"><h3 class="section-title">Alertas prioritários</h3><span class="badge danger">${homeAlerts().filter((a) => a.priority === 'Alta').length} alta prioridade</span></div>
        <div class="alert-list">${homeAlerts().map(alertCard).join('')}</div>
      </section>
      <section class="section">
        <div class="section-header"><h3 class="section-title">Operação do dia</h3><a class="btn btn-secondary" href="agenda.html">Abrir agenda</a></div>
        <div class="day-ops-grid">${dayOperationBlocks().map(operationBlock).join('')}</div>
      </section>
      <section class="section">
        <div class="section-header"><h3 class="section-title">Resumo semanal · segunda a sábado</h3><span class="badge primary">Semana de 08/06 a 13/06</span></div>
        ${weeklySummary()}
      </section>
    `);
  }

  function renderAgenda() {
    const d = data();
    setContent(`
      ${hero('Agenda operacional', 'Controle simulado de entradas, entregas, peças, pagamentos, recebimentos, complementos e compromissos internos.', 'Operação')}
      <section class="section agenda-shell" data-agenda-root data-mode="semana" data-offset="0">
        <div class="agenda-toolbar">
          <div class="tabs agenda-modes" aria-label="Modo da agenda">
            <button class="tab" data-agenda-mode="dia">Dia</button>
            <button class="tab active" data-agenda-mode="semana">Semana</button>
            <button class="tab" data-agenda-mode="mes">Mês</button>
          </div>
          <div class="agenda-nav">
            <button class="btn btn-secondary" data-agenda-prev>‹ Anterior</button>
            <button class="btn btn-primary" data-agenda-today>Hoje</button>
            <button class="btn btn-secondary" data-agenda-next>Próximo ›</button>
          </div>
        </div>
        <div class="filters-card">
          <label class="form-field"><span>Tipo</span><select class="select" data-filter="tipo"><option value="todos">Todos</option>${eventTypes().map((tipo) => `<option value="${tipo}">${eventTypeLabel(tipo)}</option>`).join('')}</select></label>
          <label class="form-field"><span>Responsável</span><select class="select" data-filter="responsavel"><option value="todos">Todos</option>${unique(d.agendaEventos.map((e) => e.responsavel)).map((r) => `<option value="${r}">${r}</option>`).join('')}</select></label>
          <label class="form-field"><span>Status</span><select class="select" data-filter="status"><option value="todos">Todos</option>${unique(d.agendaEventos.map((e) => e.status)).map((s) => `<option value="${s}">${s}</option>`).join('')}</select></label>
          <label class="form-field"><span>Período</span><select class="select" data-filter="periodo"><option value="semana">Semana atual</option><option value="hoje">Somente hoje</option><option value="futuro">Próximos dias</option></select></label>
        </div>
        <div class="agenda-period" data-agenda-period></div>
        <div class="agenda-board" data-agenda-board></div>
        <div class="legend-row">${eventTypes().map((tipo) => `<span class="legend-dot type-${tipo}"></span>${eventTypeLabel(tipo)}`).join('')}</div>
      </section>
      <div class="modal-backdrop" id="agendaEventModal"><div class="modal"><div class="modal-header"><h3 class="modal-title" data-event-title>Evento</h3><button class="icon-button" data-modal-close>×</button></div><div class="modal-body" data-event-body></div><div class="modal-footer"><button class="btn btn-secondary" data-modal-close>Fechar</button><a class="btn btn-primary" data-event-link href="#">Abrir registro</a></div></div></div>
    `);
    bindAgendaInteractions();
  }

  function renderModulePage(config, file) {
    const d = data();
    let body = '';
    if (file === 'ordens-servico.html') body = ordersTable(d.ordensServico) + c().pagination();
    else if (file === 'producao.html') body = productionOverview();
    else if (file === 'complementos.html') body = simpleTable(['ID', 'OS', 'Descrição', 'Status', 'Valor'], d.complementos.map((x) => [x.id, x.osId, x.descricao, c().statusBadge(x.status), c().money(x.valor)]));
    else if (file === 'compras.html') body = simpleTable(['ID', 'Fornecedor', 'OS', 'Item', 'Status', 'Valor'], d.compras.map((x) => [x.id, byId(d.fornecedores, x.fornecedorId).nome, x.osId, x.item, c().statusBadge(x.status), c().money(x.valor)]));
    else if (file === 'contas-receber.html') body = simpleTable(['ID', 'Cliente', 'Descrição', 'Status', 'Vencimento', 'Valor'], d.contasReceber.map((x) => [x.id, byId(d.clientes, x.clienteId).nome, x.descricao, c().statusBadge(x.status), formatDate(x.vencimento), c().money(x.valor)]));
    else if (file === 'contas-pagar.html') body = simpleTable(['ID', 'Fornecedor', 'Descrição', 'Status', 'Vencimento', 'Valor'], d.contasPagar.map((x) => [x.id, byId(d.fornecedores, x.fornecedorId).nome, x.descricao, c().statusBadge(x.status), formatDate(x.vencimento), c().money(x.valor)]));
    else if (file === 'financeiro-visao-geral.html' || file === 'fluxo-caixa.html') body = financeiroResumo(file);
    else if (file === 'clientes.html') body = simpleTable(['ID', 'Nome', 'Telefone', 'E-mail'], d.clientes.map((x) => [x.id, x.nome, x.telefone, x.email]));
    else if (file === 'veiculos.html') body = simpleTable(['ID', 'Cliente', 'Placa', 'Modelo', 'Ano', 'OS'], d.veiculos.map((x) => [x.id, byId(d.clientes, x.clienteId).nome, x.placa, x.modelo, x.ano, x.osId || 'Sem OS']));
    else if (file === 'fornecedores.html') body = simpleTable(['ID', 'Nome', 'Categoria', 'Telefone'], d.fornecedores.map((x) => [x.id, x.nome, x.categoria, x.telefone]));
    else if (file === 'usuarios.html') body = simpleTable(['ID', 'Nome', 'Perfil', 'E-mail'], d.usuarios.map((x) => [x.id, x.nome, x.perfil, x.email]));
    else body = c().emptyState('Módulo em estruturação', 'A navegação, identidade visual e estado inicial estão prontos. As rotinas internas serão implementadas nas próximas etapas.');
    setContent(`${hero(config.title, config.description, config.module)}<section class="section"><div class="section-header"><h3 class="section-title">${config.icon} ${config.title}</h3><span class="badge primary">${config.module}</span></div>${body}</section>`);
  }

  function renderComponentes() {
    setContent(`${hero('Componentes', 'Página de validação visual dos componentes obrigatórios do protótipo.', 'Validação visual')}
      <div class="component-showcase">
        <section class="grid grid-3">${c().kpiCard({ label: 'Indicador', value: '128', note: 'Card de indicador' })}<article class="card alert-card"><div class="alert-icon">!</div><div><h3 class="alert-title">Card de alerta</h3><p class="alert-text">Mensagem contextual reutilizável.</p></div></article><article class="card"><span class="badge primary">Aberta</span> <span class="badge success">Pago</span> <span class="badge warning">Aguardando</span> <span class="badge danger">Pendente</span></article></section>
        <section class="card"><div class="section-header"><h3 class="section-title">Botões, formulário e abas</h3></div><p><button class="btn btn-primary" data-toast-demo>Primário</button> <button class="btn btn-secondary" data-modal-open="#demoModal">Secundário</button> <button class="btn btn-danger">Perigo</button></p><div class="form-row"><div class="form-field"><label>Campo</label><input class="input" value="Cliente exemplo"></div><div class="form-field"><label>Select</label><select class="select"><option>Funilaria</option><option>Pintura</option></select></div></div><div class="tabs"><button class="tab active">Resumo</button><button class="tab">Histórico</button><button class="tab">Anexos</button></div>${c().loading('Carregamento')}</section>
        <section>${simpleTable(['Componente', 'Estado', 'Observação'], [['Tabela', c().statusBadge('Ativo'), 'Padrão responsivo'], ['Paginação', c().statusBadge('Ativo'), 'Controles visuais']])}${c().pagination()}</section>
        <section class="card"><h3 class="section-title">Confirmação e estado vazio</h3><p class="alert-text">Use o botão secundário para abrir o modal de confirmação.</p>${c().emptyState('Nada encontrado', 'Estado vazio para listas sem registros.')}</section>
      </div>
      <div class="modal-backdrop" id="demoModal"><div class="modal"><div class="modal-header"><h3 class="modal-title">Confirmação</h3><button class="icon-button" data-modal-close>×</button></div><div class="modal-body">Deseja confirmar esta ação fictícia no protótipo?</div><div class="modal-footer"><button class="btn btn-secondary" data-modal-close>Cancelar</button><button class="btn btn-primary" data-modal-close data-toast-demo>Confirmar</button></div></div></div>`);
  }

  function homeAlerts() {
    const d = data();
    return [
      { priority: 'Alta', icon: '⏱', text: 'OS-1003 está há 9 dias na Preparação, acima do limite esperado.', href: 'producao.html?os=OS-1003', action: 'Abrir etapa', record: 'OS-1003' },
      { priority: 'Alta', icon: '🚗', text: 'OS-1005 tem entrega prevista para hoje com terceirização ainda em andamento.', href: 'ordens-servico.html?os=OS-1005', action: 'Tratar entrega', record: 'OS-1005' },
      { priority: 'Alta', icon: '📦', text: 'Kit tinta azul perolizado foi entregue após a data combinada e impacta conferência.', href: 'compras.html?compra=COM-002', action: 'Ver compra', record: 'COM-002' },
      { priority: 'Média', icon: '🧾', text: 'Compra COM-004 não possui conta a pagar vinculada.', href: 'compras.html?compra=COM-004', action: 'Gerar título', record: 'COM-004' },
      { priority: 'Média', icon: '+', text: 'CMP-001 aguarda aprovação para liberar sequência de montagem.', href: 'complementos.html?comp=CMP-001', action: 'Solicitar aprovação', record: 'CMP-001' },
      { priority: 'Alta', icon: '↙', text: 'REC-006 está vencida desde 08/06 e precisa de cobrança.', href: 'contas-receber.html?rec=REC-006', action: 'Cobrar cliente', record: 'REC-006' },
      { priority: 'Alta', icon: '↗', text: 'PAG-006 está vencida desde 10/06 e deve ser priorizada.', href: 'contas-pagar.html?pag=PAG-006', action: 'Programar pagamento', record: 'PAG-006' },
      { priority: 'Média', icon: '$', text: 'OS-1007 foi finalizada sem fechamento financeiro completo.', href: 'financeiro-visao-geral.html?os=OS-1007', action: 'Fechar financeiro', record: 'OS-1007' }
    ];
  }

  function dayOperationBlocks() {
    const d = data();
    return [
      { title: 'Entregas hoje', icon: '🚗', items: d.agendaEventos.filter((e) => e.data === today && e.tipo === 'entrega') },
      { title: 'Veículos agendados hoje', icon: '➜', items: d.agendaEventos.filter((e) => e.data === today && e.tipo === 'entrada') },
      { title: 'Recebimentos hoje', icon: '↙', items: d.agendaEventos.filter((e) => e.data === today && e.tipo === 'recebimento') },
      { title: 'Pagamentos hoje', icon: '↗', items: d.agendaEventos.filter((e) => e.data === today && e.tipo === 'pagamento') },
      { title: 'Peças previstas hoje', icon: '📦', items: d.agendaEventos.filter((e) => e.data === today && e.tipo === 'peca') }
    ];
  }

  function bindAgendaInteractions() {
    const root = document.querySelector('[data-agenda-root]');
    if (!root) return;
    const renderBoard = () => {
      const mode = root.dataset.mode;
      const offset = Number(root.dataset.offset || 0);
      const periodEl = root.querySelector('[data-agenda-period]');
      const board = root.querySelector('[data-agenda-board]');
      const filters = Object.fromEntries([...root.querySelectorAll('[data-filter]')].map((el) => [el.dataset.filter, el.value]));
      const events = filteredEvents(filters, mode, offset);
      periodEl.textContent = periodLabel(mode, offset);
      board.className = `agenda-board agenda-${mode}`;
      board.innerHTML = agendaMarkup(mode, offset, events);
    };
    root.querySelectorAll('[data-agenda-mode]').forEach((btn) => btn.addEventListener('click', () => {
      root.dataset.mode = btn.dataset.agendaMode;
      root.dataset.offset = '0';
      root.querySelectorAll('[data-agenda-mode]').forEach((item) => item.classList.toggle('active', item === btn));
      renderBoard();
    }));
    root.querySelector('[data-agenda-prev]').addEventListener('click', () => { root.dataset.offset = String(Number(root.dataset.offset) - 1); renderBoard(); });
    root.querySelector('[data-agenda-next]').addEventListener('click', () => { root.dataset.offset = String(Number(root.dataset.offset) + 1); renderBoard(); });
    root.querySelector('[data-agenda-today]').addEventListener('click', () => { root.dataset.offset = '0'; renderBoard(); });
    root.querySelectorAll('[data-filter]').forEach((field) => field.addEventListener('change', () => { c().toast('Filtro aplicado na agenda.'); renderBoard(); }));
    root.addEventListener('click', (event) => {
      const eventButton = event.target.closest('[data-event-id]');
      if (!eventButton) return;
      openEventModal(eventButton.dataset.eventId);
    });
    renderBoard();
  }

  function openEventModal(id) {
    const event = data().agendaEventos.find((item) => item.id === id);
    if (!event) return;
    const modal = document.querySelector('#agendaEventModal');
    modal.querySelector('[data-event-title]').textContent = event.titulo;
    modal.querySelector('[data-event-body]').innerHTML = `<div class="event-detail"><span class="badge ${event.status === 'Concluído' ? 'success' : 'warning'}">${event.status}</span><p>${event.descricao}</p><dl><dt>Tipo</dt><dd>${eventTypeLabel(event.tipo)}</dd><dt>Data e horário</dt><dd>${formatDate(event.data)} às ${event.hora}</dd><dt>Responsável</dt><dd>${event.responsavel}</dd><dt>Registro vinculado</dt><dd>${event.registroTipo} ${event.registroId}</dd></dl></div>`;
    modal.querySelector('[data-event-link]').href = event.link;
    modal.classList.add('is-open');
  }

  function agendaMarkup(mode, offset, events) {
    if (mode === 'dia') {
      const date = addDays(today, offset);
      const list = events.filter((event) => event.data === date);
      return `<article class="agenda-day full"><h3>${weekday(date)} <span>${formatDate(date)}</span></h3>${eventList(list)}</article>`;
    }
    if (mode === 'mes') {
      const days = Array.from({ length: 30 }, (_, index) => addDays('2026-06-01', index + (offset * 30)));
      return days.map((date) => `<article class="agenda-day month-cell ${date === today ? 'is-today' : ''}"><h3>${date.slice(-2)}</h3>${eventList(events.filter((event) => event.data === date), true)}</article>`).join('');
    }
    return weekDates(offset).map((date) => `<article class="agenda-day ${date === today ? 'is-today' : ''}"><h3>${weekday(date)} <span>${formatDate(date)}</span></h3>${eventList(events.filter((event) => event.data === date))}</article>`).join('');
  }

  function eventList(events, compact = false) {
    if (!events.length) return '<p class="empty-mini">Sem eventos</p>';
    return events.map((event) => `<button class="agenda-event type-${event.tipo} ${event.status === 'Concluído' ? 'is-done' : ''}" data-event-id="${event.id}"><span>${event.hora}</span><strong>${compact ? eventTypeLabel(event.tipo) : event.titulo}</strong>${compact ? '' : `<small>${event.responsavel} · ${event.registroId}</small>`}</button>`).join('');
  }

  function filteredEvents(filters, mode, offset) {
    return data().agendaEventos.filter((event) => {
      if (filters.tipo !== 'todos' && event.tipo !== filters.tipo) return false;
      if (filters.responsavel !== 'todos' && event.responsavel !== filters.responsavel) return false;
      if (filters.status !== 'todos' && event.status !== filters.status) return false;
      if (filters.periodo === 'hoje' && event.data !== today) return false;
      if (filters.periodo === 'futuro' && event.data < today) return false;
      if (mode === 'semana' && !weekDates(offset).includes(event.data)) return false;
      if (mode === 'dia' && event.data !== addDays(today, offset)) return false;
      return true;
    });
  }

  function longStageVehicles() {
    return data().ordensServico.filter((os) => os.status !== 'Finalizada').map((os) => {
      const vehicle = byId(data().veiculos, os.veiculoId);
      const etapa = byId(data().etapasProducao, os.etapaId);
      const dias = daysBetween(os.etapaEntrada || os.entrada, today);
      const limite = data().limitesEtapa[os.etapaId] || 3;
      return { ...os, vehicle, etapa, dias, limite };
    }).filter((item) => item.dias > item.limite).sort((a, b) => b.dias - a.dias);
  }

  function longStageTable(items) {
    return simpleTable(['Placa', 'Veículo', 'Etapa atual', 'Dias', 'Limite', 'Previsão', 'Condições paralelas'], items.map((item) => [item.vehicle.placa, item.vehicle.modelo, item.etapa.nome, `<strong>${item.dias} dias</strong>`, `${item.limite} dias`, formatDate(item.previsao), item.condicoes.length ? item.condicoes.map((id) => c().statusBadge(byId(data().condicoesParalelas, id).nome)).join(' ') : '<span class="badge success">Sem bloqueio</span>']));
  }

  function weeklySummary() {
    const d = data();
    const dates = weekDates(0);
    const rows = dates.map((date) => {
      const entradas = d.agendaEventos.filter((e) => e.data === date && e.tipo === 'entrada').length;
      const previstas = d.agendaEventos.filter((e) => e.data === date && e.tipo === 'entrega').length;
      const realizadas = d.agendaEventos.filter((e) => e.data === date && e.tipo === 'entrega' && e.status === 'Concluído').length;
      const entradasFin = sum(d.contasReceber.filter((item) => item.vencimento === date));
      const saidasFin = sum(d.contasPagar.filter((item) => item.vencimento === date));
      return `<article class="week-card ${date === today ? 'is-today' : ''}"><strong>${weekday(date)}</strong><span>${formatDate(date)}</span><div><b>${entradas}</b> entradas</div><div><b>${previstas}</b> entregas previstas</div><div><b>${realizadas}</b> entregas realizadas</div><div class="money-in">${c().money(entradasFin)}</div><div class="money-out">${c().money(saidasFin)}</div></article>`;
    }).join('');
    return `<div class="week-summary">${rows}</div>`;
  }

  function operationBlock(block) {
    return `<article class="card op-block"><h4>${block.icon} ${block.title}</h4>${block.items.length ? block.items.map((item) => `<a href="agenda.html?evento=${item.id}"><strong>${item.hora}</strong> ${item.titulo}<span>${item.status}</span></a>`).join('') : '<p class="empty-mini">Nenhum registro para hoje.</p>'}</article>`;
  }

  function alertCard(alert) {
    const cls = alert.priority === 'Alta' ? 'danger' : 'warning';
    return `<article class="card alert-card ${cls}"><div class="alert-icon">${alert.icon}</div><div><div class="alert-meta"><span class="badge ${cls}">${alert.priority}</span><small>${alert.record}</small></div><h3 class="alert-title">${alert.text}</h3><p class="alert-text">Vínculo com registro operacional e ação direta para tratamento.</p><a class="btn btn-secondary" href="${alert.href}">${alert.action}</a></div></article>`;
  }

  function kpiLink(item) {
    return `<a class="card kpi-card kpi-link" href="${item.href}"><div class="kpi-label">${item.label}</div><div class="kpi-value">${item.value}</div><div class="kpi-note">${item.note}</div></a>`;
  }

  function hero(title, description, module) {
    return `<nav class="breadcrumb"><a href="inicio.html">Início</a><span>›</span><span>${module}</span><span>›</span><strong>${title}</strong></nav><section class="hero"><div><h2>${title}</h2><p>${description}</p></div><span class="badge primary">Módulo: ${module}</span></section>`;
  }
  function setContent(html) { document.querySelector('[data-page-content]').innerHTML = html; }
  function simpleTable(headers, rows) { return c().table(headers, rows); }
  function ordersTable(orders) {
    const d = data();
    return simpleTable(['OS', 'Cliente', 'Veículo', 'Etapa', 'Condições', 'Status', 'Valor'], orders.map((os) => {
      const vehicle = byId(d.veiculos, os.veiculoId);
      const conditions = os.condicoes.length ? os.condicoes.map((id) => c().statusBadge(byId(d.condicoesParalelas, id).nome)).join(' ') : '<span class="badge success">Sem bloqueio</span>';
      return [os.id, byId(d.clientes, os.clienteId).nome, `${vehicle.placa} · ${vehicle.modelo}`, byId(d.etapasProducao, os.etapaId).nome, conditions, c().statusBadge(os.status), c().money(os.valor)];
    }));
  }
  function productionOverview() {
    const d = data();
    const cards = d.etapasProducao.map((etapa) => {
      const total = d.ordensServico.filter((os) => os.etapaId === etapa.id).length;
      return c().kpiCard({ label: etapa.nome, value: total, note: 'ordens nesta etapa' });
    }).join('');
    return `<div class="grid grid-4">${cards}</div><div class="section">${ordersTable(d.ordensServico.filter((os) => os.etapaId === 'ETP-02'))}</div>`;
  }
  function financeiroResumo() {
    const d = data();
    const rec = d.contasReceber.filter((item) => item.status !== 'Recebido').reduce((s, x) => s + x.valor, 0);
    const pag = d.contasPagar.filter((item) => item.status !== 'Pago').reduce((s, x) => s + x.valor, 0);
    return `<div class="grid grid-3">${c().kpiCard({ label: 'Entradas previstas', value: c().money(rec), note: 'Contas a receber abertas' })}${c().kpiCard({ label: 'Saídas previstas', value: c().money(pag), note: 'Contas a pagar abertas' })}${c().kpiCard({ label: 'Saldo projetado', value: c().money(rec - pag), note: 'Base fictícia' })}</div><div class="section">${c().emptyState('Fluxo completo não implementado', 'Esta etapa entrega apenas a fundação visual e a navegação do módulo financeiro.')}</div>`;
  }

  const sum = (items) => items.reduce((total, item) => total + item.valor, 0);
  const unique = (items) => [...new Set(items)];
  const eventTypes = () => ['entrada', 'entrega', 'peca', 'pagamento', 'recebimento', 'complemento', 'interno'];
  const eventTypeLabel = (type) => ({ entrada: 'Entrada de veículo', entrega: 'Entrega', peca: 'Previsão de peça', pagamento: 'Pagamento', recebimento: 'Recebimento', complemento: 'Complemento', interno: 'Compromisso interno' }[type] || type);
  const parseDate = (date) => new Date(`${date}T00:00:00`);
  const addDays = (date, days) => new Date(parseDate(date).getTime() + (days * dayMs)).toISOString().slice(0, 10);
  const daysBetween = (start, end) => Math.floor((parseDate(end) - parseDate(start)) / dayMs);
  const formatDate = (date) => parseDate(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const weekday = (date) => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][parseDate(date).getDay()];
  const weekDates = (offset = 0) => Array.from({ length: 6 }, (_, index) => addDays('2026-06-08', index + (offset * 7)));
  const periodLabel = (mode, offset) => {
    if (mode === 'dia') return `Dia ${formatDate(addDays(today, offset))}`;
    if (mode === 'mes') return offset === 0 ? 'Junho de 2026' : `Período mensal simulado ${offset > 0 ? '+' : ''}${offset}`;
    const dates = weekDates(offset);
    return `Semana de ${formatDate(dates[0])} a ${formatDate(dates[5])}`;
  };

  return { render };
})();
