import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Plus, Share2, Bookmark, ChevronUp, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Story {
  _id: string;
  userId?: { name: string };
  text?: string;
  image?: string;
  createdAt?: string;
}

const API_BASE = "https://go-clean-8c5n.onrender.com";

const CommunityFeed = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [doubleTapId, setDoubleTapId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch(`${API_BASE}/api/story`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data);
        else if (data.stories) setStories(data.stories);
        else setStories([]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleDoubleTap = useCallback(
    (id: string) => {
      if (!liked.includes(id)) toggleLike(id);
      setDoubleTapId(id);
      setTimeout(() => setDoubleTapId(null), 800);
    },
    [liked, toggleLike]
  );

  const handleImageError = (storyId: string) => {
    setImageErrors((prev) => new Set([...prev, storyId]));
  };

  const getImageUrl = (story: Story) => {
    if (!story.image) return null;
    if (story.image.startsWith("http")) return story.image;
    if (story.image.startsWith("/")) return `${API_BASE}${story.image}`;
    return `${API_BASE}/uploads/${story.image}`;
  };

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-3 border-pink-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide overscroll-none"
    >
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/add-story")}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl shadow-pink-500/30 transition-all duration-300"
          style={{ touchAction: 'manipulation' }}
        >
          <Plus size={24} strokeWidth={2.5} />
        </motion.button>
      )}

      {stories.length === 0 && (
        <div className="h-screen snap-start flex flex-col items-center justify-center gap-4 px-4">
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
            <MessageCircle size={32} className="text-gray-600" />
          </div>
          <p className="text-xl font-bold text-white">No stories yet</p>
          <p className="text-gray-400 text-sm">Be the first to share!</p>
          {user && (
            <button
              onClick={() => navigate("/add-story")}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Create Story
            </button>
          )}
        </div>
      )}

      {stories.map((story, index) => {
        const imageUrl = getImageUrl(story);
        const isLiked = liked.includes(story._id);
        const isSaved = saved.includes(story._id);
        const hasImageError = imageErrors.has(story._id);

        return (
          <div
            key={story._id}
            className="h-screen snap-start snap-always relative flex items-center justify-center bg-black"
          >
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
              {imageUrl && !hasImageError ? (
                <img
                  src={imageUrl}
                  alt="story"
                  className="w-full h-full object-cover"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                  onError={() => handleImageError(story._id)}
                  loading={index > 1 ? "lazy" : "eager"}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                >
                  <ImageOff size={48} className="text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">Image unavailable</p>
                </div>
              )}

              <AnimatePresence>
                {doubleTapId === story._id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  >
                    <Heart size={100} className="text-pink-500 fill-pink-500 drop-shadow-2xl" strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>

              {stories.length > 1 && (
                <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10">
                  {stories.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-white"
                          : i < activeIndex
                          ? "bg-white/40"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

              <div className="absolute right-4 bottom-24 md:bottom-28 flex flex-col items-center gap-6 z-10">
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={() => toggleLike(story._id)}
                  className="flex flex-col items-center gap-1.5 active:scale-110 transition-transform"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Heart
                    size={28}
                    strokeWidth={isLiked ? 0 : 2}
                    className={`transition-all duration-200 ${
                      isLiked ? "text-pink-500 fill-pink-500 scale-110" : "text-white drop-shadow-lg"
                    }`}
                  />
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </motion.button>

                <button
                  className="flex flex-col items-center gap-1.5 active:scale-110 transition-transform"
                  style={{ touchAction: 'manipulation' }}
                >
                  <MessageCircle size={28} strokeWidth={2} className="text-white drop-shadow-lg" />
                  <span className="text-xs font-semibold text-white drop-shadow-md">Comment</span>
                </button>

                <button
                  className="flex flex-col items-center gap-1.5 active:scale-110 transition-transform"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Share2 size={26} strokeWidth={2} className="text-white drop-shadow-lg" />
                  <span className="text-xs font-semibold text-white drop-shadow-md">Share</span>
                </button>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={() => toggleSave(story._id)}
                  className="flex flex-col items-center gap-1.5 active:scale-110 transition-transform"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Bookmark
                    size={26}
                    strokeWidth={isSaved ? 0 : 2}
                    className={`transition-all duration-200 ${
                      isSaved ? "text-white fill-white scale-110" : "text-white drop-shadow-lg"
                    }`}
                  />
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </motion.button>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-4 right-20 z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-sm font-bold text-white">
                        {(story.userId?.name || "U").charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm leading-tight drop-shadow-md">
                      {story.userId?.name || "Anonymous"}
                    </h2>
                    <p className="text-xs text-gray-300 drop-shadow-md">
                      {getTimeAgo(story.createdAt)}
                    </p>
                  </div>
                </div>

                {story.text && (
                  <p className="text-sm text-white leading-relaxed line-clamp-3 drop-shadow-md font-medium">
                    {story.text}
                  </p>
                )}
              </motion.div>

              {index === 0 && stories.length > 1 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="absolute top-1/2 left-0 right-0 flex justify-center pointer-events-none z-5"
                >
                  <div className="flex flex-col items-center text-white/60 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <ChevronUp size={24} className="animate-bounce" strokeWidth={2.5} />
                    <span className="text-xs font-semibold">Swipe up</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityFeed;
