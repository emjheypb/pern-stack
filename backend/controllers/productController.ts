import { sql } from "../config/db.ts";
import express from "express";
type Request = express.Request;
type Response = express.Response;

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY updated_at DESC
        `;
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("GET_PRODUCTS error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const products = await sql`
    SELECT * FROM products
    WHERE id=${id}
    `;

    if (!products || products.length === 0) {
      res
        .status(404)
        .json({ success: false, message: `Product #${id} not found` });
      return;
    }

    res.status(200).json({ success: true, data: products[0] });
  } catch (error) {
    console.error("GET_PRODUCT error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    quantity,
    description,
    tags,
    expires_at,
    best_before,
    image,
  } = req.body;
  if (!name || typeof price === "undefined" || !quantity) {
    res.status(400).json({
      success: false,
      message: "Required Fields: name, price, quantity",
    });
    return;
  }

  const now = new Date(Date.now()).toISOString();

  try {
    const newProduct = await sql`
    INSERT INTO products (name, price, quantity, description, tags, expires_at, best_before, image, created_at, updated_at)
    VALUES (${name}, ${price}, ${quantity}, ${description}, ${tags}, ${
      expires_at && new Date(expires_at).toDateString()
    }, ${
      best_before && new Date(best_before).toDateString()
    }, ${image}, ${now}, ${now})
    RETURNING *
    `;
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("CREATE_PRODUCT error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: string[] = [];

  try {
    Object.entries(req.body).forEach(([key, value], index) => {
      if (["id", "created_date"].includes(key.toLowerCase())) return;
      updates.push(
        `${key}=${typeof value === "string" ? "'" : ""}${value}${
          typeof value === "string" ? "'" : ""
        }`
      );
    });
    if (!updates.some((set) => set.includes("expires_at")))
      updates.push("expires_at=null");
    if (!updates.some((set) => set.includes("best_before")))
      updates.push("best_before=null");

    const updatedProduct = await sql`
    UPDATE products
    SET ${sql.unsafe(updates.join(", "))}
    WHERE id = ${id}
    RETURNING *
    `;

    if (!updatedProduct || updatedProduct.length === 0) {
      res
        .status(404)
        .json({ success: false, message: `Product #${id} not found` });
      return;
    }

    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error("UPDATE_PRODUCT error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *
    `;

    if (!deletedProduct || deletedProduct.length === 0) {
      res
        .status(404)
        .json({ success: false, message: `Product #${id} not found` });
      return;
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.error("UPDATE_PRODUCT error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
