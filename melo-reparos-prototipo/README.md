# Melo Reparos — Protótipo

Protótipo visual, técnico e navegável do futuro sistema administrativo da Melo Reparos, atualizado até a **Etapa 6 — Financeiro, Fluxo de Caixa e Rentabilidade**.

A Etapa 6 foi aplicada diretamente no projeto existente, preservando a identidade visual, navegação, componentes e dados fictícios das etapas anteriores. O protótipo continua sem backend, sem banco de dados e sem integrações externas: todas as operações financeiras são simuladas com HTML, CSS e JavaScript puro, usando dados centralizados em `assets/js/mock-data.js` e estado temporário em memória durante a sessão.

## Como abrir e testar

Abra o arquivo `melo-reparos-prototipo/index.html` diretamente no navegador. Ele redireciona para `paginas/inicio.html` e o protótipo também funciona via `file://`, sem servidor obrigatório.

Opcionalmente, para validar em um servidor local simples:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Depois acesse, por exemplo:

- `http://localhost:8080/paginas/inicio.html`
- `http://localhost:8080/paginas/financeiro-visao-geral.html`
- `http://localhost:8080/paginas/financeiro.html`
- `http://localhost:8080/paginas/contas-receber.html`
- `http://localhost:8080/paginas/contas-pagar.html`
- `http://localhost:8080/paginas/fluxo-caixa.html`
- `http://localhost:8080/paginas/regras-pagamento.html`
- `http://localhost:8080/paginas/rentabilidade.html`
- `http://localhost:8080/paginas/categorias-financeiras.html`
- `http://localhost:8080/paginas/ordem-servico-detalhes.html?id=os-1042`
- `http://localhost:8080/paginas/agenda.html`
- `http://localhost:8080/paginas/compras.html`

## Estrutura principal

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
│   ├── compra-detalhes.html
│   ├── financeiro.html
│   ├── financeiro-visao-geral.html
│   ├── contas-receber.html
│   ├── contas-pagar.html
│   ├── fluxo-caixa.html
│   ├── regras-pagamento.html
│   ├── rentabilidade.html
│   ├── categorias-financeiras.html
│   └── demais páginas de cadastros, relatórios e configurações
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   └── js/
│       ├── init.js
│       ├── navigation.js
│       ├── components.js
│       ├── mock-data.js
│       └── pages/
│           ├── page-renderers.js
│           ├── os-module.js
│           ├── purchases-module.js
│           ├── complements-module.js
│           ├── production-module.js
│           └── finance-module.js
```

## Arquivos criados na Etapa 6

- `paginas/financeiro.html`
- `paginas/regras-pagamento.html`
- `paginas/rentabilidade.html`
- `paginas/categorias-financeiras.html`
- `assets/js/pages/finance-module.js`

## Arquivos modificados na Etapa 6

- `paginas/*.html` — inclusão do script do módulo financeiro nas páginas do protótipo.
- `assets/js/mock-data.js` — ampliação dos dados fictícios financeiros centralizados.
- `assets/js/navigation.js` — inclusão das novas rotas do financeiro na navegação lateral.
- `assets/js/pages/page-renderers.js` — delegação das páginas financeiras para o novo módulo e inclusão dos novos tipos de eventos de agenda.
- `assets/js/pages/os-module.js` — integração da aba Financeiro da OS com o novo módulo financeiro.
- `assets/css/components.css` — estilos responsivos específicos para cards, fluxo de caixa, alertas, timeline e modais financeiros.
- `README.md` — documentação atualizada da entrega.

## Interações simuladas da Etapa 6

### Financeiro — Visão Geral

A visão geral mostra:

- cabeçalho do Financeiro com breadcrumb textual, período selecionado, botões de nova conta a receber, nova conta a pagar, registrar baixa e exportar;
- filtros de período com hoje, esta semana, este mês, mês anterior, próximo mês e período personalizado;
- indicadores clicáveis para aberto, previsto, realizado, vencido e resultado;
- alertas financeiros prioritários, incluindo conta vencida, compra sem conta, OS entregue com saldo, baixa parcial, divergência entre compra e conta a pagar e complemento aprovado sem lançamento;
- resumo do período separado em receitas, despesas e resultado;
- próximos vencimentos, vencidos a receber e vencidos a pagar.

### Contas a Receber

A página possui:

- indicadores de contas em aberto, parcialmente recebidas, recebidas, vencidas, a vencer, valor bruto, taxas e valor líquido previsto;
- filtros por pesquisa livre, status, forma de pagamento, faixa de valor e responsável;
- três modos de visualização: contas, parcelas e pagadores;
- modal simulado para nova conta, geração de parcelas, cálculo de taxa de cartão, revisão de fórmula, confirmação de baixa e estorno.

### Contas a Pagar

A página possui:

- indicadores de em aberto, parcialmente pagas, pagas, vencidas, a vencer, total previsto, total pago e saldo pendente;
- filtros equivalentes para fornecedor, compra, OS, categoria, status, vencimento, período, valor e responsável;
- quatro modos de visualização: contas, parcelas, fornecedores e categorias;
- modal simulado para criação de conta vinculada à compra, pagamento parcial, pagamento total, juros, ajuste e estorno.

### Regras de Pagamento e Taxas de Cartão

Foram criadas regras fictícias para:

- à vista;
- 7 dias;
- 15 dias;
- 30 dias;
- parcelado mensal;
- seguradora após entrega;
- cliente corporativo no último dia do mês seguinte.

Também há tabela de taxas de cartão para débito, crédito à vista, crédito em 2x, 3x, 4x e 5x ou mais. A fórmula exibida recalcula valor bruto, taxa, tarifa fixa, valor líquido e parcelas antes da confirmação.

### Fluxo de Caixa

O fluxo de caixa apresenta:

- controles de mês anterior, hoje, próximo mês, seletor de mês, filtros, zoom e alternância de previsto/realizado;
- indicadores de entradas previstas, entradas realizadas, saídas previstas, saídas realizadas, saldo previsto, saldo realizado, vencidos a receber e vencidos a pagar;
- linha do tempo mensal com entradas acima, saídas abaixo, previsto em estilo diferenciado, realizado em destaque, dia atual e saldo negativo;
- listas auxiliares de entradas previstas até hoje não recebidas, saídas previstas até hoje não pagas e próximos 15 dias.

### Rentabilidade por OS

A tela de rentabilidade mostra:

- receita total;
- custo total;
- lucro estimado;
- lucro realizado;
- margem média;
- OS com prejuízo;
- OS sem fechamento;
- tabela por OS com receita aprovada, receita líquida, custo estimado, custo real, lucro estimado, lucro realizado, margem, status financeiro, pendências e ações.

A OS 1042 permanece como registro principal de demonstração, com seguradora como pagador principal, franquia do cliente, serviço adicional, múltiplas contas a receber, compra vinculada, conta a pagar, taxa de cartão, recebimento parcial, lucro estimado, lucro realizado provisório e pendências financeiras.

### Fechamento e Reabertura Financeira da OS

A aba Financeiro da OS foi integrada ao módulo financeiro. Ela exibe:

- receitas por pagador, conta e parcela;
- custos por compras, materiais, terceiros, taxas e outros;
- receita aprovada, receita líquida prevista, receita recebida, custo estimado, custo realizado, lucro estimado, lucro realizado provisório e margem;
- pendências que impedem fechamento silencioso;
- ações simuladas de fechar financeiramente e reabrir fechamento;
- histórico financeiro em linha do tempo.

Se existirem pendências, o fechamento é bloqueado no protótipo e informa que somente poderia ocorrer com ressalva, justificativa, usuário, data e confirmação.

### Integrações

- **Compras:** contas a pagar vinculadas a compras aparecem no Financeiro; divergências e compras sem conta geram alertas; pagamentos atualizam a visão financeira simulada.
- **Ordens de Serviço:** a aba Financeiro da OS consome as mesmas contas, parcelas, baixas e rentabilidade.
- **Início:** os dados de contas a receber, contas a pagar, vencimentos e saldo continuam usando as coleções centralizadas.
- **Agenda:** foram adicionados eventos financeiros de recebimento, pagamento, parcela e fechamento financeiro.

## Dados fictícios financeiros incluídos

O arquivo `assets/js/mock-data.js` contém, para a Etapa 6:

- 18 contas a receber;
- 18 contas a pagar;
- 45 parcelas financeiras;
- 12 baixas financeiras;
- 7 regras de pagamento;
- 6 configurações de taxa de cartão;
- 16 categorias financeiras;
- alertas financeiros prioritários;
- histórico financeiro;
- rentabilidade por OS;
- eventos financeiros na agenda.

Os dados incluem os cenários obrigatórios: conta vencida, parcial, recebida integralmente, cancelada, estornada, múltiplos pagadores por OS, taxa de cartão, conta a pagar de compra, pagamento parcial, pagamento vencido, lançamento sem OS/compra, pagamento com juros, recebimento com desconto, OS com lucro positivo, OS com lucro realizado menor que o estimado, OS com prejuízo, OS entregue com saldo pendente e OS financeiramente fechada.

## Decisões assumidas

- O Financeiro pertence somente à Melo Reparos; não há múltiplas contas bancárias.
- O saldo inicial do resumo é fictício e não representa conta bancária real.
- Lucro realizado é exibido como provisório quando há receitas pendentes, contas vencidas, compras não confirmadas, custos provisórios, complementos aguardando aprovação ou lançamentos provisórios.
- Cancelamentos, estornos, renegociações e ajustes permanecem no histórico e não apagam eventos anteriores.
- Compras não geram conta a pagar automaticamente sem confirmação; alertas indicam compras pendentes de lançamento.
- Não foram implementadas conciliação bancária real, integração bancária, boleto, nota fiscal, contabilidade, impostos automáticos, backend, banco de dados ou autenticação real.

## Correções e preservações de etapas anteriores

- O projeto não foi recriado e nenhuma pasta paralela foi criada.
- A navegação, layout, identidade visual, componentes base e dados fictícios anteriores foram preservados.
- A integração com Compras da Etapa 5 foi reaproveitada para contas a pagar e alertas financeiros.
- A aba Financeiro da OS foi substituída por uma visão mais completa sem remover as abas e ações existentes.
- A Agenda passou a reconhecer eventos financeiros sem remover eventos operacionais existentes.

## Limitações conhecidas

- Todas as ações são simulações em memória; recarregar a página volta aos dados fictícios iniciais.
- Os filtros demonstram o fluxo de interação, mas não persistem em backend.
- Exportação, comprovantes e anexos são representados por botões, textos e toasts simulados.
- A validação visual responsiva deve ser conferida no navegador do avaliador em 1440 px, 1024 px, 768 px e 390 px.
- Como não há backend, não há persistência definitiva nem controle de concorrência real.

## Sugestão de mensagem de commit

```text
feat: implementa financeiro, fluxo de caixa e rentabilidade
```
