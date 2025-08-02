import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';


interface PriceRangeFilterProps {
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onReset: () => void;
  highestMRP: number;
  onClose: () => void;
  top: number;
  left: number;
  isOpen: boolean;
}


const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  onMinChange,
  onMaxChange,
  onReset,
  highestMRP = 16500,
  onClose,
  top,
  left,
  isOpen,
}) => {

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const [isMinFocused, setIsMinFocused] = useState<boolean>(false);
  const [isMaxFocused, setIsMaxFocused] = useState<boolean>(false);

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [showContent, setShowContent] = useState<boolean>(false);


  useEffect(() => {
    if (isOpen) {

      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    } else {

      setShowContent(false);
    }
  }, [isOpen]);


  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setMinPrice(value);
    onMinChange(value);
  };


  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setMaxPrice(value);
    onMaxChange(value);
  };


  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    onReset();
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {


        if (showContent) {
          onClose();
        }
      }
    };


    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, showContent]);


  const isMinActive: boolean = isMinFocused || minPrice !== '';

  const isMaxActive: boolean = isMaxFocused || maxPrice !== '';

  if (!isOpen && !showContent) {

    return null;
  }

  return (
    <div
      ref={componentRef}
      className={`
        absolute left-0 top-12 max-md:-translate-x-[67.5%] z-50 bg-white rounded-lg shadow-xl p-4 w-72 md:w-80 border border-gray-200
        transition-all duration-300 ease-out
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
      onTransitionEnd={() => {
        if (!showContent && !isOpen) {
        }
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">The highest price is MRP</span>

          <span className="text-xl font-bold text-gray-800">
            ₹ {highestMRP.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
        >
          Reset
        </button>
      </div>


      <div className="border-b border-gray-200 mb-4"></div>


      <div className="flex items-center space-x-3">

        <div className="relative flex-1">

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
          <input
            id="minPrice"
            type="number"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={minPrice}
            onChange={handleMinChange}
            onFocus={() => setIsMinFocused(true)}
            onBlur={() => setIsMinFocused(false)}
            placeholder={isMinActive ? '' : 'From'}
          />

          <label
            htmlFor="minPrice"
            className={`absolute left-8 transition-all duration-200 pointer-events-none ${isMinActive
              ? 'top-2 text-xs text-blue-600 -translate-y-1/2'
              : 'top-1/2 text-base text-gray-500 -translate-y-1/2'
              }`}
          >
            From
          </label>
        </div>


        <span className="text-gray-500 text-lg">-</span>


        <div className="relative flex-1">

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
          <input
            id="maxPrice"
            type="number"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={maxPrice}
            onChange={handleMaxChange}
            onFocus={() => setIsMaxFocused(true)}
            onBlur={() => setIsMaxFocused(false)}
            placeholder={isMaxActive ? '' : 'To'}
          />

          <label
            htmlFor="maxPrice"
            className={`absolute left-8 transition-all duration-200 pointer-events-none ${isMaxActive
              ? 'top-2 text-xs text-blue-600 -translate-y-1/2'
              : 'top-1/2 text-base text-gray-500 -translate-y-1/2'
              }`}
          >
            To
          </label>
        </div>
      </div>
    </div>
  );
};


interface ModalPosition {
  top: number;
  left: number;
}

interface PriceDropdownProps {
  minPriceValue: string;
  setMinPriceValue: (value: string) => void;
  maxPriceValue: string;
  setMaxPriceValue: (value: string) => void;
}

const PriceDropdown: React.FC<PriceDropdownProps> = ({
  minPriceValue,
  setMaxPriceValue,
  maxPriceValue,
  setMinPriceValue,
}) => {

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [modalPosition, setModalPosition] = useState<ModalPosition>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement | null>(null);


  const calculateModalPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect: DOMRect = triggerRef.current.getBoundingClientRect();

      setModalPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX,
      });
    }
  }, []);


  useEffect(() => {
    if (isFilterOpen) {
      calculateModalPosition();

      window.addEventListener('resize', calculateModalPosition);
      window.addEventListener('scroll', calculateModalPosition);
    } else {

      window.removeEventListener('resize', calculateModalPosition);
      window.removeEventListener('scroll', calculateModalPosition);
    }


    return () => {
      window.removeEventListener('resize', calculateModalPosition);
      window.removeEventListener('scroll', calculateModalPosition);
    };
  }, [isFilterOpen, calculateModalPosition]);


  const handleMinPriceChange = (value: string) => {
    setMinPriceValue(value);
  };


  const handleMaxPriceChange = (value: string) => {
    setMaxPriceValue(value);
  };


  const handleFilterReset = () => {
    setMinPriceValue('');
    setMaxPriceValue('');
  };


  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-start font-sans relative">
      <button
        ref={triggerRef}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center px-4 py-1 rounded-md shadow-md focus:outline-none focus:ring-0 cursor-pointer"
      >
        Price <svg
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <PriceRangeFilter
        isOpen={isFilterOpen}
        onMinChange={handleMinPriceChange}
        onMaxChange={handleMaxPriceChange}
        onReset={handleFilterReset}
        onClose={handleCloseFilter}
        highestMRP={Number(maxPriceValue)}
        top={modalPosition.top}
        left={modalPosition.left}
      />
    </div>
  );
};

export default PriceDropdown;
