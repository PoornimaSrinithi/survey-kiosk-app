function WelcomeScreen({ start }) {
  return (
    <div className="container">
      <h1>We’d love your feedback</h1>
<p>This will only take a minute</p>

      <button className="primary big-btn" onClick={start}>
        Start
      </button>
    </div>
  );
}

export default WelcomeScreen;