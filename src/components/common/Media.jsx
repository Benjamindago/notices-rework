import React from 'react';

function Youtube({ id, children }) {
  return (
    <div className="block-video-yt">
      {children}
      <iframe title={id} src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  );
}

function Image({ src }) {
  return (
    <figure>
      <img src={`/img/${src}`} alt="" />
    </figure>
  );
}

function Media({ content }) {
  const { id, src } = content;
  if (id) return <Youtube id={id} />;
  if (src) return <Image src={src} />;
  return null;
}

export default Media;
