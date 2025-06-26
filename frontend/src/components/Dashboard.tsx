import { useState } from "react";
import { Header } from "./Header";
import Posts from "./Posts";
import ShareModal from "./ShareModal";
import Sidebar from "./Sidebar";

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Header onClick={() => setIsOpen(true)} />
          <Posts />
          <ShareModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            sharedItemCount={3}
          />
        </div>
      </div>
    </div>
  );
};
