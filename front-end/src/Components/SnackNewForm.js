import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

function SnackNewForm() {
  let navigate = useNavigate();

  const addSnack = async (newSnack) => {
    const snack = await api.snacks.create(newSnack);
    navigate(`/snacks/${snack.id}`);
  };

  const [snack, setSnack] = useState({
    name: "",
    image: "",
    protein: 0,
    added_sugar: 0,
    fiber: 0,
    is_healthy: true,
  });

  const handleTextChange = (event) => {
    setSnack({
      ...snack,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSnack(snack);
  };

  const { name, image, fiber, protein, added_sugar } = snack;

  return (
    <section className="New">
      <aside>
        <div>
          <p>Snack Health is determined by</p>
          <ul>
            <li>protein is above 5</li>
            <li>or fiber is above 5</li>
            <li>and sugar is less than 5</li>
          </ul>
        </div>
      </aside>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          type="text"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="text"
          value={image}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="fiber">Fiber:</label>
        <input
          id="fiber"
          type="number"
          min="0"
          step="1"
          name="fiber"
          value={fiber}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />
        <label htmlFor="protein">Protein:</label>
        <input
          id="protein"
          type="number"
          name="protein"
          value={protein}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />
        <label htmlFor="added_sugar">Added Sugar:</label>
        <input
          id="added_sugar"
          type="number"
          name="added_sugar"
          value={added_sugar}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />

        <br />
        <input type="submit" />
      </form>
    </section>
  );
}

export default SnackNewForm;
