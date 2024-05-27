import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";

type CodeEditorProps = {
  height?: number;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const CodeEditor: FCC<CodeEditorProps> = ({
  className,
  height = 200,
  label,
  value,
  onChange,
}) => {
  return (
    <label className={className}>
      {label && <p className="mb-1">{label}</p>}
      <CodeMirror
        className="overflow-hidden rounded border-[1px] border-neutral-300"
        value={value}
        height={`${height}px`}
        extensions={[javascript({ jsx: true })]}
        theme={githubLight}
        onChange={onChange}
      />
    </label>
  );
};
