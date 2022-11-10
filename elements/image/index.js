import React, { forwardRef } from 'react'
import { LazyLoadImage } from 'lib/LazyLoadImage'
const Image = forwardRef(({ ...props }, ref) => {
  return <LazyLoadImage {...props} threshold={300} effect="opacity" />
})

export default Image
