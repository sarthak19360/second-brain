import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkIcon } from "../icons/LinkIcon";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[200px] min-h-screen bg-white border-r border-gray-200 p-4 rounded-tr-xl">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 mb-6">
        <NoteIcon />
        <h1 className="font-semibold text-sm text-gray-800">Second Brain</h1>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-5 text-sm text-gray-700">
        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-500">
          <TwitterIcon />
          <span>Tweets</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-500">
          <YoutubeIcon />
          <span>Videos</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-500">
          <LinkIcon />
          <span>Links</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
