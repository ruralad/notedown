import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "../../store/UiStore";
import Header from "./Header";
import Notes from "./Notes";

const DirectorySection: React.FC = () => {
  const showDirectory = useUiStore((state) => state.showDirectory);

  return (
    <AnimatePresence initial={false}>
      {!!showDirectory && (
        <motion.section
          key="directory"
          animate={{
            x: 0,
            width: "33.3333%",
          }}
          initial={{ width: 0 }}
          exit={{ x: -300, width: 0 }}
          className="w-1/3 h-full select-none"
        >
          <div className="p-6">
            <Header />
            <Notes />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default DirectorySection;
