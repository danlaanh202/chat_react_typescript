import { ChangeEvent, DragEvent, useState } from "react";
import axios from "axios";

export default function useUploadPreviewImage() {
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [progress, setProgress] = useState(0);
  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const file =
      ((e.target as HTMLInputElement).files as FileList)[0] ||
      (e as DragEvent).dataTransfer.files[0];

    previewFile(file);

    setFileInputState((e.target as HTMLInputElement).value); //file input
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string); //64 Encoded image
    };
  };

  const uploadImage = async (preset: string = "chat_app") => {
    try {
      return await axios
        .post(`${process.env.REACT_APP_API_URL}/cloudinary/post`, {
          //upload to cloudinary
          //upload image and return link of image
          file64: previewSource, //64EncodedImage
          preset: preset,
        })
        .then((response) => {
          return response; //url
        });
    } catch (err) {
      console.log("image error");
    }
  };
  const handleDeleteImage = () => {
    setPreviewSource("");
    setFileInputState("");
  };
  return {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
    progress,
  };
}
