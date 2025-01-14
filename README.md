
# @maxeq-ui/datatable

> A highly customizable and reusable data table component for React, supporting sorting, selection, custom rendering, and row styling.

---

## ✨ Features

- **Customizable Columns**: Define labels, keys, custom render logic, and formatting for each column.
- **Sorting**: Enable sorting on specific columns with ascending and descending orders.
- **Row Selection**: Allow single or multiple row selection with callbacks.
- **Dynamic Row Styling**: Apply conditional or static styles to rows.
- **Fallback Rendering**: Automatically display placeholders like `'-'` for missing or `null` values.
- **Data Formatting**: Built-in support for date, currency, percentage, and text formatting.
- **Hover Feedback**: Interactive column headers for improved user experience.
- **TypeScript Support**: Fully typed for strong type safety.

---

## 📦 Installation

Install the package via NPM:

```bash
npm install @maxeq-ui/datatable
```

Or with Yarn:

```bash
yarn add @maxeq-ui/datatable
```

You will also need the following peer dependencies:

```bash
npm install react react-dom lucide-react
```

---

## 🚀 Usage

Here’s an example of how to use the updated `DataTable` component:

```tsx
'use client';

import React from 'react';
import { Column, DataTable } from '@maxeq-ui/datatable';

// Define the data type
interface Data {
  id: number;
  name: string;
  age: number;
  city: string;
  balance: number;
  birthDate: string;
  discountRate: number;
  status: boolean;
}

// Explicitly type the columns
const columns: Column<Data>[] = [
  { key: 'name', label: 'Name', sortable: true, formatType: 'text' },
  { key: 'age', label: 'Age', sortable: true, formatType: 'text' },
  { key: 'city', label: 'City', formatType: 'text' },
  { key: 'balance', label: 'Balance', sortable: true, formatType: 'currency' },
  { key: 'birthDate', label: 'Birth Date', sortable: true, formatType: 'date' },
  { key: 'discountRate', label: 'Discount Rate', formatType: 'percentage' },
  { key: 'status', label: 'Status', render: (value) => (value ? 'Active' : 'Inactive') },
];

const data: Data[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    city: 'New York',
    balance: 12345.67,
    birthDate: '1993-04-15',
    discountRate: 0.15,
    status: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    city: 'Los Angeles',
    balance: 9876.54,
    birthDate: '1998-08-25',
    discountRate: 0.1,
    status: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    age: 35,
    city: 'Chicago',
    balance: 5432.1,
    birthDate: '1988-01-12',
    discountRate: 0.2,
    status: true,
  },
  {
    id: 4,
    name: 'Sarah Miller',
    age: 28,
    city: 'Miami',
    balance: 23456.78,
    birthDate: '1994-02-20',
    discountRate: 0.25,
    status: false,
  },
  {
    id: 5,
    name: 'David Lee',
    age: 40,
    city: 'San Francisco',
    balance: 8765.43,
    birthDate: '1981-05-10',
    discountRate: 0.3,
    status: true,
  },
  {
    id: 6,
    name: 'Emily Davis',
    age: 32,
    city: 'Dallas',
    balance: 4567.89,
    birthDate: '1989-09-01',
    discountRate: 0.18,
    status: false,
  },
  {
    id: 7,
    name: 'Daniel Clark',
    age: 45,
    city: 'Seattle',
    balance: 11234.56,
    birthDate: '1976-11-30',
    discountRate: 0.12,
    status: true,
  },
  {
    id: 8,
    name: 'Linda Rodriguez',
    age: 27,
    city: 'Houston',
    balance: 7890.12,
    birthDate: '1995-06-18',
    discountRate: 0.22,
    status: false,
  },
  {
    id: 9,
    name: 'James Anderson',
    age: 38,
    city: 'Denver',
    balance: 6543.21,
    birthDate: '1983-04-02',
    discountRate: 0.28,
    status: true,
  },
  {
    id: 10,
    name: 'Olivia Wilson',
    age: 29,
    city: 'Boston',
    balance: 3210.54,
    birthDate: '1993-07-10',
    discountRate: 0.14,
    status: false,
  },
  {
    id: 11,
    name: 'Liam Brown',
    age: 33,
    city: 'Austin',
    balance: 1478.93,
    birthDate: '1988-10-15',
    discountRate: 0.23,
    status: true,
  },
  {
    id: 12,
    name: 'Sophia Moore',
    age: 22,
    city: 'Phoenix',
    balance: 8923.45,
    birthDate: '1999-03-25',
    discountRate: 0.21,
    status: false,
  },
  {
    id: 13,
    name: 'Lucas Taylor',
    age: 31,
    city: 'Las Vegas',
    balance: 4512.67,
    birthDate: '1990-12-05',
    discountRate: 0.27,
    status: true,
  },
  {
    id: 14,
    name: 'Charlotte Hall',
    age: 37,
    city: 'San Diego',
    balance: 6345.89,
    birthDate: '1984-08-16',
    discountRate: 0.19,
    status: false,
  },
  {
    id: 15,
    name: 'Benjamin Scott',
    age: 43,
    city: 'Portland',
    balance: 1287.54,
    birthDate: '1978-11-22',
    discountRate: 0.16,
    status: true,
  },
  {
    id: 16,
    name: 'Amelia Walker',
    age: 26,
    city: 'Philadelphia',
    balance: 9634.21,
    birthDate: '1994-09-07',
    discountRate: 0.29,
    status: false,
  },
  {
    id: 17,
    name: 'Mason Harris',
    age: 34,
    city: 'Detroit',
    balance: 1478.23,
    birthDate: '1987-05-01',
    discountRate: 0.11,
    status: true,
  },
  {
    id: 18,
    name: 'Isabella Young',
    age: 24,
    city: 'Charlotte',
    balance: 2315.34,
    birthDate: '1997-01-14',
    discountRate: 0.2,
    status: false,
  },
  {
    id: 19,
    name: 'Alexander King',
    age: 41,
    city: 'Salt Lake City',
    balance: 7893.45,
    birthDate: '1980-04-30',
    discountRate: 0.26,
    status: true,
  },
  {
    id: 20,
    name: 'Mia Green',
    age: 29,
    city: 'Orlando',
    balance: 5678.12,
    birthDate: '1992-10-22',
    discountRate: 0.13,
    status: false,
  },
];

const App = () => (
  <DataTable
    columns={columns}
    data={data}
    selectable={true}
    primaryKey="id"
    rowClassName={(row, index) => (index % 2 ? 'bg-stone-800' : '')}
    onSelectionChange={(selectedRows) => console.log('Selected Rows:', selectedRows)}
  />
);

export default App;

```
---

## 📖 Props

### `DataTableProps<T>`

| **Prop Name**         | **Type**                                                             | **Default**    | **Description**                                                                                  |
|-----------------------|----------------------------------------------------------------------|----------------|--------------------------------------------------------------------------------------------------|
| `columns`             | `Column<T>[]`                                                       | **Required**   | Defines the structure of the table columns, including labels, keys, formatting, and renderers.  |
| `data`                | `T[]`                                                               | **Required**   | Array of data objects to render in the table.                                                   |
| `primaryKey`          | `keyof T`                                                           | **Required**   | Unique identifier for each row (used for selection).                                            |
| `selectable`          | `boolean`                                                           | `false`        | Enables row selection.                                                                          |
| `onSelectionChange`   | `(selectedRows: T[]) => void`                                       | `undefined`    | Callback triggered when selected rows change.                                                   |
| `initialSelectedRows` | `T[]`                                                               | `[]`           | Rows preselected when the table renders.                                                        |
| `rowClassName`        | `string \| (row: T, index: number) => string`                       | `undefined`    | Apply custom class names to rows, either statically or dynamically based on row data.           |

### `Column<T>`

| **Key**      | **Type**                                               | **Description**                                                                                  |
|--------------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `key`        | `keyof T \| '__virtualKey1' \| '__virtualKey2'`        | Key from the data object to display in this column or a virtual key.                             |
| `label`      | `string`                                               | The column header text.                                                                          |
| `render`     | `(value: T[keyof T] \| undefined, row: T) => React.ReactNode` | Custom render function for column data.                                                         |
| `sortable`   | `boolean`                                              | If true, this column supports sorting.                                                          |
| `formatType` | `'date' \| 'currency' \| 'percentage' \| 'text'`       | Optional data formatting type for automatic formatting.                                          |

---


### Examples

#### Usage of `formatType`

```tsx
const columns = [
  { key: 'name', label: 'Name', sortable: true, formatType: 'text' },
  { key: 'balance', label: 'Balance', formatType: 'currency' },
  { key: 'birthDate', label: 'Birth Date', formatType: 'date' },
  { key: 'discountRate', label: 'Discount Rate', formatType: 'percentage' },
];
```

---

## 🎨 Customization

### Fallback Rendering
Missing or `null` values are automatically replaced with a `'-'`. You can customize this behavior using the `render` function for any column.

### Data Formatting
Use the `formatType` property in a column definition to enable automatic formatting for dates, currencies, percentages, and text.

### Row Styling
Use the `rowClassName` prop to dynamically apply styles to rows. This can be a string for static styles or a function that returns a string based on the row's data.

---

## 🛠️ Dependencies

- **React**: `^17.0.0` or `^18.0.0`
- **React DOM**: `^17.0.0` or `^18.0.0`
- **lucide-react**: For the sorting icons.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions! Feel free to submit issues or pull requests on [GitHub](https://github.com/maxeq/datatable).
