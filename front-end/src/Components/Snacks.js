import { useState, useEffect } from "react";

import Snack from "./Snack";
import api from "../api";

function Snacks() {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    api.snacks.getAll().then(setSnacks);
  }, []);

  const snackElements = snacks.map((snack) => {
    return <Snack key={snack.id} snack={snack} />;
  });

  return (
    <section className="Snacks">
      <article>{snackElements}</article>
    </section>
  );
}

export default Snacks;
