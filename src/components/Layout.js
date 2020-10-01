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
        <meta name="og:title" content="Sean Michael Scanlan" />
        <meta property="og:url" content="twotabsofacid.com" />
        <meta property="og:description" content="Sean Scanlan is an artist and developer specializing in physical and digital creative coding" />
        <meta property="og:image" content="" />
        <meta property="og:image:width" content=""/>
        <meta property="og:image:height" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sean Michael Scanlan" />
        <meta property="og:locale" content="en_US" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta name="twitter:url" content="twotabsofacid.com" />
        <meta name="twitter:title" content="Sean Michael Scanlan" />
        <meta name="twitter:description" content="Sean Scanlan is an artist and developer specializing in physical and digital creative coding" />
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
