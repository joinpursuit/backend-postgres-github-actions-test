import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import HeartHealth from "./HeartHealth";

const API = process.env.REACT_APP_API_URL;

function SnackDetails() {
  const [snack, setSnack] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/snacks/${id}`).then(
      (response) => {
        setSnack(response.data.payload);
      },
      (error) => navigate(`/not-found`)
    );
  }, [id, API]);

  const deleteSnack = () => {
    axios
      .delete(`${API}/snacks/${id}`)
      .then(
        () => {
          navigate(`/snacks`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
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
