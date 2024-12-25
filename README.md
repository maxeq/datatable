
# @maxeq-ui/datatable

> A highly customizable and reusable data table component for React, supporting sorting, selection, and custom rendering.

---

## ✨ Features

- **Customizable Columns**: Define labels, keys, and custom render logic for each column.
- **Sorting**: Enable sorting on specific columns.
- **Row Selection**: Allow single or multiple row selection with callbacks.
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

Here’s a basic example of how to use the `DataTable` component:

```tsx
import React from 'react';
import { DataTable } from '@maxeq-ui/datatable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'city', label: 'City' },
];

const data = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Mike Johnson', age: 35, city: 'Chicago' },
];

## Example Screenshot

![DataTable Example](https://raw.githubusercontent.com/maxeq-ui/<your-repo>/main/docs/datatable-example.png)



const App = () => (
  <DataTable
    columns={columns}
    data={data}
    primaryKey="id"
    selectable={true}
    onSelectionChange={(selectedRows) => console.log(selectedRows)}
  />
);

export default App;
```

---

## 📖 Props

### `DataTableProps<T>`

| **Prop Name**         | **Type**                                                             | **Default** | **Description**                                                                                  |
|-----------------------|----------------------------------------------------------------------|-------------|--------------------------------------------------------------------------------------------------|
| `columns`             | `Column<T>[]`                                                      | **Required** | Defines the structure of the table columns, including labels, keys, and optional renderers.     |
| `data`                | `T[]`                                                              | **Required** | Array of data objects to render in the table.                                                   |
| `primaryKey`          | `keyof T`                                                          | **Required** | Unique identifier for each row (used for selection).                                            |
| `selectable`          | `boolean`                                                         | `false`     | Enables row selection.                                                                          |
| `onSelectionChange`   | `(selectedRows: T[]) => void`                                      | `undefined` | Callback triggered when selected rows change.                                                   |
| `initialSelectedRows` | `T[]`                                                              | `[]`        | Rows preselected when the table renders.                                                        |

### `Column<T>`

| **Key**     | **Type**                                               | **Description**                                                                                  |
|-------------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `key`       | `keyof T | '__virtualKey1' | '__virtualKey2'`          | Key from the data object to display in this column or a virtual key.                             |
| `label`     | `string`                                               | The column header text.                                                                          |
| `render`    | `(value: T[keyof T] | undefined, row: T) => React.ReactNode` | Custom render function for column data.                                                         |
| `sortable`  | `boolean`                                              | If true, this column supports sorting.                                                          |

---

## 🎨 Customization

### Styling
This component uses utility classes (e.g., TailwindCSS). You can override or extend styles using your CSS framework or custom classes.

---

## 🛠️ Dependencies

- **React**: `^17.0.0` or `^18.0.0`
- **React DOM**: `^17.0.0` or `^18.0.0`
- **lucide-react**: For the `ArrowDown` and `ArrowUp` icons.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions! Feel free to submit issues or pull requests on [GitHub](https://github.com/maxeq/datatable).
