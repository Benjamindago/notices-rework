import React, { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Banner from '../components/common/Banner';
import Block from '../components/common/Block';
import NavBar from '../components/common/NavBar';
import NotFound from '../components/common/NotFound';
import Ribbon from '../components/common/Ribbon';

function Blocks({ content }) {
  if (!content) return null;
  return content.map((i, k) => <Block key={k} index={k} content={i} />);
}

function Page() {
  const [content, setContent] = useState();
  const match = useRouteMatch();
  console.log(match);

  let step = match.params.step;
  let active = step ? parseInt(step) || parseInt(step.replace(/^\D+-/g, '')) - 1 : 0;;

  let resource;
  let nav;
  if (match.url.includes('cura-by-dagoma')) {
    resource = '/content/cura-by-dagoma/index.json';
    switch (match.params.printer) {
      case 'magis':
        active = 5;
        break;
      case 'de200':
        active = 13;
        break;
      case 'du':
        active = 12;
        break;
      default:
        active = 0;
    }

  } else if (match.url.includes('firmware')) {
    resource = '/content/firmware/index.json';
  } else if (match.url.includes('calibration')) {
    resource = '/content/calibration/index.json';
  } else if (match.url.includes('box')) {
    resource = `/content/box/${match.params.printer}/${match.params.step || '0'}.json`;
    if (match.params.printer.includes('magis')) nav = 'box';
  } else if (match.url.includes('addon/xl/du')) {
    resource = `/content/printer/du/xl/${match.params.step || '0'}.json`;
    nav = 'xl/du';
  } else if (match.url.includes('addon/bicolor/du')) {
    resource = `/content/printer/du/bicolor/${match.params.step || '0'}.json`;
    nav = 'bicolor/du';
  } else {
    resource = `/content/${match.params.product}/${match.params.ref}/${match.params.step || '0'}.json`;
  }


  useEffect(() => {
    fetch(resource)
      .then(response => response.json())
      .then(data => { setContent(data); })
      .catch(error => { setContent({ 'error': error.message }); });
  }, [resource]);

  if (!content) return null;

  if (content.error) return <NotFound content={content.error} />;

  return (
    <Fragment>
      <NavBar path={match.params.ref || nav} active={active} />
      <Banner small content={content.time} />
      <Ribbon content={content.header} />
      <Blocks content={content.blocks} />
      <Ribbon content={content.footer} />
    </Fragment>
  );
}

export default Page;
