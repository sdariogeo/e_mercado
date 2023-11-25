// Trabajamos todo lo que tiene que ver con los datos de people en la base de datos
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "palosanto",
  database: "emercadodb",
  connectionLimit: 5,
});

const getProducts = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, count, unit_cost, currency FROM user_cart"
    );

    return rows;
  } catch (error) {
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const getProductById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, count, unit_cost, currency FROM user_cart WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const createProduct = async (product) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO user_cart(name, count, unit_cost, currency) VALUE(?, ?, ?, ?)`,
      [product.name, product.count, product.unit_cost, product.currency]
    );

    return { id: parseInt(response.insertId), ...product };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const updateProduct = async (id, product) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE user_cart SET name=?, count=?, unit_cost=?, currency=? WHERE id=?`,
      [product.name, product.count, product.unit_cost, product.currency, id]
    );

    return { id, ...product };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const deleteProduct = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM user_cart WHERE id=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
