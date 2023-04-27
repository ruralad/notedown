import { useState } from "react";
import ContentSection from "./components/ContentSection";
import DirectorySection from "./components/DirectorySection";
import TitleBar from "./components/TitleBar";
import Loading from "./components/UtilitySection/Loading";

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="relative w-full h-screen flex flex-col bg-zinc-800 select-none overflow-hidden">
      <TitleBar />
      <div className="relative w-full h-full flex">
        {showContent ? (
          <>
            <DirectorySection />
            <ContentSection />
          </>
        ) : (
          <Loading setShowContent={setShowContent} />
        )}
      </div>
    </main>
  );
};

export default App;
