import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export function FormWarning({ message }: FormErrorProps) {

    if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 bg-warning/15 p-3 rounded-md text-sm text-yellow-500">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
