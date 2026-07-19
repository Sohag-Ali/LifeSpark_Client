import { Outlet, useLocation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Container from "../coponents/Container/Container";
import HeroBanner from "../pages/Home/HeroBanner/HeroBanner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 500);
  }, [location]);
  return (
    <div className="bg-base-100">
      <header className="w-full bg-base-200/60 backdrop-blur-xl border-b border-border shadow-elevated sticky top-0 z-50  px-4 md:px-8">
        {/* <Container> */}
        <Navbar />
        {/* </Container> */}
      </header>

      {location.pathname === "/" && (
        <>
          <HeroBanner></HeroBanner>
        </>
      )}

      <Container>
        <Outlet></Outlet>
      </Container>

      <footer className="w-full bg-base-200 text-muted-foreground">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
};

export default RootLayout;
