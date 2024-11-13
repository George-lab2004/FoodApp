import header from "../../../../assets/header.svg";

export default function Header({ title, description }) {
  return (
    <div className="headercontainer h-50 mx-3 p-5 d-flex justify-content-between align-items-center ">
      <div className="caption">
        <h3 className="fs-2 fw-bold">{title} </h3>
        <p>{description}</p>
      </div>
      <div className="header-img bg-warning">
        <img src={header} alt="" />
      </div>
    </div>
  );
}
