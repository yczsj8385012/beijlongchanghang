import React from 'react';
import {
  FileText,
  Sliders,
  MessageSquare,
  ShieldCheck,
  Truck,
  Receipt,
  ArrowRight,
  Clock,
  FileCheck2,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';

interface ProcessSectionProps {
  onScrollToAssessment: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onScrollToAssessment }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FileText className="w-5 h-5" />;
      case 1:
        return <Sliders className="w-5 h-5" />;
      case 2:
        return <MessageSquare className="w-5 h-5" />;
      case 3:
        return <ShieldCheck className="w-5 h-5" />;
      case 4:
        return <Truck className="w-5 h-5" />;
      default:
        return <Receipt className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-16 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              <span>合作处理路径</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              先判断，再谈交易：六阶段标准化操作顺序
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              可靠的库存处置从清晰的资料开始，而不是脱离批次实况的虚高口头承诺。标准化流程有效杜绝信息遗漏与交易争议。
            </p>
          </div>

          <button
            onClick={onScrollToAssessment}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>整理批次资料并生成清单</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#faf8f5] border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-amber-500/60 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Deliverables and timing */}
              <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    建议时效：
                  </span>
                  <span className="font-medium text-slate-800">{step.timeframe}</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1">
                    <FileCheck2 className="w-3 h-3 text-emerald-600" />
                    交付凭据：
                  </span>
                  <span className="font-medium text-slate-800 text-right">{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Principles Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <span className="font-bold text-amber-800 shrink-0">※ 特别说明：</span>
          <p className="leading-relaxed">
            北京隆昌行在未核验真实货物批次与对应资质前，不发布脱离实际批次的虚拟固定收购价。双方通过真实批次资料明确可执行的渠道与价格，保障品牌方正价市场不被冲击。
          </p>
        </div>
      </div>
    </section>
  );
};
