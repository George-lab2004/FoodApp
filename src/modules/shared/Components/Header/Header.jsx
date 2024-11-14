import header from "../../../../assets/header.svg";

export default function Header({ title, description }) {
  return (
    <div className="headercontainer p-5 row d-flex  align-items-center m-4 ">
      <div className="caption col-md-6 text-white ">
        <h3 className="fs-2 fw-bold">{title} </h3>
        <p>{description}</p>
      </div>
      <div className="col-md-6 text-end">
        <div className="header-img h-25 overflow-hidden">
          <img src={header} alt="" />
        </div>
      </div>
    </div>
  );
}
