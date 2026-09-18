"use client";

import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  Coins,
  ShieldCheck,
} from "lucide-react";


const stats = [
  {
    label: "AI Credit Score",
    value: "742",
    suffix: "/900",
    description: "Risk intelligence assessment",
    icon: BrainCircuit,
    status: "LOW RISK",
    statusStyle: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    iconStyle: "text-cyan-300",
  },

  {
    label: "Verified Evidence",
    value: "3",
    suffix: " proofs",
    description: "Attestcoin verified signals",
    icon: BadgeCheck,
    status: "VERIFIED",
    statusStyle: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    iconStyle: "text-cyan-300",
  },

  {
    label: "Credit Limit",
    value: "$700",
    suffix: "",
    description: "AI generated credit terms",
    icon: Coins,
    status: "AVAILABLE",
    statusStyle: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    iconStyle: "text-violet-300",
  },

  {
    label: "Agent Status",
    value: "ONLINE",
    suffix: "",
    description: "Autonomous decision engine",
    icon: Activity,
    status: "ACTIVE",
    statusStyle: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    iconStyle: "text-emerald-300",
  },
];



export default function StatsGrid() {

  return (

    <section
      className="
      grid
      gap-4
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >


      {stats.map((stat) => {


        const Icon = stat.icon;


        return (

          <div
            key={stat.label}
            className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0b0f14]
            p-5
            transition-all
            hover:-translate-y-1
            hover:border-white/20
            "
          >



            {/* glow */}

            <div
              className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-cyan-400/5
              blur-3xl
              transition
              group-hover:bg-cyan-400/10
              "
            />





            <div
              className="
              relative
              flex
              items-start
              justify-between
              "
            >


              <div>

                <div
                  className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                  "
                >
                  {stat.label}
                </div>



                <div
                  className="
                  mt-3
                  flex
                  items-baseline
                  gap-1
                  "
                >

                  <span
                    className="
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-white
                    "
                  >
                    {stat.value}
                  </span>


                  <span
                    className="
                    text-xs
                    text-zinc-600
                    "
                  >
                    {stat.suffix}
                  </span>


                </div>


              </div>




              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-black/20
                "
              >

                <Icon
                  size={20}
                  className={stat.iconStyle}
                />


              </div>



            </div>







            <div
              className="
              mt-5
              flex
              items-center
              justify-between
              "
            >

              <div
                className="
                text-[11px]
                text-zinc-500
                "
              >
                {stat.description}
              </div>



              <div
                className={`
                rounded-lg
                border
                px-2
                py-1
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                ${stat.statusStyle}
                `}
              >

                {stat.status}

              </div>


            </div>






          </div>

        );


      })}


    </section>

  );

}