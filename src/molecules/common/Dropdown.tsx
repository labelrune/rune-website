"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DropdownItem } from 'src/types/store';

interface DropdownProps {
  items: DropdownItem[];
  defaultLabel: string;
  onSelect: (selectedItem: DropdownItem) => void;
  selectedItem: DropdownItem | null;
  setSelectedItem: (x: DropdownItem | null) => void;
  preselectFirst?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, selectedItem, setSelectedItem, defaultLabel, onSelect, preselectFirst = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [minListWidth, setMinListWidth] = useState<string>('auto');

  useEffect(() => {
    if (preselectFirst && items.length > 0) {
      setSelectedItem(items[0]);
    } else {
      setSelectedItem(null);
    }
  }, [preselectFirst, items]);

  const calculateMinListWidth = useCallback(() => {
    let maxWidth = 0;
    const tempDiv = document.createElement('div');
    tempDiv.className = 'absolute invisible whitespace-nowrap px-4 py-2 text-sm';
    document.body.appendChild(tempDiv);

    tempDiv.textContent = defaultLabel;
    maxWidth = Math.max(maxWidth, tempDiv.scrollWidth);

    items.forEach(item => {
      tempDiv.textContent = item.label;
      maxWidth = Math.max(maxWidth, tempDiv.scrollWidth);
    });

    document.body.removeChild(tempDiv);
    const buffer = 8;
    setMinListWidth(`${maxWidth + buffer}px`);
  }, [items, defaultLabel]);

  useEffect(() => {
    calculateMinListWidth();
  }, [calculateMinListWidth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const displayLabel = selectedItem ? selectedItem.label : defaultLabel;

  return (
    <div className="relative text-left" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex justify-between items-center rounded-md border border-gray-200 shadow-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 cursor-pointer ${className}`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        {displayLabel}
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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

      <div
        className={`
          origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white border border-gray-200 focus:outline-none z-10
          transition-all duration-200 ease-out
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        style={{ minWidth: minListWidth }}
      >
        <div className="py-1" role="none">
          {items.map((item: DropdownItem) => (
            <button
              key={item.value}
              onClick={() => handleItemClick(item)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
