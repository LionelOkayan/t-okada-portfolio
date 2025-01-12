import Hero from "@/app/_components/Hero";

export const metadata = {
  title: "PROFILE",
};
type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function ProfileLayout({ children }: Props) {
  return (
    <>
      <Hero title="PROFILE" />
      {children}
    </>
  );
}
