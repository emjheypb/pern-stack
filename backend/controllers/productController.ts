export const getAllProducts = async (req, res) => {
  // Logic to fetch all products from the database
  res.json({ message: "Fetch all products" });
}

export const createProduct = async (req, res) => {
  // Logic to create a new product in the database
  const newProduct = req.body;
  res.status(201).json({ message: "Product created", product: newProduct });
}