import React from 'react'

const ProductRequestCard = ({singleRequest}) => {
    console.log(singleRequest, "props..")
  return (
    <div>
        <div className="1">{singleRequest.users[0]}admin</div>
        {/* <div className="2">{singleRequest.users[1]}from</div>
        <div className="3"></div> */}
        <button className="accept">Accept</button>
        <button className="reject">Reject</button>
    </div>
  )
}

export default ProductRequestCard