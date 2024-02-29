import { BASE_USER } from "@/components/constants";
import { create } from "zustand";

export const useStore = create((set) => ({
  tele: null,
  setTele: (tele) => set({ tele }),
  activeProposal: null,
  setActiveProposal: (activeProposal) => set({ activeProposal }),
  user: BASE_USER,
  setUser: (user) => set({ user }),
  pageLoading: true,
  setPageLoading: (pageLoading) => set({ pageLoading }),
  expanded: false,
  setExpanded: (expanded) => set({ expanded }),
  refreshUser: false,
  setRefreshUser: (refreshUser) => set({ refreshUser }),
  protocolFilter: "all",
  setProtocolFilter: (protocolFilter) => set({ protocolFilter }),
}));
