import { Phone, Send, BookOpen, Layers, FileText, GraduationCap } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const grades = [
    { label: "Grade 9", path: "/pdfs" },
    { label: "Grade 10", path: "/pdfs" },
    { label: "Grade 11", path: "/pdfs" },
    { label: "Grade 12", path: "/pdfs" },
  ];

  const services = [
    {
      title: "Online Materials",
      description: "Instant access to verified study resources and slides.",
      icon: BookOpen,
    },
    {
      title: "Interactive Learning",
      description: "Engaging Telegram tools tailored for students.",
      icon: Layers,
    },
    {
      title: "PDF Reader",
      description: "Read documents smoothly inside the application.",
      icon: FileText,
    },
    {
      title: "Grades 9–12 Access",
      description: "Complete curriculum coverage for national exams.",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-[#F9F9F6] px-5 py-6 font-sans antialiased">
      {/* Top Header Section */}
      <section className="flex flex-col items-center pt-2 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1A73E8] p-1 shadow-md">
          <img
            src="/suuu.svg"
            alt="Entrance Key Logo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <h1 className="mt-3 text-2xl font-black text-[#1A73E8] tracking-wide">
          Entrance Key
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          የተማሪዎች የትምህርት እና የፈተና ዝግጅት ማዕከል
        </p>
      </section>

      {/* Grade Selection Grid */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-700">
          Select Your Grade / ክፍል ይምረጡ
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {grades.map((item, index) => (
            <NavLink key={index} to="/pdfs" className="w-full">
              <button className="flex h-20 w-full items-center justify-center rounded-2xl bg-[#1A73E8] text-lg font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 cursor-pointer">
                {item.label}
              </button>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Services Section Grid */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-700">
          Our Services / አገልግሎቶቻችን
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1A73E8]">
                  <Icon size={20} />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Contact Buttons */}
      <section className="mt-8 mb-4 grid grid-cols-2 gap-3">
        {/* Phone Dialer Link */}
        <a href="tel:+251962569855" className="w-full">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1A73E8] bg-transparent py-3 text-xs font-bold text-[#1A73E8] transition-all hover:bg-blue-50 active:scale-95 cursor-pointer">
            <Phone size={16} />
            ይደውሉልን
          </button>
        </a>

        {/* Telegram Direct Message Link */}
        <a
          href="https://t.me/Really3692"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A73E8] py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 cursor-pointer">
            <Send size={16} />
            ቴሌግራም ቻናላችን
          </button>
        </a>
      </section>
    </div>
  );
}