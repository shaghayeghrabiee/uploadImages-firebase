import React, { useContext } from "react";
import { Button, Container, Form, Col, Row, Card } from "react-bootstrap";
import style from "../css/home.module.css";
import NavBar from "./navBar";
import trashIcon from "../css/trash.svg";
import {imageContext} from '../context/imageContextProvider';

const Home = () => {
 const { imageUrls, deleteImage, uploadFile, setImages } =
   useContext(imageContext);
  
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
              accept="image/png, image/jpg,image/jpeg"
              onChange={(event) => {
                setImages(event.target.files[0]);
              }}
            />
          </Form.Group>

          <Form className="d-flex">
            <Button
              variant="primary"
              type="button"
              className="mt-2"
              onClick={uploadFile}
            >
              Upload
            </Button>
          </Form>
        </Form>
      </section>
      <Container className="d-flex align-items-center justify-content-center">
        <Row>
          {imageUrls.map((imageURL, index) => (
            <Col xs={4} key={index}>
              <Card className={style.imageContainer}>
                <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                  <Button variant="danger" className="mt-2">
                    
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
