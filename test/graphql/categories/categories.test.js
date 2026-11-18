const { spec } = require('pactum');
const assert = require('assert');
const { getToken } = require('../helpers/auth');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Serviço de Categorias', () => {
    let token;

    before(async () => {
        token = await getToken();
    });

    it('Deve consultar a lista de categorias', async () => {
        await spec()
            .post(URL)
            .withHeaders('Authorization', `Bearer ${token}`)
            .withGraphQLQuery(`
                query {
                    Categories {
                        name
                        photo
                    }
                }
            `)
            .expectStatus(200)
            .expect((ctx) => {
                const response = ctx.res.json;

                assert.strictEqual(
                    response.errors,
                    undefined,
                    'A consulta retornou erros GraphQL.'
                );

                assert.ok(
                    Array.isArray(response.data?.Categories),
                    'A resposta deveria conter uma lista de categorias.'
                );

                console.log(
                    `Categorias encontradas: ${response.data.Categories.length}`
                );
            });
    });

    /*
     * CENÁRIOS BLOQUEADOS PELA LIMITAÇÃO DA API
     *
     * A mutação addCategory foi executada durante a investigação,
     * mas retornou name: null e photo: null.
     *
     * A introspecção também demonstrou que o tipo Category
     * não disponibiliza um campo ID.
     *
     * Portanto, não é possível comprovar a criação, edição
     * ou exclusão com os dados atualmente disponibilizados.
     */

    it.skip('Deve adicionar uma categoria (bloqueado: retorno da API com campos null)');

    it.skip('Deve editar uma categoria (bloqueado: ausência de identificador disponível)');

    it.skip('Deve excluir uma categoria (bloqueado: ausência de identificador disponível)');
});