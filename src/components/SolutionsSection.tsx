import React, { useState } from 'react';
import {
  Lock,
  GitBranch,
  CheckCircle2,
  FileCheck,
  Shield,
  EyeOff,
  Layers,
  FileSignature,
} from 'lucide-react';
import { SOLUTIONS } from '../data/companyData';

export const SolutionsSection: React.FC = () => {
  const [activeSolutionId, setActiveSolutionId] = useState<'price-protection' | 'anti-channel-conflict'>('price-protection');

  const activeSolution = SOLUTIONS.find((s) => s.id === activeSolutionId) || SOLUTIONS[0];

  return (
    <section id="solutions" className="py-16 bg-[#faf8f5] text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>品牌方战略痛点攻坚</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            品牌方最关心的两大核心问题
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            大宗食品库存处置绝非简单低价倾销。隆昌行将渠道物理隔离、地域下沉与履约留档形成完备的法律与运营防线。
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300 mt-4 shadow-inner">
            <button
              onClick={() => setActiveSolutionId('price-protection')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSolutionId === 'price-protection'
                  ? 'bg-slate-900 text-amber-300 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>01. 价格体系如何严格保护</span>
            </button>

            <button
              onClick={() => setActiveSolutionId('anti-channel-conflict')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSolutionId === 'anti-channel-conflict'
                  ? 'bg-slate-900 text-amber-300 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>02. 如何从根本上杜绝窜货风险</span>
            </button>
          </div>
        </div>

        {/* Solution Container */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded border mb-2 ${activeSolution.tagColor}`}>
                {activeSolution.tag}
              </span>
              <h3 className="text-2xl font-black text-slate-900">{activeSolution.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{activeSolution.subtitle}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">隆昌行核心主张：</strong>
              {activeSolution.summary}
            </div>
          </div>

          {/* 4 Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSolution.strategies.map((strat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#faf8f5] border border-slate-200/90 hover:border-amber-400 transition-all space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 font-mono font-bold text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {strat.name}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {strat.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Commitment Statement */}
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <FileSignature className="w-4 h-4" />
                <span>书面合同载明违约责任与流向闭环</span>
              </div>
              <p className="text-xs text-slate-300">
                绝不作空泛承诺。所有关于流向限制、禁止线上销售、撕标换箱均以双方正式盖章合同为准。
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              事实可核验 · 边界可说明 · 来源可追溯
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
