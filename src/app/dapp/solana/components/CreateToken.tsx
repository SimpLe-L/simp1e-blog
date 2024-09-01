"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
const formSchema = z.object({
  tokenDescription: z.string().min(1, {
    message: "输入token描述",
  }),
  tokenName: z.string().min(1, {
    message: "输入token名称",
  }),
  tokenSymbol: z.string().min(1, {
    message: "输入token符号",
  }),
  tokenDecimals: z.string().min(1, {
    message: "输入token精度",
  }),
  tokenAmount: z.string().min(1, {
    message: "输入token数量",
  }),
})

const CreateToken = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenDescription: "",
      tokenName: "",
      tokenSymbol: "",
      tokenDecimals: "",
      tokenAmount: ""
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-center text-white font-bold">token创建</span>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="tokenDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">token描述</FormLabel>
                  <FormControl>
                    <Input placeholder="token 描述" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">token名称</FormLabel>
                  <FormControl>
                    <Input placeholder="token名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenSymbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">token符号</FormLabel>
                  <FormControl>
                    <Input placeholder="token符号" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenDecimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">token精度</FormLabel>
                  <FormControl>
                    <Input placeholder="token精度" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">token数量</FormLabel>
                  <FormControl>
                    <Input placeholder="token数量" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-1 w-full">创建token</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateToken;