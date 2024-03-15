import Header from "../layout-components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="m-2">{children}</div>
    </>
  );
}
