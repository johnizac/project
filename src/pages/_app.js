import "@/styles/globals.css";
import Layout from "../../components/Layout";
import RouteGuard from "../../components/routeGaurd";

export default function App({ Component, pageProps }) {
  return (
    <>
    <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </>
  )
}
