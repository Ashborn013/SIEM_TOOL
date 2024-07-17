import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div className="flex   items-start h-screen  gap-4"> {/* Adjusted for center alignment and full height */}
      {/* <SideBar /> */}
      <NavBar />
      {/* <CardReapthing title="Awesome Shoes" content="If a dog chews shoes whose shoes does he choose?" />
      <CardReapthing title="Awesome Leg" content="If a dog chews shoes whose shoes does he choose?" />
      <CardReapthing title="Awesome Face" content="If a dog chews shoes whose shoes does he choose?" /> */}
      
      <SideBar/>

    </div>
  );
}

function CardReapthing({ title, content }) {
  return (
    <div className="flex justify-center"> {/* Centered the card horizontally */}
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">ClickMe</button>
          </div>
        </div>
      </div>
    </div>
  );
}