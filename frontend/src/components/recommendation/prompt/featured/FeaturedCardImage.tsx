'use client';

import { Skeleton } from '@mui/material';
import Image from 'next/image';
import createTranslation from 'next-translate/useTranslation';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { useState } from 'react';

const FeaturedCardImage = ({ location }: { location: string }) => {
  const { t } = createTranslation('home');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [, setPlaceInput] = useQueryState('place', parseAsString.withDefault(''));

  const handleImageClick = () => {
    setPlaceInput(t(`featured.place.${location}`));
  };

  return (
    <>
      {!isImageLoaded && <Skeleton variant="rectangular" width={200} height={200} />}
      <Image
        unoptimized
        src={`/images/featured/${location}.jpg`}
        alt={location}
        height={200}
        width={200}
        quality={10}
        priority
        onLoad={() => setIsImageLoaded(true)}
        onClick={handleImageClick}
      />
    </>
  );
};

export default FeaturedCardImage;
