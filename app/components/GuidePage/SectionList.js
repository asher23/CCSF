import React from 'react';
import Section from './Section';

export default function SectionList({ sections }) {
  return (
    <>
      {sections.map((section, idx) => {
        return <Section section={section} secIndex={idx} />;
      })}
    </>
  );
}
