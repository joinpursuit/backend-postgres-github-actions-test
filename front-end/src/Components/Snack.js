import HeartHealth from "./HeartHealth";

function Snack({ snack }) {
  const { id, image, name, is_healthy } = snack;
  return (
    <div className="Snack">
      <a href={`/snacks/${id}`}>
        <img src={image} alt={name} />
        <h4>
          <span>
            <HeartHealth snackHealth={is_healthy} />
          </span>
          {name}
        </h4>
      </a>
    </div>
  );
}

export default Snack;
