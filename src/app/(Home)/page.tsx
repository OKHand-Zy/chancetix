import CarouselSlide from '@/components/scrollAcShow/carouselslide';
import React from 'react';


const Home: React.FC = () => {
  return (
    <>
      <main className="bg-gray-400 flex h-full flex-col items-center justify-center p-24 ">
        <div>
          <CarouselSlide />
        </div>
      </main>
    </>
  );
}

export default Home;