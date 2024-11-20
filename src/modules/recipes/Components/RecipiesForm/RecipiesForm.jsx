import { Link, useParams } from "react-router-dom";

export default function RecipiesForm() {
  const params = useParams();
  console.log(params);

  return (
    <>
      <main>
        <header className="header-wrapper">
          <div className="content-wrapper">
            <h3 className="fw-bold">
              Fill the <span>Recipies</span>
            </h3>
            <p>
              You can now fill the meals easily using the table and form, click
              here and sill it with the table
            </p>
          </div>

          <Link to={"/Dashboard/recipes"} className="btn-primary text-white">
            All Recipies
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z"
                fill="white"
              />
            </svg>
          </Link>
        </header>
        <form className="font-wrappers">
          <div className="input-wrapper">
            <input className="form-control" placeholder="Recipe Name" />
            <div>error</div>
          </div>

          <div className="input-wrapper" placeholder="Price">
            <input />
            <div>error</div>
          </div>

          <div className="input-wrapper">
            <select>
              <option value="">Tag</option>
            </select>
            <div>error</div>
          </div>

          <div className="input-wrapper">
            <select>
              <option value="">Category</option>
            </select>
            <div>error</div>
          </div>

          <div className="input-wrapper">
            <textarea name="" id="">
              kkkkkk
            </textarea>
            <div>error</div>
          </div>
        </form>
      </main>
      ;
    </>
  );
}
