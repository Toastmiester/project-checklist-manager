import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEHS } from "@/context/EHSContext";
import { INPUT_QUESTIONS } from "@/data/ehsChecklistData";
import { Shield, ClipboardCheck, Eye, EyeOff } from "lucide-react";
import agcLogo from "@/assets/AGC-Logo-Emblem.png";

const ProjectSetup = () => {
  const { state, setProjectTitle, setProjectLeadName, setProjectLeadEmail, setEhsApproverName, setEhsApproverEmail, setEhsApproverPin, setAnswer, createChecklist } = useEHS();
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleCreate = () => {
    if (!state.projectTitle.trim()) {
      setTitleError(true);
      return;
    }
    if (!state.ehsApproverPin || state.ehsApproverPin.length < 4) {
      setPinError(true);
      return;
    }
    const hasAnyYes = Object.values(state.answers).some((v) => v);
    if (!hasAnyYes) return;
    createChecklist();
    navigate("/checklist/0");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <img src={agcLogo} alt="AGC Logo" className="h-8 w-auto" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">EHS Project Checklist</h1>
              <p className="text-sm opacity-80">Environment, Health & Safety Compliance Tool</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Project Title */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={state.projectTitle}
            onChange={(e) => {
              setProjectTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="Enter project title..."
            className={`w-full px-4 py-3 rounded-lg border-2 bg-card text-card-foreground text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
              titleError ? "border-destructive" : "border-border focus:border-accent"
            }`}
          />
          {titleError && (
            <p className="text-destructive text-sm mt-1">Please enter a project title</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-bold text-foreground">Project Lead</h3>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
              <input
                type="text"
                value={state.projectLeadName}
                onChange={(e) => setProjectLeadName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
              <input
                type="email"
                value={state.projectLeadEmail}
                onChange={(e) => setProjectLeadEmail(e.target.value)}
                placeholder="Enter email..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="space-y-4 p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-bold text-foreground">EHS Approver</h3>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
              <input
                type="text"
                value={state.ehsApproverName}
                onChange={(e) => setEhsApproverName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
              <input
                type="email"
                value={state.ehsApproverEmail}
                onChange={(e) => setEhsApproverEmail(e.target.value)}
                placeholder="Enter email..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Approval PIN (min 4 digits)</label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={state.ehsApproverPin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 8);
                    setEhsApproverPin(val);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN..."
                  maxLength={8}
                  className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent pr-10 ${
                    pinError ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {pinError && <p className="text-destructive text-xs mt-1">PIN must be at least 4 digits</p>}
            </div>
          </div>
        </div>
        {/* Questions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Project Input Data
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Answer Yes or No for each question. Only applicable sections will be included in your checklist.
          </p>

          <div className="space-y-3">
            {INPUT_QUESTIONS.map((q, index) => (
              <div
                key={q.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="flex-1 text-sm text-card-foreground leading-relaxed">
                  {q.text}
                </p>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setAnswer(q.id, true)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                      state.answers[q.id] === true
                        ? "bg-success text-success-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAnswer(q.id, false)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                      state.answers[q.id] === false
                        ? "bg-destructive text-destructive-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="sticky bottom-0 bg-background py-4 border-t border-border">
          <button
            onClick={handleCreate}
            className="w-full py-4 rounded-lg bg-accent text-accent-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:brightness-110 active:scale-[0.99]"
          >
            Create Checklist
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProjectSetup;
