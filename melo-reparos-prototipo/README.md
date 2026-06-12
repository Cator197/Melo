# Melo Reparos — Protótipo

Protótipo visual, técnico e navegável do futuro sistema administrativo da Melo Reparos, atualizado até a **Etapa 3 — Ordens de Serviço**.

A Etapa 3 amplia o projeto existente sem recriar a estrutura e entrega o módulo completo de OS em HTML, CSS e JavaScript puro, com dados fictícios centralizados e operações simuladas em sessão.

## Como abrir e testar

Abra o arquivo `index.html` diretamente no navegador. Ele redireciona para `paginas/inicio.html` e o protótipo também funciona via `file://`, sem servidor obrigatório.

Opcionalmente, para validar em um servidor local simples:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Depois acesse:

- `http://localhost:8080/paginas/ordens-servico.html`
- `http://localhost:8080/paginas/ordem-servico-detalhes.html?id=os-1042`

## Estrutura

```text
melo-reparos-prototipo/
├── index.html
├── paginas/
│   ├── inicio.html
│   ├── ordens-servico.html
│   ├── ordem-servico-detalhes.html
│   ├── producao.html
│   ├── agenda.html
│   ├── complementos.html
│   ├── compras.html
│   ├── financeiro-visao-geral.html
│   ├── contas-receber.html
│   ├── contas-pagar.html
│   ├── fluxo-caixa.html
│   ├── relatorios.html
│   ├── clientes.html
│   ├── veiculos.html
│   ├── fornecedores.html
│   ├── usuarios.html
│   ├── importacoes.html
│   ├── configuracoes.html
│   └── componentes.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── init.js
│   │   ├── navigation.js
│   │   ├── components.js
│   │   ├── mock-data.js
│   │   └── pages/
│   │       ├── page-renderers.js
│   │       └── os-module.js
│   └── images/
└── README.md
```

## Arquivos criados na Etapa 3

- `paginas/ordem-servico-detalhes.html`
- `assets/js/pages/os-module.js`

## Arquivos modificados na Etapa 3

- `paginas/ordens-servico.html`
- `assets/js/mock-data.js`
- `assets/js/pages/page-renderers.js`
- `assets/js/navigation.js`
- `assets/css/components.css`
- `README.md`

## Módulo de Ordens de Serviço

### Lista de OS

A página `paginas/ordens-servico.html` possui:

- cabeçalho com breadcrumb, total encontrado e botões de ação;
- modal de nova OS simulada;
- modal informativo de importação Cilia/Soma;
- exportação simulada por toast;
- indicadores clicáveis:
  - OS abertas;
  - veículos na oficina;
  - aguardando peça;
  - atrasadas;
  - finalizadas aguardando entrega;
  - entregues no mês;
- filtros por pesquisa livre, OS, placa, cliente, veículo, seguradora, origem, status, etapa, condição paralela, responsável, previsão, atraso e períodos;
- filtros ativos removíveis individualmente;
- visualização em tabela e em cards;
- preferência de visualização salva localmente no navegador;
- ações rápidas simuladas por OS.

### Detalhes da OS

A página `paginas/ordem-servico-detalhes.html` lê o parâmetro `id` da URL. Exemplo:

```text
ordem-servico-detalhes.html?id=os-1042
```

Se o ID não existir, a página mostra um estado de registro não encontrado com o ID buscado e botão para voltar à lista.

A página de detalhes possui:

- cabeçalho com número da OS, placa, veículo, cliente, status administrativo, etapa principal, condições paralelas, previsão, atraso, valor aprovado e dias na oficina;
- ações principais e menu de mais ações;
- resumo lateral/sticky no desktop e bloco reorganizado no mobile;
- abas internas:
  1. Visão geral;
  2. Produção;
  3. Serviços e peças;
  4. Complementos;
  5. Compras;
  6. Financeiro;
  7. Documentos e fotos;
  8. Histórico.

## Interações simuladas

As seguintes ações atualizam a interface durante a sessão:

- cadastrar nova OS;
- editar dados de uma OS;
- movimentar etapa principal;
- retornar para etapa anterior com retrabalho;
- adicionar condição paralela;
- encerrar condição paralela;
- adicionar observação;
- fixar/desafixar observação;
- adicionar complemento;
- adicionar documento;
- adicionar foto;
- alterar previsão de entrega;
- finalizar produção;
- marcar entrega;
- fechar, cancelar ou reabrir OS;
- incluir serviço ou peça e refletir valores/custos na visão financeira da sessão;
- filtrar histórico por texto e tipo de evento.

As simulações usam `sessionStorage` apenas para manter alterações temporárias enquanto a aba do navegador estiver aberta. Não há persistência real.

## Dados fictícios

Os dados estão centralizados em `assets/js/mock-data.js`, com IDs e relacionamentos entre entidades:

- 12 clientes;
- 12 veículos;
- 11 Ordens de Serviço;
- 7 etapas de produção;
- 4 condições paralelas;
- complementos vinculados a OS;
- compras vinculadas a OS;
- serviços e peças por OS;
- receitas, custos e múltiplos pagadores;
- documentos e fotos;
- observações;
- movimentações produtivas;
- histórico completo;
- agenda operacional;
- contas a receber e a pagar;
- usuários fictícios.

A OS principal de demonstração é:

```text
OS 1042
Placa: ABC1D23
Veículo: Chevrolet Onix
Cliente: Roberto Almeida
Etapa principal: Funilaria
Condições paralelas:
- Aguardando peça
- Complemento pendente
```

A OS 1042 possui histórico de retorno de etapa, compra com recebimento parcial, complemento aguardando aprovação, vários pagadores, documentos, fotos, observações, previsão de entrega e alerta operacional.

## Decisões assumidas

- Complementos foram modelados como processos paralelos vinculados à OS, e não como etapa principal fixa.
- O módulo de compras e o financeiro completo não foram antecipados; a OS mostra somente visões vinculadas e modais simplificados.
- Alterações simuladas são mantidas em `sessionStorage` para demonstrar continuidade durante a sessão sem backend.
- A preferência tabela/cards é gravada em `localStorage` apenas para demonstração.
- Fotos usam cartões visuais locais, sem links externos instáveis.

## Limitações atuais

Ainda não foram implementados:

- backend;
- banco de dados;
- upload real de arquivos;
- importação real do Cilia ou Soma;
- autenticação e permissões reais;
- Kanban completo de produção;
- módulo completo de compras;
- módulo financeiro completo;
- emissão de nota fiscal;
- integrações externas.

## Correções em etapas anteriores

Para integrar a Etapa 3, foram feitos ajustes mínimos de navegação e indicadores para reconhecer a nova página de detalhes e para evitar que OS canceladas, entregues ou fechadas sejam tratadas como produção ativa na Central do Dia.

## Sugestão de mensagem de commit

```text
feat: implementa módulo de ordens de serviço do protótipo
```

---

## Etapa 4 — Produção e Complementos

A Etapa 4 aprofunda o protótipo operacional sem recriar o projeto e mantendo HTML, CSS e JavaScript puro. Os dados continuam centralizados em `assets/js/mock-data.js`, com complementos de sessão preparados por `assets/js/pages/production-core.js`.

### Arquivos criados na Etapa 4

- `paginas/complemento-detalhes.html`
- `assets/js/pages/production-core.js`
- `assets/js/pages/production-module.js`
- `assets/js/pages/complements-module.js`

### Arquivos modificados na Etapa 4

- `paginas/producao.html`
- `paginas/complementos.html`
- `paginas/ordem-servico-detalhes.html`
- demais páginas em `paginas/` para carregar os scripts compartilhados da Etapa 4
- `assets/js/pages/page-renderers.js`
- `assets/js/navigation.js`
- `assets/css/components.css`
- `README.md`

### Produção

A página `paginas/producao.html` entrega:

- cabeçalho com breadcrumb, data atual fictícia, última atualização, atualizar, movimentar veículo, configurar etapas e exportar visão;
- indicadores clicáveis para oficina, produção, aguardando peça, complemento pendente, atrasos, sem movimentação, entregas de hoje e finalizados aguardando entrega;
- Kanban por etapa principal: Desmontagem, Funilaria, Preparação, Pintura, Montagem e Polimento;
- áreas separadas para aguardando agendamento, agendados e finalizados aguardando entrega;
- cards com placa, veículo, cliente, OS, dias na etapa, limite, previsão, condições paralelas, peças, complementos, prioridade e ações rápidas;
- tabela com ordenação e densidade compacta/confortável;
- agenda semanal de segunda a sábado para entradas, entregas, peças, complementos e finalizações;
- filtros operacionais aplicados em Kanban, tabela e agenda;
- bloco de veículos há muito tempo na etapa;
- capacidade fictícia por setor produtivo;
- movimentação simulada por botão e por arrastar/soltar: o drop abre modal de confirmação antes de alterar dados;
- retorno de etapa com motivo obrigatório e opção de retrabalho;
- gerenciamento de condição paralela com inclusão e encerramento no modal de movimentação.

### Complementos

A página `paginas/complementos.html` entrega:

- indicadores de rascunhos, aguardando envio, aguardando aprovação, aprovados, aprovados parcialmente, recusados, atrasados e valor aguardando aprovação;
- filtros por pesquisa, número, OS, placa, cliente, seguradora, status, período, dias aguardando, impacto e valores;
- visualização em tabela e cards;
- criação simulada de novo complemento, vinculando a OS e adicionando condição paralela “Complemento pendente”;
- ações simuladas de aprovação, aprovação parcial e recusa, com impacto na OS.

A página `paginas/complemento-detalhes.html?id=comp-003` entrega:

- estado de não encontrado quando o ID não existe;
- cabeçalho com complemento, OS, placa, veículo, cliente, seguradora, status, valores, dias aguardando, previsão e impacto;
- ações de editar, enviar, aprovação, aprovação parcial, recusa, cancelar, concluir, documento e observação;
- seções de dados gerais, serviços, peças, valores, previsão, documentos e histórico.

### Interações simuladas

As ações desta etapa alteram dados apenas durante a sessão do navegador:

- movimentar veículo entre etapas;
- retornar etapa com motivo obrigatório;
- marcar retrabalho;
- alterar previsão de entrega;
- adicionar, encerrar e manter condições paralelas;
- criar complemento temporário;
- aprovar, aprovar parcialmente ou recusar complemento;
- atualizar valor aprovado da OS e previsão quando um complemento é aprovado;
- registrar histórico operacional compartilhado com a OS detalhada.

### Dados fictícios e decisões assumidas

- A data de referência da Etapa 4 é `12/06/2026`.
- “Aguardando peça” e “Complemento pendente” são condições paralelas, nunca etapas principais.
- A capacidade por etapa é apenas visual e configurável futuramente.
- O usuário fictício selecionado controla a permissão simulada de movimentação.
- O drag and drop foi implementado de forma conservadora: soltar um card não move imediatamente; apenas abre o modal de confirmação.
- A OS 1042 permanece como principal registro de demonstração.
- Foram adicionadas OSs e complementos fictícios suficientes para cobrir os cenários obrigatórios da etapa.

### Limitações conhecidas

- Não há backend, banco de dados, autenticação real, persistência definitiva ou integração externa.
- As alterações somem ao recarregar a página.
- Compras, financeiro completo, relatórios finais, importação real e notas fiscais continuam fora do escopo desta etapa.
- A validação visual responsiva deve ser feita no navegador em 1440 px, 1024 px, 768 px e 390 px.

### Como abrir e testar a Etapa 4

Abra diretamente por `file://` ou rode um servidor local:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Rotas principais:

- `http://localhost:8080/paginas/producao.html`
- `http://localhost:8080/paginas/complementos.html`
- `http://localhost:8080/paginas/complemento-detalhes.html?id=comp-003`
- `http://localhost:8080/paginas/ordem-servico-detalhes.html?id=os-1042`

Sugestão curta de mensagem de commit:

```text
feat: implementa produção e complementos no protótipo
```

---

## Etapa 5 — Compras, Itens e Recebimentos

A Etapa 5 implementa o módulo completo de Compras do protótipo, sem recriar o projeto e mantendo a identidade visual, navegação, componentes e dados fictícios centralizados. Todas as operações são simuladas em JavaScript puro e atualizam a sessão atual do navegador.

### Arquivos criados na Etapa 5

- `paginas/compra-detalhes.html`
- `paginas/itens-pendentes.html`
- `assets/js/pages/purchases-module.js`

### Arquivos modificados na Etapa 5

- `paginas/compras.html`
- `paginas/inicio.html`
- `paginas/producao.html`
- `paginas/ordem-servico-detalhes.html`
- `index.html`
- `assets/js/mock-data.js`
- `assets/js/navigation.js`
- `assets/js/pages/page-renderers.js`
- `assets/js/pages/production-core.js`
- `assets/js/pages/production-module.js`
- `assets/js/pages/os-module.js`
- `assets/css/components.css`
- `README.md`

### Como abrir e testar Compras

Abra diretamente no navegador:

```text
melo-reparos-prototipo/paginas/compras.html
melo-reparos-prototipo/paginas/compra-detalhes.html?id=compra-001
melo-reparos-prototipo/paginas/itens-pendentes.html
```

Ou com servidor local:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Depois acesse:

- `http://localhost:8080/paginas/compras.html`
- `http://localhost:8080/paginas/compra-detalhes.html?id=compra-001`
- `http://localhost:8080/paginas/itens-pendentes.html`
- `http://localhost:8080/paginas/ordem-servico-detalhes.html?id=os-1042`
- `http://localhost:8080/paginas/producao.html`
- `http://localhost:8080/paginas/inicio.html`

### Funcionalidades entregues

A página `paginas/compras.html` possui:

- cabeçalho com título, breadcrumb, descrição, última atualização fictícia e total encontrado;
- botões de ação: Nova compra, Registrar recebimento e Exportar;
- indicadores clicáveis para compras abertas, itens aguardando compra, pedidos aguardando entrega, recebimentos parciais, atrasos, veículos aguardando peça, compras sem conta a pagar e valor pendente de recebimento;
- três modos de visualização: Pedidos, Itens e Fornecedores, com preferência salva localmente;
- filtros por pesquisa livre, pedido, item, código, fornecedor, OS, placa, veículo, status do pedido, status do item, status financeiro, período, previsão, atrasos, recebimento parcial, sem conta a pagar e responsável;
- filtros ativos com remoção individual;
- ações rápidas por pedido e por item, com ações desabilitadas quando o status não permite;
- criação simulada de compra com múltiplos itens e vínculos com uma ou várias OSs;
- rateio por valor, percentual ou quantidade, com validações visuais de estouro e justificativa para diferença;
- registro de recebimento total ou parcial;
- registro de divergências de recebimento;
- registro de devolução sem apagar o recebimento original;
- geração confirmada de conta a pagar fictícia;
- marcação como “Não necessita lançamento financeiro”.

A página `paginas/compra-detalhes.html` lê o parâmetro `id`. Exemplo:

```text
compra-detalhes.html?id=compra-001
```

Ela possui cabeçalho de resumo e abas:

1. Visão geral;
2. Itens;
3. Ordens de Serviço;
4. Recebimentos;
5. Financeiro;
6. Documentos;
7. Histórico.

A página `paginas/itens-pendentes.html` consolida itens solicitados, sem fornecedor, não comprados, pedidos, parcialmente recebidos e atrasados.

### Interações simuladas

As ações abaixo atualizam a interface durante a sessão:

- criar compra temporária;
- adicionar múltiplos itens no modal;
- vincular item a uma OS ou a duas OSs;
- recalcular resumo da compra;
- alterar rateio;
- registrar recebimento total;
- registrar recebimento parcial;
- marcar avaria, item incorreto ou quantidade divergente;
- registrar devolução parcial ou total;
- cancelar compra ou item;
- anexar documento fictício;
- gerar conta a pagar após revisão;
- marcar compra como sem necessidade de lançamento;
- atualizar peças pendentes e custos vinculados à OS durante a sessão;
- refletir peças pendentes na Produção;
- manter “Aguardando peça” como condição paralela, sem alterar a etapa principal da OS.

### Dados fictícios da Etapa 5

`assets/js/mock-data.js` foi ampliado com 11 pedidos de compra e 25 itens, cobrindo:

- pedido realizado aguardando entrega;
- parcialmente recebido;
- recebido integralmente;
- atrasado;
- sem conta a pagar;
- não necessita lançamento financeiro;
- vários itens;
- várias OSs e veículos;
- devolução parcial;
- cancelamento;
- item sem fornecedor;
- item sem rateio completo;
- item com divergência;
- item de complemento aprovado;
- item vinculado à OS 1042.

A OS 1042 permanece como principal demonstração, com itens de compra, recebimento parcial, fornecedor, previsão, custo rateado e condição paralela “Aguardando peça”.

### Integrações revisadas

- **OS:** a aba Compras mostra pedidos, itens, fornecedor, quantidade destinada, recebida, pendência, previsão, custo estimado, custo real, rateio, conta a pagar, divergências e devoluções.
- **Produção:** os cards exibem peças pendentes e link “Ver peças”; a etapa principal permanece independente da condição “Aguardando peça”.
- **Início:** indicadores e alertas passam a considerar compras em aberto e compras sem conta a pagar.
- **Financeiro:** contas a pagar são criadas apenas após confirmação e ficam vinculadas à compra de forma fictícia.

### Limitações

- Não há backend, banco de dados ou persistência definitiva.
- Não há upload real de documentos.
- Não há cotação com múltiplos fornecedores nesta etapa.
- Não há módulo financeiro completo, conciliação bancária ou emissão fiscal.
- As alterações existem apenas na sessão atual da página e podem ser perdidas ao recarregar, conforme esperado para o protótipo.

### Decisões assumidas

- O status operacional, o status de recebimento e o status financeiro foram mantidos separados.
- Compras canceladas não entram no custo real ativo de OS.
- Devoluções permanecem registradas no histórico e não removem recebimentos originais.
- A criação de conta a pagar exige confirmação explícita em modal.
- Valor não rateado exige justificativa no fluxo de rateio.
- “Aguardando peça” continua sendo condição paralela e não substitui a etapa produtiva.

### Sugestão de mensagem de commit

```text
feat: implementa módulo de compras e recebimentos
```
