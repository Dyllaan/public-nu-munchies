import { WithBusinessLoader } from "./components/business-loader";
import Header from "./components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WithBusinessLoader>
      <>
        <Header />
        <div>{children}</div>
      </>
    </WithBusinessLoader>
  );
}
