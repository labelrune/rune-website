import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { StockSelection } from 'src/types/store';

// Removed PriceRangeFilter and its props as it's no longer used.

interface StockFilterProps {
  initialSelection: { available: boolean; soldOut: boolean; };
  availableCount: number;
  soldOutCount: number;
  onSelectionChange: (selection: { available: boolean; soldOut: boolean; }) => void;
  onClose: () => void;
  isOpen: boolean;
  selectedCount: number;
}

const StockFilter: React.FC<StockFilterProps> = ({
  initialSelection,
  availableCount,
  soldOutCount,
  onSelectionChange,
  onClose,
  isOpen,
  selectedCount,
}) => {
  const [selected, setSelected] = useState<{ available: boolean; soldOut: boolean; }>(initialSelection);
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

  useEffect(() => {
    setSelected(initialSelection);
  }, [initialSelection]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newSelection = { ...selected, [name]: checked };
    setSelected(newSelection);
    onSelectionChange(newSelection);
  };

  const handleReset = () => {
    const defaultSelection = { available: true, soldOut: false };
    setSelected(defaultSelection);
    onSelectionChange(defaultSelection);
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

  if (!isOpen && !showContent) {
    return null;
  }

  return (
    <div
      ref={componentRef}
      className={`
        absolute left-0 top-12 max-md:-translate-x-1/5 z-50 bg-white rounded-lg shadow-xl p-4 w-72 md:w-80 border border-gray-200
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
          <span className="text-xl font-bold text-gray-800">
            {selectedCount} selected
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

      <div className="flex flex-col space-y-3">
        <label className="inline-flex items-center text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={selected.available}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2">In stock ({availableCount})</span>
        </label>
        <label className="inline-flex items-center text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            name="soldOut"
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={selected.soldOut}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2">Out of stock ({soldOutCount})</span>
        </label>
      </div>
    </div>
  );
};

interface AvailabilityProps {
  stockSelection: StockSelection;
  setStockSelection: (value: StockSelection) => void;
  totalSoldOutCount: number;
  totalAvailableCount: number;
}

const Availability: React.FC<AvailabilityProps> = ({
  stockSelection,
  setStockSelection,
  totalSoldOutCount,
  totalAvailableCount,
}) => {
  const [isStockFilterOpen, setIsStockFilterOpen] = useState<boolean>(false);
  const stockTriggerRef = useRef<HTMLButtonElement | null>(null);

  const calculateSelectedStockCount = (): number => {
    let count = 0;
    if (stockSelection.available) {
      count += totalAvailableCount;
    }
    if (stockSelection.soldOut) {
      count += totalSoldOutCount;
    }
    return count;
  };

  const selectedStockCount = calculateSelectedStockCount();

  const handleStockSelectionChange = (selection: StockSelection) => {
    setStockSelection(selection);
  };

  const handleCloseStockFilter = () => {
    setIsStockFilterOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-start font-sans relative">
      <style>
        {`
          .form-checkbox {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            height: 1.25rem;
            width: 1.25rem;
            border-width: 1px;
            border-color: #D1D5DB;
            border-radius: 0.25rem;
            background-color: #fff;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          }
          .form-checkbox:checked {
            background-color: #2563EB;
            border-color: #2563EB;
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 00-1.414 0L7 8.586 4.207 5.793a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l5-5a1 1 0 000-1.414z'/%3e%3c/svg%3e");
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
          }
          .form-checkbox:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }
        `}
      </style>

      <div className="flex space-x-4">
        <button
          ref={stockTriggerRef}
          onClick={() => setIsStockFilterOpen(!isStockFilterOpen)}
          className="flex items-center px-4 py-1 rounded-md shadow-md focus:outline-none focus:ring-0 cursor-pointer"
        >
          {selectedStockCount} selected{' '}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${isStockFilterOpen ? 'rotate-180' : ''}`}
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
      </div>

      <StockFilter
        isOpen={isStockFilterOpen}
        initialSelection={stockSelection}
        availableCount={totalAvailableCount}
        soldOutCount={totalSoldOutCount}
        onSelectionChange={handleStockSelectionChange}
        onClose={handleCloseStockFilter}
        selectedCount={selectedStockCount}
      />
    </div>
  );
};

export default Availability;
