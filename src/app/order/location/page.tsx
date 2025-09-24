'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';

// Mock location data - in real app this would come from API
const locations = [
  {
    id: 1,
    name: "Dimond",
    address: "1234 Dimond Blvd",
    city: "Anchorage",
    state: "AK",
    zip: "99515",
    phone: "(907) 555-0123",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 2,
    name: "Tikahtnu Commons",
    address: "5678 Tikahtnu Dr",
    city: "Anchorage", 
    state: "AK",
    zip: "99518",
    phone: "(907) 555-0456",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 3,
    name: "Kapolei",
    address: "9012 Kapolei Pkwy",
    city: "Kapolei",
    state: "HI", 
    zip: "96707",
    phone: "(808) 555-0789",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 4,
    name: "Pearl City",
    address: "3456 Pearl City Ave",
    city: "Pearl City",
    state: "HI",
    zip: "96782",
    phone: "(808) 555-0123",
    hours: "Mon-Sun: 8AM-10PM", 
    isOpenLate: false
  },
  {
    id: 5,
    name: "Aina Haina",
    address: "7890 Aina Haina St",
    city: "Honolulu",
    state: "HI",
    zip: "96821",
    phone: "(808) 555-0456",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 6,
    name: "Burlington",
    address: "2345 Burlington Way",
    city: "Burlington",
    state: "WA",
    zip: "98233",
    phone: "(360) 555-0789",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 7,
    name: "Marysville",
    address: "6789 Marysville Rd",
    city: "Marysville",
    state: "WA", 
    zip: "98270",
    phone: "(360) 555-0123",
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: false
  },
  {
    id: 8,
    name: "Silverdale",
    address: "1234 Silverdale Blvd",
    city: "Silverdale",
    state: "WA",
    zip: "98383",
    phone: "(360) 555-0456", 
    hours: "Mon-Sun: 8AM-10PM",
    isOpenLate: true
  }
];

export default function LocationSelection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.zip.includes(searchTerm)
  );

  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(locationId);
    // In real app, this would navigate to menu with location context
    window.location.href = `/order/menu?location=${locationId}`;
  };

  return (
    <div className="location-page">
      <Header />
      
      <main className="location-main">
        <div className="location-container">
          {/* Map Section */}
          <div className="map-section">
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-title">Interactive Map</div>
                <div className="map-subtitle">Click on markers to view store details</div>
                <div className="map-markers">
                  {locations.slice(0, 3).map((location, index) => (
                    <div key={location.id} className="map-marker" style={{
                      left: `${20 + index * 30}%`,
                      top: `${30 + index * 20}%`
                    }}>
                      <div className="marker-number">{index + 1}</div>
                    </div>
                  ))}
                </div>
                <div className="map-attribution">
                  <span>© Mapbox © OpenStreetMap</span>
                  <span>Improve this map</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location List Section */}
          <div className="locations-section">
            <div className="locations-header">
              <h1 className="locations-title">Select a location</h1>
              <div className="search-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" className="search-icon"><path fill="currentColor" d="m21.53 20.47-3.841-3.841A8.7 8.7 0 0 0 19.75 11c0-4.825-3.925-8.75-8.75-8.75S2.25 6.175 2.25 11s3.925 8.75 8.75 8.75a8.7 8.7 0 0 0 5.629-2.061l3.841 3.841a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06M3.75 11c0-3.998 3.252-7.25 7.25-7.25s7.25 3.252 7.25 7.25-3.252 7.25-7.25 7.25S3.75 14.998 3.75 11"></path></svg>
                <input
                  type="text"
                  placeholder="Search City, State, or Zipcode"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="locations-list">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`location-item ${selectedLocation === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 24 24" className="location-icon"><path fill="currentColor" d="m21.545 7.871-1.039-3.072c-.489-1.444-1.094-2.548-4.006-2.548h-9c-2.912 0-3.517 1.104-4.005 2.548L2.454 7.872c-.461 1.364-.118 2.816.796 3.772V18c0 2.418 1.332 3.75 3.75 3.75h10c2.418 0 3.75-1.332 3.75-3.75v-6.357c.914-.956 1.256-2.408.795-3.772m-17.67.481 1.041-3.073C5.26 4.261 5.433 3.75 7.5 3.75h9c2.067 0 2.24.511 2.585 1.529l1.039 3.072c.344 1.014-.02 2.104-.863 2.591-1.227.708-3.084.002-3.509-1.193a.75.75 0 0 0-.707-.499h-.003a.75.75 0 0 0-.706.504c-.296.853-1.3 1.496-2.336 1.496s-2.04-.643-2.336-1.496a.75.75 0 0 0-.706-.504c-.285.034-.604.199-.71.499-.304.855-1.313 1.501-2.349 1.501-.41 0-.812-.106-1.16-.308-.843-.486-1.207-1.576-.864-2.59M13.28 20.25h-2.5V17.5c0-.689.561-1.25 1.25-1.25s1.25.561 1.25 1.25zm3.72 0h-2.22V17.5a2.75 2.75 0 0 0-2.75-2.75 2.75 2.75 0 0 0-2.75 2.75v2.75H7c-1.577 0-2.25-.673-2.25-2.25v-5.446c1.47.432 3.206-.053 4.201-1.141A4.18 4.18 0 0 0 12 12.749a4.18 4.18 0 0 0 3.049-1.336 4.2 4.2 0 0 0 3.052 1.336 3.8 3.8 0 0 0 1.149-.183V18c0 1.577-.673 2.25-2.25 2.25"></path></svg>
                  <div className="location-details">
                    <div className="location-name">{location.name}</div>
                    <div className="location-address">
                      {location.address}, {location.city}, {location.state} {location.zip}
                    </div>
                    {location.isOpenLate && (
                      <div className="open-late">Open Late</div>
                    )}
                  </div>
                  <div className="location-arrow">›</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .location-page {
          min-height: 100vh;
          background: white;
        }

        .location-main {
          padding-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .location-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: calc(100vh - 80px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .map-section {
          background: #f8f9fa;
          border-right: 1px solid #e0e0e0;
          position: relative;
          overflow: hidden;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-content {
          text-align: center;
          color: #666;
        }

        .map-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .map-subtitle {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .map-markers {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .map-marker {
          position: absolute;
          width: 30px;
          height: 30px;
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px rgba(255, 185, 205, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .map-marker:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 185, 205, 0.4);
        }

        .map-attribution {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: #666;
          display: flex;
          gap: 1rem;
        }

        .locations-section {
          background: white;
          padding: 2rem;
          overflow-y: auto;
        }

        .locations-header {
          margin-bottom: 2rem;
        }

        .locations-title {
          font-size: 2rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .search-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-size: 1.1rem;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .search-input:focus {
          outline: none;
          --tw-bg-opacity: 1;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
          background: white;
          box-shadow: 0 0 0 3px rgba(255, 185, 205, 0.1);
        }

        .locations-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .location-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .location-item:hover {
          background: #f0f0f0;
          --tw-bg-opacity: 1;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateX(4px);
        }

        .location-item.selected {
          --tw-bg-opacity: 1;
          background: rgb(255 185 205/var(--tw-bg-opacity));
          color: white;
          --tw-bg-opacity: 1;
          border-color: rgb(255 185 205/var(--tw-bg-opacity));
        }

        .location-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .location-details {
          flex: 1;
          min-width: 0;
        }

        .location-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #333;
        }

        .location-item.selected .location-name {
          color: white;
        }

        .location-address {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }

        .location-item.selected .location-address {
          color: rgba(255, 255, 255, 0.9);
        }

        .open-late {
          font-size: 0.8rem;
          --tw-bg-opacity: 1;
          color: rgb(255 185 205/var(--tw-bg-opacity));
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .location-item.selected .open-late {
          color: rgba(255, 255, 255, 0.9);
        }

        .location-arrow {
          font-size: 1.5rem;
          color: #666;
          margin-left: 1rem;
          transition: all 0.3s ease;
        }

        .location-item:hover .location-arrow {
          --tw-bg-opacity: 1;
          color: rgb(255 185 205/var(--tw-bg-opacity));
          transform: translateX(4px);
        }

        .location-item.selected .location-arrow {
          color: white;
        }

        @media (max-width: 1024px) {
          .location-container {
            grid-template-columns: 1fr;
            height: auto;
          }

          .map-section {
            height: 300px;
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
          }

          .locations-section {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .locations-title {
            font-size: 1.5rem;
          }

          .search-input {
            padding: 0.875rem 0.875rem 0.875rem 2.5rem;
            font-size: 0.9rem;
          }

          .location-item {
            padding: 0.875rem;
          }

          .location-name {
            font-size: 1rem;
          }

          .location-address {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
