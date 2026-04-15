import React, { createContext, useContext, useState, useCallback } from "react";
import { Phase, PHASES, INPUT_QUESTIONS } from "@/data/ehsChecklistData";

interface PhaseRejection {
  rejected: boolean;
  rejectedBy: string;
  rejectedAt: string;
  comments: string;
}

interface ProjectState {
  projectTitle: string;
  projectLeadName: string;
  projectLeadEmail: string;
  ehsApproverName: string;
  ehsApproverEmail: string;
  ehsApproverPin: string;
  answers: Record<string, boolean>;
  activeSections: string[];
  checklistCreated: boolean;
  currentPhaseIndex: number;
  phaseApprovals: Record<Phase, { approved: boolean; approverName: string; approvedAt: string }>;
  phaseRejections: Record<Phase, PhaseRejection>;
  checkedItems: Record<string, boolean>;
}

interface EHSContextType {
  state: ProjectState;
  setProjectTitle: (title: string) => void;
  setProjectLeadName: (name: string) => void;
  setProjectLeadEmail: (email: string) => void;
  setEhsApproverName: (name: string) => void;
  setEhsApproverEmail: (email: string) => void;
  setEhsApproverPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  setAnswer: (questionId: string, value: boolean) => void;
  createChecklist: () => void;
  resetProject: () => void;
  approvePhase: (phase: Phase, approverName: string) => void;
  rejectPhase: (phase: Phase, rejectedBy: string, comments: string) => void;
  clearRejection: (phase: Phase) => void;
  toggleCheckItem: (itemKey: string) => void;
  canAccessPhase: (phaseIndex: number) => boolean;
  getCurrentPhase: () => Phase;
}

const EHSContext = createContext<EHSContextType | null>(null);

export function useEHS() {
  const ctx = useContext(EHSContext);
  if (!ctx) throw new Error("useEHS must be used within EHSProvider");
  return ctx;
}

const initialState: ProjectState = {
  projectTitle: "",
  projectLeadName: "",
  projectLeadEmail: "",
  ehsApproverName: "",
  ehsApproverEmail: "",
  ehsApproverPin: "",
  answers: {},
  activeSections: [],
  checklistCreated: false,
  currentPhaseIndex: 0,
  phaseApprovals: {} as ProjectState["phaseApprovals"],
  phaseRejections: {} as ProjectState["phaseRejections"],
  checkedItems: {},
};

export function EHSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProjectState>(initialState);

  const setProjectTitle = useCallback((title: string) => {
    setState((s) => ({ ...s, projectTitle: title }));
  }, []);

  const setProjectLeadName = useCallback((name: string) => {
    setState((s) => ({ ...s, projectLeadName: name }));
  }, []);

  const setProjectLeadEmail = useCallback((email: string) => {
    setState((s) => ({ ...s, projectLeadEmail: email }));
  }, []);

  const setEhsApproverName = useCallback((name: string) => {
    setState((s) => ({ ...s, ehsApproverName: name }));
  }, []);

  const setEhsApproverEmail = useCallback((email: string) => {
    setState((s) => ({ ...s, ehsApproverEmail: email }));
  }, []);

  const setAnswer = useCallback((questionId: string, value: boolean) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [questionId]: value } }));
  }, []);

  const createChecklist = useCallback(() => {
    setState((s) => {
      const activeSections: string[] = [];
      INPUT_QUESTIONS.forEach((q) => {
        if (s.answers[q.id]) {
          activeSections.push(...q.triggeredSections);
        }
      });
      return { ...s, activeSections, checklistCreated: true, currentPhaseIndex: 0 };
    });
  }, []);

  const resetProject = useCallback(() => {
    setState(initialState);
  }, []);

  const approvePhase = useCallback((phase: Phase, approverName: string) => {
    setState((s) => {
      const newApprovals = {
        ...s.phaseApprovals,
        [phase]: { approved: true, approverName, approvedAt: new Date().toISOString() },
      };
      const newRejections = { ...s.phaseRejections };
      delete newRejections[phase];
      const phaseIndex = PHASES.indexOf(phase);
      return {
        ...s,
        phaseApprovals: newApprovals,
        phaseRejections: newRejections,
        currentPhaseIndex: Math.max(s.currentPhaseIndex, phaseIndex + 1),
      };
    });
  }, []);

  const rejectPhase = useCallback((phase: Phase, rejectedBy: string, comments: string) => {
    setState((s) => {
      const newRejections = {
        ...s.phaseRejections,
        [phase]: {
          rejected: true,
          rejectedBy,
          rejectedAt: new Date().toISOString(),
          comments,
        },
      };
      return { ...s, phaseRejections: newRejections };
    });
  }, []);

  const clearRejection = useCallback((phase: Phase) => {
    setState((s) => {
      const newRejections = { ...s.phaseRejections };
      delete newRejections[phase];
      return { ...s, phaseRejections: newRejections };
    });
  }, []);

  const toggleCheckItem = useCallback((itemKey: string) => {
    setState((s) => ({
      ...s,
      checkedItems: { ...s.checkedItems, [itemKey]: !s.checkedItems[itemKey] },
    }));
  }, []);

  const canAccessPhase = useCallback(
    (phaseIndex: number) => {
      if (phaseIndex === 0) return true;
      const prevPhase = PHASES[phaseIndex - 1];
      return !!state.phaseApprovals[prevPhase]?.approved;
    },
    [state.phaseApprovals]
  );

  const getCurrentPhase = useCallback(() => {
    return PHASES[Math.min(state.currentPhaseIndex, PHASES.length - 1)];
  }, [state.currentPhaseIndex]);

  return (
    <EHSContext.Provider
      value={{
        state,
        setProjectTitle,
        setProjectLeadName,
        setProjectLeadEmail,
        setEhsApproverName,
        setEhsApproverEmail,
        setEhsApproverPin,
        verifyPin,
        setAnswer,
        createChecklist,
        resetProject,
        approvePhase,
        rejectPhase,
        clearRejection,
        toggleCheckItem,
        canAccessPhase,
        getCurrentPhase,
      }}
    >
      {children}
    </EHSContext.Provider>
  );
}
