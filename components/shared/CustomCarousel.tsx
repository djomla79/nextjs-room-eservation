import { useState } from 'react';
import { Image } from '@nextui-org/react';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/20/solid';

type CustomCarouselProps = {
  images: string[] | undefined;
};

const CustomCarousel = ({ images }: CustomCarouselProps) => {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0 && images !== undefined) setCurrent(images.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (images !== undefined && current === images.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className='overflow-hidden relative'>
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images !== undefined &&
          images.map((image, index) => {
            return <Image key={image} src={image} alt={image} />;
          })}
      </div>

      <div className='absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl'>
        <button onClick={previousSlide}>
          <ArrowLeftCircleIcon className='w-6' />
        </button>
        <button onClick={nextSlide}>
          <ArrowRightCircleIcon className='w-6' />
        </button>
      </div>

      <div className='absolute bottom-0 py-4 flex justify-center gap-3 w-full'>
        {images !== undefined &&
          images.map((_, index) => {
            return (
              <div
                onClick={() => {
                  setCurrent(index);
                }}
                key={'circle' + index}
                className={`rounded-full w-5 h-5 cursor-pointer  ${
                  index == current ? 'bg-[#7bf230]' : 'bg-gray-500'
                }`}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomCarousel;
