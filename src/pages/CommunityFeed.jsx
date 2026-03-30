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

        if (Array.isArray(data)) {
          setStories(data);
        } else if (data.stories) {
          setStories(data.stories);
        } else {
          setStories([]);
        }
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

    <div className="mt-16 bg-black text-white">

      {/* ✅ FIX BUTTON (NO MORE NAVBAR OVERLAP) */}
      {user && (
        <button
          onClick={() => navigate("/add-story")}
          className="fixed bottom-6 right-6 z-[9999] bg-green-600 hover:bg-green-700 p-4 rounded-full shadow-xl"
        >
          <Plus size={26} />
        </button>
      )}

      {/* ✅ EMPTY */}
      {stories.length === 0 && (
        <div className="flex items-center justify-center h-[80vh] text-xl">
          No stories found 🚫
        </div>
      )}

      {/* ✅ STORIES */}
      {stories.map((story) => (

        <div
          key={story._id}
          className="h-[90vh] w-full relative flex items-center justify-center border-b border-gray-800"
        >

          {/* IMAGE */}
          <img
            src={
              story.image
                ? story.image.startsWith("http")
                  ? story.image
                  : `https://go-clean-8c5n.onrender.com/uploads/${story.image}`
                : "https://via.placeholder.com/600x800"
            }
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}
          <div className="absolute bottom-10 left-4 right-4 z-10">

            <h2 className="font-bold text-lg">
              {story.userId?.name || "User"}
            </h2>

            <p className="text-sm mt-1">
              {story.text || ""}
            </p>

            <div className="flex gap-5 mt-3">

              <button onClick={() => toggleLike(story._id)}>
                <Heart
                  size={28}
                  className={
                    liked.includes(story._id)
                      ? "text-red-500"
                      : "text-white"
                  }
                />
              </button>

              <MessageCircle size={28} />

            </div>

          </div>

        </div>

      ))}

    </div>

  );

};

export default CommunityFeed;