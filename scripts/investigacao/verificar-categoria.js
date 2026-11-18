const { spec } = require('pactum');

const URL = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Investigação de persistência de categorias', () => {

    it('Deve verificar se a categoria foi cadastrada', async () => {

        const resultado = await spec()
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
            .returns('data.Categories');

        console.log('\nCATEGORIAS ENCONTRADAS:');

        const categoria = resultado.find(item =>
            item.name === 'Categoria QA Raphael 1794536670082'
        );

        console.log(categoria || 'Categoria não encontrada.');

    });

});