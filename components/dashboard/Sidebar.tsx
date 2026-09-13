import Link from "next/link";

const navigation = [
    { label: "Dashboard", href: "/" },
    { label: "Apply", href: "/apply" },
    { label: "Evidence", href: "/evidence" },
    { label: "AI Agent", href: "/agent" },
    { label: "Decision", href: "/decision" },
    { label: "Credit Lines", href: "/credit-lines" },
    { label: "Transactions", href: "/transactions" },
];

export default function Sidebar() {
    return (
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a0d12] lg:flex lg:flex-col">
            <div className="flex h-20 items-center border-b border-white/10 px-6">
                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-black">
                    AC
                </div>

                <div>
                    <div className="text-sm font-semibold tracking-wide">
                        AUTONOMOUS
                    </div>
                    <div className="text-[10px] tracking-[0.25em] text-zinc-500">
                        CREDIT AGENT
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-3 py-6">
                <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                    Workspace
                </div>

                <div className="space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center rounded-xl px-3 py-3 text-sm transition ${item.label === "Dashboard"
                                    ? "bg-cyan-400/10 text-cyan-300"
                                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                                }`}
                        >
                            <span
                                className={`mr-3 h-1.5 w-1.5 rounded-full ${item.label === "Dashboard" ? "bg-cyan-300" : "bg-zinc-700"
                                    }`}
                            />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="border-t border-white/10 p-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                        Network
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Creditcoin Testnet
                    </div>

                    <div className="mt-2 text-[10px] text-zinc-600">
                        Attestcoin verification layer ready
                    </div>
                </div>
            </div>
        </aside>
    );
}