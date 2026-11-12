Automação de API com GraphQL e PactumJS
Projeto desenvolvido como atividade prática do módulo Automação de API: Conhecendo GraphQL e PactumJS.

O objetivo deste projeto é validar operações de API GraphQL utilizando o framework PactumJS, incluindo testes funcionais, testes de contrato e geração de relatórios automatizados.

📋 Tecnologias Utilizadas
Node.js
Mocha
PactumJS
Pactum Matchers
GraphQL
Mochawesome
🚀 Instalação
Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git
Acesse a pasta do projeto:

cd pactum-graphql
Instale as dependências:

npm install
▶️ Execução dos Testes
Executar todos os testes:

npm test
✅ Funcionalidades Testadas
Categorias
Foram implementados testes para as seguintes operações:

addCategory
editCategory
deleteCategory
Arquivo:

test/graphql/categories.test.js
Produtos
Foram implementados testes para as seguintes operações:

addProduct
editProduct
deleteProduct
Arquivo:

test/graphql/products.test.js
📑 Testes de Contrato
Foram implementados testes de contrato utilizando PactumJS e Pactum Matchers.

Contrato de Categorias
Valida a estrutura da consulta:

Categories
Arquivo:

test/graphql/category.contract.test.js
Contrato de Produtos
Valida a estrutura da consulta:

Products
Arquivo:

test/graphql/product.contract.test.js
🔐 Autenticação
Para execução das operações protegidas da API foi implementada autenticação utilizando GraphQL.

Mutation utilizada:

authUser
Arquivo responsável:

test/graphql/auth.js
O token gerado é reutilizado pelos testes de Categorias e Produtos.

📂 Estrutura do Projeto
test
│
└── graphql
    ├── auth.js
    ├── categories.test.js
    ├── products.test.js
    ├── category.contract.test.js
    ├── product.contract.test.js
    ├── login.test.js
    └── user.test.js
📊 Relatórios
A geração de relatórios foi implementada utilizando o reporter:

Mochawesome
Executando:

npm test
são gerados automaticamente:

mochawesome-report/
│
├── mochawesome.html
└── mochawesome.json
O arquivo HTML pode ser aberto no navegador para visualização detalhada da execução dos testes.

✅ Resultados Obtidos
Todos os cenários implementados para a atividade foram executados com sucesso:

✔ addCategory
✔ editCategory
✔ deleteCategory

✔ addProduct
✔ editProduct
✔ deleteProduct

✔ Contrato Categories
✔ Contrato Products
Resultado final:

9 passing
0 failing
👨‍💻 Autor
Raphael Araújo de Almeida

Projeto desenvolvido como atividade prática do curso de Qualidade de Software e Testes Automatizados da EBAC.