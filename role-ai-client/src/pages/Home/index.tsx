import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";

export const Home = observer(() => {
  return <div>{userStore.user ? <>Hi</> : <>No</>}</div>;
});
