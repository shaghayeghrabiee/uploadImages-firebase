import React, { useState, useEffect } from "react";
import { Button, Container, Form, Col, Row, Card } from "react-bootstrap";
import style from "../css/home.module.css";
import NavBar from "./navBar";
import trashIcon from "../css/trash.svg";
import { toast } from "react-toastify";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const Home = () => {
  const [images, setImages] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

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
    <>
      <NavBar />
      <section className={style.flexbox}>
        <Form encType="multipart/form-data">
          <Form.Group>
            <h3 className="mb-3 text-center">Select your image</h3>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => {
                setImages(event.target.files[0]);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className="mt-2"
            onClick={uploadFile}
          >
            Upload
          </Button>
        </Form>
      </section>
      <Container className="d-flex align-items-center justify-content-center">
        <Row>
          {imageUrls.map((imageURL, index) => (
            <Col xs={4} key={index}>
              <Card className={style.imageContainer}>
                <Card.Img
                  variant="top"
                  src={imageURL}
                 
                />
                <Card.Body>
                  <Button variant="danger" className="mt-2">
                    {" "}
                    <img
                      src={trashIcon}
                      alt="Remove"
                      style={{ width: "20px" }}
                      onClick={() => deleteImage(imageURL)}
                    />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
