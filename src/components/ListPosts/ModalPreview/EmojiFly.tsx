import React, { useState, useEffect } from "react";

const EmojiFly: React.FC = () => {
  const [stateAnimation] = useState([
    { emoji: "💓", time: 5, delay: 0 },
    { emoji: "😍", time: 5.1, delay: 0.4 },
    { emoji: "🥰", time: 5.2, delay: 0.8 },
    { emoji: "💕", time: 5.3, delay: 1.2 },
    { emoji: "💖", time: 5.4, delay: 1.6 },
    { emoji: "❤️", time: 5.5, delay: 2 },
    { emoji: "💓", time: 5.6, delay: 2.4 },
    { emoji: "😍", time: 5.7, delay: 2.8 },
    { emoji: "🥰", time: 5.8, delay: 3.2 },
    { emoji: "💕", time: 5.9, delay: 3.6 },
    { emoji: "🧡", time: 6, delay: 4 },
  ]);

  useEffect(() => {
    const flyEmoji = document.querySelectorAll<HTMLElement>(".animate-fly");
    flyEmoji.forEach((item) => {
      const randomRight = Math.floor(Math.random() * 50);
      const randomPercent = Math.floor(Math.random() * 10);
      item.style.setProperty("--positonRandom", randomPercent + "%");
      item.style.setProperty("--rightRandom", randomRight + "px");
    });
  }, []);
  return (
    <div className="emoji-fly">
      {stateAnimation.map((item, index) => (
        <span
          key={index}
          className="animate-fly"
          style={{ animationDuration: `${item.time}s`, animationDelay: `${item.delay}s` }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiFly;
