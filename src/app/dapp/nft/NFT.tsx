import Image from "next/image";
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { INftProperties } from '@/types';
interface ICardProp {
  data: INftProperties
}

const resetAddress = (owner: string) => `${owner.slice(0, 4)}...${owner.slice(38)}`;

export function NFTCard({ data }: ICardProp) {
  return (
    <Card className={cn("w-[260px]")}>
      <CardHeader>
        <CardTitle className="text-white"> #{String(data.tokenId)}</CardTitle>
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className="h-[210px]">
          <img
            src={data.uri}
            alt="NFT"
            width={210}
            height={210}
          />
        </div>

        <div>
          <div
            className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-white">
                等级: {data.level}
              </p>
            </div>
          </div>
          <div
            className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-white">
                fatherId: {String(data.faId)}
              </p>
            </div>
          </div>
          <div
            className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-white">
                motherId: {String(data.moId)}
              </p>
            </div>
          </div>
          <div
            className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-white">
                拥有者：{resetAddress(data.owner)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
