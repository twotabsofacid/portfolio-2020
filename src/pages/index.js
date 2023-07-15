// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import ReactGA from 'react-ga';
// The Data
import { getHomepageProjects } from 'lib/api';
// The modules
import Layout from 'components/Layout';
import AnimationContainer from 'components/modules/animationContainer';
import SpecialNotice from 'components/modules/specialNotice';

export default function Home(context) {
  const projects = context.projects.map((item) => item.fields);
  ReactGA.initialize('UA-109026249-1');
  ReactGA.pageview('Home');
  return (
    <Layout className="Home" preview={false}>
      <AnimationContainer />
      <article className="Container Project mt5">
        {projects.map((item, index) => {
          return (
            <div key={index} className="body-header">
              <Link as={`/projects/${item.slug}`} href="/projects/[slug]">
                <a className="Project__link">{item.title}</a>
              </Link>
              {index < projects.length - 1 && (
                <span className="body-icon"> ❒ </span>
              )}
            </div>
          );
        })}
      </article>
      <SpecialNotice />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const projects = await getHomepageProjects(false);
  return {
    props: {
      projects: projects
    }
  };
}
