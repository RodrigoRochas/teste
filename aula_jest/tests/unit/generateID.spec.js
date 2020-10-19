const generatedID = require('../../src/utils/generateUUID');

//Testar se é possivel gerar um UUID unico
//Se está vindo vindo um ID
//Se o ID é uma STRING, com um tamanho de 36 caracteres

describe("generateUUID", () => {
    it("se é possivel gerar um UUID unico", () => {
        const id = generatedID();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    });
});