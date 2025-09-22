import React, { useState } from "react";
import { uploadApi } from "../api/axios";
import "./fileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };
  
  const handleFileUpload = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (!file) {
      setError("Please select a file first");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadApi.post(
        "/api/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      setSuccess("File uploaded and analyzed successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="file-upload-container">
        <p>Upload File :</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          required
        />

        <button onClick={handleFileUpload}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </>
  );
};

export default FileUpload;
