import { AuthContext } from "../../../../context/AuthContext.jsx";
import Header from "../../../shared/Components/Header/Header";
import { useContext } from "react";

export default function Dashboard() {
  let { loginData } = useContext(AuthContext);

  return (
    <>
      <Header
        title={`welcome ${loginData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
    </>
  );
}
