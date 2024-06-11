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
        question: 'What is the NEORIS Data & AI Lab?',
        answer: 'The NEORIS Data & AI Lab accelerates the transformation of organizations by focusing on areas where artificial intelligence has a more differential and large-scale impact, making rational and responsible use of data.'
    },
    {
        question: 'How does NEORIS facilitate Business Translation?',
        answer: 'NEORIS identifies improvement opportunities by acting as a bridge between business units and analytical teams.'
    },
    {
        question: 'What services does NEORIS offer in the Engineering and Development area?',
        answer: 'NEORIS deploys artificial intelligence solutions, integrates them into applications, and ensures their ongoing maintenance.'
    },
    {
        question: 'What is the NEORIS Knowledge Discovery Platform (KDP)?',
        answer: 'The KDP is an intelligent document processing platform that uses AI techniques like deep learning, natural language processing, computer vision, and semantic understanding to digitize complex documents in seconds.'
    },
    {
        question: 'What are some use cases for the NEORIS KDP?',
        answer: 'The KDP is used in cases such as balance sheets, financial statements, policies, contracts, forms, mortgages, and real estate.'
    },
    {
        question: 'How does NEORIS transform the customer and employee experience?',
        answer: 'NEORIS digitizes the customer experience across all channels, creates digital products, provides real-time digital insights, and measures the digital journey across the value chain.'
    },
    {
        question: 'What is NEORIS Digital Enablement?',
        answer: 'NEORIS Digital Enablement transforms the customer and employee experience end-to-end, creating digital products, insights, and optimizing operations for real-time decision-making.'
    },
    {
        question: 'What services are included in NEORIS Big Data & Analytics, AI & Data Science?',
        answer: 'Services include data strategy, data architecture, data engineering, data science, data visualization, and AI & machine learning knowledge discovery.'
    },
    {
        question: 'What is NEORIS Digital Product Development?',
        answer: 'NEORIS Digital Product Development includes creating digital platforms and products, transforming client software platforms into digital ecosystems, and integrating APIs.'
    },
    {
        question: 'What does NEORIS Quality Engineering encompass?',
        answer: 'NEORIS Quality Engineering offers testing consultancy, digital testing, automated testing, performance testing, traditional testing, and specialized testing.'
    },
    {
        question: 'What is NEORIS User Experience (UX) Design?',
        answer: 'NEORIS UX Design involves user research, interface design workflows, usability testing, customer research, and product design from inception to launch.'
    },
    {
        question: 'What services does NEORIS offer in Cloud, Integration, Digital & Enterprise Architecture?',
        answer: 'Services include digital platform architecture, cloud architecture, digital integration & API management, and enterprise architecture & IT consulting.'
    },
    {
        question: 'What is NEORIS Operations Transformation?',
        answer: 'NEORIS Operations Transformation helps clients optimize processes, design lean operating models, implement intelligent process automation, and manage transformation programs.'
    },
    {
        question: 'What is included in NEORIS Run & Operate services?',
        answer: 'Run & Operate services include applications and infrastructure support, digital observability, IT transformation, and value-added reseller (VAR) services for SAP ERPs.'
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
