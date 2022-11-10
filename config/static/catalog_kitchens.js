import { PATH } from 'config/path'

export default {
  title: 'Каталог кухонь',
  main: {
    title: 'Каталог кухонь',
  },
  filter: {
    pageSlug: PATH.KITCHENS,
  },
  cases: {
    title: 'Кухни для разных характеров',
    buttonText: 'Смотреть все кейсы',
    description:
      'Кухня – это самое активное место в доме. Она должно быть не просто красивым, а еще и вписываться в образ жизни, подстраиваться под человека',
    slug: PATH.CASES,
  },
}

export const FILTERS_DICTIONARY = {
  form: 'Форма',
  color: 'Цвет',
  facade: 'Фасад',
  style: 'Стиль',
  tabletop: 'Столешница',
  size: 'Размер',
  price: 'Цена',
}
