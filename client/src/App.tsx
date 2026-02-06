import Home from "./components/custom/pages/Home";
import Header from "./components/custom/Header";
import { Routes, Route } from "react-router";
import Footer from "./components/custom/Footer";
import Experience from "./components/custom/pages/Experience";
import Contact from "./components/custom/pages/Contact";
import Blog from "./components/custom/pages/Blog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exp" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
