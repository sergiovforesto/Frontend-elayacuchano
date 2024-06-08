'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '@/app/styles/slider.css';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { PostImage } from '../posts/post-image';

interface ImageObject {
    id: string;
    url: string;
    postId: string;
}

export const SliderMobile = ({ images }: { images: ImageObject[] }) => {
    return (
        <>
            <Swiper
                style={{
                    width: '100%',
                    height: '500px',

                }}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {
                    images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <PostImage
                                src={image.url}
                                width={400}
                                height={500}
                                alt={image.id}
                                className='rounded-t-md'
                            />

                        </SwiperSlide>
                    ))
                }


            </Swiper>


        </>
    )
}
