import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_noir_streetwear_1792196547137.jpg';
export const PHOTOSHOOT_IMAGE = '/src/assets/images/editorial_photoshoot_noir_1792198373687.jpg';
export const PACKAGING_IMAGE = '/src/assets/images/noir_real_packaging_box_1792198769340.jpg';
export const PACKAGING_BOX_CLOSED = '/src/assets/images/noir_packaging_closed_lid_1792198785615.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'noir-samurai-regular-tee',
    name: 'BORN BROKE DIE RICH',
    code: 'NC-DROP01-T01',
    category: 'MAJICA',
    priceKM: 50,
    priceEUR: 25,
    image: '/src/assets/images/product_noir_oversized_tee_1792196546646.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Regular kroj',
    composition: '100% pamuk',
    care: 'Pranje na 40 stepeni naopako',
    description: 'Crna regular majica sa BORN BROKE DIE RICH monohromatskim motivom. Klasični regular kroj, visokokvalitetni pamuk i ojačan ovratnik.',
    edition: 'Drop 01 // Limitirano na 50 komada',
    stock: 18,
    featured: true,
  },
  {
    id: 'noir-culture-core-tee',
    name: 'NOIR CASUAL',
    code: 'NC-DROP01-T02',
    category: 'MAJICA',
    priceKM: 50,
    priceEUR: 25,
    image: '/src/assets/images/product_noir_tee_02_1792197897249.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Regular kroj',
    composition: '100% pamuk',
    care: 'Pranje na 40 stepeni naopako',
    description: 'Crna regular majica NOIR CASUAL sa prepoznatljivim minimalističkim potpisom u čistom monohromatskom kontrastu. Udoban i postojan materijal za svakodnevno nošenje.',
    edition: 'Drop 01 // Limitirano na 50 komada',
    stock: 22,
    featured: true,
  },
  {
    id: 'noir-obscure-geometry-tee',
    name: 'SHADOW MUSE',
    code: 'NC-DROP01-T03',
    category: 'MAJICA',
    priceKM: 50,
    priceEUR: 25,
    image: '/src/assets/images/product_noir_tee_03_1792197897433.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Regular kroj',
    composition: '100% pamuk',
    care: 'Pranje na 40 stepeni naopako',
    description: 'Crna regular majica SHADOW MUSE sa brutalističkom grafikom i diskretnim detaljima. Vrhunska izrada i trajnost.',
    edition: 'Drop 01 // Limitirano na 50 komada',
    stock: 15,
    featured: true,
  },
];
