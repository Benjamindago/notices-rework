import React from 'react';

function Youtube({ id, children }) {
  return (
    <div className="block-video-yt">
      {children}
      <iframe title={id} src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
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

function Media({ index, content }) {
  const { id, src, small, gray } = content;
  const color = gray ? 'color-anthracite' : 'bg-white';
  const flip = (index % 2 === 0) ? 'col-xl-push-12 col-m-push-0' : null;
  let media = null;
  if (id) media = <Youtube id={id} />;
  else if (src) media = <Image small={small || gray} src={src} />;
  return (
    <section className={`col col-xl-12 col-m-24 block-info-cursor row ${color} ${flip}`}>
      {media}
    </section>
  );
}

export default Media;
