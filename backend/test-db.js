const pool = require("./config/db");

async function testDatabase() {
    try {
        const [rows] = await pool.query("SELECT 1 AS result");

        console.log("✅ Database connected successfully!");
        console.log(rows);

        await pool.end();
    } catch (error) {
        console.error("❌ Database connection failed!");
        console.error(error.message);
    }
}

testDatabase();