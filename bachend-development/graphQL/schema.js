const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String!
        price: Int!
        categoryId: Int!
    }

    input ProductInput {
        name: String!
        price: Int!
        categoryId: Int!
    }
        
    type Query {
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductInput): Product
    }    
    
`);

module.exports = schema;
