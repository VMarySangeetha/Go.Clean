import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStory = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const submit = async () => {

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("text", text);
    formData.append("image", image);

    await fetch("https://go-clean-8c5n.onrender.com/api/story", {
      method: "POST",
      body: formData
    });

    alert("Story added!");
    navigate("/feed");
  };

  if (!user) return <p>Please login</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-2xl font-bold">Add Story</h1>

      <textarea
        placeholder="Write your story..."
        className="border p-2 w-80"
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Post Story
      </button>

    </div>
  );
};

export default AddStory;