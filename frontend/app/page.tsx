import Header from "./layout-components/Header";

/**
 * @author Louis Figes W21017657
 * @description The home page of the app
 * @credit https://ui.shadcn.com/docs/components/typography
 */
export default function Home() {
  return (
    <div className="text-center">
      <Header />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        NU-MUNCHIES
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        NU-Munchies is a new food collection service giving you the option to
        get great goodies, for low prices!
      </p>
    </div>
  );
}
