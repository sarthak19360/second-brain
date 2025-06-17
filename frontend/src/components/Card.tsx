import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[240px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-gray-700 text-sm font-medium mb-2">
        <div className="flex items-center gap-1">
          <span className="material-icons text-[18px]">
            {type === ContentType.YouTube ? <YoutubeIcon /> : <TwitterIcon />}
          </span>
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

      <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center mb-3">
        {type === ContentType.YouTube && (
          <iframe
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        {type === ContentType.Twitter && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>

      <div className="flex gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-[2px] rounded-full bg-indigo-100 text-indigo-600 font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-[11px] text-gray-400">Added on 16 June</p>
    </div>
  );
};
// const Card: React.FC<CardProps> = ({ title, items, tags, dateAdded }) => {
//   return (
//     <div className="w-[240px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between text-gray-700 text-sm font-medium mb-2">
//         <div className="flex items-center gap-1">
//           <span className="material-icons text-[18px]">
//             <NoteIcon />
//           </span>
//           Project Ideas
//         </div>
//         <div className="flex gap-1 text-gray-400 text-base">
//           <span className="material-icons text-[18px] cursor-pointer">
//             <ShareIcon />
//           </span>
//           <span className="material-icons text-[18px] cursor-pointer">
//             <DeleteIcon />
//           </span>
//         </div>
//       </div>

//       <h2 className="text-[15px] font-bold text-gray-800 mb-2">
//         Future Projects
//       </h2>

//       <ul className="list-disc list-inside text-sm text-gray-700 mb-3 leading-relaxed">
//         {items.map((item, idx) => (
//           <li key={idx}>{item}</li>
//         ))}
//       </ul>

//       <div className="flex gap-2 mb-2">
//         {tags.map((tag, idx) => (
//           <span
//             key={idx}
//             className="text-xs px-2 py-[2px] rounded-full bg-indigo-100 text-indigo-600 font-medium"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       <p className="text-[11px] text-gray-400">Added on {dateAdded}</p>
//     </div>
//   );
// };

// const Card: React.FC<CardProps> = ({
//   title,
//   tags,
//   dateAdded,
//   thumbnailUrl,
// }) => {
//   return (
//     <div className="w-[240px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between text-gray-700 text-sm font-medium mb-2">
//         <div className="flex items-center gap-1">
//           <span className="material-icons text-[18px]">
//             <YoutubeIcon />
//           </span>
//           <span className="truncate">{title}</span>
//         </div>
//         <div className="flex gap-1 text-gray-400 text-base">
//           <span className="material-icons text-[18px] cursor-pointer">
//             <ShareIcon />
//           </span>
//           <span className="material-icons text-[18px] cursor-pointer">
//             <DeleteIcon />
//           </span>
//         </div>
//       </div>

//       {/* Thumbnail or Placeholder */}
//       <div className="w-full h-[100px] bg-gray-200 rounded-lg flex items-center justify-center mb-3">
//         {thumbnailUrl ? (
//           <img
//             src={thumbnailUrl}
//             alt="YouTube Thumbnail"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         ) : (
//           <span className="material-icons text-gray-400 text-4xl">
//             insert_drive_file
//           </span>
//         )}
//       </div>

//       <div className="flex gap-2 mb-2">
//         {tags.map((tag, idx) => (
//           <span
//             key={idx}
//             className="text-xs px-2 py-[2px] rounded-full bg-indigo-100 text-indigo-600 font-medium"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       <p className="text-[11px] text-gray-400">Added on {dateAdded}</p>
//     </div>
//   );
// };

export default Card;
