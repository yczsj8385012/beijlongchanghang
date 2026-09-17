import React, { useEffect, useState } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PageDefinition, PageSection } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface SeoTopicModalProps {
  page: PageDefinition | null;
  onClose: () => void;
  onNavigateToAssessment: () => void;
  onOpenContact: () => void;
}

export const SeoTopicModal: React.FC<SeoTopicModalProps> = ({
  page,
  onClose,
  onNavigateToAssessment,
  onOpenContact,
}) => {
  const [copiedWechat, setCopiedWechat] = useState(false);

  useEffect(() => {
    if (!page) return;

    // Update document title and canonical meta for SEO
    const prevTitle = document.title;
    document.title = `${page.title}｜北京隆昌行`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', page.description);
    }

    // Sync URL without full reload
    if (window.location.pathname !== page.path) {
      window.history.pushState({ path: page.path }, '', page.path);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [page, onClose]);

  if (!page) return null;

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMPANY_INFO.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <BookOpen className="w-3 h-3" />
              {page.eyebrow || '合规与业务专栏'}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              URL: {page.path}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="关闭专题"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-700 text-sm">
          {/* Title and Intro */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
              {page.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {page.description}
            </p>
            {page.summary && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
                <strong className="text-amber-900 block font-bold mb-1">
                  业务概述与事实边界：
                </strong>
                {page.summary}
              </div>
            )}
          </div>

          {/* Render Page Sections */}
          <div className="space-y-8">
            {page.sections.map((sec, idx) => {
              if (sec.type === 'lead') {
                return (
                  <div
                    key={idx}
                    className="text-base font-semibold text-slate-900 border-l-4 border-amber-500 pl-4 py-1"
                  >
                    {sec.text}
                  </div>
                );
              }

              if (sec.type === 'facts') {
                return (
                  <div key={idx} className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {sec.title}
                    </h3>
                    {sec.intro && <p className="text-xs text-slate-500">{sec.intro}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {sec.items.map((it, i) => (
                        <div
                          key={i}
                          className="p-3 bg-white rounded-lg border border-slate-200/80 flex flex-col justify-between"
                        >
                          <span className="text-xs text-slate-500">{it.label}</span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                            {it.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (sec.type === 'checklist') {
                return (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      {sec.title}
                    </h3>
                    {sec.intro && <p className="text-xs text-slate-500">{sec.intro}</p>}
                    <div className="grid grid-cols-1 gap-2">
                      {sec.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-emerald-950 text-xs sm:text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (sec.type === 'steps') {
                return (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      {sec.title}
                    </h3>
                    {sec.intro && <p className="text-xs text-slate-500">{sec.intro}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sec.items.map((step, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5"
                        >
                          <div className="text-xs font-bold text-amber-700 font-mono">
                            阶段 {i + 1}
                          </div>
                          <div className="font-bold text-slate-900 text-sm">{step.title}</div>
                          <div className="text-xs text-slate-600 leading-relaxed">{step.body}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (sec.type === 'notice') {
                const isWarning = sec.tone === 'warning';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isWarning
                        ? 'bg-rose-50 border-rose-200 text-rose-950'
                        : 'bg-blue-50 border-blue-200 text-blue-950'
                    }`}
                  >
                    <AlertTriangle
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        isWarning ? 'text-rose-600' : 'text-blue-600'
                      }`}
                    />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <strong className="font-bold block">{sec.title}</strong>
                      <p className="leading-relaxed">{sec.body}</p>
                    </div>
                  </div>
                );
              }

              if (sec.type === 'faq') {
                return (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                    <div className="space-y-2.5">
                      {sec.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                        >
                          <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                            <span className="text-amber-600 font-mono">Q{i + 1}.</span>
                            {item.question}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (sec.type === 'source') {
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-slate-500">法定与官方出处参考：</span>
                      <strong className="text-slate-800 ml-1">{sec.title}</strong>
                      <span className="text-slate-500 ml-2">({sec.publisher})</span>
                    </div>
                    {sec.href && (
                      <a
                        href={sec.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold"
                      >
                        <span>查看原文</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Direct CTA Box with WeChat and Phone */}
          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-amber-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  对接本业务专线 · 极速资料核验
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  工作日 2小时内核验批次 · 拒绝空泛报价 · 先核验再谈合作
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToAssessment();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>批次自测评估 ↗</span>
                </button>
              </div>
            </div>

            {/* Side-by-side Dual Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleCopyWechat}
                className="p-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    官方微信号 (点击复制)
                  </span>
                  <span className="text-[11px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-300">
                    {copiedWechat ? '已复制微信!' : '点此复制'}
                  </span>
                </div>
                <div className="text-lg font-black font-mono text-white mt-1 group-hover:text-emerald-300">
                  {COMPANY_INFO.wechat}
                </div>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-left transition-all group block cursor-pointer"
              >
                <div className="text-xs text-amber-400 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    官方直通电话 (点击拨打)
                  </span>
                  <span className="text-[11px] bg-amber-900/60 px-2 py-0.5 rounded text-amber-300">
                    一键直呼
                  </span>
                </div>
                <div className="text-lg font-black font-mono text-white mt-1 group-hover:text-amber-300">
                  {COMPANY_INFO.phoneFormatted}
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <div className="text-slate-500">
            统一社会信用代码: <span className="font-mono text-slate-800">{COMPANY_INFO.uscc}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold cursor-pointer"
          >
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
};
