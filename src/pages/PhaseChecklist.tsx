import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEHS } from "@/context/EHSContext";
import { PHASES, getFilteredChecklist } from "@/data/ehsChecklistData";
import {
  Shield,
  Check,
  Lock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  ArrowLeft,
} from "lucide-react";
import agcLogo from "@/assets/AGC-Logo-Emblem.png";

const PhaseChecklist = () => {
  const { phaseIndex: phaseIndexParam } = useParams();
  const phaseIndex = parseInt(phaseIndexParam || "0", 10);
  const navigate = useNavigate();
  const { state, toggleCheckItem, approvePhase, canAccessPhase } = useEHS();
  const [approverName, setApproverName] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  if (!state.checklistCreated) {
    navigate("/");
    return null;
  }

  if (!canAccessPhase(phaseIndex)) {
    navigate(`/checklist/${phaseIndex - 1}`);
    return null;
  }

  const phase = PHASES[phaseIndex];
  const sections = getFilteredChecklist(state.activeSections, phase);
  const isApproved = !!state.phaseApprovals[phase]?.approved;
  const isLastPhase = phaseIndex === PHASES.length - 1;

  // Count completion
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = sections.reduce(
    (sum, s) =>
      sum +
      s.items.filter((item) => state.checkedItems[`${phase}-${item.category}-${item.sortOrder}`])
        .length,
    0
  );
  const allChecked = totalItems > 0 && checkedCount === totalItems;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const handleApprove = () => {
    if (approverName.trim()) {
      approvePhase(phase, approverName.trim());
      setShowApprovalModal(false);
      setApproverName("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={agcLogo} alt="AGC Logo" className="h-18 w-auto" />
              <div>
                <p className="text-xs opacity-70 font-medium">{state.projectTitle}</p>
                <h1 className="text-lg font-bold tracking-tight">EHS Project Checklist</h1>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-sm opacity-70 hover:opacity-100 flex items-center gap-1 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              New Project
            </button>
          </div>
        </div>
      </header>

      {/* Phase Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            {PHASES.map((p, i) => {
              const isActive = i === phaseIndex;
              const approved = !!state.phaseApprovals[p]?.approved;
              const accessible = canAccessPhase(i);
              return (
                <button
                  key={p}
                  onClick={() => accessible && navigate(`/checklist/${i}`)}
                  disabled={!accessible}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : approved
                      ? "bg-success/10 text-success"
                      : accessible
                      ? "bg-muted text-muted-foreground hover:bg-secondary"
                      : "opacity-40 text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {approved ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : !accessible ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
                      {i + 1}
                    </span>
                  )}
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Phase {phaseIndex + 1}: {phase}
            </span>
            <span className="text-sm font-bold text-primary">
              {checkedCount}/{totalItems} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {sections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No applicable items for this phase.</p>
            {!isApproved && (
              <button
                onClick={() => setShowApprovalModal(true)}
                className="mt-4 px-6 py-3 rounded-lg bg-success text-success-foreground font-bold"
              >
                Approve & Continue
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.category} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="bg-primary/5 px-5 py-3 border-b border-border">
                  <h3 className="font-bold text-sm text-foreground">{section.category}</h3>
                </div>
                <div className="divide-y divide-border">
                  {section.items.map((item) => {
                    const key = `${phase}-${item.category}-${item.sortOrder}`;
                    const checked = !!state.checkedItems[key];
                    return (
                      <button
                        key={key}
                        onClick={() => !isApproved && toggleCheckItem(key)}
                        disabled={isApproved}
                        className={`w-full flex items-start gap-3 px-5 py-3.5 text-left transition-colors ${
                          isApproved
                            ? "opacity-70 cursor-default"
                            : "hover:bg-muted/50 cursor-pointer"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {checked ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            checked
                              ? "text-muted-foreground line-through"
                              : "text-card-foreground"
                          }`}
                        >
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approval Section */}
        {!isApproved && sections.length > 0 && (
          <div className="mt-8 p-6 bg-card rounded-xl border-2 border-dashed border-border">
            <h3 className="font-bold text-foreground mb-2">EHS Manager Approval Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All items must be completed before this phase can be approved. The EHS manager must
              approve before proceeding to the next phase.
            </p>
            <button
              onClick={() => allChecked && setShowApprovalModal(true)}
              disabled={!allChecked}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                allChecked
                  ? "bg-success text-success-foreground shadow-md hover:shadow-lg hover:brightness-110"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {allChecked ? "Submit for EHS Manager Approval" : `Complete all items first (${checkedCount}/${totalItems})`}
            </button>
          </div>
        )}

        {/* Approved badge */}
        {isApproved && (
          <div className="mt-8 p-6 bg-success/10 rounded-xl border border-success/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <h3 className="font-bold text-foreground">Phase Approved</h3>
                <p className="text-sm text-muted-foreground">
                  Approved by <strong>{state.phaseApprovals[phase].approverName}</strong> on{" "}
                  {new Date(state.phaseApprovals[phase].approvedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => phaseIndex > 0 && navigate(`/checklist/${phaseIndex - 1}`)}
            disabled={phaseIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              phaseIndex > 0
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "opacity-40 cursor-not-allowed text-muted-foreground"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Phase
          </button>

          {isApproved && !isLastPhase && (
            <button
              onClick={() => navigate(`/checklist/${phaseIndex + 1}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-bold shadow-md hover:shadow-lg transition-all hover:brightness-110"
            >
              Next Phase
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {isApproved && isLastPhase && (
            <div className="px-6 py-3 rounded-lg bg-success text-success-foreground font-bold flex items-center gap-2">
              <Check className="h-5 w-5" />
              All Phases Complete!
            </div>
          )}
        </div>
      </main>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-card-foreground mb-2">
              EHS Manager Approval
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              By approving, you confirm all items in <strong>{phase}</strong> have been
              satisfactorily completed.
            </p>
            <label className="block text-sm font-semibold text-foreground mb-2">
              EHS Manager Name
            </label>
            <input
              type="text"
              value={approverName}
              onChange={(e) => setApproverName(e.target.value)}
              placeholder="Enter your full name..."
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent"
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-muted text-muted-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={!approverName.trim()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold transition-all ${
                  approverName.trim()
                    ? "bg-success text-success-foreground shadow-md hover:brightness-110"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Approve Phase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseChecklist;
