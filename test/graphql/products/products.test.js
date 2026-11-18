const { spec } = require('pactum');
const assert = require('assert');
const { getToken } = require('../helpers/auth');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Serviço de Produtos', () => {
    let token;

    before(async () => {
        token = await getToken();
    });

    it('Deve consultar produtos cadastrados', async () => {
        await spec()
            .post(URL)
            .withHeaders('Authorization', `Bearer ${token}`)
            .withGraphQLQuery(`
                query {
                    Products {
                        name
                        description
                        price
                    }
                }
            `)
            .expectStatus(200)
            .expect((ctx) => {
                const response = ctx.res.json;

                assert.strictEqual(response.errors, undefined);
                assert.ok(Array.isArray(response.data?.Products));

                console.log(
                    `Produtos encontrados: ${response.data.Products.length}`
                );
            });
    });

    it.skip('Deve adicionar um produto (bloqueado: API retorna campos null)');

    it.skip('Deve editar um produto (bloqueado: ausência de identificador disponível)');

    it.skip('Deve excluir um produto (bloqueado: ausência de identificador disponível)');
});