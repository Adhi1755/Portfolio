import MainPage from "./components/Home";
import Footerbar from "./components/Footer";
import AboutMeContainer from "./components/About";
import Projects from "./components/Project";
import ContactComponent from "./components/Connect";
import Certifications from "./components/Certifications";
import SplashCursor from './components/SplashCursor'



export default function Home() {
  return (
    <>
    
    <MainPage/>
    <AboutMeContainer/>
    <Projects/>
    <ContactComponent/>
    <Footerbar/>
    <SplashCursor/>
</>
    
  );
}
