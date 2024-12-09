import ImageComponent from "../ui/ImageComponent"

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ImageComponent 
        src={"/assets/elipsisloading.gif"} 
        alt={"Loading..."} 
        width={150} 
        height={150} 
        priority
        unoptimized
      />
    </div>
  )
}

export default Loading