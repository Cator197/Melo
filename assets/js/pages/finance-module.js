window.MeloFinanceModule = (() => {
  const TODAY = '2026-06-12';
  const dayMs = 86400000;
  const files = new Set(['financeiro.html','financeiro-visao-geral.html','contas-receber.html','contas-pagar.html','fluxo-caixa.html','custos-fixos.html','regras-pagamento.html','rentabilidade.html','categorias-financeiras.html']);
  const d = () => window.MeloMockData;
  const c = () => window.MeloComponents;
  const money = (v) => c().money(Number(v || 0));
  const fmt = (date) => date ? new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR') : '—';
  const parse = (date) => new Date(`${date}T00:00:00`);
  const addDays = (date, days) => new Date(parse(date).getTime() + days * dayMs).toISOString().slice(0, 10);
  const daysBetween = (start, end = TODAY) => Math.floor((parse(end) - parse(start)) / dayMs);
  const byId = (list, id) => (list || []).find((item) => item.id === id) || {};
  const sum = (items, key = 'valor') => items.reduce((total, item) => total + Number(item[key] || 0), 0);
  const active = (item) => !['cancelada','cancelado','estornada','estornado'].includes(String(item.status).toLowerCase());
  const paidStatus = (item, type) => type === 'receber' ? String(item.status).toLowerCase().includes('recebida') : String(item.status).toLowerCase().includes('paga');
  const received = (account) => sum((d().baixasFinanceiras || []).filter((b) => b.contaId === account.id && b.tipo === 'recebimento' && b.status !== 'estornada'), 'valorBruto');
  const paid = (account) => sum((d().baixasFinanceiras || []).filter((b) => b.contaId === account.id && b.tipo === 'pagamento' && b.status !== 'estornada'), 'valorBruto');
  const accountTotal = (account) => Number(account.valorLiquido ?? account.valorFinal ?? account.valor ?? account.valorBruto ?? 0);
  const pending = (account, type) => Math.max(0, accountTotal(account) - (type === 'receber' ? received(account) : paid(account)));
  const isOverdue = (item) => active(item) && !paidStatus(item, item.tipo || 'receber') && item.vencimento < TODAY;
  const periodDefaults = () => ({ start: '2026-06-01', end: '2026-06-30', label: 'este mês' });
  const inPeriod = (item, start, end) => (item.vencimento || item.dataPrevista || item.data || TODAY) >= start && (item.vencimento || item.dataPrevista || item.data || TODAY) <= end;
  const osLabel = (id) => byId(d().ordensServico, id).numero || id || '—';
  const vehicleLabel = (osId) => { const os = byId(d().ordensServico, osId); const v = byId(d().veiculos, os.veiculoId); return v.placa ? `${v.placa} · ${v.marca} ${v.modelo}` : '—'; };
  const badge = (text) => c().statusBadge(text || '—');
  const toast = (msg) => c().toast(msg);

  function handles(file) { return files.has(file); }

  function render(file) {
    ensureSession();
    const root = document.querySelector('[data-page-content]');
    if (!root) return;
    root.innerHTML = ({
      'financeiro.html': renderOverview,
      'financeiro-visao-geral.html': renderOverview,
      'contas-receber.html': renderReceivables,
      'contas-pagar.html': renderPayables,
      'fluxo-caixa.html': renderCashflow,
      'custos-fixos.html': renderFixedCosts,
      'regras-pagamento.html': renderRules,
      'rentabilidade.html': renderProfitability,
      'categorias-financeiras.html': renderCategories
    }[file] || renderOverview)();
    bindFinance(root, file);
  }

  function ensureSession() {
    if (d().financeiroSessao) return;
    d().financeiroSessao = { filtros: { periodo: 'este-mes', ...periodDefaults() }, criadoReceber: 0, criadoPagar: 0 };
  }

  function ensureFixedCosts() {
    if (d().custosFixos) return;
    d().custosFixos = [
      { id:'CF-001', nome:'Aluguel oficina', categoria:'Ocupação', fornecedor:'Imobiliária Centro', valorPrevisto:6800, valorConfirmado:6800, vencimento:'2026-06-05', frequencia:'Mensal', regra:'Dia 5 de cada mês', variavel:false, status:'Confirmado', responsavel:'Caio Dicieri', contaPagarId:'PAG-ALUGUEL-06', observacao:'Contrato fixo.' },
      { id:'CF-002', nome:'Energia elétrica', categoria:'Utilidades', fornecedor:'Enel', valorPrevisto:1450, valorConfirmado:1328.74, vencimento:'2026-06-12', frequencia:'Mensal', regra:'Dia 12 de cada mês', variavel:true, status:'A confirmar', responsavel:'Marina Lopes', contaPagarId:'', observacao:'Custo fixo com valor variável conforme consumo.' },
      { id:'CF-003', nome:'Internet e telefone', categoria:'Utilidades', fornecedor:'Vivo Empresas', valorPrevisto:389.9, valorConfirmado:389.9, vencimento:'2026-06-10', frequencia:'Mensal', regra:'Dia 10 de cada mês', variavel:false, status:'Confirmado', responsavel:'Rafael Santos', contaPagarId:'PAG-NET-06', observacao:'Plano recorrente.' },
      { id:'CF-004', nome:'Vale transporte equipe', categoria:'Pessoal', fornecedor:'Recarga VT', valorPrevisto:920, valorConfirmado:0, vencimento:'2026-06-15', frequencia:'Semanal', regra:'Toda segunda-feira', variavel:true, status:'Previsto', responsavel:'Caio Dicieri', contaPagarId:'', observacao:'Valor varia conforme escala e ausências.' },
      { id:'CF-005', nome:'Contabilidade', categoria:'Administrativo', fornecedor:'Escritório Alfa', valorPrevisto:780, valorConfirmado:780, vencimento:'2026-06-20', frequencia:'Mensal', regra:'Dia 20 de cada mês', variavel:false, status:'Confirmado', responsavel:'Caio Dicieri', contaPagarId:'', observacao:'Honorário mensal.' },
      { id:'CF-006', nome:'Limpeza terceirizada', categoria:'Operacional', fornecedor:'LimpaJá', valorPrevisto:350, valorConfirmado:0, vencimento:'2026-06-17', frequencia:'Semanal', regra:'Toda quarta-feira', variavel:false, status:'Previsto', responsavel:'Marina Lopes', contaPagarId:'', observacao:'Pagamento semanal.' }
    ];
  }

  function header(title, desc, actions = '') {
    return `<section class="hero"><div><span class="eyebrow">Financeiro › ${title}</span><h2>${title}</h2><p>${desc}</p><p class="muted">Período selecionado: <strong data-period-label>01/06/2026 a 30/06/2026</strong> · Última atualização fictícia: 12/06/2026 10:42</p></div><div class="hero-actions">${actions}<button class="btn btn-secondary" data-export>Exportar</button></div></section>`;
  }

  function periodFilters() {
    return `<section class="card finance-filters" data-period-root><div class="form-grid">
      <label class="form-field"><span>Período</span><select class="select" data-period><option value="hoje">Hoje</option><option value="esta-semana">Esta semana</option><option value="este-mes" selected>Este mês</option><option value="mes-anterior">Mês anterior</option><option value="proximo-mes">Próximo mês</option><option value="personalizado">Período personalizado</option></select></label>
      <label class="form-field"><span>Data inicial</span><input class="input" type="date" data-start value="2026-06-01"></label>
      <label class="form-field"><span>Data final</span><input class="input" type="date" data-end value="2026-06-30"></label>
      <div class="form-actions"><button class="btn btn-primary" data-apply-period>Aplicar</button><button class="btn btn-secondary" data-clear-period>Limpar</button></div>
    </div></section>`;
  }

  function metrics(start = '2026-06-01', end = '2026-06-30') {
    const rec = d().contasReceber.filter((x) => active(x) && inPeriod(x, start, end));
    const pag = d().contasPagar.filter((x) => active(x) && inPeriod(x, start, end));
    const receitasPrev = sum(rec, 'valorLiquido');
    const receitasReal = sum(d().baixasFinanceiras.filter((b) => b.tipo === 'recebimento' && b.status !== 'estornada' && b.data >= start && b.data <= end), 'valorLiquido');
    const despesasPrev = sum(pag.map((x) => ({ valor: accountTotal(x) })));
    const despesasReal = sum(d().baixasFinanceiras.filter((b) => b.tipo === 'pagamento' && b.status !== 'estornada' && b.data >= start && b.data <= end), 'valorLiquido');
    return { rec, pag, receitasPrev, receitasReal, despesasPrev, despesasReal, recAberto: rec.filter((x) => pending(x, 'receber') > 0), pagAberto: pag.filter((x) => pending(x, 'pagar') > 0), vencidas: rec.filter((x) => isOverdue({ ...x, tipo:'receber' })).length + pag.filter((x) => isOverdue({ ...x, tipo:'pagar' })).length };
  }

  function kpis(items) { return `<div class="grid grid-4 finance-kpis">${items.map((item) => `<button class="card kpi-card finance-kpi ${item.kind || ''}" data-filter-short="${item.filter || ''}"><div class="kpi-label">${item.label}</div><div class="kpi-value">${item.value}</div><div class="kpi-note">${item.note || 'Clique para filtrar a lista'}</div></button>`).join('')}</div>`; }

  function renderOverview() {
    const m = metrics();
    const week = weekRange();
    const todayBuckets = dueBuckets(TODAY, TODAY);
    const weekBuckets = dueBuckets(week.start, week.end);
    const overdueBuckets = overdueTotals();
    const saldo = balanceSnapshot(m);
    return `${header('Financeiro', 'Visão geral de contas, parcelas, vencimentos, fluxo de caixa e rentabilidade da Melo Reparos.', '<button class="btn btn-primary" data-open-fin-modal="receber">Nova conta a receber</button><button class="btn btn-secondary" data-open-fin-modal="pagar">Nova conta a pagar</button><button class="btn btn-secondary" data-open-fin-modal="baixa">Registrar baixa</button>')}${periodFilters()}${kpis([
      {label:'Saldo previsto', value:money(saldo.previsto), note:'Saldo inicial + previsto do período', kind:'resultado'},
      {label:'Saldo realizado', value:money(saldo.realizado), note:'Saldo inicial + baixas do período', kind:'realizado'},
      {label:'A receber em aberto', value:money(saldo.receberAberto), note:'Saldo pendente de recebíveis', kind:'previsto', filter:'receber-aberto'},
      {label:'A pagar em aberto', value:money(saldo.pagarAberto), note:'Saldo pendente de obrigações', kind:'previsto', filter:'pagar-aberto'}
    ])}${periodSummary(m)}${overviewAreas(todayBuckets, weekBuckets, overdueBuckets)}${priorityAlerts()}${weeklyVehicleRevenue(week)}${upcomingLists()}${financeModalMarkup()}`;
  }

  function alertRow(a) { return `<div class="finance-alert priority-${a.prioridade}"><span>${badge(a.prioridade)}</span><strong>${a.descricao}</strong><small>${a.registro} · ${money(a.valor)} · ${fmt(a.vencimento)}</small><button class="btn btn-secondary" data-toast-demo>${a.acao}</button></div>`; }

  function weekRange(date = TODAY) {
    const base = parse(date);
    const day = base.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(base.getTime() + mondayOffset * dayMs).toISOString().slice(0, 10);
    return { start: monday, end: addDays(monday, 6) };
  }

  function balanceSnapshot(m) {
    const saldoInicial = 18500;
    const resultadoPrevisto = m.receitasPrev - m.despesasPrev;
    const resultadoRealizado = m.receitasReal - m.despesasReal;
    const receberAberto = sum(m.recAberto.map((x)=>({ valor:pending(x, 'receber') })));
    const pagarAberto = sum(m.pagAberto.map((x)=>({ valor:pending(x, 'pagar') })));
    return { saldoInicial, resultadoPrevisto, resultadoRealizado, previsto: saldoInicial + resultadoPrevisto, realizado: saldoInicial + resultadoRealizado, receberAberto, pagarAberto };
  }

  function dueBuckets(start, end) {
    const rec = d().contasReceber.filter((x)=>active(x) && x.vencimento >= start && x.vencimento <= end && pending(x, 'receber') > 0);
    const pag = d().contasPagar.filter((x)=>active(x) && x.vencimento >= start && x.vencimento <= end && pending(x, 'pagar') > 0);
    return {
      rec,
      pag,
      receber: sum(rec.map((x)=>({ valor:pending(x, 'receber') }))),
      pagar: sum(pag.map((x)=>({ valor:pending(x, 'pagar') })))
    };
  }

  function overdueTotals() {
    const rec = d().contasReceber.filter((x)=>isOverdue({ ...x, tipo:'receber' }));
    const pag = d().contasPagar.filter((x)=>isOverdue({ ...x, tipo:'pagar' }));
    return {
      rec,
      pag,
      receber: sum(rec.map((x)=>({ valor:pending(x, 'receber') }))),
      pagar: sum(pag.map((x)=>({ valor:pending(x, 'pagar') })))
    };
  }

  function overviewAreas(todayBuckets, weekBuckets, overdueBuckets) {
    const week = weekRange();
    const miniCard = (label, value, note, kind) => `<article class="finance-area-card ${kind || ''}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
    return `<section class="finance-area-grid">
      <article class="card finance-area">
        <div class="section-header"><div><h3>Hoje</h3><p class="muted">Valores com vencimento em ${fmt(TODAY)}.</p></div></div>
        <div class="finance-area-cards">${miniCard('A receber hoje', money(todayBuckets.receber), `${todayBuckets.rec.length} conta(s)`, 'in')}${miniCard('A pagar hoje', money(todayBuckets.pagar), `${todayBuckets.pag.length} conta(s)`, 'out')}${miniCard('Saldo do dia', money(todayBuckets.receber - todayBuckets.pagar), 'entradas menos saídas', 'balance')}</div>
      </article>
      <article class="card finance-area">
        <div class="section-header"><div><h3>Esta semana</h3><p class="muted">${fmt(week.start)} a ${fmt(week.end)}.</p></div></div>
        <div class="finance-area-cards">${miniCard('Total a receber previsto', money(weekBuckets.receber), `${weekBuckets.rec.length} conta(s)`, 'in')}${miniCard('Total a pagar previsto', money(weekBuckets.pagar), `${weekBuckets.pag.length} conta(s)`, 'out')}${miniCard('Saldo previsto da semana', money(weekBuckets.receber - weekBuckets.pagar), 'receber menos pagar', 'balance')}</div>
      </article>
      <article class="card finance-area finance-overdue-area">
        <div class="section-header"><div><h3>Contas vencidas</h3><p class="muted">Prioridade operacional para cobrança e pagamentos em atraso.</p></div><a class="btn btn-secondary" href="contas-receber.html?filtro=vencidas">Ver listas</a></div>
        <div class="finance-area-cards">${miniCard('A receber vencido', money(overdueBuckets.receber), `${overdueBuckets.rec.length} conta(s)`, 'danger')}${miniCard('A pagar vencido', money(overdueBuckets.pagar), `${overdueBuckets.pag.length} conta(s)`, 'danger')}${miniCard('Exposição vencida', money(overdueBuckets.receber - overdueBuckets.pagar), 'impacto líquido', 'balance')}</div>
      </article>
    </section>`;
  }

  function priorityAlerts() {
    return `<section class="card critical-block finance-alerts-full"><div class="section-header"><div><h3>Alertas financeiros prioritários</h3><p class="muted">Lista única em largura total para decidir a próxima ação.</p></div><a class="btn btn-secondary" href="contas-receber.html?filtro=vencidas">Ver vencidas</a></div><div class="alert-list">${d().alertasFinanceiros.map(alertRow).join('')}</div></section>`;
  }

  function periodSummary(m) {
    const recVenc = m.rec.filter((x) => isOverdue({ ...x, tipo:'receber' }));
    const pagVenc = m.pag.filter((x) => isOverdue({ ...x, tipo:'pagar' }));
    const saldo = balanceSnapshot(m);
    return `<section class="card finance-period-summary"><div class="section-header"><div><h3>Resumo do período</h3><p class="muted">Visão executiva do período selecionado, com saldo em evidência.</p></div></div><div class="finance-summary-hero"><div><span>Saldo previsto do período</span><strong>${money(saldo.previsto)}</strong><small>Saldo inicial ${money(saldo.saldoInicial)} + resultado previsto ${money(saldo.resultadoPrevisto)}</small></div><div><span>Resultado realizado</span><strong>${money(saldo.resultadoRealizado)}</strong><small>Receitas realizadas menos despesas realizadas</small></div><div><span>Diferença previsto x realizado</span><strong>${money(saldo.resultadoPrevisto - saldo.resultadoRealizado)}</strong><small>Gap para acompanhamento do caixa</small></div></div><div class="finance-summary-grid"><div><h4>Receitas</h4><p>Previstas: <strong>${money(m.receitasPrev)}</strong></p><p>Realizadas: <strong>${money(m.receitasReal)}</strong></p><p>Vencidas: <strong>${money(sum(recVenc, 'valorLiquido'))}</strong></p><p>A vencer: <strong>${money(sum(m.rec.filter((x)=>x.vencimento>=TODAY),'valorLiquido'))}</strong></p></div><div><h4>Despesas</h4><p>Previstas: <strong>${money(m.despesasPrev)}</strong></p><p>Realizadas: <strong>${money(m.despesasReal)}</strong></p><p>Vencidas: <strong>${money(sum(pagVenc.map((x)=>({valor:accountTotal(x)}))))}</strong></p><p>A vencer: <strong>${money(sum(m.pag.filter((x)=>x.vencimento>=TODAY).map((x)=>({valor:accountTotal(x)}))))}</strong></p></div><div><h4>Resultado</h4><p>Saldo inicial: <strong>${money(saldo.saldoInicial)}</strong></p><p>Saldo previsto: <strong>${money(saldo.previsto)}</strong></p><p>Saldo realizado: <strong>${money(saldo.realizado)}</strong></p><p>Resultado estimado: <strong>${money(saldo.resultadoPrevisto)}</strong></p></div></div></section>`;
  }

  function weeklyVehicleRevenue(week = weekRange()) {
    const days = Array.from({ length: 7 }, (_, i) => addDays(week.start, i));
    const rowsByDay = days.map((date) => {
      const rows = d().ordensServico
        .filter((os)=>os.previsao === date && !['Cancelado'].includes(String(os.status)))
        .map((os)=>({ os, vehicle: byId(d().veiculos, os.veiculoId), value: Number(os.valor || os.valores?.aprovado || 0) }));
      return { date, rows, total: sum(rows.map((x)=>({ valor:x.value }))) };
    });
    const dayName = (date) => parse(date).toLocaleDateString('pt-BR', { weekday:'short' }).replace('.', '');
    const vehicleCard = (item) => `<div class="week-vehicle-card"><strong>${item.vehicle.placa || osLabel(item.os.id)}</strong><span>${item.vehicle.marca || ''} ${item.vehicle.modelo || ''}</span><small>${osLabel(item.os.id)} - ${money(item.value)}</small></div>`;
    return `<section class="card finance-week-revenue"><div class="section-header"><div><h3>Faturamento por carro na semana</h3><p class="muted">Colunas por dia com valor por carro e total diário previsto.</p></div></div><div class="finance-week-board">${rowsByDay.map((day)=>`<article class="finance-week-day ${day.date === TODAY ? 'is-today' : ''}"><header><span>${dayName(day.date)}</span><strong>${fmt(day.date)}</strong></header><div class="week-vehicle-list">${day.rows.length ? day.rows.map(vehicleCard).join('') : '<p class="empty-mini">Sem faturamento previsto.</p>'}</div><footer><span>Total do dia</span><strong>${money(day.total)}</strong></footer></article>`).join('')}</div></section>`;
  }

  function upcomingLists() {
    const next7 = addDays(TODAY, 7);
    const rec = d().contasReceber.filter(active);
    const pag = d().contasPagar.filter(active);
    const lineRec = (x) => [x.pagador, osLabel(x.osId), money(pending(x, 'receber')), fmt(x.vencimento), badge(x.status), `<button class="btn btn-secondary btn-sm" data-open-fin-modal="receber-baixa" data-account="${x.id}">Baixar</button>`];
    const linePag = (x) => [byId(d().fornecedores, x.fornecedorId).nome || x.fornecedor || '—', x.compraId || x.categoria, money(pending(x, 'pagar')), fmt(x.vencimento), badge(x.status), `<button class="btn btn-secondary btn-sm" data-open-fin-modal="pagar-baixa" data-account="${x.id}">Pagar</button>`];
    return `<section class="section finance-upcoming-section"><div class="section-header"><div><h3>Próximos vencimentos</h3><p class="muted">Tabelas compactas para leitura sem rolagem desnecessária.</p></div></div><div class="grid grid-2 finance-due-grid"><article class="card compact-density"><h4>Receber - hoje e próximos 7 dias</h4>${c().table(['Pagador','OS','Saldo','Vencimento','Status','Ação'], rec.filter((x)=>x.vencimento>=TODAY&&x.vencimento<=next7&&pending(x,'receber')>0).map(lineRec))}</article><article class="card compact-density"><h4>Pagar - hoje e próximos 7 dias</h4>${c().table(['Fornecedor','Origem','Saldo','Vencimento','Status','Ação'], pag.filter((x)=>x.vencimento>=TODAY&&x.vencimento<=next7&&pending(x,'pagar')>0).map(linePag))}</article><article class="card compact-density"><h4>Vencidos a receber</h4>${c().table(['Pagador','OS','Saldo','Vencimento','Status','Ação'], rec.filter((x)=>isOverdue({...x,tipo:'receber'})).map(lineRec))}</article><article class="card compact-density"><h4>Vencidos a pagar</h4>${c().table(['Fornecedor','Origem','Saldo','Vencimento','Status','Ação'], pag.filter((x)=>isOverdue({...x,tipo:'pagar'})).map(linePag))}</article></div></section>`;
  }

  function renderReceivables() {
    const rows = d().contasReceber;
    const cards = kpis([
      {label:'Em aberto', value:money(sum(rows.filter((x)=>pending(x,'receber')>0 && !String(x.status).includes('Parcial')).map((x)=>({valor:pending(x,'receber')}))))},
      {label:'Parcialmente recebidas', value:rows.filter((x)=>String(x.status).toLowerCase().includes('parcial')).length}, {label:'Recebidas', value:rows.filter((x)=>String(x.status).toLowerCase().includes('recebida')).length},
      {label:'Vencidas', value:rows.filter((x)=>isOverdue({...x,tipo:'receber'})).length, kind:'vencido'}, {label:'A vencer', value:rows.filter((x)=>x.vencimento>=TODAY&&pending(x,'receber')>0).length},
      {label:'Valor bruto', value:money(sum(rows.filter(active),'valorBruto'))}, {label:'Taxas previstas', value:money(sum(rows.filter(active),'taxa'))}, {label:'Valor líquido previsto', value:money(sum(rows.filter(active),'valorLiquido'))}
    ]);
    return `${header('Contas a receber', 'Recebíveis por contas, parcelas e pagadores com múltiplos pagadores por OS.', '<button class="btn btn-primary" data-open-fin-modal="receber">Nova conta a receber</button><button class="btn btn-secondary" data-open-fin-modal="receber-baixa">Registrar recebimento</button>')}<p class="muted">Total encontrado: <strong>${rows.length}</strong></p>${cards}${listFilters('receber')}<div class="tabs" data-fin-tabs><button class="tab active" data-mode="contas">Contas</button><button class="tab" data-mode="parcelas">Parcelas</button><button class="tab" data-mode="pagadores">Pagadores</button></div><section class="card" data-fin-list>${receivableTable('contas')}</section>${financeModalMarkup()}`;
  }

  function renderPayables() {
    const rows = d().contasPagar;
    const cards = kpis([
      {label:'Em aberto', value:money(sum(rows.filter((x)=>pending(x,'pagar')>0).map((x)=>({valor:pending(x,'pagar')}))))}, {label:'Parcialmente pagas', value:rows.filter((x)=>String(x.status).toLowerCase().includes('parcial')).length}, {label:'Pagas', value:rows.filter((x)=>String(x.status).toLowerCase().includes('paga')).length},
      {label:'Vencidas', value:rows.filter((x)=>isOverdue({...x,tipo:'pagar'})).length, kind:'vencido'}, {label:'A vencer', value:rows.filter((x)=>x.vencimento>=TODAY&&pending(x,'pagar')>0).length},
      {label:'Total previsto', value:money(sum(rows.filter(active).map((x)=>({valor:accountTotal(x)}))))}, {label:'Total pago', value:money(sum(rows.map((x)=>({valor:paid(x)}))))}, {label:'Saldo pendente', value:money(sum(rows.map((x)=>({valor:pending(x,'pagar')}))))}
    ]);
    return `${header('Contas a pagar', 'Obrigações confirmadas ou previstas, integradas a compras e OS.', '<button class="btn btn-primary" data-open-fin-modal="pagar">Nova conta a pagar</button><button class="btn btn-secondary" data-open-fin-modal="pagar-baixa">Registrar pagamento</button>')}<p class="muted">Total encontrado: <strong>${rows.length}</strong></p>${cards}${listFilters('pagar')}<div class="tabs" data-fin-tabs><button class="tab active" data-mode="contas">Contas</button><button class="tab" data-mode="parcelas">Parcelas</button><button class="tab" data-mode="fornecedores">Fornecedores</button><button class="tab" data-mode="categorias">Categorias</button></div><section class="card" data-fin-list>${payableTable('contas')}</section>${financeModalMarkup()}`;
  }

  function listFilters(type) { return `<section class="card filters-panel"><div class="form-grid"><label class="form-field"><span>Pesquisa livre</span><input class="input" data-list-search placeholder="Conta, pagador, OS, placa, veículo, descrição ou sinistro"></label><label class="form-field"><span>Status</span><select class="select" data-list-status><option value="todos">Todos</option><option>vencida</option><option>parcialmente ${type==='receber'?'recebida':'paga'}</option><option>${type==='receber'?'recebida':'paga'}</option><option>cancelada</option><option>estornada</option></select></label><label class="form-field"><span>Forma de pagamento</span><select class="select"><option>Todas</option><option>Pix</option><option>Boleto</option><option>Cartão de crédito</option><option>Transferência</option></select></label><label class="form-field"><span>Valor mínimo</span><input class="input" type="number" value="0"></label><label class="form-field"><span>Valor máximo</span><input class="input" type="number" value="20000"></label><label class="form-field"><span>Responsável</span><select class="select"><option>Todos</option><option>Caio Dicieri</option><option>Marina Lopes</option><option>Rafael Santos</option></select></label><div class="form-actions"><button class="btn btn-primary" data-apply-list-filter>Aplicar filtros</button><button class="btn btn-secondary" data-clear-list-filter>Limpar</button></div></div><p class="muted">Filtros cobrem pagador/fornecedor, compra, OS, placa, veículo, status, vencimento, período, vencidas, parciais, origem e responsável.</p></section>`; }

  function receivableTable(mode) {
    if (mode === 'parcelas') return c().table(['Parcela','Conta','Pagador','OS','Vencimento','Valor bruto','Taxa','Valor líquido','Recebido','Saldo','Status','Ações'], d().parcelasFinanceiras.filter((p)=>p.tipo==='receber').map((p)=>{ const a=byId(d().contasReceber,p.contaId); return [p.numero,p.contaId,a.pagador,osLabel(a.osId),fmt(p.vencimento),money(p.valorBruto),money(p.taxa),money(p.valorLiquido),money(p.valorRealizado),money(Math.max(0,p.valorLiquido-p.valorRealizado)),badge(p.status),`<button class="btn btn-secondary" data-open-fin-modal="receber-baixa">Receber</button>`]; }));
    if (mode === 'pagadores') { const map = {}; d().contasReceber.forEach((a)=>{ map[a.pagador] ||= {q:0,total:0,rec:0,pend:0,venc:0,last:'—'}; map[a.pagador].q++; map[a.pagador].total+=a.valorLiquido; map[a.pagador].rec+=received(a); map[a.pagador].pend+=pending(a,'receber'); if(isOverdue({...a,tipo:'receber'})) map[a.pagador].venc+=pending(a,'receber'); map[a.pagador].last=a.ultimaMovimentacao || a.emissao; }); return c().table(['Pagador','Contas','Valor total','Recebido','Pendente','Vencido','Última movimentação','Ações'], Object.entries(map).map(([k,v])=>[k,v.q,money(v.total),money(v.rec),money(v.pend),money(v.venc),fmt(v.last),'<button class="btn btn-secondary" data-toast-demo>Abrir</button>'])); }
    return c().table(['Conta','Pagador','Descrição','OS','Placa','Valor bruto','Taxas','Valor líquido','Vencimento','Recebido','Saldo','Status','Ações'], d().contasReceber.map((a)=>[a.id,a.pagador,a.descricao,osLabel(a.osId),vehicleLabel(a.osId),money(a.valorBruto),money(a.taxa),money(a.valorLiquido),fmt(a.vencimento),money(received(a)),money(pending(a,'receber')),badge(a.status),`<button class="btn btn-secondary" data-open-fin-modal="receber-baixa" data-account="${a.id}">Baixar</button>`]));
  }

  function payableTable(mode) {
    if (mode === 'parcelas') return c().table(['Parcela','Conta','Fornecedor','Vencimento','Valor','Pago','Saldo','Status','Ações'], d().parcelasFinanceiras.filter((p)=>p.tipo==='pagar').map((p)=>{ const a=byId(d().contasPagar,p.contaId); return [p.numero,p.contaId,byId(d().fornecedores,a.fornecedorId).nome || a.fornecedor,fmt(p.vencimento),money(p.valorLiquido),money(p.valorRealizado),money(Math.max(0,p.valorLiquido-p.valorRealizado)),badge(p.status),`<button class="btn btn-secondary" data-open-fin-modal="pagar-baixa">Pagar</button>`]; }));
    if (mode === 'fornecedores') { const map = {}; d().contasPagar.forEach((a)=>{ const k=byId(d().fornecedores,a.fornecedorId).nome||a.fornecedor||'Sem fornecedor'; map[k] ||= {q:0,total:0,pago:0,pend:0,venc:0}; map[k].q++; map[k].total+=accountTotal(a); map[k].pago+=paid(a); map[k].pend+=pending(a,'pagar'); if(isOverdue({...a,tipo:'pagar'})) map[k].venc+=pending(a,'pagar'); }); return c().table(['Fornecedor','Contas','Valor total','Pago','Pendente','Vencido','Ações'], Object.entries(map).map(([k,v])=>[k,v.q,money(v.total),money(v.pago),money(v.pend),money(v.venc),'<button class="btn btn-secondary" data-toast-demo>Abrir</button>'])); }
    if (mode === 'categorias') { const total = sum(d().contasPagar.filter(active).map((x)=>({valor:accountTotal(x)}))) || 1; const map = {}; d().contasPagar.forEach((a)=>{ const k=a.categoria||'outros'; map[k] ||= {q:0,prev:0,real:0,pend:0}; map[k].q++; map[k].prev+=accountTotal(a); map[k].real+=paid(a); map[k].pend+=pending(a,'pagar'); }); return c().table(['Categoria','Quantidade','Previsto','Realizado','Pendente','Percentual do total'], Object.entries(map).map(([k,v])=>[k,v.q,money(v.prev),money(v.real),money(v.pend),`${Math.round(v.prev/total*100)}%`])); }
    return c().table(['Conta','Fornecedor','Descrição','Compra ou OS','Categoria','Valor','Vencimento','Pago','Saldo','Status','Ações'], d().contasPagar.map((a)=>[a.id,byId(d().fornecedores,a.fornecedorId).nome || a.fornecedor,a.descricao,a.compraId || osLabel(a.osId),a.categoria || '—',money(accountTotal(a)),fmt(a.vencimento),money(paid(a)),money(pending(a,'pagar')),badge(a.status),`<button class="btn btn-secondary" data-open-fin-modal="pagar-baixa" data-account="${a.id}">Pagar</button>`]));
  }

  function renderCashflow() {
    const days = Array.from({ length: 30 }, (_, i) => `2026-06-${String(i+1).padStart(2,'0')}`);
    let accPrev = 18500, accReal = 18500;
    const rows = days.map((date) => {
      const ep = sum(d().contasReceber.filter((x)=>active(x)&&x.vencimento===date),'valorLiquido');
      const sp = sum(d().contasPagar.filter((x)=>active(x)&&x.vencimento===date).map((x)=>({valor:accountTotal(x)})));
      const er = sum(d().baixasFinanceiras.filter((x)=>x.tipo==='recebimento'&&x.status!=='estornada'&&x.data===date),'valorLiquido');
      const sr = sum(d().baixasFinanceiras.filter((x)=>x.tipo==='pagamento'&&x.status!=='estornada'&&x.data===date),'valorLiquido');
      accPrev += ep - sp; accReal += er - sr;
      const isToday = date === TODAY;
      return `<article class="cash-day ${isToday?'is-today':''} ${accReal<0?'negative':''}"><header><span>${isToday ? 'Hoje' : 'Dia'}</span><strong>${date.slice(-2)}</strong></header><div class="cash-day-values"><div class="cash-value previsto"><span>Previsto</span><strong>${money(ep - sp)}</strong><small><b class="entrada">+${money(ep)}</b> <b class="saida">-${money(sp)}</b></small></div><div class="cash-value realizado"><span>Real</span><strong>${money(er - sr)}</strong><small><b class="entrada">+${money(er)}</b> <b class="saida">-${money(sr)}</b></small></div></div><footer><small>Saldo prev. <b>${money(accPrev)}</b></small><small>Saldo real <b>${money(accReal)}</b></small></footer></article>`;
    }).join('');
    const m = metrics();
    return `${header('Fluxo de caixa', 'Linha do tempo mensal com entradas, saídas, previsto, realizado e saldo acumulado para decisão diária.', '<button class="btn btn-secondary" data-month-prev>Mês anterior</button><button class="btn btn-primary" data-today>Hoje</button><button class="btn btn-secondary" data-month-next>Próximo mês</button>')}<section class="card finance-filters"><div class="toolbar"><input class="input" type="month" value="2026-06"><button class="btn btn-secondary" data-toast-demo>Filtros</button><button class="btn btn-secondary" data-toggle-class="show-previsto">Alternar previsto</button><button class="btn btn-secondary" data-toggle-class="show-realizado">Alternar realizado</button><button class="btn btn-secondary" data-toast-demo>Zoom</button></div></section>${cashflowCards(m)}<section class="card cashflow-board-card"><div class="section-header"><div><h3>Fluxo diário de junho</h3><p class="muted">O dia atual fica em destaque para conferência de caixa, previsto e realizado.</p></div></div><div class="cashflow-timeline">${rows}</div></section>${cashflowAux()}`;
  }

  function cashflowCards(m) {
    const vencRec = d().contasReceber.filter((x)=>isOverdue({...x,tipo:'receber'}));
    const vencPag = d().contasPagar.filter((x)=>isOverdue({...x,tipo:'pagar'}));
    const recVencido = sum(vencRec.map((x)=>({ valor:pending(x, 'receber') })));
    const pagVencido = sum(vencPag.map((x)=>({ valor:pending(x, 'pagar') })));
    const card = (label, value, note, kind = '') => `<article class="finance-area-card ${kind}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
    return `<section class="cashflow-area-grid">
      <article class="card finance-area"><div class="section-header"><div><h3>Entradas</h3><p class="muted">Recebíveis previstos e realizados.</p></div></div><div class="finance-area-cards">${card('Previstas', money(m.receitasPrev), 'contas a receber no período', 'in')}${card('Realizadas', money(m.receitasReal), 'baixas confirmadas', 'in')}${card('A realizar', money(Math.max(0, m.receitasPrev - m.receitasReal)), 'diferença prevista', 'balance')}</div></article>
      <article class="card finance-area"><div class="section-header"><div><h3>Saídas</h3><p class="muted">Pagamentos previstos e baixados.</p></div></div><div class="finance-area-cards">${card('Previstas', money(m.despesasPrev), 'contas a pagar no período', 'out')}${card('Realizadas', money(m.despesasReal), 'pagamentos efetuados', 'out')}${card('A pagar', money(Math.max(0, m.despesasPrev - m.despesasReal)), 'saldo operacional', 'balance')}</div></article>
      <article class="card finance-area"><div class="section-header"><div><h3>Saldo</h3><p class="muted">Resultado líquido para gestão do caixa.</p></div></div><div class="finance-area-cards">${card('Saldo previsto', money(m.receitasPrev - m.despesasPrev), 'entradas menos saídas', 'balance')}${card('Saldo realizado', money(m.receitasReal - m.despesasReal), 'realizado no período', 'balance')}${card('Variação', money((m.receitasReal - m.despesasReal) - (m.receitasPrev - m.despesasPrev)), 'real x previsto', 'balance')}</div></article>
      <article class="card finance-area finance-overdue-area"><div class="section-header"><div><h3>Risco imediato</h3><p class="muted">Vencidos que exigem ação financeira.</p></div></div><div class="finance-area-cards">${card('Vencidos a receber', vencRec.length, money(recVencido), 'danger')}${card('Vencidos a pagar', vencPag.length, money(pagVencido), 'danger')}${card('Exposição', money(recVencido - pagVencido), 'receber vencido menos pagar vencido', 'balance')}</div></article>
    </section>`;
  }

  function renderFixedCosts() {
    ensureFixedCosts();
    const rows = d().custosFixos.filter(activeFixedCost);
    const variaveis = rows.filter((x)=>x.variavel);
    const aConfirmar = rows.filter((x)=>String(x.status).toLowerCase().includes('confirmar') || Number(x.valorConfirmado || 0) <= 0);
    const previstos = sum(rows, 'valorPrevisto');
    const confirmados = sum(rows.filter((x)=>Number(x.valorConfirmado || 0) > 0), 'valorConfirmado');
    const semanal = rows.filter((x)=>x.frequencia === 'Semanal');
    return `${header('Custos fixos', 'Controle simples de despesas recorrentes, valores variáveis, frequência e geração de contas a pagar.', '<button class="btn btn-primary" data-fixed-cost-save>Novo custo fixo</button>')}<section class="fixed-cost-shell">
      <section class="cashflow-area-grid fixed-cost-kpis">
        <article class="card finance-area"><div class="section-header"><div><h3>Compromisso mensal</h3><p class="muted">Base prevista para o caixa.</p></div></div><div class="finance-area-cards"><article class="finance-area-card out"><span>Total previsto</span><strong>${money(previstos)}</strong><small>${rows.length} custos ativos</small></article><article class="finance-area-card in"><span>Total confirmado</span><strong>${money(confirmados)}</strong><small>valores validados</small></article><article class="finance-area-card balance"><span>Diferença</span><strong>${money(confirmados - previstos)}</strong><small>confirmado x previsto</small></article></div></article>
        <article class="card finance-area"><div class="section-header"><div><h3>Valores variáveis</h3><p class="muted">Custos fixos que precisam conferência.</p></div></div><div class="finance-area-cards"><article class="finance-area-card danger"><span>A confirmar</span><strong>${aConfirmar.length}</strong><small>${money(sum(aConfirmar, 'valorPrevisto'))}</small></article><article class="finance-area-card out"><span>Variáveis</span><strong>${variaveis.length}</strong><small>energia, VT, consumo</small></article><article class="finance-area-card balance"><span>Semanais</span><strong>${semanal.length}</strong><small>pagamentos por dia da semana</small></article></div></article>
      </section>
      ${fixedCostForm()}
      <section class="card fixed-cost-table-card"><div class="section-header"><div><h3>Tabela de custos fixos</h3><p class="muted">Edite previsto, confirme valor real e acompanhe frequência e lançamento.</p></div><button class="btn btn-secondary" data-toast-demo>Exportar tabela</button></div>${fixedCostsTable(rows)}</section>
      <section class="grid grid-2 fixed-cost-support"><article class="card"><h3>Próximas ocorrências</h3>${fixedCostOccurrences(rows)}</article><article class="card"><h3>Regras de frequência</h3><div class="fixed-frequency-list">${['Mensal: usar dia fixo do mês para aluguel, energia, internet e contabilidade.','Semanal: usar dia da semana para vale transporte, limpeza e rotinas recorrentes.','Quinzenal: útil para adiantamentos ou fornecedores com duas cobranças no mês.','Anual: seguros, alvarás, licenças e contratos pagos uma vez por ano.'].map((x)=>`<p>${x}</p>`).join('')}</div></article></section>
    </section>${financeModalMarkup()}`;
  }

  function activeFixedCost(item) { return !['inativo','cancelado'].includes(String(item.status).toLowerCase()); }

  function fixedCostForm() {
    return `<section class="card fixed-cost-form-card"><div class="section-header"><div><h3>Novo custo fixo</h3><p class="muted">Cadastre recorrência, vencimento e se o valor exige confirmação.</p></div></div><div class="form-grid fixed-cost-form" data-fixed-cost-form>
      <label class="form-field"><span>Nome do custo</span><input class="input" name="nome" value="Água e esgoto"></label>
      <label class="form-field"><span>Categoria</span><select class="select" name="categoria"><option>Utilidades</option><option>Ocupação</option><option>Pessoal</option><option>Administrativo</option><option>Operacional</option><option>Impostos</option></select></label>
      <label class="form-field"><span>Fornecedor</span><input class="input" name="fornecedor" value="Sabesp"></label>
      <label class="form-field"><span>Valor previsto</span><input class="input" type="number" name="valorPrevisto" value="420" min="0" step="0.01"></label>
      <label class="form-field"><span>Valor confirmado</span><input class="input" type="number" name="valorConfirmado" value="0" min="0" step="0.01"></label>
      <label class="form-field"><span>Próximo vencimento</span><input class="input" type="date" name="vencimento" value="2026-06-25"></label>
      <label class="form-field"><span>Frequência</span><select class="select" name="frequencia"><option>Mensal</option><option>Semanal</option><option>Quinzenal</option><option>Anual</option><option>Avulso recorrente</option></select></label>
      <label class="form-field"><span>Regra</span><input class="input" name="regra" value="Dia 25 de cada mês"></label>
      <label class="checkline"><input type="checkbox" name="variavel" checked> Valor precisa confirmação</label>
      <label class="form-field"><span>Responsável</span><select class="select" name="responsavel"><option>Caio Dicieri</option><option>Marina Lopes</option><option>Rafael Santos</option></select></label>
      <label class="form-field wide"><span>Observação</span><input class="input" name="observacao" value="Conta recorrente com variação conforme consumo."></label>
    </div></section>`;
  }

  function fixedCostsTable(rows) {
    const tableRows = rows.map((x)=>[
      `<strong>${x.nome}</strong><br><small class="muted">${x.id} · ${x.categoria}</small>`,
      x.fornecedor,
      money(x.valorPrevisto),
      `<input class="input fixed-money-input" type="number" value="${Number(x.valorConfirmado || 0).toFixed(2)}" step="0.01" min="0" data-fixed-confirm-input="${x.id}">`,
      fmt(x.vencimento),
      `${x.frequencia}<br><small class="muted">${x.regra}</small>`,
      x.variavel ? '<span class="badge warning">Confirmar valor</span>' : '<span class="badge success">Valor fixo</span>',
      badge(x.status),
      x.contaPagarId || '<span class="muted">Não lançada</span>',
      `<div class="table-actions"><button class="btn btn-secondary btn-sm" data-fixed-confirm="${x.id}">Confirmar valor</button><button class="btn btn-secondary btn-sm" data-fixed-payable="${x.id}">Gerar conta</button><button class="btn btn-secondary btn-sm" data-toast-demo>Editar regra</button></div>`
    ]);
    return c().table(['Custo','Fornecedor','Previsto','Confirmado','Vencimento','Frequência','Tipo','Status','Conta a pagar','Ações'], tableRows);
  }

  function fixedCostOccurrences(rows) {
    const occurrences = rows
      .slice()
      .sort((a,b)=>a.vencimento.localeCompare(b.vencimento))
      .slice(0, 8)
      .map((x)=>[fmt(x.vencimento), x.nome, x.frequencia, money(Number(x.valorConfirmado || 0) || x.valorPrevisto), badge(x.status)]);
    return c().table(['Data','Custo','Frequência','Valor','Status'], occurrences);
  }

  function cashflowAux() {
    const rec = d().contasReceber.filter((x)=>isOverdue({...x,tipo:'receber'})).map((x)=>[x.id,x.pagador,osLabel(x.osId),fmt(x.vencimento),money(pending(x,'receber')),`${daysBetween(x.vencimento)} dias`,'<button class="btn btn-secondary" data-toast-demo>Cobrar</button>']);
    const pag = d().contasPagar.filter((x)=>isOverdue({...x,tipo:'pagar'})).map((x)=>[x.id,byId(d().fornecedores,x.fornecedorId).nome||x.fornecedor,x.compraId||x.categoria,fmt(x.vencimento),money(pending(x,'pagar')),`${daysBetween(x.vencimento)} dias`,'<button class="btn btn-secondary" data-toast-demo>Pagar</button>']);
    return `<section class="grid grid-2"><article class="card"><h3>Entradas previstas até hoje não recebidas</h3>${c().table(['Conta','Pagador','OS','Vencimento','Valor','Atraso','Ação'], rec)}</article><article class="card"><h3>Saídas previstas até hoje não pagas</h3>${c().table(['Conta','Fornecedor','Compra/categoria','Vencimento','Valor','Atraso','Ação'], pag)}</article><article class="card"><h3>Próximos 15 dias</h3><p>Entradas: <strong>${money(sum(d().contasReceber.filter((x)=>x.vencimento>TODAY&&x.vencimento<=addDays(TODAY,15)),'valorLiquido'))}</strong></p><p>Saídas: <strong>${money(sum(d().contasPagar.filter((x)=>x.vencimento>TODAY&&x.vencimento<=addDays(TODAY,15)).map((x)=>({valor:accountTotal(x)}))))}</strong></p><p>Saldo projetado: <strong>${money(sum(d().contasReceber.filter((x)=>x.vencimento>TODAY&&x.vencimento<=addDays(TODAY,15)),'valorLiquido')-sum(d().contasPagar.filter((x)=>x.vencimento>TODAY&&x.vencimento<=addDays(TODAY,15)).map((x)=>({valor:accountTotal(x)}))))}</strong></p></article></section>`;
  }

  function renderRules() { return `${header('Regras de pagamento', 'Prazos, parcelas, formas de pagamento e taxas fictícias para simulação.', '<button class="btn btn-primary" data-toast-demo>Nova regra</button>')}<section class="grid grid-2"><article class="card"><h3>Regras</h3>${c().table(['Nome','Tipo','Prazo','Dia fixo','Parcelas','Intervalo','Forma','Taxa','Responsável','Status'], d().regrasPagamento.map((r)=>[r.nome,r.tipo,`${r.prazo} dias`,r.diaFixo||'—',r.parcelas,r.intervalo?`${r.intervalo} dias`:'—',r.formaPagamento,`${r.taxaPercentual}%`,r.responsavel,badge(r.ativa?'Ativa':'Inativa')]))}</article><article class="card"><h3>Taxas de cartão</h3>${c().table(['Modalidade','Percentual','Tarifa fixa','Prazo recebimento','Ativa','Observação'], d().taxasCartao.map((t)=>[t.nome,`${t.percentual}%`,money(t.tarifaFixa),`${t.prazoRecebimento} dias`,badge(t.ativa?'Ativa':'Inativa'),t.observacao]))}<div class="finance-formula"><strong>Exemplo:</strong> R$ 1.000,00 - 3,49% - R$ 0,00 = <strong>R$ 965,10</strong>. A alteração de forma/parcelas recalcula taxa, líquido e fórmula antes da confirmação.</div></article></section>`; }

  function renderProfitability() {
    const rows = d().rentabilidadeOS.map((r)=>[osLabel(r.osId),vehicleLabel(r.osId).split(' · ')[0],vehicleLabel(r.osId).split(' · ')[1]||'—',r.cliente,r.seguradora,money(r.receitaAprovada),money(r.receitaLiquida),money(r.custoEstimado),money(r.custoReal),money(r.lucroEstimado),money(r.lucroRealizado),`${r.margem}%`,badge(r.statusFinanceiro),r.pendencias.join(', ')||'Sem pendências',`<button class="btn btn-secondary" data-close-os="${r.osId}">Fechar financeiramente</button><button class="btn btn-secondary" data-reopen-os="${r.osId}">Reabrir</button>`]);
    return `${header('Rentabilidade por OS', 'Comparativo de lucro estimado, lucro realizado e margem por ordem de serviço.', '<button class="btn btn-secondary" data-toast-demo>Exportar rentabilidade</button>')}${kpis([{label:'Receita total',value:money(sum(d().rentabilidadeOS,'receitaLiquida'))},{label:'Custo total',value:money(sum(d().rentabilidadeOS,'custoReal'))},{label:'Lucro estimado',value:money(sum(d().rentabilidadeOS,'lucroEstimado'))},{label:'Lucro realizado',value:money(sum(d().rentabilidadeOS,'lucroRealizado'))},{label:'Margem média',value:`${Math.round(sum(d().rentabilidadeOS,'margem')/d().rentabilidadeOS.length)}%`},{label:'OS com prejuízo',value:d().rentabilidadeOS.filter((r)=>r.lucroRealizado<0).length,kind:'vencido'},{label:'OS sem fechamento',value:d().rentabilidadeOS.filter((r)=>!r.statusFinanceiro.includes('fechada')).length}])}<section class="card filters-panel"><div class="form-grid"><label class="form-field"><span>Período</span><input class="input" type="month" value="2026-06"></label><label class="form-field"><span>Seguradora</span><select class="select"><option>Todas</option><option>Porto Seguro</option><option>Azul Seguros</option></select></label><label class="form-field"><span>Status</span><select class="select"><option>Todos</option><option>com pendências</option><option>fechada</option><option>entregue</option></select></label><label class="checkline"><input type="checkbox"> Apenas lucro negativo</label><button class="btn btn-primary" data-toast-demo>Aplicar</button></div></section><section class="card">${c().table(['OS','Placa','Veículo','Cliente','Seguradora','Receita aprovada','Receita líquida','Custo estimado','Custo real','Lucro estimado','Lucro realizado','Margem','Status financeiro','Pendências','Ações'], rows)}</section><section class="card"><h3>Histórico financeiro</h3>${historyTimeline()}</section>`;
  }

  function renderCategories() { return `${header('Categorias financeiras', 'Categorias iniciais de receitas e despesas com centro de custo fictício opcional.', '<button class="btn btn-primary" data-toast-demo>Nova categoria</button>')}<section class="card">${c().table(['Nome','Tipo','Ativa','Centro de custo','Descrição','Ações'], d().categoriasFinanceiras.map((cat)=>[cat.nome,cat.tipo,badge(cat.ativa?'Ativa':'Inativa'),cat.centroCusto||'—',cat.descricao,'<button class="btn btn-secondary" data-toast-demo>Editar</button>']))}</section>`; }

  function renderOSFinance(os) {
    ensureSession();
    return renderOSFinancePayments(os);
    const rec = d().contasReceber.filter((x)=>x.osId===os.id);
    const pag = d().contasPagar.filter((x)=>x.osId===os.id || d().compras.find((co)=>co.id===x.compraId)?.osId===os.id || (d().compras.find((co)=>co.id===x.compraId)?.osIds||[]).includes(os.id));
    const rent = d().rentabilidadeOS.find((x)=>x.osId===os.id) || {};
    const receitaLiquida = sum(rec,'valorLiquido'); const recebido = sum(rec.map((x)=>({valor:received(x)}))); const custosPrev = sum(pag.map((x)=>({valor:accountTotal(x)}))); const custosReal = sum(pag.map((x)=>({valor:paid(x)})));
    const pend = [...new Set([...(rent.pendencias||[]), ...rec.filter((x)=>pending(x,'receber')>0).map((x)=>`Saldo a receber ${x.id}`), ...pag.filter((x)=>pending(x,'pagar')>0).map((x)=>`Conta a pagar pendente ${x.id}`)])];
    return `<section class="section finance-os-tab"><div class="grid grid-4">${c().kpiCard({label:'Receita aprovada',value:money(rent.receitaAprovada||os.valor),note:'orçamento aprovado'})}${c().kpiCard({label:'Receita líquida prevista',value:money(receitaLiquida),note:'após taxas'})}${c().kpiCard({label:'Receita recebida',value:money(recebido),note:'realizada'})}${c().kpiCard({label:'Lucro estimado',value:money(receitaLiquida-custosPrev),note:`Margem ${receitaLiquida?Math.round((receitaLiquida-custosPrev)/receitaLiquida*100):0}%`})}${c().kpiCard({label:'Lucro realizado provisório',value:money(recebido-custosReal),note:'não definitivo com pendências'})}${c().kpiCard({label:'Margem realizada',value:`${recebido?Math.round((recebido-custosReal)/recebido*100):0}%`,note:'estrutura para custos/hora futura'})}</div>${pend.length?`<div class="alert-inline">Lucro realizado não é definitivo: ${pend.join('; ')}.</div>`:''}<article class="card"><h3>Receitas por pagador, conta e parcela</h3>${receivableTableForOS(os.id)}</article><article class="card"><h3>Custos vinculados</h3>${c().table(['Conta','Fornecedor','Compra/OS','Categoria','Previsto','Realizado','Saldo','Status'], pag.map((x)=>[x.id,byId(d().fornecedores,x.fornecedorId).nome||x.fornecedor,x.compraId||osLabel(x.osId),x.categoria||'—',money(accountTotal(x)),money(paid(x)),money(pending(x,'pagar')),badge(x.status)]))}</article><article class="card"><h3>Edição financeira rápida</h3><div class="form-grid compact"><label class="check-field"><input type="checkbox" ${recebido>0?'checked':''}> Foi pago/recebido?</label><label class="form-field"><span>Data de pagamento</span><input class="input" type="date" value="2026-06-11"></label><label class="form-field"><span>Meio de pagamento</span><select class="select"><option>Pix</option><option>Boleto</option><option>Cartão</option><option>Transferência</option><option>Dinheiro</option></select></label><label class="form-field wide"><span>Observações financeiras</span><textarea class="input">Conferência financeira visual da OS.</textarea></label></div></article><article class="card"><h3>Pendências e fechamento financeiro</h3>${pend.length?`<ul>${pend.map((p)=>`<li>${p}</li>`).join('')}</ul>`:'<p>Sem pendências relevantes.</p>'}<button class="btn btn-primary" data-close-os="${os.id}">Fechar financeiramente</button><button class="btn btn-secondary" data-reopen-os="${os.id}">Reabrir fechamento</button></article><article class="card"><h3>Histórico financeiro</h3>${historyTimeline(os.id)}</article></section>`;
  }

  function receivableTableForOS(osId) { return c().table(['Conta','Pagador','Parcelas','Bruto','Taxas','Líquido','Recebido','Pendente','Vencido','Status'], d().contasReceber.filter((x)=>x.osId===osId).map((x)=>[x.id,x.pagador,d().parcelasFinanceiras.filter((p)=>p.contaId===x.id).length,money(x.valorBruto),money(x.taxa),money(x.valorLiquido),money(received(x)),money(pending(x,'receber')),isOverdue({...x,tipo:'receber'})?money(pending(x,'receber')):'—',badge(x.status)])); }

  function historyTimeline(osId) { const items = (d().historicoFinanceiro || []).filter((h)=>!osId || h.osId===osId).slice(0, 16); return `<div class="timeline">${items.map((h)=>`<div class="timeline-item"><strong>${fmt(h.data.slice(0,10))} ${h.data.slice(11,16)} · ${h.tipo}</strong><p>${h.descricao}</p><small>${h.usuario} · ${h.registro} · anterior: ${h.valorAnterior || '—'} · novo: ${h.valorNovo || '—'}</small></div>`).join('')}</div>`; }

  function financeModalMarkup() { return `<div class="modal-backdrop" id="financeActionModal"><div class="modal modal-large"><button class="modal-close" data-modal-close>×</button><h3 data-fin-modal-title>Operação financeira simulada</h3><div class="finance-modal-body"><div class="form-grid"><label class="form-field"><span>Origem</span><select class="select"><option>OS</option><option>compra</option><option>complemento</option><option>lançamento manual</option><option>ajuste</option></select></label><label class="form-field"><span>Registro</span><input class="input" value="OS 1042"></label><label class="form-field"><span>Pagador/fornecedor</span><input class="input" value="Porto Seguro"></label><label class="form-field"><span>Valor bruto</span><input class="input" type="number" value="1000" data-gross></label><label class="form-field"><span>Forma de pagamento</span><select class="select" data-payment-method><option>Pix</option><option>Cartão de crédito</option><option>Boleto</option><option>Transferência</option></select></label><label class="form-field"><span>Parcelas</span><input class="input" type="number" value="3" min="1" data-installments></label><label class="form-field"><span>Taxa real / prevista</span><input class="input" type="number" value="3.49" step="0.01" data-fee></label><label class="form-field"><span>Tarifa fixa</span><input class="input" type="number" value="0" step="0.01" data-fixed-fee></label><label class="form-field"><span>Valor líquido</span><input class="input" value="965,10" data-net></label><label class="form-field wide"><span>Observação / justificativa</span><textarea class="input">Cálculo revisado antes da confirmação. Ajuste manual exige justificativa.</textarea></label></div><div class="finance-formula" data-formula>Fórmula: R$ 1.000,00 - 3,49% - R$ 0,00 = R$ 965,10</div><h4>Parcelas geradas</h4><div class="table-wrap"><table class="table"><tbody data-installment-preview></tbody></table></div><div class="form-actions"><button class="btn btn-primary" data-confirm-finance>Confirmar simulação</button><button class="btn btn-secondary" data-storno>Registrar estorno</button><button class="btn btn-secondary" data-modal-close>Cancelar</button></div></div></div></div>`; }

  function bindFinance(root, file) {
    root.querySelectorAll('[data-open-fin-modal]').forEach((btn)=>btn.addEventListener('click',()=>{ const modal=document.querySelector('#financeActionModal'); if(!modal) return; modal.classList.add('is-open'); modal.querySelector('[data-fin-modal-title]').textContent = btn.dataset.openFinModal.includes('pagar') ? 'Conta a pagar / pagamento simulado' : 'Conta a receber / recebimento simulado'; updateFormula(modal); }));
    root.querySelectorAll('[data-gross],[data-fee],[data-fixed-fee],[data-installments],[data-payment-method]').forEach((field)=>field.addEventListener('input',()=>updateFormula(field.closest('.modal-backdrop'))));
    root.querySelectorAll('[data-confirm-finance]').forEach((btn)=>btn.addEventListener('click',()=>{ simulateFinance(btn.closest('.modal-backdrop')); }));
    root.querySelectorAll('[data-storno]').forEach((btn)=>btn.addEventListener('click',()=>{ d().historicoFinanceiro.unshift({data:'2026-06-12T11:20:00',usuario:'Caio Dicieri',tipo:'estorno',descricao:'Estorno simulado registrado e saldo reaberto quando aplicável.',valorAnterior:'baixado',valorNovo:'pendente',registro:'ESTORNO-SIM',osId:'os-1042'}); toast('Estorno registrado no histórico financeiro.'); }));
    root.querySelectorAll('[data-fin-tabs] .tab').forEach((tab)=>tab.addEventListener('click',()=>{ root.querySelectorAll('[data-fin-tabs] .tab').forEach((x)=>x.classList.remove('active')); tab.classList.add('active'); const box=root.querySelector('[data-fin-list]'); if(box) box.innerHTML = file==='contas-pagar.html' ? payableTable(tab.dataset.mode) : receivableTable(tab.dataset.mode); }));
    root.querySelectorAll('[data-apply-period],[data-clear-period],[data-apply-list-filter],[data-clear-list-filter],[data-export],[data-month-prev],[data-month-next],[data-today],[data-toggle-class]').forEach((btn)=>btn.addEventListener('click',()=>toast('Ação aplicada no protótipo com dados fictícios sincronizados.')));
    root.querySelectorAll('[data-close-os]').forEach((btn)=>btn.addEventListener('click',()=>closeOS(btn.dataset.closeOs)));
    root.querySelectorAll('[data-reopen-os]').forEach((btn)=>btn.addEventListener('click',()=>reopenOS(btn.dataset.reopenOs)));
    root.querySelectorAll('[data-fixed-cost-save]').forEach((btn)=>btn.addEventListener('click',()=>addFixedCost(root)));
    root.querySelectorAll('[data-fixed-confirm]').forEach((btn)=>btn.addEventListener('click',()=>confirmFixedCost(btn.dataset.fixedConfirm, root)));
    root.querySelectorAll('[data-fixed-payable]').forEach((btn)=>btn.addEventListener('click',()=>createFixedCostPayable(btn.dataset.fixedPayable)));
    root.querySelectorAll('[data-toast-demo]').forEach((btn)=>btn.addEventListener('click',()=>toast('Ação simulada registrada.')));
  }

  function fixedCostValue(root, name) {
    const field = root.querySelector(`[data-fixed-cost-form] [name="${name}"]`);
    if (!field) return '';
    return field.type === 'checkbox' ? field.checked : field.value;
  }

  function addFixedCost(root) {
    ensureFixedCosts();
    const id = `CF-${Date.now().toString().slice(-5)}`;
    const value = Number(fixedCostValue(root, 'valorConfirmado') || 0);
    d().custosFixos.unshift({
      id,
      nome: fixedCostValue(root, 'nome') || 'Novo custo fixo',
      categoria: fixedCostValue(root, 'categoria') || 'Administrativo',
      fornecedor: fixedCostValue(root, 'fornecedor') || 'A definir',
      valorPrevisto: Number(fixedCostValue(root, 'valorPrevisto') || 0),
      valorConfirmado: value,
      vencimento: fixedCostValue(root, 'vencimento') || TODAY,
      frequencia: fixedCostValue(root, 'frequencia') || 'Mensal',
      regra: fixedCostValue(root, 'regra') || 'A definir',
      variavel: Boolean(fixedCostValue(root, 'variavel')),
      status: value > 0 ? 'Confirmado' : 'Previsto',
      responsavel: fixedCostValue(root, 'responsavel') || 'Caio Dicieri',
      contaPagarId: '',
      observacao: fixedCostValue(root, 'observacao') || ''
    });
    toast('Custo fixo adicionado à tabela.');
    render('custos-fixos.html');
  }

  function confirmFixedCost(id, root) {
    ensureFixedCosts();
    const item = d().custosFixos.find((x)=>x.id === id);
    if (!item) return;
    const input = root.querySelector(`[data-fixed-confirm-input="${id}"]`);
    const value = Number(input?.value || item.valorConfirmado || item.valorPrevisto || 0);
    item.valorConfirmado = value;
    item.status = 'Confirmado';
    item.variavel = false;
    d().historicoFinanceiro.unshift({ data:`${TODAY}T13:10:00`, usuario:'Caio Dicieri', tipo:'custo fixo confirmado', descricao:`Valor confirmado para ${item.nome}.`, valorAnterior:money(item.valorPrevisto), valorNovo:money(value), registro:id, osId:'' });
    toast('Valor do custo fixo confirmado.');
    render('custos-fixos.html');
  }

  function createFixedCostPayable(id) {
    ensureFixedCosts();
    const item = d().custosFixos.find((x)=>x.id === id);
    if (!item) return;
    const payableId = item.contaPagarId || `PAG-CF-${Date.now().toString().slice(-5)}`;
    item.contaPagarId = payableId;
    item.status = item.valorConfirmado > 0 ? 'Conta gerada' : 'A confirmar';
    if (!d().contasPagar.some((x)=>x.id === payableId)) {
      d().contasPagar.unshift({ id:payableId, fornecedor:item.fornecedor, categoria:item.categoria, descricao:`Custo fixo - ${item.nome}`, status:'Em aberto', valor:item.valorConfirmado || item.valorPrevisto, valorFinal:item.valorConfirmado || item.valorPrevisto, vencimento:item.vencimento, formaPagamento:'a definir', responsavel:item.responsavel });
    }
    d().historicoFinanceiro.unshift({ data:`${TODAY}T13:20:00`, usuario:'Caio Dicieri', tipo:'conta a pagar criada', descricao:`Conta ${payableId} gerada a partir do custo fixo ${item.nome}.`, valorAnterior:'-', valorNovo:money(item.valorConfirmado || item.valorPrevisto), registro:payableId, osId:'' });
    toast('Conta a pagar gerada a partir do custo fixo.');
    render('custos-fixos.html');
  }

  function updateFormula(scope) {
    if (!scope) return;
    const gross = Number(scope.querySelector('[data-gross]')?.value || 0);
    const fee = Number(scope.querySelector('[data-fee]')?.value || 0);
    const fixed = Number(scope.querySelector('[data-fixed-fee]')?.value || 0);
    const installments = Math.max(1, Number(scope.querySelector('[data-installments]')?.value || 1));
    const tax = +(gross * fee / 100 + fixed).toFixed(2);
    const net = +(gross - tax).toFixed(2);
    const netInput = scope.querySelector('[data-net]'); if (netInput) netInput.value = money(net);
    const formula = scope.querySelector('[data-formula]'); if (formula) formula.textContent = `Fórmula: ${money(gross)} - ${fee.toFixed(2)}% - ${money(fixed)} = ${money(net)}. Prazo de recebimento conforme regra de pagamento.`;
    const tbody = scope.querySelector('[data-installment-preview]');
    if (tbody) tbody.innerHTML = Array.from({length: installments}, (_,i)=>`<tr><td>Parcela ${i+1}/${installments}</td><td>${money(gross/installments)}</td><td>${money(tax/installments)}</td><td>${money(net/installments)}</td><td>${fmt(addDays(TODAY, 30*(i+1)))}</td><td><button class="btn btn-secondary" type="button">Editar</button></td></tr>`).join('');
  }

  function simulateFinance(modal) {
    const isPay = modal.querySelector('[data-fin-modal-title]').textContent.includes('pagar');
    const gross = Number(modal.querySelector('[data-gross]').value || 0);
    const fee = Number(modal.querySelector('[data-fee]').value || 0);
    const fixed = Number(modal.querySelector('[data-fixed-fee]').value || 0);
    const tax = +(gross * fee / 100 + fixed).toFixed(2);
    const net = +(gross - tax).toFixed(2);
    if (isPay) { d().financeiroSessao.criadoPagar += 1; d().contasPagar.unshift({ id:`PAG-SIM-${d().financeiroSessao.criadoPagar}`, fornecedorId:'FOR-001', fornecedor:'Auto Peças Nobre', compraId:'compra-001', osId:'os-1042', categoria:'peças', descricao:'Conta simulada vinculada à compra', status:'parcialmente paga', valor:gross, valorFinal:gross, vencimento:'2026-06-25', formaPagamento:'Pix', responsavel:'Caio Dicieri' }); }
    else { d().financeiroSessao.criadoReceber += 1; d().contasReceber.unshift({ id:`REC-SIM-${d().financeiroSessao.criadoReceber}`, osId:'os-1042', pagador:'Porto Seguro', tipoPagador:'seguradora', descricao:'Conta simulada gerada no protótipo', status:'parcialmente recebida', valorBruto:gross, taxa:tax, valorLiquido:net, vencimento:'2026-06-25', formaPagamento:'Cartão de crédito', parcelas:3, responsavel:'Caio Dicieri', emissao:TODAY }); }
    d().historicoFinanceiro.unshift({data:'2026-06-12T11:10:00',usuario:'Caio Dicieri',tipo:isPay?'conta a pagar criada':'conta a receber criada',descricao:'Operação simulada confirmou conta, parcelas, taxa, baixa parcial/total e atualização de indicadores.',valorAnterior:'—',valorNovo:money(net),registro:isPay?'PAG-SIM':'REC-SIM',osId:'os-1042'});
    modal.classList.remove('is-open'); toast('Operação financeira simulada, indicadores e histórico atualizados.'); render(window.MeloNavigation.currentFile());
  }

  function closeOS(osId) { const rent=d().rentabilidadeOS.find((x)=>x.osId===osId); const pend=rent?.pendencias || []; if (pend.length) toast(`Fechamento bloqueado: ${pend.join('; ')}. Permitido somente com ressalva e justificativa.`); else toast('OS fechada financeiramente com histórico registrado.'); d().historicoFinanceiro.unshift({data:'2026-06-12T12:00:00',usuario:'Caio Dicieri',tipo:'fechamento',descricao:`Tentativa de fechamento financeiro ${osLabel(osId)} com validação de pendências.`,valorAnterior:'aberto',valorNovo:pend.length?'bloqueado/ressalva':'fechado',registro:osLabel(osId),osId}); }
  function reopenOS(osId) { d().historicoFinanceiro.unshift({data:'2026-06-12T12:10:00',usuario:'Caio Dicieri',tipo:'reabertura',descricao:`Reabertura financeira simulada com motivo, responsável e observação para ${osLabel(osId)}.`,valorAnterior:'fechado',valorNovo:'reaberto',registro:osLabel(osId),osId}); toast('Reabertura financeira registrada e edições liberadas no protótipo.'); }

  function financeAccountKind(account) {
    const text = `${account.tipoPagador || ''} ${account.descricao || ''} ${account.categoria || ''}`.toLowerCase();
    if (text.includes('franquia')) return 'franquia';
    if (text.includes('seguradora')) return 'seguradora';
    return 'particular';
  }

  function renderOSFinanceLegacy(os) {
    const rec = d().contasReceber.filter((x)=>x.osId===os.id);
    const recIds = new Set(rec.map((x)=>x.id));
    const realized = d().baixasFinanceiras.filter((b)=>b.tipo === 'recebimento' && b.status !== 'estornada' && recIds.has(b.contaId));
    const total = sum(rec, 'valorLiquido');
    const totalPaid = sum(realized, 'valorLiquido');
    const totalPending = Math.max(0, total - totalPaid);
    const byKind = (kind) => sum(rec.filter((x)=>financeAccountKind(x) === kind), 'valorLiquido');
    const expectedRows = rec.map((x)=>[x.id, x.pagador, x.descricao, money(x.valorLiquido), fmt(x.vencimento), money(received(x)), money(pending(x,'receber')), badge(x.status)]);
    const realizedRows = realized.map((x)=>{ const account = byId(rec, x.contaId); return [x.id, account.pagador || '—', account.descricao || x.contaId, money(x.valorLiquido), fmt(x.data), x.formaPagamento || '—', x.comprovante || '—', badge(x.status)]; });
    return `<section class="section finance-os-tab finance-os-v2"><div class="finance-os-kpis">${c().kpiCard({label:'Receita total',value:money(total),note:'prevista para a OS'})}${c().kpiCard({label:'Franquia',value:money(byKind('franquia')),note:'cliente'})}${c().kpiCard({label:'Seguradora',value:money(byKind('seguradora')),note:os.seguradora || 'seguradora'})}${c().kpiCard({label:'Particular',value:money(byKind('particular')),note:'adicionais/cliente'})}</div><article class="card finance-payments-card"><div class="section-header"><div><h3 class="section-title">Pagamentos</h3><p class="muted">Valor pago: <strong>${money(totalPaid)}</strong> - Falta pagar: <strong>${money(totalPending)}</strong></p></div></div><div class="grid grid-2"><article class="finance-payment-list"><h4>Previsto</h4>${expectedRows.length ? c().table(['Conta','Pagador','Descricao','Valor','Vencimento','Pago','Falta','Status'], expectedRows) : c().emptyState('Sem previsoes','Nenhuma conta prevista para esta OS.')}</article><article class="finance-payment-list"><h4>Realizado</h4>${realizedRows.length ? c().table(['Baixa','Pagador','Descricao','Valor pago','Data','Meio','Comprovante','Status'], realizedRows) : c().emptyState('Sem pagamentos','Nenhum pagamento registrado para esta OS.')}</article></div></article></section>`;
  }

  function financeConditionLabel(account) {
    return account.condicaoPagamento || account.regraPagamentoId || account.formaPagamento || 'A definir';
  }

  function financePaymentRows(os) {
    const rows = d().contasReceber.filter((x)=>x.osId===os.id);
    if (!rows.some((x)=>financeAccountKind(x) === 'seguradora') && os.seguradora && !String(os.seguradora).toLowerCase().includes('particular') && Number(os.valor || 0) > 0) {
      rows.unshift({ id:`REC-AUTO-${os.id}`, osId:os.id, pagador:os.seguradora, tipoPagador:'seguradora', descricao:'Pagamento da seguradora conforme orcamento', status:'em aberto', valorBruto:Number(os.valor || 0), taxa:0, valorLiquido:Number(os.valor || 0), valor:Number(os.valor || 0), vencimento:os.previsao || TODAY, formaPagamento:'a definir', condicaoPagamento:'Conforme orcamento', parcelas:1, responsavel:os.responsavel || 'Caio Dicieri' });
    }
    return rows;
  }

  function renderOSFinancePayments(os) {
    const rec = financePaymentRows(os);
    const persistedIds = new Set(d().contasReceber.filter((x)=>x.osId===os.id).map((x)=>x.id));
    const total = sum(rec, 'valorLiquido');
    const totalPaid = sum(rec.map((x)=>({ valor: persistedIds.has(x.id) ? received(x) : 0 })));
    const totalPending = Math.max(0, total - totalPaid);
    const byKind = (kind) => sum(rec.filter((x)=>financeAccountKind(x) === kind), 'valorLiquido');
    const tableRows = rec.map((x)=> {
      const paidValue = persistedIds.has(x.id) ? received(x) : 0;
      const pendingValue = Math.max(0, Number(x.valorLiquido || x.valor || 0) - paidValue);
      const status = pendingValue <= 0 && paidValue > 0 ? 'Realizado' : 'Em aberto';
      return [financeAccountKind(x), x.pagador, financeConditionLabel(x), x.descricao, money(x.valorLiquido || x.valor), fmt(x.vencimento), money(paidValue), money(pendingValue), badge(status), persistedIds.has(x.id) && pendingValue > 0 ? `<button class="btn btn-secondary btn-sm" type="button" data-os-payment-realize="${x.id}">Realizar</button>` : '<span class="muted">-</span>'];
    });
    return `<section class="section finance-os-tab finance-os-v2"><div class="finance-os-kpis">${c().kpiCard({label:'Receita total',value:money(total),note:'prevista para a OS'})}${c().kpiCard({label:'Franquia',value:money(byKind('franquia')),note:'cliente'})}${c().kpiCard({label:'Seguradora',value:money(byKind('seguradora')),note:os.seguradora || 'seguradora'})}${c().kpiCard({label:'Particular',value:money(byKind('particular')),note:'adicionais/cliente'})}</div><article class="card finance-payments-card"><div class="section-header"><div><h3 class="section-title">Pagamentos</h3><p class="muted">Valor pago: <strong>${money(totalPaid)}</strong> - Falta pagar: <strong>${money(totalPending)}</strong></p></div><button class="btn btn-primary" type="submit" form="osPaymentForm">Adicionar pagamento</button></div><form id="osPaymentForm" class="form-grid compact os-payment-form" data-os-payment-form><label class="form-field"><span>Tipo</span><select class="select" name="tipo"><option value="seguradora">Seguradora</option><option value="franquia">Franquia</option><option value="particular">Particular</option></select></label><label class="form-field"><span>Pagador</span><input class="input" name="pagador" value="${os.seguradora || ''}"></label><label class="form-field"><span>Valor</span><input class="input" type="number" name="valor" min="0" step="0.01" required></label><label class="form-field"><span>Vencimento</span><input class="input" type="date" name="vencimento" value="${os.previsao || TODAY}"></label><label class="form-field"><span>Condicao</span><select class="select" name="condicao"><option>A vista</option><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>Parcelado</option><option>A combinar</option></select></label><label class="form-field"><span>Status</span><select class="select" name="status"><option value="aberto">Em aberto</option><option value="realizado">Realizado</option></select></label><label class="form-field wide"><span>Descricao</span><input class="input" name="descricao" placeholder="Ex.: pagamento complementar, franquia, diferenca de orcamento"></label></form>${tableRows.length ? c().table(['Tipo','Pagador','Condicao','Descricao','Valor','Vencimento','Pago','Falta','Status','Acoes'], tableRows) : c().emptyState('Sem pagamentos','Adicione uma condicao de pagamento para esta OS.')}</article></section>`;
  }

  function addOSPayment(osId, form) {
    ensureSession();
    const values = Object.fromEntries(new FormData(form).entries());
    const amount = Number(values.valor || 0);
    if (!amount) { toast('Informe o valor do pagamento.'); return; }
    d().financeiroSessao.criadoReceber = Number(d().financeiroSessao.criadoReceber || 0) + 1;
    const id = `REC-OS-${Date.now()}-${d().financeiroSessao.criadoReceber}`;
    const type = values.tipo || 'particular';
    const account = { id, osId, pagador: values.pagador || type, tipoPagador: type === 'franquia' ? 'cliente' : type, categoria: type, descricao: values.descricao || `Pagamento ${type}`, status: values.status === 'realizado' ? 'recebida' : 'em aberto', valorBruto: amount, taxa: 0, valorLiquido: amount, valor: amount, vencimento: values.vencimento || TODAY, dataPrevista: values.vencimento || TODAY, emissao: TODAY, formaPagamento: 'a definir', condicaoPagamento: values.condicao || 'A combinar', parcelas: 1, origem: 'OS', responsavel: 'Caio Dicieri' };
    d().contasReceber.unshift(account);
    if (values.status === 'realizado') d().baixasFinanceiras.unshift({ id:`BX-${id}`, tipo:'recebimento', contaId:id, parcelaId:'', data:TODAY, valorBruto:amount, taxaReal:0, valorLiquido:amount, formaPagamento:'a definir', status:'baixada', comprovante:'', observacao:'Pagamento adicionado como realizado na OS.', responsavel:'Caio Dicieri' });
    d().historicoFinanceiro.unshift({ data:`${TODAY}T12:20:00`, usuario:'Caio Dicieri', tipo:'pagamento OS', descricao:`Pagamento ${id} adicionado na OS.`, valorAnterior:'-', valorNovo:money(amount), registro:id, osId });
    toast('Pagamento adicionado na OS.');
  }

  function realizeOSPayment(osId, accountId) {
    const account = d().contasReceber.find((x)=>x.id === accountId && x.osId === osId);
    if (!account) return;
    const amount = pending(account, 'receber');
    if (amount <= 0) return;
    account.status = 'recebida';
    d().baixasFinanceiras.unshift({ id:`BX-${accountId}-${Date.now()}`, tipo:'recebimento', contaId:accountId, parcelaId:'', data:TODAY, valorBruto:amount, taxaReal:0, valorLiquido:amount, formaPagamento:account.formaPagamento || 'a definir', status:'baixada', comprovante:'', observacao:'Pagamento marcado como realizado na OS.', responsavel:'Caio Dicieri' });
    d().historicoFinanceiro.unshift({ data:`${TODAY}T12:25:00`, usuario:'Caio Dicieri', tipo:'recebimento', descricao:`Pagamento ${accountId} marcado como realizado.`, valorAnterior:'em aberto', valorNovo:money(amount), registro:accountId, osId });
    toast('Pagamento marcado como realizado.');
  }

  return { handles, render, renderOSFinance, addOSPayment, realizeOSPayment };
})();
