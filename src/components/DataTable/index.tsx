import { useState, useMemo, useEffect } from 'react';
import type { DataTableProps } from './types';
import { ArrowUpDown, LoaderCircle } from 'lucide-react';

type SortConfig<T> = {
  key: keyof T;
  direction: 'ascending' | 'descending';
} | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  selectable = false,
  onRowSelect,
  loading = false,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const handleSelectRow = (row: T) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((r) => r[rowKey] === row[rowKey]);
      return isSelected ? prev.filter((r) => r[rowKey] !== row[rowKey]) : [...prev, row];
    });
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === data.length ? [] : [...data]);
  };

  const isAllSelected = selectedRows.length === data.length && data.length > 0;

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const sortableItems = [...data];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    return sortableItems;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // --- New Logic for Loading and Empty States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border rounded-lg">
        No data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div
                  className="flex items-center gap-2"
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  {col.title}
                  {col.sortable && <ArrowUpDown className="h-4 w-4" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedData.map((row, index) => {
            const isRowSelected = selectedRows.some((r) => r[rowKey] === row[rowKey]);
            return (
              <tr key={String(row[rowKey]) || index} className="hover:bg-gray-50">
                {selectable && (
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isRowSelected}
                      onChange={() => handleSelectRow(row)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={`${String(col.key)}-${String(row[rowKey]) || index}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}