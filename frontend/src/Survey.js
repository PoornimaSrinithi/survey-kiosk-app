import React, { useState } from "react";

const questions = [
  { id: 1, text: "How satisfied are you with our products?", type: "rating", scale: 5 },
  { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", scale: 5 },
  { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", scale: 5 },
  { id: 4, text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", scale: 10 },
  { id: 5, text: "What could we do to improve our service?", type: "text" }
];

const WORD_LIMIT = 100;

function Survey({ finish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [sessionId] = useState(
    "session_" + Date.now() + "_" + Math.floor(Math.random() * 1000)
  );

  const q = questions[current];

  const handleAnswer = (value) => {
    if (q.type === "text") {
      const words = value.trim().split(/\s+/).filter(Boolean);

      if (words.length > WORD_LIMIT) {
        setError(`Maximum ${WORD_LIMIT} words allowed`);
        return;
      }
    }

    setAnswers((prev) => ({
      ...prev,
      [q.id]: value
    }));

    setError("");
  };

  const next = () => {
    const answer = answers[q.id];

    if (
      !answer ||
      (q.type === "text" && typeof answer === "string" && answer.trim() === "")
    ) {
      if (q.type === "text") {
        setError("Please write an answer");
      } else {
        setError("Please select an option");
      }
      return;
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      if (window.confirm("Submit survey?")) {
        submit();
      }
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const skip = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  //  FINAL SUBMIT (Backend + Fallback)
  const submit = async () => {
    const formattedAnswers = Object.keys(answers).map((key) => ({
      questionId: Number(key),
      answer: answers[key]
    }));

    const data = {
      sessionId,
      status: "COMPLETED",
      answers: formattedAnswers
    };

    try {
      // 🔹 Try backend
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Backend not available");
      }

      const result = await response.json();
      console.log("Saved to backend:", result);

    } catch (error) {
      // 
      console.log("Fallback to localStorage");

      const existing = JSON.parse(localStorage.getItem("surveys")) || [];
      existing.push(data);
      localStorage.setItem("surveys", JSON.stringify(existing));

      alert("Saved locally (demo mode)");
    }

    finish();
  };

  const wordCount =
    q.type === "text"
      ? (answers[q.id]?.trim().split(/\s+/).filter(Boolean).length || 0)
      : 0;

  return (
    <div className="container">

      <div className="progress">
        {current + 1} / {questions.length}
      </div>

      <h2>{q.text}</h2>

      <p style={{ fontSize: "13px", color: "#64748b" }}>
        {q.type === "rating"
          ? "Tap a number that best reflects your experience"
          : "Feel free to be honest — your feedback helps us improve"}
      </p>

      {/* Rating */}
      {q.type === "rating" && (
        <div className="rating">
          {[...Array(q.scale)].map((_, i) => (
            <button
              key={i}
              className={`rating-btn ${
                Number(answers[q.id]) === i + 1 ? "active" : ""
              }`}
              onClick={() => handleAnswer(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Text */}
      {q.type === "text" && (
        <>
          <input
            placeholder="Type your answer..."
            value={answers[q.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
          />

          <div className="word-count">
            {wordCount} / {WORD_LIMIT} words
          </div>
        </>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Buttons */}
      <div className="buttons">
        <button onClick={prev} disabled={current === 0}>
          Back
        </button>

        <button onClick={skip} disabled={current === questions.length - 1}>
          Skip
        </button>

        <button className="primary" onClick={next}>
          {current === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>

    </div>
  );
}

export default Survey;