"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

export function PostCopyURL({ slug }) {
  const [isCopied, setCopied] = useState(false);
  const url = `https://fluxozen.app${slug}`;

  const handleClipboard = async () => {
    try {
      setCopied(true);

      await navigator.clipboard.writeText(url);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleClipboard}
      className="relative flex space-x-2 items-center"
    >
      <motion.div
        className="absolute -left-4 top-0.3"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0 : 1 }}
      >
        <MdOutlineContentCopy />
      </motion.div>

      <motion.div
        className="absolute -left-[24px] top-0.3"
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

      <span className="text-xs">Copiar link</span>
    </button>
  );
}
