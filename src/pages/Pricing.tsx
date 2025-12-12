import Layout from "@/components/Layout";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Basic AI prompts",
        "Limited daily usage",
        "Community support"
      ],
      color: "from-purple-600 to-purple-800"
    },
    {
      name: "Pro Creator",
      price: "$9.99/mo",
      features: [
        "Unlimited prompts",
        "Advanced AI writing",
        "Content analytics",
        "Priority support"
      ],
      color: "from-pink-600 to-purple-600"
    },
    {
      name: "Manager Suite",
      price: "$19.99/mo",
      features: [
        "Everything in Pro",
        "Team dashboards",
        "Client management tools",
        "Export reports"
      ],
      color: "from-blue-600 to-purple-700"
    }
  ];

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-300">Choose the plan that fits your goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 rounded-3xl bg-gradient-to-br ${tier.color} shadow-xl border border-white/20`}
          >
            <h2 className="text-3xl font-bold mb-2">{tier.name}</h2>
            <p className="text-4xl font-bold mb-6">{tier.price}</p>

            <ul className="text-left space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  ✔ <span>{f}</span>
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full py-3 rounded-xl bg-black/40 border border-white/30 hover:bg-black/60 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
