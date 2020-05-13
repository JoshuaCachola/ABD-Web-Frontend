import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { apiBaseUrl } from "../config";

const CreateSkateSpot = (props) => {
  const history = useHistory();
  const [name, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCityName] = useState("");
  const [state, setStateName] = useState("");
  const [imgPath, setImgPath] = useState("");

  const handleSpotName = e => setSpotName(e.target.value);
  const handleCityName = e => setCityName(e.target.value);
  const handleStateName = e => setStateName(e.target.value);
  const handleAddress = e => setAddress(e.target.value);
  const handleImgFileInput = e => {
    setImgPath(e.target.files[0]);
  }

  const createSpot = async e => {
    e.preventDefault();
    try {

      const body = new FormData();
      body.append("image", imgPath);
      let res = await fetch(`${apiBaseUrl}/skatespots/upload`, {
        method: "POST",
        body
      });

      if (!res.ok) throw res;

      const { imageUrl } = await res.json();

      res = await fetch(`${apiBaseUrl}/skatespots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
        },
        body: JSON.stringify({
          name,
          city,
          state,
          address,
          imgs: [imageUrl]
        }),
      });

      if (!res.ok) throw res;

      history.push("/skatespots")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="skate-spots__create-form">
      <form onSubmit={createSpot}>
        <label>Skate Spot Name</label>
        <input
          type="text"
          name={name}
          onChange={handleSpotName}
          placeholder="Name of spot"
        />
        <label>City</label>
        <input
          type="text"
          name={city}
          onChange={handleCityName}
          placeholder="City"
        />
        <label>State</label>
        <input
          type="text"
          name={state}
          onChange={handleStateName}
          placeholder="State"
        />
        <label>Address</label>
        <input
          type="text"
          name={address}
          onChange={handleAddress}
          placeholder="Address of spot"
        />
        {/* Change to a drag and drop */}
        <label>Image of Spot</label>
        <input
          type="file"
          name={imgPath}
          onChange={handleImgFileInput}
        />
        <button type="submit">Share Spot</button>
      </form>
    </div>
  );
};

export default CreateSkateSpot;
