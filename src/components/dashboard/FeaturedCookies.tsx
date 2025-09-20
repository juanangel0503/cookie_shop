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
    image: '/assets/products/Chocolate Chip Horizontal.JPG',
    category: 'Featured'
  },
  {
    id: '2',
    name: 'Semi-Sweet Chocolate Chunk Cookie',
    description: 'Chocolate chip, but make it chunky—a delicious cookie filled with irresistible semi-sweet chocolate chunks and a sprinkle of flaky sea salt.',
    image: '/assets/products/Chocolate Chip Horizontal.JPG',
    category: 'Chocolate'
  },
  {
    id: '3',
    name: 'Cinnamon Roll Cheesecake',
    description: 'Creamy cinnamon cheesecake on a cinnamon-spiced graham cracker crust, swirled with buttery cinnamon topping, and finished with cream cheese glaze and a dollop of fresh whipped cream.',
    image: '/assets/products/Cookies and Cream Horizontal.JPG',
    category: 'Dessert'
  },
  {
    id: '4',
    name: 'Raspberry Cupcake Cookie',
    description: 'A vanilla cupcake cookie topped with a decadent swirl of raspberry cream cheese frosting and a dash of white sprinkles.',
    image: '/assets/products/Variety Horizontal.JPG',
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
          padding: 4rem 0;
          background: white;
        }

        .featured-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .cookie-card {
          margin-bottom: 4rem;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cookie-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .cookie-card.featured-main {
          background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%);
          color: white;
        }

        .category-label {
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

        .cookie-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 3rem;
        }

        .cookie-image {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
        }

        .cookie-img {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .cookie-image:hover .cookie-img {
          transform: scale(1.05);
        }

        .cookie-info {
          padding: 1rem 0;
        }

        .cookie-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .featured-main .cookie-title {
          color: white;
        }

        .cookie-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #666;
        }

        .featured-main .cookie-description {
          color: rgba(255, 255, 255, 0.9);
        }

        .cookie-actions {
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

        .featured-main .learn-more-btn {
          border-color: white;
          color: white;
        }

        .learn-more-btn:hover {
          background: #E91E63;
          color: white;
          transform: translateY(-2px);
        }

        .featured-main .learn-more-btn:hover {
          background: white;
          color: #E91E63;
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

        .featured-main .order-now-btn {
          background: white;
          color: #E91E63;
        }

        .order-now-btn:hover {
          background: #C2185B;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);
        }

        .featured-main .order-now-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          color: #E91E63;
        }

        @media (max-width: 768px) {
          .featured-cookies {
            padding: 2rem 0;
          }

          .featured-container {
            padding: 0 1rem;
          }

          .cookie-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
            text-align: center;
          }

          .cookie-image {
            height: 300px;
          }

          .cookie-title {
            font-size: 2rem;
          }

          .cookie-description {
            font-size: 1rem;
          }

          .cookie-actions {
            justify-content: center;
            flex-wrap: wrap;
          }

          .category-label {
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
