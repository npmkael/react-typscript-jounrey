import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import PostSection from "./components/Post/PostSection";
import Archive from "./components/Archive/Archive";
import Footer from "./components/Footer/Footer";
import { PostProvider } from "./context/PostProvider";

const App = () => {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <Header />
        <PostSection />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
};

export default App;
