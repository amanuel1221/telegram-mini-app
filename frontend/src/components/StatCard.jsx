export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {

  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },

    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },

    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  };

  return (

    <div
      className="
      rounded-3xl
      bg-white
      p-5
      shadow-md
      transition
      hover:-translate-y-1
      hover:shadow-lg
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`
          rounded-2xl
          p-3
          ${colors[color].bg}
          ${colors[color].text}
          `}
        >
          {icon}
        </div>

      </div>

    </div>

  );

}