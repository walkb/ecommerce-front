import "src/css/Footer.css"

export default function Footer() {
    return (
        <>
        <div className="spacer" style={{height: "40vh"}}></div>
        <div className="FooterDivider">
            <p>Committed to making a difference and writing mission statements.</p>
        </div>
        <div className="Footer">
            <div>
                <p className="default-font bold">Connect with me</p>
                <a className="default-font" href="https://www.linkedin.com/in/walker-broadbent">Linkedin</a>
                <a className="default-font" href="https://www.walkerbroadbent.com">My unfinished website</a>
            </div>
            <div>
                <p className="default-font bold">Other various links</p>
                <a className="default-font">Links</a>
                <a className="default-font">More links</a>
            </div>
            <div>
                <p className="default-font bold">Even more links</p>
                <a className="default-font">Links</a>
                <a className="default-font">More links</a>
            </div>
            <div>
                <p className="default-font bold">Even more links</p>
                <a className="default-font">Links</a>
                <a className="default-font">More links</a>
            </div>
            <div>
                <p className="default-font bold">Even more links</p>
                <a className="default-font">Links</a>
                <a className="default-font">More links</a>
            </div>
        </div>
        </>
    )
}