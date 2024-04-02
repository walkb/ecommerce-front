export default function MenuChildren({children}) {
    return (
        <>
            {children.map((child, index) => {
                return (
                    <p key={index}>{child.title}</p>
                )}
            )}
        </>
    )
}