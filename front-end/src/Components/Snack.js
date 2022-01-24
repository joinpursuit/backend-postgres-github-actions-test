import HeartHealth from "./HeartHealth";

function Snack({ snack }) {
  return (
    <div className="Snack">
      <a href={`/snacks/${snack.id}`}>
        <img src={snack.image} alt={snack.name} />
        <h4>
          <span>
            <HeartHealth snackHealth={snack.is_healthy} />
          </span>
          {snack.name}
        </h4>
      </a>
    </div>
  );
}

export default Snack;
