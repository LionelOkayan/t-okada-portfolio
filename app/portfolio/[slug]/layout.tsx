type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function PortfolioLayout({ children }: Props) {
  return <>{children}</>;
}
