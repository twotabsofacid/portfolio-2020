import useLockBodyScroll from 'components/utils/useLockBodyScroll';

export default function ScrollLockComponent() {
  useLockBodyScroll();
  return (
    <div
      style={{
        position: 'absolute'
      }}
    ></div>
  );
}
