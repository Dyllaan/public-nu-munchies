import Header from "../layout-components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-4 p-4">{children}</div>
    </>
  );
}
