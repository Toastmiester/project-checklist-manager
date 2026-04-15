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
  XCircle,
  AlertTriangle,
} from "lucide-react";
import agcLogo from "@/assets/AGC-Logo-Emblem.png";

const PHASE_COLORS: Record<string, string> = {
  "Design Review": "var(--phase-design-review)",
  "Demolition-Construction": "var(--phase-demolition-construction)",
  "Before Energizing": "var(--phase-before-energizing)",
  "Before Production Testing": "var(--phase-before-production-testing)",
  "Before Mass Production": "var(--phase-before-mass-production)",
};

const PHASE_TEXT_COLORS: Record<string, string> = {
  "Design Review": "#1a1a1a",
  "Demolition-Construction": "#fff",
  "Before Energizing": "#1a1a1a",
  "Before Production Testing": "#fff",
  "Before Mass Production": "#fff",
};

const PhaseChecklist = () => {
  const { phaseIndex: phaseIndexParam } = useParams();
  const phaseIndex = parseInt(phaseIndexParam || "0", 10);
  const navigate = useNavigate();
  const { state, toggleCheckItem, approvePhase, rejectPhase, clearRejection, canAccessPhase, verifyPin } = useEHS();
  const [approverName, setApproverName] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejecterName, setRejecterName] = useState("");
  const [rejectComments, setRejectComments] = useState("");
  const [approvalPin, setApprovalPin] = useState("");
  const [rejectPin, setRejectPin] = useState("");
  const [pinError, setPinError] = useState("");

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
  const isRejected = !!state.phaseRejections[phase]?.rejected;
  const isLastPhase = phaseIndex === PHASES.length - 1;

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
    if (approverName.trim() && approvalPin.trim()) {
      if (!verifyPin(approvalPin)) {
        setPinError("Incorrect PIN. Please try again.");
        return;
      }
      approvePhase(phase, approverName.trim());
      setShowApprovalModal(false);
      setApproverName("");
      setApprovalPin("");
      setPinError("");
    }
  };

  const handleReject = () => {
    if (rejecterName.trim() && rejectComments.trim() && rejectPin.trim()) {
      if (!verifyPin(rejectPin)) {
        setPinError("Incorrect PIN. Please try again.");
        return;
      }
      rejectPhase(phase, rejecterName.trim(), rejectComments.trim());
      setShowRejectModal(false);
      setRejecterName("");
      setRejectComments("");
      setRejectPin("");
      setPinError("");
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
              const rejected = !!state.phaseRejections[p]?.rejected;
              const accessible = canAccessPhase(i);
              return (
                <button
                  key={p}
                  onClick={() => accessible && navigate(`/checklist/${i}`)}
                  disabled={!accessible}
                  style={
                    accessible && !rejected
                      ? { backgroundColor: `hsl(${PHASE_COLORS[p]})`, color: PHASE_TEXT_COLORS[p] }
                      : undefined
                  }
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    !accessible
                      ? "opacity-40 text-muted-foreground cursor-not-allowed"
                      : rejected
                      ? "bg-destructive/10 text-destructive"
                      : isActive
                      ? "ring-2 ring-foreground/30 shadow-md"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {approved ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : rejected ? (
                    <XCircle className="h-3.5 w-3.5" />
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
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, backgroundColor: `hsl(${PHASE_COLORS[phase]})` }}
            />
          </div>
        </div>
      </div>

      {/* Rejection Banner */}
      {isRejected && !isApproved && (
        <div className="bg-destructive/10 border-b border-destructive/30">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-destructive text-sm">Phase Rejected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Rejected by <strong>{state.phaseRejections[phase].rejectedBy}</strong> on{" "}
                  {new Date(state.phaseRejections[phase].rejectedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="mt-2 p-3 bg-card rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Comments:</p>
                  <p className="text-sm text-foreground">{state.phaseRejections[phase].comments}</p>
                </div>
                <button
                  onClick={() => clearRejection(phase)}
                  className="mt-3 text-xs font-semibold text-primary hover:underline"
                >
                  Dismiss & Address Issues
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {sections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No applicable items for this phase.</p>
            {!isApproved && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="px-6 py-3 rounded-lg bg-success text-success-foreground font-bold"
                >
                  Approve & Continue
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-6 py-3 rounded-lg bg-destructive text-destructive-foreground font-bold"
                >
                  Reject
                </button>
              </div>
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
            <div className="flex items-center gap-3">
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
              {allChecked && (
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                >
                  Reject Phase
                </button>
              )}
            </div>
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
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent mb-4"
              autoFocus
            />
            <label className="block text-sm font-semibold text-foreground mb-2">
              Approval PIN
            </label>
            <input
              type="password"
              value={approvalPin}
              onChange={(e) => { setApprovalPin(e.target.value.replace(/\D/g, '').slice(0, 8)); setPinError(""); }}
              placeholder="Enter your PIN..."
              maxLength={8}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent"
            />
            {pinError && showApprovalModal && <p className="text-destructive text-sm mt-2">{pinError}</p>}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowApprovalModal(false); setPinError(""); setApprovalPin(""); }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-muted text-muted-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={!approverName.trim() || !approvalPin.trim()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold transition-all ${
                  approverName.trim() && approvalPin.trim()
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

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-bold text-card-foreground">
                Reject Phase
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Rejecting <strong>{phase}</strong> will send the checklist back to the submitter with your comments explaining why.
            </p>
            <label className="block text-sm font-semibold text-foreground mb-2">
              EHS Manager Name
            </label>
            <input
              type="text"
              value={rejecterName}
              onChange={(e) => setRejecterName(e.target.value)}
              placeholder="Enter your full name..."
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent mb-4"
              autoFocus
            />
            <label className="block text-sm font-semibold text-foreground mb-2">
              Reason for Rejection
            </label>
            <textarea
              value={rejectComments}
              onChange={(e) => setRejectComments(e.target.value)}
              placeholder="Explain why this phase cannot be approved..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent resize-none mb-4"
            />
            <label className="block text-sm font-semibold text-foreground mb-2">
              Approval PIN
            </label>
            <input
              type="password"
              value={rejectPin}
              onChange={(e) => { setRejectPin(e.target.value.replace(/\D/g, '').slice(0, 8)); setPinError(""); }}
              placeholder="Enter your PIN..."
              maxLength={8}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent"
            />
            {pinError && showRejectModal && <p className="text-destructive text-sm mt-2">{pinError}</p>}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejecterName("");
                  setRejectComments("");
                  setRejectPin("");
                  setPinError("");
                }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-muted text-muted-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejecterName.trim() || !rejectComments.trim() || !rejectPin.trim()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold transition-all ${
                  rejecterName.trim() && rejectComments.trim() && rejectPin.trim()
                    ? "bg-destructive text-destructive-foreground shadow-md hover:brightness-110"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Reject Phase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseChecklist;
