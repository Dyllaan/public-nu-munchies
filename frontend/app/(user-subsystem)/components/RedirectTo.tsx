import { redirect } from "next/navigation";
import { use, useEffect } from "react";
import Loading from './Loading';

export default function RedirectTo({ to, message }: { to: string; message: string}) {
  useEffect(() => {
    redirect(to);
  }, []);

  return (
    <Loading action={message} />
  );
}