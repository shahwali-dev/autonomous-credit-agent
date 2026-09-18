"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    FilePlus2,
    ShieldCheck,
    Bot,
    GitBranch,
    WalletCards,
    ArrowLeftRight,
    Network,
    CheckCircle2,
} from "lucide-react";


const navigation = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Apply Credit",
        href: "/apply",
        icon: FilePlus2,
    },
    {
        label: "Evidence Layer",
        href: "/evidence",
        icon: ShieldCheck,
    },
    {
        label: "AI Agent",
        href: "/agent",
        icon: Bot,
    },
    {
        label: "Decision Engine",
        href: "/decision",
        icon: GitBranch,
    },
    {
        label: "Credit Lines",
        href: "/credit-lines",
        icon: WalletCards,
    },
    {
        label: "Transactions",
        href: "/transactions",
        icon: ArrowLeftRight,
    },
];


export default function Sidebar() {

    const pathname = usePathname();


    return (

        <aside
            className="
      hidden
      w-72
      shrink-0
      border-r
      border-white/10
      bg-[#080b10]
      lg:flex
      lg:flex-col
      "
        >



            {/* BRAND */}

            <div
                className="
        flex
        h-24
        items-center
        border-b
        border-white/10
        px-6
        "
            >

                <div
                    className="
          mr-4
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-cyan-300
          text-sm
          font-black
          text-black
          shadow-[0_0_30px_rgba(34,211,238,0.25)]
          "
                >
                    AC
                </div>



                <div>

                    <div
                        className="
            text-sm
            font-bold
            tracking-[0.12em]
            text-white
            "
                    >
                        AUTONOMOUS
                    </div>


                    <div
                        className="
            mt-1
            text-[10px]
            tracking-[0.35em]
            text-zinc-500
            "
                    >
                        CREDIT AGENT
                    </div>


                </div>


            </div>





            {/* NAVIGATION */}


            <nav className="flex-1 px-4 py-6">


                <div
                    className="
          mb-4
          px-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.25em]
          text-zinc-600
          "
                >
                    Intelligence Console
                </div>



                <div className="space-y-1">


                    {navigation.map((item) => {


                        const Icon = item.icon;


                        const active =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);



                        return (

                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                group
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                transition-all

                ${active
                                        ?
                                        "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.06)]"
                                        :
                                        "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                                    }
                `}
                            >


                                <Icon
                                    size={17}
                                    className={
                                        active
                                            ?
                                            "text-cyan-300"
                                            :
                                            "text-zinc-600 group-hover:text-zinc-300"
                                    }
                                />


                                <span>
                                    {item.label}
                                </span>



                            </Link>

                        );


                    })}


                </div>


            </nav>






            {/* NETWORK STATUS */}


            <div
                className="
        border-t
        border-white/10
        p-5
        "
            >


                <div
                    className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
          p-4
          "
                >


                    <div
                        className="
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-zinc-600
            "
                    >

                        <Network size={13} />

                        Network

                    </div>




                    <div
                        className="
            mt-4
            flex
            items-center
            gap-2
            text-xs
            text-zinc-300
            "
                    >

                        <span
                            className="
              h-2
              w-2
              rounded-full
              bg-emerald-400
              shadow-[0_0_10px_rgba(52,211,153,0.8)]
              "
                        />

                        Creditcoin Testnet

                    </div>




                    <div
                        className="
            mt-3
            flex
            items-center
            gap-2
            text-[11px]
            text-cyan-300
            "
                    >

                        <CheckCircle2 size={13} />

                        Attestcoin verified layer

                    </div>




                </div>


            </div>




        </aside>

    );
}