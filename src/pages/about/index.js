// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
// The modules
import Layout from 'components/Layout';

export default function About() {
  const face = useRef(null);

  useEffect(() => {
    let counter = 0;
    const faceOptions = ["(งツ)ว", "╭(◔ ◡ ◔)/", "(╯°□°)╯︵ ┻━┻", "(｡◕‿◕｡)", "༼ つ ◕_◕ ༽つ", "(◡ ‿ ◡ ✿)", "ʕ •ᴥ•ʔ", "ಠ_ಠ", "(⊙ω⊙)", "( ˘ ³˘)♥", "(• ε •)", "(╥﹏╥)", "(❍ᴥ❍ʋ)", "ヾ(⌐■_■)ノ♪", "◉‿◉", "ᕕ( ᐛ )ᕗ", "(=^ェ^=)", "ᕙ(⇀‸↼‶)ᕗ", "ノ( ^_^ノ)", "ヘ(◕。◕ヘ)", "┏(・o･)┛", "(⌐■_■)", "(>*.*)><(*.*<)"];
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
        <h3 className="Face" ref={face}>(งツ)ว</h3>
      </article>
      <article className="Container">
        <p className="About__description body-header">I'm an artist and developer from New York who specializes in physical and digital creative coding. If you're working on an interesting project I would love to hear from you.</p>
      </article>
    </Layout>
  )
}
