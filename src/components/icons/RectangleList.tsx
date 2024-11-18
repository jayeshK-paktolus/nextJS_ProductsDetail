import { Ref, SVGProps, forwardRef } from "react";

import { cn } from "../../lib/utils";

const RectangleList = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      className={cn("w-6 h-6 text-gray-800 dark:text-white", props.className)}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      aria-hidden="true"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
        clipRule="evenodd"
      />
    </svg>
  )
);
RectangleList.displayName = "RectangleList";
export default RectangleList;
