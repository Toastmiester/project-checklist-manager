// EHS Checklist Data Model

export interface InputQuestion {
  id: string;
  text: string;
  triggeredSections: string[];
}

export interface ChecklistItem {
  category: string;
  phase: Phase;
  text: string;
  sortOrder: number;
}

export type Phase =
  | "Design Review"
  | "Demolition-Construction"
  | "Before Energizing"
  | "Before Production Testing"
  | "Before Mass Production";

export const PHASES: Phase[] = [
  "Design Review",
  "Demolition-Construction",
  "Before Energizing",
  "Before Production Testing",
  "Before Mass Production",
];

export const INPUT_QUESTIONS: InputQuestion[] = [
  { id: "q1", text: "Will this equipment have permanently connected energy sources (electric, water, gas, etc.)?", triggeredSections: ["I. Lockout Tagout"] },
  { id: "q2", text: "Will this equipment have moving parts, temperature extremes, electrical energy present, etc. that need guarding?", triggeredSections: ["II. Machine Guarding"] },
  { id: "q3", text: "Will this equipment have an electrical power supply?", triggeredSections: ["III. Electrical"] },
  { id: "q4", text: "During installation, Operation, or Maintenance will there be work required above 36\" from floor without a lift?", triggeredSections: ["IV. Fall Protection"] },
  { id: "q5", text: "Will this equipment be installed near a pedestrian or fork truck aisleway?", triggeredSections: ["V.A. Vehicular Traffic"] },
  { id: "q6", text: "Will this equipment require the use of a powered industrial truck or lift?", triggeredSections: ["V.B. Fork Trucks / Lifts"] },
  { id: "q7", text: "Will this equipment have any type of crane?", triggeredSections: ["V.C. Overhead Cranes and Hoists"] },
  { id: "q8", text: "Will this crane be a radio controlled crane?", triggeredSections: ["V.D. Radio Frequency Cranes"] },
  { id: "q9", text: "Will this project create or use confined space?", triggeredSections: ["VI. Confined Space"] },
  { id: "q10", text: "Will this project contain equipment which can produce noise?", triggeredSections: ["VII.A. Noise"] },
  { id: "q11", text: "Will there be an operator for the equipment?", triggeredSections: ["VII.B. Ergonomics"] },
  { id: "q12", text: "Will this process use any chemicals?", triggeredSections: ["VII.C. Hazardous Chemicals"] },
  { id: "q13", text: "Will this process use externally supplied water?", triggeredSections: ["VIII.A1. City Water Usage"] },
  { id: "q14", text: "Will this process use recirculated water?", triggeredSections: ["VIII.A2. Recirculated Water Usage"] },
  { id: "q15", text: "Will this project generate demolition or construction waste?", triggeredSections: ["VIII.B1. Demolition / Construction Waste"] },
  { id: "q16", text: "Will this process generate nonhazardous waste?", triggeredSections: ["VIII.B2. Non-hazardous Waste"] },
  { id: "q17", text: "Will this process generate hazardous waste?", triggeredSections: ["VIII.B3. Hazardous Waste"] },
  { id: "q18", text: "Will this process emit anything into the air (e.g. ink fumes)?", triggeredSections: ["VIII.C. Air Emissions"] },
  { id: "q19", text: "Will there be any storage tanks with a capacity of at least 250 gallons and more than 90% of the volume above ground?", triggeredSections: ["VIII.D. Above Ground Storage Tanks"] },
  { id: "q20", text: "Will the new equipment contain any combustion systems?", triggeredSections: ["IX. Combustion Systems"] },
  { id: "q21", text: "Will this project add or modify equipment on the plant floor?", triggeredSections: ["X. Fire Prevention"] },
  { id: "q22", text: "Will this project add or modify a process that will use an operator?", triggeredSections: ["XI. PPE", "XII. Controls and Displays", "XIII. Procedures"] },
  { id: "q23", text: "Will this project involve any radioactive sources?", triggeredSections: ["XIV.A. Radioactive Sources"] },
  { id: "q24", text: "Will this project involve any lasers?", triggeredSections: ["XIV.B. Lasers"] },
  { id: "q25", text: "Will there be external contractors involved in the project?", triggeredSections: ["XV. High Risk Contractors"] },
  { id: "q26", text: "Will maintenance be responsible for maintaining equipment?", triggeredSections: ["XVI. Documentation"] },
];

// XIV. General C. Miscellaneous is ALWAYS included (not tied to a question)
export const ALWAYS_ACTIVE_SECTIONS = ["XIV.C. Miscellaneous"];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // I. Lockout Tagout
  { category: "I. Lockout Tagout", phase: "Design Review", text: "Ensure the potential for stored energy is minimized.", sortOrder: 1 },
  { category: "I. Lockout Tagout", phase: "Design Review", text: "Identify all energy sources and confirm that there is a method to lock them out.", sortOrder: 2 },
  { category: "I. Lockout Tagout", phase: "Design Review", text: "Ensure layout design makes all lockout points accessible.", sortOrder: 3 },
  { category: "I. Lockout Tagout", phase: "Design Review", text: "Ensure the design isolation points accept a lock.", sortOrder: 4 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure lockout points are easily accessible and electrical disconnects can be thrown from the side.", sortOrder: 1 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure isolation points accept a lock.", sortOrder: 2 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure energy isolation points are labeled.", sortOrder: 3 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure methods to verify de-energized state of all isolation sources are identified (e.g. absence of voltage sensor).", sortOrder: 4 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure piping is protected and appropriately labeled as needed.", sortOrder: 5 },
  { category: "I. Lockout Tagout", phase: "Before Energizing", text: "Ensure piping is protected and appropriately labeled as required.", sortOrder: 6 },
  { category: "I. Lockout Tagout", phase: "Before Production Testing", text: "Ensure Isolation point drawing is posted.", sortOrder: 1 },
  { category: "I. Lockout Tagout", phase: "Before Mass Production", text: "Ensure task specific lock out tag out procedure is developed and issued.", sortOrder: 1 },

  // II. Machine Guarding
  { category: "II. Machine Guarding", phase: "Design Review", text: "Identify guarding hazards.", sortOrder: 1 },
  { category: "II. Machine Guarding", phase: "Design Review", text: "If operators must enter fenced area, safety relays must be used.", sortOrder: 2 },
  { category: "II. Machine Guarding", phase: "Design Review", text: "Identify what signs and warning labels are required.", sortOrder: 3 },
  { category: "II. Machine Guarding", phase: "Design Review", text: "Identify any potential hot surfaces/piping that needs to be protected/guarded/identified/labeled.", sortOrder: 4 },
  { category: "II. Machine Guarding", phase: "Before Energizing", text: "Ensure adequate guarding is installed and meets the performance standard and meets AUTO (Around, Under, Through, and Over).", sortOrder: 1 },
  { category: "II. Machine Guarding", phase: "Before Energizing", text: "Ensure guards are not easily removable w/o tools.", sortOrder: 2 },
  { category: "II. Machine Guarding", phase: "Before Energizing", text: "Is potentially hot surfaces/piping protected/guarded/identified (labeled)?", sortOrder: 3 },
  { category: "II. Machine Guarding", phase: "Before Production Testing", text: "Ensure proper operation of all safety presence sensing devices.", sortOrder: 1 },
  { category: "II. Machine Guarding", phase: "Before Production Testing", text: "Have the signs and labels been provided and placed as needed.", sortOrder: 2 },

  // III. Electrical
  { category: "III. Electrical", phase: "Design Review", text: "Ensure design leaves minimum of 36\" clearance for electrical panels.", sortOrder: 1 },
  { category: "III. Electrical", phase: "Design Review", text: "Ensure design location and number of receptacles to eliminate permanent extension cords.", sortOrder: 2 },
  { category: "III. Electrical", phase: "Design Review", text: "Ensure GFCIs are provided where receptacles are installed in wet locations.", sortOrder: 3 },
  { category: "III. Electrical", phase: "Design Review", text: "Ensure equipment meets requirements if installed in classified/restricted location.", sortOrder: 4 },
  { category: "III. Electrical", phase: "Design Review", text: "If voltage is > 600V, review High Voltage for additional requirements.", sortOrder: 5 },
  { category: "III. Electrical", phase: "Design Review", text: "Ensure design considers electrical usage efficiency.", sortOrder: 6 },
  { category: "III. Electrical", phase: "Design Review", text: "Consider installation of electrical energy metering.", sortOrder: 7 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Check to make sure the electrical installation meets NEC, NFPA, & OSHA requirements.", sortOrder: 1 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Ensure installation leaves minimum of 36\" clearance for electrical panels (42\" where applicable).", sortOrder: 2 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Check to make sure that all electrical panels are properly labeled (voltage, fed from, Arc Flash Rating and PPE level where applicable).", sortOrder: 3 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Check to make sure that the equipment is properly grounded (all panels and equipment).", sortOrder: 4 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Ensure GFCI's are provided where receptacles are installed in wet locations.", sortOrder: 5 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Ensure equipment meets requirements if installed in classified location.", sortOrder: 6 },
  { category: "III. Electrical", phase: "Before Energizing", text: "Coordinate energy metering installation and verify monitoring is working.", sortOrder: 7 },

  // IV. Fall Protection
  { category: "IV. Fall Protection", phase: "Design Review", text: "Ensure design minimizes or eliminates need to access heights.", sortOrder: 1 },
  { category: "IV. Fall Protection", phase: "Design Review", text: "Ensure design has tie off locations and/or anchorage points when needed above equipment.", sortOrder: 2 },
  { category: "IV. Fall Protection", phase: "Design Review", text: "Ensure working surfaces posing a fall are protected with guardrails, gates and ladders.", sortOrder: 3 },
  { category: "IV. Fall Protection", phase: "Design Review", text: "Ensure design has retractable reels for cords and hoses.", sortOrder: 4 },
  { category: "IV. Fall Protection", phase: "Design Review", text: "Ensure rail, ladder and stairs designs meet standards (federal, state, local).", sortOrder: 5 },
  { category: "IV. Fall Protection", phase: "Demolition-Construction", text: "Ensure roof plan is complete for any jobs on roof.", sortOrder: 1 },
  { category: "IV. Fall Protection", phase: "Demolition-Construction", text: "Ensure open floor holes are properly protected or plan to be protected when created.", sortOrder: 2 },
  { category: "IV. Fall Protection", phase: "Before Energizing", text: "Ensure tie off/anchorage locations are completed.", sortOrder: 1 },
  { category: "IV. Fall Protection", phase: "Before Energizing", text: "Ensure working surfaces posing a fall are protected with guardrails, gates, and ladders.", sortOrder: 2 },
  { category: "IV. Fall Protection", phase: "Before Energizing", text: "Ensure Rail, ladder and stairs meet OSHA standards.", sortOrder: 3 },
  { category: "IV. Fall Protection", phase: "Before Energizing", text: "Ensure Trip/Slip hazards have been identified and eliminated.", sortOrder: 4 },
  { category: "IV. Fall Protection", phase: "Before Energizing", text: "Ensure retractable reels have been provided for cords and hoses.", sortOrder: 5 },

  // V.A. Vehicular Traffic
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure design location does not increase pedestrian and vehicle interface.", sortOrder: 1 },
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure design has physical segregation provided for associates and vehicles.", sortOrder: 2 },
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure walkways will be clear of vehicular traffic and protected from other hazards.", sortOrder: 3 },
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure operators will not have to work adjacent to aisleways.", sortOrder: 4 },
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure layout does not create blind spots.", sortOrder: 5 },
  { category: "V.A. Vehicular Traffic", phase: "Design Review", text: "Ensure design takes into account any new Stop signs.", sortOrder: 6 },
  { category: "V.A. Vehicular Traffic", phase: "Before Energizing", text: "Ensure physical segregation between associate workstations and aisleways.", sortOrder: 1 },
  { category: "V.A. Vehicular Traffic", phase: "Before Energizing", text: "Ensure walkways are clear of vehicular traffic and protected from other hazards.", sortOrder: 2 },
  { category: "V.A. Vehicular Traffic", phase: "Before Energizing", text: "Ensure walkways and traffic patterns are marked.", sortOrder: 3 },
  { category: "V.A. Vehicular Traffic", phase: "Before Production Testing", text: "Ensure location does not increase pedestrian and vehicle interface.", sortOrder: 1 },
  { category: "V.A. Vehicular Traffic", phase: "Before Production Testing", text: "Ensure operators stations are not located adjacent to aisle ways.", sortOrder: 2 },
  { category: "V.A. Vehicular Traffic", phase: "Before Production Testing", text: "Ensure no blind spots been created.", sortOrder: 3 },
  { category: "V.A. Vehicular Traffic", phase: "Before Production Testing", text: "Ensure stop signs and other visuals provided as needed.", sortOrder: 4 },

  // V.B. Fork Trucks / Lifts
  { category: "V.B. Fork Trucks / Lifts", phase: "Design Review", text: "Ensure new equipment will meet AANA forklift standards and local requirements.", sortOrder: 1 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Design Review", text: "Ensure training plan for operators is in place or will be developed.", sortOrder: 2 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Design Review", text: "Ensure any vehicles provided will be appropriately sized.", sortOrder: 3 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Before Production Testing", text: "Ensure new equipment meets AGC and local specifications.", sortOrder: 1 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Before Production Testing", text: "Ensure preop provided for any new vehicles.", sortOrder: 2 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Before Production Testing", text: "Ensure new vehicles are appropriately sized and have the capacity for the job.", sortOrder: 3 },
  { category: "V.B. Fork Trucks / Lifts", phase: "Before Mass Production", text: "Develop list of associates medically cleared and trained before operating equipment.", sortOrder: 1 },

  // V.C. Overhead Cranes and Hoists
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure position of crane in layout to have minimal envelope interference with equipment.", sortOrder: 1 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "If a crane spotter is required, prepare training on proper signals.", sortOrder: 2 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Design equipment layout for maximum operator visibility (walkways, PCs, etc.).", sortOrder: 3 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure design provides ample room for operators to work free of crane hazards.", sortOrder: 4 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Verify design location of pendant buttons meet federal and state standards.", sortOrder: 5 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure fail safe trolley and bridge brakes have been provided for pendant operated cranes.", sortOrder: 6 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure hoist and crane load capacity exceeds expected loads.", sortOrder: 7 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure a mainline contactor and E-stop circuit are provided when crane/hoist are powered in three (3) directions.", sortOrder: 8 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Ensure design slings and chains have been identified and will be certified.", sortOrder: 9 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Design Review", text: "Develop a method of operator retrieval, if necessary.", sortOrder: 10 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "If a crane spotter is required are they trained with the latest signals.", sortOrder: 1 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure ample room is provided for operators to work in area free of crane hazards.", sortOrder: 2 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure pendant buttons located and labeled per Federal and State standards.", sortOrder: 3 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure crane/hoist load limits been posted and are clearly visible.", sortOrder: 4 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure fail safe trolley and bridge brakes been provided for pendant operated cranes.", sortOrder: 5 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure fail safe hoist brakes been provided.", sortOrder: 6 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure slings & chains been identified and certified.", sortOrder: 7 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure crane/hoist certifications have been provided.", sortOrder: 8 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure crane \"in use\" signal clearly identified and visible.", sortOrder: 9 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure a method of operator retrieval has been developed if necessary.", sortOrder: 10 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Energizing", text: "Ensure a mainline contactor and E-stop circuit provided when hoist is powered in 3 directions.", sortOrder: 11 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Production Testing", text: "Ensure load tests been conducted and documented.", sortOrder: 1 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Production Testing", text: "Ensure overtravel limits have been tested.", sortOrder: 2 },
  { category: "V.C. Overhead Cranes and Hoists", phase: "Before Production Testing", text: "Verify preoperational procedure is provided.", sortOrder: 3 },

  // V.D. Radio Frequency Cranes
  { category: "V.D. Radio Frequency Cranes", phase: "Design Review", text: "Ensure frequency of crane is unique to the crane.", sortOrder: 1 },
  { category: "V.D. Radio Frequency Cranes", phase: "Design Review", text: "Verify whether FCC license is needed.", sortOrder: 2 },
  { category: "V.D. Radio Frequency Cranes", phase: "Design Review", text: "Ensure failsafe trolley and bridge brakes will be provided. Do they set/reset when remote power or signals are lost?", sortOrder: 3 },
  { category: "V.D. Radio Frequency Cranes", phase: "Design Review", text: "Design operable range of remote to be as small as possible.", sortOrder: 4 },
  { category: "V.D. Radio Frequency Cranes", phase: "Design Review", text: "Develop plan for training and medically clearing operators.", sortOrder: 5 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Energizing", text: "Ensure FCC license is obtained if needed.", sortOrder: 1 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Energizing", text: "Ensure controls on remote box are labeled.", sortOrder: 2 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Energizing", text: "Ensure the remote box has been identified for the crane it controls.", sortOrder: 3 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Energizing", text: "Ensure failsafe trolley and bridge brakes are provided. Do they set when remote power or signals are lost?", sortOrder: 4 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Energizing", text: "Ensure a pre-op been provided.", sortOrder: 5 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Production Testing", text: "Ensure load tests been conducted and documented.", sortOrder: 1 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Production Testing", text: "Ensure procedure completed for prestart warnings.", sortOrder: 2 },
  { category: "V.D. Radio Frequency Cranes", phase: "Before Mass Production", text: "Ensure operators been trained and medically cleared.", sortOrder: 1 },

  // VI. Confined Space
  { category: "VI. Confined Space", phase: "Design Review", text: "Ensure design has minimized or eliminated confined spaces.", sortOrder: 1 },
  { category: "VI. Confined Space", phase: "Demolition-Construction", text: "Confirm existing confined space entry points identified and marked.", sortOrder: 1 },
  { category: "VI. Confined Space", phase: "Demolition-Construction", text: "Complete space assessment, entry procedure, and procedure for existing confined spaces.", sortOrder: 2 },
  { category: "VI. Confined Space", phase: "Demolition-Construction", text: "Confirm appropriate confined space training for associates and contractors involved in project has been completed for existing confined spaces.", sortOrder: 3 },
  { category: "VI. Confined Space", phase: "Demolition-Construction", text: "Ensure safety required equipment is calibrated and training has been provided.", sortOrder: 4 },
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Confirm any new confined space entry points are identified and marked.", sortOrder: 1 },
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Complete space assessment, entry procedure, and procedure for new confined spaces.", sortOrder: 2 },
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Confirm appropriate confined space training for associates and contractors involved in project has been completed for new confined spaces.", sortOrder: 3 },
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Ensure outside rescue team been notified of new hazards in this space.", sortOrder: 4 },
  // Removed: "Ensure outside rescue team training been completed." (item #5070)
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Confirm safety required equipment has been calibrated and training provided.", sortOrder: 5 },
  { category: "VI. Confined Space", phase: "Before Energizing", text: "Confirm any new anticipated atmospheric conditions have been identified.", sortOrder: 6 },

  // VII.A. Noise
  { category: "VII.A. Noise", phase: "Design Review", text: "Ensure the potential for noise been considered and EHS has been contacted for guidance.", sortOrder: 1 },
  { category: "VII.A. Noise", phase: "Design Review", text: "Ensure that new equipment meets the 80 dBA requirement and has been communicated to vendors through equipment design specifications or other documents.", sortOrder: 2 },
  { category: "VII.A. Noise", phase: "Design Review", text: "Identify other opportunities to reduce noise and consider location of equipment, enclosures, barriers, dampening materials, etc.", sortOrder: 3 },
  { category: "VII.A. Noise", phase: "Demolition-Construction", text: "Complete pre-installation background noise surveys and document in the project file.", sortOrder: 1 },
  { category: "VII.A. Noise", phase: "Before Production Testing", text: "Conduct post installation background noise surveys during equipment start-up and ensure no increase in background noise levels from pre-installation survey.", sortOrder: 1 },
  { category: "VII.A. Noise", phase: "Before Production Testing", text: "If equipment installation has increased background levels from pre-installation survey, develop an action plan listing methods to further reduce noise levels, SPAs and target dates.", sortOrder: 2 },
  { category: "VII.A. Noise", phase: "Before Mass Production", text: "If equipment installation has increased background levels from pre-installation survey, confirm action plan is in place to reduce to pre-installation levels.", sortOrder: 1 },

  // VII.B. Ergonomics
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Identify tasks and workstations with ergonomic risks.", sortOrder: 1 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure workstations and tasks have been designed to minimize or eliminate need for pushing, pulling, lifting, bending, twisting, reaching, carrying, dragging, stooping, etc.", sortOrder: 2 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure work and workstations have been designed to minimize excessive walking.", sortOrder: 3 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure design eliminates manual lifts of materials, products, tools, etc. from floor level.", sortOrder: 4 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure the design for workstations has adjustable heights if needed (i.e., lift tables needed).", sortOrder: 5 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Consider tool storage for operation (i.e., shadow boards, shelving, etc.).", sortOrder: 6 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure anticipated tool changes, set-ups and maintenance activity be performed without awkward body postures.", sortOrder: 7 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure design has minimized, reduced or automated repetitive tasks.", sortOrder: 8 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure adequate lighting and ventilation for operators in design.", sortOrder: 9 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure design of controls and displays located with human factors in mind (i.e.: position of E-stops) and size of pendant control boxes.", sortOrder: 10 },
  { category: "VII.B. Ergonomics", phase: "Design Review", text: "Ensure design has supplied tool balancers where needed.", sortOrder: 11 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Ensure workstations have been built to minimize or eliminate need for pushing, pulling, lifting, bending, twisting, reaching, carrying, dragging, stooping, etc.", sortOrder: 1 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Ensure workstations have been laid out to minimize excessive walking.", sortOrder: 2 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Verify lifts of materials, products, tools, etc. from floor level been eliminated.", sortOrder: 3 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Verify workstations have adjustable heights if needed.", sortOrder: 4 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Check to make sure good tool storage has been provided.", sortOrder: 5 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Ensure proper lighting and ventilation has been provided for operators.", sortOrder: 6 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Verify controls and displays located with human factors in mind (i.e.: position of E-stops) and size of pendant control boxes.", sortOrder: 7 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Ensure the weight of hand tools been minimized through tool balancers, etc.", sortOrder: 8 },
  { category: "VII.B. Ergonomics", phase: "Before Production Testing", text: "Ensure hand tools allow for neutral wrist position.", sortOrder: 9 },

  // VII.C. Hazardous Chemicals
  { category: "VII.C. Hazardous Chemicals", phase: "Design Review", text: "Ensure SDS for new chemicals been approved by EHS department before chemical is brought onto plant property.", sortOrder: 1 },
  { category: "VII.C. Hazardous Chemicals", phase: "Design Review", text: "Ensure the least hazardous chemical been selected for the job.", sortOrder: 2 },
  { category: "VII.C. Hazardous Chemicals", phase: "Design Review", text: "Check to see if eyewash/safety showers need to be provided.", sortOrder: 3 },
  { category: "VII.C. Hazardous Chemicals", phase: "Design Review", text: "Check to see if exposure assessment will need to be performed because of new chemicals or changes in the process.", sortOrder: 4 },
  { category: "VII.C. Hazardous Chemicals", phase: "Design Review", text: "Consult with EHS to determine if an exposure assessment will be required.", sortOrder: 5 },
  { category: "VII.C. Hazardous Chemicals", phase: "Before Energizing", text: "Has the new exposure assessment been performed because of new chemicals or changes in the process.", sortOrder: 1 },
  { category: "VII.C. Hazardous Chemicals", phase: "Before Production Testing", text: "Ensure MSDS is on file for any chemicals used in process.", sortOrder: 1 },
  { category: "VII.C. Hazardous Chemicals", phase: "Before Production Testing", text: "Ensure chemical containers have proper labels.", sortOrder: 2 },
  { category: "VII.C. Hazardous Chemicals", phase: "Before Production Testing", text: "Ensure employee training provided for new chemical hazards.", sortOrder: 3 },
  { category: "VII.C. Hazardous Chemicals", phase: "Before Production Testing", text: "Ensure eyewash/safety showers provided and identified if needed.", sortOrder: 4 },
  // Removed: "Ensure exposure assessment has been performed..." (item #6020)

  // VIII.A1. City Water Usage
  { category: "VIII.A1. City Water Usage", phase: "Design Review", text: "Ensure design includes backflow prevention.", sortOrder: 1 },
  { category: "VIII.A1. City Water Usage", phase: "Design Review", text: "Check with environmental department for potential wastewater permitting issues.", sortOrder: 2 },
  { category: "VIII.A1. City Water Usage", phase: "Design Review", text: "Will any materials be added that have a reportable quantity (RQ)? Will any changes be made in the way we store existing materials that have a reportable quantity?", sortOrder: 3 },
  { category: "VIII.A1. City Water Usage", phase: "Design Review", text: "Consult with EHS for potential wastewater permitting issues.", sortOrder: 4 },
  { category: "VIII.A1. City Water Usage", phase: "Before Energizing", text: "Ensure back flow prevention has been installed.", sortOrder: 1 },
  { category: "VIII.A1. City Water Usage", phase: "Before Energizing", text: "Verify wastewater permitting issues been addressed.", sortOrder: 2 },
  { category: "VIII.A1. City Water Usage", phase: "Before Energizing", text: "If any material has a reportable quantity verify the Material Storage Inventory in the RPCC Plan has been updated appropriately.", sortOrder: 3 },

  // VIII.A2. Recirculated Water Usage
  { category: "VIII.A2. Recirculated Water Usage", phase: "Design Review", text: "Ensure design includes backflow prevention.", sortOrder: 1 },
  { category: "VIII.A2. Recirculated Water Usage", phase: "Design Review", text: "Ensure water reuse/recycling been examined to minimize water consumption and wastewater volume.", sortOrder: 2 },
  { category: "VIII.A2. Recirculated Water Usage", phase: "Design Review", text: "Estimate the wastewater, including contact cooling water, will be discharged, has the quantity and mode of discharge.", sortOrder: 3 },
  { category: "VIII.A2. Recirculated Water Usage", phase: "Design Review", text: "If NCCW will be generated, estimate the quantity and mode of discharge.", sortOrder: 4 },
  { category: "VIII.A2. Recirculated Water Usage", phase: "Before Energizing", text: "Ensure back flow prevention has been installed.", sortOrder: 1 },

  // VIII.B1. Demolition / Construction Waste
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Design Review", text: "For construction/demolition waste identify the type of material, estimated volume and weight, date material will be generated, and date material will be disposed of.", sortOrder: 1 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Design Review", text: "Ensure disposal/recycling costs for C/D waste been accounted for.", sortOrder: 2 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Design Review", text: "Check to ensure asbestos or refractory ceramic fibers involved in the process.", sortOrder: 3 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Design Review", text: "Ensure no lead based paint have been used in the existing equipment.", sortOrder: 4 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Design Review", text: "Determine if lead-based paint has been used.", sortOrder: 5 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Demolition-Construction", text: "Ensure arrangements been made to dispose/recycle/reuse construction/demolition waste.", sortOrder: 1 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Demolition-Construction", text: "If asbestos in existing equipment ensure proper disposal plan is in place.", sortOrder: 2 },
  { category: "VIII.B1. Demolition / Construction Waste", phase: "Demolition-Construction", text: "If lead based paint is present ensure proper disposal plan in place.", sortOrder: 3 },

  // VIII.B2. Non-hazardous Waste
  { category: "VIII.B2. Non-hazardous Waste", phase: "Design Review", text: "Estimate waste generation rate and pollutants.", sortOrder: 1 },
  { category: "VIII.B2. Non-hazardous Waste", phase: "Design Review", text: "Look for ways to minimize purchased quantities of materials.", sortOrder: 2 },
  { category: "VIII.B2. Non-hazardous Waste", phase: "Design Review", text: "Look for ways to reuse/recycle materials instead of dispose.", sortOrder: 3 },
  { category: "VIII.B2. Non-hazardous Waste", phase: "Design Review", text: "Has the waste minimization team been notified and is there a plan in place to eliminate landfilled waste?", sortOrder: 4 },

  // VIII.B3. Hazardous Waste
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Substitute or redesign process to reduce amount or toxicity of waste.", sortOrder: 1 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Identify and characterize hazardous wastes associated with this project.", sortOrder: 2 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Check to see if the material is a DOT hazardous material.", sortOrder: 3 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "If the material is a DOT hazardous material have the EHS Department determine the material's applicability to the DOT Security Plan.", sortOrder: 4 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Are there any changes to the design, construction, operation or maintenance of the facility which increases the potential of security risk during transportation of materials?", sortOrder: 5 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Contact environmental department with new hazardous materials that will be introduced.", sortOrder: 6 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Develop plan for waste segregation needed to eliminate potentially hazardous reactions if needed.", sortOrder: 7 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Does the process involve any form of onsite waste treatment?", sortOrder: 8 },
  { category: "VIII.B3. Hazardous Waste", phase: "Design Review", text: "Will there be PCB's introduced by the project?", sortOrder: 9 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Energizing", text: "If the material is a DOT hazardous material verify the Hazmat Security Plan has been updated.", sortOrder: 1 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Energizing", text: "PCB Considerations - Was equipment tested for PCBs?", sortOrder: 2 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Energizing", text: "If tested, indicate date.", sortOrder: 3 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Energizing", text: "Does the equipment contain PCBs?", sortOrder: 4 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Energizing", text: "Do any transformers, ballasts, or capacitors contain PCBs?", sortOrder: 5 },
  // Removed: "Are PCB items on the site-wide inventory?" (item #10,010)
  { category: "VIII.B3. Hazardous Waste", phase: "Before Production Testing", text: "Ensure a hazardous waste accumulation area or satellite area has been identified.", sortOrder: 1 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Production Testing", text: "Verify plan in place for waste segregation if needed.", sortOrder: 2 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Mass Production", text: "Verify employees are trained on the procedures established to properly dispose of the hazardous waste created by this process.", sortOrder: 1 },
  { category: "VIII.B3. Hazardous Waste", phase: "Before Mass Production", text: "Verify all employees managing these wastes and their immediate supervisor have received RCRA training within the past 12 months.", sortOrder: 2 },

  // VIII.C. Air Emissions
  { category: "VIII.C. Air Emissions", phase: "Design Review", text: "Identify potential air emissions from the process/project.", sortOrder: 1 },
  { category: "VIII.C. Air Emissions", phase: "Design Review", text: "Check to see if there will be a need for air pollution control equipment or air permit applications reviewed with the Environmental Department.", sortOrder: 2 },
  { category: "VIII.C. Air Emissions", phase: "Design Review", text: "Provide a process description to EHS that includes chemicals used / amount per piece and process flow diagram.", sortOrder: 3 },
  { category: "VIII.C. Air Emissions", phase: "Before Energizing", text: "Ensure that all air permit permits have been updated/received.", sortOrder: 1 },

  // VIII.D. Above Ground Storage Tanks
  { category: "VIII.D. Above Ground Storage Tanks", phase: "Design Review", text: "Will this tank contain a regulated substance?", sortOrder: 1 },
  { category: "VIII.D. Above Ground Storage Tanks", phase: "Before Energizing", text: "Verify a record of the leak test is on file and the tank passed the test.", sortOrder: 1 },
  { category: "VIII.D. Above Ground Storage Tanks", phase: "Before Energizing", text: "Verify that the tank has been registered with the state if necessary.", sortOrder: 2 },

  // IX. Combustion Systems
  { category: "IX. Combustion Systems", phase: "Design Review", text: "Ensure system is designed to current Federal and State standards.", sortOrder: 1 },
  { category: "IX. Combustion Systems", phase: "Before Energizing", text: "Ensure the insurance company review/approval been obtained.", sortOrder: 1 },
  { category: "IX. Combustion Systems", phase: "Before Energizing", text: "Ensure the manual valve been installed and tagged.", sortOrder: 2 },
  { category: "IX. Combustion Systems", phase: "Before Energizing", text: "Confirm the vent line is installed off the regulator.", sortOrder: 3 },
  { category: "IX. Combustion Systems", phase: "Before Energizing", text: "Verify the start-up and shutdown procedures been developed/posted.", sortOrder: 4 },
  { category: "IX. Combustion Systems", phase: "Before Production Testing", text: "Verify system operation of combustion system.", sortOrder: 1 },
  { category: "IX. Combustion Systems", phase: "Before Mass Production", text: "Training for associates has been completed and documented.", sortOrder: 1 },

  // X. Fire Prevention
  { category: "X. Fire Prevention", phase: "Design Review", text: "Check to see if additional fire extinguishers be needed (make sure to select correct type).", sortOrder: 1 },
  { category: "X. Fire Prevention", phase: "Design Review", text: "Check for requirements of fixed fire protection needed (contact Insurance company for guidance/review).", sortOrder: 2 },
  { category: "X. Fire Prevention", phase: "Design Review", text: "Design such that liquids with flash points above 100°F been provided where possible.", sortOrder: 3 },
  { category: "X. Fire Prevention", phase: "Design Review", text: "Ensure the layout provides clear evacuation routes.", sortOrder: 4 },
  { category: "X. Fire Prevention", phase: "Design Review", text: "If building occupancy will be increased contact the insurance company for review/guidance.", sortOrder: 5 },
  { category: "X. Fire Prevention", phase: "Design Review", text: "If a flammable or combustible liquids tank greater than 100 gallons in capacity will be installed, contact the insurance company.", sortOrder: 6 },
  { category: "X. Fire Prevention", phase: "Demolition-Construction", text: "Verify the Insurance company has reviewed installation of or modifications to fire protection systems or equipment.", sortOrder: 1 },
  { category: "X. Fire Prevention", phase: "Before Energizing", text: "Ensure new fire extinguishers been mounted, identified and added to monthly inspection list maintained by vendor.", sortOrder: 1 },
  { category: "X. Fire Prevention", phase: "Before Energizing", text: "Confirm containers are bonded and grounded when needed.", sortOrder: 2 },
  { category: "X. Fire Prevention", phase: "Before Energizing", text: "Ensure approved storage cabinets are provided for flammable storage and chemicals list for storage is complete if needed.", sortOrder: 3 },
  { category: "X. Fire Prevention", phase: "Before Production Testing", text: "Test and verify the fixed system.", sortOrder: 1 },
  { category: "X. Fire Prevention", phase: "Before Production Testing", text: "Ensure the proper disposal containers and containment materials are provided when needed.", sortOrder: 2 },

  // XI. PPE
  { category: "XI. PPE", phase: "Design Review", text: "Ensure proper PPE has been identified for the job.", sortOrder: 1 },
  { category: "XI. PPE", phase: "Before Energizing", text: "Ensure proper PPE has been provided for the job.", sortOrder: 1 },
  { category: "XI. PPE", phase: "Before Energizing", text: "Provide PPE training when needed.", sortOrder: 2 },
  { category: "XI. PPE", phase: "Before Energizing", text: "Verify PPE Hazard Assessment been updated.", sortOrder: 3 },

  // XII. Controls and Displays
  { category: "XII. Controls and Displays", phase: "Design Review", text: "Ensure design has controls accessible.", sortOrder: 1 },
  { category: "XII. Controls and Displays", phase: "Design Review", text: "Ensure E-stops are provided and in proper locations.", sortOrder: 2 },
  { category: "XII. Controls and Displays", phase: "Design Review", text: "Ensure design has controls and displays positioned so that operator maintains visual contact while operating.", sortOrder: 3 },
  { category: "XII. Controls and Displays", phase: "Design Review", text: "Ensure the cell layout is such that all drives can be accessed without bypassing safety devices.", sortOrder: 4 },
  { category: "XII. Controls and Displays", phase: "Before Energizing", text: "Ensure controls are all accessible and labels are readable.", sortOrder: 1 },
  { category: "XII. Controls and Displays", phase: "Before Energizing", text: "Ensure E-Stops are sufficient in number and are accessible for operators.", sortOrder: 2 },
  { category: "XII. Controls and Displays", phase: "Before Energizing", text: "Ensure the controls/displays been positioned so the operator maintains visual contact with operation when appropriate.", sortOrder: 3 },
  { category: "XII. Controls and Displays", phase: "Before Production Testing", text: "Ensure all controls and E-stops been functionally tested and operate properly.", sortOrder: 1 },
  { category: "XII. Controls and Displays", phase: "Before Production Testing", text: "Ensure fail safe controls provided as needed.", sortOrder: 2 },
  { category: "XII. Controls and Displays", phase: "Before Production Testing", text: "Has PLC logic been reviewed for needed control?", sortOrder: 3 },
  { category: "XII. Controls and Displays", phase: "Before Production Testing", text: "Have the levels of redundancy been provided as needed?", sortOrder: 4 },
  { category: "XII. Controls and Displays", phase: "Before Production Testing", text: "Have the limits, proximity switches, and other sensors been provided and tested as needed?", sortOrder: 5 },

  // XIII. Procedures
  { category: "XIII. Procedures", phase: "Design Review", text: "Determine Process Flow Diagram for Materials.", sortOrder: 1 },
  { category: "XIII. Procedures", phase: "Design Review", text: "Considered floor space and storage for raw materials and finished goods.", sortOrder: 2 },
  { category: "XIII. Procedures", phase: "Before Mass Production", text: "Ensure a standard operating procedure has been written for operation of equipment.", sortOrder: 1 },
  { category: "XIII. Procedures", phase: "Before Mass Production", text: "Ensure Safe Work Instructions been written or revised to reflect safety information.", sortOrder: 2 },
  { category: "XIII. Procedures", phase: "Before Mass Production", text: "Ensure appropriate training and/or retraining been conducted for operators.", sortOrder: 3 },

  // XIV.A. Radioactive Sources
  { category: "XIV.A. Radioactive Sources", phase: "Design Review", text: "Identify and provide controls for any radioactive sources (consult industrial hygiene).", sortOrder: 1 },
  { category: "XIV.A. Radioactive Sources", phase: "Before Energizing", text: "Has the radioactive sources been identified and controls been provided based on source (consult Industrial Hygiene)?", sortOrder: 1 },

  // XIV.B. Lasers
  { category: "XIV.B. Lasers", phase: "Design Review", text: "If lasers are to be used verify laser safety design with the laser safety officer.", sortOrder: 1 },
  { category: "XIV.B. Lasers", phase: "Before Energizing", text: "Verify the Laser Safety Officer has reviewed and authorized the process.", sortOrder: 1 },

  // XIV.C. Miscellaneous (always active)
  { category: "XIV.C. Miscellaneous", phase: "Design Review", text: "Check to ensure there is adequate clearance for the installation.", sortOrder: 1 },
  { category: "XIV.C. Miscellaneous", phase: "Design Review", text: "Plan for an adequate area to stage and un-stage equipment prior to installation.", sortOrder: 2 },
  { category: "XIV.C. Miscellaneous", phase: "Design Review", text: "Review HVAC/ventilation if necessary.", sortOrder: 3 },
  { category: "XIV.C. Miscellaneous", phase: "Design Review", text: "Check with Accounting on property tax implications as it relates to building and include in the RFA Justification.", sortOrder: 4 },
  { category: "XIV.C. Miscellaneous", phase: "Design Review", text: "Have the Best Practices been reviewed and evaluated for this project?", sortOrder: 5 },
  { category: "XIV.C. Miscellaneous", phase: "Demolition-Construction", text: "Ensure adequate clearance for the installation.", sortOrder: 1 },
  { category: "XIV.C. Miscellaneous", phase: "Demolition-Construction", text: "Ensure you have an adequate area to stage and un-stage equipment prior to installation.", sortOrder: 2 },
  { category: "XIV.C. Miscellaneous", phase: "Before Production Testing", text: "Ensure routing and bill of material has been updated.", sortOrder: 1 },

  // XV. High Risk Contractors
  { category: "XV. High Risk Contractors", phase: "Design Review", text: "Review Contractor Safety Program has been reviewed for requirements.", sortOrder: 1 },
  { category: "XV. High Risk Contractors", phase: "Design Review", text: "If major equipment or buildings are being installed, contact the insurance company for review/guidance.", sortOrder: 2 },
  { category: "XV. High Risk Contractors", phase: "Design Review", text: "Check if federal, state and local permits required (e.g. building permits).", sortOrder: 3 },
  // Removed all Demolition-Construction items for XV (items #16,070–17,010)

  // XVI. Documentation (renumbered from XVIII)
  { category: "XVI. Documentation", phase: "Before Production Testing", text: "Ensure we have a hard copy of all electrical drawings.", sortOrder: 1 },
  { category: "XVI. Documentation", phase: "Before Mass Production", text: "Ensure we have an electronic copy of all mechanical drawings.", sortOrder: 1 },
  { category: "XVI. Documentation", phase: "Before Mass Production", text: "Ensure we have an electronic copy of all electrical drawings.", sortOrder: 2 },
  { category: "XVI. Documentation", phase: "Before Mass Production", text: "Ensure we have a copy of all purchased part manuals.", sortOrder: 3 },
  { category: "XVI. Documentation", phase: "Before Mass Production", text: "Ensure we have a maintenance manual for the equipment.", sortOrder: 4 },
];

export function getFilteredChecklist(
  activeSections: string[],
  phase: Phase
): { category: string; items: ChecklistItem[] }[] {
  const allActive = [...activeSections, ...ALWAYS_ACTIVE_SECTIONS];
  const filtered = CHECKLIST_ITEMS.filter(
    (item) => item.phase === phase && allActive.includes(item.category)
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const grouped: Record<string, ChecklistItem[]> = {};
  for (const item of filtered) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  return Object.entries(grouped).map(([category, items]) => ({ category, items }));
}
