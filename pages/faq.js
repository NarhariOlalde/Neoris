import React from "react";

const Faq = () => {
  return (
    <><h1 className='faq'>FAQ</h1>
        <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3 className="question">Question 1</h3>
        <p className="answer">Answer to question 1...</p>
      </div>
      <div className="faq-item">
        <h3 className="question">Question 2</h3>
        <p className="answer">Answer to question 2...</p>
      </div>
      <div className="faq-item">
        <h3 className="question">Question 3</h3>
        <p className="answer">Answer to question 3...</p>
      </div>
    </div>
    </>
  );
};

export default Faq;