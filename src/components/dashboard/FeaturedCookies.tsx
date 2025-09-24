'use client';

import Image from 'next/image';

interface FeaturedCookie {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const featuredCookies: FeaturedCookie[] = [
  {
    id: '1',
    name: 'National Flavors',
    description: 'Our signature collection of cookies that are always available',
    image: '/images/products/chocolate-chip-horizontal.jpg',
    category: 'Featured'
  },
  {
    id: '2',
    name: 'Semi-Sweet Chocolate Chunk Cookie',
    description: 'Chocolate chip, but make it chunky—a delicious cookie filled with irresistible semi-sweet chocolate chunks and a sprinkle of flaky sea salt.',
    image: '/images/products/chocolate-chip-horizontal.jpg',
    category: 'Chocolate'
  },
  {
    id: '3',
    name: 'Cinnamon Roll Cheesecake',
    description: 'Creamy cinnamon cheesecake on a cinnamon-spiced graham cracker crust, swirled with buttery cinnamon topping, and finished with cream cheese glaze and a dollop of fresh whipped cream.',
    image: '/images/products/cookies-cream-horizontal.jpg',
    category: 'Dessert'
  },
  {
    id: '4',
    name: 'Raspberry Cupcake Cookie',
    description: 'A vanilla cupcake cookie topped with a decadent swirl of raspberry cream cheese frosting and a dash of white sprinkles.',
    image: '/images/products/variety-horizontal.jpg',
    category: 'Fruity'
  }
];

export default function FeaturedCookies() {
  return (
    <div className="featured-cookies">
      <div className="featured-container">
        {featuredCookies.map((cookie, index) => (
          <div key={cookie.id} className={`cookie-card ${index === 0 ? 'featured-main' : ''}`}>
            {index === 0 && (
              <div className="category-label">
                {cookie.category}
              </div>
            )}
            
            <div className="cookie-content">
              <div className="cookie-image">
                <Image
                  src={cookie.image}
                  alt={cookie.name}
                  fill
                  className="cookie-img"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="cookie-info">
                <h2 className="cookie-title">{cookie.name}</h2>
                <p className="cookie-description">{cookie.description}</p>
                <div className="cookie-actions">
                  <button className="learn-more-btn">Learn More</button>
                  <button className="order-now-btn">Order Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .featured-cookies {
          --tw-bg-opacity: 1;
          padding: 6rem 0;
          background: white;
        }

        .featured-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        .cookie-card {
          margin-bottom: 5rem;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .cookie-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }

        .cookie-card.featured-main {
          background: linear-gradient(135deg, rgb(255 185 205/var(--tw-bg-opacity)) 0%, rgb(255 185 205/var(--tw-bg-opacity)) 100%);
          color: white;
        }

        .category-label {
          position: absolute;
          top: 2.5rem;
          left: 2.5rem;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .cookie-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 4rem;
        }

        .cookie-image {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          background: white;
        }

        .cookie-img {
          object-fit: cover !important;
          transition: transform 0.3s ease;
        }

        .cookie-image:hover .cookie-img {
          transform: scale(1.05);
        }

        .cookie-info {
          padding: 1rem 0;
        }

        .cookie-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 2rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .featured-main .cookie-title {
          color: white;
        }

        .cookie-description {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 3rem;
          color: #666;
        }

        .featured-main .cookie-description {
          color: rgba(255, 255, 255, 0.9);
        }

        .cookie-actions {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .learn-more-btn {
          background: transparent;
          border: 2px solid rgb(255 185 205/var(--tw-bg-opacity));
          color: rgb(255 185 205/var(--tw-bg-opacity));
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .featured-main .learn-more-btn {
          border-color: white;
          color: white;
        }

        .learn-more-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);
        }

        .featured-main .learn-more-btn:hover {
          background: white;
          color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .order-now-btn {
          background: rgb(255 185 205/var(--tw-bg-opacity));
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

        .featured-main .order-now-btn {
          background: white;
          color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .order-now-btn:hover {
          background: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
        }

        .featured-main .order-now-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        @media (max-width: 1024px) {
          .featured-container {
            padding: 0 2rem;
          }

          .cookie-content {
            gap: 3rem;
            padding: 3rem;
          }

          .cookie-image {
            height: 400px;
          }

          .cookie-title {
            font-size: 2.5rem;
          }

          .cookie-description {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 768px) {
          .featured-cookies {
          --tw-bg-opacity: 1;
            padding: 4rem 0;
          }

          .featured-container {
            padding: 0 1.5rem;
          }

          .cookie-card {
            margin-bottom: 3rem;
          }

          .cookie-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2.5rem;
            text-align: center;
          }

          .cookie-image {
            height: 350px;
            order: 1;
          }

          .cookie-info {
            order: 2;
            padding: 0;
          }

          .cookie-title {
            font-size: 2.2rem;
          }

          .cookie-description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .cookie-actions {
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .category-label {
            top: 1.5rem;
            left: 1.5rem;
            font-size: 0.9rem;
            padding: 10px 16px;
          }
        }

        @media (max-width: 480px) {
          .featured-container {
            padding: 0 1rem;
          }

          .cookie-content {
            padding: 2rem;
          }

          .cookie-image {
            height: 300px;
          }

          .cookie-title {
            font-size: 1.8rem;
          }

          .cookie-description {
            font-size: 0.95rem;
          }

          .learn-more-btn,
          .order-now-btn {
            padding: 14px 28px;
            font-size: 1rem;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}
