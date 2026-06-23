# Cilia — formato de exemplo para Serviços, Peças e Compras

> Objetivo: documentar o formato esperado para transformar a lista de peças e serviços de um orçamento Cilia em registros do protótipo Melo, sem importar XML automaticamente nesta etapa.

## Limite desta análise

O arquivo XML citado no ambiente do usuário (`Orçamento_1691962.xml`) está em um caminho local do Windows e não está disponível dentro do repositório. Portanto, este exemplo usa o formato já existente no protótipo e define a estrutura-alvo para quando o XML for anexado ou copiado para o projeto.

## Destino 1: Detalhes da OS > Serviços e peças

A aba **Serviços e peças** da OS é preenchida por duas listas centrais:

- `servicosOS`: mão de obra, pintura, funilaria, montagem, desmontagem, reparo e serviços complementares.
- `pecasOS`: peças que precisam ser controladas por compra, recebimento e custo.

### Exemplo de serviços (`servicosOS`)

```js
{
  id: 'SRV-CILIA-1691962-001',
  osId: 'OS-CILIA-1691962',
  descricao: 'Substituição do para-choque dianteiro',
  setor: 'Montagem',
  quantidade: 1,
  valorUnitario: 320.00,
  origem: 'Orçamento Cilia 1691962',
  status: 'Autorizado',
  complementoId: ''
}
```

Campos recomendados:

| Campo | Regra de preenchimento |
| --- | --- |
| `id` | Identificador interno único do serviço. |
| `osId` | ID da OS que receberá a lista. |
| `descricao` | Descrição normalizada do serviço vindo do Cilia. |
| `setor` | Setor operacional: `Funilaria`, `Pintura`, `Montagem`, `Preparação`, `Terceiros` ou equivalente. |
| `quantidade` | Quantidade aprovada no orçamento. |
| `valorUnitario` | Valor unitário aprovado. |
| `origem` | Informar o orçamento Cilia de origem. |
| `status` | Usar `Autorizado` para itens aprovados no orçamento principal. |
| `complementoId` | Vazio no orçamento principal; preencher apenas em complementos. |

## Destino 2: Detalhes da OS > Serviços e peças > Peças

### Exemplo de peça (`pecasOS`)

```js
{
  id: 'PEC-CILIA-1691962-001',
  osId: 'OS-CILIA-1691962',
  descricao: 'Para-choque dianteiro',
  codigo: 'SEM-CODIGO',
  quantidade: 1,
  fornecedor: 'Oficina',
  situacao: 'A comprar',
  compraId: 'COM-CILIA-1691962-001',
  previsao: '',
  custoEstimado: 890.00,
  custoReal: 0,
  recebido: '0/1',
  troca: 'Sim',
  fornecimento: 'Oficina'
}
```

Campos recomendados:

| Campo | Regra de preenchimento |
| --- | --- |
| `id` | Identificador interno único da peça. |
| `osId` | ID da OS que receberá a peça. |
| `descricao` | Nome da peça no Cilia, revisado para compra. |
| `codigo` | Código/OEM quando existir; usar `SEM-CODIGO` se o XML não trouxer código. |
| `quantidade` | Quantidade solicitada/aprovada. |
| `fornecedor` | Inicialmente `Oficina`, porque o fornecimento será da oficina. |
| `situacao` | Inicialmente `A comprar` ou `Pedido`, conforme o fluxo escolhido. |
| `compraId` | ID da compra gerada a partir da peça. |
| `previsao` | Pode ficar vazio até cotação/pedido. |
| `custoEstimado` | Valor aprovado/orçado para a peça. |
| `custoReal` | Começa em `0` até compra/recebimento. |
| `recebido` | Começa em `0/{quantidade}`. |
| `troca` | Deve ser `Sim` quando o item do Cilia indicar substituição/troca. |
| `fornecimento` | Deve ser `Oficina` para gerar compras internas. |

## Destino 3: Compras

A lista de compras deve ser gerada somente para peças com:

- `troca = Sim`;
- `fornecimento = Oficina`.

### Exemplo de compra (`compras`)

```js
{
  id: 'COM-CILIA-1691962-001',
  pedido: 'PED-CILIA-1691962-001',
  fornecedorId: 'FOR-OFICINA-A-DEFINIR',
  osId: 'OS-CILIA-1691962',
  item: 'Para-choque dianteiro',
  quantidade: 1,
  quantidadeRecebida: 0,
  status: 'Em aberto',
  situacao: 'A comprar',
  valor: 890.00,
  previsaoEntrega: '',
  vencimento: '',
  contaPagarId: null,
  origem: 'Orçamento Cilia 1691962',
  troca: 'Sim',
  fornecimento: 'Oficina'
}
```

Campos recomendados:

| Campo | Regra de preenchimento |
| --- | --- |
| `id` | Identificador único da compra. |
| `pedido` | Número interno do pedido; pode ser provisório até emissão. |
| `fornecedorId` | Usar fornecedor padrão/a definir até cotação. |
| `osId` | OS vinculada. |
| `item` | Descrição consolidada da peça ou grupo de peças. |
| `quantidade` | Quantidade total a comprar. |
| `quantidadeRecebida` | Começa em `0`. |
| `status` | Começa em `Em aberto`. |
| `situacao` | Começa em `A comprar` ou `Pedido`. |
| `valor` | Valor estimado/orçado. |
| `previsaoEntrega` | Vazio até confirmação do fornecedor. |
| `vencimento` | Vazio até condição comercial. |
| `contaPagarId` | `null` até gerar financeiro. |
| `origem` | Orçamento Cilia de origem. |
| `troca` | `Sim`. |
| `fornecimento` | `Oficina`. |

## Regras de transformação do orçamento Cilia

1. Separar itens do XML em **serviços** e **peças**.
2. Registrar todos os serviços aprovados em `servicosOS` com `origem = Orçamento Cilia {numero}`.
3. Registrar peças em `pecasOS` mantendo descrição, quantidade, valor aprovado e código quando existir.
4. Gerar compras apenas para peças com `troca = Sim` e `fornecimento = Oficina`.
5. Não gerar compra para serviços de mão de obra interna.
6. Serviços terceirizados podem virar compra somente se forem tratados como fornecedor externo, não como peça.
7. Manter vínculo entre peça e compra por `compraId`.
8. Iniciar recebimento como `0/{quantidade}` e custo real como `0`.

## Exemplo consolidado

```js
const exemploCilia1691962 = {
  servicosOS: [
    {
      id: 'SRV-CILIA-1691962-001',
      osId: 'OS-CILIA-1691962',
      descricao: 'Reparação do paralama dianteiro esquerdo',
      setor: 'Funilaria',
      quantidade: 1,
      valorUnitario: 450.00,
      origem: 'Orçamento Cilia 1691962',
      status: 'Autorizado',
      complementoId: ''
    }
  ],
  pecasOS: [
    {
      id: 'PEC-CILIA-1691962-001',
      osId: 'OS-CILIA-1691962',
      descricao: 'Para-choque dianteiro',
      codigo: 'SEM-CODIGO',
      quantidade: 1,
      fornecedor: 'Oficina',
      situacao: 'A comprar',
      compraId: 'COM-CILIA-1691962-001',
      previsao: '',
      custoEstimado: 890.00,
      custoReal: 0,
      recebido: '0/1',
      troca: 'Sim',
      fornecimento: 'Oficina'
    }
  ],
  compras: [
    {
      id: 'COM-CILIA-1691962-001',
      pedido: 'PED-CILIA-1691962-001',
      fornecedorId: 'FOR-OFICINA-A-DEFINIR',
      osId: 'OS-CILIA-1691962',
      item: 'Para-choque dianteiro',
      quantidade: 1,
      quantidadeRecebida: 0,
      status: 'Em aberto',
      situacao: 'A comprar',
      valor: 890.00,
      previsaoEntrega: '',
      vencimento: '',
      contaPagarId: null,
      origem: 'Orçamento Cilia 1691962',
      troca: 'Sim',
      fornecimento: 'Oficina'
    }
  ]
};
```
