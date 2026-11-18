const { spec } = require('pactum');
const assert = require('assert');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Contrato de Produtos', () => {

    it('Deve validar o contrato da consulta de produtos', async () => {

        await spec()
            .post(URL)
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

                // Verifica erros GraphQL
                assert.strictEqual(
                    response.errors,
                    undefined,
                    'A consulta retornou erros GraphQL'
                );

                // Verifica a existência da lista
                assert.ok(
                    Array.isArray(response.data?.Products),
                    'Products deveria retornar uma lista'
                );

                // Valida os campos de cada produto
                response.data.Products.forEach((product, index) => {

                    assert.ok(
                        product.name === null ||
                        typeof product.name === 'string',
                        `name inválido no produto ${index}`
                    );

                    assert.ok(
                        product.description === null ||
                        typeof product.description === 'string',
                        `description inválida no produto ${index}`
                    );

                    assert.ok(
                        product.price === null ||
                        typeof product.price === 'number',
                        `price inválido no produto ${index}`
                    );

                });

                console.log(
                    `Contrato de produtos validado: ${response.data.Products.length} registros.`
                );

            });

    });

});