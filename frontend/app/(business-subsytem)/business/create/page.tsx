import { RegisterBusinessCard } from "../../components/register-business-card";

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center py-10 bg-gray-200 relative overflow-hidden">
      <div className="z-10 relative inset-0 ">
        <RegisterBusinessCard></RegisterBusinessCard>
      </div>
      <img
        src="/business-subsystem/register-decor.jpg"
        alt="Decoration Background"
        className="absolute w-full h-full object-cover opacity-100 top-[50%] z-1"
      />
    </main>
  );
}
