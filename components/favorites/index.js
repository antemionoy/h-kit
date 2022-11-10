import { useMutation } from '@apollo/client'
import { CatalogMain, FormBasic, Modal, Toast } from 'components'
import { PATH } from 'config/path'
import { CardFull, H1 } from 'elements'
import ORDER_MUTATION from 'graphql/mutations/order.graphql'
import { useModal } from 'helpers/useModal'
import { useState } from 'react'
import { ProductGrid, Sharing } from '../../containers'

function Favorites({
  data,
  kitchens,
  materials,
  sinks,
  technics,
  ids,
  slider,
  favsPath,
  sharedSlug,
  fadeOnFavorite,
  favRemoveItemFromState,
}) {
  const [sendFormInit, { loading }] = useMutation(ORDER_MUTATION)
  const sendForm = async (e) => {
    if (!loading) {
      return await sendFormInit(e)
    }
    return 'loading'
  }
  const { title, share, modal } = data
  const { modalRef, openModal, closeModal, isModalOpen } = useModal()
  const [modalData, setModalData] = useState({
    kitchenId: null,
    kitchenName: '',
  })
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })

  const handleButtonClick = (kitchenId, kitchenName) => {
    if (!isModalOpen) {
      setModalData({ kitchenId, kitchenName })
      openModal()
    }
  }
  return (
    <>
      <main>
        <div className="main-wrapper container">
          <H1
            content={title}
            parentSelector="main-wrapper__h1 h2"
            /* icon={<Icon/>} */
          />
          {slider &&
            !kitchens?.length &&
            !materials?.length &&
            !sinks?.length &&
            !technics?.length && (
              <div className="favorites__slider">
                <CatalogMain list={slider} description={data.noFavorites} />
              </div>
            )}
          {kitchens?.length > 0 &&
            kitchens.map((item) => {
              return (
                <CardFull
                  onCommonButtonClick={handleButtonClick}
                  key={item.id}
                  data={item}
                  buttonText={data.kitchenButtonText}
                  href={`${PATH.KITCHEN}/${item.slug}`}
                  setModalData={setModalData}
                  fadeOnFavorite={fadeOnFavorite}
                  favRemoveItemFromState={favRemoveItemFromState}
                />
              )
            })}
          {materials?.length > 0 && (
            <>
              <h2 className="h2 main-wrapper__h2">{data.materials.title}</h2>
              <ProductGrid
                output={materials}
                parentSelector="product-grid--4"
                hideMore={materials.hideMore}
                isMaterials
                fadeOnFavorite={fadeOnFavorite}
                favRemoveItemFromState={favRemoveItemFromState}
                favStateCategoryName="materials"
              />
            </>
          )}
          {sinks?.length > 0 && (
            <>
              <h2 className="h2 main-wrapper__h2">{data.sinks.title}</h2>
              <ProductGrid
                output={sinks}
                parentSelector="product-grid--4"
                hideMore={sinks.hideMore}
                fadeOnFavorite={fadeOnFavorite}
                slugPath={PATH.PRODUCT_SINKS}
                favRemoveItemFromState={favRemoveItemFromState}
                favStateCategoryName="sinks"
              />
            </>
          )}
          {technics?.length > 0 && (
            <>
              <h2 className="h2 main-wrapper__h2">{data.technics.title}</h2>
              <ProductGrid
                output={technics}
                cols={data.technics.cols}
                parentSelector="product-grid--4 product-grid--big"
                hideMore={data.technics.hideMore}
                areBigCards
                fadeOnFavorite={fadeOnFavorite}
                slugPath={PATH.PRODUCT_TECHNICS}
                favRemoveItemFromState={favRemoveItemFromState}
                favStateCategoryName="technics"
              />
            </>
          )}
        </div>
        <Sharing
          favs={ids}
          sharedSlug={sharedSlug}
          path={`${favsPath}/`}
          content={share}
          setToast={setToast}
          parentSelector="sharing--green"
        />
      </main>

      <Modal
        className={isModalOpen ? 'modal--active' : ''}
        onClose={closeModal}
        parentSelector="modal-form"
        ref={modalRef}
      >
        <h2 className="h3 modal-form__title">{modal.title}</h2>
        <p className="p modal-form__info">
          {modal.text}
          {modalData.kitchenName}
        </p>
        <FormBasic
          buttonText={modal.buttonText}
          hasKitchen
          expandTitle={modal.expandTitle}
          sendForm={sendForm}
          kitchenId={modalData.kitchenId}
          toast={toast}
          setToast={setToast}
          onSubmit={closeModal}
        />
      </Modal>
      <Toast
        text={toast.text}
        isShown={toast.show}
        setIsShown={(show) => {
          setToast({ ...toast, show })
        }}
      />
    </>
  )
}

export default Favorites
