import Link from 'next/link';

export default function Header() {
  return (
    <header className="Header Container flex items-center justify-between mv3">
      <Link href="/">
        <a className="Header__logo">Sean Scanlan</a>
      </Link>
      <ul className="Header__navigation flex flex-column flex-row-md items-end items-center-md justify-between">
        <li className="Navigation__item pr3-md">
          <Link href="/about">
            <a className="Navigation__link">About</a>
          </Link>
        </li>
        <li className="Navigation__item pr3-md">
          <Link href="/static/sscanlan-cv.pdf">
            <a target="_blank" className="Navigation__link">CV</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};
