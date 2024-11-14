import noData from "../../../../assets/noData.svg";

export default function NoData() {
  return (
    <>
      <div className="text-center py-5">
        <img src={noData} alt="" />
        <h5>No Data</h5>
      </div>
    </>
  );
}
