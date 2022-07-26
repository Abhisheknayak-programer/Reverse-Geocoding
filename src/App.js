import React, { useState } from "react";
import L from "../node_modules/leaflet/";
import Button from "./components/UI/Buttons";
import Map from "./components/Map/Map";
import AppStyles from "./App.module.css";

const App = () => {
  const [fetchBtnValidity, setFetchBtnValidity] = useState(false);

  // GET THE COORDS
  const getCoords = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // GET THE LOCATION DETAILS
  const checkLocationDetails = async (lat, lng) => {
    const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
    const geoResponse = await fetch(url);
    const data = await geoResponse.json();
    console.log(data);
  };

  // LEAFLEFT API
  const LeafletMapShow = (lat, lng) => {
    let map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("Abhishek Nayak Location")
      .openPopup();
  };

  // BUTTON CLICK HANDLER
  const GetGeoCoordsHandler = async () => {
    setFetchBtnValidity(true);
    const geo_position = await getCoords();
    const latitude = geo_position.coords.latitude;
    const longitude = geo_position.coords.longitude;
    checkLocationDetails(latitude, longitude);
    LeafletMapShow(latitude, longitude);
  };

  return (
    <main className={AppStyles.mainSection}>
      {!fetchBtnValidity && (
        <section className={AppStyles.first_Section}>
          <Button onClick={GetGeoCoordsHandler}>Fetch Your Location</Button>
        </section>
      )}
      <Map />
    </main>
  );
};

export default App;
