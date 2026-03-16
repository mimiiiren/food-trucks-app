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

  // We've passed in an id value from the url which we use to query the server which then loads the data into the 'truckName' variable. This lets me create a more user-centric result.
  // '$1' is a dynamic value loaded with the value of the first item in our array, [id].
    const truckName = await db.query(
        `SELECT name FROM food_trucks WHERE id = $1`, [id]
    );

  // Small error handling in case the truck has either already been deleted or did not exist in the first place.
    if (truckName.rows.length === 0) {
        return `No truck found with id ${id}, or name ${truckName}`;
    }

  // This runs only once when we run the function and is the main line of code that actually carries out the deletion of the food truck.
    await db.query(
        `DELETE FROM food_trucks WHERE id = $1`, [id]
  );
  
  const name = truckName.rows[0].name;

  // Both the console log and the return are merely there to return a confirmation to the user and us. 
    console.log(`Success! Food truck #${id}, ${name} was deleted!`);

    return `Success! Food truck #${id}, ${name} was deleted!`;

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

app.post('/delete-one-food-truck/:id', async (req, res) => {

    try {

      // Creates a variable from the ':id' entered in the url.
        let id = req.params.id;

      // Here, a reply will 
        const result = await deleteOneFoodTruck(id);

        res.send(result);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'There was an issue while deleting the food truck. Please review your request and try again'
        })
    }

});
// 11. POST /update-food-truck-location

// 12. POST /update-food-truck-rating

