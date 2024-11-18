import { Ref, SVGProps, forwardRef } from "react";
import { cn } from "../../lib/utils";

const Close = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      className={cn("w-6 h-6 text-gray-800 dark:text-white", props.className)}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      aria-hidden="true"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  )
);

Close.displayName = "Close";

export default Close;
