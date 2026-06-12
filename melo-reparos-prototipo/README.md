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
