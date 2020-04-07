import React from 'react';

import './styles.css';

export default function Introduction(props) {
  return (
    <div className="introduction-content">
      <h1>{props.title}</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. In at
        pariatur hic, quam alias voluptas quod quasi illo ipsam ea
        repudiandae inventore ab vitae facilis rem corporis doloribus
        distinctio iusto..
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        autem, officiis, veritatis dolor officia voluptatum magnam explicabo
        vel fugit ut voluptates tempore inventore quos voluptatibus iusto
        fugiat eos quaerat laudantium.
      </p>
    </div>
  );
}
