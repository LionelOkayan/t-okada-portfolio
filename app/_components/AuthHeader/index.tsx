import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header
      style={{
        position: "fixed",
        padding: "16px 24px 8px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Link href="/" style={{ display: "flex" }}>
        <Image
          src="/logo.png"
          alt="T.OKADA's PORTFOLIO"
          width={517}
          height={50}
          priority
          style={{ height: "28px", width: "auto" }}
        />
      </Link>
    </header>
  );
}
