import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function PrimaryButton({ fullWidth = true, className = "", ...props }: Props) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-xl bg-clintrust-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition " +
        "hover:bg-clintrust-900 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-[1px] disabled:opacity-60 " +
        (fullWidth ? "w-full " : "") +
        className
      }
      {...props}
    />
  );
}
