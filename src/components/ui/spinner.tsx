import type { ReactElement } from "react";

import { cn } from "@/lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";

const spinnerSizeClassName: Record<SpinnerSize, string> = {
  sm: "size-5",
  md: "size-8",
  lg: "size-10",
};

export type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

export const Spinner = ({
  size = "md",
  className,
}: SpinnerProps): ReactElement => (
  <span
    role="status"
    className={cn(
      "inline-flex shrink-0 items-center justify-center text-estapar-primary",
      spinnerSizeClassName[size],
      "animate-spin motion-reduce:animate-none",
      className,
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="size-[1em] shrink-0"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </span>
);
