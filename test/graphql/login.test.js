const { spec } = require('pactum');

it('debug category', async () => {

    const token = await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
            mutation AuthUser($email: String, $password: String) {
                authUser(
                    email: $email,
                    password: $password
                ) {
                    token
                }
            }
        `)
        .withGraphQLVariables({
            email: 'admin@admin.com',
            password: 'admin123'
        })
        .returns('data.authUser.token');

    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders('Authorization', token)
        .withGraphQLQuery(`
            mutation {
                addCategory(
                    name: "Categoria QA"
                    photo: "qa.jpg"
                ) {
                    name
                    photo
                }
            }
        `)
        .expectStatus(200)
        .inspect();
});