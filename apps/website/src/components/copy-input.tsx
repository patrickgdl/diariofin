"use client";

import { cn } from "@fluxozen/ui/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

type Props = {
  value: string;
  className?: string;
};

export function CopyInput({ value, className }: Props) {
  const [isCopied, setCopied] = useState(false);

  const handleClipboard = async () => {
    try {
      setCopied(true);

      await navigator.clipboard.writeText(value);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {}
  };

  return (
    <div
      className={cn(
        "flex items-center relative w-full rounded-md border border-border py-2 px-4",
        className
      )}
    >
      <div className="pr-7 text-[#878787] text-sm">{value}</div>
      <button type="button" onClick={handleClipboard}>
        <span className="sr-only">Copy</span>
        <motion.div
          className="absolute right-4 top-2.5"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0 : 1 }}
        >
          <MdOutlineContentCopy />
        </motion.div>

        <motion.div
          className="absolute right-4 top-2.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isCopied ? 1 : 0, scale: isCopied ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={17}
            fill="none"
          >
            <path
              fill="currentColor"
              d="m14 5.167-8 8L2.333 9.5l.94-.94L6 11.28l7.06-7.053.94.94Z"
            />
          </svg>
        </motion.div>
      </button>
    </div>
  );
}
