
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
import React from 'react';
import { DataTable } from '@maxeq-ui/datatable';

const columns = [
  { key: 'name', label: 'Name', sortable: true, formatType: 'text' },
  { key: 'age', label: 'Age', sortable: true, formatType: 'number' },
  { key: 'city', label: 'City', formatType: 'text' },
  { key: 'balance', label: 'Balance', sortable: true, formatType: 'currency' },
];

const data = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York', balance: 12345.67 },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles', balance: 9876.54 },
  { id: 3, name: 'Mike Johnson', age: 35, city: 'Chicago', balance: 5432.10 },
];

const App = () => (
  <DataTable
    columns={columns}
    data={data}
    primaryKey="id"
    selectable={true}
    initialSelectedRows={[data[0]]}
    onSelectionChange={(selectedRows) => console.log(selectedRows)}
    rowClassName={(row, index) =>
      row.age > 30 ? 'bg-red-100' : 'bg-green-100'
    }
  />
);

export default App;
```

---

## 📖 Props

### `DataTableProps<T>`

| **Prop Name**         | **Type**                                                             | **Default** | **Description**                                                                                  |
|-----------------------|----------------------------------------------------------------------|-------------|--------------------------------------------------------------------------------------------------|
| `columns`             | `Column<T>[]`                                                      | **Required** | Defines the structure of the table columns, including labels, keys, formatting, and renderers.  |
| `data`                | `T[]`                                                              | **Required** | Array of data objects to render in the table.                                                   |
| `primaryKey`          | `keyof T`                                                          | **Required** | Unique identifier for each row (used for selection).                                            |
| `selectable`          | `boolean`                                                         | `false`     | Enables row selection.                                                                          |
| `onSelectionChange`   | `(selectedRows: T[]) => void`                                      | `undefined` | Callback triggered when selected rows change.                                                   |
| `initialSelectedRows` | `T[]`                                                              | `[]`        | Rows preselected when the table renders.                                                        |
| `rowClassName`        | `string | (row: T, index: number) => string`                      | `undefined` | Apply custom class names to rows, either statically or dynamically based on row data.           |

### `Column<T>`

| **Key**       | **Type**                                               | **Description**                                                                                  |
|---------------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `key`         | `keyof T | '__virtualKey1' | '__virtualKey2'`          | Key from the data object to display in this column or a virtual key.                             |
| `label`       | `string`                                               | The column header text.                                                                          |
| `render`      | `(value: T[keyof T] | undefined, row: T) => React.ReactNode` | Custom render function for column data.                                                         |
| `sortable`    | `boolean`                                              | If true, this column supports sorting.                                                          |
| `formatType`  | `'date' | 'currency' | 'percentage' | 'text'`          | Optional data formatting type for automatic formatting.                                          |

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
