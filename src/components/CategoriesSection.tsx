import React, { useState, useEffect } from 'react';
import {
  Clock,
  Snowflake,
  Milk,
  PackageCheck,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Coins,
  Trash2,
  FileText,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import { CATEGORIES, COMPANY_INFO } from '../data/companyData';
import { FoodCategory } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (cat: FoodCategory) => void;
  selectedCategoryFromParent?: FoodCategory;
  onOpenContact?: () => void;
  onOpenTopicByPath?: (path: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategoryFromParent,
  onOpenContact,
  onOpenTopicByPath,
}) => {
  const [selectedId, setSelectedId] = useState<FoodCategory>(
    selectedCategoryFromParent || 'near-expiry-purchase'
  );

  useEffect(() => {
    if (selectedCategoryFromParent) {
      setSelectedId(selectedCategoryFromParent);
    }
  }, [selectedCategoryFromParent]);

  const currentCat = CATEGORIES.find((c) => c.id === selectedId) || CATEGORIES[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'near-expiry-purchase':
        return <Coins className="w-5 h-5" />;
      case 'expired-disposal':
        return <Trash2 className="w-5 h-5" />;
      case 'near-expiry':
        return <Clock className="w-5 h-5" />;
      case 'frozen-seafood':
        return <Snowflake className="w-5 h-5" />;
      case 'beverages-dairy':
        return <Milk className="w-5 h-5" />;
      default:
        return <PackageCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              <span>品类入口与承接标准 · 隆昌行</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              收临期食品与过期食品处理业务品类
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              涵盖大宗临期食品现款收购、电商商超积压周转、超期变质食品合规无害化销毁出证，以及各细分温区货品标准。
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            原则：<strong className="text-slate-800 font-semibold">资料齐全再验货，不盲目接单</strong>
          </div>
        </div>

        {/* Categories Tab Selector Grid: 6 Items nicely arranged */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === selectedId;
            const isNearExpiryPurchase = cat.id === 'near-expiry-purchase';
            const isExpiredDisposal = cat.id === 'expired-disposal';

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedId(cat.id);
                  onSelectCategory(cat.id);
                }}
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-amber-500/50 scale-[1.01]'
                    : isNearExpiryPurchase
                    ? 'bg-amber-50/50 hover:bg-amber-100/60 border-amber-300 text-slate-900'
                    : isExpiredDisposal
                    ? 'bg-rose-50/50 hover:bg-rose-100/60 border-rose-300 text-slate-900'
                    : 'bg-[#faf8f5] hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                          : isNearExpiryPurchase
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : isExpiredDisposal
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {getIcon(cat.id)}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-slate-800 text-amber-300 border-slate-700'
                          : cat.tagColor
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base tracking-tight mb-1">{cat.title}</h3>
                  <p
                    className={`text-xs line-clamp-2 ${
                      isSelected ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold">
                  <span className={isSelected ? 'text-amber-400' : 'text-slate-500'}>
                    {isSelected ? '当前正在查看标准 ▾' : '点击查看资料与边界 →'}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Category Deep Dive Panel */}
        <div className="bg-[#fcfbf9] rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Details & Materials */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">
                    业务细则与准入红线
                  </span>
                  <span className="text-slate-300">/</span>
                  <span className="text-xs text-slate-500 font-mono">SPECIFICATION & BOUNDARY</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{currentCat.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {currentCat.description}
                </p>
              </div>

              {/* Materials Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  首次沟通必须准备的核验材料 (5要素)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCat.materialsNeeded.map((mat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boundary Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  承接红线与法定边界（白纸黑字严格执行）
                </h4>
                <div className="space-y-2">
                  {currentCat.boundaryRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 font-semibold"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Common Items & Quick Action */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  常见承接对接货品类别
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentCat.commonItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official Direct Contact Card inside Category Panel */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    官方专员 2小时核验响应
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">北京隆昌行</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  提供产品清单与照片后，专员将快速评估适销性、给出合规建议与收购/销毁报价。
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-center">
                    <div className="text-[10px] text-slate-400">官方对接微信</div>
                    <div className="text-sm font-black font-mono text-emerald-400">{COMPANY_INFO.wechat}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-center">
                    <div className="text-[10px] text-slate-400">官方直拨专线</div>
                    <div className="text-xs font-black font-mono text-amber-400">{COMPANY_INFO.phoneFormatted}</div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCategory(currentCat.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors cursor-pointer"
                >
                  <span>以此品类进入测算评估工具</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onOpenTopicByPath && (
                  <button
                    onClick={() => {
                      const pathMap: Record<string, string> = {
                        'near-expiry-purchase': '/services/near-expiry-purchase',
                        'expired-disposal': '/services/expired-disposal',
                        'near-expiry': '/services/near-expiry-food',
                        'frozen-seafood': '/services/frozen-food',
                        'beverages-dairy': '/services/beverages-dairy',
                        'snacks-sweets': '/services/snacks',
                      };
                      const p = pathMap[currentCat.id] || '/services/near-expiry-food';
                      onOpenTopicByPath(p);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>查阅该品类完整合规标准与收购规范专栏 ↗</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
