const fs = require('fs');
const path = require('path');

const filesToFix = [
  { path: 'src/components/interview/InterviewLobby.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/components/interview/InterviewReportCard.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/components/interview/InterviewWizard.tsx', replace: [
    [/import React[^;]*;\n?/, ''],
    [/(import type \{[^}]*)Phase[A-D]State,?\s?([^}]*\})/, '$1$2'] // simplified, better to just replace the whole line
  ] },
  { path: 'src/components/interview/PhaseARequirements.tsx', replace: [[/import React(,[^;]*)? from 'react';\n?/, "import$1 from 'react';\n"]] },
  { path: 'src/components/interview/PhaseCDeepDive.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/components/interview/PhaseDTradeoffs.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/pages/BlogPage.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/pages/BlogPostPage.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/pages/CommunityGalleryPage.tsx', replace: [
    [/import React, \{ useState, useEffect \} from 'react';/, "import { useState, useEffect } from 'react';"],
    [/import \{ NavLink, useNavigate \} from 'react-router-dom';/, "import { useNavigate } from 'react-router-dom';"]
  ] },
  { path: 'src/pages/ConceptsPage.tsx', replace: [[/Box,\s?/, '']] },
  { path: 'src/pages/DesignGallery.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/pages/InterviewPage.tsx', replace: [[/import React, \{ useState \} from 'react';/, "import { useState } from 'react';"]] },
  { path: 'src/pages/NotFoundPage.tsx', replace: [[/import React[^;]*;\n?/, '']] },
  { path: 'src/pages/ScenarioBuilderPage.tsx', replace: [
    [/ScenarioFormState, DAULevel, WorkloadType, ConsistencyType, BudgetLevel/, 'ScenarioFormState'],
    [/import \{ useSearchParams, useNavigate \} from 'react-router-dom';/, "import { useSearchParams } from 'react-router-dom';"],
    [/const navigate = useNavigate\(\);\n/, '']
  ] }
];

for (const file of filesToFix) {
  const fullPath = path.join(__dirname, file.path);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const [regex, replacement] of file.replace) {
      content = content.replace(regex, replacement);
    }
    fs.writeFileSync(fullPath, content);
    console.log('Fixed', file.path);
  } else {
    console.log('File not found', file.path);
  }
}
