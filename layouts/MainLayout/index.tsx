import Navbar from '../../components/common/Navbar';
import Type from './type';
import styles from './style.module.css';

export default function Layout(props: Type.Layout) { 

  return (
    <div className={styles.root}>
      <Navbar />
      {props.children}
    </div>
  )
}
