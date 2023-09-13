import { useEffect } from "react";
import { useUserStore } from "../../state/user";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);
  return <div>{user ? <>Hi</> : <>No</>}</div>;
};
