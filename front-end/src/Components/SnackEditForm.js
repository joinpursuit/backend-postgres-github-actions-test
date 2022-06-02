import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api";

function SnackEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [snack, setSnack] = useState({
    name: "",
    image: "",
    protein: 0,
    added_sugar: 0,
    fiber: 0,
    is_healthy: true,
  });

  const updateSnack = async (id, body) => {
    try {
      await api.snacks.update(id, body);
      navigate(`/snacks/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api.snacks.getOne(id).then(setSnack);
  }, [id]);

  const handleTextChange = (event) => {
    setSnack({
      ...snack,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSnack(id, snack);
  };

  return (
    <section className="Edit">
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
          value={snack.name}
          type="text"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="text"
          value={snack.image}
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
          value={snack.fiber}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />
        <label htmlFor="protein">Protein:</label>
        <input
          id="protein"
          type="number"
          name="protein"
          value={snack.protein}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />
        <label htmlFor="added_sugar">Added Sugar:</label>
        <input
          id="added_sugar"
          type="number"
          name="added_sugar"
          value={snack.added_sugar}
          placeholder="in grams, integers only"
          onChange={handleTextChange}
        />

        <br />
        <input type="submit" />
      </form>
    </section>
  );
}

export default SnackEditForm;
