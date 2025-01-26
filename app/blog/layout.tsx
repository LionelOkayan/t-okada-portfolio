import Hero from "@/app/_components/Hero";

export const metadata = {
  title: "BLOG",
};

type Props = {
  children: React.ReactNode; // children を明示的に定義
};

export const revalidate = 60;

export default function blogLayout({ children }: Props) {
  return (
    <>
      <Hero title="BLOG" />
      {children}
    </>
  );
}
