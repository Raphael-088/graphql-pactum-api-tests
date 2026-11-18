const { spec } = require('pactum');
const { getToken } = require('../../test/graphql/helpers/auth');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Investigação de persistência de produtos', () => {

    let token;

    before(async () => {
        token = await getToken();
    });

    it('Deve verificar o cadastro de um produto', async () => {

        const nome = `PRODUTO-QA-${Date.now()}`;

        const resposta = await spec()
            .post(URL)
            .withHeaders('Authorization', `Bearer ${token}`)
            .withGraphQLQuery(`
                mutation AddProduct($name: String) {
                    addProduct(name: $name) {
                        name
                    }
                }
            `)
            .withGraphQLVariables({
                name: nome
            })
            .expectStatus(200)
            .returns('data.addProduct');

        console.log('\nRETORNO DA MUTATION:');
        console.log(resposta);

        const produtos = await spec()
            .post(URL)
            .withGraphQLQuery(`
                query {
                    Products {
                        name
                    }
                }
            `)
            .expectStatus(200)
            .returns('data.Products');

        const encontrado = produtos.find(
            produto => produto.name === nome
        );

        console.log('\nRESULTADO DA CONSULTA:');
        console.log(encontrado || 'Produto não encontrado.');

    });

});
