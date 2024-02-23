import { useState } from 'react';
import tus, { Upload, UploadOptions } from 'tus-js-client';

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const token = localStorage.getItem("access_token"); 
    const options: UploadOptions = {
      endpoint: 'https://acela-uploads.us-west.web3telekom.xyz',
      retryDelays: [0, 1000, 3000, 5000],
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onError: (error) => {
        console.error('Upload error:', error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = (bytesUploaded / bytesTotal) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      onSuccess: () => {
        console.log('Upload complete');
      },
    };

    const upload = new Upload(file, options);
    upload.start();
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}

export default VideoUpload;