// The modules
import Head from 'next/head';
import Header from 'components/site/Header';
import Footer from 'components/site/Footer';

export default function Layout({
  className = '',
  preview = false,
  children
}) {
  return (
    <>
      <Head>
        <title>Sean Scanlan</title>
        <link rel="icon" type="image/png" href="/images/favicon-alt.png" sizes="64x64" />
        <meta name="description" content="" />
        {/* Facebook */}
        <meta name="og:title" content="" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:width" content=""/>
        <meta property="og:image:height" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="" />
        <meta property="og:locale" content="en_US" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:image:alt" content="" />
      </Head>
      <div className={`Body ${className}`}>
        <Header />
        <main className="Main">
          {children}
        </main>
        <ul className="Border__wrapper">
          <li className="Border Border--top"></li>
          <li className="Border Border--right"></li>
          <li className="Border Border--bottom"></li>
          <li className="Border Border--left"></li>
        </ul>
        <Footer />
      </div>
      {preview && (
        <div className="Preview-warning">
          <p>You are looking at the website in preview mode, which displays unpublished changes from Contentful.</p>
        </div>
      )}
    </>
  )
}
