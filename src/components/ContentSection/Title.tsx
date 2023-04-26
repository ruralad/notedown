type TitleProps = {
  titleError: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  updateTitle: () => void;
};

const Title: React.FC<TitleProps> = (props) => {
  return (
    <input
      className={
        "outline-none bg-inherit text-3xl font-bold p-4 pb-6 h-10 " +
        (props.titleError ? `border-b-2 border-b-red-600` : ``)
      }
      spellCheck={false}
      onChange={(e) => props.setTitle(e.target.value)}
      onBlur={props.updateTitle}
      value={props.title}
    />
  );
};

export default Title;
