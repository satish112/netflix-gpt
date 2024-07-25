import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className=" text-2xl font-bold md:text-6xl">
            {title}
        </h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/4">
            {overview}
        </p>
        <div className="my-4 md:m-0">
            <button className=" bg-white text-black p-2 md:py-4 md:px-10 px-3 py-1 text-xl rounded-lg hover:bg-opacity-80">
                ▶️ Play
            </button>
            <button className="bg-gray-500 mx-2  text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hidden md:inline-block">
                More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle