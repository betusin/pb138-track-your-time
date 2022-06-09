import { Link } from "react-router-dom";

export const NoPath = () => {
  return (
    <>
      <div className="m1">
        Trying to find something? Try links in navigation bar.
      </div>
      <div className="m1">
        At <Link to="/">Home</Link> you can find your projects.
      </div>
    </>
  );
};
