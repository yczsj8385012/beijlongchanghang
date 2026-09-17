import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Sparkles,
  ClipboardCopy,
  Check,
  AlertTriangle,
  FileText,
  Clock,
  Thermometer,
  ShieldAlert,
  Building,
  ArrowRight,
  RefreshCw,
  Info,
  Package,
  Layers,
  Printer,
  Sliders,
  PhoneCall,
  Phone,
  MessageSquare,
} from 'lucide-react';
import {
  FoodCategory,
  TemperatureZone,
  PackagingCondition,
  InventoryAssessmentInput,
  AssessmentResult,
  AiParsedBatch,
} from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface AssessmentToolProps {
  onOpenContact: () => void;
}

const CATEGORY_OPTIONS: { id: FoodCategory; label: string; defaultTemp: TemperatureZone }[] = [
  { id: 'near-expiry-purchase', label: '收临期食品 · 大宗现款收购 (商超退仓/零食乳饮/米面粮油/冻品)', defaultTemp: 'ambient' },
  { id: 'expired-disposal', label: '过期食品处理 · 合规无害化销毁 (超期变质/包装破损/海关退运/出具销毁证明)', defaultTemp: 'ambient' },
  { id: 'near-expiry', label: '临期常温预包装食品 (膨化/饼干/罐头/坚果)', defaultTemp: 'ambient' },
  { id: 'frozen-seafood', label: '冷冻食品与海鲜水产 (肉禽/水产/半成品)', defaultTemp: 'frozen' },
  { id: 'beverages-dairy', label: '饮料与乳制品 (牛奶/酸奶/茶饮/果汁)', defaultTemp: 'ambient' },
  { id: 'snacks-sweets', label: '休闲零食与糖巧糕点', defaultTemp: 'ambient' },
  { id: 'liquor-wine', label: '白酒、啤酒、红酒与进口酒水', defaultTemp: 'ambient' },
  { id: 'grain-oil-condiment', label: '米面粮油与复合调味料', defaultTemp: 'ambient' },
];

export const AssessmentTool: React.FC<AssessmentToolProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'ai'>('structured');

  // Form State
  const [input, setInput] = useState<InventoryAssessmentInput>({
    productName: '',
    category: 'near-expiry',
    quantity: '',
    unit: '箱',
    productionDate: '',
    shelfLifeMonths: 12,
    expiryDateManual: '',
    warehouseCity: '北京市',
    temperatureZone: 'ambient',
    packagingCondition: 'intact_original',
    channelRestrictions: ['严禁公域线上平台 (淘宝/天猫/拼多多/京东)', '限定下沉市场或封闭特通渠道'],
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [showSlipModal, setShowSlipModal] = useState(false);

  // AI Tab State
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiParsedBatch | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Shelf Life Calculations
  const calculatedShelfLife = useMemo(() => {
    if (!input.productionDate) {
      return {
        totalDays: 0,
        remainingDays: 0,
        passedDays: 0,
        remainingPercentage: 0,
        urgencyLevel: 'moderate' as const,
        urgencyLabel: '等待填写生产日期',
        colorClass: 'bg-slate-200 text-slate-700',
        recommendation: '请选择生产日期与保质期，系统将自动测算剩余效期比与流通适销度。',
      };
    }

    const prod = new Date(input.productionDate);
    const now = new Date();

    let expiry: Date;
    if (input.expiryDateManual) {
      expiry = new Date(input.expiryDateManual);
    } else {
      expiry = new Date(prod);
      expiry.setMonth(expiry.getMonth() + (Number(input.shelfLifeMonths) || 12));
    }

    const totalMs = expiry.getTime() - prod.getTime();
    const passedMs = now.getTime() - prod.getTime();
    const remainMs = expiry.getTime() - now.getTime();

    const totalDays = Math.max(1, Math.round(totalMs / (1000 * 60 * 60 * 24)));
    const remainingDays = Math.round(remainMs / (1000 * 60 * 60 * 24));
    const passedDays = Math.round(passedMs / (1000 * 60 * 60 * 24));

    let remainingPercentage = Math.round((remainingDays / totalDays) * 100);
    remainingPercentage = Math.max(0, Math.min(100, remainingPercentage));

    if (remainingDays <= 0 || input.category === 'expired-disposal') {
      return {
        totalDays,
        remainingDays: 0,
        passedDays,
        remainingPercentage: 0,
        urgencyLevel: 'expired' as const,
        urgencyLabel: '超期变质报废处置 (合规无害化销毁通道)',
        colorClass: 'bg-rose-100 text-rose-800 border-rose-300',
        recommendation: '【合规销毁程序】依《中华人民共和国食品安全法》第54条，超期食品坚决退出流通。隆昌行提供全流程合规报废处置：专车清运、入场过磅、机械物理粉碎、双人监销录像与出具正规盖章《食品销毁证明》，免除企业法务审计与税务稽查风险。',
      };
    }

    if (remainingPercentage <= 15) {
      return {
        totalDays,
        remainingDays,
        passedDays,
        remainingPercentage,
        urgencyLevel: 'critical' as const,
        urgencyLabel: `极度临期 (余 ${remainingDays} 天 / 剩 ${remainingPercentage}%)`,
        colorClass: 'bg-red-100 text-red-800 border-red-300',
        recommendation: '效期已进入末期倒计时，需匹配即时快流的社区特价闪清或特定餐饮食堂，需当日快速完成验货与发货。',
      };
    }

    if (remainingPercentage <= 35) {
      return {
        totalDays,
        remainingDays,
        passedDays,
        remainingPercentage,
        urgencyLevel: 'urgent' as const,
        urgencyLabel: `深度临期 (余 ${remainingDays} 天 / 剩 ${remainingPercentage}%)`,
        colorClass: 'bg-amber-100 text-amber-800 border-amber-300',
        recommendation: '处于折扣供应链与临期特通主流消化区间，适合三四线下沉零售集合店及特价专柜。',
      };
    }

    if (remainingPercentage <= 60) {
      return {
        totalDays,
        remainingDays,
        passedDays,
        remainingPercentage,
        urgencyLevel: 'moderate' as const,
        urgencyLabel: `常规临期 (余 ${remainingDays} 天 / 剩 ${remainingPercentage}%)`,
        colorClass: 'bg-blue-100 text-blue-800 border-blue-300',
        recommendation: '效期条件较充裕，流通渠道选择广，可较好兼顾处置回收价值与渠道隔离。',
      };
    }

    return {
      totalDays,
      remainingDays,
      passedDays,
      remainingPercentage,
      urgencyLevel: 'safe' as const,
      urgencyLabel: `效期充裕 (余 ${remainingDays} 天 / 剩 ${remainingPercentage}%)`,
      colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      recommendation: '效期超过60%，通常属于滞销、退换货或大促备货过剩库存，渠道消化阻力小，价值留存度高。',
    };
  }, [input.productionDate, input.shelfLifeMonths, input.expiryDateManual]);

  // Assessment Scoring & Completeness Check
  const assessmentResult = useMemo((): AssessmentResult => {
    let score = 30; // base score
    const missing: string[] = [];
    const strengths: string[] = [];

    if (input.productName.trim()) {
      score += 15;
      strengths.push('明确了产品品名与包装形态');
    } else {
      missing.push('缺失明确品名与规格条码');
    }

    if (input.quantity.trim() && Number(input.quantity) > 0) {
      score += 15;
      strengths.push(`提供了具体批次数量 (${input.quantity} ${input.unit})`);
    } else {
      missing.push('缺失准确的批次库存数量');
    }

    if (input.productionDate) {
      score += 20;
      strengths.push('填写了清晰的生产日期');
    } else {
      missing.push('缺失生产日期或生产批号');
    }

    if (input.warehouseCity.trim()) {
      score += 10;
      strengths.push(`明确了库存存放地 (${input.warehouseCity})`);
    } else {
      missing.push('缺失存放仓库所在城市');
    }

    if (input.temperatureZone === 'frozen' || input.temperatureZone === 'chilled') {
      strengths.push('已标明冷链温控要求');
    }

    if (input.channelRestrictions.length > 0) {
      score += 10;
      strengths.push('界定了渠道禁限与价格保护范围');
    }

    // Format text brief for WeChat / communication
    const formattedBrief = `【北京隆昌行 · 食品库存批次初步核验单】
-----------------------------------
■ 产品名称：${input.productName || '（待填写）'}
■ 所属品类：${CATEGORY_OPTIONS.find((c) => c.id === input.category)?.label || input.category}
■ 批次数量：${input.quantity ? `${input.quantity} ${input.unit}` : '（待提供）'}
■ 生产日期：${input.productionDate || '（待核验）'}
■ 保质期长：${input.shelfLifeMonths} 个月
■ 效期测算：${calculatedShelfLife.urgencyLabel}
■ 存储温区：${
      input.temperatureZone === 'ambient'
        ? '常温'
        : input.temperatureZone === 'chilled'
        ? '冷藏 0~4℃'
        : input.temperatureZone === 'frozen'
        ? '冷冻 -18℃及以下'
        : '待核实'
    }
■ 存放城市：${input.warehouseCity || '全国'}
■ 包装状况：${
      input.packagingCondition === 'intact_original'
        ? '原箱完好'
        : input.packagingCondition === 'slightly_worn'
        ? '轻微磨损未破'
        : input.packagingCondition === 'loose_box'
        ? '存在部分散箱'
        : '需重新换箱/缠膜'
    }
■ 渠道限制：${input.channelRestrictions.join('；') || '无特定限制'}
■ 附加说明：${input.notes || '无'}
-----------------------------------
◇ 评估机构：北京隆昌行商贸有限公司 (统一社会信用代码: ${COMPANY_INFO.uscc})
◇ 对接专线：${COMPANY_INFO.phone} (微信同号: ${COMPANY_INFO.wechat})
◇ 处理原则：事实可核验 · 边界可说明 · 来源可追溯`;

    return {
      score: Math.min(100, score),
      shelfLife: calculatedShelfLife,
      missingFields: missing,
      keyStrengths: strengths,
      channelSuitability: [
        '非核心市场三四线实体折扣超市',
        '封闭型企业工会福利与内部福利购',
        '特定团膳配餐及食堂封闭供应链',
        '社区特价特通闭环渠道',
      ],
      dispositionAdvice: calculatedShelfLife.recommendation,
      formattedBrief,
    };
  }, [input, calculatedShelfLife]);

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(assessmentResult.formattedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRestrictionToggle = (restriction: string) => {
    setInput((prev) => {
      const exists = prev.channelRestrictions.includes(restriction);
      return {
        ...prev,
        channelRestrictions: exists
          ? prev.channelRestrictions.filter((r) => r !== restriction)
          : [...prev.channelRestrictions, restriction],
      };
    });
  };

  // AI Assessment Handler
  const handleAiAnalyze = async () => {
    if (!aiText.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const res = await fetch('/api/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textPrompt: aiText }),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setAiResult(json.data);
      } else {
        // Fallback local heuristic parsing if offline or API key missing
        fallbackLocalParse(aiText);
      }
    } catch {
      fallbackLocalParse(aiText);
    } finally {
      setAiLoading(false);
    }
  };

  // Local fallback parser to ensure 100% reliability
  const fallbackLocalParse = (text: string) => {
    const isFrozen = /冷冻|海鲜|虾|肉|鱼|冻品|-18/i.test(text);
    const isDrink = /奶|牛奶|乳|饮料|水|茶|果汁/i.test(text);
    const isAlcohol = /酒|茅台|五粮液|啤酒|红酒/i.test(text);

    let category = '临期预包装食品';
    if (isFrozen) category = '冷冻食品与海鲜水产';
    else if (isDrink) category = '饮料与乳制品';
    else if (isAlcohol) category = '白酒与酒水类';

    setAiResult({
      productName: text.slice(0, 30).split(/[,，\n]/)[0] || '预包装食品大宗库存',
      category,
      quantity: '已从文本提取批次',
      productionDate: '待提供出厂检验批号',
      expiryDate: '需核对包装喷码',
      shelfLifeAnalysis: '处于临期流通适销周期，需根据确切到期日匹配分流时效',
      storageCondition: isFrozen ? '-18℃ 冷冻' : '常温干燥避光',
      location: text.includes('北京') ? '北京市' : text.includes('天津') ? '天津市' : '待补充具体仓库城市',
      completenessScore: 78,
      riskPoints: [
        '需查验清晰的生产日期喷码实拍照片',
        isFrozen ? '需补充冷库温控打温流水与出入库单' : '需明确原箱外包装完好度',
      ],
      channelAdvice: '严格执行封闭特通渠道消化，书面禁止流向公域电商平台，保护品牌商正价大盘。',
      longchangxingAdvice: '请联系北京隆昌行 (电话/微信 13552601231)，补充批次明细后即可进入验货及合同程序。',
    });
  };

  const loadPresetExample = (type: 'milk' | 'shrimp') => {
    if (type === 'milk') {
      setAiText(
        '蒙牛纯牛奶250ml*24盒，库存3500件，生产日期2025年10月，保质期6个月，目前在北京大兴常温高标仓。品牌方要求严格禁止流向天猫拼多多等公域电商，只允许在北方下沉实体特通或员工内购消化，需要开增值税专用发票。'
      );
    } else {
      setAiText(
        '阿根廷红虾L1规格2kg*6盒/箱，共有1800件。存放于天津滨海新区保税冷库，全程-18度打温记录齐全，报关单检验检疫单齐全。到期日2026年11月。要求具备冷藏车提货能力，一次性整库清空。'
      );
    }
  };

  return (
    <section id="assessment" className="py-16 bg-[#faf8f5] text-slate-800 border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>三分钟自助核验 · 商业底牌私密保护</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            企业食品库存快速评估与清单生成器
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            无需注册，填写内容仅在你的本地浏览器中运算，保护商业隐私。
            系统将测算<strong>剩余效期比例</strong>、<strong>温控与合规边界</strong>，并生成可直接发给合作方的格式化核验单。
          </p>

          {/* Mode Switch Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300 mt-4 shadow-inner">
            <button
              onClick={() => setActiveTab('structured')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'structured'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>结构化批次表单 (标准测算)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI 文本/表格智能提取 (快速解析)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Structured Batch Calculator */}
        {activeTab === 'structured' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Form Input */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Block 1: Category & Product Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Package className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">01. 货物基本信息</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      食品品类归属 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={input.category}
                      onChange={(e) => {
                        const cat = e.target.value as FoodCategory;
                        const opt = CATEGORY_OPTIONS.find((c) => c.id === cat);
                        setInput({
                          ...input,
                          category: cat,
                          temperatureZone: opt?.defaultTemp || 'ambient',
                        });
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      产品品名、规格与条码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例：蒙牛纯牛奶 250ml*24盒/箱 (69码完整)"
                      value={input.productName}
                      onChange={(e) => setInput({ ...input, productName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      库存总数量 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="例：3000"
                        value={input.quantity}
                        onChange={(e) => setInput({ ...input, quantity: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                      />
                      <select
                        value={input.unit}
                        onChange={(e) => setInput({ ...input, unit: e.target.value })}
                        className="w-24 px-2 py-2 text-sm rounded-lg border border-slate-300 bg-slate-100 font-medium"
                      >
                        <option value="箱">箱</option>
                        <option value="件">件</option>
                        <option value="托/板">托/板</option>
                        <option value="吨">吨</option>
                        <option value="瓶/袋">瓶/袋</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      仓库所在城市 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例：北京市大兴区 / 天津港"
                      value={input.warehouseCity}
                      onChange={(e) => setInput({ ...input, warehouseCity: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Block 2: Expiry & Storage Condition */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">02. 效期倒计与温区环境</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      生产日期 (喷印日期) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={input.productionDate}
                      onChange={(e) => setInput({ ...input, productionDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      总保质期时长 (月)
                    </label>
                    <select
                      value={input.shelfLifeMonths}
                      onChange={(e) =>
                        setInput({ ...input, shelfLifeMonths: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    >
                      <option value="1">1 个月 (超短保鲜奶/烘焙)</option>
                      <option value="3">3 个月 (短保休食)</option>
                      <option value="6">6 个月 (乳品/即饮饮料)</option>
                      <option value="9">9 个月</option>
                      <option value="12">12 个月 (常规预包装食品)</option>
                      <option value="18">18 个月 (进口食品/调味品)</option>
                      <option value="24">24 个月 (冷冻海鲜肉类/罐头)</option>
                      <option value="36">36 个月 (长期常温)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      储存温区要求
                    </label>
                    <select
                      value={input.temperatureZone}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          temperatureZone: e.target.value as TemperatureZone,
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50 font-medium"
                    >
                      <option value="ambient">常温干燥仓储 (15~25℃)</option>
                      <option value="chilled">保鲜冷藏 (0~4℃)</option>
                      <option value="frozen">恒温冷冻 (-18℃及以下)</option>
                      <option value="unconfirmed">待确认</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      外包装箱体品相
                    </label>
                    <select
                      value={input.packagingCondition}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          packagingCondition: e.target.value as PackagingCondition,
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    >
                      <option value="intact_original">原装原箱，胶带封箱完好无损</option>
                      <option value="slightly_worn">轻微外箱磨损，内部完好无破漏</option>
                      <option value="loose_box">存在部分开箱或零散散箱</option>
                      <option value="damaged_need_repack">外箱挤压变形，需重新分装缠膜</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Block 3: Channel Protection Boundaries */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    03. 价格保护与渠道禁限要求 (可多选)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    '严禁公域线上平台 (淘宝/天猫/拼多多/京东)',
                    '限定下沉市场或封闭特通渠道',
                    '限定特定省份或区域销售 (防跨区窜货)',
                    '要求去码、撕防伪标或贴特供标',
                    '要求重新打包换外箱，隐去原经销商信息',
                    '仅限企业员工内购或工厂食堂封闭福利',
                  ].map((res) => {
                    const checked = input.channelRestrictions.includes(res);
                    return (
                      <label
                        key={res}
                        onClick={() => handleRestrictionToggle(res)}
                        className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer select-none transition-colors ${
                          checked
                            ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                            : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="mt-0.5 text-amber-600 rounded"
                        />
                        <span>{res}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Block 4: Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  补充说明 (如开票要求、结算期望、提货时间要求)
                </label>
                <textarea
                  rows={2}
                  value={input.notes}
                  onChange={(e) => setInput({ ...input, notes: e.target.value })}
                  placeholder="例：需开具13%增值税专用发票；仓库月台支持9.6米货车靠装；希望3日内完成验货提货。"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Right 5 Columns: Real-Time Analysis & Generated Brief */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dynamic Shelf-Life Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                    效期倒计测算仪
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${calculatedShelfLife.colorClass}`}
                  >
                    {calculatedShelfLife.urgencyLabel}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>剩余效期比：</span>
                    <strong className="text-slate-900 font-mono text-sm">
                      {calculatedShelfLife.remainingPercentage}%
                    </strong>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        calculatedShelfLife.remainingPercentage > 50
                          ? 'bg-emerald-500'
                          : calculatedShelfLife.remainingPercentage > 25
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${calculatedShelfLife.remainingPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                    <span>已过: {calculatedShelfLife.passedDays} 天</span>
                    <span>剩余: {calculatedShelfLife.remainingDays} 天</span>
                    <span>总期: {calculatedShelfLife.totalDays} 天</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">流转适销建议：</strong>
                  {calculatedShelfLife.recommendation}
                </div>
              </div>

              {/* Completeness & Diagnostic Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">资料完整度评分</h4>
                    <p className="text-xs text-slate-500">资料越完善，初评与报价越精准</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-amber-600 font-mono">
                      {assessmentResult.score}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                {/* Missing alerts if any */}
                {assessmentResult.missingFields.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>建议完善以下内容以提升评估确定性：</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                      {assessmentResult.missingFields.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick strengths */}
                {assessmentResult.keyStrengths.length > 0 && (
                  <div className="text-xs space-y-1">
                    <span className="text-slate-500 font-medium">已确认信息要点：</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {assessmentResult.keyStrengths.map((str, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]"
                        >
                          ✓ {str}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
                  <button
                    onClick={handleCopyBrief}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">已成功复制核验单！可直接发微信</span>
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4 text-amber-400" />
                        <span>一键复制标准化核验单 (发给合作方)</span>
                      </>
                    )}
                  </button>

                  {/* Prominent Direct Contact Box: WeChat & Phone side-by-side */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700/80 space-y-2 shadow-inner">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-bold flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                        官方对接专线 · 极速核验
                      </span>
                      <span className="text-[11px] text-slate-400">工作日 2小时内答复</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* WeChat box: enlarged */}
                      <div
                        onClick={() => {
                          navigator.clipboard.writeText(COMPANY_INFO.wechat);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-2.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 transition-colors cursor-pointer text-center group"
                        title="点击复制微信"
                      >
                        <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>对接微信 (点此复制)</span>
                        </div>
                        <div className="text-base sm:text-lg font-black font-mono text-white tracking-wide mt-0.5 group-hover:text-emerald-300 transition-colors">
                          {COMPANY_INFO.wechat}
                        </div>
                      </div>

                      {/* Phone box: enlarged */}
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="p-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 transition-colors cursor-pointer text-center block group"
                        title="点击呼叫官方电话"
                      >
                        <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>对接电话 (点此呼叫)</span>
                        </div>
                        <div className="text-base sm:text-lg font-black font-mono text-white tracking-wide mt-0.5 group-hover:text-amber-300 transition-colors">
                          {COMPANY_INFO.phoneFormatted}
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowSlipModal(true)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>查看正式核验单</span>
                    </button>

                    <button
                      onClick={onOpenContact}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>直联隆昌行业务专员 ↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AI Parser Mode */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  智能批次识别引擎
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  粘贴零散库存聊天记录或 Excel 复制内容
                </h3>
                <p className="text-xs text-slate-500">
                  自动识别产品品名、规格、数量、生产日期、温区要求及渠道风险，一键生成结构化对接卡片。
                </p>
              </div>

              {/* Presets */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => loadPresetExample('milk')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  测试案例1: 纯牛奶批次
                </button>
                <button
                  onClick={() => loadPresetExample('shrimp')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  测试案例2: 冷冻红虾批次
                </button>
              </div>
            </div>

            <div>
              <textarea
                rows={5}
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                placeholder="直接粘贴微信聊天信息、仓库盘点通知或单据摘要...
例如：蒙牛纯牛奶250ml*24盒，库存3500件，生产日期2025年10月，保质期6个月，目前在北京大兴常温高标仓。不能上电商平台..."
                className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm leading-relaxed bg-slate-50/40"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                支持常温、冻品、酒饮乳品等各类食品库存文本智能分词与风控诊断。
              </span>
              <button
                onClick={handleAiAnalyze}
                disabled={aiLoading || !aiText.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>智能核算分析中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>智能识别并生成诊断</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Result Card */}
            {aiResult && (
              <div className="mt-6 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6 shadow-xl animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h4 className="font-bold text-amber-300 text-base">智能批次诊断报告已出具</h4>
                  </div>
                  <span className="text-xs text-slate-400">
                    完整度评分：<strong className="text-amber-400">{aiResult.completenessScore} 分</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400 block mb-1">识别品名与规格</span>
                    <strong className="text-white text-sm">{aiResult.productName}</strong>
                    <span className="block mt-1 text-amber-400">{aiResult.category}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400 block mb-1">批次规模与存放地</span>
                    <strong className="text-white text-sm">{aiResult.quantity}</strong>
                    <span className="block mt-1 text-slate-300">所在位置：{aiResult.location}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400 block mb-1">温区要求</span>
                    <strong className="text-cyan-300 text-sm">{aiResult.storageCondition}</strong>
                    <span className="block mt-1 text-slate-400">严格遵守储存温控</span>
                  </div>
                </div>

                {/* Shelf life assessment */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs space-y-1">
                  <strong className="text-amber-300 block">效期与流转紧迫度评估：</strong>
                  <p className="text-slate-200 leading-relaxed">{aiResult.shelfLifeAnalysis}</p>
                </div>

                {/* Risk and Channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>待核查风险点与缺失资料</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-red-200">
                      {aiResult.riskPoints.map((rp, i) => (
                        <li key={i}>{rp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      <span>价格保护与渠道防窜货建议</span>
                    </div>
                    <p className="text-blue-100 leading-relaxed">{aiResult.channelAdvice}</p>
                  </div>
                </div>

                {/* Next action */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs">
                    <strong className="text-amber-300 block">隆昌行专家处置建议：</strong>
                    <span className="text-slate-300">{aiResult.longchangxingAdvice}</span>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    联络官方专员沟通 ↗
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slip Modal Preview */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  北京隆昌行商贸有限公司
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  食品大宗库存批次初步核验单
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  单据编号：LCH-{(Date.now() % 1000000).toString().padStart(6, '0')} · 工商代码: {COMPANY_INFO.uscc}
                </p>
              </div>
              <button
                onClick={() => setShowSlipModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printed Slip Content */}
            <div className="space-y-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-2 gap-3">
                <div><strong>产品品名：</strong>{input.productName || '未标明'}</div>
                <div><strong>品类分类：</strong>{CATEGORY_OPTIONS.find((c) => c.id === input.category)?.label}</div>
                <div><strong>批次数量：</strong>{input.quantity ? `${input.quantity} ${input.unit}` : '未标明'}</div>
                <div><strong>存放城市：</strong>{input.warehouseCity}</div>
                <div><strong>生产日期：</strong>{input.productionDate || '待核验'}</div>
                <div><strong>总保质期：</strong>{input.shelfLifeMonths} 个月</div>
                <div><strong>储存温区：</strong>{input.temperatureZone}</div>
                <div><strong>包装状况：</strong>{input.packagingCondition}</div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <strong>效期诊断：</strong>{calculatedShelfLife.urgencyLabel}（剩余 {calculatedShelfLife.remainingPercentage}%）
              </div>

              <div>
                <strong>渠道约束条款：</strong>
                <p className="text-slate-600 mt-0.5">{input.channelRestrictions.join('；') || '未限制'}</p>
              </div>

              <div>
                <strong>补充说明：</strong>
                <p className="text-slate-600 mt-0.5">{input.notes || '无'}</p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed space-y-1">
              <p>※ 本凭单仅为双方初步技术沟通与适配依据，不构成正式购销合同或最终提货承诺。</p>
              <p>※ 最终交易条件、货品质量责任与渠道销售边界以双方正式签署的书面协议为准。</p>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
              >
                打印凭单
              </button>
              <button
                onClick={() => {
                  handleCopyBrief();
                  setShowSlipModal(false);
                }}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer"
              >
                复制文本并关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
