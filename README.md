Automação de API com GraphQL e PactumJS

Projeto desenvolvido como atividade prática do módulo Automação de API: Conhecendo GraphQL e PactumJS, do curso de Qualidade de Software e Testes Automatizados da EBAC.

O objetivo é validar operações de uma API GraphQL utilizando PactumJS, incluindo testes funcionais, testes de contrato, autenticação e geração automatizada de relatórios.

Tecnologias utilizadas

Node.js

JavaScript

Mocha

PactumJS

GraphQL

Mochawesome

Assert (módulo nativo do Node.js)

Endpoint da API

http://lojaebac.ebaconline.art.br/graphql

Instalação

Clone o repositório:

git clone https://github.com/Raphael-088/graphql-pactum-api-tests.git

Acesse a pasta:

cd graphql-pactum-api-tests

Instale as dependências:

npm install

Execução dos testes

Para executar todos os testes configurados:

npm test

Também é possível executar os arquivos individualmente.

Testes funcionais de Categorias:

npx mocha "./test/graphql/categories/categories.test.js"

Testes funcionais de Produtos:

npx mocha "./test/graphql/products/products.test.js"

Testes de contrato:

npx mocha "./test/graphql/categories/categories.contract.test.js" "./test/graphql/products/products.contract.test.js"

Estrutura do projeto

graphql-pactum-api-tests/
│
├── scripts/
│   └── investigacao/
│       ├── investigar-produto.js
│       ├── investigar-rest.js
│       ├── investigar-schema.js
│       └── verificar-categoria.js
│
├── test/
│   └── graphql/
│       ├── categories/
│       │   ├── categories.test.js
│       │   └── categories.contract.test.js
│       │
│       ├── products/
│       │   ├── products.test.js
│       │   └── products.contract.test.js
│       │
│       └── helpers/
│           └── auth.js
│
├── .gitignore
├── package.json
└── package-lock.json

A pasta scripts/investigacao contém scripts utilizados durante a análise da API. Esses arquivos não fazem parte da execução automática da suíte principal.

Autenticação

Foi implementada autenticação utilizando a mutação GraphQL authUser.

O token retornado pela API é utilizado nas requisições protegidas dos testes funcionais.

Arquivo responsável:

test/graphql/helpers/auth.js

A função getToken() realiza a autenticação e disponibiliza o token para reutilização nos testes.

Testes funcionais

Foram organizados testes para os serviços de Categorias e Produtos, contemplando as operações previstas na atividade.

Categorias

Operações previstas:

addCategory

editCategory

deleteCategory

Também foi implementada a consulta Categories.

Arquivo:

test/graphql/categories/categories.test.js

Produtos

Operações previstas:

addProduct

editProduct

deleteProduct

Também foi implementada a consulta Products.

Arquivo:

test/graphql/products/products.test.js

Investigação das limitações da API

Durante a implementação e execução dos testes, foram identificadas limitações que impediram a comprovação de algumas operações CRUD.

As investigações foram realizadas por meio de consultas GraphQL, introspecção do schema e análise das respostas retornadas pela API.

Criação de categorias

A mutação addCategory retornou HTTP 200, sem erros GraphQL, porém os campos solicitados foram retornados como null:

{
  "data": {
    "addCategory": {
      "name": null,
      "photo": null
    }
  }
}

Criação de produtos

A mutação addProduct apresentou comportamento semelhante:

{
  "data": {
    "addProduct": {
      "name": null,
      "description": null,
      "price": null
    }
  }
}

Embora as requisições tenham retornado HTTP 200, não foi possível comprovar que os registros foram efetivamente criados.

Por esse motivo, os cenários de criação foram mantidos como pendentes, evitando considerar uma resposta com campos null como sucesso.

Investigação por introspecção do schema GraphQL

Foi realizada uma consulta de introspecção para analisar os tipos Category e Product.

Consulta utilizada:

query {
    category: __type(name: "Category") {
        name
        fields {
            name
            type {
                kind
                name
                ofType {
                    kind
                    name
                }
            }
        }
    }

    product: __type(name: "Product") {
        name
        fields {
            name
            type {
                kind
                name
                ofType {
                    kind
                    name
                }
            }
        }
    }
}

A investigação demonstrou que os tipos Category e Product não disponibilizam os campos id ou _id.

Dessa forma, não foi possível obter os identificadores dos registros por meio dos campos consultados no schema.

Erro na consulta Product(id: ID!)

Durante a investigação, foi realizada uma tentativa de consulta de produto utilizando o identificador:

679f50eb0cf0a913258b286c

A API retornou um erro interno GraphQL (INTERNAL_SERVER_ERROR).

Mensagem retornada:

Parameter "filter" to find() must be an object, got "679f50eb0cf0a913258b286c" (type string)

O stack trace retornado pela API foi:

ObjectParameterError: Parameter "filter" to find() must be an object, got "679f50eb0cf0a913258b286c" (type string)
    at model.Query.Query.find (/home/ebac/node_modules/mongoose/lib/query.js:2348:16)
    at Function.find (/home/ebac/node_modules/mongoose/lib/model.js:2112:13)
    at Object.Product (/home/ebac/graphql/resolvers.js:18:39)
    at field.resolve (/home/ebac/node_modules/@apollo/server/dist/cjs/utils/schemaInstrumentation.js:41:28)
    at executeField (/home/ebac/node_modules/graphql/execution/execute.js:492:20)
    at executeFields (/home/ebac/node_modules/graphql/execution/execute.js:414:22)
    at executeOperation (/home/ebac/node_modules/graphql/execution/execute.js:344:14)
    at execute (/home/ebac/node_modules/graphql/execution/execute.js:136:20)
    at executeIncrementally (/home/ebac/node_modules/@apollo/server/dist/cjs/incrementalDeliveryPolyfill.js:47:34)
    at async executeOperation (/home/ebac/node_modules/@apollo/server/dist/cjs/requestPipeline.js:231:37)
    at async processGraphQLRequest (/home/ebac/node_modules/@apollo/server/dist/cjs/requestPipeline.js:160:32)
    at async internalExecuteOperation (/home/ebac/node_modules/@apollo/server/dist/cjs/ApolloServer.js:635:16)

A resposta também apresentou:

{
  "data": {
    "Product": null
  }
}

O stack trace identifica a execução do resolver Product e a chamada ao método find() do Mongoose.

Erro na consulta Category(id: ID!)

O comportamento observado na consulta de produtos também foi identificado durante a tentativa de consulta de categoria utilizando Category(id: ID!).

A API retornou um erro equivalente:

ObjectParameterError: Parameter "filter" to find() must be an object

O stack trace identificou o seguinte ponto de execução:

at Object.Category (/home/ebac/graphql/resolvers.js:24:40)

Assim como na consulta de produtos, a mensagem indica que o parâmetro filter recebido pelo método find() do Mongoose estava em formato incompatível com o esperado.

As duas ocorrências foram registradas como evidências da investigação dos resolvers Product e Category.

Conforme orientação do professor, os erros, isoladamente, não permitem concluir que os resolvers estejam incompletos ou determinar qual seria sua implementação correta.

Edição e exclusão

Os cenários abaixo foram mantidos como pendentes:

editCategory

deleteCategory

editProduct

deleteProduct

Durante a investigação, não foi possível obter um identificador válido de um registro existente e comprovar essas operações.

Não foram utilizados IDs inventados ou valores nulos para simular sucesso.

Portanto, os cenários foram registrados como bloqueados pelas limitações encontradas, e não como operações aprovadas.

Testes de contrato

Foram implementados testes de contrato utilizando PactumJS e asserções do módulo nativo assert do Node.js.

Os testes verificam:

Ausência de erros GraphQL.

Retorno de listas nas consultas.

Tipos dos campos disponibilizados pela API.

Estrutura dos dados retornados.

Contrato de Categorias

Consulta validada:

query {
    Categories {
        name
        photo
    }
}

Arquivo:

test/graphql/categories/categories.contract.test.js

Resultado observado: 2.227 registros retornados.

Contrato de Produtos

Consulta validada:

query {
    Products {
        name
        description
        price
    }
}

Arquivo:

test/graphql/products/products.contract.test.js

Resultado observado: 1.284 registros retornados.

Resultados dos testes

Testes funcionais

Serviço

Cenário

Resultado

Categorias

Consultar categorias

Aprovado

Categorias

Adicionar categoria

Pendente

Categorias

Editar categoria

Pendente

Categorias

Excluir categoria

Pendente

Produtos

Consultar produtos

Aprovado

Produtos

Adicionar produto

Pendente

Produtos

Editar produto

Pendente

Produtos

Excluir produto

Pendente

Resumo dos testes funcionais:

2 passing

6 pending

0 failing

Testes de contrato

Contrato

Registros consultados

Resultado

Categorias

2.227

Aprovado

Produtos

1.284

Aprovado

Resumo dos testes de contrato:

2 passing

0 failing

Resultado consolidado

Na última execução da suíte completa:

4 testes aprovados.

6 testes pendentes.

0 falhas.

Os cenários pendentes representam limitações identificadas durante a investigação da API, e não operações comprovadamente bem-sucedidas.

Relatórios

A geração de relatórios é realizada utilizando o Mochawesome.

Após a execução dos testes configurados com o reporter, os arquivos são disponibilizados em:

mochawesome-report/
├── mochawesome.html
└── mochawesome.json

O relatório HTML pode ser aberto em um navegador para visualizar os resultados detalhados da execução.

A pasta de relatórios está configurada no .gitignore, assim como node_modules, evitando o envio de arquivos gerados e dependências para o repositório.

Repositório

GitHub:

https://github.com/Raphael-088/graphql-pactum-api-tests

Branch principal:

main

Autor

Raphael Araújo de Almeida

Projeto desenvolvido como atividade prática do curso de Qualidade de Software e Testes Automatizados da EBAC.