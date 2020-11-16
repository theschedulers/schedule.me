import React from 'react';
import './BlogCard.css';

export default function blogCard(props) {
  return (
    <div className="card__css" value={props.index}>
      <p>
        <strong>{props.title}</strong>
      </p>
      <p>{props.body}</p>
    </div>
  );
}