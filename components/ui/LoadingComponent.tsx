import Panel from "@/components/io/Panel"
import Image from "next/image"

const Loading = () => {
  return (
    <Panel className="h-screen w-screen flex items-center justify-center">
      <img 
        src={"/assets/elipsisloading.gif"} 
        alt={"Loading..."} 
        width={150} 
        height={150} 
      />
    </Panel>
  )
}

export default Loading