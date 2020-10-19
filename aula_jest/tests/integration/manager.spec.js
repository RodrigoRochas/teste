//Subir um servidor no superteste
//Criar variavel de ambiente para rodar o teste no BD de teste.

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const {cpf} = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {
    afterAll(() => {
        connection.close();
    });

    beforeEach(async(done) => {
        await truncate(connection.models);
        done();
    })

    it("É possivel criar um novo gerente", async () => {
        const response = await request(app).post("/managers").send({
            name: "Rodrigo Rocha",
            cpf: cpf.generate(),
            email: "rodrigo-rochas@live.com",
            cellphone: "1197468816675",
            password: "123456",
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });

    it("Não é possivel cadastrar um gerent com cpf existente", async () => {
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Rodrigo R",
            cpf: cpfGerente,
            email: "rodrigo-rochas@live",
            cellphone: "11468816675",
            password: "123456",
        });

        response = await request(app).post("/managers").send({
            name: "Alissom",
            cpf: cpfGerente,
            email: "rodrigo-rochas@live",
            cellphone: "11974675",
            password: "123456",
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists");


       
    })
});