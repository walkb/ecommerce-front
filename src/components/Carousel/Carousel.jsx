import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import "src/css/Carousel.css";
import "src/css/main.css";
import CarouselCard from "./CarouselCard"


// Carousel is a sliding carousel view of CarouselCards
// REQUIRES: delayTime, an integer >= 500
//           transitionTime, an integer >= 250 and no more than half of delayTime
//           panels, an integer that represents how many panels to be shown on screen at a time
// This could easily be modified to include a functor input to make it more customizable.
export default function Carousel({delayTime, transitionTime, panels}) {
    const [index, setIndex] = useState(0);

    // colors is used to set default background colors, repeated once
    const colors = ["#467750", "#89c07e", "#f0cd6e", "#467750", "#89c07e", "#f0cd6e"];

    const delay = delayTime > 500 ? delayTime : 500;
    const sliderTime = transitionTime > delayTime / 2 ? delayTime / 2 : transitionTime;
    const visiblePanels = typeof panels === 'undefined' ? 1 : panels
    const intervalRef = useRef();

    // makes the illusion of infinite carousel
    const noTransitionStyle = {transform: `translate3d(${-index * 100 / visiblePanels}%, 0, 0)`}
    const sliderStyle = {transition: `ease ${sliderTime}ms`, transform: `translate3d(${-index * 100 / visiblePanels}%, 0, 0)`}

    // panel width depending on input number of panels
    const panelWidth = 100 / visiblePanels;

    // slider() sets a delayed transition for the carousel slider window
    function slider() {
        let cur_delay = delay;
        cur_delay = index === 0 || index === colors.length / 2 ? delay / 2 : delay;
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(
            () =>
            setIndex((prevIndex) =>
            prevIndex >= colors.length / 2 ? 0 : prevIndex + 1),
            cur_delay
        );
    }
    
    useEffect(() => {
        slider();
        return () => {
        }
      }, [index]);

    return (
        <div className="carousel"
            onMouseEnter={() => {
                clearTimeout(intervalRef.current)
            }}
            onMouseLeave={() => {
                slider();
            }}
        >
            <div className="carouselInformation">
                <h2 className="carouselHeader">CAROUSEL</h2>
                <p className="carouselText" style={{width: `${60 / visiblePanels}vw`}}>Used to display images of products. Will pause on hover.</p>
                <div className="carouselButtons">
                    <Link>
                        <button className="white">Shop now</button>
                    </Link>
                </div>
            </div>
            <div className="carouselSlider"
            style={index === 0 ? noTransitionStyle : sliderStyle}>
                {colors.map((backgroundColor, index) => (
                    <CarouselCard 
                        key={index}
                        backgroundColor={backgroundColor}
                        defaultWidth={panelWidth}>
                    </CarouselCard>
                ))}
            </div>
        </div>
    )
}