const { spec } = require('pactum');
const { getToken } = require('./auth');

describe('Serviço de Produtos', () => {

    let token;

    before(async () => {
        token = await getToken();
    });

    it('Deve adicionar um produto', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    addProduct(
                        name: "Livro PactumJS"
                        categories: [{
                            name: "Automação"
                            photo: "automacao.jpg"
                        }]
                        description: "Produto criado por automação"
                        price: 99.90
                        specialPrice: 79.90
                        photos: ["livro.jpg"]
                        popular: true
                        quantity: 5
                        visible: true
                        location: "A1"
                        additionalDetails: ["Pactum","GraphQL"]
                    ) {
                        name
                        description
                        price
                    }
                }
            `)
            .expectStatus(200);

    });

    it('Deve editar um produto', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    editProduct(
                        id: "679f50eb0cf0a913258b286c"
                        name: "Livro PactumJS Editado"
                        description: "Produto editado por automação"
                        price: 150
                    ) {
                        name
                        description
                        price
                    }
                }
            `)
            .expectStatus(200)
            .inspect();

    });

    it('Deve excluir um produto', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    deleteProduct(
                        id: "679f50eb0cf0a913258b286c"
                    ) {
                        name
                    }
                }
            `)
            .expectStatus(200)
            .inspect();

    });

    it('Deve consultar produtos cadastrados', async () => {

        await spec()
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