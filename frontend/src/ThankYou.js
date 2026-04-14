import { useEffect } from "react";

function ThankYou({ restart }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      restart();
    }, 5000);

    return () => clearTimeout(timer);
  }, [restart]);

  return (
    <div className="container">
      <div className="card">
        <h1>Thank You 🙌</h1>
        <p>We appreciate your feedback</p>
        <p style={{ fontSize: "13px", color: "#64748b" }}>
  Your responses are recorded anonymously
</p>
      </div>
    </div>
  );
}

export default ThankYou;