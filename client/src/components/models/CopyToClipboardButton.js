import React from "react";
import { useState } from 'react'

const CopyToClipboardButton = ({url}) => {

const [open, setOpen] = useState(false)

const handleClick = () => {
  setOpen(true)
  navigator.clipboard.writeText(url)
}

return (
    <>
      <button
        className="btn btn-sm btn-secondary col" 
        type="button"
        onClick={handleClick}>
        Copy Link to Share
      </button>
        {open ?
        <span
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard">
            Copied to clipboard
        </span>:
        <div>

        </div>
        }

    </>
  )
}
export default CopyToClipboardButton