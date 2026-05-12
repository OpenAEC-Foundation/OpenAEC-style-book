import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';
import type {
  ReportData,
  Section,
  ContentBlock,
  TemplateInfo,
  TenantInfo,
  BrandConfig,
} from '../types/report';
import { createBlankReport } from '../types/report';

interface ReportState {
  // Current report
  report: ReportData;
  activeSectionIndex: number | null;
  activeBlockIndex: number | null;

  // Tenant & template
  tenant: string;
  tenants: TenantInfo[];
  templates: TemplateInfo[];
  brand: BrandConfig | null;

  // PDF preview
  pdfBytes: Uint8Array | null;
  isGenerating: boolean;
  error: string | null;

  // Actions — Report
  setReport: (report: ReportData) => void;
  updateMetadata: (fields: Partial<ReportData>) => void;
  addSection: (section: Section) => void;
  updateSection: (index: number, section: Partial<Section>) => void;
  removeSection: (index: number) => void;
  addBlock: (sectionIndex: number, block: ContentBlock) => void;
  updateBlock: (sectionIndex: number, blockIndex: number, block: ContentBlock) => void;
  removeBlock: (sectionIndex: number, blockIndex: number) => void;
  setActiveSection: (index: number | null) => void;
  setActiveBlock: (index: number | null) => void;

  // Actions — Tenant
  setTenant: (tenant: string) => void;
  loadTenants: () => Promise<void>;
  loadTemplates: () => Promise<void>;
  loadBrand: () => Promise<void>;

  // Actions — PDF
  generatePdf: () => Promise<void>;
  savePdf: (path: string) => Promise<void>;
}

export const useReportStore = create<ReportState>((set, get) => ({
  report: createBlankReport(),
  activeSectionIndex: null,
  activeBlockIndex: null,
  tenant: 'openaec_foundation',
  tenants: [],
  templates: [],
  brand: null,
  pdfBytes: null,
  isGenerating: false,
  error: null,

  setReport: (report) => set({ report }),

  updateMetadata: (fields) =>
    set((state) => ({
      report: { ...state.report, ...fields },
    })),

  addSection: (section) =>
    set((state) => ({
      report: {
        ...state.report,
        sections: [...state.report.sections, section],
      },
    })),

  updateSection: (index, updates) =>
    set((state) => {
      const sections = [...state.report.sections];
      sections[index] = { ...sections[index]!, ...updates };
      return { report: { ...state.report, sections } };
    }),

  removeSection: (index) =>
    set((state) => ({
      report: {
        ...state.report,
        sections: state.report.sections.filter((_, i) => i !== index),
      },
    })),

  addBlock: (sectionIndex, block) =>
    set((state) => {
      const sections = [...state.report.sections];
      const section = { ...sections[sectionIndex]! };
      section.blocks = [...section.blocks, block];
      sections[sectionIndex] = section;
      return { report: { ...state.report, sections } };
    }),

  updateBlock: (sectionIndex, blockIndex, block) =>
    set((state) => {
      const sections = [...state.report.sections];
      const section = { ...sections[sectionIndex]! };
      section.blocks = [...section.blocks];
      section.blocks[blockIndex] = block;
      sections[sectionIndex] = section;
      return { report: { ...state.report, sections } };
    }),

  removeBlock: (sectionIndex, blockIndex) =>
    set((state) => {
      const sections = [...state.report.sections];
      const section = { ...sections[sectionIndex]! };
      section.blocks = section.blocks.filter((_, i) => i !== blockIndex);
      sections[sectionIndex] = section;
      return { report: { ...state.report, sections } };
    }),

  setActiveSection: (index) => set({ activeSectionIndex: index }),
  setActiveBlock: (index) => set({ activeBlockIndex: index }),

  setTenant: (tenant) => {
    set({ tenant });
    get().loadTemplates();
    get().loadBrand();
  },

  loadTenants: async () => {
    try {
      const tenants = await invoke<TenantInfo[]>('list_tenants');
      set({ tenants });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  loadTemplates: async () => {
    try {
      const { tenant } = get();
      const templates = await invoke<TemplateInfo[]>('list_templates', { tenant });
      set({ templates });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  loadBrand: async () => {
    try {
      const { tenant } = get();
      const brand = await invoke<BrandConfig>('get_brand', { tenant });
      set({ brand });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  generatePdf: async () => {
    set({ isGenerating: true, error: null });
    try {
      const { report, tenant } = get();
      const bytes = await invoke<number[]>('generate_pdf', { report, tenant });
      set({ pdfBytes: new Uint8Array(bytes), isGenerating: false });
    } catch (e) {
      set({ error: String(e), isGenerating: false });
    }
  },

  savePdf: async (path: string) => {
    set({ isGenerating: true, error: null });
    try {
      const { report, tenant } = get();
      await invoke('save_pdf', { report, tenant, path });
      set({ isGenerating: false });
    } catch (e) {
      set({ error: String(e), isGenerating: false });
    }
  },
}));
