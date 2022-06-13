import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

export const NoPath = () => {
  return (
    <>
      <div className="m1">
        <Trans i18nKey="error.not_found" />
      </div>
      <div className="m1">
        At <Link to="/">Home</Link> you can find your projects.
      </div>
    </>
  );
};
