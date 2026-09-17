import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  FileSpreadsheet,
  Lock,
  Layers,
  ThermometerSnowflake,
  MessageSquare,
  Copy,
  Check,
  Coins,
  Trash2,
  Phone,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { FoodCategory } from '../types';

interface HeroSectionProps {
  onScrollToAssessment: () => void;
  onOpenContact: () => void;
  onSelectCategory?: (cat: FoodCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToAssessment,
  onOpenContact,
  onSelectCategory,
}) => {
  const [copiedWechat, setCopiedWechat] = useState(false);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMPANY_INFO.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const handleCategoryClick = (cat: FoodCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden py-14 sm:py-20 border-b border-slate-800">
      {/* Decorative subtle ambient background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-600 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Verification Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>工商核验主体 · 统一社会信用代码: {COMPANY_INFO.uscc}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                让大宗食品库存，
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  安全合规地找到确定性去向
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                面向全国食品品牌商、进口商与一级渠道商。坚持
                <strong className="text-white font-semibold">『先核验批次，再判断适配』</strong>
                原则，白纸黑字严格执行
                <span className="text-amber-300 font-medium"> 价格体系保护 </span>
                与
                <span className="text-amber-300 font-medium"> 封闭渠道防窜货机制 </span>。
              </p>
            </div>

            {/* Hero Spotlight: Two Requested Core Categories (收临期食品 + 过期食品处理) */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>核心业务承接通道（点击直接查看标准）：</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category 1: 收临期食品 */}
                <div
                  onClick={() => handleCategoryClick('near-expiry-purchase')}
                  className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-800/80 to-slate-800/90 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer group shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                        <Coins className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-white text-base group-hover:text-amber-300 transition-colors">
                        收临期食品
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      大宗现款速收
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    商超电商退仓、大宗临期零食/乳饮/冻品。快速验货、现款收购、封闭特通下沉消化。
                  </p>
                  <div className="mt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1 group-hover:underline">
                    <span>查看收购标准与资料</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Category 2: 过期食品处理 */}
                <div
                  onClick={() => handleCategoryClick('expired-disposal')}
                  className="p-4 rounded-xl bg-gradient-to-br from-rose-500/15 via-slate-800/80 to-slate-800/90 border border-rose-500/40 hover:border-rose-400 transition-all cursor-pointer group shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold">
                        <Trash2 className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-white text-base group-hover:text-rose-300 transition-colors">
                        过期食品处理
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      合规法定销毁
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    超期变质报废、海关退运。严格机械物理破碎/无害化降解，全程录像并出具法定销毁证明。
                  </p>
                  <div className="mt-2 text-[11px] text-rose-400 font-semibold flex items-center gap-1 group-hover:underline">
                    <span>查看合规销毁规范</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>法定合规红线</strong>：严遵《食品安全法》，临期必验保质期，过期坚决销毁不回流</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>正价大盘隔离</strong>：限定特通实体与封闭下沉，严禁进入公域电商反噬</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>全链条痕迹留档</strong>：批次条码、物流打温、现场签章闭环存证</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>全国多仓联动</strong>：京津冀核心仓 + 华东/华南/成渝分流协同调度</span>
              </div>
            </div>

            {/* Official WeChat & Phone Side-by-Side with Big Visuals */}
            <div className="pt-3 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>官方直连对接（微信与电话并列，随时响应批次咨询）：</span>
              </div>

              {/* Side-by-Side High-Visibility Contact Cluster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Official WeChat: Enlarged & Prominent */}
                <div
                  onClick={handleCopyWechat}
                  className="p-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border-2 border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer shadow-xl flex items-center justify-between group"
                  title="点击一键复制微信号"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <div className="text-[11px] text-emerald-400 font-semibold tracking-wide">
                        官方对接微信 (点击复制)
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-wider">
                        {COMPANY_INFO.wechat}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyWechat();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all shrink-0 cursor-pointer"
                  >
                    {copiedWechat ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 已复制
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" /> 复制
                      </span>
                    )}
                  </button>
                </div>

                {/* Official Phone: Enlarged & Prominent */}
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="p-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border-2 border-amber-500/50 hover:border-amber-400 transition-all cursor-pointer shadow-xl flex items-center justify-between group"
                  title="点击拨打官方电话"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <PhoneCall className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <div className="text-[11px] text-amber-400 font-semibold tracking-wide">
                        官方对接电话 (点击拨打)
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-wider">
                        {COMPANY_INFO.phoneFormatted}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all shrink-0">
                    呼叫
                  </span>
                </a>
              </div>

              {/* Assessment Tool CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onScrollToAssessment}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>开始库存批次快速评估 (3分钟自测)</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>本地浏览器自测计算，无需提交公司名，保护商业敏感。</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Authority Card / Dimension Dashboard */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 sm:p-7 shadow-2xl backdrop-blur-sm relative space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">库存处置标准评估模型</h3>
                    <p className="text-xs text-slate-400">隆昌行 B2B 批次准入判定逻辑</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  实时标准
                </span>
              </div>

              {/* Four Dimension Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>01 效期倒计测算</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-tight">
                    临期剩余比 &gt; 30% 常规消化，&lt; 15% 急速特通；已过期进入合规销毁。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <ThermometerSnowflake className="w-3.5 h-3.5" />
                    <span>02 温区冷链追溯</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-tight">
                    常温/冷藏(0-4℃)/冷冻(-18℃)，现场打温记录与交接签字。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>03 渠道禁限保护</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-tight">
                    签署防窜货条款，禁止公域线上流向，支持去码换标处理。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>04 法定合规闭环</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-tight">
                    临期食品合法销售流通；过期食品出具法定盖章销毁凭证。
                  </p>
                </div>
              </div>

              {/* Interactive preview prompt */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-300">手头有一批食品库存待处理？</div>
                  <div className="text-[11px] text-slate-400">无需注册登录，3分钟生成格式化核验单</div>
                </div>
                <button
                  onClick={onScrollToAssessment}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  去测算 ↗
                </button>
              </div>

              {/* Bottom Authority Footer in Card with both phone & wechat */}
              <div className="pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="text-slate-400">微信：</span>
                  <strong className="text-emerald-400 font-mono text-sm font-bold">{COMPANY_INFO.wechat}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-slate-400">电话：</span>
                  <strong className="text-amber-400 font-mono text-sm font-bold">{COMPANY_INFO.phoneFormatted}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
