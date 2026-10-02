import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../../../components/getBalance";
import { BalanceCard } from "../../../components/BalanceCard";
import Link from "next/link";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();

    return (
        <div className="w-full p-8">
            
            <div className="mb-8">
                <div className="text-4xl font-bold text-[#6a51a6]">
                    Welcome, {session?.user?.name || "User"}
                </div>

                <div className="text-slate-500 mt-2 pl-1">
                    Manage your wallet from here.
                </div>
            </div>

            <div className="mb-8">
                <BalanceCard
                    amount={balance.amount}
                    locked={balance.locked}
                />
            </div>

            <div>
                <div className="text-xl font-bold mb-4">
                    Quick Actions
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Link href="/transfer">
                        <div className="border rounded-lg p-6 cursor-pointer hover:bg-slate-50">
                            <div className="text-lg font-bold">
                                Add Money
                            </div>

                            <div className="text-sm text-slate-500 mt-2">
                                Add money to your wallet
                            </div>
                        </div>
                    </Link>

                    <Link href="/p2p">
                        <div className="border rounded-lg p-6 cursor-pointer hover:bg-slate-50">
                            <div className="text-lg font-bold">
                                Send Money
                            </div>

                            <div className="text-sm text-slate-500 mt-2">
                                Send money to another user
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
}