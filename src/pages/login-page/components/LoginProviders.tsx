import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useFirebaseAuth } from "../../../hooks";

const LoginProviders = () => {
  const { loginWithGoogle, loginWithFacebook } = useFirebaseAuth();

  return (
    <div className="login-providers">
      <h3>Or Sign in Using</h3>
      <div className="buttons">
        <div className="icon google-icon">
          <FcGoogle size={45} onClick={loginWithGoogle} />
        </div>
        <div className="icon facebook-icon">
          <FaFacebook size={45} onClick={loginWithFacebook} />
        </div>
      </div>
    </div>
  );
};

export { LoginProviders };
