import React from 'react';

interface CountryFlagProps {
  country: string;
  className?: string;
  showName?: boolean;
}

export const getCountryFlag = (country?: string): string => {
  if (!country) return '🌐';
  const c = country.toLowerCase();
  if (c.includes('france') || c === 'fr') return '🇫🇷';
  if (c.includes('germany') || c === 'de') return '🇩🇪';
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('britain') || c === 'gb') return '🇬🇧';
  return '🌐';
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  country,
  className = 'text-sm',
  showName = false
}) => {
  const flag = getCountryFlag(country);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="select-none inline-block text-base leading-none">{flag}</span>
      {showName && <span>{country}</span>}
    </span>
  );
};
