# MongoDB Aggregation & Operations Practice

This file includes a comprehensive set of MongoDB queries categorized into parts: basic aggregation, advanced queries and projections, update operations, indexing and performance, and advanced analytics. Each section consists of a question followed by its corresponding solution.

---

## Part 1: Basic Aggregation

**1. Calculate the number of products per category and sort by highest count first.**

```
db.products.aggregate([
  { $group: { _id: "$category", noOfProd: { $count: {} } } },
  { $sort: { noOfProd: -1 } }
])
```

**2. Find the maximum price for each product category and include a list of products in that category.**

```
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      maxPrice: { $max: "$price" },
      products: { $push: "$name" }
    }
  }
])
```

**3. Retrieve all orders made by user "ahmed" with full product details populated.**

```
db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
  { $match: { "user.name": "ahmed" } },
  { $lookup: { from: "products", localField: "productsIds", foreignField: "_id", as: "products" } }
])
```

**4. Calculate the highest total order value for user "ahmed".**

```
db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
  { $match: { "user.name": "ahmed" } },
  { $lookup: { from: "products", localField: "productsIds", foreignField: "_id", as: "products" } },
  { $addFields: { totalPrice: { $sum: "$products.price" } } },
  { $sort: { totalPrice: -1 } },
  { $limit: 1 }
])
```

**5. Calculate the average price of products for each vendor and display vendors sorted by their average price.**

```
db.products.aggregate([
  { $group: { _id: "$vendor", avgPrice: { $avg: "$price" } } },
  { $sort: { avgPrice: 1 } }
])
```

---

## Part 2: Advanced Queries and Projection

**6. Find all Apple products and return only the first stock location.**

```
db.products.find(
  { vendor: "Apple" },
  { "stock": { $slice: 1 }, name: 1 }
)

db.products.find(
  { vendor: "Apple", stock: { $exists: true } },
  { name: 1, "stock.$": 1 }
)
```

**7. Find all products that have at least one stock location with more than 100 units using `$elemMatch`.**

```
db.products.find({ stock: { $elemMatch: { $gte: 100 } } })
```

**8. Find all Laptop products and return only their name and price, excluding the `_id` field.**

```
db.products.find({ category: "Laptop" }, { _id: 0, name: 1, price: 1 })
```

**9. Find all products with a price greater than 10000 and return their names in uppercase and price with a 10% discount.**

```
db.products.aggregate([
  { $match: { price: { $gt: 10000 } } },
  { $project: { _id: 0, name: { $toUpper: "$name" }, price: { $multiply: ["$price", 0.9] } } }
])
```

**10. Use projection to return only the second stock value for all products with at least 3 stock locations.**

```
db.products.aggregate([
  {
    $match: {
      stock: { $exists: true },
      $expr: { $gte: [ { $size: "$stock" }, 3 ] }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      secondVal: { $slice: ["$stock", 1, 1] }
    }
  }
])
```

---

## Part 3: Update Operations

**11. Update all products in the "Phone" category to add a new "features" array and increase price by 10%.**

```
db.products.updateMany(
  { category: "Phone" },
  {
    $set: { features: ["f1", "f2"] },
    $mul: { price: 1.1 }
  }
)
```

**12. For all products that have a stock array, add a new inventory location with 50 units.**

```
db.products.updateMany(
  { stock: { $exists: true } },
  { $push: { stock: 50 } }
)
```

**13. Decrease the stock by 5 for the first stock location that has more than 50 units for "Apple" products.**

```
db.products.updateMany(
  { vendor: "Apple", stock: { $gt: 50 } },
  { $inc: { "stock.$": -5 } }
)
```

**14. Use `$pull` to remove all stock values less than 10 from all products.**

```
db.products.updateMany(
  { stock: { $exists: true } },
  { $pull: { stock: { $lt: 10 } } }
)
```

**15. Add a "lastUpdated" timestamp to all products that don't have it, then create a TTL index that expires documents after 30 days.**

```
db.products.updateMany(
  { lastUpdated: { $exists: false } },
  { $set: { lastUpdated: new Date() } }
)

db.products.createIndex(
  { lastUpdated: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
)
```

---

## Part 4: Indexes and Performance

**16. Create a compound index for category and price, then query using it to verify performance.**

```
db.products.createIndex({ category: 1, price: 1 })

db.products.find(
  { category: "Phone", price: { $gt: 5000 } }
).explain("executionStats")
```

**17. Create a unique index on the product name field, then attempt to insert a duplicate product.**

```
db.products.createIndex({ name: 1 }, { unique: true })
```

```jsx
db.products.insertOne({ name: "Samaung Phone" });
```

**18. Create a text index on the product name and use it to search for products containing "phone".**

```
db.products.createIndex({ name: "text" })
```

```jsx
db.products.find({ $text: { $search: "Phone" } });
```

---

## Part 5: Advanced Aggregation Pipeline (Bonus)

**19. Create a comprehensive product analytics report using aggregation pipelines:**

**a. Category performance metrics (count, avg price, min/max price, total inventory):**

```
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $count: {} },
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
      totalInventory: { $sum: { $sum: "$stock" } }
    }
  }
])
```

**b. Inventory risk assessment (identify items with less than 20 units in stock):**

```
db.products.aggregate([
  { $project: { name: 1, totalStock: { $sum: "$stock" } } },
  { $match: { totalStock: { $lt: 20 } } }
])
```

**c. Vendor analysis with diversity score (number of different categories per vendor):**

```
db.products.aggregate([
  { $match: { vendor: { $exists: true } } },
  { $group: { _id: "$vendor", uniqueCat: { $push: "$category" } } },
  { $project: { noOfCat: { $size: "$uniqueCat" } } }
])
```
