import { PATH } from 'config/path'

export default {
  title: 'Рассрочка и кредит',
  buttonText: 'Все условия',
  slug: PATH.CREDIT,
  list: [
    {
      title: '0',
      caption: '%',
      description: 'Рассрочка без комиссий и переплат',
      isDown: false,
    },
    {
      title: '0',
      caption: '₽',
      description: 'Без первоначального взноса',
      isDown: false,
    },
    {
      title: '6',
      caption: 'мес',
      description: 'Предоставляем на срок от трех до шести месяцев',
      isDown: true,
    },
    {
      title: '30',
      caption: 'мин',
      description: 'Оформление за пол часа не выходя из дома',
      isDown: true,
    },
  ],
}
