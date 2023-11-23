
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUrlPosition } from "../hooks/useUrlPosition";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "./Form.module.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [isLoadingGeoCoding, setisLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(function() {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setisLoadingGeoCoding(true);
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);

        if(!data.countryCode) 
          throw new Error("Isso não parece ser uma cidade.");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      }
      catch(err) {
        console.log(err);
        setGeoCodingError(err.message);
      }
      finally {
        setisLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if(isLoadingGeoCoding) return <Spinner />

  if(geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <ButtonBack />
        <Button type="primary">Add</Button>
      </div>
    </form>
  );
}

export default Form;
