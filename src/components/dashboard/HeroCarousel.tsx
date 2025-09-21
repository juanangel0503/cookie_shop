'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  isActive?: boolean;
}

const carouselItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Semi-Sweet Chocolate Chunk Cookie',
    description: 'Chocolate chip, but make it chunky—a delicious cookie filled with irresistible semi-sweet chocolate chunks and a sprinkle of flaky sea salt.',
    image: '/assets/products/Chocolate Chip Horizontal.JPG',
    ctaText: 'Order Now'
  },
  {
    id: '2',
    title: 'Cinnamon Roll Cheesecake',
    description: 'Creamy cinnamon cheesecake on a cinnamon-spiced graham cracker crust, swirled with buttery cinnamon topping, and finished with cream cheese glaze and a dollop of fresh whipped cream.',
    image: '/assets/products/Cookies and Cream Horizontal.JPG',
    ctaText: 'Order Now'
  },
  {
    id: '3',
    title: 'Raspberry Cupcake Cookie',
    description: 'A vanilla cupcake cookie topped with a decadent swirl of raspberry cream cheese frosting and a dash of white sprinkles.',
    image: '/assets/products/Variety Horizontal.JPG',
    ctaText: 'Order Now'
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {/* Main Carousel Slide */}
        <div className="carousel-slide">
          <div className="slide-content">
            {/* Product Image - Centered and Prominent */}
            <div className="product-showcase">
              <div className="product-image-container">
                <Image
                  src={carouselItems[currentIndex].image}
                  alt={carouselItems[currentIndex].title}
                  fill
                  className="product-image"
                  priority={currentIndex === 0}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Product Info - Below the image */}
            <div className="product-info">
              <h1 className="product-title">{carouselItems[currentIndex].title}</h1>
              <p className="product-description">{carouselItems[currentIndex].description}</p>
              <button className="order-now-btn">{carouselItems[currentIndex].ctaText}</button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button className="autoplay-toggle" onClick={toggleAutoPlay}>
          {isAutoPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Week Label */}
        <div className="week-label">
          Week of Sep 16 - 21
        </div>
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 800px;
          background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%);
          overflow: hidden;
          margin-top: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          width: 100%;
          padding: 0 2rem;
          text-align: center;
        }

        .product-showcase {
          position: relative;
          margin-bottom: 3rem;
        }

        .product-image-container {
          position: relative;
          width: 600px;
          height: 500px;
          border-radius: 30px;
          overflow: hidden;
          background: white;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
        }

        .product-image-container:hover {
          transform: perspective(1000px) rotateY(-2deg) rotateX(2deg) scale(1.02);
        }

        .product-image {
          object-fit: cover !important;
          transition: transform 0.3s ease;
        }

        .product-info {
          max-width: 800px;
          color: white;
        }

        .product-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .product-description {
          font-size: 1.3rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.95;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .order-now-btn {
          background: #2c2c2c;
          border: none;
          color: white;
          padding: 18px 40px;
          border-radius: 35px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          text-transform: uppercase;
        }

        .order-now-btn:hover {
          background: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.4);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #E91E63;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 35px rgba(0,0,0,0.2);
        }

        .carousel-arrow-left {
          left: 3rem;
        }

        .carousel-arrow-right {
          right: 3rem;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 8rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          border-color: white;
          transform: scale(1.2);
        }

        .indicator:hover {
          border-color: white;
          transform: scale(1.1);
        }

        .autoplay-toggle {
          position: absolute;
          bottom: 8rem;
          right: 3rem;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .autoplay-toggle:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.1);
        }

        .week-label {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          background: #E91E63;
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        @media (max-width: 1024px) {
          .product-image-container {
            width: 500px;
            height: 400px;
          }

          .product-title {
            font-size: 3rem;
          }

          .product-description {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-carousel {
            min-height: 700px;
          }

          .slide-content {
            padding: 0 1.5rem;
          }

          .product-image-container {
            width: 400px;
            height: 320px;
            transform: none;
          }

          .product-image-container:hover {
            transform: scale(1.02);
          }

          .product-title {
            font-size: 2.5rem;
          }

          .product-description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .order-now-btn {
            padding: 16px 32px;
            font-size: 1.1rem;
          }

          .carousel-arrow {
            width: 50px;
            height: 50px;
          }

          .carousel-arrow-left {
            left: 1.5rem;
          }

          .carousel-arrow-right {
            right: 1.5rem;
          }

          .week-label {
            bottom: 1.5rem;
            font-size: 0.9rem;
            padding: 10px 16px;
          }
        }

        @media (max-width: 480px) {
          .product-image-container {
            width: 320px;
            height: 260px;
          }

          .product-title {
            font-size: 2rem;
          }

          .product-description {
            font-size: 0.95rem;
          }

          .order-now-btn {
            padding: 14px 28px;
            font-size: 1rem;
          }

          .carousel-arrow {
            width: 45px;
            height: 45px;
          }

          .carousel-arrow-left {
            left: 1rem;
          }

          .carousel-arrow-right {
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
