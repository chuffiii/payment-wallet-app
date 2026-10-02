"use server"

import { prisma } from "@repo/db";
import { authOptions } from "../auth"
import { getServerSession } from "next-auth"
export async function createonRampTransactions(provider:string,amount:number){
    const session = await getServerSession(authOptions);
    if(!session?.user ){
        return {
            message:"unauthorized request"
        }
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data : {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });

    return {
        message:"Done"
    }
}