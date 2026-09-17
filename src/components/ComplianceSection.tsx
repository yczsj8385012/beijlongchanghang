import React from 'react';
import {
  ShieldCheck,
  Building,
  FileText,
  AlertTriangle,
  Scale,
  Calendar,
  Coins,
  BadgeCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ComplianceSection: React.FC = () => {
  return (
    <section id="compliance" className="py-16 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>工商主体公示与合规依据</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              合规档案：企业资质与法定处置边界
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              坚持合规经营。临期食品属于未超保质期的合格食品；超过保质期的食品依国家法规绝不用于销售流通。
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            核验状态：<strong className="text-emerald-700">工商主体已核验</strong>
          </div>
        </div>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 cols: Enterprise Dossier */}
          <div className="lg:col-span-6 bg-[#faf8f5] rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <Building className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">已核验企业主体档案</h3>
                <p className="text-xs text-slate-500">依据北京市市场监督管理局官方登记信息整理</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-500">企业全称</span>
                <strong className="text-slate-900 font-medium">{COMPANY_INFO.name}</strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-500">统一社会信用代码</span>
                <strong className="text-slate-900 font-mono font-semibold text-amber-800">
                  {COMPANY_INFO.uscc}
                </strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-500">成立日期</span>
                <strong className="text-slate-900 font-medium">{COMPANY_INFO.establishedDate}</strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-500">注册资本</span>
                <strong className="text-slate-900 font-medium">{COMPANY_INFO.registeredCapital}</strong>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
                <span className="text-slate-500 block text-xs">经营范围摘要</span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {COMPANY_INFO.businessScope}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>全国官方业务专线：<strong className="text-slate-900">{COMPANY_INFO.phone}</strong></span>
              <span className="text-emerald-700 font-medium">官方主体真实有效</span>
            </div>
          </div>

          {/* Right 6 cols: Four Mandatory Verification Pillars */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Scale className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-amber-300 text-base sm:text-lg">
                  食品安全处置四大法定底线
                </h3>
                <p className="text-xs text-slate-400">
                  严格执行《食品安全法》第54条与预包装食品标签标准
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>01. 效期红线</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  生产日期、保质期及预计到期日必须清晰喷印；超保质期食品坚决不予流通，一律拒收。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <FileText className="w-4 h-4" />
                  <span>02. 标签合规</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  预包装食品中文标签完备，生产者名称、地址、成分表、SC生产许可证与执行标准真实齐备。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>03. 品相无损</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  内包装严禁漏气漏液、变质发霉、严重胀气或严重结霜复冻（冻品严格检验中心温度）。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <BadgeCheck className="w-4 h-4" />
                  <span>04. 流向可溯</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  出库单据、物流运单与末端接收签字回执完整留存，全流程资料备查，防范法律纠纷。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-amber-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 block mb-1">隆昌行风控原则：</strong>
              “事实可核验 · 边界可说明 · 来源可追溯”。只有把质量、责任和流向用书面契约厘清，才能确保双方商业安全。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
