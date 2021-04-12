// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import ReactGA from 'react-ga';
// the data
import { getAboutPage } from 'lib/api';
// The modules
import Layout from 'components/Layout';
import AnimationContainer from 'components/modules/animationContainer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function About(context) {
  const data = context.data;
  ReactGA.initialize('UA-109026249-1');
  ReactGA.pageview('About');
  return (
    <Layout className="Home" preview={false}>
      <AnimationContainer />
      <article className="Container">
        <h2 className="body-header Project__title">{data.title}</h2>
        <div className="Project__description mt3">
          {documentToReactComponents(data.description)}
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await getAboutPage(false);
  return {
    props: {
      data: props
    }
  }
}
