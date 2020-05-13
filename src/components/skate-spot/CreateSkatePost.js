import React, { useState } from "react";

const CreateSkatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFileInput] = useState(null);

  const handleSetCaption = e => setCaption(e.target.value);
  const handleFileInput = e => {
    setFileInput(e.target.file[0]);
  };
  const handleSubmit = e => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name={caption}
        onChange={handleSetCaption}
        placeholder="Caption"
      />
      <input
        type="file"
        name={file}
        onChange={handleFileInput}
      />
      <button>Post</button>
    </form>
  );
};

export default CreateSkatePost;
