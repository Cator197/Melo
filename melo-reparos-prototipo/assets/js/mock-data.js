window.MeloMockData = {
  clientes: [
    { id: 'CLI-001', nome: 'Ana Ribeiro', telefone: '(11) 98811-1001', email: 'ana.ribeiro@email.com' },
    { id: 'CLI-002', nome: 'Bruno Alves', telefone: '(11) 97722-2002', email: 'bruno.alves@email.com' },
    { id: 'CLI-003', nome: 'Carla Moreno', telefone: '(11) 96633-3003', email: 'carla.moreno@email.com' },
    { id: 'CLI-004', nome: 'Diego Martins', telefone: '(11) 95544-4004', email: 'diego.martins@email.com' },
    { id: 'CLI-005', nome: 'Elisa Fontes', telefone: '(11) 94455-5005', email: 'elisa.fontes@email.com' },
    { id: 'CLI-006', nome: 'Fabio Lima', telefone: '(11) 93366-6006', email: 'fabio.lima@email.com' },
    { id: 'CLI-007', nome: 'Gabriela Costa', telefone: '(11) 92277-7007', email: 'gabriela.costa@email.com' },
    { id: 'CLI-008', nome: 'Henrique Prado', telefone: '(11) 91188-8008', email: 'henrique.prado@email.com' }
  ],
  veiculos: [
    { id: 'VEI-001', clienteId: 'CLI-001', placa: 'FNL2A18', modelo: 'Honda Civic', ano: 2021, cor: 'Prata', osId: 'OS-1001' },
    { id: 'VEI-002', clienteId: 'CLI-002', placa: 'EVA4D21', modelo: 'Toyota Corolla', ano: 2020, cor: 'Branco', osId: 'OS-1002' },
    { id: 'VEI-003', clienteId: 'CLI-003', placa: 'BRT8K44', modelo: 'Jeep Compass', ano: 2022, cor: 'Preto', osId: 'OS-1003' },
    { id: 'VEI-004', clienteId: 'CLI-004', placa: 'MLR5R90', modelo: 'VW T-Cross', ano: 2023, cor: 'Azul', osId: 'OS-1004' },
    { id: 'VEI-005', clienteId: 'CLI-005', placa: 'KAI7U12', modelo: 'Fiat Pulse', ano: 2022, cor: 'Cinza', osId: 'OS-1005' },
    { id: 'VEI-006', clienteId: 'CLI-006', placa: 'NVB3Q66', modelo: 'Chevrolet Onix', ano: 2019, cor: 'Vermelho', osId: 'OS-1006' },
    { id: 'VEI-007', clienteId: 'CLI-007', placa: 'RDP9M05', modelo: 'Hyundai HB20', ano: 2021, cor: 'Branco', osId: 'OS-1007' },
    { id: 'VEI-008', clienteId: 'CLI-008', placa: 'TUR1C77', modelo: 'Renault Duster', ano: 2020, cor: 'Marrom', osId: 'OS-1008' },
    { id: 'VEI-009', clienteId: 'CLI-001', placa: 'QWE6J31', modelo: 'Nissan Kicks', ano: 2023, cor: 'Prata', osId: null },
    { id: 'VEI-010', clienteId: 'CLI-004', placa: 'ZXC4B88', modelo: 'Ford Ranger', ano: 2021, cor: 'Preto', osId: null }
  ],
  etapasProducao: [
    { id: 'ETP-01', nome: 'Desmontagem', ordem: 1 },
    { id: 'ETP-02', nome: 'Funilaria', ordem: 2 },
    { id: 'ETP-03', nome: 'Preparação', ordem: 3 },
    { id: 'ETP-04', nome: 'Pintura', ordem: 4 },
    { id: 'ETP-05', nome: 'Montagem', ordem: 5 },
    { id: 'ETP-06', nome: 'Polimento', ordem: 6 },
    { id: 'ETP-07', nome: 'Finalizado', ordem: 7 }
  ],
  condicoesParalelas: [
    { id: 'CON-01', nome: 'Aguardando peça' },
    { id: 'CON-02', nome: 'Aguardando autorização' },
    { id: 'CON-03', nome: 'Complemento pendente' },
    { id: 'CON-04', nome: 'Serviço terceirizado' }
  ],
  ordensServico: [
    { id: 'OS-1001', clienteId: 'CLI-001', veiculoId: 'VEI-001', etapaId: 'ETP-02', etapaEntrada: '2026-06-05', condicoes: ['CON-01', 'CON-03'], status: 'Em produção', entrada: '2026-06-01', previsao: '2026-06-14', valor: 8200 },
    { id: 'OS-1002', clienteId: 'CLI-002', veiculoId: 'VEI-002', etapaId: 'ETP-01', etapaEntrada: '2026-06-10', condicoes: [], status: 'Aberta', entrada: '2026-06-03', previsao: '2026-06-13', valor: 4100 },
    { id: 'OS-1003', clienteId: 'CLI-003', veiculoId: 'VEI-003', etapaId: 'ETP-03', etapaEntrada: '2026-06-02', condicoes: ['CON-02'], status: 'Pendente', entrada: '2026-05-29', previsao: '2026-06-12', valor: 9600 },
    { id: 'OS-1004', clienteId: 'CLI-004', veiculoId: 'VEI-004', etapaId: 'ETP-04', etapaEntrada: '2026-06-08', condicoes: [], status: 'Em produção', entrada: '2026-06-04', previsao: '2026-06-16', valor: 6200 },
    { id: 'OS-1005', clienteId: 'CLI-005', veiculoId: 'VEI-005', etapaId: 'ETP-05', etapaEntrada: '2026-06-04', condicoes: ['CON-04'], status: 'Terceirizado', entrada: '2026-05-27', previsao: '2026-06-11', valor: 5400 },
    { id: 'OS-1006', clienteId: 'CLI-006', veiculoId: 'VEI-006', etapaId: 'ETP-06', etapaEntrada: '2026-06-09', condicoes: [], status: 'Revisão final', entrada: '2026-06-02', previsao: '2026-06-10', valor: 3100 },
    { id: 'OS-1007', clienteId: 'CLI-007', veiculoId: 'VEI-007', etapaId: 'ETP-07', condicoes: [], status: 'Finalizada', entrada: '2026-05-20', previsao: '2026-06-05', valor: 7200 },
    { id: 'OS-1008', clienteId: 'CLI-008', veiculoId: 'VEI-008', etapaId: 'ETP-02', etapaEntrada: '2026-06-08', condicoes: ['CON-01'], status: 'Em produção', entrada: '2026-06-06', previsao: '2026-06-18', valor: 6800 }
  ],
  complementos: [
    { id: 'CMP-001', osId: 'OS-1001', descricao: 'Substituição de suporte interno do para-choque', status: 'Aguardando aprovação', valor: 780 },
    { id: 'CMP-002', osId: 'OS-1003', descricao: 'Pintura adicional da capa do retrovisor', status: 'Aprovado', valor: 450 },
    { id: 'CMP-003', osId: 'OS-1005', descricao: 'Polimento técnico em peça terceirizada', status: 'Em execução', valor: 320 },
    { id: 'CMP-004', osId: 'OS-1008', descricao: 'Alinhamento de farol após chegada da travessa', status: 'Aguardando aprovação', valor: 260 }
  ],
  fornecedores: [
    { id: 'FOR-001', nome: 'Auto Peças Leste', categoria: 'Peças', telefone: '(11) 4000-1000' },
    { id: 'FOR-002', nome: 'Tintas Premium', categoria: 'Tintas', telefone: '(11) 4000-2000' },
    { id: 'FOR-003', nome: 'Martelinho Express', categoria: 'Terceirização', telefone: '(11) 4000-3000' },
    { id: 'FOR-004', nome: 'Ferramentas Max', categoria: 'Ferramentas', telefone: '(11) 4000-4000' },
    { id: 'FOR-005', nome: 'Logística Rápida', categoria: 'Transporte', telefone: '(11) 4000-5000' }
  ],
  compras: [
    { id: 'COM-001', fornecedorId: 'FOR-001', osId: 'OS-1001', item: 'Paralama dianteiro', status: 'Em aberto', valor: 1250, vencimento: '2026-06-12' },
    { id: 'COM-002', fornecedorId: 'FOR-002', osId: 'OS-1004', item: 'Kit tinta azul perolizado', status: 'Entregue', valor: 890, vencimento: '2026-06-09' },
    { id: 'COM-003', fornecedorId: 'FOR-003', osId: 'OS-1005', item: 'Serviço terceirizado de funilaria', status: 'Em execução', valor: 1500, vencimento: '2026-06-15' },
    { id: 'COM-004', fornecedorId: 'FOR-001', osId: 'OS-1008', item: 'Travessa frontal', status: 'Aguardando peça', valor: 980, vencimento: '2026-06-17', previsaoEntrega: '2026-06-11' },
    { id: 'COM-005', fornecedorId: 'FOR-004', osId: 'OS-1003', item: 'Kit grampos e presilhas', status: 'Entrega atrasada', valor: 310, vencimento: '2026-06-10', previsaoEntrega: '2026-06-10' }
  ],
  contasReceber: [
    { id: 'REC-001', osId: 'OS-1001', clienteId: 'CLI-001', descricao: 'Entrada OS-1001', status: 'Recebido', valor: 3000, vencimento: '2026-06-02' },
    { id: 'REC-002', osId: 'OS-1003', clienteId: 'CLI-003', descricao: 'Parcela 1 OS-1003', status: 'Em aberto', valor: 4800, vencimento: '2026-06-12' },
    { id: 'REC-003', osId: 'OS-1004', clienteId: 'CLI-004', descricao: 'Sinal OS-1004', status: 'Em aberto', valor: 2200, vencimento: '2026-06-14' },
    { id: 'REC-004', osId: 'OS-1006', clienteId: 'CLI-006', descricao: 'Final OS-1006', status: 'Vencendo hoje', valor: 3100, vencimento: '2026-06-11' },
    { id: 'REC-005', osId: 'OS-1007', clienteId: 'CLI-007', descricao: 'Final OS-1007', status: 'Recebido', valor: 7200, vencimento: '2026-06-05' },
    { id: 'REC-006', osId: 'OS-1008', clienteId: 'CLI-008', descricao: 'Franquia OS-1008', status: 'Vencido', valor: 1800, vencimento: '2026-06-08' }
  ],
  contasPagar: [
    { id: 'PAG-001', fornecedorId: 'FOR-001', compraId: 'COM-001', descricao: 'Paralama dianteiro', status: 'Em aberto', valor: 1250, vencimento: '2026-06-12' },
    { id: 'PAG-002', fornecedorId: 'FOR-002', compraId: 'COM-002', descricao: 'Kit tinta azul', status: 'Pago', valor: 890, vencimento: '2026-06-09' },
    { id: 'PAG-003', fornecedorId: 'FOR-003', compraId: 'COM-003', descricao: 'Terceirização OS-1005', status: 'Em aberto', valor: 1500, vencimento: '2026-06-15' },
    { id: 'PAG-004', fornecedorId: 'FOR-004', compraId: null, descricao: 'Discos de lixa', status: 'Vencendo hoje', valor: 430, vencimento: '2026-06-11' },
    { id: 'PAG-005', fornecedorId: 'FOR-005', compraId: null, descricao: 'Coleta de peças', status: 'Em aberto', valor: 260, vencimento: '2026-06-18' },
    { id: 'PAG-006', fornecedorId: 'FOR-004', compraId: 'COM-005', descricao: 'Kit grampos e presilhas', status: 'Vencido', valor: 310, vencimento: '2026-06-10' }
  ],
  filaVeiculos: [
    { id: 'FIL-001', clienteId: 'CLI-001', veiculoId: 'VEI-009', data: '2026-06-11', status: 'Agendado', responsavel: 'Marina Lopes' },
    { id: 'FIL-002', clienteId: 'CLI-004', veiculoId: 'VEI-010', data: '2026-06-12', status: 'Aguardando confirmação', responsavel: 'Marina Lopes' }
  ],
  limitesEtapa: {
    'ETP-01': 2,
    'ETP-02': 4,
    'ETP-03': 3,
    'ETP-04': 3,
    'ETP-05': 3,
    'ETP-06': 2,
    'ETP-07': 1
  },
  agendaEventos: [
    { id: 'AGE-001', tipo: 'entrada', data: '2026-06-08', hora: '08:30', titulo: 'Entrada Honda Civic', descricao: 'Recepção e abertura da OS-1001.', responsavel: 'Marina Lopes', status: 'Concluído', registroTipo: 'OS', registroId: 'OS-1001', link: 'ordens-servico.html?os=OS-1001' },
    { id: 'AGE-002', tipo: 'recebimento', data: '2026-06-08', hora: '10:00', titulo: 'Cobrar franquia Duster', descricao: 'Recebimento REC-006 vencido para a OS-1008.', responsavel: 'Caio Dicieri', status: 'Atrasado', registroTipo: 'Recebimento', registroId: 'REC-006', link: 'contas-receber.html?rec=REC-006' },
    { id: 'AGE-003', tipo: 'pagamento', data: '2026-06-10', hora: '15:00', titulo: 'Pagar grampos e presilhas', descricao: 'Pagamento PAG-006 vinculado à compra COM-005.', responsavel: 'Caio Dicieri', status: 'Atrasado', registroTipo: 'Pagamento', registroId: 'PAG-006', link: 'contas-pagar.html?pag=PAG-006' },
    { id: 'AGE-004', tipo: 'entrega', data: '2026-06-11', hora: '11:00', titulo: 'Entrega Fiat Pulse', descricao: 'Entrega da OS-1005, ainda com terceirização em validação.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'OS', registroId: 'OS-1005', link: 'ordens-servico.html?os=OS-1005' },
    { id: 'AGE-005', tipo: 'entrada', data: '2026-06-11', hora: '14:00', titulo: 'Entrada Nissan Kicks', descricao: 'Veículo agendado na fila FIL-001 para vistoria inicial.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'Fila', registroId: 'FIL-001', link: 'veiculos.html?vei=VEI-009' },
    { id: 'AGE-006', tipo: 'recebimento', data: '2026-06-11', hora: '16:30', titulo: 'Receber final OS-1006', descricao: 'Título REC-004 vencendo hoje.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Recebimento', registroId: 'REC-004', link: 'contas-receber.html?rec=REC-004' },
    { id: 'AGE-007', tipo: 'pagamento', data: '2026-06-11', hora: '17:00', titulo: 'Pagar discos de lixa', descricao: 'Pagamento PAG-004 vencendo hoje.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Pagamento', registroId: 'PAG-004', link: 'contas-pagar.html?pag=PAG-004' },
    { id: 'AGE-008', tipo: 'peca', data: '2026-06-11', hora: '09:30', titulo: 'Chegada travessa frontal', descricao: 'Previsão de chegada da compra COM-004 para a OS-1008.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'Compra', registroId: 'COM-004', link: 'compras.html?compra=COM-004' },
    { id: 'AGE-009', tipo: 'complemento', data: '2026-06-12', hora: '10:30', titulo: 'Aprovar complemento OS-1001', descricao: 'Complemento CMP-001 aguardando aprovação.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'Complemento', registroId: 'CMP-001', link: 'complementos.html?comp=CMP-001' },
    { id: 'AGE-010', tipo: 'entrega', data: '2026-06-12', hora: '15:30', titulo: 'Pré-entrega Jeep Compass', descricao: 'Entrega técnica planejada para OS-1003.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'OS', registroId: 'OS-1003', link: 'ordens-servico.html?os=OS-1003' },
    { id: 'AGE-011', tipo: 'entrada', data: '2026-06-12', hora: '09:00', titulo: 'Entrada Ford Ranger', descricao: 'Fila FIL-002 aguardando confirmação final.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'Fila', registroId: 'FIL-002', link: 'veiculos.html?vei=VEI-010' },
    { id: 'AGE-012', tipo: 'interno', data: '2026-06-13', hora: '08:00', titulo: 'Reunião semanal da produção', descricao: 'Alinhamento de gargalos e compras prioritárias.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Interno', registroId: 'INT-001', link: 'agenda.html?evento=AGE-012' },
    { id: 'AGE-013', tipo: 'entrega', data: '2026-06-13', hora: '11:30', titulo: 'Entrega Toyota Corolla', descricao: 'Entrega prevista para OS-1002.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'OS', registroId: 'OS-1002', link: 'ordens-servico.html?os=OS-1002' },
    { id: 'AGE-014', tipo: 'entrega', data: '2026-06-09', hora: '16:00', titulo: 'Entrega HB20 finalizada', descricao: 'Entrega concluída vinculada à OS-1007.', responsavel: 'Marina Lopes', status: 'Concluído', registroTipo: 'OS', registroId: 'OS-1007', link: 'ordens-servico.html?os=OS-1007' }
  ],
  usuarios: [
    { id: 'USR-001', nome: 'Caio Dicieri', perfil: 'Administrador', email: 'caio@melo.local' },
    { id: 'USR-002', nome: 'Marina Lopes', perfil: 'Atendimento', email: 'marina@melo.local' },
    { id: 'USR-003', nome: 'Rafael Santos', perfil: 'Produção', email: 'rafael@melo.local' }
  ]
};
