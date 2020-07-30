import { useState, useEffect } from 'react';
// the data
import { getData } from 'lib/api';
// The modules
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';
// The components
import Layout from 'components/Layout';

export default function Project({slug, projects}) {
  const [preview, setPreview] = useState(false);
  const [walkArr] = useState([-2, -1, 0, 1, 2, 1, 0, -1]);
  const [data, setData] = useState(projects);
  // Get the data for our item
  const dataArr = data.filter(item => {
    return item.fields.slug === slug.slug;
  });
  const project = dataArr[0]?.fields;
  // Use the router, throw up a 404 if we can't find any data
  const router = useRouter();
  if (!router.isFallback && !project) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout className="Project" preview={false}>
      <article className="Container Project mt5">
        <h2 className="body-header Project__title">{project.title}</h2>
        <section className="Project__description mt3">
          {documentToReactComponents(project.description)}
        </section>
        {(project.gallery && project.gallery.length) && (
          <ul className="Project__image-list flex flex-column items-center mt6">
            {project.gallery.map((item, index) => {
              const randomWalk = walkArr[(index + 3) % 8];
              return (
                <li
                  className={classnames('Project__image-wrapper mb6', {
                    'Project__image-wrapper--left-far': randomWalk === -2,
                    'Project__image-wrapper--left': randomWalk === -1,
                    'Project__image-wrapper--right': randomWalk === 1,
                    'Project__image-wrapper--right-far': randomWalk === 2
                  })}
                >
                  <img
                    className="Project__image"
                    src={`${item.fields.file.url}?w=1440&fm=jpg&fl=progressive&q=70`}
                    alt={item.fields.title}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const params = context.params;
  const projects = await getData(false);
  return {
    props: {
      slug: params,
      projects: projects
    }
  }
}

export async function getStaticPaths() {
  const projects = await getData(false);
  return {
    paths: projects?.map(item => `/projects/${item.fields.slug}`) ?? [],
    fallback: false
  }
}
