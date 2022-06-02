import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import HeartHealth from "./HeartHealth";
import api from "../api";

function SnackDetails() {
  const [snack, setSnack] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    api.snacks.getOne(id).then(setSnack);
  }, [id]);

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

  return (
    <section>
      <article>
        <aside>
          {" "}
          <h4>
            this snack is {snack.is_healthy ? null : <span>un</span>}healthy
          </h4>
          <HeartHealth snackHealth={snack.is_healthy} />
        </aside>
        <div>
          <h5>{snack.name}</h5>
          <img src={snack.image} alt={snack.name} />
          <h6>Protein: {snack.protein}</h6>
          <h6>Fiber: {snack.fiber}</h6>
          <h6>Added Sugar: {snack.added_sugar}</h6>
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
