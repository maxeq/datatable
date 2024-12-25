
export type VirtualKeys = '__virtualKey1' | '__virtualKey2';

export type Column<T> = {
  key: keyof T | VirtualKeys; 
  label: string; 
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode; 
  sortable?: boolean; 
};


export interface DataTableProps<T> {
  columns: Column<T>[]; 
  data: T[]; 
  primaryKey: keyof T; 
  selectable?: boolean; 
  onSelectionChange?: (selectedRows: T[]) => void;
  initialSelectedRows?: T[];
}
