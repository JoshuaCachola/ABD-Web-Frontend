import React, { useState } from "react";

const CreateSkatePost = () => {
  const [ caption, setCaption ] = useState("");

  const handleSetCaption = e => setCaption(e.target.value);
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
    </form>
  );
};

export default CreateSkatePost;