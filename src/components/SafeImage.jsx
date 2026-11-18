import { useState } from "react";
import { PLACEHOLDER_IMG } from "../lib/helpers";

/* <img> that swaps to a placeholder if the picture is missing. */
export default function SafeImage({ src, alt, className, lazy = true }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={className}
      src={failed ? PLACEHOLDER_IMG : src}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      onError={() => { if (!failed) setFailed(true); }}
    />
  );
}
