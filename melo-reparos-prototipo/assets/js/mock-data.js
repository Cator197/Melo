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


(() => {
  const d = window.MeloMockData;
  const osAlloc = (osId, quantidade, valor, percentual) => ({ osId, quantidade, valor, percentual });
  const item = (id, descricao, codigo, qtd, recebida, unit, status, previsao, alocacoes, extra = {}) => {
    const desconto = extra.desconto || 0;
    const frete = extra.frete || 0;
    const custoTotal = Math.round((qtd * unit - desconto + frete) * 100) / 100;
    return { id, descricao, codigo, quantidade: qtd, unidade: extra.unidade || 'un', quantidadeRecebida: recebida, quantidadePendente: Math.max(0, qtd - recebida), custoUnitario: unit, desconto, freteProporcional: frete, custoTotal, previsao: previsao || extra.previsao || '2026-06-14', status, observacao: extra.observacao || '', complementoId: extra.complementoId || '', fornecedorId: extra.fornecedorId || '', divergencias: extra.divergencias || [], devolucoes: extra.devolucoes || [], documentos: extra.documentos || [], alocacoes: alocacoes || [] };
  };
  const hist = (tipo, descricao, dataHora = '2026-06-11T10:00:00', usuario = 'Paula Nunes', antes = '', depois = '', itemId = '', osId = '') => ({ id: `HCOMP-${Math.random().toString(36).slice(2, 9)}`, dataHora, usuario, tipo, descricao, antes, depois, itemId, osId });
  const docs = (base) => [
    { id: `${base}-doc-1`, nome: `${base.toLowerCase()}-pedido.pdf`, categoria: 'pedido', data: '2026-06-08', usuario: 'Paula Nunes', tamanho: '220 KB' },
    { id: `${base}-doc-2`, nome: `${base.toLowerCase()}-nf.pdf`, categoria: 'nota fiscal', data: '2026-06-10', usuario: 'Caio Dicieri', tamanho: '340 KB' }
  ];
  d.compras = [
    { id:'compra-001', pedido:'PED-2042', pedidoExterno:'AP-7781', fornecedorId:'FOR-001', dataCompra:'2026-06-08', responsavel:'Paula Nunes', previsaoEntrega:'2026-06-13', formaPagamento:'boleto', condicaoPagamento:'7 dias', observacoes:'Compra principal da OS 1042; recebimento parcial mantém Aguardando peça.', necessitaContaPagar:true, contaPagarId:'PAG-1042-1', status:'parcialmente recebido', statusRecebimento:'parcial', statusFinanceiro:'conta a pagar criada', itens:[
      item('pci-001','Paralama dianteiro Onix','GM-ONX-PAR-21',1,1,1450,'recebido','2026-06-10',[osAlloc('os-1042',1,1450,100)]),
      item('pci-002','Suporte interno dianteiro Onix','GM-ONX-SUP-21',1,0,680,'pedido','2026-06-13',[osAlloc('os-1042',1,680,100)],{observacao:'Peça pendente mantém OS 1042 aguardando peça.'}),
      item('pci-003','Moldura de acabamento frontal','GM-ONX-MOL-21',2,1,125,'parcialmente recebido','2026-06-13',[osAlloc('os-1042',2,250,100)])
    ], recebimentos:[{id:'REC-COMP-001',data:'2026-06-10',documento:'NF-2042-A',responsavel:'Paula Nunes',itens:[{itemId:'pci-001',quantidade:1},{itemId:'pci-003',quantidade:1}],observacao:'Recebimento parcial.'}], divergencias:[], devolucoes:[], documentos:docs('PED-2042'), historico:[hist('criação','Pedido criado e vinculado à OS 1042.','2026-06-08T09:10:00'),hist('recebimento parcial','Recebidas 2 de 4 unidades vinculadas.','2026-06-10T08:50:00','','pedido','parcialmente recebido','','os-1042')] },
    { id:'compra-002', pedido:'PED-2050', fornecedorId:'FOR-002', dataCompra:'2026-06-09', responsavel:'Lucas Prado', previsaoEntrega:'2026-06-12', formaPagamento:'pix', condicaoPagamento:'à vista', observacoes:'Tinta rateada entre duas OSs.', necessitaContaPagar:true, contaPagarId:null, status:'pedido realizado', statusRecebimento:'pendente', statusFinanceiro:'lançamento pendente', itens:[
      item('pci-004','Tinta PU azul perolizado','TIN-AZP-900',3,0,210,'pedido','2026-06-12',[osAlloc('OS-1004',1.8,378,60),osAlloc('OS-1007',1.2,252,40)]),
      item('pci-005','Catalisador PU premium','CAT-PU-05',2,0,85,'pedido','2026-06-12',[osAlloc('OS-1004',1,85,50),osAlloc('OS-1007',1,85,50)]),
      item('pci-006','Diluente acabamento','DIL-AC-01',1,0,58,'pedido','2026-06-12',[osAlloc('OS-1004',1,58,100)])
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[docs('PED-2050')[0]], historico:[hist('criação','Pedido realizado para Tintas Premium.','2026-06-09T14:10:00')] },
    { id:'compra-003', pedido:'PED-2051', fornecedorId:'FOR-004', dataCompra:'2026-06-07', responsavel:'Caio Dicieri', previsaoEntrega:'2026-06-09', formaPagamento:'cartão', condicaoPagamento:'1 parcela', observacoes:'Compra recebida integralmente.', necessitaContaPagar:true, contaPagarId:'PAG-2051', status:'recebido', statusRecebimento:'total', statusFinanceiro:'pago', itens:[
      item('pci-007','Kit presilhas dianteiro','PRS-DIA-12',12,12,9.83,'recebido','2026-06-09',[osAlloc('os-1042',12,117.96,100)]),
      item('pci-008','Lixa P400 pacote','LIX-P400',5,5,24,'recebido','2026-06-09',[osAlloc('OS-1002',5,120,100)])
    ], recebimentos:[{id:'REC-COMP-003',data:'2026-06-09',documento:'NF-2051',responsavel:'Caio Dicieri',itens:[{itemId:'pci-007',quantidade:12},{itemId:'pci-008',quantidade:5}]}], divergencias:[], devolucoes:[], documentos:docs('PED-2051'), historico:[hist('recebimento','Todos os itens recebidos e conferidos.','2026-06-09T16:30:00')] },
    { id:'compra-004', pedido:'PED-2052', fornecedorId:'FOR-001', dataCompra:'2026-06-05', responsavel:'Paula Nunes', previsaoEntrega:'2026-06-10', formaPagamento:'boleto', condicaoPagamento:'10 dias', observacoes:'Pedido atrasado do fornecedor.', necessitaContaPagar:true, contaPagarId:null, status:'pedido realizado', statusRecebimento:'pendente', statusFinanceiro:'lançamento pendente', itens:[
      item('pci-009','Travessa frontal Duster','REN-DUS-TRV',1,0,1850,'pedido','2026-06-10',[osAlloc('OS-1008',1,1850,100)]),
      item('pci-010','Guia parachoque Duster','REN-DUS-GUI',2,0,145,'pedido','2026-06-10',[osAlloc('OS-1008',2,290,100)])
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[docs('PED-2052')[0]], historico:[hist('previsão alterada','Fornecedor informou atraso de entrega.','2026-06-10T11:20:00','Paula Nunes','2026-06-09','2026-06-10')] },
    { id:'compra-005', pedido:'PED-2053', fornecedorId:'FOR-003', dataCompra:'2026-06-10', responsavel:'Rafael Santos', previsaoEntrega:'2026-06-15', formaPagamento:'transferência', condicaoPagamento:'na entrega', observacoes:'Serviço terceirizado ainda sem título financeiro.', necessitaContaPagar:true, contaPagarId:null, status:'pedido realizado', statusRecebimento:'pendente', statusFinanceiro:'lançamento pendente', itens:[
      item('pci-011','Martelinho lateral Ranger','MTE-RAN-LAT',1,0,1500,'pedido','2026-06-15',[osAlloc('OS-1010',1,1500,100)]),
      item('pci-012','Polimento técnico pós martelinho','POL-MTE-01',1,0,260,'pedido','2026-06-15',[osAlloc('OS-1010',1,260,100)])
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[], historico:[hist('criação','Compra necessita lançamento financeiro, ainda pendente.','2026-06-10T15:00:00')] },
    { id:'compra-006', pedido:'PED-2054', fornecedorId:'FOR-005', dataCompra:'2026-06-08', responsavel:'Marina Lopes', previsaoEntrega:'2026-06-11', formaPagamento:'cortesia', condicaoPagamento:'não aplicável', observacoes:'Bonificação logística sem lançamento financeiro.', necessitaContaPagar:false, semLancamentoMotivo:'bonificação', contaPagarId:null, status:'recebido', statusRecebimento:'total', statusFinanceiro:'lançamento não necessário', itens:[
      item('pci-013','Coleta emergencial de peça','LOG-COL-EMG',1,1,0,'recebido','2026-06-11',[osAlloc('OS-1001',1,0,100)]),
      item('pci-014','Entrega avulsa fornecedor','LOG-ENT-AVL',1,1,0,'recebido','2026-06-11',[osAlloc('os-1042',1,0,100)])
    ], recebimentos:[{id:'REC-COMP-006',data:'2026-06-11',responsavel:'Marina Lopes',itens:[{itemId:'pci-013',quantidade:1},{itemId:'pci-014',quantidade:1}]}], divergencias:[], devolucoes:[], documentos:[], historico:[hist('financeiro','Marcada como não necessita lançamento financeiro.','2026-06-08T13:00:00','Marina Lopes','','bonificação')] },
    { id:'compra-007', pedido:'PED-2055', fornecedorId:'FOR-001', dataCompra:'2026-06-04', responsavel:'Paula Nunes', previsaoEntrega:'2026-06-07', formaPagamento:'boleto', condicaoPagamento:'14 dias', observacoes:'Pedido com devolução parcial registrada.', necessitaContaPagar:true, contaPagarId:'PAG-2055', status:'devolução parcial', statusRecebimento:'parcial com devolução', statusFinanceiro:'parcialmente pago', itens:[
      item('pci-015','Farol esquerdo HB20','HYU-HB20-FE',1,1,980,'recebido','2026-06-07',[osAlloc('OS-1007',1,980,100)]),
      item('pci-016','Suporte farol HB20','HYU-HB20-SUPF',2,1,165,'devolvido parcialmente','2026-06-07',[osAlloc('OS-1007',2,330,100)],{devolucoes:[{id:'DEV-001',quantidade:1,motivo:'Peça com trava quebrada',data:'2026-06-08',responsavel:'Paula Nunes',impactoFinanceiro:-165,status:'troca solicitada'}]})
    ], recebimentos:[{id:'REC-COMP-007',data:'2026-06-07',documento:'NF-2055',responsavel:'Paula Nunes',itens:[{itemId:'pci-015',quantidade:1},{itemId:'pci-016',quantidade:2}]}], divergencias:[], devolucoes:[{id:'DEV-001',itemId:'pci-016',quantidade:1,motivo:'Peça avariada',data:'2026-06-08',responsavel:'Paula Nunes',impactoFinanceiro:-165,status:'troca solicitada'}], documentos:docs('PED-2055'), historico:[hist('devolução','Devolução parcial do suporte de farol registrada.','2026-06-08T10:40:00','Paula Nunes','2 válidas','1 válida','pci-016','OS-1007')] },
    { id:'compra-008', pedido:'PED-2056', fornecedorId:'FOR-002', dataCompra:'2026-06-06', responsavel:'Lucas Prado', previsaoEntrega:'2026-06-08', formaPagamento:'pix', condicaoPagamento:'à vista', observacoes:'Divergência de custo aceita parcialmente.', necessitaContaPagar:true, contaPagarId:'PAG-2056', status:'recebido', statusRecebimento:'total com divergência', statusFinanceiro:'conta a pagar criada', itens:[
      item('pci-017','Primer alto sólidos','PRI-AS-3L',2,2,240,'recebido','2026-06-08',[osAlloc('OS-1003',1,240,50),osAlloc('OS-1009',1,240,50)],{divergencias:[{id:'DIV-001',tipo:'custo divergente',quantidade:2,descricao:'Nota fiscal veio R$ 20 acima por unidade.',responsavel:'Lucas Prado',data:'2026-06-08',status:'aceita',solucao:'Aceito após aprovação do gestor.'}]}),
      item('pci-018','Massa poliéster premium','MAS-POL-1KG',4,4,62,'recebido','2026-06-08',[osAlloc('OS-1003',2,124,50),osAlloc('OS-1009',2,124,50)])
    ], recebimentos:[{id:'REC-COMP-008',data:'2026-06-08',documento:'NF-2056',responsavel:'Lucas Prado',itens:[{itemId:'pci-017',quantidade:2},{itemId:'pci-018',quantidade:4}]}], divergencias:[{id:'DIV-001',tipo:'custo divergente',itemId:'pci-017',quantidade:2,descricao:'Custo divergente na NF.',responsavel:'Lucas Prado',data:'2026-06-08',status:'aceita',solucao:'Ajuste aceito.'}], devolucoes:[], documentos:docs('PED-2056'), historico:[hist('divergência','Divergência de custo aceita no recebimento.','2026-06-08T17:00:00')] },
    { id:'compra-009', pedido:'PED-2057', fornecedorId:'FOR-004', dataCompra:'2026-06-11', responsavel:'Caio Dicieri', previsaoEntrega:'2026-06-16', formaPagamento:'boleto', condicaoPagamento:'30 dias', observacoes:'Compra cancelada; não entra em custo real ativo.', necessitaContaPagar:true, contaPagarId:null, status:'cancelado', statusRecebimento:'cancelado', statusFinanceiro:'lançamento cancelado', itens:[
      item('pci-019','Compressor de pintura reserva','CMP-PIN-RES',1,0,2200,'cancelado','2026-06-16',[]),
      item('pci-020','Mangueira pneumática 10m','MAN-PNE-10',1,0,190,'cancelado','2026-06-16',[])
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[], historico:[hist('cancelamento','Pedido cancelado antes de recebimento; custo removido da visão real.','2026-06-11T18:00:00','Caio Dicieri')] },
    { id:'compra-010', pedido:'PED-2058', fornecedorId:null, dataCompra:'2026-06-12', responsavel:'Marina Lopes', previsaoEntrega:'2026-06-17', formaPagamento:'a definir', condicaoPagamento:'a definir', observacoes:'Itens solicitados ainda sem fornecedor; sem cotação multifornecedor nesta fase.', necessitaContaPagar:true, contaPagarId:null, status:'aguardando compra', statusRecebimento:'não comprado', statusFinanceiro:'lançamento pendente', itens:[
      item('pci-021','Sensor de estacionamento complemento aprovado','CMP-SEN-EST',2,0,310,'não comprado','2026-06-17',[osAlloc('os-1042',1,310,50),osAlloc('OS-1001',1,310,50)],{complementoId:'CMP-1042-1'}),
      item('pci-022','Capa retrovisor Civic complemento','HON-CIV-CAP',1,0,450,'solicitado','2026-06-17',[osAlloc('OS-1001',1,450,100)],{complementoId:'CMP-1001-1'}),
      item('pci-023','Grampo acabamento sem rateio completo','GRP-ACB-20',20,0,4.5,'solicitado','2026-06-17',[osAlloc('OS-1002',10,45,50)],{observacao:'Metade ainda não rateada; exige justificativa para confirmar.'})
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[], historico:[hist('item adicionado','Itens de complemento aprovado entraram como aguardando compra.','2026-06-12T09:30:00','Marina Lopes')] },
    { id:'compra-011', pedido:'PED-2059', fornecedorId:'FOR-001', dataCompra:'2026-06-12', responsavel:'Paula Nunes', previsaoEntrega:'2026-06-18', formaPagamento:'boleto', condicaoPagamento:'21 dias', observacoes:'Rascunho com item sem OS vinculada.', necessitaContaPagar:true, contaPagarId:null, status:'rascunho', statusRecebimento:'rascunho', statusFinanceiro:'lançamento pendente', itens:[
      item('pci-024','Parachoque traseiro Kicks','NIS-KIC-PTR',1,0,1250,'solicitado','2026-06-18',[osAlloc('OS-1009',1,1250,100)]),
      item('pci-025','Sensor avulso sem OS vinculada','SEN-AVL-01',1,0,180,'solicitado','2026-06-18',[])
    ], recebimentos:[], divergencias:[], devolucoes:[], documentos:[], historico:[hist('criação','Rascunho criado, ainda sem pedido realizado.','2026-06-12T11:00:00','Paula Nunes')] }
  ];
  d.compras.forEach((compra) => {
    compra.itens.forEach((it) => { it.fornecedorId = compra.fornecedorId; it.compraId = compra.id; it.pedido = compra.pedido; });
    compra.valor = compra.itens.reduce((s, it) => s + it.custoTotal, 0);
    compra.quantidade = compra.itens.reduce((s, it) => s + it.quantidade, 0);
    compra.quantidadeRecebida = compra.itens.reduce((s, it) => s + it.quantidadeRecebida, 0);
    compra.item = compra.itens.map((it) => it.descricao).join(', ');
    compra.osIds = [...new Set(compra.itens.flatMap((it) => it.alocacoes.map((a) => a.osId)))];
    compra.osId = compra.osIds[0] || '';
  });
  d.pecasOS = d.compras.flatMap((compra) => compra.itens.flatMap((it) => it.alocacoes.map((al) => ({ id:`peca-${it.id}-${al.osId}`, compraId:compra.id, itemId:it.id, osId:al.osId, descricao:it.descricao, codigo:it.codigo, quantidade:al.quantidade, quantidadeRecebida:Math.min(al.quantidade, it.quantidadeRecebida), quantidadePendente:Math.max(0, al.quantidade - Math.min(al.quantidade, it.quantidadeRecebida)), fornecedorId:compra.fornecedorId, previsao:it.previsao || compra.previsaoEntrega, situacao:it.status, valorRateado:al.valor }))));
  d.contasPagar = [
    { id:'PAG-1042-1', fornecedorId:'FOR-001', compraId:'compra-001', descricao:'Pedido PED-2042 - peças Onix OS 1042', status:'Em aberto', valor:2380, vencimento:'2026-06-18' },
    { id:'PAG-2051', fornecedorId:'FOR-004', compraId:'compra-003', descricao:'Pedido PED-2051 - presilhas e lixas', status:'Pago', valor:237.96, vencimento:'2026-06-12' },
    { id:'PAG-2055', fornecedorId:'FOR-001', compraId:'compra-007', descricao:'Pedido PED-2055 - farol HB20', status:'Parcialmente pago', valor:1310, vencimento:'2026-06-18' },
    { id:'PAG-2056', fornecedorId:'FOR-002', compraId:'compra-008', descricao:'Pedido PED-2056 - insumos pintura', status:'Em aberto', valor:728, vencimento:'2026-06-15' },
    { id:'PAG-004', fornecedorId:'FOR-004', compraId:null, descricao:'Discos de lixa', status:'Vencendo hoje', valor:430, vencimento:'2026-06-12' },
    { id:'PAG-005', fornecedorId:'FOR-005', compraId:null, descricao:'Coleta de peças', status:'Em aberto', valor:260, vencimento:'2026-06-18' }
  ];
  const os1042 = d.financeiroOS['os-1042'];
  if (os1042) os1042.custos.pecas = d.pecasOS.filter((p) => p.osId === 'os-1042' && !String(p.situacao).includes('cancelado')).reduce((s, p) => s + (p.valorRateado || 0), 0);
})();

/* Etapa 6 — Financeiro, fluxo de caixa e rentabilidade */
(() => {
  const d = window.MeloMockData;
  const rec = (id, osId, pagador, tipoPagador, descricao, status, bruto, taxa, liquido, vencimento, formaPagamento='boleto', parcelas=1, origem='OS', extra={}) => ({ id, osId, pagador, tipoPagador, descricao, status, valorBruto: bruto, taxa, valorLiquido: liquido, valor: liquido, vencimento, dataPrevista: vencimento, emissao: extra.emissao || '2026-06-02', formaPagamento, parcelas, origem, responsavel: extra.responsavel || 'Caio Dicieri', sinistro: extra.sinistro || '', regraPagamentoId: extra.regraPagamentoId || 'REG-30', ultimaMovimentacao: extra.ultimaMovimentacao || vencimento, observacoes: extra.observacoes || '' });
  const pag = (id, fornecedorId, compraId, osId, categoria, descricao, status, valor, vencimento, formaPagamento='boleto', parcelas=1, extra={}) => ({ id, fornecedorId, compraId, osId, categoria, descricao, status, valor, valorFinal: valor, vencimento, dataPrevista: vencimento, emissao: extra.emissao || '2026-06-02', formaPagamento, parcelas, documento: extra.documento || '', origem: extra.origem || (compraId ? 'compra' : 'lançamento manual'), responsavel: extra.responsavel || 'Marina Lopes', observacoes: extra.observacoes || '' });

  d.regrasPagamento = [
    { id:'REG-AV', nome:'À vista', tipo:'fixo', prazo:0, diaFixo:null, parcelas:1, intervalo:0, formaPagamento:'pix', taxaPercentual:0, responsavel:'Caio Dicieri', ativa:true },
    { id:'REG-07', nome:'7 dias', tipo:'prazo', prazo:7, diaFixo:null, parcelas:1, intervalo:0, formaPagamento:'boleto', taxaPercentual:0, responsavel:'Marina Lopes', ativa:true },
    { id:'REG-15', nome:'15 dias', tipo:'prazo', prazo:15, diaFixo:null, parcelas:1, intervalo:0, formaPagamento:'transferência', taxaPercentual:0, responsavel:'Caio Dicieri', ativa:true },
    { id:'REG-30', nome:'30 dias', tipo:'prazo', prazo:30, diaFixo:null, parcelas:1, intervalo:0, formaPagamento:'boleto', taxaPercentual:0, responsavel:'Paula Nunes', ativa:true },
    { id:'REG-PAR', nome:'Parcelado mensal', tipo:'parcelado', prazo:30, diaFixo:null, parcelas:3, intervalo:30, formaPagamento:'cartão de crédito', taxaPercentual:3.49, responsavel:'Caio Dicieri', ativa:true },
    { id:'REG-SEG', nome:'Seguradora após entrega', tipo:'condicional', prazo:10, diaFixo:null, parcelas:1, intervalo:0, formaPagamento:'transferência', taxaPercentual:0, responsavel:'Marina Lopes', ativa:true },
    { id:'REG-CORP', nome:'Corporativo último dia mês seguinte', tipo:'dia fixo', prazo:0, diaFixo:31, parcelas:1, intervalo:0, formaPagamento:'boleto', taxaPercentual:0, responsavel:'Caio Dicieri', ativa:false }
  ];
  d.taxasCartao = [
    { id:'TAX-DEB', nome:'Débito', percentual:1.59, tarifaFixa:0, prazoRecebimento:1, ativa:true, observacao:'Recebimento D+1 fictício.' },
    { id:'TAX-C1', nome:'Crédito à vista', percentual:2.89, tarifaFixa:0, prazoRecebimento:30, ativa:true, observacao:'Crédito 1 parcela.' },
    { id:'TAX-C2', nome:'Crédito em 2x', percentual:3.19, tarifaFixa:0, prazoRecebimento:30, ativa:true, observacao:'Taxa total simulada.' },
    { id:'TAX-C3', nome:'Crédito em 3x', percentual:3.49, tarifaFixa:0, prazoRecebimento:30, ativa:true, observacao:'Exemplo usado no cálculo.' },
    { id:'TAX-C4', nome:'Crédito em 4x', percentual:3.89, tarifaFixa:0.49, prazoRecebimento:35, ativa:true, observacao:'Inclui tarifa fixa.' },
    { id:'TAX-C5', nome:'Crédito em 5x ou mais', percentual:4.59, tarifaFixa:0.79, prazoRecebimento:45, ativa:true, observacao:'Parcelamentos longos.' }
  ];
  d.categoriasFinanceiras = [
    { id:'CAT-REC-MO', nome:'mão de obra', tipo:'Receita', ativa:true, centroCusto:'Produção', descricao:'Receitas de mão de obra.' },
    { id:'CAT-REC-PEC', nome:'peças', tipo:'Receita', ativa:true, centroCusto:'Peças', descricao:'Repasse de peças.' },
    { id:'CAT-REC-MAT', nome:'materiais', tipo:'Receita', ativa:true, centroCusto:'Materiais', descricao:'Materiais de pintura e consumo.' },
    { id:'CAT-REC-ADD', nome:'serviço adicional', tipo:'Receita', ativa:true, centroCusto:'Comercial', descricao:'Serviços particulares adicionais.' },
    { id:'CAT-REC-FRA', nome:'franquia', tipo:'Receita', ativa:true, centroCusto:'Atendimento', descricao:'Franquia paga pelo cliente.' },
    { id:'CAT-REC-COM', nome:'complemento', tipo:'Receita', ativa:true, centroCusto:'Seguradora', descricao:'Complementos aprovados.' },
    { id:'CAT-DES-PEC', nome:'peças', tipo:'Despesa', ativa:true, centroCusto:'Peças', descricao:'Compras de peças.' },
    { id:'CAT-DES-MAT', nome:'materiais', tipo:'Despesa', ativa:true, centroCusto:'Materiais', descricao:'Tintas, abrasivos e insumos.' },
    { id:'CAT-DES-TER', nome:'serviços terceirizados', tipo:'Despesa', ativa:true, centroCusto:'Terceiros', descricao:'Martelinho, guincho e terceiros.' },
    { id:'CAT-DES-FOL', nome:'folha', tipo:'Despesa', ativa:true, centroCusto:'Administrativo', descricao:'Folha e encargos fictícios.' },
    { id:'CAT-DES-ALU', nome:'aluguel', tipo:'Despesa', ativa:true, centroCusto:'Fixos', descricao:'Aluguel do imóvel.' },
    { id:'CAT-DES-ENE', nome:'energia', tipo:'Despesa', ativa:true, centroCusto:'Fixos', descricao:'Energia elétrica.' },
    { id:'CAT-DES-IMP', nome:'impostos', tipo:'Despesa', ativa:false, centroCusto:'Fiscal futuro', descricao:'Somente estrutura; sem cálculo fiscal.' },
    { id:'CAT-DES-FER', nome:'ferramentas', tipo:'Despesa', ativa:true, centroCusto:'Oficina', descricao:'Ferramentas e manutenção.' },
    { id:'CAT-DES-MKT', nome:'marketing', tipo:'Despesa', ativa:true, centroCusto:'Comercial', descricao:'Divulgação.' },
    { id:'CAT-DES-OUT', nome:'outros', tipo:'Despesa', ativa:true, centroCusto:'Geral', descricao:'Demais despesas.' }
  ];

  d.contasReceber = [
    rec('REC-1042-SEG','os-1042','Porto Seguro','seguradora','OS 1042 - indenização principal','parcialmente recebida',8500,296.65,8203.35,'2026-06-20','cartão de crédito',3,'OS',{sinistro:'SIN-2026-0042', regraPagamentoId:'REG-PAR'}),
    rec('REC-1042-FRA','os-1042','Roberto Almeida','cliente','OS 1042 - franquia do cliente','vencida',1200,0,1200,'2026-06-10','pix',1,'OS',{sinistro:'SIN-2026-0042'}),
    rec('REC-1042-ADD','os-1042','Roberto Almeida','cliente','OS 1042 - serviço adicional','prevista',300,0,300,'2026-06-14','pix',1,'OS',{sinistro:'SIN-2026-0042'}),
    rec('REC-1001-AZUL','OS-1001','Azul Seguros','seguradora','OS 1001 - indenização seguradora','emitida',8200,0,8200,'2026-06-18','transferência',1,'OS',{sinistro:'SIN-2026-1001'}),
    rec('REC-1002-TOKIO','OS-1002','Tokio Marine','seguradora','OS 1002 - pagamento integral','recebida',4100,0,4100,'2026-06-10','transferência',1,'OS'),
    rec('REC-1003-CLI','OS-1003','Carla Moreno','cliente','OS 1003 - serviço particular','vencida',9600,0,9600,'2026-06-08','boleto',2,'OS'),
    rec('REC-1004-CLI','OS-1004','Diego Martins','cliente','OS 1004 - franquia','prevista',980,0,980,'2026-06-22','pix',1,'OS'),
    rec('REC-1005-LIB','OS-1005','Liberty Seguros','seguradora','OS 1005 - repasse seguradora','emitida',7450,0,7450,'2026-06-25','transferência',1,'OS'),
    rec('REC-1006-SOM','OS-1006','Sompo Seguros','seguradora','OS 1006 - saldo entregue','prevista',3100,0,3100,'2026-06-12','boleto',1,'OS'),
    rec('REC-1007-CLI','OS-1007','Gabriela Costa','cliente','OS 1007 - entregue com saldo','parcialmente recebida',1800,28.62,1771.38,'2026-06-11','débito',1,'OS'),
    rec('REC-1008-HDI','OS-1008','HDI Seguros','seguradora','OS 1008 - indenização','rascunho',6800,0,6800,'2026-07-03','boleto',1,'OS'),
    rec('REC-1009-CLI','OS-1009','Mariana Torres','cliente','OS 1009 - cartão em 4x','emitida',2400,93.85,2306.15,'2026-06-30','cartão de crédito',4,'OS'),
    rec('REC-1010-TER','OS-1010','Transportadora Alfa','terceiro','OS 1010 - terceiro responsável','renegociada',5200,0,5200,'2026-07-10','boleto',2,'OS'),
    rec('REC-MAN-001','','Empresa Parceira Beta','empresa parceira','Locação de cabine para parceiro','prevista',1500,0,1500,'2026-06-16','pix',1,'lançamento manual'),
    rec('REC-AJUST-001','OS-1002','Tokio Marine','seguradora','Ajuste de complemento aprovado','estornada',700,0,700,'2026-06-09','transferência',1,'ajuste'),
    rec('REC-CANC-001','OS-1005','Elisa Fontes','cliente','Conta cancelada por duplicidade','cancelada',450,0,450,'2026-06-15','pix',1,'ajuste'),
    rec('REC-COMP-1042','os-1042','Porto Seguro','seguradora','Complemento aprovado sem lançamento definitivo','prevista',950,0,950,'2026-06-28','transferência',1,'complemento',{sinistro:'SIN-2026-0042'}),
    rec('REC-OUT-001','','Cliente avulso','cliente','Serviço rápido sem OS vinculada','recebida',620,0,620,'2026-06-12','pix',1,'outro')
  ];

  d.contasPagar = [
    pag('PAG-1042-1','FOR-001','compra-001','os-1042','peças','PED-2042 - peças Onix OS 1042','parcialmente paga',2380,'2026-06-18','boleto',2),
    pag('PAG-1042-TER','FOR-003',null,'os-1042','serviços terceirizados','Serviço terceirizado OS 1042','prevista',760,'2026-06-21','pix',1,{origem:'serviço terceirizado'}),
    pag('PAG-2051','FOR-004','compra-003','OS-1006','materiais','PED-2051 - presilhas e lixas','paga',237.96,'2026-06-12','pix',1),
    pag('PAG-2055','FOR-001','compra-007','OS-1007','peças','PED-2055 - farol HB20','parcialmente paga',1310,'2026-06-18','boleto',2),
    pag('PAG-2056','FOR-002','compra-008','OS-1003','materiais','PED-2056 - insumos pintura','confirmada',728,'2026-06-15','boleto',1),
    pag('PAG-1001','FOR-001','compra-010','OS-1001','peças','Complemento capa retrovisor Civic','prevista',450,'2026-06-28','boleto',1),
    pag('PAG-1002','FOR-002',null,'OS-1002','materiais','Tinta e verniz OS 1002','paga',890,'2026-06-09','transferência',1),
    pag('PAG-1003','FOR-003',null,'OS-1003','serviços terceirizados','Martelinho lateral Compass','vencida',1500,'2026-06-07','boleto',1),
    pag('PAG-1004','FOR-005',null,'OS-1004','serviços terceirizados','Guincho T-Cross','confirmada',360,'2026-06-17','pix',1),
    pag('PAG-1005','FOR-004',null,'','ferramentas','Discos de lixa uso geral','confirmada',430,'2026-06-12','pix',1,{origem:'material'}),
    pag('PAG-1006','FOR-005',null,'','outros','Coleta de peças sem OS','prevista',260,'2026-06-18','pix',1,{origem:'outro'}),
    pag('PAG-FIX-001',null,null,'','aluguel','Aluguel da oficina junho','confirmada',6200,'2026-06-05','transferência',1,{origem:'custo fixo'}),
    pag('PAG-FIX-002',null,null,'','energia','Energia elétrica prevista','vencida',1480,'2026-06-06','boleto',1,{origem:'custo fixo'}),
    pag('PAG-FOL-001',null,null,'','folha','Adiantamento folha oficina','paga',7200,'2026-06-11','transferência',1,{origem:'folha'}),
    pag('PAG-IMP-001',null,null,'','impostos','Guia fictícia sem cálculo fiscal','rascunho',980,'2026-06-30','boleto',1,{origem:'imposto'}),
    pag('PAG-CANC-001','FOR-004','compra-009','','ferramentas','Compra cancelada compressor','cancelada',2390,'2026-06-25','boleto',1),
    pag('PAG-EST-001','FOR-002',null,'OS-1008','materiais','Estorno de material devolvido','estornada',310,'2026-06-08','pix',1),
    pag('PAG-MAN-001',null,null,'','marketing','Anúncio local Melo Reparos','confirmada',650,'2026-06-24','cartão de crédito',1,{origem:'lançamento manual'})
  ];

  d.parcelasFinanceiras = [];
  const addParcelas = (account, tipo) => {
    const total = tipo === 'receber' ? account.valorLiquido : account.valorFinal;
    const bruto = tipo === 'receber' ? account.valorBruto : account.valorFinal;
    const taxa = tipo === 'receber' ? account.taxa : 0;
    for (let i=1;i<=account.parcelas;i++) {
      const last = i === account.parcelas;
      const share = (value) => last ? +(value - (Math.floor((value/account.parcelas)*100)/100) * (account.parcelas-1)).toFixed(2) : +(Math.floor((value/account.parcelas)*100)/100).toFixed(2);
      d.parcelasFinanceiras.push({ id:`PAR-${account.id}-${i}`, contaId:account.id, tipo, numero:`${i}/${account.parcelas}`, valorBruto:share(bruto), taxa:share(taxa), valorLiquido:share(total), vencimento:i===1 ? account.vencimento : new Date(new Date(`${account.vencimento}T00:00:00`).getTime()+86400000*30*(i-1)).toISOString().slice(0,10), dataPrevista:account.vencimento, dataRealizacao:'', valorRealizado:0, status:account.status, responsavel:account.responsavel });
    }
  };
  d.contasReceber.forEach((a)=>addParcelas(a,'receber'));
  d.contasPagar.forEach((a)=>addParcelas(a,'pagar'));

  d.baixasFinanceiras = [
    { id:'BX-REC-1042-1', tipo:'recebimento', contaId:'REC-1042-SEG', parcelaId:'PAR-REC-1042-SEG-1', data:'2026-06-12', valorBruto:2800, taxaReal:97.72, valorLiquido:2702.28, formaPagamento:'cartão de crédito', status:'parcial', comprovante:'comp-rec-1042-1.pdf', observacao:'Recebimento parcial da seguradora.', responsavel:'Caio Dicieri' },
    { id:'BX-REC-1002', tipo:'recebimento', contaId:'REC-1002-TOKIO', parcelaId:'PAR-REC-1002-TOKIO-1', data:'2026-06-10', valorBruto:4100, taxaReal:0, valorLiquido:4100, formaPagamento:'transferência', status:'baixada', comprovante:'ted-tokio.pdf', observacao:'Recebimento total.', responsavel:'Marina Lopes' },
    { id:'BX-REC-1007', tipo:'recebimento', contaId:'REC-1007-CLI', parcelaId:'PAR-REC-1007-CLI-1', data:'2026-06-11', valorBruto:900, taxaReal:14.31, valorLiquido:885.69, formaPagamento:'débito', status:'parcial', comprovante:'debito-1007.pdf', observacao:'Baixa parcial pendente.', responsavel:'Caio Dicieri' },
    { id:'BX-REC-OUT', tipo:'recebimento', contaId:'REC-OUT-001', parcelaId:'PAR-REC-OUT-001-1', data:'2026-06-12', valorBruto:620, taxaReal:0, valorLiquido:600, formaPagamento:'pix', status:'baixada', comprovante:'pix-out.pdf', observacao:'Recebimento com desconto de R$ 20,00.', responsavel:'Rafael Santos' },
    { id:'BX-REC-EST', tipo:'recebimento', contaId:'REC-AJUST-001', parcelaId:'PAR-REC-AJUST-001-1', data:'2026-06-09', valorBruto:700, taxaReal:0, valorLiquido:700, formaPagamento:'transferência', status:'estornada', comprovante:'estorno.pdf', observacao:'Estorno reabriu saldo e ficou no histórico.', responsavel:'Caio Dicieri' },
    { id:'BX-PAG-1042-1', tipo:'pagamento', contaId:'PAG-1042-1', parcelaId:'PAR-PAG-1042-1-1', data:'2026-06-12', valorBruto:1190, juros:0, desconto:0, valorLiquido:1190, formaPagamento:'boleto', status:'parcial', comprovante:'boleto-1042.pdf', observacao:'Pagamento parcial da compra.', responsavel:'Marina Lopes' },
    { id:'BX-PAG-2051', tipo:'pagamento', contaId:'PAG-2051', parcelaId:'PAR-PAG-2051-1', data:'2026-06-12', valorBruto:237.96, juros:0, desconto:0, valorLiquido:237.96, formaPagamento:'pix', status:'baixada', comprovante:'pix-2051.pdf', observacao:'Pagamento total.', responsavel:'Caio Dicieri' },
    { id:'BX-PAG-1002', tipo:'pagamento', contaId:'PAG-1002', parcelaId:'PAR-PAG-1002-1', data:'2026-06-09', valorBruto:890, juros:0, desconto:0, valorLiquido:890, formaPagamento:'transferência', status:'baixada', comprovante:'ted-tintas.pdf', observacao:'Pagamento total.', responsavel:'Marina Lopes' },
    { id:'BX-PAG-FOL', tipo:'pagamento', contaId:'PAG-FOL-001', parcelaId:'PAR-PAG-FOL-001-1', data:'2026-06-11', valorBruto:7200, juros:0, desconto:0, valorLiquido:7200, formaPagamento:'transferência', status:'baixada', comprovante:'folha.pdf', observacao:'Pagamento total.', responsavel:'Caio Dicieri' },
    { id:'BX-PAG-2055', tipo:'pagamento', contaId:'PAG-2055', parcelaId:'PAR-PAG-2055-1', data:'2026-06-10', valorBruto:600, juros:0, desconto:0, valorLiquido:600, formaPagamento:'boleto', status:'parcial', comprovante:'boleto-2055.pdf', observacao:'Pagamento parcial.', responsavel:'Paula Nunes' },
    { id:'BX-PAG-JUROS', tipo:'pagamento', contaId:'PAG-FIX-001', parcelaId:'PAR-PAG-FIX-001-1', data:'2026-06-06', valorBruto:6200, juros:62, desconto:0, valorLiquido:6262, formaPagamento:'transferência', status:'baixada', comprovante:'aluguel.pdf', observacao:'Pagamento com juros registrado.', responsavel:'Caio Dicieri' },
    { id:'BX-PAG-EST', tipo:'pagamento', contaId:'PAG-EST-001', parcelaId:'PAR-PAG-EST-001-1', data:'2026-06-08', valorBruto:310, juros:0, desconto:0, valorLiquido:310, formaPagamento:'pix', status:'estornada', comprovante:'est-pag.pdf', observacao:'Estorno por devolução de material.', responsavel:'Marina Lopes' }
  ];
  d.baixasFinanceiras.forEach((b) => {
    const parcela = d.parcelasFinanceiras.find((p) => p.id === b.parcelaId);
    if (parcela && b.status !== 'estornada') { parcela.valorRealizado += b.valorLiquido; parcela.dataRealizacao = b.data; parcela.status = b.status === 'parcial' ? (b.tipo === 'recebimento' ? 'parcialmente recebida' : 'parcialmente paga') : (b.tipo === 'recebimento' ? 'recebida' : 'paga'); }
  });

  d.alertasFinanceiros = [
    { prioridade:'Alta', descricao:'Conta a receber vencida da franquia OS 1042.', registro:'REC-1042-FRA', valor:1200, vencimento:'2026-06-10', acao:'Registrar recebimento' },
    { prioridade:'Alta', descricao:'Conta a pagar vencida de energia.', registro:'PAG-FIX-002', valor:1480, vencimento:'2026-06-06', acao:'Registrar pagamento' },
    { prioridade:'Média', descricao:'Compra PED-2053 sem conta a pagar confirmada.', registro:'compra-005', valor:570, vencimento:'2026-06-15', acao:'Criar conta' },
    { prioridade:'Alta', descricao:'OS entregue com saldo a receber.', registro:'OS-1007', valor:885.69, vencimento:'2026-06-11', acao:'Cobrar saldo' },
    { prioridade:'Média', descricao:'OS finalizada sem fechamento financeiro.', registro:'OS-1006', valor:3100, vencimento:'2026-06-12', acao:'Fechar OS' },
    { prioridade:'Baixa', descricao:'Taxa não configurada em regra inativa corporativa.', registro:'REG-CORP', valor:0, vencimento:'2026-06-30', acao:'Revisar regra' },
    { prioridade:'Média', descricao:'Valor líquido divergente no cartão 4x OS 1009.', registro:'REC-1009-CLI', valor:93.85, vencimento:'2026-06-30', acao:'Recalcular taxa' },
    { prioridade:'Alta', descricao:'Baixa parcial pendente no farol HB20.', registro:'PAG-2055', valor:710, vencimento:'2026-06-18', acao:'Completar pagamento' },
    { prioridade:'Média', descricao:'Complemento aprovado sem lançamento definitivo.', registro:'REC-COMP-1042', valor:950, vencimento:'2026-06-28', acao:'Criar lançamento' },
    { prioridade:'Alta', descricao:'Conta cancelada com pagamento registrado para auditoria.', registro:'REC-CANC-001', valor:450, vencimento:'2026-06-15', acao:'Ver histórico' },
    { prioridade:'Alta', descricao:'Divergência entre compra e conta a pagar PED-2056.', registro:'PAG-2056', valor:18, vencimento:'2026-06-15', acao:'Comparar compra' }
  ];

  d.rentabilidadeOS = [
    { osId:'os-1042', cliente:'Roberto Almeida', seguradora:'Porto Seguro', receitaAprovada:12780, receitaLiquida:10653.35, custoEstimado:4588, custoReal:1190, lucroEstimado:6065.35, lucroRealizado:1512.28, margem:57, statusFinanceiro:'provisório com pendências', pendencias:['franquia vencida','compra parcialmente paga','complemento sem lançamento definitivo'] },
    { osId:'OS-1002', cliente:'Bruno Alves', seguradora:'Tokio Marine', receitaAprovada:4100, receitaLiquida:4100, custoEstimado:890, custoReal:890, lucroEstimado:3210, lucroRealizado:3210, margem:78, statusFinanceiro:'fechada financeiramente', pendencias:[] },
    { osId:'OS-1007', cliente:'Gabriela Costa', seguradora:'Particular', receitaAprovada:1800, receitaLiquida:1771.38, custoEstimado:1310, custoReal:600, lucroEstimado:461.38, lucroRealizado:285.69, margem:16, statusFinanceiro:'entregue com saldo', pendencias:['saldo a receber','pagamento parcial fornecedor'] },
    { osId:'OS-1003', cliente:'Carla Moreno', seguradora:'Particular', receitaAprovada:9600, receitaLiquida:9600, custoEstimado:12800, custoReal:2228, lucroEstimado:-3200, lucroRealizado:-2228, margem:-23, statusFinanceiro:'prejuízo previsto', pendencias:['receita vencida','terceiro vencido'] },
    { osId:'OS-1006', cliente:'Fabio Lima', seguradora:'Sompo Seguros', receitaAprovada:3100, receitaLiquida:3100, custoEstimado:237.96, custoReal:237.96, lucroEstimado:2862.04, lucroRealizado:-237.96, margem:92, statusFinanceiro:'sem fechamento', pendencias:['receita pendente'] }
  ];

  d.historicoFinanceiro = [
    { data:'2026-06-02T10:20:00', usuario:'Marina Lopes', tipo:'conta criada', descricao:'Conta REC-1042-SEG criada para seguradora.', valorAnterior:'—', valorNovo:'R$ 8.203,35', registro:'REC-1042-SEG', osId:'os-1042' },
    { data:'2026-06-02T10:21:00', usuario:'Marina Lopes', tipo:'parcela gerada', descricao:'3 parcelas da conta REC-1042-SEG geradas.', valorAnterior:'—', valorNovo:'3 parcelas', registro:'REC-1042-SEG', osId:'os-1042' },
    { data:'2026-06-03T09:00:00', usuario:'Caio Dicieri', tipo:'taxa recalculada', descricao:'Taxa de cartão recalculada para crédito em 3x.', valorAnterior:'R$ 0,00', valorNovo:'R$ 296,65', registro:'REC-1042-SEG', osId:'os-1042' },
    { data:'2026-06-04T16:00:00', usuario:'Marina Lopes', tipo:'conta vinculada à compra', descricao:'Conta a pagar PAG-1042-1 vinculada ao pedido PED-2042.', valorAnterior:'sem vínculo', valorNovo:'compra-001', registro:'PAG-1042-1', osId:'os-1042' },
    { data:'2026-06-09T12:00:00', usuario:'Caio Dicieri', tipo:'estorno', descricao:'Estorno de ajuste REC-AJUST-001 registrado sem apagar histórico.', valorAnterior:'recebido', valorNovo:'estornada', registro:'REC-AJUST-001', osId:'OS-1002' },
    { data:'2026-06-10T15:30:00', usuario:'Paula Nunes', tipo:'baixa parcial', descricao:'Pagamento parcial do farol HB20.', valorAnterior:'R$ 0,00', valorNovo:'R$ 600,00', registro:'PAG-2055', osId:'OS-1007' },
    { data:'2026-06-11T10:40:00', usuario:'Caio Dicieri', tipo:'baixa parcial', descricao:'Recebimento parcial de Gabriela Costa.', valorAnterior:'R$ 0,00', valorNovo:'R$ 885,69', registro:'REC-1007-CLI', osId:'OS-1007' },
    { data:'2026-06-11T17:10:00', usuario:'Marina Lopes', tipo:'vencimento alterado', descricao:'Franquia OS 1042 mantida vencida para alerta.', valorAnterior:'14/06/2026', valorNovo:'10/06/2026', registro:'REC-1042-FRA', osId:'os-1042' },
    { data:'2026-06-12T09:00:00', usuario:'Caio Dicieri', tipo:'baixa total', descricao:'Conta REC-OUT-001 recebida com desconto.', valorAnterior:'R$ 620,00', valorNovo:'R$ 600,00', registro:'REC-OUT-001', osId:'' },
    { data:'2026-06-12T09:30:00', usuario:'Marina Lopes', tipo:'renegociação', descricao:'Conta REC-1010-TER renegociada em duas parcelas.', valorAnterior:'1 parcela', valorNovo:'2 parcelas', registro:'REC-1010-TER', osId:'OS-1010' },
    { data:'2026-06-12T10:00:00', usuario:'Caio Dicieri', tipo:'cancelamento', descricao:'Conta REC-CANC-001 cancelada por duplicidade mantendo trilha.', valorAnterior:'prevista', valorNovo:'cancelada', registro:'REC-CANC-001', osId:'OS-1005' },
    { data:'2026-06-12T10:42:00', usuario:'Caio Dicieri', tipo:'fechamento', descricao:'OS 1002 fechada financeiramente sem pendências.', valorAnterior:'aberta', valorNovo:'fechada', registro:'OS-1002', osId:'OS-1002' },
    { data:'2026-06-12T10:50:00', usuario:'Caio Dicieri', tipo:'reabertura', descricao:'Reabertura simulada disponível com motivo e observação.', valorAnterior:'fechada', valorNovo:'reaberta', registro:'OS-1002', osId:'OS-1002' }
  ];

  d.agendaEventos = [
    ...d.agendaEventos,
    ...d.contasReceber.slice(0, 8).map((a, i) => ({ id:`AGE-FIN-REC-${i+1}`, tipo:i%2?'parcela':'recebimento', data:a.vencimento, hora:'09:00', titulo:`Vencimento a receber ${a.id}`, descricao:a.descricao, responsavel:a.responsavel, status:a.status.includes('recebida')?'Concluído':'Pendente', registroTipo:'Conta a receber', registroId:a.id, link:`contas-receber.html?id=${a.id}` })),
    ...d.contasPagar.slice(0, 8).map((a, i) => ({ id:`AGE-FIN-PAG-${i+1}`, tipo:i%2?'parcela':'pagamento', data:a.vencimento, hora:'15:00', titulo:`Vencimento a pagar ${a.id}`, descricao:a.descricao, responsavel:a.responsavel, status:a.status.includes('paga')?'Concluído':'Pendente', registroTipo:'Conta a pagar', registroId:a.id, link:`contas-pagar.html?id=${a.id}` })),
    { id:'AGE-FIN-FECH-1042', tipo:'fechamento-financeiro', data:'2026-06-28', hora:'17:30', titulo:'Fechamento financeiro OS 1042', descricao:'Conferir pendências antes do fechamento financeiro.', responsavel:'Caio Dicieri', status:'Pendente', registroTipo:'OS', registroId:'OS 1042', link:'ordem-servico-detalhes.html?id=os-1042#financeiro' }
  ];

  const os1042 = d.financeiroOS['os-1042'];
  if (os1042) {
    os1042.receitas = d.contasReceber.filter((a) => a.osId === 'os-1042').map((a) => ({ pagador:a.pagador, descricao:a.descricao, bruto:a.valorBruto, taxa:a.taxa, liquido:a.valorLiquido, vencimento:a.vencimento, status:a.status }));
    os1042.custos = { pecas:2380, materiais:980, terceiros:760, taxas:296.65, outros:180 };
  }
})();
