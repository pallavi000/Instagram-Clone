import "@/styles/globals.css";
import "../../public/assets/css/style.css";
import { SessionProvider } from "next-auth/react";
import Layouts from "@/components/Layouts";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layouts>
        <Component {...pageProps} />;
      </Layouts>
    </SessionProvider>
  );
}
