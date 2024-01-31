import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CancelIcon from '@/public/icon/cancelIcon';
import UploadIcon from '@/public/icon/uploadIcon';
import React, { ChangeEvent } from 'react'

interface FileUploadFormProps {
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFileClear: (e: React.MouseEvent<HTMLButtonElement>)  => void;
    file: FileList | null;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({
    fileInputRef,
    handleSubmit,
    handleFileChange,
    handleFileClear,
    file
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y- mt-20 md:mt-0 bg-neutral-50/100 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-m px-1 py-6"
              encType="multipart/form-data"
            >
              <h1 className="text-4xl font-bold text-center">Upload File</h1>
              <div className="relative">
                <UploadIcon
                  className="absolute left-2 top-2 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
                <Input
                  className="pl-8 mt-12 cursor-pointer"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  id="file"
                />
                {file && (
                  <button
                    className="absolute right-3 top-2 font-bold font-inter cursor-pointer"
                    onClick={handleFileClear}
                  >
                    <CancelIcon />
                  </button>
                )}
              </div>
              <Button
                className="w-full h-8 mt-8 text-lg bg-blue-600 hover:bg-blue-700 rounded-full"
                disabled={!file}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
  )
}

export default FileUploadForm;