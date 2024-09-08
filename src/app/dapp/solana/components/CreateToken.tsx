"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ChangeEvent, useCallback, useState } from "react"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  createV1,
  createMetadataAccountV3,
} from "@metaplex-foundation/mpl-token-metadata";

type formType = z.infer<typeof formSchema>
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
  })
})

const CreateToken = () => {

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [tokenImage, setTokenImage] = useState("");
  const { toast } = useToast()
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenDescription: "",
      tokenName: "",
      tokenSymbol: "",
      tokenDecimals: "",
      tokenAmount: "",
    },
  })
  // 上传图片到IPFS
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      const imgUrl = await uploadImagePinata(file[0]);
      setTokenImage(imgUrl!);
    }
  };

  const uploadImagePinata = async (file: File) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response: any = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          headers: {
            'pinata_api_key': "1ab71c29760f693e1a7c",
            'pinata_secret_api_key': "dbd1cea45250624cf2e9c0bfadbae80f0c11b5b0b45cb1f0c3f25a198c9ad25c"
          },
          body: formData
        });
        const finaDta = await response.json();
        return `https://gateway.pinata.cloud/ipfs/${finaDta.IpfsHash}`;
      } catch (error: any) {
        toast({
          description: "上传出错啦!",
        });
      }
    }
  };

  // 创建token
  const solanaTokenCreate = useCallback(
    async (token: formType) => {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeyPair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeyPair.publicKey,
        publicKey!
      );
      try {
        // setIsLoading(true);
        const metadataUrl = await uploadMetadata(token);
        // console.log(metadataUrl);
        const createMetadataInstruction =
          createMetadataAccountV3(
            {
              eddsa:,
              identity,
              payer: publicKey!,
              programs
            },
            {
              data: {
                name: token.tokenName,
                symbol: token.tokenSymbol,
                uri: metadataUrl as string,
                creators: null,
                sellerFeeBasisPoints: 0,
                uses: null,
                collection: null,
              },
              isMutable: false,
              collectionDetails: null,
            },
            // {
            //   metadata: PublicKey.findProgramAddressSync(
            //     [
            //       Buffer.from("metadata"),
            //       PROGRAM_ID.toBuffer(),
            //       mintKeyPair.publicKey.toBuffer(),
            //     ],
            //     PROGRAM_ID
            //   )[0],
            //   mint: mintKeyPair.publicKey,
            //   mintAuthority: publicKey,
            //   payer: publicKey,
            //   updateAuthority: publicKey,
            // },
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey!,
            newAccountPubkey: mintKeyPair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeyPair.publicKey,
            Number(token.tokenDecimals),
            publicKey!,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey!,
            tokenATA,
            publicKey!,
            mintKeyPair.publicKey
          ),
          createMintToInstruction(
            mintKeyPair.publicKey,
            tokenATA,
            publicKey!,
            Number(token.tokenAmount) * Math.pow(10, Number(token.tokenDecimals))
          ),
          createMetadataInstruction
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          { signers: [mintKeyPair] }
        );
        // setTokenMintAddress(mintKeyPair.publicKey.toString());
        // notify({
        //   type: "success",
        //   message: "Token creation successfully",
        //   txid: signature,
        // });
      } catch (error) {
        // notify({ type: "error", message: "Token creation failed, try later" });
      }
      // setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  const uploadMetadata = async (token: formType) => {
    // setIsLoading(true);
    const { tokenName, tokenSymbol, tokenDescription, } = token;
    // if (!name || !symbol || !description || !image) {
    //   return notify({ type: "error", message: "Data is Missing" });
    // }

    const data = JSON.stringify({
      name: tokenName,
      symbol: tokenSymbol,
      description: tokenDescription,
      image: tokenImage,
    });

    try {
      // const response = await axios({
      //   method: "POST",
      //   url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      //   data: data,
      //   headers: {
      //     pinata_api_key: "0281214db5108a6f5901",
      //     pinata_secret_api_key:
      //       "d427682fe9525e6fc5fb2114fa587ae12bff36f50ead3bad1379dcc0fcb253fb",
      //     "Content-Type": "application/json",
      //   },
      // });
      const response: any = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': "1ab71c29760f693e1a7c",
          'pinata_secret_api_key': "dbd1cea45250624cf2e9c0bfadbae80f0c11b5b0b45cb1f0c3f25a198c9ad25c"
        },
        body: data
      });
      const finaDta = await response.json();

      const url = `https://gateway.pinata.cloud/ipfs/${finaDta.IpfsHash}`;
      return url;
    } catch (error) {
      toast({
        description: "上传pinata json出错!",
      });
    }
    // setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-center text-white font-bold">token创建</span>
      <div className="flex justify-center items-center">
        {
          tokenImage ?
            <img
              src={tokenImage}
              alt="token"
              className="w-[120px] h-[120px]"
            />
            :
            <Label htmlFor="tokenPic" className="custum-file-upload flex flex-col">
              <span className="text-white">点击上传</span>
              <Input id="tokenPic" type="file" onChange={handleImageChange} />
            </Label>
        }
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(solanaTokenCreate)} className="space-y-2">
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