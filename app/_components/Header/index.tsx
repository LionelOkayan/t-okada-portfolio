"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import React, { useState, useEffect, useRef } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // メニュー領域の参照

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };
  const handleLinkClick = () => {
    setOpenMenu(false);
  };

  // メニュー外クリックを監視するuseEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) // 型キャストで Node として扱う
      ) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <header className={styles.header}>
      <h1>
        <a href="/" className={styles.logoLink}>
          <Image
            className={styles.logoImg}
            src="/logo.png"
            alt="T.OKADA's PORTFOLIO"
            width={517}
            height={50}
          />
        </a>
      </h1>
      <button onClick={handleMenuOpen} type="button" className="z-10 space-y-2">
        <div
          className={
            openMenu
              ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
              : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "opacity-0 transition duration-500 ease-in-out"
              : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out"
              : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
      </button>
      <nav
        ref={menuRef} // メニュー領域に参照を設定
        className={
          openMenu
            ? "text-left fixed bg-slate-50 right-0 top-0 w-8/12 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300"
            : "fixed right-[-100%] ease-linear duration-300"
        }
      >
        <ul className="mt-6">
          <li className="">
            <Link
              href="/"
              className="py-2 inline-block"
              onClick={handleLinkClick}
            >
              <span className="text-3xl font-bold text-main-color">HOME</span>
              <p className="text-base">トップページ</p>
            </Link>
          </li>
          <li className="">
            <Link
              href="/profile"
              className="py-2 inline-block"
              onClick={handleLinkClick}
            >
              <span className="text-3xl font-bold text-main-color">
                PROFILE
              </span>
              <p className="text-base">プロフィール</p>
            </Link>
          </li>
          <li className="">
            <Link
              href="/portfolio"
              className="py-2 inline-block"
              onClick={handleLinkClick}
            >
              <span className="text-3xl font-bold text-main-color">
                PORTFOLIO
              </span>
              <p className="text-base">ポートフォリオ</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
