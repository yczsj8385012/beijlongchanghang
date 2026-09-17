import React from 'react';
import {
  ShieldCheck,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  Lock,
  Scale,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top CTA Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              手头有食品大宗库存需要专业判断？
            </span>
            <h3 className="text-2xl font-black text-white">
              先整理资料，再开始合作沟通
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              三分钟生成一份标准化库存摘要。内容完全在您的本地浏览器运算，保护商业机密与底牌。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onScrollTo('assessment')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>开始库存评估 ↗</span>
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>官方对接: {COMPANY_INFO.phone}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Dossier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Verification Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                隆
              </div>
              <span className="text-lg font-black text-white tracking-wide">
                {COMPANY_INFO.name}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              面向全国食品品牌商、进口商与一级渠道商，提供临期食品、冷冻海鲜、饮料乳品等大宗库存的资料核验、价格体系保护与封闭渠道合规处置对接。
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>工商核验主体 · 真实可查</span>
              </div>
              <div className="text-slate-400 font-mono">
                统一社会信用代码: <strong className="text-slate-200">{COMPANY_INFO.uscc}</strong>
              </div>
              <div className="text-slate-400">
                成立日期: {COMPANY_INFO.establishedDate} · 注册资本: {COMPANY_INFO.registeredCapital}
              </div>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
              服务与品类标准
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('categories')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  临期常温食品 (零食/烘焙/罐头)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('categories')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  冷冻食品与海鲜水产 (-18℃)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('categories')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  饮料与乳制品 (高频快消)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('categories')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  白酒啤酒与米面粮油
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('assessment')}
                  className="text-amber-300 font-medium hover:text-amber-200 transition-colors text-left"
                >
                  智能批次评估与清单生成器 ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
              品牌保护与流程
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('solutions')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  价格体系如何严格保护
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('solutions')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  如何从根本上杜绝窜货风险
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('process')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  先判断再谈交易：六阶段流程
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('logistics')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  全国核心经济圈多仓联动 (GEO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('compliance')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  《食品安全法》合规底线档案
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Verification Column */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
              官方联络与核验
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="font-mono hover:text-amber-300 font-bold"
                >
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>微信: <strong className="font-mono text-slate-200">{COMPANY_INFO.wechat}</strong></span>
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed pt-1">
                调度枢纽：北京市朝阳区（全国多仓联动冷链调配）
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs font-semibold cursor-pointer"
                >
                  查看企业核验凭据 ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, SEO & Copyright Statement */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-400">
              © 2019 - 2026 {COMPANY_INFO.name} 版权所有 · 原创品牌 Coglioo · 内容原则：
              <span className="text-amber-300 font-medium">事实可核验 · 边界可说明 · 来源可追溯</span>
            </p>
            <p className="text-slate-400">
              重要提示：依据《中华人民共和国食品安全法》，临期食品指未超保质期食品；超保质期食品严禁用于销售。具体项目交易条件以双方书面签署的正式协议为准。
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-slate-400 font-mono">Baidu: codeva-UiFh5eDDO6</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="回到顶部"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
