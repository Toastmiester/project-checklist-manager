import React, { createContext, useContext, useState, useCallback } from "react";
import { Phase, PHASES, INPUT_QUESTIONS } from "@/data/ehsChecklistData";

interface ProjectState {
  projectTitle: string;
  answers: Record<string, boolean>;
  activeSections: string[];
  checklistCreated: boolean;
  currentPhaseIndex: number;
  phaseApprovals: Record<Phase, { approved: boolean; approverName: string; approvedAt: string }>;
  checkedItems: Record<string, boolean>;
}

interface EHSContextType {
  state: ProjectState;
  setProjectTitle: (title: string) => void;
  setAnswer: (questionId: string, value: boolean) => void;
  createChecklist: () => void;
  resetProject: () => void;
  approvePhase: (phase: Phase, approverName: string) => void;
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
  answers: {},
  activeSections: [],
  checklistCreated: false,
  currentPhaseIndex: 0,
  phaseApprovals: {} as ProjectState["phaseApprovals"],
  checkedItems: {},
};

export function EHSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProjectState>(initialState);

  const setProjectTitle = useCallback((title: string) => {
    setState((s) => ({ ...s, projectTitle: title }));
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
      const phaseIndex = PHASES.indexOf(phase);
      return {
        ...s,
        phaseApprovals: newApprovals,
        currentPhaseIndex: Math.max(s.currentPhaseIndex, phaseIndex + 1),
      };
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
        setAnswer,
        createChecklist,
        resetProject,
        approvePhase,
        toggleCheckItem,
        canAccessPhase,
        getCurrentPhase,
      }}
    >
      {children}
    </EHSContext.Provider>
  );
}
