"use client";

import React, { useMemo } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

type Props = {
  rawJson: any;
};

const DraftJsIconViewer: React.FC<Props> = ({ rawJson }) => {
  const editorState = useMemo(() => {
    try {
      const content = convertFromRaw(rawJson);
      return EditorState.createWithContent(content);
    } catch (e) {
      console.error("Draft.js parse error:", e);
      return EditorState.createEmpty();
    }
  }, [rawJson]);

  return (
    <div style={{ fontSize: "18px", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
      <Editor editorState={editorState} readOnly={true} onChange={() => {}} />
    </div>
  );
};

export default DraftJsIconViewer;
