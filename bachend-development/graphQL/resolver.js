const products = require("./data");

module.exports = {
  products: () => {
    return products;
  },

  product: ({ id }) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) throw new Error("Product not found");
    return product;
  },

  addProduct: ({ input }) => {
    if (!input.name || !input.price || !input.categoryId) {
      throw new Error("All fields (name, price, categoryId) are required.");
    }

    const newProduct = {
      id: products.length + 1,
      ...input,
    };
    products.push(newProduct);
    return newProduct;
  },

  updateProduct: ({ id, input }) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) throw new Error("Product not found");

    Object.assign(product, input);
    return product;
  },
};
