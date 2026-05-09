import { Outlet, useLocation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Container from "../coponents/Container/Container";
import HeroBanner from "../pages/Home/HeroBanner/HeroBanner";

const RootLayout = () => {

    const location = useLocation();
  return (


    <div className="bg-[#0F172A]">

        
      <header className="w-full bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] sticky top-0 z-50  px-4 md:px-8">
        {/* <Container> */}
          <Navbar />
        {/* </Container> */}
      </header>

        {
            location.pathname === "/"  && <>
            <HeroBanner></HeroBanner>
            </>
        }
      <Container>
        <Outlet></Outlet>
      </Container>


      <footer className="w-full bg-gradient-to-r from-slate-900 to-gray-900 text-gray-200">
        <Container>
          <Footer />
        </Container>
      </footer>

    </div>
  );
};

export default RootLayout;
