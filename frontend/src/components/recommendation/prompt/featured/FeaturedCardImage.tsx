'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@mui/material';

const FeaturedCardImage = ({ location }: { location: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
      />
    </>
  );
};

export default FeaturedCardImage;
