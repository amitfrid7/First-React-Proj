import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 3000)
        })

        return unsubscribe
    }, [])

    if (!msg) return <React.Fragment></React.Fragment>
    return <div className={"user-msg " + msg.type}>
        {msg.txt}
    </div>
}