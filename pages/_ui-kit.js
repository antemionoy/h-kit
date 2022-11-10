import {
  CardAdvice,
  CardHorizontal,
  CardPreview,
  CardProcess,
  CardSpecial,
  CardThumbnail,
  CardVertical,
  CommonButton,
  ControlButton,
  H1,
  H2,
  H4,
  H5,
  Input,
  P,
  PairButton,
  PlayButton, Image } from 'elements'
import { useState } from 'react'

function UiKit() {
  const [value, setValue] = useState('')
  return (
    <>
      <div className="ui-kit">
        <section className="ui-kit__section">
          <h1 className="ui-kit__title">Типографика</h1>
          <div className="ui-kit__block">
            <H1 content="Заголовок основных блоков" />
          </div>
          <div className="ui-kit__block">
            <H2 content="Бесплатный выезд дизайнера" />
          </div>
          <div className="ui-kit__block">
            <H4 content="Названия статей и товаров" />
          </div>
          <div className="ui-kit__block">
            <H5 content="Акции и скидки" />
          </div>
          <div className="ui-kit__block ui-kit__block--paragraph">
            <P content="Поможем подобрать технику, которая идеально впишется в интерьер вашей новой кухни. Предлагаем оптимальные по стоимости варианты от проверенных поставщиков" />
          </div>
          <div className="ui-kit__block ui-kit__block--paragraph">
            <P
              content="Поможем подобрать технику, которая идеально впишется в интерьер вашей новой кухни. Предлагаем оптимальные по стоимости варианты от проверенных поставщиков"
              isTight
            />
          </div>
        </section>
        <section className="ui-kit__section">
          <h1 className="ui-kit__title">Кнопки</h1>
          <div className="ui-kit__block">
            <CommonButton content="Normal" />
          </div>
          <div className="ui-kit__block">
            <CommonButton content="Disabled" isDisabled />
          </div>
          <div className="ui-kit__block">
            <CommonButton content="Normal wide" isWide />
          </div>
          <div className="ui-kit__block">
            <CommonButton content="Wide disable" isDisabled isWide />
          </div>
          <div className="ui-kit__block">
            <PairButton content="Pair common" />
          </div>
          <div className="ui-kit__block">
            <PairButton content="Pair disabled" isDisabled />
          </div>
          <div className="ui-kit__block">
            <PlayButton />
          </div>
          <div className="ui-kit__block">
            <PlayButton isDisabled />
          </div>
        </section>
        <section className="ui-kit__section ui-kit__section--gray">
          <div className="ui-kit__block">
            <ControlButton isCircle />
          </div>
          <div className="ui-kit__block">
            <ControlButton isCircle isDisabled />
          </div>
          <div className="ui-kit__block">
            <ControlButton />
          </div>
          <div className="ui-kit__block">
            <ControlButton isDisabled />
          </div>
          <div className="ui-kit__block">
            <ControlButton isGray />
          </div>
          <div className="ui-kit__block">
            <ControlButton isGray isDisabled />
          </div>
        </section>
        <section className="ui-kit__section ui-kit__section--white">
          <h1 className="ui-kit__title">Карточки</h1>
          <CardVertical
            title="Spesiell"
            price="от 182 000 ₽"
            src="/images/card-vertical.jpg"
          />
          <CardVertical isLoading />
          <CardHorizontal
            title="Eiketre"
            price="от 182 000 ₽"
            src="/images/card-horizontal.jpg"
          />
          <CardHorizontal isLoading />
          <CardThumbnail
            note="популярное"
            title="Кухня-гостиная для вечеринок"
            src="/images/card-thumbnail.jpg"
          />
          <CardThumbnail isLoading />
          <CardSpecial
            note="акция"
            title="Смеситель в подарок при покупке мойки"
            description="При заказе кухни с двойной мойкой смеситель — в подарок."
            src="/images/card-special.jpg"
          />
          <CardSpecial isLoading />
          <CardPreview
            note="проекты"
            title="Кухня в скандинавском стиле"
            description="Легкость и простота форм, открытое пространство и много света. Рассказываем секреты проекта."
            src="/images/card-preview.jpg"
          />
          <CardPreview isLoading />
          <CardAdvice
            note="советы"
            title="Дерево или камень: выбираем столешницу"
            description="Пять практических советов о том, как правильно выбрать столешницу для кухни."
            src="/images/card-advice.jpg"
          />
          <CardAdvice isLoading />
          <CardProcess
            index={1}
            title="Дерево или камень: выбираем столешницу"
            description="Пять практических советов о том, как правильно выбрать столешницу для кухни."
            src="/images/card-advice.jpg"
          />
          <CardProcess isLoading />
          <Input
            placeholder="Имя"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <Input
            placeholder="E-mail"
            value="asdsad,asd"
            isError
            errorText="Введите корректный e-mail"
            type="email"
          />
        </section>
      </div>
    </>
  )
}

export default UiKit
