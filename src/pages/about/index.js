// Components
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
// The modules
import Layout from 'components/Layout';
import AnimationContainer from 'components/modules/animationContainer';

export default function About() {
  return (
    <Layout className="Home" preview={false}>
      <AnimationContainer />
      <article className="Container">
        <h2 className="body-header Project__title">I am an artist and developer</h2>
        <p className="Project__description mt3">I specialize in physical and digital creative coding. If you're working on an interesting project I would love to hear from you. You can reach me at <a href="mailto:seanmichaelscanlan@gmail.com">seanmichaelscanlan at gmail</a>.</p>
      </article>
    </Layout>
  )
}
