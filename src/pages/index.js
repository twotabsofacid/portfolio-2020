// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
// The Data
import { getData, getHomepageProjects } from 'lib/api';
// The modules
import Layout from 'components/Layout';
import AnimationContainer from 'components/modules/animationContainer';

export default function Home(context) {
  const projects = context.projects.map(item => item.fields);

  return (
    <Layout className="Home" preview={false}>
      <AnimationContainer />
      <article className="Container Project mt5">
        {projects.map((item, index) => {
          return (
            <Link key={index} as={`/projects/${item.slug}`} href="/projects/[slug]">
              <a className="body-header Project__link">{item.title} </a>
            </Link>
          );
        })}
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const projects = await getHomepageProjects(false);
  return {
    props: {
      projects: projects
    }
  }
}
