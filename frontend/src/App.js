import React, { useState } from "react";
import "./styles.css";
import WelcomeScreen from "./WelcomeScreen";
import Survey from "./Survey";
import ThankYou from "./ThankYou";

function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <div>
      {screen === "welcome" && (
        <WelcomeScreen start={() => setScreen("survey")} />
      )}

      {screen === "survey" && (
        <Survey finish={() => setScreen("thankyou")} />
      )}

      {screen === "thankyou" && (
        <ThankYou restart={() => setScreen("welcome")} />
      )}
    </div>
  );
}

export default App;