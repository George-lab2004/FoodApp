import { useParams } from "react-router-dom";

export default function RecipiesForm() {
  const params = useParams();
  console.log(params);

  return <div>RecipiesForm : {params.recipesId}</div>;
}
