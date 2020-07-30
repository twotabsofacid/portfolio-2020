// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
// The Data
import { getData, getHomepageProjects } from 'lib/api';
// The modules
import Layout from 'components/Layout';

export default function Home(context) {
  const projects = context.projects.map(item => item.fields);
  const face = useRef(null);

  useEffect(() => {
    const faceOptions = ["(งツ)ว", "╭(◔ ◡ ◔)/", "(╯°□°)╯︵ ┻━┻", "(｡◕‿◕｡)", "༼ つ ◕_◕ ༽つ", "(◡ ‿ ◡ ✿)", "ʕ •ᴥ•ʔ", "ಠ_ಠ", "(⊙ω⊙)", "( ˘ ³˘)♥", "(• ε •)", "(╥﹏╥)", "(❍ᴥ❍ʋ)", "ヾ(⌐■_■)ノ♪", "◉‿◉", "ᕕ( ᐛ )ᕗ", "(=^ェ^=)", "ᕙ(⇀‸↼‶)ᕗ", "ノ( ^_^ノ)", "ヘ(◕。◕ヘ)", "┏(・o･)┛", "(⌐■_■)", "(>*.*)><(*.*<)"];
    let counter = 0;
    let timer = setInterval(() => {
      counter = (counter + 1) % faceOptions.length;
      face.current.innerText = faceOptions[counter];
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])
  return (
    <Layout className="Home" preview={false}>
      <article className="Face__wrapper">
        <p className="Face" ref={face}>(งツ)ว</p>
      </article>
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
