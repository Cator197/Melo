window.MeloProductionCore = (() => {
  const today = '2026-06-12';
  const dayMs = 86400000;
  const stageIds = ['ETP-01','ETP-02','ETP-03','ETP-04','ETP-05','ETP-06'];
  const finalStageId = 'ETP-07';
  const closedStatuses = ['Entregue','Fechado','Cancelado'];
  const finishedStatus = 'Finalizado';
  const conditionTypes = [
    { id:'CON-01', nome:'Aguardando peça' }, { id:'CON-02', nome:'Aguardando autorização' },
    { id:'CON-03', nome:'Complemento pendente' }, { id:'CON-04', nome:'Serviço terceirizado' },
    { id:'CON-05', nome:'Aguardando cliente' }, { id:'CON-06', nome:'Bloqueio técnico' }
  ];
  const capacities = { 'ETP-01':4,'ETP-02':6,'ETP-03':4,'ETP-04':3,'ETP-05':4,'ETP-06':3 };
  const defaultLimits = { 'ETP-01':2,'ETP-02':5,'ETP-03':2,'ETP-04':2,'ETP-05':2,'ETP-06':2,'ETP-07':1 };
  const users = [
    { id:'USR-001', nome:'Caio Dicieri', perfil:'Administrador', canMove:true },
    { id:'USR-003', nome:'Rafael Santos', perfil:'Produção', canMove:true },
    { id:'USR-002', nome:'Marina Lopes', perfil:'Atendimento', canMove:false }
  ];
  const data = () => window.MeloMockData;
  function ensureData(){
    const d=data(); if(!d) return;
    d.condicoesParalelas = conditionTypes.map((x)=> d.condicoesParalelas?.find((c)=>c.id===x.id) || x);
    d.limitesEtapa = { ...defaultLimits, ...(d.limitesEtapa || {}) };
    d.etapasProducao?.forEach((e)=>{ if(defaultLimits[e.id]) e.prazo = defaultLimits[e.id]; });
    d._selectedUserId ||= 'USR-001';
    d._productionHistory ||= [];
    seedStage4(d);
  }
  function seedStage4(d){
    const add=(arr,item)=>{ if(!arr.some((x)=>x.id===item.id)) arr.push(item); };
    add(d.clientes,{id:'CLI-013',nome:'Igor Batista',telefone:'(11) 90040-4040',email:'igor@email.com'});
    add(d.clientes,{id:'CLI-014',nome:'Lara Mendes',telefone:'(11) 90050-5050',email:'lara@email.com'});
    add(d.veiculos,{id:'VEI-013',clienteId:'CLI-013',placa:'PRD2E44',marca:'Citroën',modelo:'C4 Cactus',ano:2021,cor:'Cinza',osId:'OS-1011'});
    add(d.veiculos,{id:'VEI-014',clienteId:'CLI-014',placa:'MXO7H11',marca:'BMW',modelo:'320i',ano:2020,cor:'Azul',osId:'OS-1012'});
    const osBase={origem:'Manual',numeroOrcamento:'',idExterno:'',sinistro:'',tipoAtendimento:'Particular',responsavel:'Rafael Santos',entrada:'2026-06-05',aprovacao:'2026-06-04',entregaReal:'',valor:9000,valores:{maoObra:4000,pecas:3000,materiais:900,terceiros:800,desconto:0,aprovado:9000},conclusao:30,alerta:''};
    add(d.ordensServico,{...osBase,id:'OS-1011',numero:'OS 1011',clienteId:'CLI-013',veiculoId:'VEI-013',seguradora:'Liberty',etapaId:'ETP-01',etapaEntrada:'2026-06-04',condicoes:['CON-04'],condicoesDetalhes:[cond('CP-1011-1','CON-04','2026-06-05','Ativa','Terceirização de martelinho planejada.','Rafael Santos')],status:'Em produção',entradaPrevista:'2026-06-04',previsaoInicial:'2026-06-16',previsao:'2026-06-17',prioridade:'Alta',observacaoFixada:'Serviço terceirizado exige acompanhamento diário.'});
    add(d.ordensServico,{...osBase,id:'OS-1012',numero:'OS 1012',clienteId:'CLI-014',veiculoId:'VEI-014',seguradora:'Tokio Marine',etapaId:'ETP-04',etapaEntrada:'2026-06-11',condicoes:[],condicoesDetalhes:[],status:'Em produção',entradaPrevista:'2026-06-06',previsaoInicial:'2026-06-18',previsao:'2026-06-18',prioridade:'Normal',observacaoFixada:'Pintura dentro do prazo após complemento aprovado.'});
    const os1008=d.ordensServico.find((o)=>o.id==='OS-1008'); if(os1008){os1008.status='Agendado'; os1008.areaProducao='agendado'; os1008.entradaPrevista='2026-06-13';}
    const os1010=d.ordensServico.find((o)=>o.id==='OS-1010'); if(os1010){os1010.status='Em produção'; os1010.etapaId='ETP-02'; os1010.etapaEntrada='2026-06-01'; os1010.condicoes=['CON-04','CON-06']; os1010.condicoesDetalhes=[cond('CP-1010-1','CON-04','2026-06-02','Ativa','Serviço terceirizado de rodas.','Rafael Santos'),cond('CP-1010-2','CON-06','2026-06-09','Ativa','Bloqueio técnico para alinhamento de painel.','Lucas Prado')]; os1010.alerta='Sem movimentação recente e duas condições paralelas ativas.';}
    ['OS-1003','OS-1004','OS-1009'].forEach((id)=>{const o=d.ordensServico.find(x=>x.id===id); if(o) o.prioridade ||= id==='OS-1003'?'Alta':'Normal';});
    const comps=[
      comp('comp-001','COMP-001','OS-1011','rascunho',980,0,'Complemento em rascunho para serviço terceirizado','2026-06-10'),
      comp('comp-002','COMP-002','OS-1001','solicitado',1250,0,'Capa de retrovisor e polimento local','2026-06-09'),
      comp('comp-003','COMP-003','os-1042','aguardando aprovação',1480,0,'Suporte interno do para-choque','2026-06-09'),
      comp('comp-004','COMP-004','OS-1009','aguardando aprovação',2100,0,'Troca de reforço lateral identificada em preparação','2026-06-06'),
      comp('comp-005','COMP-005','OS-1012','aprovado',1750,1750,'Complemento aprovado alterou previsão e valor','2026-06-07'),
      comp('comp-006','COMP-006','OS-1003','aprovado parcialmente',2600,1600,'Parte dos serviços aprovada para montagem','2026-06-05'),
      comp('comp-007','COMP-007','OS-1004','recusado',740,0,'Peça estética recusada pela seguradora','2026-06-04'),
      comp('comp-008','COMP-008','OS-1002','concluído',920,920,'Ajuste concluído em pintura','2026-06-03')
    ];
    comps.forEach((x)=>add(d.complementos,x));
    d.complementos.forEach((co)=>{ if(co.id?.startsWith('CMP-')) co.id = co.id==='CMP-1042-1'?'comp-003':co.id.toLowerCase(); co.status = normalizeStatus(co.status); });
    d.complementos = Object.values(d.complementos.reduce((acc, co) => ({ ...acc, [co.id]: co }), {}));
  }
  function cond(id,tipoId,inicio,status,observacao,responsavel){return {id,tipoId,inicio,fim:'',status,observacao,responsavel,motivoEncerramento:''};}
  function comp(id,numero,osId,status,valorSolicitado,valorAprovado,descricao,data){return {id,numero,osId,status:normalizeStatus(status),motivo:'Avaria adicional',data,descricao,solicitante:'Marina Lopes',origem:'Produção',seguradora:'Conforme OS',valorSolicitado,valorAprovado,impactoPrevisao: status.includes('aprov')?'+2 dias':'+1 dia',novaPrevisao:'2026-06-18',servicos:[{descricao:'Mão de obra complementar',setor:'Funilaria',quantidade:1,valorUnitario:valorSolicitado*0.55,aprovado:valorAprovado>0,status:valorAprovado>0?'Aprovado':'Pendente'}],pecas:[{descricao:'Peça complementar',codigo:'CMP-'+numero.slice(-3),quantidade:1,valor:valorSolicitado*0.45,aprovado:valorAprovado>0,status:valorAprovado>0?'Aprovado':'Pendente',necessidadeCompra:true}],valores:{maoObra:valorSolicitado*0.55,pecas:valorSolicitado*0.45,materiais:0,terceiros:0,desconto:0,solicitado:valorSolicitado,aprovado:valorAprovado,diferenca:valorSolicitado-valorAprovado},previsao:{anterior:'2026-06-14',impacto:'+1 dia',proposta:'2026-06-15',aprovada:valorAprovado?'2026-06-16':'',justificativa:'Impacto simulado na capacidade de produção.'},documentos:['solicitacao.pdf','fotos-avaria.zip'],historico:[{data,evento:'Criação',usuario:'Marina Lopes',observacao:'Complemento criado no protótipo.'}],observacoes:'Dados fictícios para validação do fluxo.'};}
  function normalizeStatus(s=''){ const m={ 'Aguardando aprovação':'aguardando aprovação','Solicitado':'solicitado','Aprovado parcialmente':'aprovado parcialmente','Aprovado':'aprovado','Recusado':'recusado','Concluído':'concluído'}; return m[s] || s; }
  const byId=(list,id)=>list.find((x)=>x.id===id)||{};
  const vehicle=(os)=>byId(data().veiculos,os.veiculoId); const client=(os)=>byId(data().clientes,os.clienteId); const stage=(os)=>byId(data().etapasProducao,os.etapaId);
  const conditionName=(id)=>byId(data().condicoesParalelas,id).nome || id;
  const daysBetween=(a,b=today)=> a ? Math.max(0,Math.ceil((new Date(`${b}T00:00:00`)-new Date(`${a}T00:00:00`))/dayMs)) : 0;
  const activeOrders=()=>data().ordensServico.filter((os)=>!closedStatuses.includes(os.status) && os.status!==finishedStatus && stageIds.includes(os.etapaId));
  const finishedWaiting=()=>data().ordensServico.filter((os)=>os.status===finishedStatus || os.etapaId===finalStageId && os.status!=='Entregue');
  const scheduled=()=>data().ordensServico.filter((os)=>os.status==='Agendado' || os.areaProducao==='agendado');
  function stageInfo(os){ const limit=data().limitesEtapa?.[os.etapaId] || defaultLimits[os.etapaId] || 2; const days=daysBetween(os.etapaEntrada||os.entrada); const diff=days-limit; const situation=!os.etapaEntrada?'sem data de entrada':diff>0?'atrasado':diff>=-1?'próximo do limite':'dentro do prazo'; return {days,limit,diff,situation}; }
  function overdueDelivery(os){ return os.previsao && os.previsao < today; }
  function openComplements(os){ return data().complementos.filter((co)=>co.osId===os.id && !['concluído','cancelado','recusado'].includes(co.status)); }
  function waitingParts(os){ if(window.MeloPurchasesModule) window.MeloPurchasesModule.syncOsCosts(); const pending = data().pecasOS?.filter((p)=>p.osId===os.id && (p.quantidadePendente||0)>0 && !String(p.situacao||'').toLowerCase().includes('cancelado')).length || 0; return pending || ((os.condicoes||[]).includes('CON-01') ? 1 : 0); }
  function addHistory(os,text,type='Produção'){ const item={id:`HIS-${Date.now()}`,osId:os.id,data:today,hora:new Date().toTimeString().slice(0,5),tipo:type,descricao:text,usuario:currentUser().nome}; data().historicoOS.unshift(item); data()._productionHistory.unshift(item); }
  function currentUser(){ return users.find((u)=>u.id===data()._selectedUserId) || users[0]; }
  function canMove(){ return !!currentUser().canMove; }
  function moveOrder(osId,newStageId,opts={}){ const d=data(), os=d.ordensServico.find((o)=>o.id===osId); if(!os||!canMove()) return {ok:false,message:'Usuário fictício sem permissão para movimentar.'}; const old=stage(os); const next=byId(d.etapasProducao,newStageId); const ret=(next.ordem||0)<(old.ordem||0); if(ret&&!opts.motivo) return {ok:false,message:'Retorno exige motivo.'}; os.etapaId=newStageId; os.etapaEntrada=opts.data||today; if(newStageId===finalStageId) os.status=finishedStatus; else if(os.status===finishedStatus) os.status='Em produção'; if(opts.previsao) os.previsao=opts.previsao; const label=ret?'Retorno':newStageId===finalStageId?'Finalização':'Movimentação'; addHistory(os,`${label}: ${old.nome||'—'} → ${next.nome}. ${opts.motivo||opts.observacao||''}${opts.retrabalho?' (retrabalho)':''}`); return {ok:true,message:`${os.numero} movimentada para ${next.nome}.`}; }
  function addCondition(osId,typeId,obs='Condição adicionada no protótipo.'){ const os=data().ordensServico.find((o)=>o.id===osId); if(!os) return; os.condicoes ||= []; if(!os.condicoes.includes(typeId)) os.condicoes.push(typeId); os.condicoesDetalhes ||= []; os.condicoesDetalhes.push(cond(`CP-${Date.now()}`,typeId,today,'Ativa',obs,currentUser().nome)); addHistory(os,`Condição paralela adicionada: ${conditionName(typeId)}.`,'Condição'); }
  function closeCondition(osId,detailId,motivo='Encerrada no protótipo.'){ const os=data().ordensServico.find((o)=>o.id===osId); const det=os?.condicoesDetalhes?.find((x)=>x.id===detailId); if(!det) return; det.status='Encerrada'; det.fim=today; det.motivoEncerramento=motivo; os.condicoes=[...new Set((os.condicoesDetalhes||[]).filter((x)=>x.status==='Ativa').map((x)=>x.tipoId))]; addHistory(os,`Condição encerrada: ${conditionName(det.tipoId)}. ${motivo}`,'Condição'); }
  function approveComplement(id,partial=false,refuse=false){ const co=data().complementos.find((x)=>x.id===id); if(!co) return {ok:false,message:'Complemento não encontrado.'}; const os=data().ordensServico.find((o)=>o.id===co.osId); if(refuse){ co.status='recusado'; closeComplementCondition(os,`Complemento ${co.numero} recusado.`); co.historico?.push({data:today,evento:'Recusa',usuario:currentUser().nome,observacao:'Recusa simulada.'}); return {ok:true,message:'Recusa registrada.'}; } co.status=partial?'aprovado parcialmente':'aprovado'; co.valorAprovado=partial?Math.round(co.valorSolicitado*0.65):co.valorSolicitado; co.valores = {...co.valores, aprovado:co.valorAprovado, diferenca:co.valorSolicitado-co.valorAprovado}; if(os){ os.valor=(os.valor||0)+co.valorAprovado; os.valores ||= {}; os.valores.aprovado=(os.valores.aprovado||0)+co.valorAprovado; os.previsao=co.previsao?.aprovada || co.novaPrevisao || os.previsao; closeComplementCondition(os,`Complemento ${co.numero} aprovado.`); addHistory(os,`${partial?'Aprovação parcial':'Aprovação'} do complemento ${co.numero}; valor ${window.MeloComponents.money(co.valorAprovado)} e previsão ${os.previsao}.`,'Complemento'); }
    co.historico?.push({data:today,evento:partial?'Aprovação parcial':'Aprovação',usuario:currentUser().nome,observacao:'Fluxo simulado atualizado na OS.'}); return {ok:true,message:`${partial?'Aprovação parcial':'Aprovação'} registrada.`}; }
  function closeComplementCondition(os,motivo){ if(!os) return; (os.condicoesDetalhes||[]).filter((x)=>x.tipoId==='CON-03'&&x.status==='Ativa').forEach((x)=>{x.status='Encerrada';x.fim=today;x.motivoEncerramento=motivo;}); os.condicoes=[...new Set((os.condicoesDetalhes||[]).filter((x)=>x.status==='Ativa').map((x)=>x.tipoId))]; }
  function createComplement(osId){ const os=data().ordensServico.find((o)=>o.id===osId)||activeOrders()[0]; const id=`comp-${String(data().complementos.length+1).padStart(3,'0')}`; const co=comp(id,`COMP-${String(data().complementos.length+1).padStart(3,'0')}`,os.id,'rascunho',1300,0,'Novo complemento temporário criado pelo protótipo.',today); data().complementos.unshift(co); addCondition(os.id,'CON-03',`Complemento ${co.numero} criado.`); return co; }
  ensureData();
  return {today,stageIds,finalStageId,capacities,users,ensureData,data,byId,vehicle,client,stage,conditionName,daysBetween,activeOrders,finishedWaiting,scheduled,stageInfo,overdueDelivery,openComplements,waitingParts,moveOrder,addCondition,closeCondition,approveComplement,createComplement,currentUser,canMove,conditionTypes};
})();
