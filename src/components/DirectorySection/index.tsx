import Header from "./Header";
import Notes from "./Notes";

const DirectorySection: React.FC = () => {
  return (
    <section className="w-1/3 h-full bg-white text-black p-5">
      <Header />
      <Notes />
    </section>
  );
};

export default DirectorySection;
