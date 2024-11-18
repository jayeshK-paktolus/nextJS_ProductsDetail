import { Ref, SVGProps, forwardRef } from "react";
import {cn} from "../../lib/utils";

const Bars = forwardRef(
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
      <path stroke="currentColor" d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  )
);


Bars.displayName = "Bars";

export default Bars;
