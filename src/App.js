import React, { useCallback } from 'react';
import './App.css';
import Aurora from './Components/Aurora';
import StarBorder from './Components/StarBorder';
import { useDropzone } from 'react-dropzone';
import ShinyText from './Components/ShinyText';
import Dock from './Components/Dock';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';  // Import axios to make HTTP requests

function MyDropzone() {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]; // Handle only the first file
    const formData = new FormData();
    formData.append('file', file);  // Append the file to the formData

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);  // Handle success response

      // Open the uploaded file's link in a new tab
      if (response.data.fileUrl) {
        window.open(response.data.fileUrl, '_blank');  // Open the file URL
      }
    } catch (error) {
      console.error('Error uploading file:', error);  // Handle error
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>
          <ShinyText text="DROP IT NIGGER!" disabled={false} speed={2} className="custom-class" />
        </p>
      ) : (
        <p>
          <ShinyText text="Drag & Drop" disabled={false} speed={2} className="custom-class" />
        </p>
      )}
    </div>
  );
}

const items = [
  { icon: <HomeIcon size={18} />, label: 'Home', onClick: () => (window.location.href = '/') },
  { icon: <CloudUploadIcon size={18} />, label: 'File Host', onClick: () => (window.location.href = '/upload') },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '100%', height: '100dvh' }}>
          <Aurora colorStops={["#00d8ff", "#7cff67", "#00d8ff"]} blend={0.5} amplitude={1.0} speed={0.5} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '200px' }}>
            <StarBorder as="container" className="custom-class" color="green" speed="3s">
              <MyDropzone />
            </StarBorder>
          </div>
          <div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
            <Dock items={items} panelHeight={58} baseItemSize={50} magnification={70} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
