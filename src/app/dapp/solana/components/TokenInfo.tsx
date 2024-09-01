import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const TokenInfo = () => {
  return (
    <div className="flex flex-col gap-1">
      <span>token信息查询</span>
      <div className="my-1">
        <Input placeholder="token 地址" />
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <span>token名称</span>
          <span></span>
        </div>
        <div>
          <span>token符号</span>
          <span></span>
        </div>
        <div>
          <span>token地址</span>
          <span></span>
        </div>
        <Button>打开URL</Button>
      </div>
    </div>
  )
}

export default TokenInfo