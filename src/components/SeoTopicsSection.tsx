import React from 'react';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { SEO_PAGES } from '../data/seoPages';
import { PageDefinition } from '../types';

interface SeoTopicsSectionProps {
  onOpenTopic: (page: PageDefinition) => void;
}

export const SeoTopicsSection: React.FC<SeoTopicsSectionProps> = ({ onOpenTopic }) => {
  const servicePages = SEO_PAGES.filter((p) => p.path.startsWith('/services/'));
  const solutionPages = SEO_PAGES.filter((p) => p.path.startsWith('/solutions/'));
  const complianceAndProcessPages = SEO_PAGES.filter(
    (p) =>
      ['/compliance', '/warehousing', '/process', '/cases', '/about', '/faq'].includes(p.path)
  );

  return (
    <section id="seo-topics" className="py-16 bg-[#faf8f5] border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-300">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>全域合规标准与长尾专题知识库</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              各细分品类承接标准与法定合规专栏
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              严格依据国家《食品安全法》与《反食品浪费法》，为品牌方与渠道商梳理各垂直品类的批次核验标准、价格保护与销毁流程。
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            收录专栏：<strong className="text-slate-900 font-bold">{SEO_PAGES.length} 篇权威专题</strong>
          </div>
        </div>

        {/* 3 Categorized Topic Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-300 text-slate-900 font-bold text-base">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>细分品类与处置服务 ({servicePages.length})</span>
            </div>
            <div className="space-y-2.5">
              {servicePages.map((page) => (
                <div
                  key={page.path}
                  onClick={() => onOpenTopic(page)}
                  className="p-3.5 rounded-xl bg-white hover:bg-amber-50/60 border border-slate-200/90 hover:border-amber-400 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                    <span className="truncate max-w-[200px]">{page.eyebrow}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-950 transition-colors">
                    {page.title.split('：')[0]}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-300 text-slate-900 font-bold text-base">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>品牌保护与防窜货方案 ({solutionPages.length})</span>
            </div>
            <div className="space-y-2.5">
              {solutionPages.map((page) => (
                <div
                  key={page.path}
                  onClick={() => onOpenTopic(page)}
                  className="p-3.5 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200/90 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs text-blue-800 font-semibold mb-1">
                    <span>{page.eyebrow}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-950 transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  品牌方安心保障
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  坚决不走公域电商，白纸黑字写入合同，设立高额违约金保护正价大盘。
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Compliance & Process */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-300 text-slate-900 font-bold text-base">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>企业合规、仓储与流程 ({complianceAndProcessPages.length})</span>
            </div>
            <div className="space-y-2.5">
              {complianceAndProcessPages.map((page) => (
                <div
                  key={page.path}
                  onClick={() => onOpenTopic(page)}
                  className="p-3.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200/90 hover:border-emerald-400 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                    <span>{page.eyebrow}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-950 transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory Sources Strip */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="text-slate-600">
              <strong className="text-slate-900">权威法规来源与存证链接：</strong>
              <span>国家市场监管总局《反食品浪费法》· 北京市人民政府《反食品浪费规定》· 异业邦公开供需档案</span>
            </div>
          </div>
          <a
            href="https://www.samr.gov.cn/spcjs/yjjl/art/2021/art_bc93292968554ad49e1315cceb0014bb.html"
            target="_blank"
            rel="noreferrer"
            className="text-amber-800 hover:text-amber-900 font-semibold inline-flex items-center gap-1 shrink-0"
          >
            <span>市场监管总局临期食品提示 ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
