const { spec } = require('pactum');
const assert = require('assert');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Contrato de Categorias', () => {

    it('Deve validar o contrato da consulta de categorias', async () => {

        await spec()
            .post(URL)
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

                // Verifica erros GraphQL
                assert.strictEqual(
                    response.errors,
                    undefined,
                    'A consulta retornou erros GraphQL'
                );

                // Verifica a existência da lista
                assert.ok(
                    Array.isArray(response.data?.Categories),
                    'Categories deveria retornar uma lista'
                );

                // Valida os campos de cada categoria
                response.data.Categories.forEach((category, index) => {

                    assert.ok(
                        category.name === null ||
                        typeof category.name === 'string',
                        `name inválido na categoria ${index}`
                    );

                    assert.ok(
                        category.photo === null ||
                        typeof category.photo === 'string',
                        `photo inválido na categoria ${index}`
                    );

                });

                console.log(
                    `Contrato de categorias validado: ${response.data.Categories.length} registros.`
                );

            });

    });

});