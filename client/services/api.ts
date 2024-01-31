
import axios from "axios";

export const analyzeFile = async (file: FileList, onProgress: (progress: number) => void) => {
  const formData = new FormData();
  formData.append("file", file[0]);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/analyze`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
          );
          onProgress(percentCompleted);
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};