import { ChangeEvent } from "react";

export interface FileUploadFormProps {
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFileClear: (e: React.MouseEvent<HTMLButtonElement>)  => void;
    file: FileList | null;
}