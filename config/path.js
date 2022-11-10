export const PATH = {
  KITCHENS: '/catalog/kitchens', // Каталог кухонь
  KITCHEN: '/product/kitchen', // Кухня
  KITCHEN_COMPILATIONS: '/compilation', // Подборка кухонь

  MATERIALS: '/catalog/materials', // Каталог материалов
  // MATERIALS_WITH_GROUP: '/catalog/materials?group=fasady',
  FACADES: '/product/facades', // Фасады
  COUNTERTOPS: '/product/countertops', // Столешницы
  FITTINGS: '/product/fittings', // Фурнитура
  ACCESSORIES: '/product/accessories', // Аксессуары

  TECHNICS: '/catalog/technics', // Каталог техники
  // TECHNICS_WITH_GROUP: '/catalog/technics?group=duhovye-shkafy',
  PRODUCT_TECHNICS: '/product/technics', // Детальная техники

  SINKS: '/catalog/sinks', // Мойки и смесители
  // SINKS_WITH_GROUP: '/catalog/sinks?group=moyki',
  PRODUCT_SINKS: '/product/sinks',

  BUYER: '/', // Покупателю
  SPECIALS: '/specials', // Акции и специальные предложения
  CREDIT: '/loan', // Рассрочка и кредит
  GUARANTEE: '/guarantee', // Гарантии
  IDEAS: '/articles', // Кейсы, советы и идеи
  CASES: '/articles/cases', // Кейсы
  FAQ: '/faq', // Часто задаваемые вопросы
  REVIEWS: '/reviews', // Отзывы о кухнях

  HOW_WE_WORK: '/how-we-work', // Как мы работаем
  DESIGN: '/', // Дизайн проект
  SELECTION_OF_MATERIALS: '/', // Подбор материалов
  ROOM_MEASUREMENT: '/', // Замер помещения
  CONTRACT: '/', // Договор и оплата
  CUSTOM_KITCHEN: '/', // Изготовление кухни

  PAYMENT: '/payment', // Платежи
  REQUISITES: '/requisites', // Реквизиты

  HEIME_FOOTER: '/', // Heime заголовок в подвале
  ABOUT: '/about', // О компании
  PRODUCTION: '/production', // Производство
  VACANCY: '/career', // Вакансии
  FEEDBACK: '/', // Обратная связь
  CONTACTS: '/contacts', // Контакты
  // CONTACTS_WITH_TAG: '/contacts?tags=moscow',

  DELIVERY: '/delivery', // Доставка
  FAVORITES: '/favorites', // Избранное

  CALL_DESIGNER: '/', // Вызвать дизайнера
}

export const CATEGORY_PRODUCTS_PATH = {
  technic: PATH.PRODUCT_TECHNICS,
  sink: PATH.PRODUCT_SINKS,
}

export const MATERIALS_PRODUCTS_PATH = {
  fasady: PATH.FACADES,
  stoleshnicy: PATH.COUNTERTOPS,
  furnitura: PATH.FITTINGS,
  aksessuary: PATH.ACCESSORIES,
}
