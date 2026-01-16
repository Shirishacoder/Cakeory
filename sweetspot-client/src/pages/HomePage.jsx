
import React from "react";
import ParallaxCollection from "../components/ParallaxCollection";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CalendarConnect from "../components/CalendarConnect";
import CalendarNotifications from "../components/CalendarNotifications";




function HomePage() {
  return (
    <div>
      <NavBar />
      
      <ParallaxCollection />


      <Footer />
    </div>
  );
}

export default HomePage;
