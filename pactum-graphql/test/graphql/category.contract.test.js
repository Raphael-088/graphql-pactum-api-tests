const { spec } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

describe('Contrato Categories', () => {

    it('Deve validar o contrato da consulta de categorias', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withGraphQLQuery(`
                query {
                    Categories {
                        name
                    }
                }
            `)
            .expectStatus(200)
            .expectJsonMatch({
                data: {
                    Categories: eachLike({
                        name: like('Categoria')
                    })
                }
            });

    });

});