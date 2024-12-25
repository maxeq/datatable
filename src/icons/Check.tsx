import { Check } from 'lucide-react';

interface CheckProps {
  classNames?: string;
  color?: string;
}

export default function CheckIcon({ classNames, color }: CheckProps) {
  return (
    <Check
      color={color}
      className={`check-icon h-3.5 w-3.5 text-primary-foreground ${classNames}`}
    />
  );
}
