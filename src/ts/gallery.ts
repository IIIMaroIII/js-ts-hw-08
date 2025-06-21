import * as basiclightbox from 'basiclightbox';

//  Types
interface Image {
  preview: string;
  original: string;
  description: string;
}
type LightboxInstance = Pick<Image, 'original' | 'description'>;
type Images = Image[];
interface Refs {
  list: HTMLUListElement | null;
}
//  data
const images: Images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
//  DOM Refs
const refs: Refs = {
  list: document.querySelector<HTMLUListElement>('.gallery'),
};
//  Initialization
if (refs.list) {
  refs.list.append(...makeGalleryEl(images));
  refs.list.addEventListener('click', onImageClick);
}
//  Event handlers
function onImageClick(e: Event) {
  e.preventDefault();
  if (!(e.target instanceof HTMLImageElement)) return;

  const src = e.target.dataset.source;
  const alt = e.target.alt;

  if (!src) return;

  showLightBoxInstance({ original: src, description: alt });
}
//  Utilities
function showLightBoxInstance(el: LightboxInstance) {
  const { original, description } = el;
  const bsLightBox = basiclightbox.create(
    `<img class="lightbox__img" src=${original} alt=${description}>`,
  );
  bsLightBox.show();
}
function makeGalleryItemEl({
  preview,
  original,
  description,
}: Image): HTMLLIElement {
  const liEl = document.createElement('li') as HTMLLIElement;
  const aEl = document.createElement('a') as HTMLAnchorElement;
  const imgEl = document.createElement('img') as HTMLImageElement;

  liEl.classList.add('gallery__item');

  aEl.classList.add('gallery__link');
  aEl.href = original;

  imgEl.classList.add('gallery__img');
  imgEl.src = preview;
  imgEl.dataset.source = original;
  imgEl.alt = description;

  aEl.append(imgEl);
  liEl.append(aEl);

  return liEl;

  /**
  *  <li class="gallery-item">
  <a class="gallery-link" href="large-image.jpg">
    <img
      class="gallery-image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>
  *
  */
}
function makeGalleryEl(images: Images): HTMLLIElement[] {
  return images?.map(makeGalleryItemEl);
}
