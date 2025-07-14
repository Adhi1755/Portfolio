import MainPage from "./components/Home";
import Footerbar from "./components/Footer";
import AboutMeContainer from "./components/About";
import Projects from "./components/Project";
import ContactComponent from "./components/Connect";




export default function Home() {
  return (
    <>
    <MainPage/>
    <AboutMeContainer/>
    <Projects/>
    <ContactComponent/>
    <Footerbar/>
</>
    
  );
}
