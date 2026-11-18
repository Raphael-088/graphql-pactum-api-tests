const { spec } = require('pactum');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

async function consultarSchema() {
    const query = `
        query {
            __type(name: "Category") {
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
    `;

    await spec()
        .post(URL)
        .withGraphQLQuery(query)
        .expectStatus(200)
        .expect((ctx) => {
            console.log(JSON.stringify(ctx.res.json, null, 2));
        });
}

consultarSchema().catch(console.error);
