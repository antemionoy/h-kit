import { PATH } from 'config/path'

export default {
  special_offer: {
    title: 'Специальные предложения',
    buttonText: 'Все предложения',
  },
  video: {
    title: 'Мы можем сделать все, что вы можете придумать',
    buttonText: 'Смотреть кухню',
  },
  process_slider: {
    title: 'Ваша новая кухня, не выходя из дома',
    description:
      'Дизайн-проект, подбор материалов, замер помещения и заказ кухни не выходя из дома. Рассказываем, как мы работаем.',
    buttonText: 'Подробнее о том, как мы работаем',
    slug: PATH.HOW_WE_WORK,
  },
  production_slider: {
    title: 'Собственное производство, а не просто магазин',
    buttonText: 'Подробнее о производстве',
  },
  proposal: {
    title: 'Вам может понравиться',
    buttonText: 'Перейти в каталог кухонь',
    slug: PATH.KITCHENS,
  },
  ideas: {
    title: 'Советы и идеи',
    buttonText: 'Другие советы и идеи',
    slug: PATH.IDEAS,
  },
  intrested: {
    title: 'Вы интересовались',
  },
  materials: {
    title: 'Материалы для самых притязательных',
    // buttonText: 'Смотреть каталог материалов и цветов',
    // slug: PATH.MATERIALS,
  },
  categories: {
    title: 'Техника, мойки, смесители',
    description:
      'К выбранной кухне вы всегда сможете подобрать подходящую технику, мойку и смеситель прямо у нас. Вам не придется обращаться в разные места.',
    brands: [
      {
        alt: 'Candy',
        src: '/images/brand-1.png',
      },
      {
        alt: 'BOSCH',
        src: '/images/brand-2.png',
      },
      {
        alt: 'GROHE',
        src: '/images/brand-3.png',
      },
    ],
    list: [
      {
        title: 'Техника для кухни',
        description:
          'Поможем подобрать технику, которая идеально впишется в интерьер вашей новой кухни.',
        buttonText: 'Перейти в каталог',
        src: '/images/brand-card-1.jpg',
        srcSet: '/images/brand-card-1.jpg 1x, /images/brand-card-1@2x.jpg 2x',
        slug: '/product/technics',
      },
      {
        title: 'Мойки и смесители',
        description:
        'Предлагаем оптимальные по стоимости варианты от проверенных поставщиков.',
        buttonText: 'Перейти в каталог',
        src: '/images/brand-card-2.jpg',
        srcSet: '/images/brand-card-2.jpg 1x, /images/brand-card-2@2x.jpg 2x',
        slug: '/product/accessories',
      },
    ],
  },
}
