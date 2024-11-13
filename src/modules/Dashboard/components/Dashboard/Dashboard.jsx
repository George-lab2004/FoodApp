import Header from "../../../shared/Components/Header/Header";

export default function Dashboard({ loginData }) {
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
