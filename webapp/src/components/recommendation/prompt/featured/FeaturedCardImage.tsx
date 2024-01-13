'use client';

import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { useState } from 'react';

import { useScopedI18n } from '@/locales/client';
import type { FeaturedLocation } from '@/types/featured';

type FeaturedCardImageProps = {
  location: FeaturedLocation;
};

const FeaturedCardImage = ({ location }: FeaturedCardImageProps) => {
  const t = useScopedI18n('home.featured-place');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [, setPlaceInput] = useQueryState('place', parseAsString.withDefault(''));

  const handleImageClick = () => {
    setPlaceInput(t(`${location}`));
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
