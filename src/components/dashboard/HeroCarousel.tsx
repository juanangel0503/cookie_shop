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
            <div className="slide-image">
              <Image
                src={carouselItems[currentIndex].image}
                alt={carouselItems[currentIndex].title}
                fill
                className="carousel-image"
                priority={currentIndex === 0}
              />
            </div>
            <div className="slide-info">
              <h1 className="slide-title">{carouselItems[currentIndex].title}</h1>
              <p className="slide-description">{carouselItems[currentIndex].description}</p>
              <div className="slide-actions">
                <button className="learn-more-btn">Learn More</button>
                <button className="order-now-btn">{carouselItems[currentIndex].ctaText}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
          <span>‹</span>
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
          <span>›</span>
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
          {isAutoPlaying ? '⏸️' : '▶️'}
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
          min-height: 600px;
          background: #f8f9fa;
          overflow: hidden;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
          padding: 0 2rem;
          align-items: center;
        }

        .slide-image {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .carousel-image {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .slide-image:hover .carousel-image {
          transform: scale(1.05);
        }

        .slide-info {
          padding: 2rem 0;
        }

        .slide-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #2c2c2c;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .slide-description {
          font-size: 1.2rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .slide-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .learn-more-btn {
          background: transparent;
          border: 2px solid #E91E63;
          color: #E91E63;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .learn-more-btn:hover {
          background: #E91E63;
          color: white;
          transform: translateY(-2px);
        }

        .order-now-btn {
          background: #E91E63;
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .order-now-btn:hover {
          background: #C2185B;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.5rem;
          color: #E91E63;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .carousel-arrow-left {
          left: 2rem;
        }

        .carousel-arrow-right {
          right: 2rem;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #E91E63;
          transform: scale(1.2);
        }

        .indicator:hover {
          background: rgba(233, 30, 99, 0.7);
        }

        .autoplay-toggle {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .autoplay-toggle:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.1);
        }

        .week-label {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: #E91E63;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .slide-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1rem;
            text-align: center;
          }

          .slide-title {
            font-size: 2.5rem;
          }

          .slide-description {
            font-size: 1rem;
          }

          .slide-actions {
            justify-content: center;
            flex-wrap: wrap;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .carousel-arrow-left {
            left: 1rem;
          }

          .carousel-arrow-right {
            right: 1rem;
          }

          .week-label {
            top: 1rem;
            left: 1rem;
            font-size: 0.8rem;
            padding: 6px 12px;
          }
        }
      `}</style>
    </div>
  );
}
