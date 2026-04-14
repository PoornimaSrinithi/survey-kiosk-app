function Responses({ goBack }) {
  const data = JSON.parse(localStorage.getItem("surveys")) || [];

  return (
    <div className="container">
      <h2>Submitted Responses</h2>

      {data.length === 0 && <p>No responses yet</p>}

      {data.map((item, index) => (
        <div key={index} style={{ textAlign: "left", marginBottom: "20px" }}>
          <p><strong>Session:</strong> {item.sessionId}</p>

          {item.answers.map((ans, i) => (
            <p key={i}>
              Q{ans.questionId}: {ans.answer}
            </p>
          ))}

          <hr />
        </div>
      ))}

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Responses;