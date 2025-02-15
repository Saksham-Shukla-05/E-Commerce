import React, { useEffect, useState } from "react";

const [photo, setPhoto] = useState("");
const submitFile = () => {
  const data = new FormData();
  data.append("file", photo);
  data.append("upload_preset", "ml_default");
  data.append("cloud_name", "dlycinwrl");

  fetch("https://api.cloudinary.com/v1_1/dlycinwrl/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
return (
  <>
    <div>
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={submitFile}>Upload Image</button>
    </div>
  </>
);

export default Home;
