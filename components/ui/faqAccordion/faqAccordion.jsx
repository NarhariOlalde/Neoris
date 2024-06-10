import { useState } from 'react';

const FaqAccordion = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleOpen = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqContainerStyle = {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
    maxWidth: '37.5rem',
    padding: '2rem',
    borderRadius: '1em',
    backgroundColor: '#060D23',
  };

  const detailsStyle = {
    fontSize: '1rem',
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    position: 'relative',
    maxWidth: '37.5rem',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    backgroundColor: '#060D23',
  };

  const summaryStyle = {
    userSelect: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    listStyle: 'none',
    padding: '1rem',
    alignItems: 'center',
    color: '#FFF',
  };

  const faqTitleStyle = {
    color: '#FFF',
    width: '90%',
    transition: 'all 1000ms ease-in-out',
  };

  const faqContentStyle = {
    color: '#FFF',
    padding: '0.2rem 1rem 1rem 1rem',
    fontWeight: '300',
    lineHeight: '1.5',
  };

  const expandIconStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    right: '1rem',
    transition: 'all 150ms ease-out',
    stroke: '#FFF',
  };

  const rotateIconStyle = {
    transform: 'rotate(90deg)',
  };

  const faqs = [
    {
      question: 'How long does the course take?',
      answer:
        'The video content takes more than 4.5 hours. In addition, you can test gained knowledge on 30 quizzes and practical tasks.',
    },
    {
      question: 'Who teaches courses on Atheros Learning?',
      answer:
        'The authors of the courses are mostly Atheros team members, who worked on tens of digital solutions for big international companies, projects for small startups, and internal Atheros products. By solving the most sophisticated problems in the fields, they gained proper knowledge, which is now available for you.',
    },
    {
      question: 'How is the course different from other UX/UI design courses?',
      answer:
        'The key aspect is that this course provides a clear overview of the whole design process and principles, that represent necessary information for being successful within the industry. You will also get direct support from the author of this course, who is ready to answer all your questions and care about your next steps.',
    },
    {
      question: 'Do I get a certificate after completing a course?',
      answer:
        'Yes, after successfully finishing the quizzes within the course, you can download a certificate, proving all gained knowledge and skills.',
    },
    {
      question: 'Are there any hidden fees within the course?',
      answer:
        'Absolutely not! You will gain all benefits and features with the one-time payment, unlocking the course.',
    },
  ];

  return (
    <div style={faqContainerStyle}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={detailsStyle}
        >
          <summary
            style={summaryStyle}
            onClick={() => toggleOpen(index)}
          >
            <span style={faqTitleStyle}>{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="expandIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                ...expandIconStyle,
                ...(openIndexes.includes(index) ? rotateIconStyle : {}),
              }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </summary>
          {openIndexes.includes(index) && (
            <div
              className="faqContent"
              style={faqContentStyle}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
