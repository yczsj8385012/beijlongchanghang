import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Building,
  ShieldCheck,
  Check,
  Copy,
  Clock,
  MapPin,
  FileSpreadsheet,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToAssessment: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onScrollToAssessment,
}) => {
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMPANY_INFO.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(COMPANY_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden space-y-6">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>官方主体与核验联络渠道</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              对接北京隆昌行
            </h3>
            <p className="text-xs text-slate-500">
              请先准备好产品品名、数量、效期及存放仓库城市
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Channels */}
        <div className="space-y-3">
          {/* Phone Channel */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-amber-900 font-semibold block">官方对接电话</span>
                <span className="text-lg font-black text-slate-900 font-mono tracking-wide">
                  {COMPANY_INFO.phoneFormatted}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
              >
                拨打
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-2 rounded-lg bg-white border border-amber-300 text-slate-700 hover:bg-amber-100 text-xs transition-colors cursor-pointer"
                title="复制号码"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* WeChat Channel */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-semibold block">官方企业微信号</span>
                <span className="text-lg font-black text-white font-mono tracking-wider">
                  {COMPANY_INFO.wechat}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyWechat}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {copiedWechat ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>复制微信</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Enterprise Dossier Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span>官方企业名称：</span>
            <strong className="text-slate-800">{COMPANY_INFO.name}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>统一社会信用代码：</span>
            <strong className="text-slate-800 font-mono">{COMPANY_INFO.uscc}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>注册成立时间：</span>
            <span className="text-slate-700">{COMPANY_INFO.establishedDate}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>总部调度枢纽：</span>
            <span className="text-slate-700">{COMPANY_INFO.address}</span>
          </div>
        </div>

        {/* Tip for faster response */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
          <strong className="text-amber-950 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            快速响应建议：
          </strong>
          <p className="text-[11px] leading-relaxed">
            加微信后，直接发送由本站工具生成的<strong>《食品库存批次初步核验单》</strong>或货品实拍照片，专员将在2小时内给出初步处置建议。
          </p>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onScrollToAssessment();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            使用在线评估工具生成清单 ↗
          </button>
        </div>
      </div>
    </div>
  );
};
