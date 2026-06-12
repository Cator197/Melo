# Melo Reparos — Protótipo

Protótipo visual, técnico e navegável do futuro sistema administrativo da Melo Reparos, atualizado com a Central do Dia e a Agenda operacional da Etapa 2.

## Estrutura

```text
melo-reparos-prototipo/
├── index.html
├── paginas/
│   ├── inicio.html
│   ├── ordens-servico.html
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
│   │       └── page-renderers.js
│   └── images/
└── README.md
```

## Como abrir

Abra o arquivo `index.html` diretamente no navegador. Ele redireciona para `paginas/inicio.html` e o protótipo também funciona via `file://`, sem servidor obrigatório.

Opcionalmente, para validar em um servidor local simples:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Páginas criadas

- Início
- Ordens de Serviço
- Produção
- Agenda
- Complementos
- Compras
- Financeiro — Visão geral
- Financeiro — Contas a receber
- Financeiro — Contas a pagar
- Financeiro — Fluxo de caixa
- Relatórios
- Cadastros — Clientes
- Cadastros — Veículos
- Cadastros — Fornecedores
- Cadastros — Usuários
- Importações
- Configurações
- Componentes (`componentes.html`, fora do menu principal)

Todas as páginas usam o mesmo layout administrativo com menu lateral, cabeçalho, breadcrumb, indicação de módulo e estado inicial coerente.

## Componentes

A página `paginas/componentes.html` reúne os componentes visuais obrigatórios:

- card de indicador;
- card de alerta;
- badge de status;
- botão primário;
- botão secundário;
- botão de perigo;
- tabela;
- campo de formulário;
- select;
- abas;
- modal;
- toast de sucesso;
- confirmação;
- estado vazio;
- carregamento;
- paginação.

## Dados fictícios

Os dados estão centralizados em `assets/js/mock-data.js`, com IDs e relacionamentos entre entidades:

- 8 clientes;
- 10 veículos;
- 8 Ordens de Serviço;
- 7 etapas de produção;
- 4 condições paralelas;
- 4 complementos;
- 5 fornecedores;
- 5 compras;
- 6 contas a receber;
- 6 contas a pagar;
- 2 veículos em fila;
- 14 eventos de agenda;
- limites esperados por etapa produtiva;
- 3 usuários.

As etapas principais são Desmontagem, Funilaria, Preparação, Pintura, Montagem, Polimento e Finalizado. As condições paralelas são Aguardando peça, Aguardando autorização, Complemento pendente e Serviço terceirizado.

A OS `OS-1001` atende ao cenário crítico solicitado: veículo em Funilaria, aguardando peça e com complemento aguardando aprovação. A Etapa 2 também inclui dados de filas, eventos, contas vencidas, chegada de peças e tempo de permanência por etapa para alimentar os indicadores da Central do Dia e a Agenda.

## Navegação e responsividade

- O item ativo do menu fica destacado.
- O menu lateral recolhe no desktop.
- Em telas menores, o menu abre como gaveta móvel com backdrop.
- A estrutura foi preparada para os pontos de validação visual em 1440 px, 1024 px, 768 px e 390 px.

## Limitações atuais

Esta etapa mantém o protótipo como uma simulação sem persistência real. Ainda não foram implementados:

- detalhes completos da OS;
- fluxo financeiro completo;
- relatórios funcionais;
- importação funcional;
- persistência real de dados;
- autenticação real.
