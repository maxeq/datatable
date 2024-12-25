import { formattedValueTable } from '@/utils/formatting';
import { ArrowDown, ArrowUp, CheckIcon } from 'lucide-react';
import React, { useState } from 'react';

export type VirtualKeys = '__virtualKey1' | '__virtualKey2';

export type Column<T> = {
  key: keyof T | VirtualKeys;
  label: string;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
  sortable?: boolean;
  formatType?: 'date' | 'currency' | 'percentage' | 'text';
};

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  primaryKey: keyof T;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  initialSelectedRows?: T[];
  rowClassName?: string | ((row: T, index: number) => string);
}

const DataTable = <T extends object>({
  columns,
  data,
  primaryKey,
  selectable = false,
  initialSelectedRows = [],
  onSelectionChange,
  rowClassName,
}: DataTableProps<T>) => {
  if (selectable && !primaryKey) {
    throw new Error('primaryKey is required when selectable is true');
  }

  const [selectedRows, setSelectedRows] = useState<Set<T[keyof T]>>(
    new Set(
      initialSelectedRows
        .map((row) => row[primaryKey as keyof T])
        .filter((key) => key !== undefined),
    ),
  );

  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(
    primaryKey
      ? { key: primaryKey as keyof T, direction: 'asc' }
      : columns.find((col) => col.sortable)
        ? { key: columns.find((col) => col.sortable)!.key as keyof T, direction: 'asc' }
        : null,
  );

  const [hoveredColumnKey, setHoveredColumnKey] = useState<keyof T | null>(null);

  const handleSort = (key: keyof T) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null || bValue == null) return 0;

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRowSelection = (rowKey: T[keyof T]) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowKey)) {
      newSelectedRows.delete(rowKey);
    } else {
      newSelectedRows.add(rowKey);
    }
    setSelectedRows(newSelectedRows);

    if (onSelectionChange) {
      onSelectionChange(data.filter((row) => newSelectedRows.has(row[primaryKey as keyof T])));
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onSelectionChange) onSelectionChange([]);
    } else {
      const allRowKeys = new Set(data.map((row) => row[primaryKey as keyof T]));
      setSelectedRows(allRowKeys);
      if (onSelectionChange) onSelectionChange(data);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="b w-full bg-background text-sm">
          <thead className="border border-l-0 border-r-0 border-t-0 border-b-grey-3 bg-grey-2 capitalize">
            <tr className="border font-semibold">
              {selectable && (
                <th className="w-[40px] pl-3 text-center">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border border-grey-5 ${
                      selectedRows.size === data.length ? 'bg-primary' : 'bg-transparent'
                    }`}
                    onClick={toggleSelectAll}
                  >
                    {selectedRows.size === data.length && <CheckIcon />}
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 py-[10px] text-left"
                  onMouseEnter={() => setHoveredColumnKey(column.key as keyof T)}
                  onMouseLeave={() => setHoveredColumnKey(null)}
                >
                  <div
                    className="flex items-center justify-between hover:cursor-pointer"
                    onClick={() => handleSort(column.key as keyof T)}
                  >
                    {column.label}
                    {column.sortable && (
                      <button className="flex items-center" style={{ minWidth: '24px' }}>
                        <span
                          style={{
                            visibility:
                              sortConfig?.key === column.key || hoveredColumnKey === column.key
                                ? 'visible'
                                : 'hidden',
                          }}
                        >
                          {sortConfig?.key === column.key ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowDown
                                color="hsl(var(--primary))"
                                size={20}
                                className="ml-2 transform transition-transform"
                              />
                            ) : (
                              <ArrowUp
                                color="hsl(var(--primary))"
                                size={20}
                                className="ml-2 transform transition-transform"
                              />
                            )
                          ) : (
                            <ArrowUp
                              color="hsl(var(--grey-5))"
                              size={20}
                              className="ml-2 transform transition-transform"
                            />
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              const rowKey = row[primaryKey as keyof T];
              const customClass =
                typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName;

              return (
                <tr
                  key={String(rowKey)}
                  onClick={() => toggleRowSelection(rowKey)}
                  className={`border hover:bg-primary/20 ${selectable ? 'hover:cursor-pointer' : ''} ${customClass}`}
                >
                  {selectable && (
                    <td className="w-[40px] pl-3 text-center">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-sm border border-grey-4 ${
                          selectedRows.has(rowKey) ? 'bg-primary' : 'bg-transparent'
                        }`}
                      >
                        {selectedRows.has(rowKey) && <CheckIcon />}
                      </div>
                    </td>
                  )}
                  {columns.map((column) => {
                    const isVirtualKey =
                      typeof column.key === 'string' && row[column.key as keyof T] === undefined;
                    const value: T[keyof T] | undefined = isVirtualKey
                      ? undefined
                      : row[column.key as keyof T];

                    const cellContent = column.render
                      ? column.render(value, row)
                      : column.formatType &&
                          (typeof value === 'string' ||
                            typeof value === 'number' ||
                            value === undefined)
                        ? formattedValueTable(
                            value as string | number | undefined,
                            column.formatType,
                          )
                        : value == null
                          ? '-'
                          : typeof value === 'string' || typeof value === 'number'
                            ? value
                            : JSON.stringify(value);

                    return (
                      <td
                        key={String(column.key)}
                        className="whitespace-nowrap px-4 py-[10px] text-left"
                      >
                        <div>{cellContent}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.displayName = 'DataTable';

export default DataTable;
