import { PATH } from 'config/path'

export default {
  cities: [
    {
      name: 'Санкт-Петербург',
    },
    {
      name: 'Москва',
    },
    {
      name: 'Нижний Новгород',
    },
    {
      name: 'Казань',
    },
  ],
  nav: [
    {
      name: 'Доставка и сборка',
      slug: PATH.DELIVERY,
    },
    {
      name: 'Гарантия и поддержка',
      slug: PATH.GUARANTEE,
    },
    {
      name: 'Рассрочка и кредит',
      slug: PATH.CREDIT,
    },
    {
      name: 'Производство',
      slug: PATH.PRODUCTION,
    },
    {
      name: 'Контакты',
      slug: PATH.CONTACTS,
    },
  ],
  favorite: {
    name: 'Избранное',
    slug: PATH.FAVORITES,
  },
  logo: {
    text: 'kitchen',
  },
  list: [
    {
      name: 'Каталог кухонь',
      slug: PATH.KITCHENS,
      contentKey: 'catalog',
    },
    // {
    //   name: 'Материалы и цвета',
    //   slug: PATH.MATERIALS,
    //   contentKey: 'materials',
    // },
    {
      name: 'Мойки и смесители',
      slug: PATH.SINKS,
      contentKey: 'mixers',
    },
    {
      name: 'Техника',
      slug: PATH.TECHNICS,
      contentKey: 'technique',
    },
    {
      name: 'Идеи',
      slug: PATH.IDEAS,
      contentKey: 'ideas',
    },
    {
      name: 'Акции',
      slug: PATH.SPECIALS,
      contentKey: 'stocks',
    },
  ],
  content: {
    catalog: {
      title: 'Каталог кухонь',
      slug: PATH.KITCHENS,
      buttonText: 'Перейти в каталог кухонь',
      list: [
        {
          title: 'Форма',
          slug: '/',
        },
        {
          title: 'Стиль',
          slug: '/',
        },
        {
          title: 'Материалы',
          slug: '/',
        },
      ],
    },
    // materials: {
    //   title: 'Материалы и цвета',
    //   slug: PATH.MATERIALS,
    //   buttonText: 'Перейти в каталог материалов',
    //   list: [
    //     {
    //       title: 'Фасады',
    //       image: '/images/header-material-1.jpg',
    //     },
    //     {
    //       title: 'Столешницы',
    //       image: '/images/header-material-2.jpg',
    //     },
    //     {
    //       title: 'Фурнитура',
    //       image: '/images/header-material-3.jpg',
    //     },
    //     {
    //       title: 'Аксессуары',
    //       image: '/images/header-material-4.jpg',
    //     },
    //   ],
    // },
    mixers: {
      title: 'Мойки и смесители',
      slug: PATH.SINKS,
      buttonText: 'Перейти в каталог моек',
      list: [
        {
          title: 'Мойки',
          image: '/images/header-mixer-1.jpg',
        },
        {
          title: 'Смесители',
          image: '/images/header-mixer-2.jpg',
        },
      ],
      advice: {
        note: 'советы',
        title: 'Как выбрать мойку',
        description:
          'Рассказываем о 5 главных вещах, которые нужно учесть при выборе мойки.',
        src: {
          normal: '/images/card-preview.jpg',
          retina: '/images/card-preview.jpg',
        },
        slug: '/',
      },
    },
    technique: {
      title: 'Техника для кухни',
      slug: PATH.TECHNICS,
      buttonText: 'Перейти в каталог техники',
      list: [
        {
          title: 'Варочные панели',
          image: '/images/header-technique-2.jpg',
        },
        {
          title: 'Духовые шкафы',
          image: '/images/header-technique-1.jpg',
        },
        {
          title: 'Вытяжки',
          image: '/images/header-technique-3.jpg',
        },
        {
          title: 'Мелкая техника',
          image: '/images/header-technique-4.jpg',
        },
      ],
    },
    ideas: {
      title: 'Идеи',
      slug: PATH.IDEAS,
      buttonText: 'Кейсы, советы и идеи',
      list: [
        {
          title: 'Кейсы',
          description:
            'Показываем проекты наших кухонь, рассказываем про героев',
          src: '/images/header-idea-1.jpg',
          slug: PATH.IDEAS,
        },
        {
          title: 'Советы',
          description:
            'Делимся лайхаками как выбирать кухню и комплектующие к ней',
          src: '/images/header-idea-2.jpg',
          slug: PATH.IDEAS,
        },
      ],
      advice: {
        note: 'тест',
        title: 'Какая кухня вам подойдет',
        description:
          'Расскажем как выбрать кухню, подходящую вам не только по стилю, но и образу жизни',
        src: '/images/card-preview-1.jpg',
        slug: '/',
      },
    },
    stocks: {
      title: 'Акции',
      slug: PATH.SPECIALS,
      buttonText: 'Все предложения',
    },
  },
  forms: {
    confidentiality:
      'Оставляя заявку вы соглашаетесь с <a href="/" target="_blank">политикой конфиденциальности</a>.',
    message: {
      title: 'Написать нам',
      caption: '',
      subTitle: '',
      // description:
      //   'Оставьте свой вопрос и мы ответим на него сообщением в течение часа',
      buttonText: 'Отправить сообщение',
    },
    call: {
      title: '8 800 700-44-44',
      phone: '88007004444',
      caption: 'Каждый день с 9:00 до 21:00',
      subTitle: 'Перезвоните мне',
      description: 'Оставьте свой номер и мы свяжемся с вами в удобное время',
      buttonText: 'Оставить заявку',
      form_caption: 'В какое время вам позвонить?',
    },
  },
}

export const SUBMENU_DICTIONARY = {
  Форма: 'form',
  Стиль: 'style',
  Материалы: 'facade',
}
