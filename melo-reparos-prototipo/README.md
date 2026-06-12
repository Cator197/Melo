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
