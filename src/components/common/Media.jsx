import React from 'react';
import { Col } from 'react-bootstrap';
import './Media.css';

function Youtube({ id, children }) {
  return (
    <div className="block-video-yt">
      {children}
      <iframe
        title={id}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Image({ small, src }) {
  const classes = small ? 'notice-small-img' : null;
  return (
    <figure className={classes}>
      <img src={`/img/${src}`} alt="" />
    </figure>
  );
}

function Media({ content, position }) {
  const { id, src, small, color } = content;

  const c = `bg-${color || 'white'}`;
  let media = null;
  if (id) media = <Youtube id={id} />;
  else if (src) media = <Image small={small || color === 'anthracite'} src={src} />;
  return <Col className={`media-arrow media-arrow-${position} col-xl-6 ${c} px-0`}>{media}</Col>;
}

export default Media;
