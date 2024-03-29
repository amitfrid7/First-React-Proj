const { useState } = React

export function LongTxt({ txt }) {
    const [isLongTxtShown, setisLongTxtShown] = useState(false)

    function onToggleLongTxt() {
        setisLongTxtShown((prev) => !prev)
    }

    function getTxtToShow(isLongTxtShown, txt) {
        if (txt.length < 100) return txt
        return isLongTxtShown ? txt : txt.substring(0, 100) + '...'
    }

    const txtToShow = getTxtToShow(isLongTxtShown, txt)

    return <section className="long-txt">
        <p>{txtToShow}</p>
        {txt.length > 100 && (
            <button onClick={onToggleLongTxt}>
                {isLongTxtShown ? 'Show Less' : 'Show More'}
            </button>
        )}
    </section>
}