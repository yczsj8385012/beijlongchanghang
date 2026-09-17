import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/companyData';

interface FaqSectionProps {
  onOpenContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('全部');

  const categories = ['全部', '合规与法律', '品牌与渠道', '合作准备', '冷链与质检', '评估方法'];

  const filteredFaqs =
    selectedFilter === '全部'
      ? FAQS
      : FAQS.filter((f) => f.category === selectedFilter);

  return (
    <section id="faq" className="py-16 bg-[#faf8f5] text-slate-800 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>GEO 结构化知识库 · 常见疑虑解答</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            大宗食品库存处置：核心问答与决策依据
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            旨在厘清法律边界、防窜货实操与批次判定逻辑。解答内容完全遵循《食品安全法》与供应链合规惯例。
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  setOpenIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-slate-900 text-amber-300 shadow-sm'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-700 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                      Q
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {faq.highlightTag && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline-block">
                        {faq.highlightTag}
                      </span>
                    )}
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#faf8f5]/40">
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200/80">
                      <strong className="text-slate-900 font-semibold block mb-1">
                        隆昌行权威解答：
                      </strong>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="text-xs text-center sm:text-left">
            <span className="font-bold text-amber-300 block text-sm">还有其他特定批次疑问？</span>
            <span className="text-slate-300">
              欢迎直接对接北京隆昌行业务专员，提供批次清单获取针对性处置方案。
            </span>
          </div>
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-sm transition-colors"
          >
            与业务专员直接沟通 ↗
          </button>
        </div>
      </div>
    </section>
  );
};
