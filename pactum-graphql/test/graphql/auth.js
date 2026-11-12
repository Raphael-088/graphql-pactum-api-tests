const { spec } = require('pactum');

async function getToken() {
    return await spec()
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
}

module.exports = { getToken };