import clsx from "clsx";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";

import "./styles.css";

type CodeEditorProps = {
  height?: number;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const CodeEditor: FCC<CodeEditorProps> = ({
  className,
  label,
  value,
  onChange,
}) => {
  return (
    <label className="flex h-full flex-col gap-1">
      {label && <p>{label}</p>}
      <div className="min-h-0 flex-1">
        <CodeMirror
          className={clsx(
            "overflow-hidden rounded border-[1px] border-neutral-300",
            className,
          )}
          value={value}
          extensions={[javascript({ jsx: true })]}
          theme={githubLight}
          onChange={onChange}
        />
      </div>
    </label>
  );
};
