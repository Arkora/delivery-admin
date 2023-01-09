import React from 'react'

const Alert = ({alert,setAlert}) => {
  return (
    <>
      <div
          className={
            alert.err ? "bg-red-300 p-6 h-20 w-80 rounded-lg block" : "hidden"
          }
        >
          <div className="relative">
            <p className="text-red-600 font-normal text-lg">{alert.err}</p>
            <span
              className="absolute -top-5 -right-6 pr-3 flex items-center  cursor-pointer ins text-white"
              onClick={() => setAlert({ ...alert, err: "" })}
            >
              X
            </span>
          </div>
        </div>
        <div
          className={
            alert.res ? "bg-green-300 p-6 h-30 w-80 rounded-lg block" : "hidden"
          }
        >
          <div></div>
          <div className="relative">
            <p className="text-white font-normal text-lg">{alert.res}</p>
            <span
              className="absolute -top-5 -right-6 pr-3 flex items-center  cursor-pointer ins text-white"
              onClick={() => setAlert({ ...alert, res: "" })}
            >
              X
            </span>
          </div>
        </div>
    </>
  )
}

export default Alert