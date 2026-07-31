import {
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Users,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const featured = [
    {
      title: "Database Systems",
      description: "Learn database concepts, SQL, and data management.",
      category: "Core Computer Science",
    },
    {
      title: "Cloud Computing",
      description: "Understand modern cloud architecture & microservices.",
      category: "Infrastructure",
    },
    {
      title: "Software Architecture",
      description: "Build scalable, high-availability software systems.",
      category: "Engineering",
    },
  ];

  const benefits = [
    {
      title: "Secure Access",
      description: "Only verified channel members can view materials.",
      icon: ShieldCheck,
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Verified Content",
      description: "Curated PDFs managed directly by educators.",
      icon: BookOpen,
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Seamless Mini App",
      description: "Study natively inside Telegram without leaving chats.",
      icon: GraduationCap,
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-slate-50/50 px-4 py-5 font-sans antialiased sm:px-6">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 p-6 text-white shadow-xl shadow-indigo-500/15">
        {/* Subtle decorative background circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-400/20 blur-xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-md">
            <Sparkles size={13} className="text-amber-300" />
            Telegram LMS
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Learn. Read. <br />
            <span className="text-blue-200">Grow Together.</span>
          </h1>

          <p className="mt-2.5 text-sm leading-relaxed text-blue-100/90">
            Access verified courses, reading slides, and study resources directly inside Telegram.
          </p>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-indigo-700 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg active:scale-[0.98] sm:w-auto">
            Explore PDFs
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-slate-900">Featured Materials</h2>
          <span className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">
            View all
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {featured.map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="px-1 text-lg font-bold text-slate-900">
          Why Telegram LMS?
        </h2>

        <div className="mt-3 grid gap-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.badgeColor}`}
                >
                  <Icon size={22} />
                </div>

                <div className="pt-0.5">
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 mb-6 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-indigo-400">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold">Learning Community</h2>
            <p className="text-xs text-slate-400">
              Connect with teachers and students.
            </p>
          </div>
        </div>

        <button className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-500 active:scale-95">
          Join Telegram Group
        </button>
      </section>
    </div>
  );
}