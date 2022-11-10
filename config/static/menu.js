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
    title: 'Избранное',
    slug: PATH.FAVORITES,
  },
  list: [
    {
      title: 'Каталог кухонь',
      slug: PATH.KITCHENS,
      list: [
        {
          title: 'Форма',
        },
        {
          title: 'Стиль',
        },
        {
          title: 'Материалы',
        },
      ],
    },
    // {
    //   title: 'Материалы и цвета',
    //   slug: PATH.MATERIALS,
    //   list: [
    //     {
    //       title: 'Фасады',
    //       slug: PATH.FACADES,
    //       sublist: [
    //         {
    //           title: 'Массив дерева',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Шпон',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Пластик',
    //           slug: '/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Столешницы',
    //       slug: PATH.COUNTERTOPS,
    //       sublist: [
    //         {
    //           title: 'Натуральный камень',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Натуральное дерево',
    //           slug: '/',
    //         },
    //         {
    //           title: 'ЛДСП',
    //           slug: '/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Фурнитура',
    //       slug: PATH.FITTINGS,
    //       sublist: [
    //         {
    //           title: 'Hettich',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Blum',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Hafele',
    //           slug: '/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Аксессуары',
    //       slug: PATH.ACCESSORIES,
    //       sublist: [
    //         {
    //           title: 'Хранение',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Наполнение',
    //           slug: '/',
    //         },
    //         {
    //           title: 'Освещение',
    //           slug: '/',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'Мойки и смесители',
      slug: PATH.SINKS,
      list: [
        {
          title: 'Мойки',
          slug: '/',
          sublist: [
            {
              title: 'Одинарная',
              slug: '/',
            },
            {
              title: 'Двойная',
              slug: '/',
            },
            {
              title: 'Из камня',
              slug: '/',
            },
            {
              title: 'С крылом',
              slug: '/',
            },
            {
              title: 'Нержавейка',
              slug: '/',
            },
          ],
        },
        {
          title: 'Смесители',
          slug: '/',
          sublist: [
            {
              title: 'С фильтром',
              slug: '/',
            },
            {
              title: 'С лейкой',
              slug: '/',
            },
            {
              title: 'Гибкие',
              slug: '/',
            },
            {
              title: 'Из хрома',
              slug: '/',
            },
            {
              title: 'Матовые',
              slug: '/',
            },
          ],
        },
      ],
    },
    {
      title: 'Техника для кухни',
      slug: PATH.TECHNICS,
      list: [
        {
          title: 'Варочные панели',
          slug: '/',
          sublist: [
            {
              title: 'Индукционная',
              slug: '/',
            },
            {
              title: 'Газовая',
              slug: '/',
            },
            {
              title: 'Электрическая',
              slug: '/',
            },
          ],
        },
        {
          title: 'Духовые шкафы',
          slug: '/',
          sublist: [
            {
              title: 'С горячим обдувом',
              slug: '/',
            },
            {
              title: 'С функцией СВЧ',
              slug: '/',
            },
            {
              title: 'Встраиваемые',
              slug: '/',
            },
          ],
        },
        {
          title: 'Вытяжки',
          slug: '/',
          sublist: [
            {
              title: 'Встраеваемые',
              slug: '/',
            },
            {
              title: 'Настенные',
              slug: '/',
            },
            {
              title: 'Потолочные',
              slug: '/',
            },
          ],
        },
        {
          title: 'Мелкая техника',
          slug: '/',
          sublist: [
            {
              title: 'Тостеры',
              slug: '/',
            },
            {
              title: 'Кофемашины',
              slug: '/',
            },
            {
              title: 'Электрические чайники',
              slug: '/',
            },
          ],
        },
      ],
    },
    {
      title: 'Идеи',
      slug: PATH.IDEAS,
      list: [],
    },
    {
      title: 'Акции',
      slug: PATH.SPECIALS,
      list: [],
    },
  ],
  contacts: {
    order: {
      title: 'Выбор и заказ кухни',
      number: '8 (800) 700-55-55',
      link: '88007005555',
      caption: 'Каждый день с 9:00 до 21:00',
    },
    guarantee: {
      title: 'Гарантия и поддержка',
      number: '8 (800) 700-44-44',
      link: '88007004444',
      caption: 'Каждый день с 10:00 до 22:00',
    },
    binding: {
      title: 'Напишите нам',
      caption: 'Отвечаем в течение часа',
      formTitle: 'Ваш вопрос',
    },
  },
}
