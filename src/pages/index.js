import styles from './index.scss';
import Link from 'umi/link';
export default function() {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <Link to="/login"> login</Link>
        </li>
      </ul>
    </div>
  );
}
