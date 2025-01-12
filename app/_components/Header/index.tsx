"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false); // メニュー開閉状態
  const menuRef = useRef<HTMLDivElement | null>(null); // メニュー領域の参照
  const buttonRef = useRef<HTMLButtonElement | null>(null); // ボタンの参照

  // メニューの開閉をトグル
  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev); // 開閉をトグル
  };

  // メニュー外クリックの監視
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && // メニュー外かどうか
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) // ボタン外かどうか
      ) {
        setOpenMenu(false); // メニューを閉じる
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
      {/* ロゴ */}
      <h1>
        <Link href="/" className={styles.logoLink}>
          <Image
            className={styles.logoImg}
            src="/logo.png"
            alt="T.OKADA's PORTFOLIO"
            width={517}
            height={50}
            priority // LCPエラー解消
          />
        </Link>
      </h1>

      {/* ハンバーガーメニューアイコン */}
      <button
        ref={buttonRef} // ボタン領域の参照を設定
        onClick={handleMenuToggle}
        type="button"
        className="z-10 space-y-2"
      >
        <div
          className={`w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out ${
            openMenu ? "rotate-45 translate-y-2.5" : ""
          }`}
        />
        <div
          className={`w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out ${
            openMenu ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out ${
            openMenu ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        />
      </button>

      {/* メニュー */}
      <nav
        ref={menuRef} // メニュー領域の参照
        className={`fixed right-0 top-0 w-8/12 h-screen bg-slate-50 flex flex-col justify-start pt-8 px-3 ease-linear duration-200 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="mt-6">
          <li>
            <Link
              href="/"
              className="py-2 inline-block"
              onClick={() => setOpenMenu(false)} // クリックでメニューを閉じる
            >
              <span className="text-3xl font-bold text-main-color">HOME</span>
              <p className="text-base">トップページ</p>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="py-2 inline-block"
              onClick={() => setOpenMenu(false)} // クリックでメニューを閉じる
            >
              <span className="text-3xl font-bold text-main-color">
                PROFILE
              </span>
              <p className="text-base">プロフィール</p>
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className="py-2 inline-block"
              onClick={() => setOpenMenu(false)} // クリックでメニューを閉じる
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
