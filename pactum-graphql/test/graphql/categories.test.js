const { spec } = require('pactum');
const { getToken } = require('./auth');

describe('Serviço de Categorias', () => {

    let token;

    before(async () => {
        token = await getToken();
    });

    it('Deve adicionar uma categoria', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    addCategory(
                        name: "Categoria QA Raphael"
                        photo: "categoria.jpg"
                    ) {
                        name
                        photo
                    }
                }
            `)
            .expectStatus(200);

    });

    it('Deve editar uma categoria', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    editCategory(
                        id: "679f50eb0cf0a913258b286c"
                        name: "Categoria Editada"
                        photo: "editada.jpg"
                    ) {
                        name
                        photo
                    }
                }
            `)
            .expectStatus(200)
            .inspect();

    });

    it('Deve excluir uma categoria', async () => {

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders('Authorization', token)
            .withGraphQLQuery(`
                mutation {
                    deleteCategory(
                        id: "679f50eb0cf0a913258b286c"
                    ) {
                        name
                    }
                }
            `)
            .expectStatus(200)
            .inspect();

    });

});