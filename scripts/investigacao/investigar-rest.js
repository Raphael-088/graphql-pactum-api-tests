const { spec } = require('pactum');

const BASE_URL = 'http://lojaebac.ebaconline.art.br';

describe('Investigação API REST WordPress', function () {

    this.timeout(15000);

    it('Deve consultar produtos do WordPress', async () => {

        await spec()
            .get(`${BASE_URL}/wp-json/wp/v2/product`)
            .withQueryParams({
                per_page: 5
            })
            .expectStatus(200)
            .expect((ctx) => {

                console.log('\nPRODUTOS WORDPRESS:\n');

                ctx.res.json.forEach(product => {
                    console.log({
                        id: product.id,
                        name: product.name,
                        slug: product.slug
                    });
                });

            });

    });

    it('Deve consultar categorias do WordPress', async () => {

        await spec()
            .get(`${BASE_URL}/wp-json/wp/v2/product_cat`)
            .withQueryParams({
                per_page: 5
            })
            .expectStatus(200)
            .expect((ctx) => {

                console.log('\nCATEGORIAS WORDPRESS:\n');

                ctx.res.json.forEach(category => {
                    console.log({
                        id: category.id,
                        name: category.name,
                        slug: category.slug
                    });
                });

            });

    });

});

it('Deve verificar se o ID REST é reconhecido pelo GraphQL', async () => {

    const productId = '11213';

    await spec()
        .post(`${BASE_URL}/graphql`)
        .withGraphQLQuery(`
            query {
                Product(id: "${productId}") {
                    name
                    description
                    price
                }
            }
        `)
        .expectStatus(200)
        .expect((ctx) => {

            if (ctx.res.json.errors) {
                console.log('\nERRO GRAPHQL:', ctx.res.json.errors);
            }

            require('assert').strictEqual(
                ctx.res.json.errors,
                undefined,
                'A consulta retornou erros GraphQL'
            );

        });

});

it('Deve verificar a consulta individual de categoria', async () => {

    await spec()
        .post(`${BASE_URL}/graphql`)
        .withGraphQLQuery(`
            query {
                Category(id: "161") {
                    name
                    photo
                }
            }
        `)
        .expectStatus(200)
        .inspect();

});