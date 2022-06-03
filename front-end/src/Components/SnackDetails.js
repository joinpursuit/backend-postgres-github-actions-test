import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import HeartHealth from "./HeartHealth";
import api from "../api";

function SnackDetails() {
  const [snack, setSnack] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function setSnackOrNavigateAway() {
      try {
        const response = await api.snacks.getOne(id);
        if (!response) {
          throw new Error(`No Snack with ID of ${id}.`);
        }
        setSnack(response);
      } catch (error) {
        console.error(error);
        navigate("/not-found");
      }
    }

    setSnackOrNavigateAway();
  }, [id, navigate]);

  const deleteSnack = async () => {
    try {
      await api.snacks.destroy(id);
      navigate("/snacks");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    deleteSnack();
  };

  const { name, image, fiber, protein, added_sugar, is_healthy } = snack;

  return (
    <section>
      <article>
        <aside>
          <h4>this snack is {is_healthy ? null : <span>un</span>}healthy</h4>
          <HeartHealth snackHealth={is_healthy} />
        </aside>
        <div>
          <h5>{name}</h5>
          <img src={image} alt={name} />
          <h6>Protein: {protein}</h6>
          <h6>Fiber: {fiber}</h6>
          <h6>Added Sugar: {added_sugar}</h6>
        </div>
        <div className="showNavigation">
          <div>
            <Link to="/snacks">
              <button>Back</button>
            </Link>
          </div>
          <Link id="edit-button" to={`/snacks/${id}/edit`}>
            <button>edit</button>
          </Link>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default SnackDetails;
