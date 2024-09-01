import { Input } from "@/components/ui/input"

const CombineFun = () => {
  return (
    <div className="flex flex-col gap-1">
      <span>空投</span>
      <div className="my-1">
        <Input placeholder="钱包地址" />
      </div>
      <span>token发送</span>
      <div className="my-1">
        <Input placeholder="钱包地址" />
      </div>
    </div>
  )
}

export default CombineFun