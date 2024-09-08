import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const CombineFun = () => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-center text-white font-bold">空投</span>
      <div className="my-1">
        <Input placeholder="钱包地址" />
      </div>
      <span className="text-center text-white font-bold">token发送</span>
      <div className="my-1">
        <Input placeholder="钱包地址" />
        <Button className="mt-1 w-full">发送</Button>
      </div>
    </div>
  )
}

export default CombineFun