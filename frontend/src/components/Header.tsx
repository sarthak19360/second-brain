import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { UserIcon } from "../icons/UserIcon";
import Button from "./Button";

export const Header = () => {
  return (
    <div className="p-2 flex items-center gap-2 justify-between">
      <Button variant="primary" icon={<ShareIcon />}>
        Share Brain
      </Button>
      <Button variant="secondary" icon={<PlusIcon />}>
        Add Content
      </Button>
      <UserIcon />
    </div>
  );
};
