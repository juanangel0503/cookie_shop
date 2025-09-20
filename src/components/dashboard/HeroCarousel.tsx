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
          min-height: 700px;
          background: #f8f9fa;
          overflow: hidden;
          margin-top: 80px;
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
          gap: 5rem;
          max-width: 1400px;
          width: 100%;
          padding: 0 3rem;
          align-items: center;
        }

        .slide-image {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          background: white;
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
          font-size: 4rem;
          font-weight: 800;
          color: #2c2c2c;
          margin-bottom: 2rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .slide-description {
          font-size: 1.3rem;
          color: #666;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 550px;
        }

        .slide-actions {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .learn-more-btn {
          background: transparent;
          border: 2px solid #E91E63;
          color: #E91E63;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .learn-more-btn:hover {
          background: #E91E63;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);
        }

        .order-now-btn {
          background: #E91E63;
          border: none;
          color: white;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .order-now-btn:hover {
          background: #C2185B;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.8rem;
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
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
        }

        .indicator {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #E91E63;
          transform: scale(1.3);
        }

        .indicator:hover {
          background: rgba(233, 30, 99, 0.8);
          transform: scale(1.2);
        }

        .autoplay-toggle {
          position: absolute;
          bottom: 3rem;
          right: 3rem;
          background: rgba(0, 0, 0, 0.8);
          border: none;
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .autoplay-toggle:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.1);
        }

        .week-label {
          position: absolute;
          top: 3rem;
          left: 3rem;
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
          .slide-content {
            gap: 3rem;
            padding: 0 2rem;
          }

          .slide-image {
            height: 500px;
          }

          .slide-title {
            font-size: 3rem;
          }

          .slide-description {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-carousel {
            min-height: 600px;
          }

          .slide-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1.5rem;
            text-align: center;
          }

          .slide-image {
            height: 400px;
            order: 1;
          }

          .slide-info {
            order: 2;
            padding: 1rem 0;
          }

          .slide-title {
            font-size: 2.5rem;
          }

          .slide-description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .slide-actions {
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .carousel-arrow {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .carousel-arrow-left {
            left: 1.5rem;
          }

          .carousel-arrow-right {
            right: 1.5rem;
          }

          .week-label {
            top: 1.5rem;
            left: 1.5rem;
            font-size: 0.9rem;
            padding: 10px 16px;
          }
        }

        @media (max-width: 480px) {
          .slide-title {
            font-size: 2rem;
          }

          .slide-description {
            font-size: 0.95rem;
          }

          .learn-more-btn,
          .order-now-btn {
            padding: 14px 28px;
            font-size: 1rem;
          }

          .carousel-arrow {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
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
