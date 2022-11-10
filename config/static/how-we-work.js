import { PATH } from 'config/path'

export default {
  main: {
    title: 'Как мы работаем',
    description:
      'Дизайн-проект, подбор материалов, замер помещения и оформление заказа, не выходя из дома. Рассказываем, как мы создаём вашу кухню.',
    src: '/images/how-we-work-main.jpeg',
  },
  step1: {
    caption: 'Шаг 1 из 10',
    title: 'Познакомимся, чтобы понимать вас',
    description:
      'Приедет дизайнер, а не замерщик. Узнает, как часто вы готовите, работаете ли на кухне с ноутбуком, собираетесь за столом всей семьей или в разное время.',
  },
  step2: {
    caption: 'Шаг 2 из 10',
    title: 'Проведем замеры',
    description:
      'Наш дизайнер сделает замеры кухни и учтет ее особенности: где проходят трубы и воздуховоды, как расположены двери и даже как падает свет из окна.',
    src: {
      normal: '/images/proccess-step-2.jpg',
      retina: '/images/proccess-step-2.jpg',
    },
    buttonText: 'Вызвать дизайнера',
    href: PATH.CALL_DESIGNER,
    order: {
      title: 'Вызвать дизайнера',
      caption: 'Укажите свои данные, чтобы мы могли с вами связаться.',
    },
  },
  step3: {
    caption: 'Шаг 3 из 10',
    title: 'Вместе выберем цвета и материалы',
    description:
      'Дизайнер привезет образцы материалов и покажет палетку цветов. Образцы для будущих фасадов, каркаса и столешницы можно потрогать, осмотреть при вашем освещении и даже поцарапать ножом.',
    bodyImage: '/images/step-3-body-image.png',
    list: [
      {
        colorSrc: '/images/materials/kitchen-material-1-1-preview.jpg',
        materialSrc: '/images/step-3-material-1.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-2-preview.jpg',
        materialSrc: '/images/step-3-material-2.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-3-preview.jpg',
        materialSrc: '/images/step-3-material-3.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-4-preview.jpg',
        materialSrc: '/images/step-3-material-4.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-1-preview.jpg',
        materialSrc: '/images/step-3-material-1.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-2-preview.jpg',
        materialSrc: '/images/step-3-material-2.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-3-preview.jpg',
        materialSrc: '/images/step-3-material-3.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-4-preview.jpg',
        materialSrc: '/images/step-3-material-4.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-1-preview.jpg',
        materialSrc: '/images/step-3-material-1.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-2-preview.jpg',
        materialSrc: '/images/step-3-material-2.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-3-preview.jpg',
        materialSrc: '/images/step-3-material-3.png',
      },
      {
        colorSrc: '/images/materials/kitchen-material-1-4-preview.jpg',
        materialSrc: '/images/step-3-material-4.png',
      },
    ],
  },
  step4: {
    caption: 'Шаг 4 из 10',
    title: 'Выберем петли, ручки и доводчики',
    src: {
      normal: '/images/step-4-main.jpg',
      retina: '/images/step-4-main.jpg',
    },
    cardSrc: {
      normal: '/images/step-4-mini.jpg',
      retina: '/images/step-4-mini.jpg',
    },
    description:
      'Фурнитуру можно рассмотреть со всех сторон: дизайнер предложит несколько образцов. Убедитесь в её прочности и надёжности.',
    buttonText: 'Перейти в каталог',
    href: PATH.MATERIALS,
  },
  step5: {
    caption: 'Шаг 5 из 10',
    title: 'Нарисуем проект вашей новой кухни',
    description:
      'Определимся со стилем, учитывая дизайн других комнат. Сразу сделаем 3D-визуализацию мебели. Вам будет легко представить конфигурацию кухни, находясь в этом же помещении.',
    srcMain: '/images/step-5-1.png',
    srcCommon: '/images/step-5-2.png',
  },
  step6: {
    caption: 'Шаг 6 из 10',
    title: 'Подберем технику, мойки и смесители',
    description:
      'Поможем выбрать наполнение будущей кухни – от холодильника до крана с питьевой водой. Все оборудование и оснащение – с гарантией и скидками от производителей.',
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
        slug: PATH.TECHNICS,
      },
      {
        title: 'Мойки и смесители',
        description:
          'Предлагаем оптимальные по стоимости варианты от проверенных поставщиков.',
        buttonText: 'Перейти в каталог',
        src: '/images/brand-card-2.jpg',
        slug: PATH.SINKS,
      },
    ],
  },
  step7: {
    caption: 'Шаг 7 из 10',
    title: 'Оформим предоплату или рассрочку',
    description:
      'Возьмём 50% от стоимости кухни и запустим проект в производство. Мы понимаем, что покупка кухни – серьёзное вложение, поэтому сотрудничаем с банками и предоставляем рассрочку.',
    buttonText: 'Подробнее о рассрочке',
    href: PATH.CREDIT,
    list: [
      {
        sublist: [
          {
            name: 'ОТП Банк',
            src: '/images/banks/otp.png',
          },
          {
            name: 'МТС Банк',
            src: '/images/banks/mts.png',
          },
          {
            name: 'Восточный Экспресс Банк',
            src: '/images/banks/vostochniy.png',
          },
          {
            name: 'Кредит Европа Банк',
            src: '/images/banks/credit-europa.png',
          },
          {
            name: 'Хоум Кредит Банк',
            src: '/images/banks/home-credit.png',
          },
          {
            name: 'Тинькофф',
            src: '/images/banks/tinkoff.png',
          },
        ],
      },
      // {
      //   sublist: [
      //     {
      //       name: 'ОТП Банк',
      //       src: '/images/banks/otp.png',
      //     },
      //     {
      //       name: 'МТС Банк',
      //       src: '/images/banks/mts.png',
      //     },
      //     {
      //       name: 'Восточный Экспресс Банк',
      //       src: '/images/banks/vostochniy.png',
      //     },
      //     {
      //       name: 'Кредит Европа Банк',
      //       src: '/images/banks/credit-europa.png',
      //     },
      //     {
      //       name: 'Хоум Кредит Банк',
      //       src: '/images/banks/home-credit.png',
      //     },
      //     {
      //       name: 'Тинькофф',
      //       src: '/images/banks/tinkoff.png',
      //     },
      //   ],
      // },
    ],
  },
  step8: {
    caption: 'Шаг 8 из 10',
    title: 'Сделаем вашу кухню на собственном заводе',
    src: {
      normal: '/images/step-8-main.jpg',
      retina: '/images/step-8-main.jpg',
    },
    cardSrc: {
      normal: '/images/step-8-mini.jpg',
      retina: '/images/step-8-mini.jpg',
    },
    description:
      'Мы не пользуемся услугами посредников и полностью контролируем все этапы производства. ',
    buttonText: 'Узнать больше о производстве',
    href: PATH.PRODUCTION,
  },
  step9: {
    caption: 'Шаг 9 из 10',
    title: 'Соберем и установим кухню у вас дома',
    src: {
      normal: '/images/step-9-main.jpg',
      retina: '/images/step-9-main.jpg',
    },
    description:
      'Сборщики согласуют с вами удобное для работы время, установят мебель и оборудование и презентуют новую кухню.',
    buttonText: 'Подробнее о доставке и сборке',
    href: PATH.DELIVERY,
  },
  step10: {
    caption: 'Готово!',
    title: 'Наслаждайтесь!',
    description:
      'Совсем скоро вы сможете опробовать новую кухню в действии и отпраздновать покупку.',
    src: '/images/step-10-main.jpg',
  },
}
