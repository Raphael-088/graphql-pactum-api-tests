const { spec } = require('pactum');

describe('Contrato Products', () => {

    it('Deve validar a consulta de produtos', async () => {

        const response = await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withGraphQLQuery(`
                query {
                    Products {
                        name
                        description
                        price
                    }
                }
            `)
            .expectStatus(200);

    });

});