import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Plus, Share2, Bookmark, ChevronUp } from "lucide-react";
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

  const getImageUrl = (story: Story) => {
    if (!story.image) return null;
    return story.image.startsWith("http")
      ? story.image
      : `${API_BASE}/uploads/${story.image}`;
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

  // Track active story on scroll
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background scrollbar-hide"
    >
      {/* Add Story FAB */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/add-story")}
          className="fixed bottom-8 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg shadow-primary/30 transition-colors"
        >
          <Plus size={24} />
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
        </motion.button>
      )}

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="h-screen snap-start flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <MessageCircle size={32} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-semibold text-foreground">No stories yet</p>
          <p className="text-muted-foreground text-sm">Be the first to share!</p>
          {user && (
            <button
              onClick={() => navigate("/add-story")}
              className="mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              Create Story
            </button>
          )}
        </div>
      )}

      {/* Stories */}
      {stories.map((story, index) => {
        const imageUrl = getImageUrl(story);
        const isLiked = liked.includes(story._id);
        const isSaved = saved.includes(story._id);

        return (
          <div
            key={story._id}
            className="h-screen snap-start relative flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-lg mx-auto overflow-hidden">
              {/* Image */}
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="story"
                  className="w-full h-full object-cover"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                  loading={index > 1 ? "lazy" : "eager"}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center bg-secondary"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                >
                  <p className="text-muted-foreground text-lg">No Image</p>
                </div>
              )}

              {/* Double-tap heart animation */}
              <AnimatePresence>
                {doubleTapId === story._id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  >
                    <Heart size={80} className="text-primary fill-primary drop-shadow-lg" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress dots */}
              {stories.length > 1 && (
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-10">
                  {stories.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-6 bg-foreground"
                          : "w-2 bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 overlay-gradient pointer-events-none" />

              {/* Right side actions */}
              <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
                <motion.button
                  whileTap={{ scale: 1.3 }}
                  onClick={() => toggleLike(story._id)}
                  className="flex flex-col items-center gap-1"
                >
                  <Heart
                    size={28}
                    className={`transition-colors ${
                      isLiked ? "text-primary fill-primary" : "text-foreground"
                    }`}
                  />
                  <span className="text-xs text-foreground/70">Like</span>
                </motion.button>

                <button className="flex flex-col items-center gap-1">
                  <MessageCircle size={28} className="text-foreground" />
                  <span className="text-xs text-foreground/70">Chat</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                  <Share2 size={24} className="text-foreground" />
                  <span className="text-xs text-foreground/70">Share</span>
                </button>

                <motion.button
                  whileTap={{ scale: 1.3 }}
                  onClick={() => toggleSave(story._id)}
                  className="flex flex-col items-center gap-1"
                >
                  <Bookmark
                    size={24}
                    className={`transition-colors ${
                      isSaved ? "text-foreground fill-foreground" : "text-foreground"
                    }`}
                  />
                  <span className="text-xs text-foreground/70">Save</span>
                </motion.button>
              </div>

              {/* Bottom content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-4 right-16 z-10"
              >
                {/* User avatar + name */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="story-ring">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
                      {(story.userId?.name || "U").charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground text-sm leading-tight">
                      {story.userId?.name || "Anonymous"}
                    </h2>
                    <p className="text-xs text-foreground/50">
                      {getTimeAgo(story.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Story text */}
                {story.text && (
                  <p className="text-sm text-foreground/90 leading-relaxed line-clamp-3">
                    {story.text}
                  </p>
                )}
              </motion.div>

              {/* Scroll hint on first story */}
              {index === 0 && stories.length > 1 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="absolute top-1/2 left-0 right-0 flex justify-center pointer-events-none"
                >
                  <div className="flex flex-col items-center text-foreground/40">
                    <ChevronUp size={24} className="animate-bounce" />
                    <span className="text-xs">Swipe up</span>
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