import "src/css/Carousel.css"


// CarouselCards are displayed in the carousel
// For now, we'll leave these just as colors but they could easily be more complex
// objects such as images, or even more.
export default function CarouselCard({style}) {
    return (
        <div className="carouselCard" style={style}>
        </div>
    )
}