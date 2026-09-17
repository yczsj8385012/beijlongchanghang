/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AssessmentTool } from './components/AssessmentTool';
import { CategoriesSection } from './components/CategoriesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ProcessSection } from './components/ProcessSection';
import { GeoCoverageSection } from './components/GeoCoverageSection';
import { ComplianceSection } from './components/ComplianceSection';
import { FaqSection } from './components/FaqSection';
import { SeoTopicsSection } from './components/SeoTopicsSection';
import { SeoTopicModal } from './components/SeoTopicModal';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { FoodCategory, PageDefinition } from './types';
import { COMPANY_INFO } from './data/companyData';
import { SEO_PAGES, getSeoPageByPath } from './data/seoPages';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('near-expiry-purchase');
  const [dockCopied, setDockCopied] = useState(false);
  const [activeSeoPage, setActiveSeoPage] = useState<PageDefinition | null>(null);

  // Check URL path on mount and on popstate for direct link support
  React.useEffect(() => {
    const initialPath = window.location.pathname;
    if (initialPath && initialPath !== '/') {
      const matched = getSeoPageByPath(initialPath);
      if (matched) {
        setActiveSeoPage(matched);
      }
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath && currentPath !== '/') {
        const page = getSeoPageByPath(currentPath);
        setActiveSeoPage(page || null);
      } else {
        setActiveSeoPage(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (cat: FoodCategory) => {
    setSelectedCategory(cat);
    handleScrollTo('categories');
  };

  const handleOpenTopicByPath = (path: string) => {
    const page = getSeoPageByPath(path);
    if (page) {
      setActiveSeoPage(page);
    }
  };

  const handleCloseSeoModal = () => {
    setActiveSeoPage(null);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMPANY_INFO.wechat);
    setDockCopied(true);
    setTimeout(() => setDockCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Universal Header */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero & Core Value Proposition */}
        <HeroSection
          onScrollToAssessment={() => handleScrollTo('assessment')}
          onOpenContact={() => setIsContactOpen(true)}
          onSelectCategory={handleSelectCategory}
        />

        {/* 2. Category Standards & Boundary Rules: Core Spotlight */}
        <CategoriesSection
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollTo('assessment');
          }}
          selectedCategoryFromParent={selectedCategory}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenTopicByPath={handleOpenTopicByPath}
        />

        {/* 3. Interactive Assessment & Brief Generation Suite */}
        <AssessmentTool onOpenContact={() => setIsContactOpen(true)} />

        {/* 4. Strategic Solutions: Price Protection & Anti-Channel Conflict */}
        <SolutionsSection />

        {/* 5. 6-Stage Operational Roadmap */}
        <ProcessSection onScrollToAssessment={() => handleScrollTo('assessment')} />

        {/* 6. GEO & Nationwide Hub Logistics Network */}
        <GeoCoverageSection />

        {/* 7. Legal & Business Compliance Dossier */}
        <ComplianceSection />

        {/* 8. FAQ & GEO Structured Knowledge Base */}
        <FaqSection onOpenContact={() => setIsContactOpen(true)} />

        {/* 9. SEO & Regulatory Knowledge Base Directory (All 19 Topics) */}
        <SeoTopicsSection onOpenTopic={(page) => setActiveSeoPage(page)} />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* SEO Topic Deep-Dive Modal (Synchronized with URL) */}
      <SeoTopicModal
        page={activeSeoPage}
        onClose={handleCloseSeoModal}
        onNavigateToAssessment={() => handleScrollTo('assessment')}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact & Verification Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onScrollToAssessment={() => handleScrollTo('assessment')}
      />

      {/* Floating Action Dock for High-Visibility Dual Contact */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => handleScrollTo('assessment')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-amber-300 font-bold text-xs shadow-xl border border-slate-700/80 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="快速评估"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">智能批次测算</span>
          <span className="sm:hidden">测算</span>
        </button>

        {/* Dual Quick Contact Bar: WeChat & Phone */}
        <div className="flex items-center bg-slate-950/95 p-1.5 rounded-full shadow-2xl border border-amber-500/40 backdrop-blur-md gap-1.5">
          <button
            onClick={handleCopyWechat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer"
            title="点击复制官方微信"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{dockCopied ? '已复制微信!' : `微信: ${COMPANY_INFO.wechat}`}</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
            title="拨打官方热线"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-mono">{COMPANY_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
