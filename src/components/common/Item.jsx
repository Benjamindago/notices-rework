import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Text({ content, italic, frame, warning, bold }) {
  const { t } = useTranslation();
  if (!content) return null;
  const classes = [];
  if (italic) classes.push('italic');
  if (bold) classes.push('bold');
  if (frame) classes.push('bg-orange text-white col-space');
  if (warning) classes.push('text-red');
  return <p className={classes.join(' ')}>{t(content)}</p>;
}

function PreTitle({ content }) {
  const { t } = useTranslation();
  if (!content) return null;
  return <h3 className="title tleft">{t(content)}</h3>;
}

function Title({ content }) {
  const { t } = useTranslation();
  if (!content) return null;
  return <p className="big-title">{t(content)}</p>;
}

function List({ content }) {
  const { t } = useTranslation();
  if (!content) return null;
  return (
    <ul className="list-classic tleft-child">
      {content.map((i, k) => <li key={k}><p>{typeof i == "string" ? t(i) : <Item key={k} content={i} />}</p></li>)}
    </ul>
  );
}

function Frame({ content }) {
  if (!content) return null;
  return (
    <div className='bg-orange text-white col-space tleft-child'>
      {content.map((i, k) => <Item key={k} content={i} />)}
    </div>
  );
}

function Button({ text, color, to, href, download, label, position }) {
  const { t } = useTranslation();
  if (!to && !href) return null;

  const getClasses = (color) => {
    const classes = {
      'white': 'new-btn btn-classic btn-grey btn-wide',
      'orange': 'new-btn btn-valid btn-wide',
      'default': 'link-classic'
    }
    return classes[color] || classes['default']
  }

  const getPosition = (position) => {
    const classes = {
      'left': 'tleft',
      'center': 'tcenter',
      'right': 'tright',
      'default': 'tleft'
    }
    return classes[position] || classes['default']
  }

  const pre = (text) ? `${t(text)} ` : null;
  const post = (text) ? '.' : null;
  const link = (to) ? <Link to={to} className={getClasses(color)} download={download}>{t(label)}</Link> : <a href={href} className={getClasses(color)} download={download} target='_blank' rel='noopener noreferrer'>{t(label)}</a>;
  return (
    <p className={getPosition(position)}>
      {pre}{link}{post}
    </p>
  );
}

Button.defaultProps = {
  label: 'ici'
}

function Container({ content }) {
  if (!content) return null;
  return (
    <div className="col-xl-10 col-xl-offset-7 col-s-10 col-s-offset-7 margin-bottom-shop">
      {content.map((i, k) => <Item key={k} content={i} />)}
    </div>
  )
}

Button.defaultProps = {
  label: 'ici'
}

function Item({ content }) {
  const [k, v] = Object.entries(content)[0];
  switch (k) {
    case 'container':
      return <Container content={v} />
    case 'pretitle':
      return <PreTitle content={v} />;
    case 'title':
      return <Title content={v} />;
    case 'text':
      return <Text content={v} />;
    case 'bold':
      return <Text content={v} bold />
    case 'italic':
      return <Text content={v} italic />;
    case 'frame':
      if (typeof v == "string") return <Text content={v} frame />;
      return <Frame content={v} />;
    case 'warning':
      return <Text content={v} warning />;
    case 'list':
      return <List content={v} />;
    case 'button':
      return <Button text={v.text} color={v.color} to={v.to} href={v.href} download={v.download} label={v.label} position={v.position} />;
    default:
      return null;
  }
}

export default Item;
