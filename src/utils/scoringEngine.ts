import type { InterviewSessionState, ReportCard } from './interviewState';

export function generateReportCard(state: InterviewSessionState): ReportCard {
  let componentScore = 0;
  let connectionScore = 0;
  let deepDiveScore = 0;
  let timeScore = 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestedNextSteps: string[] = [];

  // 1. Component Coverage (Max 25)
  const nodeTypes = state.phaseB.nodes.map(n => n.data.type);
  const hasClient = nodeTypes.includes('client');
  const hasLB = nodeTypes.includes('loadBalancer');
  const hasServer = nodeTypes.includes('server');
  const hasDB = nodeTypes.includes('database');
  const hasCache = nodeTypes.includes('cache');

  if (hasClient) componentScore += 5;
  if (hasServer) componentScore += 5;
  if (hasDB) componentScore += 5;

  if (state.phaseA.dau === '1m' || state.phaseA.dau === '50m' || state.phaseA.dau === '500m') {
    if (hasLB) {
      componentScore += 5;
      strengths.push('Good use of Load Balancer for high scale.');
    } else {
      weaknesses.push('Missing Load Balancer for a high-traffic system.');
    }
  } else {
    componentScore += 5; // not strictly needed for 10k
  }

  if (state.phaseA.readWriteRatio === '100:1') {
    if (hasCache) {
      componentScore += 5;
      strengths.push('Proper caching layer included for read-heavy workload.');
    } else {
      weaknesses.push('Missing Cache in a read-heavy system. Database will likely crash.');
    }
  } else {
    componentScore += 5;
  }

  // 2. Connection Logic (Max 25)
  if (state.phaseB.edges.length > 0) connectionScore += 10;
  
  // Check for bad connections (e.g. client direct to DB)
  const clientToDB = state.phaseB.edges.some(e => {
    const sourceNode = state.phaseB.nodes.find(n => n.id === e.source);
    const targetNode = state.phaseB.nodes.find(n => n.id === e.target);
    return sourceNode?.data.type === 'client' && targetNode?.data.type === 'database';
  });

  if (clientToDB) {
    weaknesses.push('Security Risk: Client connects directly to Database.');
  } else {
    connectionScore += 15;
  }

  // 3. Deep Dive (Max 25)
  const answerCount = Object.keys(state.phaseC.answers).filter(k => state.phaseC.answers[k].length > 10).length;
  deepDiveScore = Math.min(25, answerCount * 8.5);
  
  if (answerCount < 3) {
    weaknesses.push('Incomplete deep dive answers.');
  } else {
    strengths.push('Answered all deep dive questions thoroughly.');
  }

  // Tradeoffs checking
  if (state.phaseD.bottleneckId && state.phaseD.mitigationId) {
    deepDiveScore = Math.min(25, deepDiveScore + 5);
  }

  // 4. Time Management (Max 25)
  const timeLimitSecs = state.lobby.timeLimitMinutes * 60;
  const timeSpent = state.timeSpentSeconds;
  
  if (timeSpent < timeLimitSecs * 0.8) {
    timeScore = 25;
    strengths.push('Excellent time management.');
  } else if (timeSpent <= timeLimitSecs) {
    timeScore = 20;
  } else {
    timeScore = 10; // Penalty
    weaknesses.push('Exceeded time limit.');
  }

  // Total
  const totalScore = Math.min(100, componentScore + connectionScore + deepDiveScore + timeScore);
  
  let grade = 'C';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';

  if (!hasCache) suggestedNextSteps.push('Review: Caching Strategies (/concepts/caching)');
  if (!hasLB) suggestedNextSteps.push('Review: Load Balancing (/concepts/load-balancing)');

  return {
    componentCoverageScore: componentScore,
    connectionLogicScore: connectionScore,
    deepDiveScore: deepDiveScore,
    timeManagementScore: timeScore,
    totalScore,
    grade,
    strengths,
    weaknesses,
    suggestedNextSteps
  };
}
