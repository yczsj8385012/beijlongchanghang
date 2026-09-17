import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Building2,
  Navigation,
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  Boxes,
} from 'lucide-react';
import { GEO_HUBS, COMPANY_INFO } from '../data/companyData';

export const GeoCoverageSection: React.FC = () => {
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);
  const currentHub = GEO_HUBS[selectedHubIndex];

  return (
    <section id="logistics" className="py-16 bg-[#faf8f5] text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
              <Navigation className="w-3.5 h-3.5 text-cyan-600" />
              <span>全国仓网调度与地域化闭环 (GEO)</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              北京总部指挥，全国核心经济圈多仓协同
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              结合食品温区属性与品牌方防窜货地域限制，依托京津冀、华东、华南、成渝多节点实现异地分流消化与物理隔离。
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            覆盖：<strong className="text-slate-800">京津冀 · 环渤海 · 长三角 · 珠三角 · 成渝</strong>
          </div>
        </div>

        {/* Hubs Selector & Map Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 cols: Hub City List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              核心仓网协同节点 (点击查看对应调度能力)
            </div>
            {GEO_HUBS.map((hub, idx) => {
              const active = idx === selectedHubIndex;
              return (
                <div
                  key={hub.city}
                  onClick={() => setSelectedHubIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          active
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{hub.city}</h4>
                        <span
                          className={`text-xs ${active ? 'text-slate-300' : 'text-slate-500'}`}
                        >
                          {hub.region}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                        active
                          ? 'bg-slate-800 text-amber-300 border border-slate-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {idx === 0 ? '总部枢纽' : '协同节点'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 7 cols: Active Node Deep Detail */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700">
                  {currentHub.region}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  GEO LOGISTICS NODE · {currentHub.city}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <span>{currentHub.city} 调度中心</span>
              </h3>
              <p className="text-sm text-slate-600 mt-1">{currentHub.role}</p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                本节点核心履约与风控能力
              </h4>
              <div className="space-y-2">
                {currentHub.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-[#faf8f5] border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Temperature Capabilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-600" />
                <span>支持温区与硬件规格</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentHub.tempCapabilities.map((temp, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-900 border border-cyan-200 text-xs font-medium"
                  >
                    {temp}
                  </span>
                ))}
              </div>
            </div>

            {/* Nationwide truck coordination statement */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">支持整车专车直发与标准冷藏车调配</div>
                  <div className="text-slate-400 text-[11px]">具备全程打温记录与 GPS 轨迹可追溯凭证</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
