const Notification = ({newMessage}) => {
    if (newMessage === '') {
        return null
    } else if (newMessage.includes("successfully")) {
        return (
            <div className="success">
                {newMessage}
            </div>
        )
    } else {
        return (
            <div className="fail">
                {newMessage}
            </div>
        )
    }
}

export default Notification