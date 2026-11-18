require('dotenv').config();

const { spec } = require('pactum');

const BASE_URL = 'http://lojaebac.ebaconline.art.br';

async function getToken() {
    const email = process.env.API_EMAIL;
    const password = process.env.API_PASSWORD;

    if (!email || !password) {
        throw new Error('Configure API_EMAIL e API_PASSWORD no arquivo .env');
    }

    const token = await spec()
        .post(`${BASE_URL}/graphql`)
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
            email,
            password
        })
        .expectStatus(200)
        .expect((ctx) => {
            if (ctx.res.json.errors) {
                throw new Error(
                    `Erro na autenticação: ${JSON.stringify(ctx.res.json.errors)}`
                );
            }

            if (!ctx.res.json.data?.authUser?.token) {
                throw new Error('A API não retornou um token válido.');
            }
        })
        .returns('data.authUser.token');

    return token;
}

module.exports = { getToken };