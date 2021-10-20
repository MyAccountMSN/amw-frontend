import React from 'react'

const Message = ({ variant, children }) => {
    
    return (
        <>
            {
                variant === 'error' ?
                    <div className="msg-error">
                        {children}
                    </div>
                :
                    <div className="msg-success">
                        {children}
                    </div>
            }
        
        </>
    )
}

export default Message
