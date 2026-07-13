import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Button from '../common/Button';

const ReusableTable = ({
  columns = [],
  data = [],
  actions,
  searchPlaceholder = "Search records...",
  isLoading = false,
  emptyStateMessage = "No matching records found.",
  defaultSortField = "",
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 5
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [activeFilters, setActiveFilters] = useState({});

  // 1. Handle Search & Filter logic
  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Global Search
      const matchesSearch = columns.some(col => {
        if (!col.accessor) return false;
        const val = row[col.accessor];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Column Specific Filters
      const matchesFilters = Object.keys(activeFilters).every(accessor => {
        const filterVal = activeFilters[accessor];
        if (!filterVal) return true;
        const rowVal = row[accessor];
        return String(rowVal).toLowerCase() === String(filterVal).toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, columns, searchTerm, activeFilters]);

  // 2. Handle Sort logic
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }

      return String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: 'base' });
    });

    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }, [filteredData, sortField, sortOrder]);

  // 3. Handle Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (accessor, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [accessor]: value
    }));
    setCurrentPage(1);
  };

  // Get unique values for filter dropdowns
  const getFilterOptions = (accessor) => {
    const values = data.map(item => item[accessor]).filter(Boolean);
    return [...new Set(values)];
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Search & Filter Panel */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-750 bg-white dark:bg-govdark-card text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {columns.filter(col => col.filterable).map(col => {
            const options = getFilterOptions(col.accessor);
            return (
              <select
                key={col.accessor}
                value={activeFilters[col.accessor] || ""}
                onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-750 bg-white dark:bg-govdark-card text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All {col.header}</option>
                {options.map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            );
          })}
        </div>
      </div>

      {/* Table Window */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-govdark-card">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Sticky Header */}
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-850/80 backdrop-blur-sm z-10 border-b border-slate-200 dark:border-slate-800 select-none">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && handleSort(col.accessor)}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
                    col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800' : ''
                  }`}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && sortField === col.accessor && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-primary" /> : <ChevronDown className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80">
            {isLoading ? (
              // Loading Skeleton State
              Array.from({ length: itemsPerPage }).map((_, rIdx) => (
                <tr key={rIdx} className="animate-pulse">
                  {columns.map((_, cIdx) => (
                    <td key={cIdx} className="px-6 py-4.5">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4.5 text-right">
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-16 ml-auto"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{emptyStateMessage}</span>
                    <span className="text-xs text-slate-400">Try modifying your search query or filter settings.</span>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              paginatedData.map((row, rIdx) => (
                <tr
                  key={row.id || rIdx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors"
                >
                  {columns.map((col, cIdx) => {
                    const value = row[col.accessor];
                    return (
                      <td key={cIdx} className="px-6 py-4 text-sm text-slate-700 dark:text-slate-350">
                        {col.render ? col.render(value, row) : value}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && !isLoading && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 select-none">
          <div className="flex items-center gap-2 text-xs text-slate-550">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-750 bg-white dark:bg-govdark-card text-slate-700 dark:text-slate-300"
            >
              {itemsPerPageOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span>entries of {sortedData.length} records</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              isDisabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'text-slate-650 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="xs"
              isDisabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
