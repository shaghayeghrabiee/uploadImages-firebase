import React,{createContext,useState,useEffect} from 'react';
import { toast } from "react-toastify";
import { storage } from "../pages/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

export const imageContext = createContext();


const ImageContextProvider = (props) => {
  const [images, setImages] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [input, setInput] = useState("");

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (images == null) return;
    const imageRef = ref(storage, `images/${images.name + v4()}`);
    uploadBytes(imageRef, images).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
      toast.success("Picture is added successfully!");
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const deleteImage = (url) => {
    const pictureRef = ref(storage, url);
    deleteObject(pictureRef)
      .then(() => {
        setImageUrls(imageUrls.filter((image) => image !== url));
        toast.warn("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <imageContext.Provider
      value={{ images, setImages, imageUrls, input, deleteImage, uploadFile }}
    >
      {props.children}
    </imageContext.Provider>
  );
};

export default ImageContextProvider;