"use client";

import { useState } from "react";
import { faqItems } from "@/lib/festival-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="faq" id="faq">
      <div className="section-head">
        <h2>Preguntas frecuentes</h2>
        <span className="date">Todo lo que debes saber</span>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className={isOpen ? "faq-item open" : "faq-item"}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
