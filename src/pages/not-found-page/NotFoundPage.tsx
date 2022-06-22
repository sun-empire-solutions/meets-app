import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/start");
  };

  return (
    <section className="not-found-page">
      <h1 className="code">404</h1>
      <div className="message">
        <div className="title">UH OH! You're lost.</div>
        <div className="subtitle">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </div>
      </div>
      <div className="home-button" onClick={goHome}>
        Home
      </div>
    </section>
  );
};

export { NotFoundPage };
