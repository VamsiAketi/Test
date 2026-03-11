import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({ label, error, className = "", id, ...props }: Props) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        id={inputId}
        className={
          "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition " +
          "placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 " +
          (error ? "border-red-300 focus:border-red-400 focus:ring-red-100 " : "border-slate-200 ") +
          className
        }
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
