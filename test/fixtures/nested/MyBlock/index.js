import { Block } from 'dwayne';
import tmpl from './index.html';

export default class MyBlock extends Block {
  static get html() {
    return tmpl;
  }
}