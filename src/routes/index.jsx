import Carousel from "../components/Carousel/Carousel";
import Showcase from "../components/Showcase";
import "../css/index.css";

export default function Index() {
    return (
        <>
            <Carousel delayTime={3000} transitionTime={1000} panels={3}></Carousel>
            {/* <Showcase title={"Featured"}></Showcase> */}
            {/* {items} */}
            {/* <button className="dark">Shop now</button> */}
        </>
    )
}