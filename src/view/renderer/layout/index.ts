import { LayoutBase } from './Base';
import { LayoutLayer } from './Layer';

const Layout = Object.assign(LayoutBase, { Layer: LayoutLayer });

export { Layout };
