declare global {
  interface Window {
    twttr: any;
  }
}

import React, { useState, useEffect, useRef } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

enum ContentType {
  YouTube = "youtube",
  Twitter = "twitter",
}

interface CardProps {
  title: string;
  link: string;
  tags: string[];
  type: ContentType;
}

const Card: React.FC<CardProps> = ({ title, link, tags, type }) => {
  const twitterEmbedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      type === ContentType.Twitter &&
      twitterEmbedRef.current &&
      window?.twttr?.widgets
    ) {
      window.twttr.widgets.load(twitterEmbedRef.current);
    }
  }, [type, link]);

  return (
    <div className="w-full max-w-[320px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[240px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between text-gray-700 text-sm font-medium mb-2">
        <div className="flex items-center gap-1 truncate">
          {type === ContentType.YouTube ? <YoutubeIcon /> : <TwitterIcon />}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-1 text-gray-400 text-base">
          <span className="material-icons text-[18px] cursor-pointer">
            <ShareIcon />
          </span>
          <span className="material-icons text-[18px] cursor-pointer">
            <DeleteIcon />
          </span>
        </div>
      </div>

      {/* Embed */}
      <div className="w-full bg-gray-200 rounded-lg mb-3">
        {type === ContentType.YouTube && (
          <iframe
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-lg"
          />
        )}

        {type === ContentType.Twitter && (
          <div
            ref={twitterEmbedRef}
            className="w-full min-h-[200px] rounded-lg overflow-hidden"
          >
            <blockquote
              className="twitter-tweet"
              data-theme="light"
              data-width="100%"
              style={{ width: "100%", margin: 0 }}
            >
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-[2px] rounded-full bg-indigo-100 text-indigo-600 font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-gray-400">Added on 16 June</p>
    </div>
  );
};

export default Card;
