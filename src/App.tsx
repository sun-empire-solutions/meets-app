// @ts-ignore
import logo from "./assets/images/logo-react.png";

const App = () => {
  return (
    <div className="react-container">
      <div className="react-logo">
        <img className="rotate" src={logo} alt="" />
      </div>
      <div className="react-container__content">
        <h3>Edit src/App.tsx and save to reload</h3>
      </div>
      <div className="react-container__footer">
        <a href="https://reactjs.org/docs/getting-started.html">Learn React</a>
      </div>
    </div>
  );
};
export { App };
