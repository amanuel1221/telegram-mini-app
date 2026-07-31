import { useEffect, useState } from "react";

import {
  BookOpen,
  FileText,
  Users,
  ShieldCheck,
} from "lucide-react";

import { getDashboardStats } from "../api/teacherApi";

import StatCard from "./StatCard";

export default function StatsCards() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadStats = async () => {

      try {

        const response = await getDashboardStats();

        setStats(response.stats);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadStats();

  }, []);

  if (loading) {

    return (

      <div className="grid grid-cols-2 gap-4">

        {[1,2,3,4].map((item) => (

          <div
            key={item}
            className="
            h-36
            animate-pulse
            rounded-3xl
            bg-slate-200
            "
          />

        ))}

      </div>

    );

  }

  return (

    <div className="grid grid-cols-2 gap-4">

      <StatCard
        title="Total PDFs"
        value={stats?.totalPdfs || 0}
        icon={<BookOpen size={28} />}
        color="blue"
      />

      <StatCard
        title="My PDFs"
        value={stats?.myPdfs || 0}
        icon={<FileText size={28} />}
        color="green"
      />

      <StatCard
        title="Members"
        value={stats?.totalMembers || 0}
        icon={<ShieldCheck size={28} />}
        color="purple"
      />

      <StatCard
        title="Students"
        value={stats?.totalStudents || 0}
        icon={<Users size={28} />}
        color="orange"
      />

    </div>

  );

}