# Melo Reparos — Protótipo navegável

Protótipo visual, técnico e navegável do futuro sistema administrativo da **Melo Reparos**, atualizado até a **Etapa 7 — Relatórios, Cadastros, Importações, Configurações e Revisão Final**.

A Etapa 7 foi aplicada diretamente no projeto existente, preservando a identidade visual aprovada: azul principal, amarelo de destaque, fundo claro, cards brancos, fontes Barlow e Barlow Condensed, placas em destaque e aparência operacional/profissional. O protótipo continua sem backend, banco de dados, autenticação real, importação real, integrações externas, emissão fiscal, integração bancária ou armazenamento real de arquivos.

Todas as operações são simuladas com **HTML, CSS e JavaScript puro**, usando dados fictícios centralizados em `assets/js/mock-data.js` e estado temporário em memória durante a sessão.

## Como abrir

Abra o arquivo abaixo diretamente no navegador:

```text
melo-reparos-prototipo/index.html
```

Ele redireciona para `paginas/inicio.html` e também funciona via `file://`, sem servidor obrigatório.

Opcionalmente, para validar em servidor local simples:

```bash
cd melo-reparos-prototipo
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080/paginas/inicio.html`.

## Tecnologias

- HTML5 sem framework.
- CSS modular em `assets/css/`.
- JavaScript puro em `assets/js/`.
- Dados fictícios centralizados em `assets/js/mock-data.js`.
- Gráficos simples em CSS/HTML, sem biblioteca externa pesada.
- Impressão via CSS `@media print` e `window.print()`.

## Estrutura de pastas

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
│   ├── entregas.html
│   ├── compras.html
│   ├── itens-pendentes.html
│   ├── compra-detalhes.html
│   ├── financeiro-visao-geral.html
│   ├── contas-receber.html
│   ├── contas-pagar.html
│   ├── fluxo-caixa.html
│   ├── rentabilidade.html
│   ├── categorias-financeiras.html
│   ├── regras-pagamento.html
│   ├── relatorios.html
│   ├── clientes.html
│   ├── cliente-detalhes.html
│   ├── veiculos.html
│   ├── veiculo-detalhes.html
│   ├── fornecedores.html
│   ├── fornecedor-detalhes.html
│   ├── usuarios.html
│   ├── importacoes.html
│   ├── configuracoes.html
│   ├── configuracoes-etapas.html
│   └── auditoria.html
└── assets/
    ├── css/
    │   ├── variables.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── responsive.css
    └── js/
        ├── init.js
        ├── navigation.js
        ├── components.js
        ├── mock-data.js
        └── pages/
            ├── page-renderers.js
            ├── os-module.js
            ├── production-core.js
            ├── production-module.js
            ├── complements-module.js
            ├── purchases-module.js
            ├── finance-module.js
            └── stage7-module.js
```

## Módulos e páginas

### Início

Painel operacional com indicadores de veículos na oficina, fila, entregas, atrasos, compras, complementos, recebimentos, pagamentos, alertas prioritários e resumo semanal.

### Operação

- **Ordens de Serviço:** lista, filtros, ações e detalhes de OS.
- **Produção:** kanban/tabelas de produção, etapas, condições paralelas e alertas.
- **Agenda:** agenda por dia, semana e mês.
- **Complementos:** fluxo simulado de solicitações, aprovações e impactos.
- **Entregas:** entregas hoje, atrasadas, futuras, finalizadas, pendências, situação financeira, documentos e checklist.

### Compras

- **Pedidos:** compras, status de recebimento, itens, OSs atendidas e vínculo financeiro.
- **Itens pendentes:** itens em aberto para produção.
- **Fornecedores:** cadastro e detalhes de fornecedores, pedidos, contas a pagar e ocorrências.

### Financeiro

- Visão geral.
- Contas a receber.
- Contas a pagar.
- Fluxo de caixa.
- Rentabilidade.
- Categorias financeiras.
- Regras de pagamento.

### Relatórios

A página `relatorios.html` reúne:

1. Visão geral.
2. Produção.
3. Prazo e eficiência.
4. Compras.
5. Financeiro.
6. Rentabilidade.
7. Orçamentos e aprovações.
8. Veículos e clientes.

Inclui seletor de período, datas inicial/final, aplicar, limpar, exportar PDF simulado, exportar Excel simulado e imprimir.

### Cadastros

- Clientes.
- Detalhes do cliente.
- Veículos.
- Detalhes do veículo.
- Fornecedores.
- Detalhes do fornecedor.
- Usuários e permissões simuladas.

### Importações

Fluxos visuais simulados para:

- Cilia.
- Soma.
- Histórico do Excel.

Nenhum arquivo é lido de verdade. As etapas exibidas são apenas prévia funcional para validação.

### Configurações

- Configurações gerais: empresa, sistema, produção, financeiro, documentos, notificações e segurança simulada.
- Configurações de etapas e condições paralelas.
- Permissões simuladas via página de usuários.

### Auditoria

Tabela de auditoria visual com registros fictícios de login, criação, edição, movimentação, aprovação, cancelamento, baixa, fechamento, reabertura, importação, configuração e alteração de permissão.

## Dados fictícios

Os dados principais estão em `assets/js/mock-data.js`, incluindo:

- clientes;
- veículos;
- etapas de produção;
- condições paralelas;
- ordens de serviço;
- serviços e peças por OS;
- complementos;
- fornecedores;
- compras;
- contas a receber;
- contas a pagar;
- dados financeiros por OS;
- documentos, fotos, observações, movimentações e histórico;
- fila de veículos;
- limites por etapa;
- eventos da agenda;
- usuários.

## Registro principal — OS 1042

A **OS 1042** permanece como registro principal de demonstração:

- Cliente: Roberto Almeida.
- Veículo: Chevrolet Onix, placa ABC1D23.
- Origem: Cilia.
- Orçamento: ORC-CIL-78942.
- ID externo: CILIA-AX9-1042.
- Seguradora: Porto Seguro.
- Status: Em produção.
- Etapa: Funilaria.
- Condições paralelas: aguardando peça e complemento pendente.
- Valor aprovado: R$ 12.780,00.

A OS 1042 é usada em produção, relatórios, rentabilidade, compras, importações, auditoria, notificações, busca global e entregas.

## Usuários fictícios

### Caio Dicieri

- Perfil: Administrador.
- Acesso completo.
- Pode visualizar lucro, custos, relatórios, configurações e permissões.

### Usuário Operacional

- Acesso a Produção.
- Pode movimentar etapas, inserir observações, consultar peças e trabalhar com fotos.
- Não visualiza lucro.
- Ações de custos, baixa e configurações ficam desabilitadas visualmente.

### Usuário Administrativo

- Acesso a OS, Compras, Financeiro, documentos e relatórios permitidos.
- Configurações críticas ficam restritas visualmente.

## Interações simuladas

- Criar/editar/inativar/reativar registros.
- Adicionar cliente, veículo e fornecedor por modal.
- Abrir detalhes por ID.
- Trocar usuário fictício e testar permissões.
- Aplicar filtros de relatórios.
- Exportar PDF e Excel com toast simulado.
- Imprimir com CSS próprio.
- Simular importação Cilia, Soma e Excel.
- Marcar notificações como lidas.
- Usar busca global por OS, placa, veículo, cliente, orçamento, complemento, pedido, fornecedor e financeiro.
- Confirmar ações críticas com confirmação visual.

## Como testar a Etapa 7

1. Abrir `paginas/inicio.html`.
2. Navegar por todo o menu lateral.
3. Abrir `relatorios.html`.
4. Alterar o período e clicar em **Aplicar**.
5. Trocar abas internas dos relatórios.
6. Clicar em exportar PDF, exportar Excel e imprimir.
7. Usar a busca global com termos como `1042`, `ABC1D23`, `Roberto`, `Cilia`, `COM` e `REC`.
8. Abrir notificações, filtrar/ler notificações e abrir registros.
9. Abrir Clientes, Veículos e Fornecedores e testar modais.
10. Abrir detalhes por ID.
11. Abrir Usuários e trocar o perfil fictício.
12. Abrir Configurações e Etapas.
13. Abrir Importações e simular Cilia, Soma e Excel.
14. Abrir Auditoria.
15. Abrir Entregas e revisar checklist.
16. Revisar responsividade em 1440 px, 1024 px, 768 px e 390 px.
17. Revisar console do navegador.

## Arquivos criados na Etapa 7

- `paginas/cliente-detalhes.html`
- `paginas/veiculo-detalhes.html`
- `paginas/fornecedor-detalhes.html`
- `paginas/configuracoes-etapas.html`
- `paginas/auditoria.html`
- `paginas/entregas.html`
- `assets/js/pages/stage7-module.js`

## Arquivos modificados na Etapa 7

- `paginas/*.html` — inclusão dos módulos JavaScript necessários em todas as páginas.
- `assets/js/navigation.js` — menu final agrupado por Início, Operação, Compras, Financeiro, Relatórios, Cadastros, Importações, Configurações e Auditoria.
- `assets/js/pages/page-renderers.js` — delegação das páginas da Etapa 7 ao novo módulo.
- `assets/js/components.js` — busca global e painel de notificações simuladas.
- `assets/css/components.css` — estilos para relatórios, gráficos, formulários, importações, permissões, auditoria e impressão.
- `assets/css/responsive.css` — ajustes responsivos para relatórios, filtros, tabelas, gráficos e modais.
- `README.md` — documentação final da Etapa 7.

## Decisões assumidas

- Relatórios usam a base central existente, mas alguns comparativos e tendências são fictícios para validação visual.
- Importações Cilia, Soma e Excel são fluxos visuais, sem leitura real de arquivo.
- Permissões são simuladas por seletor temporário, sem login real.
- Configurações alteram visualmente o protótipo quando seguro, mas não persistem.
- Categorias e regras de pagamento são listas funcionais simuladas.
- A impressão usa CSS para ocultar menu, botões e elementos operacionais.
- Nenhuma página principal permanece vazia ou apenas em construção.

## Limitações

- Não há backend, banco de dados ou API.
- Não há autenticação real.
- Não há persistência definitiva.
- Não há importação real de arquivos.
- Não há integração real com Cilia ou Soma.
- Não há emissão de nota fiscal.
- Não há integração bancária ou conciliação real.
- Não há armazenamento real de documentos, fotos ou anexos.
- Todas as ações retornam ao estado inicial ao recarregar a página.

## Próximos passos para o sistema real

- Definir modelo de dados e banco relacional.
- Implementar autenticação, perfis e permissões reais.
- Criar APIs para OS, produção, compras, financeiro, cadastros e relatórios.
- Implementar importadores reais de Cilia, Soma e Excel com validação transacional.
- Implementar upload seguro de arquivos.
- Criar trilha de auditoria persistente.
- Definir regras fiscais, financeiras e contábeis definitivas.
- Implementar testes automatizados de frontend e backend.

## Sugestão de mensagem de commit

```text
feat: finaliza protótipo com relatórios cadastros e configurações
```
