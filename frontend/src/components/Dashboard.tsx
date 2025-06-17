import { Header } from "./Header";
import Posts from "./Posts";
import Sidebar from "./Sidebar";

export const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <div className="p-4">
          <Header />
          <Posts />
        </div>
      </div>
    </div>
  );
};
