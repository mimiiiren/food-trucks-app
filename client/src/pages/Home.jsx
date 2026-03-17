import "../App.css";
import { useState, useEffect } from "react";
function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [count, setCount] = useState();
  const getAllFoodTrucks = async () => {
    try {
      const response = await fetch("/api/get-all-food-trucks", {
        method: "GET",
      });
      const data = await response.json();
      setFoodTrucks(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllFoodTrucks();
  }, []);
  const getFoodTrucksCount = async () => {
    try {
      const response = await fetch("/api/get-food-trucks-count", {
        method: "GET",
      });
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoodTrucksCount();
  }, []);

  // post request to delete food truck by id
  const deleteOneFoodTruck = async (id) => {
    try {
      const response = await fetch(`/api/delete-one-food-truck/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.text();
      getAllFoodTrucks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>All Food Trucks</h1>
      <h4>Total number of food trucks: {count}</h4>
      <div className="card_container">
        {foodTrucks.map((truck) => {
          const {
            name,
            id,
            current_location,
            daily_special,
            slogan,
            has_vegan_options,
            price_level,
            rating,
          } = truck;
          return (
            <div className="card" key={id}>
              <h3>{name}</h3>
              <p>
                <b>Id: </b>
                {id}
              </p>
              <p>
                <b>Location: </b>
                {current_location}
              </p>
              <p>
                <b>Daily Special: </b>
                {daily_special}
              </p>
              <p>
                <b>Slogan: </b>
                {slogan}
              </p>
              <p>
                <b>Has Vegan Options:</b>
                {has_vegan_options === "yes" ? " Yes ✅" : " No ❌"}
              </p>
              <p>
                <b>Price Level: </b>
                {price_level}
              </p>
              <p>
                <b>Rating: </b>
                {rating}
              </p>
              <button onClick={() => deleteOneFoodTruck(id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
