// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
async function getAllFoodTrucks() {
  const result = await db.query("SELECT * FROM food_trucks");
  return result.rows;
}

// 2. getFoodTruckById(id)

// 3. getVeganFoodTrucks()

// 4. getFoodTrucksByPrice(price)

// 5. getTopRatedFoodTrucks()

// 6. getFoodTrucksSortedByRating()

// 7. getFoodTrucksSortedByPrice()

// 8. getFoodTrucksCount()

// 9. addOneFoodTruck(name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
async function addOneFoodTruck(
  name,
  current_location,
  daily_special,
  slogan,
  has_vegan_options,
  price_level,
  rating,
) {
  const result = await db.query(
    `INSERT INTO food_trucks
     (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      current_location,
      daily_special,
      slogan,
      has_vegan_options,
      price_level,
      rating,
    ],
  );

  return result.rows[0];
}

// 10. deleteOneFoodTruck(id)

async function deleteOneFoodTruck(id) {

    const truckData = await db.query(
        `SELECT name FROM food_trucks WHERE id = $1`, [id]
    );

    if (truckData.rows.length === 0) {
        return `No animal found with id ${id}`;
    }

    const animalName = animalData.rows[0].name;

    await db.query(
        `DELETE FROM animals WHERE id = $1`, [id]
    );

    console.log(`Success! ${animalName} was deleted!`);

    return `Success! ${animalName} was deleted!`;

};

// 11. updateFoodTruckLocation(id, newLocation)

// 12. updateFoodTruckRating(id, newRating)

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id

// 3. GET /get-vegan-food-trucks

// 4. GET /get-food-trucks-by-price/:price

// 5. GET /get-top-rated-food-trucks

// 6. GET /get-food-trucks-sorted-by-rating

// 7. GET /get-food-trucks-sorted-by-price

// 8. GET /get-food-trucks-count

// 9. POST /add-one-food-truck
app.post("/add-one-food-truck", async (req, res) => {
  const {
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  } = req.body;

  const truck = await addOneFoodTruck(
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  );

  res.send(`Success! ${truck.name} was added!`);
});

// 10. POST /delete-one-food-truck/:id

// Priscilla's Code

app.get("/delete-one-food-truck/:id", async (req, res) => {
  
  let truckId = await db.query(`SELECT id FROM food_trucks WHERE id = $1`, [id]);

  if (truckId.rows.length === 0) {
    return `No truck found with id of ${id}`
  }

  const truckName = truckData.rows[0].name;
  
  await db.query(`DELETE FROM food_trucks WHERE id = $1`, [id]);

  console.log(`Success! Truck #${id}, ${truckName} was deleted ✨`);

  return `Success! Truck #${id}, ${truckName} was deleted ✨`;

});

// 11. POST /update-food-truck-location

// 12. POST /update-food-truck-rating

