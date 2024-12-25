import { DataTableProps } from './types';
declare const DataTable: {
    <T extends object>({ columns, data, primaryKey, selectable, initialSelectedRows, onSelectionChange, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default DataTable;
