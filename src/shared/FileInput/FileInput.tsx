import React, { useRef } from "react";

interface IFileInput {
  onChange(e: FileList | null): void,
}

export const FileInput = ({ onChange }: IFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      style={{ display: "none" }}
      type="file"
      accept=".jpg, .jpeg, .png"
      ref={inputRef}
      onChange={e => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        onChange(files);
      }}
    />
  );
};
