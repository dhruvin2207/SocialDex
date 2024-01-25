import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import preImage from '../assets/preImage.jpg'

const ImageComponent = ({ image }) => {
    

  return (
    <LazyLoadImage
    // alt={image.alt}
    
    // placeholderSrc={preImage}
    effect="blur"
    // height={50}
    src={image} />
  )
}

export default ImageComponent
