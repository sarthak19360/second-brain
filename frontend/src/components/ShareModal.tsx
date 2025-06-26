import React, { useEffect, useRef } from "react";
import Button from "./Button";
import CopyIcon from "../icons/CopyIcon";
import { CrossIcon } from "../icons/CrossIcon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedItemCount: number;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  sharedItemCount,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CrossIcon />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Share Your Second Brain
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-5">
          Share your entire collection of notes, documents, tweets, and videos
          with others. They’ll be able to import your content into their own
          Second Brain.
        </p>

        {/* Share Button */}
        <Button variant="primary" icon={<CopyIcon />} onClick={onClose}>
          Share Brain
        </Button>

        {/* Footer Text */}
        <p className="text-xs text-gray-400 text-center mt-4">
          {sharedItemCount} item{sharedItemCount !== 1 ? "s" : ""} will be
          shared
        </p>
      </div>
    </div>
  );
};

export default ShareModal;
