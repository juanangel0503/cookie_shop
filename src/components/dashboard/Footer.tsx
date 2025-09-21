'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        {/* Upper Section - Navigation and Social */}
        <div className="footer-upper">
          <div className="footer-nav">
            <div className="nav-section">
              <h4 className="nav-title">Company</h4>
              <div className="nav-links">
                <a href="/order" className="nav-link">Order</a>
                <a href="/our-story" className="nav-link">Our story</a>
                <a href="/rewards" className="nav-link">Rewards</a>
                <a href="/nutrition" className="nav-link">Nutrition & Allergy</a>
                <a href="/support" className="nav-link">Support</a>
                <a href="/gift-card-balance" className="nav-link">Gift Card Balance</a>
                <a href="/flavors" className="nav-link">Flavors</a>
                <a href="/map" className="nav-link">Map</a>
              </div>
            </div>
            
            <div className="nav-section">
              <h4 className="nav-title">Get Involved</h4>
              <div className="nav-links">
                <a href="/press" className="nav-link">Press</a>
                <a href="/collaborate" className="nav-link">Collaborate</a>
                <a href="/franchising" className="nav-link">Franchising</a>
                <a href="/franchise-jobs" className="nav-link">Franchise Store Jobs</a>
                <a href="/hq-careers" className="nav-link">HQ Careers</a>
                <a href="/crumbl-cares" className="nav-link">Crumbl Cares</a>
              </div>
            </div>
          </div>
          
          <div className="social-media">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Pinterest">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Lower Section - Logo and Legal */}
        <div className="footer-lower">
          <div className="footer-logo">
            <Image 
              src="/assets/logos/HEB-White-Logo@4x.png" 
              alt="Happily Ever Bakers" 
              width={180} 
              height={60}
              className="logo"
            />
          </div>
          
          <div className="footer-legal">
            <p className="copyright">©2024 all rights reserved.</p>
            <div className="legal-links">
              <a href="/privacy" className="legal-link">Privacy policy</a>
              <span className="separator">|</span>
              <a href="/terms" className="legal-link">Terms and Conditions</a>
              <span className="separator">|</span>
              <a href="/cookie-preferences" className="legal-link">Non-edible Cookie Preferences</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-footer {
          background: #F8BBD9;
          color: #2c2c2c;
          padding: 4rem 0 2rem;
          margin-top: 0;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        .footer-upper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 2px solid rgba(44, 44, 44, 0.1);
        }

        .footer-nav {
          display: flex;
          gap: 6rem;
        }

        .nav-section {
          display: flex;
          flex-direction: column;
        }

        .nav-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #2c2c2c;
          letter-spacing: 0.5px;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .nav-link {
          color: #2c2c2c;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          padding: 0.25rem 0;
        }

        .nav-link:hover {
          color: #E91E63;
          transform: translateX(5px);
        }

        .social-media {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .social-link {
          color: #2c2c2c;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          color: #E91E63;
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.2);
        }

        .footer-lower {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 60px;
          width: auto;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
        }

        .footer-legal {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }

        .copyright {
          font-size: 1rem;
          color: #2c2c2c;
          margin: 0;
          font-weight: 500;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legal-link {
          color: #2c2c2c;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          padding: 0.25rem 0;
        }

        .legal-link:hover {
          color: #E91E63;
        }

        .separator {
          color: #2c2c2c;
          font-size: 1rem;
          font-weight: 300;
        }

        @media (max-width: 1024px) {
          .footer-container {
            padding: 0 2rem;
          }

          .footer-nav {
            gap: 4rem;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 0 1.5rem;
          }

          .footer-upper {
            flex-direction: column;
            gap: 3rem;
            margin-bottom: 3rem;
          }

          .footer-nav {
            flex-direction: column;
            gap: 3rem;
          }

          .nav-links {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .social-media {
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .footer-lower {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .footer-legal {
            align-items: center;
          }

          .legal-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .logo {
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 1rem;
          }

          .nav-links {
            flex-direction: column;
            gap: 0.75rem;
          }

          .legal-links {
            flex-direction: column;
            gap: 0.5rem;
          }

          .separator {
            display: none;
          }

          .logo {
            height: 45px;
          }
        }
      `}</style>
    </footer>
  );
}
