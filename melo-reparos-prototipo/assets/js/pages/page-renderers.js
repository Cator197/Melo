window.MeloPages = (() => {
  const data = () => window.MeloMockData;
  const c = () => window.MeloComponents;
  const byId = (list, id) => list.find((item) => item.id === id) || {};

  const pageConfigs = {
    'ordens-servico.html': { title: 'Ordens de Serviço', description: 'Base inicial para acompanhamento das OS, sem detalhamento completo nesta etapa.', module: 'Operação', icon: '▣' },
    'producao.html': { title: 'Produção', description: 'Visão preparatória das etapas produtivas. O Kanban completo será desenvolvido em etapa futura.', module: 'Operação', icon: '▦' },
    'agenda.html': { title: 'Agenda', description: 'Estrutura inicial para compromissos, entregas e retornos da oficina.', module: 'Operação', icon: '◷' },
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
    if (file === 'componentes.html') return renderComponentes();
    return renderModulePage(pageConfigs[file] || { title: 'Protótipo', description: 'Página inicial do módulo.', module: 'Melo Reparos', icon: '•' }, file);
  }

  function renderInicio() {
    const d = data();
    const abertas = d.ordensServico.filter((os) => os.status !== 'Finalizada').length;
    const aguardando = d.ordensServico.filter((os) => os.condicoes.length).length;
    const receber = d.contasReceber.filter((item) => item.status !== 'Recebido').reduce((sum, item) => sum + item.valor, 0);
    const pagar = d.contasPagar.filter((item) => item.status !== 'Pago').reduce((sum, item) => sum + item.valor, 0);
    setContent(`
      ${hero('Início', 'Fundação visual do protótipo Melo Reparos com indicadores fictícios, navegação administrativa e componentes reutilizáveis.', 'Painel')}
      <div class="grid grid-4">
        ${c().kpiCard({ label: 'OS em aberto', value: abertas, note: 'Ordens ativas no mock' })}
        ${c().kpiCard({ label: 'Alertas de produção', value: aguardando, note: 'Com condições paralelas' })}
        ${c().kpiCard({ label: 'A receber', value: c().money(receber), note: 'Títulos não recebidos' })}
        ${c().kpiCard({ label: 'A pagar', value: c().money(pagar), note: 'Compromissos em aberto' })}
      </div>
      <section class="section grid grid-2">
        <article class="card alert-card"><div class="alert-icon">!</div><div><h3 class="alert-title">Veículo crítico em Funilaria</h3><p class="alert-text">OS-1001 está em Funilaria, aguardando peça e possui complemento aguardando aprovação.</p></div></article>
        <article class="card alert-card success"><div class="alert-icon">✓</div><div><h3 class="alert-title">Protótipo estruturado</h3><p class="alert-text">Use o menu lateral para validar a navegação entre todos os módulos iniciais.</p></div></article>
      </section>
      <section class="section"><div class="section-header"><h3 class="section-title">Ordens recentes</h3><a class="btn btn-secondary" href="ordens-servico.html">Ver OS</a></div>${ordersTable(d.ordensServico.slice(0, 5))}${c().pagination()}</section>
    `);
  }

  function renderModulePage(config, file) {
    const d = data();
    let body = '';
    if (file === 'ordens-servico.html') body = ordersTable(d.ordensServico) + c().pagination();
    else if (file === 'producao.html') body = productionOverview();
    else if (file === 'complementos.html') body = simpleTable(['ID', 'OS', 'Descrição', 'Status', 'Valor'], d.complementos.map((x) => [x.id, x.osId, x.descricao, c().statusBadge(x.status), c().money(x.valor)]));
    else if (file === 'compras.html') body = simpleTable(['ID', 'Fornecedor', 'OS', 'Item', 'Status', 'Valor'], d.compras.map((x) => [x.id, byId(d.fornecedores, x.fornecedorId).nome, x.osId, x.item, c().statusBadge(x.status), c().money(x.valor)]));
    else if (file === 'contas-receber.html') body = simpleTable(['ID', 'Cliente', 'Descrição', 'Status', 'Vencimento', 'Valor'], d.contasReceber.map((x) => [x.id, byId(d.clientes, x.clienteId).nome, x.descricao, c().statusBadge(x.status), x.vencimento, c().money(x.valor)]));
    else if (file === 'contas-pagar.html') body = simpleTable(['ID', 'Fornecedor', 'Descrição', 'Status', 'Vencimento', 'Valor'], d.contasPagar.map((x) => [x.id, byId(d.fornecedores, x.fornecedorId).nome, x.descricao, c().statusBadge(x.status), x.vencimento, c().money(x.valor)]));
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
  return { render };
})();
