window.MeloMockData = {
  clientes: [
    { id: 'CLI-001', nome: 'Roberto Almeida', telefone: '(11) 98811-1042', email: 'roberto.almeida@email.com' },
    { id: 'CLI-002', nome: 'Ana Ribeiro', telefone: '(11) 98811-1001', email: 'ana.ribeiro@email.com' },
    { id: 'CLI-003', nome: 'Bruno Alves', telefone: '(11) 97722-2002', email: 'bruno.alves@email.com' },
    { id: 'CLI-004', nome: 'Carla Moreno', telefone: '(11) 96633-3003', email: 'carla.moreno@email.com' },
    { id: 'CLI-005', nome: 'Diego Martins', telefone: '(11) 95544-4004', email: 'diego.martins@email.com' },
    { id: 'CLI-006', nome: 'Elisa Fontes', telefone: '(11) 94455-5005', email: 'elisa.fontes@email.com' },
    { id: 'CLI-007', nome: 'Fabio Lima', telefone: '(11) 93366-6006', email: 'fabio.lima@email.com' },
    { id: 'CLI-008', nome: 'Gabriela Costa', telefone: '(11) 92277-7007', email: 'gabriela.costa@email.com' },
    { id: 'CLI-009', nome: 'Henrique Prado', telefone: '(11) 91188-8008', email: 'henrique.prado@email.com' },
    { id: 'CLI-010', nome: 'Mariana Torres', telefone: '(11) 90010-1010', email: 'mariana.torres@email.com' },
    { id: 'CLI-011', nome: 'Paulo Nogueira', telefone: '(11) 90020-2020', email: 'paulo.nogueira@email.com' },
    { id: 'CLI-012', nome: 'Sofia Campos', telefone: '(11) 90030-3030', email: 'sofia.campos@email.com' }
  ],
  veiculos: [
    { id: 'VEI-001', clienteId: 'CLI-001', placa: 'ABC1D23', marca: 'Chevrolet', modelo: 'Onix', ano: 2021, cor: 'Prata', chassi: '9BGONIX1042', osId: 'os-1042' },
    { id: 'VEI-002', clienteId: 'CLI-002', placa: 'FNL2A18', marca: 'Honda', modelo: 'Civic', ano: 2021, cor: 'Prata', osId: 'OS-1001' },
    { id: 'VEI-003', clienteId: 'CLI-003', placa: 'EVA4D21', marca: 'Toyota', modelo: 'Corolla', ano: 2020, cor: 'Branco', osId: 'OS-1002' },
    { id: 'VEI-004', clienteId: 'CLI-004', placa: 'BRT8K44', marca: 'Jeep', modelo: 'Compass', ano: 2022, cor: 'Preto', osId: 'OS-1003' },
    { id: 'VEI-005', clienteId: 'CLI-005', placa: 'MLR5R90', marca: 'Volkswagen', modelo: 'T-Cross', ano: 2023, cor: 'Azul', osId: 'OS-1004' },
    { id: 'VEI-006', clienteId: 'CLI-006', placa: 'KAI7U12', marca: 'Fiat', modelo: 'Pulse', ano: 2022, cor: 'Cinza', osId: 'OS-1005' },
    { id: 'VEI-007', clienteId: 'CLI-007', placa: 'NVB3Q66', marca: 'Chevrolet', modelo: 'Tracker', ano: 2019, cor: 'Vermelho', osId: 'OS-1006' },
    { id: 'VEI-008', clienteId: 'CLI-008', placa: 'RDP9M05', marca: 'Hyundai', modelo: 'HB20', ano: 2021, cor: 'Branco', osId: 'OS-1007' },
    { id: 'VEI-009', clienteId: 'CLI-009', placa: 'TUR1C77', marca: 'Renault', modelo: 'Duster', ano: 2020, cor: 'Marrom', osId: 'OS-1008' },
    { id: 'VEI-010', clienteId: 'CLI-010', placa: 'QWE6J31', marca: 'Nissan', modelo: 'Kicks', ano: 2023, cor: 'Prata', osId: 'OS-1009' },
    { id: 'VEI-011', clienteId: 'CLI-011', placa: 'ZXC4B88', marca: 'Ford', modelo: 'Ranger', ano: 2021, cor: 'Preto', osId: 'OS-1010' },
    { id: 'VEI-012', clienteId: 'CLI-012', placa: 'LUA8P44', marca: 'Peugeot', modelo: '208', ano: 2022, cor: 'Vermelho', osId: null }
  ],
  etapasProducao: [
    { id: 'ETP-01', nome: 'Desmontagem', ordem: 1, prazo: 2, setor: 'Produção' },
    { id: 'ETP-02', nome: 'Funilaria', ordem: 2, prazo: 4, setor: 'Funilaria' },
    { id: 'ETP-03', nome: 'Preparação', ordem: 3, prazo: 3, setor: 'Preparação' },
    { id: 'ETP-04', nome: 'Pintura', ordem: 4, prazo: 3, setor: 'Pintura' },
    { id: 'ETP-05', nome: 'Montagem', ordem: 5, prazo: 3, setor: 'Montagem' },
    { id: 'ETP-06', nome: 'Polimento', ordem: 6, prazo: 2, setor: 'Acabamento' },
    { id: 'ETP-07', nome: 'Finalizado', ordem: 7, prazo: 1, setor: 'Entrega' }
  ],
  condicoesParalelas: [
    { id: 'CON-01', nome: 'Aguardando peça' },
    { id: 'CON-02', nome: 'Aguardando autorização' },
    { id: 'CON-03', nome: 'Complemento pendente' },
    { id: 'CON-04', nome: 'Serviço terceirizado' }
  ],
  ordensServico: [
    { id: 'os-1042', numero: 'OS 1042', clienteId: 'CLI-001', veiculoId: 'VEI-001', origem: 'Cilia', numeroOrcamento: 'ORC-CIL-78942', idExterno: 'CILIA-AX9-1042', sinistro: 'SIN-2026-0042', seguradora: 'Porto Seguro', tipoAtendimento: 'Seguradora com franquia', responsavel: 'Rafael Santos', etapaId: 'ETP-02', etapaEntrada: '2026-06-08', condicoes: ['CON-01', 'CON-03'], condicoesDetalhes: [{ id: 'CP-1042-1', tipoId: 'CON-01', inicio: '2026-06-08', fim: '', status: 'Ativa', observacao: 'Paralama dianteiro recebido parcialmente; falta suporte interno.', responsavel: 'Rafael Santos' }, { id: 'CP-1042-2', tipoId: 'CON-03', inicio: '2026-06-09', fim: '', status: 'Ativa', observacao: 'Complemento de suporte interno aguardando aprovação da seguradora.', responsavel: 'Marina Lopes' }], status: 'Em produção', entradaPrevista: '2026-06-03', entrada: '2026-06-04', aprovacao: '2026-06-02', previsaoInicial: '2026-06-13', previsao: '2026-06-14', entregaReal: '', valor: 12780, valores: { maoObra: 5200, pecas: 5140, materiais: 980, terceiros: 760, desconto: 300, aprovado: 12780 }, conclusao: 46, alerta: 'Compra com recebimento parcial e complemento pendente podem impactar a entrega.' },
    { id: 'OS-1001', numero: 'OS 1001', clienteId: 'CLI-002', veiculoId: 'VEI-002', origem: 'Soma', numeroOrcamento: 'SOM-1001', idExterno: 'SOMA-1001', sinistro: 'SIN-2026-1001', seguradora: 'Azul Seguros', tipoAtendimento: 'Seguradora', responsavel: 'Rafael Santos', etapaId: 'ETP-03', etapaEntrada: '2026-06-09', condicoes: ['CON-03'], condicoesDetalhes: [{ id: 'CP-1001-1', tipoId: 'CON-03', inicio: '2026-06-09', fim: '', status: 'Ativa', observacao: 'Complemento de capa de retrovisor pendente.', responsavel: 'Marina Lopes' }], status: 'Em produção', entradaPrevista: '2026-06-03', entrada: '2026-06-03', aprovacao: '2026-06-01', previsaoInicial: '2026-06-13', previsao: '2026-06-13', entregaReal: '', valor: 8200, valores: { maoObra: 3600, pecas: 3300, materiais: 700, terceiros: 600, desconto: 0, aprovado: 8200 }, conclusao: 52 },
    { id: 'OS-1002', numero: 'OS 1002', clienteId: 'CLI-003', veiculoId: 'VEI-003', origem: 'Cilia', numeroOrcamento: 'CIL-1002', idExterno: 'CILIA-1002', sinistro: 'SIN-2026-1002', seguradora: 'Tokio Marine', tipoAtendimento: 'Seguradora', responsavel: 'Paula Nunes', etapaId: 'ETP-04', etapaEntrada: '2026-06-10', condicoes: [], condicoesDetalhes: [], status: 'Em produção', entradaPrevista: '2026-06-05', entrada: '2026-06-05', aprovacao: '2026-06-02', previsaoInicial: '2026-06-17', previsao: '2026-06-17', entregaReal: '', valor: 4100, valores: { maoObra: 1700, pecas: 1700, materiais: 500, terceiros: 200, desconto: 0, aprovado: 4100 }, conclusao: 68 },
    { id: 'OS-1003', numero: 'OS 1003', clienteId: 'CLI-004', veiculoId: 'VEI-004', origem: 'Manual', numeroOrcamento: 'MAN-1003', idExterno: 'MANUAL-1003', sinistro: 'SIN-2026-1003', seguradora: 'Cliente particular', tipoAtendimento: 'Particular', responsavel: 'Rafael Santos', etapaId: 'ETP-05', etapaEntrada: '2026-06-06', condicoes: [], condicoesDetalhes: [], status: 'Em produção', entradaPrevista: '2026-05-29', entrada: '2026-05-29', aprovacao: '2026-05-28', previsaoInicial: '2026-06-10', previsao: '2026-06-10', entregaReal: '', valor: 9600, valores: { maoObra: 4400, pecas: 3500, materiais: 900, terceiros: 800, desconto: 0, aprovado: 9600 }, conclusao: 78 },
    { id: 'OS-1004', numero: 'OS 1004', clienteId: 'CLI-005', veiculoId: 'VEI-005', origem: 'Cilia', numeroOrcamento: 'CIL-1004', idExterno: 'CILIA-1004', sinistro: 'SIN-2026-1004', seguradora: 'HDI Seguros', tipoAtendimento: 'Seguradora', responsavel: 'Lucas Prado', etapaId: 'ETP-06', etapaEntrada: '2026-06-10', condicoes: [], condicoesDetalhes: [], status: 'Em produção', entradaPrevista: '2026-06-04', entrada: '2026-06-04', aprovacao: '2026-06-02', previsaoInicial: '2026-06-12', previsao: '2026-06-12', entregaReal: '', valor: 6200, valores: { maoObra: 2600, pecas: 2300, materiais: 700, terceiros: 600, desconto: 0, aprovado: 6200 }, conclusao: 88 },
    { id: 'OS-1005', numero: 'OS 1005', clienteId: 'CLI-006', veiculoId: 'VEI-006', origem: 'Soma', numeroOrcamento: 'SOM-1005', idExterno: 'SOMA-1005', sinistro: 'SIN-2026-1005', seguradora: 'Liberty', tipoAtendimento: 'Seguradora', responsavel: 'Marina Lopes', etapaId: 'ETP-07', etapaEntrada: '2026-06-09', condicoes: [], condicoesDetalhes: [], status: 'Finalizado', entradaPrevista: '2026-05-27', entrada: '2026-05-27', aprovacao: '2026-05-25', previsaoInicial: '2026-06-11', previsao: '2026-06-11', entregaReal: '', valor: 5400, valores: { maoObra: 2200, pecas: 2100, materiais: 600, terceiros: 500, desconto: 0, aprovado: 5400 }, conclusao: 100 },
    { id: 'OS-1006', numero: 'OS 1006', clienteId: 'CLI-007', veiculoId: 'VEI-007', origem: 'Cilia', numeroOrcamento: 'CIL-1006', idExterno: 'CILIA-1006', sinistro: 'SIN-2026-1006', seguradora: 'Sompo Seguros', tipoAtendimento: 'Seguradora', responsavel: 'Marina Lopes', etapaId: 'ETP-07', etapaEntrada: '2026-06-06', condicoes: [], condicoesDetalhes: [], status: 'Entregue', entradaPrevista: '2026-06-02', entrada: '2026-06-02', aprovacao: '2026-05-31', previsaoInicial: '2026-06-09', previsao: '2026-06-09', entregaReal: '2026-06-09', valor: 3100, valores: { maoObra: 1200, pecas: 1400, materiais: 300, terceiros: 200, desconto: 0, aprovado: 3100 }, conclusao: 100 },
    { id: 'OS-1007', numero: 'OS 1007', clienteId: 'CLI-008', veiculoId: 'VEI-008', origem: 'Manual', numeroOrcamento: 'MAN-1007', idExterno: 'MANUAL-1007', sinistro: 'Sem sinistro', seguradora: 'Cliente particular', tipoAtendimento: 'Particular', responsavel: 'Caio Dicieri', etapaId: 'ETP-01', etapaEntrada: '', condicoes: [], condicoesDetalhes: [], status: 'Cancelado', entradaPrevista: '2026-06-07', entrada: '', aprovacao: '2026-06-04', previsaoInicial: '2026-06-15', previsao: '2026-06-15', entregaReal: '', valor: 7200, valores: { maoObra: 3000, pecas: 3000, materiais: 700, terceiros: 500, desconto: 0, aprovado: 7200 }, conclusao: 0 },
    { id: 'OS-1008', numero: 'OS 1008', clienteId: 'CLI-009', veiculoId: 'VEI-009', origem: 'Cilia', numeroOrcamento: 'CIL-1008', idExterno: 'CILIA-1008', sinistro: 'SIN-2026-1008', seguradora: 'Bradesco Seguros', tipoAtendimento: 'Seguradora', responsavel: 'Paula Nunes', etapaId: 'ETP-01', etapaEntrada: '', condicoes: [], condicoesDetalhes: [], status: 'Agendado', entradaPrevista: '2026-06-12', entrada: '', aprovacao: '2026-06-08', previsaoInicial: '2026-06-21', previsao: '2026-06-21', entregaReal: '', valor: 6800, valores: { maoObra: 2800, pecas: 2600, materiais: 800, terceiros: 600, desconto: 0, aprovado: 6800 }, conclusao: 0 },
    { id: 'OS-1009', numero: 'OS 1009', clienteId: 'CLI-010', veiculoId: 'VEI-010', origem: 'Soma', numeroOrcamento: 'SOM-1009', idExterno: 'SOMA-1009', sinistro: 'SIN-2026-1009', seguradora: 'Allianz', tipoAtendimento: 'Seguradora', responsavel: 'Rafael Santos', etapaId: 'ETP-03', etapaEntrada: '2026-06-11', condicoes: ['CON-02'], condicoesDetalhes: [{ id: 'CP-1009-1', tipoId: 'CON-02', inicio: '2026-06-11', fim: '', status: 'Ativa', observacao: 'Aguardando autorização para retrabalho após retorno.', responsavel: 'Rafael Santos' }], status: 'Em produção', entradaPrevista: '2026-06-03', entrada: '2026-06-03', aprovacao: '2026-06-01', previsaoInicial: '2026-06-18', previsao: '2026-06-18', entregaReal: '', valor: 11200, valores: { maoObra: 5000, pecas: 4300, materiais: 900, terceiros: 1000, desconto: 0, aprovado: 11200 }, conclusao: 58 },
    { id: 'OS-1010', numero: 'OS 1010', clienteId: 'CLI-011', veiculoId: 'VEI-011', origem: 'Cilia', numeroOrcamento: 'CIL-1010', idExterno: 'CILIA-1010', sinistro: 'SIN-2026-1010', seguradora: 'Mapfre', tipoAtendimento: 'Seguradora', responsavel: 'Lucas Prado', etapaId: 'ETP-02', etapaEntrada: '2026-06-10', condicoes: ['CON-04'], condicoesDetalhes: [{ id: 'CP-1010-1', tipoId: 'CON-04', inicio: '2026-06-10', fim: '', status: 'Ativa', observacao: 'Martelinho em peça lateral.', responsavel: 'Lucas Prado' }], status: 'Fechado', entradaPrevista: '2026-05-20', entrada: '2026-05-20', aprovacao: '2026-05-18', previsaoInicial: '2026-06-02', previsao: '2026-06-02', entregaReal: '2026-06-01', valor: 9400, valores: { maoObra: 4100, pecas: 3300, materiais: 900, terceiros: 1100, desconto: 0, aprovado: 9400 }, conclusao: 100 }
  ],
  servicosOS: [
    { id: 'SRV-1042-1', osId: 'os-1042', descricao: 'Reparo de paralama dianteiro esquerdo', setor: 'Funilaria', quantidade: 1, valorUnitario: 1850, origem: 'Orçamento Cilia', status: 'Em execução', complementoId: '' },
    { id: 'SRV-1042-2', osId: 'os-1042', descricao: 'Preparação e pintura do para-choque', setor: 'Pintura', quantidade: 1, valorUnitario: 2400, origem: 'Orçamento Cilia', status: 'Autorizado', complementoId: '' },
    { id: 'SRV-1042-3', osId: 'os-1042', descricao: 'Substituição de suporte interno', setor: 'Montagem', quantidade: 1, valorUnitario: 820, origem: 'Complemento', status: 'Previsto', complementoId: 'CMP-1042-1' }
  ],
  pecasOS: [
    { id: 'PEC-1042-1', osId: 'os-1042', descricao: 'Paralama dianteiro esquerdo', codigo: 'ONX-PAR-LE', quantidade: 1, fornecedor: 'Auto Peças Leste', situacao: 'Parcialmente recebido', compraId: 'COM-1042-1', previsao: '2026-06-12', custoEstimado: 1450, custoReal: 1450, recebido: '1/1' },
    { id: 'PEC-1042-2', osId: 'os-1042', descricao: 'Suporte interno do para-choque', codigo: 'ONX-SUP-INT', quantidade: 1, fornecedor: 'Auto Peças Leste', situacao: 'Pedido', compraId: 'COM-1042-1', previsao: '2026-06-13', custoEstimado: 680, custoReal: 0, recebido: '0/1' },
    { id: 'PEC-1042-3', osId: 'os-1042', descricao: 'Kit presilhas dianteiro', codigo: 'ONX-KIT-PRE', quantidade: 12, fornecedor: 'Ferramentas Max', situacao: 'Recebido', compraId: 'COM-1042-2', previsao: '2026-06-10', custoEstimado: 120, custoReal: 118, recebido: '12/12' }
  ],
  complementos: [
    { id: 'CMP-1042-1', osId: 'os-1042', numero: 'COMP-1042-01', motivo: 'Dano interno identificado após desmontagem', data: '2026-06-09', descricao: 'Necessária substituição do suporte interno do para-choque e ajustes de fixação.', status: 'Aguardando aprovação', valorSolicitado: 1480, valorAprovado: 0, impactoPrevisao: '+1 dia', novaPrevisao: '2026-06-14', itens: ['Suporte interno', 'Mão de obra adicional'], documentos: ['laudo-complemento-1042.pdf'], observacoes: 'Enviado para seguradora com fotos da desmontagem.' },
    { id: 'CMP-1001-1', osId: 'OS-1001', numero: 'COMP-1001-01', motivo: 'Capa de retrovisor com trinca', data: '2026-06-09', descricao: 'Pintura adicional da capa do retrovisor.', status: 'Solicitado', valorSolicitado: 450, valorAprovado: 0, impactoPrevisao: 'Sem impacto', novaPrevisao: '2026-06-13', itens: ['Pintura adicional'], documentos: [], observacoes: 'Cliente avalia aprovação.' },
    { id: 'CMP-1003-1', osId: 'OS-1003', numero: 'COMP-1003-01', motivo: 'Alinhamento de painel', data: '2026-06-02', descricao: 'Ajuste estrutural aprovado parcialmente.', status: 'Aprovado parcialmente', valorSolicitado: 900, valorAprovado: 600, impactoPrevisao: '+2 dias', novaPrevisao: '2026-06-10', itens: ['Alinhamento'], documentos: ['aprovacao-parcial.pdf'], observacoes: 'Parte do serviço será tratada como cortesia.' }
  ],
  fornecedores: [
    { id: 'FOR-001', nome: 'Auto Peças Leste', categoria: 'Peças', telefone: '(11) 4000-1000' },
    { id: 'FOR-002', nome: 'Tintas Premium', categoria: 'Tintas', telefone: '(11) 4000-2000' },
    { id: 'FOR-003', nome: 'Martelinho Express', categoria: 'Terceirização', telefone: '(11) 4000-3000' },
    { id: 'FOR-004', nome: 'Ferramentas Max', categoria: 'Insumos', telefone: '(11) 4000-4000' },
    { id: 'FOR-005', nome: 'Logística Rápida', categoria: 'Transporte', telefone: '(11) 4000-5000' }
  ],
  compras: [
    { id: 'COM-1042-1', pedido: 'PED-2042', fornecedorId: 'FOR-001', osId: 'os-1042', item: 'Paralama e suporte interno Onix', quantidade: 2, quantidadeRecebida: 1, status: 'Parcialmente recebido', situacao: 'Parcialmente recebido', valor: 2130, previsaoEntrega: '2026-06-13', vencimento: '2026-06-18', contaPagarId: 'PAG-1042-1' },
    { id: 'COM-1042-2', pedido: 'PED-2043', fornecedorId: 'FOR-004', osId: 'os-1042', item: 'Kit presilhas dianteiro', quantidade: 12, quantidadeRecebida: 12, status: 'Entregue', situacao: 'Recebido', valor: 118, previsaoEntrega: '2026-06-10', vencimento: '2026-06-12', contaPagarId: null },
    { id: 'COM-001', pedido: 'PED-2001', fornecedorId: 'FOR-001', osId: 'OS-1001', item: 'Capa retrovisor Civic', quantidade: 1, quantidadeRecebida: 0, status: 'Em aberto', situacao: 'Pedido', valor: 1250, previsaoEntrega: '2026-06-12', vencimento: '2026-06-12', contaPagarId: 'PAG-001' },
    { id: 'COM-002', pedido: 'PED-2002', fornecedorId: 'FOR-002', osId: 'OS-1002', item: 'Kit tinta branca', quantidade: 1, quantidadeRecebida: 1, status: 'Entregue', situacao: 'Recebido', valor: 890, previsaoEntrega: '2026-06-09', vencimento: '2026-06-09', contaPagarId: 'PAG-002' },
    { id: 'COM-003', pedido: 'PED-2003', fornecedorId: 'FOR-003', osId: 'OS-1010', item: 'Martelinho lateral', quantidade: 1, quantidadeRecebida: 0, status: 'Em aberto', situacao: 'Serviço terceirizado', valor: 1500, previsaoEntrega: '2026-06-15', vencimento: '2026-06-15', contaPagarId: 'PAG-003' },
    { id: 'COM-004', pedido: 'PED-2004', fornecedorId: 'FOR-001', osId: 'OS-1008', item: 'Travessa frontal Duster', quantidade: 1, quantidadeRecebida: 0, status: 'Aguardando entrega', situacao: 'Pedido', valor: 1850, previsaoEntrega: '2026-06-14', vencimento: '2026-06-20', contaPagarId: null }
  ],
  financeiroOS: {
    'os-1042': {
      receitas: [
        { pagador: 'Porto Seguro', descricao: 'Parte principal do orçamento aprovado', bruto: 10500, taxa: 420, liquido: 10080, vencimento: '2026-06-20', status: 'A receber' },
        { pagador: 'Roberto Almeida', descricao: 'Franquia', bruto: 1500, taxa: 0, liquido: 1500, vencimento: '2026-06-14', status: 'A receber' },
        { pagador: 'Roberto Almeida', descricao: 'Serviço adicional particular', bruto: 780, taxa: 0, liquido: 780, vencimento: '2026-06-14', status: 'Pendente' }
      ],
      custos: { pecas: 2248, materiais: 980, terceiros: 760, taxas: 420, outros: 180 }
    }
  },
  documentosOS: [
    { id: 'DOC-1042-1', osId: 'os-1042', nome: 'orcamento-cilia-1042.pdf', categoria: 'orçamento', data: '2026-06-02', usuario: 'Marina Lopes', tamanho: '420 KB' },
    { id: 'DOC-1042-2', osId: 'os-1042', nome: 'autorizacao-porto-seguro.pdf', categoria: 'autorização', data: '2026-06-02', usuario: 'Marina Lopes', tamanho: '310 KB' },
    { id: 'DOC-1042-3', osId: 'os-1042', nome: 'laudo-complemento-1042.pdf', categoria: 'complemento', data: '2026-06-09', usuario: 'Rafael Santos', tamanho: '880 KB' }
  ],
  fotosOS: [
    { id: 'FOT-1042-1', osId: 'os-1042', categoria: 'entrada', legenda: 'Frente do veículo na chegada', data: '2026-06-04', usuario: 'Marina Lopes', cor: '#dbeafe' },
    { id: 'FOT-1042-2', osId: 'os-1042', categoria: 'desmontagem', legenda: 'Detalhe interno após desmontagem', data: '2026-06-08', usuario: 'Rafael Santos', cor: '#ffedd5' },
    { id: 'FOT-1042-3', osId: 'os-1042', categoria: 'funilaria', legenda: 'Paralama em reparo', data: '2026-06-10', usuario: 'Rafael Santos', cor: '#dcfce7' }
  ],
  observacoesOS: [
    { id: 'OBS-1042-1', osId: 'os-1042', autor: 'Rafael Santos', dataHora: '2026-06-10T16:20:00', categoria: 'produção', texto: 'Retorno para Funilaria registrado após ajuste de alinhamento no paralama.', fixada: true },
    { id: 'OBS-1042-2', osId: 'os-1042', autor: 'Marina Lopes', dataHora: '2026-06-11T09:10:00', categoria: 'seguradora', texto: 'Seguradora cobrada sobre o complemento COMP-1042-01.', fixada: false },
    { id: 'OBS-1042-3', osId: 'os-1042', autor: 'Caio Dicieri', dataHora: '2026-06-11T11:00:00', categoria: 'alerta interno', texto: 'Não prometer entrega antes da chegada do suporte interno.', fixada: true }
  ],
  movimentacoesOS: [
    { id: 'MOV-1042-1', osId: 'os-1042', entrada: '2026-06-04T09:00:00', saida: '2026-06-05T17:20:00', etapaId: 'ETP-01', responsavel: 'Rafael Santos', motivo: 'Entrada produtiva', observacao: 'Desmontagem inicial concluída.', retrabalho: false },
    { id: 'MOV-1042-2', osId: 'os-1042', entrada: '2026-06-05T17:20:00', saida: '2026-06-07T15:00:00', etapaId: 'ETP-02', responsavel: 'Rafael Santos', motivo: 'Avanço de etapa', observacao: 'Entrou em Funilaria.', retrabalho: false },
    { id: 'MOV-1042-3', osId: 'os-1042', entrada: '2026-06-07T15:00:00', saida: '2026-06-08T10:15:00', etapaId: 'ETP-03', responsavel: 'Lucas Prado', motivo: 'Avanço para preparação', observacao: 'Preparação iniciou e identificou desalinhamento.', retrabalho: false },
    { id: 'MOV-1042-4', osId: 'os-1042', entrada: '2026-06-08T10:15:00', saida: '', etapaId: 'ETP-02', responsavel: 'Rafael Santos', motivo: 'Retorno para etapa anterior', observacao: 'Retorno para Funilaria para corrigir alinhamento antes de nova preparação.', retrabalho: true },
    { id: 'MOV-1009-1', osId: 'OS-1009', entrada: '2026-06-03T08:30:00', saida: '2026-06-06T12:00:00', etapaId: 'ETP-02', responsavel: 'Rafael Santos', motivo: 'Funilaria', observacao: 'Etapa concluída.', retrabalho: false },
    { id: 'MOV-1009-2', osId: 'OS-1009', entrada: '2026-06-06T12:00:00', saida: '2026-06-09T14:00:00', etapaId: 'ETP-03', responsavel: 'Lucas Prado', motivo: 'Preparação', observacao: 'Preparação interrompida.', retrabalho: false },
    { id: 'MOV-1009-3', osId: 'OS-1009', entrada: '2026-06-09T14:00:00', saida: '2026-06-11T09:00:00', etapaId: 'ETP-02', responsavel: 'Rafael Santos', motivo: 'Retorno por retrabalho', observacao: 'Retornou para Funilaria.', retrabalho: true },
    { id: 'MOV-1009-4', osId: 'OS-1009', entrada: '2026-06-11T09:00:00', saida: '', etapaId: 'ETP-03', responsavel: 'Lucas Prado', motivo: 'Avanço novamente', observacao: 'Avançou novamente para Preparação.', retrabalho: false }
  ],
  historicoOS: [
    { id: 'HIS-1042-1', osId: 'os-1042', dataHora: '2026-06-02T10:20:00', usuario: 'Marina Lopes', tipo: 'importação', descricao: 'Orçamento importado do Cilia.', antes: '', depois: 'ORC-CIL-78942' },
    { id: 'HIS-1042-2', osId: 'os-1042', dataHora: '2026-06-02T15:40:00', usuario: 'Marina Lopes', tipo: 'aprovação', descricao: 'Orçamento aprovado e OS criada.', antes: 'Aguardando aprovação', depois: 'Aprovado' },
    { id: 'HIS-1042-3', osId: 'os-1042', dataHora: '2026-06-04T09:00:00', usuario: 'Rafael Santos', tipo: 'criação', descricao: 'Entrada real do veículo e início da OS.', antes: '', depois: 'Na oficina' },
    { id: 'HIS-1042-4', osId: 'os-1042', dataHora: '2026-06-05T17:20:00', usuario: 'Rafael Santos', tipo: 'movimentação', descricao: 'Veículo movimentado para Funilaria.', antes: 'Desmontagem', depois: 'Funilaria' },
    { id: 'HIS-1042-5', osId: 'os-1042', dataHora: '2026-06-07T15:00:00', usuario: 'Lucas Prado', tipo: 'movimentação', descricao: 'Veículo avançou para Preparação.', antes: 'Funilaria', depois: 'Preparação' },
    { id: 'HIS-1042-6', osId: 'os-1042', dataHora: '2026-06-08T10:15:00', usuario: 'Rafael Santos', tipo: 'retorno', descricao: 'Retorno para Funilaria por desalinhamento identificado.', antes: 'Preparação', depois: 'Funilaria' },
    { id: 'HIS-1042-7', osId: 'os-1042', dataHora: '2026-06-09T11:30:00', usuario: 'Marina Lopes', tipo: 'complemento', descricao: 'Complemento COMP-1042-01 criado e enviado.', antes: '', depois: 'Aguardando aprovação' },
    { id: 'HIS-1042-8', osId: 'os-1042', dataHora: '2026-06-10T08:50:00', usuario: 'Caio Dicieri', tipo: 'compras', descricao: 'Compra PED-2042 recebeu parcialmente os itens.', antes: 'Pedido', depois: 'Parcialmente recebido' },
    { id: 'HIS-1042-9', osId: 'os-1042', dataHora: '2026-06-10T16:20:00', usuario: 'Rafael Santos', tipo: 'observações', descricao: 'Observação de produção fixada.', antes: '', depois: 'Fixada' },
    { id: 'HIS-1042-10', osId: 'os-1042', dataHora: '2026-06-11T09:10:00', usuario: 'Marina Lopes', tipo: 'documentos', descricao: 'Laudo do complemento anexado.', antes: '', depois: 'laudo-complemento-1042.pdf' },
    { id: 'HIS-1042-11', osId: 'os-1042', dataHora: '2026-06-11T11:00:00', usuario: 'Caio Dicieri', tipo: 'financeiro', descricao: 'Receitas separadas entre seguradora, franquia e adicional.', antes: '', depois: '3 pagadores' }
  ],
  contasReceber: [
    { id: 'REC-1042-1', osId: 'os-1042', pagador: 'Porto Seguro', descricao: 'Parte principal OS 1042', status: 'Em aberto', valor: 10080, vencimento: '2026-06-20' },
    { id: 'REC-1042-2', osId: 'os-1042', pagador: 'Roberto Almeida', descricao: 'Franquia OS 1042', status: 'Em aberto', valor: 1500, vencimento: '2026-06-14' },
    { id: 'REC-001', osId: 'OS-1001', pagador: 'Azul Seguros', descricao: 'Indenização OS 1001', status: 'Em aberto', valor: 8200, vencimento: '2026-06-18' },
    { id: 'REC-002', osId: 'OS-1002', pagador: 'Tokio Marine', descricao: 'Indenização OS 1002', status: 'Recebido', valor: 4100, vencimento: '2026-06-10' },
    { id: 'REC-003', osId: 'OS-1003', pagador: 'Carla Moreno', descricao: 'Serviço particular', status: 'Vencido', valor: 9600, vencimento: '2026-06-09' },
    { id: 'REC-004', osId: 'OS-1006', pagador: 'Sompo Seguros', descricao: 'Final OS 1006', status: 'Vencendo hoje', valor: 3100, vencimento: '2026-06-11' }
  ],
  contasPagar: [
    { id: 'PAG-1042-1', fornecedorId: 'FOR-001', compraId: 'COM-1042-1', descricao: 'Paralama e suporte Onix', status: 'Em aberto', valor: 2130, vencimento: '2026-06-18' },
    { id: 'PAG-001', fornecedorId: 'FOR-001', compraId: 'COM-001', descricao: 'Capa retrovisor Civic', status: 'Em aberto', valor: 1250, vencimento: '2026-06-12' },
    { id: 'PAG-002', fornecedorId: 'FOR-002', compraId: 'COM-002', descricao: 'Kit tinta branca', status: 'Pago', valor: 890, vencimento: '2026-06-09' },
    { id: 'PAG-003', fornecedorId: 'FOR-003', compraId: 'COM-003', descricao: 'Martelinho lateral', status: 'Em aberto', valor: 1500, vencimento: '2026-06-15' },
    { id: 'PAG-004', fornecedorId: 'FOR-004', compraId: null, descricao: 'Discos de lixa', status: 'Vencendo hoje', valor: 430, vencimento: '2026-06-11' },
    { id: 'PAG-005', fornecedorId: 'FOR-005', compraId: null, descricao: 'Coleta de peças', status: 'Em aberto', valor: 260, vencimento: '2026-06-18' }
  ],
  filaVeiculos: [
    { id: 'FIL-001', clienteId: 'CLI-012', veiculoId: 'VEI-012', data: '2026-06-12', status: 'Agendado', responsavel: 'Marina Lopes' }
  ],
  limitesEtapa: { 'ETP-01': 2, 'ETP-02': 4, 'ETP-03': 3, 'ETP-04': 3, 'ETP-05': 3, 'ETP-06': 2, 'ETP-07': 1 },
  agendaEventos: [
    { id: 'AGE-001', tipo: 'entrada', data: '2026-06-04', hora: '09:00', titulo: 'Entrada Chevrolet Onix', descricao: 'Recepção e abertura produtiva da OS 1042.', responsavel: 'Marina Lopes', status: 'Concluído', registroTipo: 'OS', registroId: 'OS 1042', link: 'ordem-servico-detalhes.html?id=os-1042' },
    { id: 'AGE-002', tipo: 'peca', data: '2026-06-13', hora: '10:00', titulo: 'Chegada suporte Onix', descricao: 'Item faltante da compra PED-2042 para OS 1042.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'Compra', registroId: 'COM-1042-1', link: 'compras.html?compra=COM-1042-1' },
    { id: 'AGE-003', tipo: 'complemento', data: '2026-06-12', hora: '10:30', titulo: 'Aprovar complemento OS 1042', descricao: 'Complemento COMP-1042-01 aguardando aprovação.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'Complemento', registroId: 'CMP-1042-1', link: 'ordem-servico-detalhes.html?id=os-1042#complementos' },
    { id: 'AGE-004', tipo: 'entrega', data: '2026-06-11', hora: '11:00', titulo: 'Entrega Fiat Pulse', descricao: 'OS 1005 finalizada aguardando entrega.', responsavel: 'Rafael Santos', status: 'Pendente', registroTipo: 'OS', registroId: 'OS-1005', link: 'ordem-servico-detalhes.html?id=OS-1005' },
    { id: 'AGE-005', tipo: 'entrada', data: '2026-06-12', hora: '14:00', titulo: 'Entrada Peugeot 208', descricao: 'Veículo agendado na fila FIL-001 para vistoria inicial.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'Fila', registroId: 'FIL-001', link: 'veiculos.html?vei=VEI-012' },
    { id: 'AGE-006', tipo: 'recebimento', data: '2026-06-11', hora: '16:30', titulo: 'Receber final OS 1006', descricao: 'Título REC-004 vencendo hoje.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Recebimento', registroId: 'REC-004', link: 'contas-receber.html?rec=REC-004' },
    { id: 'AGE-007', tipo: 'pagamento', data: '2026-06-11', hora: '17:00', titulo: 'Pagar discos de lixa', descricao: 'Pagamento PAG-004 vencendo hoje.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Pagamento', registroId: 'PAG-004', link: 'contas-pagar.html?pag=PAG-004' },
    { id: 'AGE-008', tipo: 'interno', data: '2026-06-13', hora: '08:00', titulo: 'Reunião semanal da produção', descricao: 'Alinhamento de gargalos e compras prioritárias.', responsavel: 'Caio Dicieri', status: 'Pendente', registroTipo: 'Interno', registroId: 'INT-001', link: 'agenda.html?evento=AGE-008' },
    { id: 'AGE-009', tipo: 'entrega', data: '2026-06-14', hora: '15:30', titulo: 'Entrega OS 1042', descricao: 'Entrega prevista conforme previsão atual da OS 1042.', responsavel: 'Marina Lopes', status: 'Pendente', registroTipo: 'OS', registroId: 'OS 1042', link: 'ordem-servico-detalhes.html?id=os-1042' }
  ],
  usuarios: [
    { id: 'USR-001', nome: 'Caio Dicieri', perfil: 'Administrador', email: 'caio@melo.local' },
    { id: 'USR-002', nome: 'Marina Lopes', perfil: 'Atendimento', email: 'marina@melo.local' },
    { id: 'USR-003', nome: 'Rafael Santos', perfil: 'Produção', email: 'rafael@melo.local' },
    { id: 'USR-004', nome: 'Lucas Prado', perfil: 'Preparação/Pintura', email: 'lucas@melo.local' },
    { id: 'USR-005', nome: 'Paula Nunes', perfil: 'Compras', email: 'paula@melo.local' }
  ]
};
