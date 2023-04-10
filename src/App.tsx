import ContentSection from "./components/ContentSection";
import DirectorySection from "./components/DirectorySection";
import TitleBar from "./components/TitleBar";

const App: React.FC = () => {
  return (
    <main className="relative w-full h-screen flex flex-col bg-zinc-800 select-none">
      <TitleBar />
      <div className="relative w-full h-full flex">
        <DirectorySection />
        <ContentSection />
      </div>
    </main>
  );
};

export default App;
