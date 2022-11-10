import { PATH } from 'config/path'

export default {
  catalog: {
    title: 'Каталог кухонь',
    slug: PATH.KITCHENS,
  },
  // materials: {
  //   title: 'Материалы и цвета',
  //   slug: PATH.MATERIALS,
  // },
  technique: {
    title: 'Техника для кухни',
    slug: PATH.TECHNICS,
  },
  mixers: {
    title: 'Мойки и смесители',
    slug: PATH.SINKS,
  },
  buyer: {
    title: 'Покупателю',
    slug: PATH.BUYER,
    sublist: [
      {
        name: 'Акции и предложения',
        slug: PATH.SPECIALS,
      },
      {
        name: 'Рассрочка и кредит',
        slug: PATH.CREDIT,
      },
      {
        name: 'Гарантия',
        slug: PATH.GUARANTEE,
      },
      {
        name: 'Советы и идеи',
        slug: PATH.IDEAS,
      },
      {
        name: 'Вопросы и ответы',
        slug: PATH.FAQ,
      },
      {
        name: 'Отзывы о кухнях',
        slug: PATH.REVIEWS,
      },
    ],
  },
  process: {
    title: 'Как мы работаем',
    slug: PATH.HOW_WE_WORK,
    sublist: [
      // {
      //   name: 'Дизайн проект',
      //   slug: PATH.DESIGN,
      // },
      // {
      //   name: 'Подбор материалов',
      //   slug: PATH.SELECTION_OF_MATERIALS,
      // },
      // {
      //   name: 'Замер помещения',
      //   slug: PATH.ROOM_MEASUREMENT,
      // },
      // {
      //   name: 'Договор и оплата',
      //   slug: PATH.CONTRACT,
      // },
      // {
      //   name: 'Изготовление кухни',
      //   slug: PATH.CUSTOM_KITCHEN,
      // },
      {
        name: 'Доставка и установка',
        slug: PATH.DELIVERY,
      },
    ],
  },
  about: {
    title: 'Heime',
    slug: PATH.HEIME_FOOTER,
    sublist: [
      {
        name: 'О компании',
        slug: PATH.ABOUT,
      },
      {
        name: 'Производство',
        slug: PATH.PRODUCTION,
      },
      {
        name: 'Вакансии',
        slug: PATH.VACANCY,
      },
      // {
      //   name: 'Обратная связь',
      //   slug: PATH.FEEDBACK,
      // },
      {
        name: 'Контакты',
        slug: PATH.CONTACTS,
      },
    ],
  },
  // payment: {
  //   title: 'Оплата заказа',
  //   slug: PATH.PAYMENT,
  //   sublist: [
  //     {
  //       name: 'Оплатить заказ',
  //       slug: PATH.PAYMENT,
  //     },
  //     {
  //       name: 'Реквизиты',
  //       slug: PATH.REQUISITES,
  //     },
  //   ],
  // },
  contacts: {
    order: {
      title: 'Выбор и заказ кухни',
      number: '8 (800) 700-55-55',
      link: '88007005555',
      caption: 'Каждый день с 9:00 до 21:00',
    },
    // guarantee: {
    //   title: 'Гарантия и поддержка',
    //   number: '8 (800) 700-44-44',
    //   link: '88007004444',
    //   caption: 'Каждый день с 10:00 до 22:00',
    // },
    binding: {
      title: 'Напишите нам',
      caption: 'Отвечаем в течение часа',
    },
    delivery: {
      title: 'Доставка и сборка',
      caption: 'Каждый день  с 10:00 до 22:00',
    },
    social: {
      title: 'Мы в соцсетях',
      list: [
        {
          link: 'https://vk.com/',
          icon: 'vk',
        },
        {
          link: 'https://www.instagram.com/',
          icon: 'inst',
        },
      ],
    },
    payments: {
      title: 'Принимаем к оплате',
      list: [
        {
          icon: '/icons/icon-mastercard.svg',
          name: 'Mastercard',
        },
        {
          icon: '/icons/icon-visa.svg',
          name: 'Visa',
        },
        {
          icon: '/icons/icon-mir.svg',
          name: 'Mir',
        },
      ],
    },
  },
  basement: {
    logo: {
      text: '© 2020',
    },
    nimax: {
      text: 'Сделано в',
      link: 'https://www.nimax.ru/',
    },
    links: [
      // {
      //   text: 'Правила использования',
      //   link: '/'
      // },
      {
        text: 'Политика конфиденциальности',
        link: '/policy',
      },
      // {
      //   text: 'Публичная оферта',
      //   link: '/'
      // },
    ],
  },
}
