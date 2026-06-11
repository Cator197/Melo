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
    { id: 'OS-1001', clienteId: 'CLI-001', veiculoId: 'VEI-001', etapaId: 'ETP-02', condicoes: ['CON-01', 'CON-03'], status: 'Em produção', entrada: '2026-06-01', previsao: '2026-06-14', valor: 8200 },
    { id: 'OS-1002', clienteId: 'CLI-002', veiculoId: 'VEI-002', etapaId: 'ETP-01', condicoes: [], status: 'Aberta', entrada: '2026-06-03', previsao: '2026-06-13', valor: 4100 },
    { id: 'OS-1003', clienteId: 'CLI-003', veiculoId: 'VEI-003', etapaId: 'ETP-03', condicoes: ['CON-02'], status: 'Pendente', entrada: '2026-05-29', previsao: '2026-06-12', valor: 9600 },
    { id: 'OS-1004', clienteId: 'CLI-004', veiculoId: 'VEI-004', etapaId: 'ETP-04', condicoes: [], status: 'Em produção', entrada: '2026-06-04', previsao: '2026-06-16', valor: 6200 },
    { id: 'OS-1005', clienteId: 'CLI-005', veiculoId: 'VEI-005', etapaId: 'ETP-05', condicoes: ['CON-04'], status: 'Terceirizado', entrada: '2026-05-27', previsao: '2026-06-11', valor: 5400 },
    { id: 'OS-1006', clienteId: 'CLI-006', veiculoId: 'VEI-006', etapaId: 'ETP-06', condicoes: [], status: 'Revisão final', entrada: '2026-06-02', previsao: '2026-06-10', valor: 3100 },
    { id: 'OS-1007', clienteId: 'CLI-007', veiculoId: 'VEI-007', etapaId: 'ETP-07', condicoes: [], status: 'Finalizada', entrada: '2026-05-20', previsao: '2026-06-05', valor: 7200 },
    { id: 'OS-1008', clienteId: 'CLI-008', veiculoId: 'VEI-008', etapaId: 'ETP-02', condicoes: ['CON-01'], status: 'Em produção', entrada: '2026-06-06', previsao: '2026-06-18', valor: 6800 }
  ],
  complementos: [
    { id: 'CMP-001', osId: 'OS-1001', descricao: 'Substituição de suporte interno do para-choque', status: 'Aguardando aprovação', valor: 780 },
    { id: 'CMP-002', osId: 'OS-1003', descricao: 'Pintura adicional da capa do retrovisor', status: 'Aprovado', valor: 450 },
    { id: 'CMP-003', osId: 'OS-1005', descricao: 'Polimento técnico em peça terceirizada', status: 'Em execução', valor: 320 }
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
    { id: 'COM-004', fornecedorId: 'FOR-001', osId: 'OS-1008', item: 'Travessa frontal', status: 'Aguardando peça', valor: 980, vencimento: '2026-06-17' }
  ],
  contasReceber: [
    { id: 'REC-001', osId: 'OS-1001', clienteId: 'CLI-001', descricao: 'Entrada OS-1001', status: 'Recebido', valor: 3000, vencimento: '2026-06-02' },
    { id: 'REC-002', osId: 'OS-1003', clienteId: 'CLI-003', descricao: 'Parcela 1 OS-1003', status: 'Em aberto', valor: 4800, vencimento: '2026-06-12' },
    { id: 'REC-003', osId: 'OS-1004', clienteId: 'CLI-004', descricao: 'Sinal OS-1004', status: 'Em aberto', valor: 2200, vencimento: '2026-06-14' },
    { id: 'REC-004', osId: 'OS-1006', clienteId: 'CLI-006', descricao: 'Final OS-1006', status: 'Vencendo hoje', valor: 3100, vencimento: '2026-06-11' },
    { id: 'REC-005', osId: 'OS-1007', clienteId: 'CLI-007', descricao: 'Final OS-1007', status: 'Recebido', valor: 7200, vencimento: '2026-06-05' }
  ],
  contasPagar: [
    { id: 'PAG-001', fornecedorId: 'FOR-001', compraId: 'COM-001', descricao: 'Paralama dianteiro', status: 'Em aberto', valor: 1250, vencimento: '2026-06-12' },
    { id: 'PAG-002', fornecedorId: 'FOR-002', compraId: 'COM-002', descricao: 'Kit tinta azul', status: 'Pago', valor: 890, vencimento: '2026-06-09' },
    { id: 'PAG-003', fornecedorId: 'FOR-003', compraId: 'COM-003', descricao: 'Terceirização OS-1005', status: 'Em aberto', valor: 1500, vencimento: '2026-06-15' },
    { id: 'PAG-004', fornecedorId: 'FOR-004', compraId: null, descricao: 'Discos de lixa', status: 'Vencendo hoje', valor: 430, vencimento: '2026-06-11' },
    { id: 'PAG-005', fornecedorId: 'FOR-005', compraId: null, descricao: 'Coleta de peças', status: 'Em aberto', valor: 260, vencimento: '2026-06-18' }
  ],
  usuarios: [
    { id: 'USR-001', nome: 'Caio Dicieri', perfil: 'Administrador', email: 'caio@melo.local' },
    { id: 'USR-002', nome: 'Marina Lopes', perfil: 'Atendimento', email: 'marina@melo.local' },
    { id: 'USR-003', nome: 'Rafael Santos', perfil: 'Produção', email: 'rafael@melo.local' }
  ]
};
