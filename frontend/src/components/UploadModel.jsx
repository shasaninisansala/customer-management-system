import React, { useState } from "react";
import customerService from "../services/customerService";

export default function UploadModal({ show, onClose, refresh }) {

  const [file, setFile] = useState(null);

  if (!show) return null;

  const upload = () => {
    customerService.upload(file).then(() => {
      refresh();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded">

        <h2 className="text-lg mb-3">Upload Excel</h2>

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <div className="mt-3 flex gap-2">
          <button onClick={upload} className="btn-primary">Upload</button>
          <button onClick={onClose} className="btn-cancel">Cancel</button>
        </div>

      </div>
    </div>
  );
}