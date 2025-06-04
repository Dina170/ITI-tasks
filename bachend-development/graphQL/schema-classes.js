const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const products = require("./data");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    categoryId: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: () => {
        try {
          return products;
        } catch (err) {
          throw new Error("Failed to fetch products");
        }
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => {
        try {
          const product = products.find((p) => p.id === parseInt(id));
          if (!product) throw new Error(`Product with ID ${id} not found`);
          return product;
        } catch (err) {
          throw new Error(err.message || "Error fetching product");
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        categoryId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, { name, price, categoryId }) => {
        try {
          if (!name || !price || !categoryId) {
            throw new Error("All fields are required");
          }

          const newProduct = {
            id: products.length + 1,
            name,
            price,
            categoryId,
          };

          products.push(newProduct);
          return newProduct;
        } catch (err) {
          throw new Error(err.message || "Failed to add product");
        }
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
      },
      resolve: (_, { id, name, price, categoryId }) => {
        try {
          const product = products.find((p) => p.id === parseInt(id));
          if (!product) throw new Error(`Product with ID ${id} not found`);

          if (name !== undefined) product.name = name;
          if (price !== undefined) product.price = price;
          if (categoryId !== undefined) product.categoryId = categoryId;

          return product;
        } catch (err) {
          throw new Error(err.message || "Failed to update product");
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
