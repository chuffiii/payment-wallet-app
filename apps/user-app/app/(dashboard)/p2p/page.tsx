import { prisma } from "@repo/db";
import { getBalance } from "../../../components/getBalance";
import { SendCard } from "../../../components/SendCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnP2PTransactions } from "../../../components/OnP2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


async function getOnP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
    }))
}

export default async function P2Ptransfer() {
    const balance = await getBalance();
    const transactions = await getOnP2PTransactions();

    return <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnP2PTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
}