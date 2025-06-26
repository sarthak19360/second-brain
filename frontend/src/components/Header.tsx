import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { UserIcon } from "../icons/UserIcon";
import Button from "./Button";

export const Header = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="p-2 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
      <Button
        variant="primary"
        icon={<ShareIcon />}
        onClick={() => {
          onClick;
        }}
      >
        Share Brain
      </Button>
      <Button variant="secondary" icon={<PlusIcon />}>
        Add Content
      </Button>
      <UserIcon />
    </div>
  );
};
