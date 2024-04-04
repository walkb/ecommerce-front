import "src/css/Carousel.css"
import { useState } from "react"


// CarouselCards are displayed in the carousel
// For now, we'll leave these just as colors but they could easily be more complex
// objects such as images, or even more.
// By adding props, we can have even more control over our hover effects.

export default function CarouselCard({backgroundColor, defaultWidth}) {
    // const [width, setWidth] = useState(defaultWidth);
    return (
        <div className="carouselCard" 
            style={{backgroundColor: `${backgroundColor}`, width: `${defaultWidth}%`}}>
        </div>
    )
}