
import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface SearchAndFilterProps {
  data: any[];
  onFilteredData: (filteredData: any[]) => void;
  searchFields: string[];
  sortOptions: { label: string; value: string }[];
  filterOptions?: { label: string; value: string; field: string }[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  data,
  onFilteredData,
  searchFields,
  sortOptions,
  filterOptions = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || '');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      result = result.filter(item =>
        searchFields.some(field => 
          item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([field, value]) => {
      if (value) {
        result = result.filter(item => {
          const itemValue = item[field];
          if (typeof itemValue === 'number') {
            return itemValue >= parseFloat(value);
          }
          return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = aVal?.toString().toLowerCase() || '';
        const bStr = bVal?.toString().toLowerCase() || '';
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        }
        return bStr.localeCompare(aStr);
      });
    }

    return result;
  }, [data, searchTerm, sortBy, sortDirection, activeFilters, searchFields]);

  React.useEffect(() => {
    onFilteredData(filteredAndSortedData);
  }, [filteredAndSortedData, onFilteredData]);

  const handleFilterChange = (field: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/60 text-white rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700/60 text-white rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 bg-slate-700/60 text-white rounded-lg border border-slate-600/50 hover:bg-slate-600/60 transition-colors"
          >
            {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </button>
        </div>

        {/* Filters */}
        {filterOptions.map(filter => (
          <div key={filter.field}>
            <select
              value={activeFilters[filter.field] || ''}
              onChange={(e) => handleFilterChange(filter.field, e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/60 text-white rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">{filter.label}</option>
              <option value={filter.value}>{filter.value}</option>
            </select>
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-300">
        Showing {filteredAndSortedData.length} of {data.length} results
        {searchTerm && <span className="ml-2 text-blue-400">for "{searchTerm}"</span>}
      </div>
    </div>
  );
};
