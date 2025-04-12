import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities } from '../data/cities';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [filteredDistricts, setFilteredDistricts] = useState<string[]>([]);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown dışına tıklandığında kapanması için
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target as Node)) {
        setIsDistrictDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Şehir araması için
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    setSelectedDistrict(''); // Şehir değiştiğinde ilçe seçimini sıfırla
    setFilteredCities(
      cities.filter(city => 
        city.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // İlçe araması için
  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    const currentCity = cities.find(city => city.name === selectedCity);
    if (currentCity) {
      setFilteredDistricts(
        currentCity.districts.filter(district =>
          district.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Şehir seçildiğinde
  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setSelectedDistrict(''); // Şehir değiştiğinde ilçe seçimini sıfırla
    setIsCityDropdownOpen(false);
    const selectedCityData = cities.find(city => city.name === cityName);
    if (selectedCityData) {
      setFilteredDistricts(selectedCityData.districts);
    }
  };

  // İlçe seçildiğinde
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setIsDistrictDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Header */}
      <nav className="py-4 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Absolute positioned buttons */}
          <div className="absolute right-4 flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-[#1E1E1E] bg-white rounded hover:bg-gray-100 transition-colors font-medium"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 text-[#1E1E1E] bg-white rounded hover:bg-gray-100 transition-colors font-medium"
            >
              Kayıt Ol
            </button>
          </div>
          
          {/* Centered site name */}
          <div className="text-center">
            <span className="text-white text-2xl font-medium">BarberBook</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-12">
        <h1 className="text-white text-4xl font-normal text-center mb-12">
          Size En Yakın Berberi Bulun
        </h1>

        {/* Search Inputs */}
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Berber ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-[#2C2C2C] text-white placeholder-gray-400 rounded focus:outline-none"
          />
          
          {/* İl ve İlçe Seçimi */}
          <div className="grid grid-cols-2 gap-4">
            {/* İl Seçimi */}
            <div className="relative" ref={cityDropdownRef}>
              <input
                type="text"
                placeholder="İl Seçin"
                value={selectedCity}
                onChange={handleCityChange}
                onFocus={() => setIsCityDropdownOpen(true)}
                className="w-full px-4 py-3 bg-[#2C2C2C] text-white placeholder-gray-400 rounded focus:outline-none"
              />
              {isCityDropdownOpen && filteredCities.length > 0 && (
                <div className="absolute w-full mt-1 bg-[#2C2C2C] border border-[#3C3C3C] rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
                  {filteredCities.map((city) => (
                    <div
                      key={city.id}
                      className="px-4 py-2 text-white hover:bg-[#3C3C3C] cursor-pointer"
                      onClick={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* İlçe Seçimi */}
            <div className="relative" ref={districtDropdownRef}>
              <input
                type="text"
                placeholder="İlçe Seçin"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                onFocus={() => selectedCity && setIsDistrictDropdownOpen(true)}
                disabled={!selectedCity}
                className={`w-full px-4 py-3 bg-[#2C2C2C] text-white placeholder-gray-400 rounded focus:outline-none ${
                  !selectedCity ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              {isDistrictDropdownOpen && filteredDistricts.length > 0 && (
                <div className="absolute w-full mt-1 bg-[#2C2C2C] border border-[#3C3C3C] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredDistricts.map((district) => (
                    <div
                      key={district}
                      className="px-4 py-2 text-white hover:bg-[#3C3C3C] cursor-pointer"
                      onClick={() => handleDistrictSelect(district)}
                    >
                      {district}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 