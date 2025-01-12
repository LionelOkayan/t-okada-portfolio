"use client";
import { motion } from "framer-motion";
import React from "react";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: -20, x: 0 }, // 画面外からのスライドイン（オプション）
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 20, x: 0 }, // 画面外へのスライドアウト（オプション）
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // 現在のパスを取得

  return (
    <motion.div
      key={pathname} // Keyをパスに設定
      className="site-wrapper"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit" // Exitアニメーションを設定
      transition={{
        type: "linear",
        duration: 0.5, // アニメーションの長さを調整
      }}
    >
      {children}
    </motion.div>
  );
}
