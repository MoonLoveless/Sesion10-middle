import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import WelcomeScreen from "../pages/welcome/WelcomeScreen";


const RoutesProject = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesProject;
