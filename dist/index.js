'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Icon = React.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return React.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const createLucideIcon = (iconName, iconNode) => {
  const Component = React.forwardRef(
    ({ className, ...props }, ref) => React.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowDown = createLucideIcon("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowUp = createLucideIcon("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);

function CheckIcon({ classNames, color }) {
    return (jsxRuntime.jsx(Check, { color: color, className: `check-icon h-3.5 w-3.5 text-primary-foreground ${classNames}` }));
}

function formattedValue(key, value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
        return '';
    }
    if (['created_at', 'due_date', 'pay_date', 'dueDate', 'earlyPayDate'].includes(key)) {
        const date = new Date(value);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }
    if (key === 'amount' || key === 'early_pay') {
        return Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'narrowSymbol',
        })
            .format(value)
            .replace('€', '€\u00A0');
    }
    if (key === 'pay_discount') {
        return `${(value * 100).toFixed(2)}%`;
    }
    return value.toString();
}

const DataTable = ({ columns, data, primaryKey, selectable = false, initialSelectedRows = [], onSelectionChange, }) => {
    // Ensure primaryKey is provided
    if (selectable && !primaryKey) {
        throw new Error('primaryKey is required when selectable is true');
    }
    const [selectedRows, setSelectedRows] = React.useState(new Set(initialSelectedRows
        .map((row) => row[primaryKey])
        .filter((key) => key !== undefined)));
    const [sortConfig, setSortConfig] = React.useState(primaryKey
        ? { key: primaryKey, direction: 'asc' }
        : columns.find((col) => col.sortable)
            ? { key: columns.find((col) => col.sortable).key, direction: 'asc' }
            : null);
    const [hoveredColumnKey, setHoveredColumnKey] = React.useState(null);
    const handleSort = (key) => {
        if (sortConfig?.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
            });
        }
        else {
            setSortConfig({ key, direction: 'asc' });
        }
    };
    const sortedData = React.useMemo(() => {
        if (!sortConfig)
            return data;
        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            if (aValue == null || bValue == null)
                return 0;
            if (aValue < bValue)
                return direction === 'asc' ? -1 : 1;
            if (aValue > bValue)
                return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);
    const toggleRowSelection = (rowKey) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(rowKey)) {
            newSelectedRows.delete(rowKey);
        }
        else {
            newSelectedRows.add(rowKey);
        }
        setSelectedRows(newSelectedRows);
        if (onSelectionChange) {
            onSelectionChange(data.filter((row) => newSelectedRows.has(row[primaryKey])));
        }
    };
    const toggleSelectAll = () => {
        if (selectedRows.size === data.length) {
            setSelectedRows(new Set());
            if (onSelectionChange)
                onSelectionChange([]);
        }
        else {
            const allRowKeys = new Set(data.map((row) => row[primaryKey]));
            setSelectedRows(allRowKeys);
            if (onSelectionChange)
                onSelectionChange(data);
        }
    };
    return (jsxRuntime.jsx("div", { className: "w-full", children: jsxRuntime.jsx("div", { className: "overflow-x-auto", children: jsxRuntime.jsxs("table", { className: "w-full bg-selected text-sm", children: [jsxRuntime.jsx("thead", { className: "border border-l-0 border-r-0 border-t-0 border-b-grey-3 capitalize", children: jsxRuntime.jsxs("tr", { className: "font-semibold", children: [selectable && (jsxRuntime.jsx("th", { className: "w-[40px] pl-3 text-center", children: jsxRuntime.jsx("div", { className: `flex h-5 w-5 items-center justify-center rounded-sm border border-grey-5 ${selectedRows.size === data.length ? 'bg-primary' : 'bg-transparent'}`, onClick: toggleSelectAll, children: selectedRows.size === data.length && jsxRuntime.jsx(CheckIcon, {}) }) })), columns.map((column) => (jsxRuntime.jsx("th", { className: "px-4 py-[10px] text-left", onMouseEnter: () => setHoveredColumnKey(column.key), onMouseLeave: () => setHoveredColumnKey(null), children: jsxRuntime.jsxs("div", { className: "flex items-center justify-between hover:cursor-pointer", onClick: () => handleSort(column.key), children: [column.label, column.sortable && (jsxRuntime.jsx("button", { className: "flex items-center", style: { minWidth: '24px' }, children: jsxRuntime.jsx("span", { style: {
                                                        visibility: sortConfig?.key === column.key || hoveredColumnKey === column.key
                                                            ? 'visible'
                                                            : 'hidden',
                                                    }, children: sortConfig?.key === column.key ? (sortConfig.direction === 'asc' ? (jsxRuntime.jsx(ArrowDown, { color: "hsl(var(--primary))", size: 20, className: "transform transition-transform" })) : (jsxRuntime.jsx(ArrowUp, { color: "hsl(var(--primary))", size: 20, className: "transform transition-transform" }))) : (jsxRuntime.jsx(ArrowUp, { color: "hsl(var(--grey-5))", size: 20, className: "transform transition-transform" })) }) }))] }) }, String(column.key))))] }) }), jsxRuntime.jsx("tbody", { children: sortedData.map((row) => {
                            const rowKey = row[primaryKey];
                            return (jsxRuntime.jsxs("tr", { onClick: () => toggleRowSelection(rowKey), className: `hover:bg-primary/20 ${selectable ? 'hover:cursor-pointer' : ''}`, children: [selectable && (jsxRuntime.jsx("td", { className: "w-[40px] pl-3 text-center", children: jsxRuntime.jsx("div", { className: `flex h-5 w-5 items-center justify-center rounded-sm border border-grey-4 ${selectedRows.has(rowKey) ? 'bg-primary' : 'bg-transparent'}`, children: selectedRows.has(rowKey) && jsxRuntime.jsx(CheckIcon, {}) }) })), columns.map((column) => {
                                        const isVirtualKey = typeof column.key === 'string' && !(column.key in row);
                                        const value = isVirtualKey ? undefined : row[column.key];
                                        return (jsxRuntime.jsx("td", { className: "whitespace-nowrap px-4 py-[10px] text-left", children: column.render
                                                ? column.render(value, row)
                                                : isVirtualKey
                                                    ? 'N/A'
                                                    : formattedValue(String(column.key), String(value)) }, String(column.key)));
                                    })] }, String(rowKey)));
                        }) })] }) }) }));
};
DataTable.displayName = 'DataTable';

exports.DataTable = DataTable;
//# sourceMappingURL=index.js.map
