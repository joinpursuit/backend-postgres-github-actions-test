import axios from "axios";
import { useState, useEffect } from "react";

import Snack from "./Snack";

const API = process.env.REACT_APP_API_URL;

function Snacks() {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/snacks`)
      .then(
        (response) => {
          setSnacks(response.data.payload);
        },

        (error) => console.log("get", error)
      )
      .catch((c) => console.warn("catch", c));
  }, []);
  return (
    <section className="Snacks">
      <article>
        {snacks.map((snack) => {
          return <Snack key={snack.id} snack={snack} />;
        })}
      </article>
    </section>
  );
}

export default Snacks;
