import React, { useState } from 'react';
import {
  Phone,
  ShieldCheck,
  Building2,
  FileCheck2,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);

  const handleCopyWechat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(COMPANY_INFO.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const navItems = [
    { label: '快速评估', target: 'assessment', highlight: true },
    { label: '收临期/处置品类', target: 'categories' },
    { label: '合规与细分专栏', target: 'seo-topics' },
    { label: '品牌保护方案', target: 'solutions' },
    { label: '合作流程', target: 'process' },
    { label: '仓网覆盖', target: 'logistics' },
    { label: '合规资质', target: 'compliance' },
    { label: '常见问答', target: 'faq' },
  ];

  const handleNavClick = (target: string) => {
    onScrollTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      {/* Top Utility Verification Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              北京隆昌行 · 工商主体已核验
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline text-xs">
              统一社会信用代码: <strong className="font-mono text-slate-200">{COMPANY_INFO.uscc}</strong>
            </span>
          </div>

          {/* Official Contacts Side-by-Side in Top Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs">
            {/* Official WeChat */}
            <button
              onClick={handleCopyWechat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs transition-colors cursor-pointer group"
              title="点击复制官方微信"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>微信: <strong className="text-white text-xs">{COMPANY_INFO.wechat}</strong></span>
              {copiedWechat ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100" />
              )}
            </button>

            {/* Official Phone */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs transition-colors"
              title="点击直接拨打"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>专线: <strong className="text-white text-xs">{COMPANY_INFO.phoneFormatted}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          {/* Brand Identity - Clean, spacious, and never wrapped */}
          <div
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              隆
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-wide text-white whitespace-nowrap group-hover:text-amber-300 transition-colors">
                  {COMPANY_INFO.shortName}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap hidden lg:inline-block">
                  收临期 · 过期合规处理
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium whitespace-nowrap hidden sm:block">
                大宗现款收购 · 过期无害化销毁 · 价格体系保护
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links - Organized and comfortably spaced */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.slice(1).map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="px-2.5 py-1.5 rounded-lg text-sm whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action CTA: Assessment Button ONLY, strictly within bounds */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Assessment CTA */}
            <button
              onClick={() => onScrollTo('assessment')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>测算评估</span>
            </button>

            {/* Mobile / Tablet Menu Button (visible on screens below lg) */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={`text-left px-3 py-2 rounded-lg text-sm ${
                  item.highlight
                    ? 'bg-amber-500/10 text-amber-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Direct Contact Action Stack */}
          <div className="flex flex-col gap-2 pt-1">
            {/* WeChat Button */}
            <button
              onClick={handleCopyWechat}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-sm"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-emerald-400">官方业务微信 (点击一键复制)</div>
                  <div className="font-mono text-base font-black text-white">{COMPANY_INFO.wechat}</div>
                </div>
              </div>
              <span className="text-xs bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-md font-extrabold">
                {copiedWechat ? '已复制' : '复制微信'}
              </span>
            </button>

            {/* Phone Button */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs text-amber-950 font-semibold">官方直拨专线</div>
                  <div className="font-mono text-base font-black">{COMPANY_INFO.phoneFormatted}</div>
                </div>
              </div>
              <span className="text-xs bg-slate-950 text-amber-400 px-2.5 py-1 rounded-md font-bold">
                立即呼叫
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
