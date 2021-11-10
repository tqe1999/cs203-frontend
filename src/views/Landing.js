import { Link } from "react-router-dom";
import "../assets/css/Landing.css";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth.js";

function Landing() {
  return (
    <div className="landing">
      <div className="landing-box">
        <div className="landing-innerbox">
          <h1>Covfeed</h1>
          <p>A smoother transition to a new normal</p>
          <Spacer space="5" />
          <div>
            <Link
              class="button"
              to="/regular"
              onClick={(e) => AmplifyAuth.federatedSignIn()}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spacer(props) {
  const mystyle = {
    width: "100%",
    padding: props.space + "px",
  };

  return <div style={mystyle}></div>;
}

export default Landing;
