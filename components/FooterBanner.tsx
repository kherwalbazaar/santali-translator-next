"use client";

import { Leaf, PersonStanding, TreePine } from "lucide-react";

export default function FooterBanner() {
  return (
    <div className="bg-gradient-to-r from-pink-50 via-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-2.5 flex items-center justify-between overflow-hidden shadow-xs">
      <div className="flex items-center space-x-2">
        <Leaf size={18} className="text-pink-600" />
        <div>
          <h4 className="text-[11px] font-bold text-pink-900 leading-tight">
            Translate • Learn • Preserve
          </h4>
          <p className="text-[9px] text-pink-700">
            Santali for a Better Tomorrow
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1 opacity-75 text-pink-800 text-xs">
        <PersonStanding size={14} />
        <PersonStanding size={14} />
        <PersonStanding size={14} />
        <TreePine size={14} className="text-pink-900" />
      </div>
    </div>
  );
}
