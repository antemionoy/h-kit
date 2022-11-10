import { Map as Mapcomp, Placemark, YMaps } from 'react-yandex-maps'

export default function Map({
  width,
  height,
  center,
  markers,
  zoom,
  removeHowToGetThereButton,
}) {
  return (
    <>
      <YMaps query={{ load: 'package.full' }}>
        <Mapcomp
          width={width}
          height={height}
          state={{
            center: [center.lat, center.lng],
            zoom,
            controls: [],
          }}
          modules={['layout.Image']}
          options={{ suppressMapOpenBlock: removeHowToGetThereButton }}
        >
          {markers?.length > 0 &&
            markers.map((marker) => (
              <Placemark
                key={marker.id}
                geometry={[marker.coordinates.lat, marker.coordinates.lng]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: 'icons/icon-placemark.svg',
                  iconImageSize: [38, 39],
                  iconImageOffset: [-20, -35],
                }}
              />
            ))}
        </Mapcomp>
      </YMaps>
    </>
  )
}
