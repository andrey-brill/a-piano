
import { React } from '../chunk-e.js';
import style from './Content.m.scss';


const Content = ({ className, children }) => (
  <div className={style.container}>
    <div className={className}>
      { children }
    </div>
  </div>
);

export { Content };
