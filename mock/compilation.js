export default {
  title: 'Подборка',
  compilation: {
    title: 'Подборка кухонь в скандинавском стиле',
    image: {
      path: {
        normal: '/images/compilation-main.png',
        retina: '/images/compilation-main.png',
      },
    },
    text:
      'Если вы находитесь в стадии ремонта кухни или просто любите скандинавский стиль - вам сюда! Мы собрали все кухни в скандинавском стиле в одной подборке.',
  },
  nextCompilation: {
    // parentSelector: 'filter-grid__compilation container',
    caption: 'подборка',
    title: 'Кухни из натурального дерева',
    description:
      'Кухонный гарнитур из натурального дерева гарантирует помещению особую атмосферу и уют',
    buttonText: 'Смотреть подборку',
    href: '/',
    list: [
      {
        __typename: 'Kitchen',
        id: 1,
        title: 'Morke',
        slug: 'morke',
        price: 192000,
        discount_price: 185000,
        preview: {
          __typename: 'Image',
          id: 24,
          path: {
            __typename: 'ImagePath',
            normal:
              'https://api.develop.heime.d.nimax.ru/storage/resize/rz3/530x706_rZ3tCFYLulEWzToGiXaKcmoxyvMkFaWtBpSTivpL.jpeg',
            retina:
              'https://api.develop.heime.d.nimax.ru/storage/resize/rz3/1060x1412_rZ3tCFYLulEWzToGiXaKcmoxyvMkFaWtBpSTivpL.jpeg',
          },
        },
      },
      {
        __typename: 'Kitchen',
        id: 2,
        title: 'Sokkel',
        slug: 'sokkel',
        price: 182000,
        discount_price: null,
        preview: {
          __typename: 'Image',
          id: 26,
          path: {
            __typename: 'ImagePath',
            normal:
              'https://api.develop.heime.d.nimax.ru/storage/resize/atx/530x706_aTxMBYKdGwbVJ0mxGxaMEI4sNdBiCtnNc76wvkSH.jpeg',
            retina:
              'https://api.develop.heime.d.nimax.ru/storage/resize/atx/1060x1412_aTxMBYKdGwbVJ0mxGxaMEI4sNdBiCtnNc76wvkSH.jpeg',
          },
        },
      },
    ],
    isReverse: false,
  },
  sort: [
    {
      name: 'Сортировать по возрастанию цены',
      slug: 'price-asc',
    },
    {
      name: 'Сортировать по убыванию цены',
      slug: 'price-desc',
    },
  ],
  kitchens: [
    {
      __typename: 'Kitchen',
      id: 1,
      title: 'Morke',
      slug: 'morke',
      discount_price: 185000,
      price: 192000,
      preview: {
        __typename: 'Image',
        id: 24,
        path: {
          __typename: 'ImagePath',
          normal:
            'https://api.develop.heime.d.nimax.ru/storage/resize/rz3/530x706_rZ3tCFYLulEWzToGiXaKcmoxyvMkFaWtBpSTivpL.jpeg',
          retina:
            'https://api.develop.heime.d.nimax.ru/storage/resize/rz3/1060x1412_rZ3tCFYLulEWzToGiXaKcmoxyvMkFaWtBpSTivpL.jpeg',
        },
      },
      tags: [
        {
          __typename: 'Tag',
          id: 1,
          name: 'Светлые кухни',
          slug: 'svetlye-kuhni',
        },
        {
          __typename: 'Tag',
          id: 2,
          name: 'Из дерева',
          slug: 'iz-dereva',
        },
        {
          __typename: 'Tag',
          id: 5,
          name: 'Эко-кухни',
          slug: 'eko-kuhni',
        },
        {
          __typename: 'Tag',
          id: 7,
          name: 'Камень',
          slug: 'kamen',
        },
        {
          __typename: 'Tag',
          id: 9,
          name: 'Для студий',
          slug: 'dlya-studiy',
        },
        {
          __typename: 'Tag',
          id: 10,
          name: 'Кухни для вечеринок',
          slug: 'kuhni-dlya-vecherinok',
        },
      ],
      sliders: [
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 36,
            name: '7qc1J57hgEGYk7UNszup3NGH1QnV8TuW07WONYZG.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/7qc/1440x700_7qc1J57hgEGYk7UNszup3NGH1QnV8TuW07WONYZG.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/7qc/2880x1400_7qc1J57hgEGYk7UNszup3NGH1QnV8TuW07WONYZG.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 37,
            name: 'm3nzkckKBsWPFYS65lcNy7NtWY3ifLF9lMewxGhf.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/m3n/1440x700_m3nzkckKBsWPFYS65lcNy7NtWY3ifLF9lMewxGhf.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/m3n/2880x1400_m3nzkckKBsWPFYS65lcNy7NtWY3ifLF9lMewxGhf.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 38,
            name: 'K9EpucCguoncNfmInjT6WL2okV9pfBzB6rW1Q6DA.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/k9e/1440x700_K9EpucCguoncNfmInjT6WL2okV9pfBzB6rW1Q6DA.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/k9e/2880x1400_K9EpucCguoncNfmInjT6WL2okV9pfBzB6rW1Q6DA.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 39,
            name: 'NblEbfXlRiWjWBDlM5QkiTO7SrpjkWyM4sPclQId.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/nbl/1440x700_NblEbfXlRiWjWBDlM5QkiTO7SrpjkWyM4sPclQId.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/nbl/2880x1400_NblEbfXlRiWjWBDlM5QkiTO7SrpjkWyM4sPclQId.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 40,
            name: 'RGijuUlxzcP4mMoXXwtm7Q7SRLEckgq7PyZkruHA.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rgi/1440x700_RGijuUlxzcP4mMoXXwtm7Q7SRLEckgq7PyZkruHA.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rgi/2880x1400_RGijuUlxzcP4mMoXXwtm7Q7SRLEckgq7PyZkruHA.jpeg',
            },
          },
          video: null,
        },
      ],
    },
    {
      __typename: 'Kitchen',
      id: 2,
      title: 'Sokkel',
      slug: 'sokkel',
      discount_price: null,
      price: 182000,
      preview: {
        __typename: 'Image',
        id: 26,
        path: {
          __typename: 'ImagePath',
          normal:
            'https://api.develop.heime.d.nimax.ru/storage/resize/atx/530x706_aTxMBYKdGwbVJ0mxGxaMEI4sNdBiCtnNc76wvkSH.jpeg',
          retina:
            'https://api.develop.heime.d.nimax.ru/storage/resize/atx/1060x1412_aTxMBYKdGwbVJ0mxGxaMEI4sNdBiCtnNc76wvkSH.jpeg',
        },
      },
      tags: [
        {
          __typename: 'Tag',
          id: 2,
          name: 'Из дерева',
          slug: 'iz-dereva',
        },
        {
          __typename: 'Tag',
          id: 5,
          name: 'Эко-кухни',
          slug: 'eko-kuhni',
        },
        {
          __typename: 'Tag',
          id: 6,
          name: 'Кухни для студий',
          slug: 'kuhni-dlya-studiy',
        },
        {
          __typename: 'Tag',
          id: 9,
          name: 'Для студий',
          slug: 'dlya-studiy',
        },
        {
          __typename: 'Tag',
          id: 13,
          name: 'Если в доме животное',
          slug: 'esli-v-dome-zhivotnoe',
        },
      ],
      sliders: [
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 44,
            name: 'rdb9qrABKBdfDHRDK1BT4zxIk31Q0UjwW7Qo46yw.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rdb/1440x700_rdb9qrABKBdfDHRDK1BT4zxIk31Q0UjwW7Qo46yw.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rdb/2880x1400_rdb9qrABKBdfDHRDK1BT4zxIk31Q0UjwW7Qo46yw.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 45,
            name: 'z3q2NJhCtlDqUPgJ8ILRAEUAGpJNqHry0bFeVFlm.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/z3q/1440x700_z3q2NJhCtlDqUPgJ8ILRAEUAGpJNqHry0bFeVFlm.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/z3q/2880x1400_z3q2NJhCtlDqUPgJ8ILRAEUAGpJNqHry0bFeVFlm.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 46,
            name: 'W94zZKzklirFPt5mnNOaOLMjF494Hc5Dr0hRtMbD.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/w94/1440x700_W94zZKzklirFPt5mnNOaOLMjF494Hc5Dr0hRtMbD.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/w94/2880x1400_W94zZKzklirFPt5mnNOaOLMjF494Hc5Dr0hRtMbD.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 47,
            name: 'CsnwYc90uODUusjfD7BuVUXngNWs1zdhnb4IJSUR.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/csn/1440x700_CsnwYc90uODUusjfD7BuVUXngNWs1zdhnb4IJSUR.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/csn/2880x1400_CsnwYc90uODUusjfD7BuVUXngNWs1zdhnb4IJSUR.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 48,
            name: 'Ppcd6E8Wk9SfF4Dj9LruIVfyQtfw68dy0wy3hzp4.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/ppc/1440x700_Ppcd6E8Wk9SfF4Dj9LruIVfyQtfw68dy0wy3hzp4.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/ppc/2880x1400_Ppcd6E8Wk9SfF4Dj9LruIVfyQtfw68dy0wy3hzp4.jpeg',
            },
          },
          video: null,
        },
      ],
    },
    {
      __typename: 'Kitchen',
      id: 3,
      title: 'Trang',
      slug: 'trang',
      discount_price: null,
      price: 240000,
      preview: {
        __typename: 'Image',
        id: 28,
        path: {
          __typename: 'ImagePath',
          normal:
            'https://api.develop.heime.d.nimax.ru/storage/resize/vif/530x706_VIfpFaFNGy6rw47tS8OqdZ7xJTvrkyQkWfkcOz9y.jpeg',
          retina:
            'https://api.develop.heime.d.nimax.ru/storage/resize/vif/1060x1412_VIfpFaFNGy6rw47tS8OqdZ7xJTvrkyQkWfkcOz9y.jpeg',
        },
      },
      tags: [
        {
          __typename: 'Tag',
          id: 1,
          name: 'Светлые кухни',
          slug: 'svetlye-kuhni',
        },
        {
          __typename: 'Tag',
          id: 6,
          name: 'Кухни для студий',
          slug: 'kuhni-dlya-studiy',
        },
        {
          __typename: 'Tag',
          id: 8,
          name: 'Маленькие кухни',
          slug: 'malenkie-kuhni',
        },
        {
          __typename: 'Tag',
          id: 11,
          name: 'Для холостяков',
          slug: 'dlya-holostyakov',
        },
      ],
      sliders: [
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 52,
            name: 'TLoS9rCZGISQmqbzYwyec6bBA5k62A7KOVQmENaN.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/tlo/1440x700_TLoS9rCZGISQmqbzYwyec6bBA5k62A7KOVQmENaN.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/tlo/2880x1400_TLoS9rCZGISQmqbzYwyec6bBA5k62A7KOVQmENaN.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 53,
            name: '0albG21T0IsCzbdOyTsoSOIYrDsOJ3ui38LYujJW.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/0al/1440x700_0albG21T0IsCzbdOyTsoSOIYrDsOJ3ui38LYujJW.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/0al/2880x1400_0albG21T0IsCzbdOyTsoSOIYrDsOJ3ui38LYujJW.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 54,
            name: 'MrN3322U7zPvQebBLDY0e177Jzp1bsU9hiaBwmBG.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/mrn/1440x700_MrN3322U7zPvQebBLDY0e177Jzp1bsU9hiaBwmBG.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/mrn/2880x1400_MrN3322U7zPvQebBLDY0e177Jzp1bsU9hiaBwmBG.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 55,
            name: 'RHt3qNLNdEzsktwdH0H1iwJV7XUETFokdF1CDu6q.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rht/1440x700_RHt3qNLNdEzsktwdH0H1iwJV7XUETFokdF1CDu6q.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rht/2880x1400_RHt3qNLNdEzsktwdH0H1iwJV7XUETFokdF1CDu6q.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 56,
            name: 'LRgICB1sRLLvWdarb8vnLyEY48Mr3lCl3ifOOGaI.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/lrg/1440x700_LRgICB1sRLLvWdarb8vnLyEY48Mr3lCl3ifOOGaI.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/lrg/2880x1400_LRgICB1sRLLvWdarb8vnLyEY48Mr3lCl3ifOOGaI.jpeg',
            },
          },
          video: null,
        },
      ],
    },
    {
      __typename: 'Kitchen',
      id: 4,
      title: 'Spesiell',
      slug: 'spesiell',
      discount_price: 130000,
      price: 148000,
      preview: {
        __typename: 'Image',
        id: 30,
        path: {
          __typename: 'ImagePath',
          normal:
            'https://api.develop.heime.d.nimax.ru/storage/resize/mkp/530x706_mKpe1lPC4UZQkWrLNtTpafMeEOb7zQpxKYPm9Jvd.jpeg',
          retina:
            'https://api.develop.heime.d.nimax.ru/storage/resize/mkp/1060x1412_mKpe1lPC4UZQkWrLNtTpafMeEOb7zQpxKYPm9Jvd.jpeg',
        },
      },
      tags: [
        {
          __typename: 'Tag',
          id: 1,
          name: 'Светлые кухни',
          slug: 'svetlye-kuhni',
        },
        {
          __typename: 'Tag',
          id: 6,
          name: 'Кухни для студий',
          slug: 'kuhni-dlya-studiy',
        },
        {
          __typename: 'Tag',
          id: 8,
          name: 'Маленькие кухни',
          slug: 'malenkie-kuhni',
        },
        {
          __typename: 'Tag',
          id: 11,
          name: 'Для холостяков',
          slug: 'dlya-holostyakov',
        },
      ],
      sliders: [
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 60,
            name: 'vIugfiNRTfcov9NvjDoPDCCPkUV7M78TW6FXndRb.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/viu/1440x700_vIugfiNRTfcov9NvjDoPDCCPkUV7M78TW6FXndRb.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/viu/2880x1400_vIugfiNRTfcov9NvjDoPDCCPkUV7M78TW6FXndRb.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 61,
            name: 'H4HXke9NFCmJV6pKkTmRG2O71z1VcfWAjNFeceWe.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/h4h/1440x700_H4HXke9NFCmJV6pKkTmRG2O71z1VcfWAjNFeceWe.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/h4h/2880x1400_H4HXke9NFCmJV6pKkTmRG2O71z1VcfWAjNFeceWe.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 62,
            name: 'rDuwjIyIi8gHDnwdaY9RvrkU4uuzmFW7KzZXtbZv.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rdu/1440x700_rDuwjIyIi8gHDnwdaY9RvrkU4uuzmFW7KzZXtbZv.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/rdu/2880x1400_rDuwjIyIi8gHDnwdaY9RvrkU4uuzmFW7KzZXtbZv.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 63,
            name: 'jgqnt3o2nIueK1FfRsGhkkEYBoD9hNb21yUoA1I9.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/jgq/1440x700_jgqnt3o2nIueK1FfRsGhkkEYBoD9hNb21yUoA1I9.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/jgq/2880x1400_jgqnt3o2nIueK1FfRsGhkkEYBoD9hNb21yUoA1I9.jpeg',
            },
          },
          video: null,
        },
        {
          __typename: 'Slider',
          image: {
            __typename: 'Image',
            id: 64,
            name: 'FdDLi52xfhiBuqfl4jBfxNAftXZDMMMxob6PVRzP.jpeg',
            path: {
              __typename: 'ImagePath',
              normal:
                'https://api.develop.heime.d.nimax.ru/storage/resize/fdd/1440x700_FdDLi52xfhiBuqfl4jBfxNAftXZDMMMxob6PVRzP.jpeg',
              retina:
                'https://api.develop.heime.d.nimax.ru/storage/resize/fdd/2880x1400_FdDLi52xfhiBuqfl4jBfxNAftXZDMMMxob6PVRzP.jpeg',
            },
          },
          video: null,
        },
      ],
    },
  ],
  backTo: { href: '/catalog/kitchens', title: 'Каталог' },
  order: { title: 'Или просто позовите нашего дизайнера, он все устроит' },
}
