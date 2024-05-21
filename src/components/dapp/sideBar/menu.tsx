"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IMenuItem } from "@/types"

import { combine } from "@/utils"

const MenuItem = ({ item }: { item: IMenuItem }) => {
  const pathname = usePathname();
  return (
    <Link href={item.path} className={combine("p-[10px] text-[--secondry-text] flex items-center rounded-[10px] hover:bg-[#2e374a]", `${pathname === item.path && 'bg-[#2e374a]'}`)}>
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuItem;