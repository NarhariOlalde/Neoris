import React from "react";
import FaqAccordion from "../components/faqAccordion/faqAccordion";
import { Margin } from "@mui/icons-material";

const Faq = () => {
  return (
    <><h1 className='faq'>FAQ</h1>
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div style={{
        justifyContent:  'center',
        alignItems: 'center',
        marginTop : '20px',
        flexDirection: 'flex'

      }}>
        <FaqAccordion />
      </div>
    </div>
    
        
    </>
  );
};

export default Faq;
