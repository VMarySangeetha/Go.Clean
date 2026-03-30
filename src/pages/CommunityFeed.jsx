import { useEffect, useState } from "react";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityFeed = () => {

  const [stories, setStories] = useState([]);
  const [liked, setLiked] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("https://go-clean-8c5n.onrender.com/api/story")
      .then(res => res.json())
      .then(data => {
        console.log("Stories:", data);
        setStories(data);
      })
      .catch(err => console.log(err));
  }, []);

  const toggleLike = (id) => {
    setLiked(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (

    <div className="min-h-screen bg-black text-white relative">

      {/* 🔥 ADD STORY BUTTON */}
      {user && (
        <button
          onClick={() => navigate("/add-story")}
          className="fixed top-24 right-5 z-50 bg-green-600 p-3 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </button>
      )}

      {/* EMPTY STATE */}
      {stories.length === 0 && (
        <div className="flex items-center justify-center h-screen text-xl">
          No stories found 🚫 <br />
          {user && "Click + to add one"}
        </div>
      )}

      {stories.map((story) => (

        <div key={story._id} className="h-screen relative">

          {/* IMAGE */}
          <img
            src={
              story.image
                ? story.image.startsWith("http")
                  ? story.image
                  : `https://go-clean-8c5n.onrender.com/uploads/${story.image}`
                : "https://via.placeholder.com/600x800"
            }
            className="w-full h-full object-cover absolute"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* CONTENT */}
          <div className="absolute bottom-10 left-4 right-4">

            <h2 className="font-bold text-lg">
              {story.userId?.name || "User"}
            </h2>

            <p className="text-sm mt-1">
              {story.text || ""}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-5 mt-3">

              <button onClick={() => toggleLike(story._id)}>
                <Heart
                  className={
                    liked.includes(story._id)
                      ? "text-red-500"
                      : "text-white"
                  }
                />
              </button>

              <MessageCircle />

            </div>

          </div>

        </div>

      ))}

    </div>

  );

};

export default CommunityFeed;