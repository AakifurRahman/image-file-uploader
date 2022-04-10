import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");

  const onClickhandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const bodyFormData = new FormData();

    files.map((file) => {
      bodyFormData.append("image", file);
    });

    axios({
      method: "post",
      url: "http://localhost:8000/api/upload",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        setIsSuccess(true);
        setMsg(response.data.msg);
      })
      .catch((response) => {
        //handle error
        setIsError(true);
        setMsg(response.data.msg);
      });
    setIsLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="" />
      </div>
    </div>
  ));

  return (
    <div
      className="App d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      )}
      {isError && (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      )}

      <div
        {...getRootProps()}
        className="border border-info  d-flex flex-column justify-content-center align-items-center rounded"
        style={{ padding: "100px 300px 100px 300px" }}
      >
        <input {...getInputProps()} />
        <img
          src="assets/icon.svg"
          alt=""
          className="mb-2"
          style={{ width: "50px" }}
        />
        <h4 className="mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Upload Photos
        </h4>

        <button className="btn btn-primary btn-lg">Select Photos</button>
        <p
          className="mt-3"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: "500" }}
        >
          Or
        </p>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: "700" }}>
          Drag and Drop photos here
        </p>
      </div>
      <div className="flex flex-column justify-content-center align-items-center">
        <p
          className="my-3 "
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: "700" }}
        >
          Image Preview
        </p>
        <div> {images}</div>
        <button className="btn btn-success mt-3" onClick={onClickhandler}>
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm me-3"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
