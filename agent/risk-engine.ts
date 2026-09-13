import type {
  AIDecision,
  CreditApplication,
  Evidence,
} from "@/lib/store/credit-store";

export function generateRiskDecision(
  evidence: Evidence,
  application: CreditApplication
): AIDecision {
  let score = 0;

  // Repayment history
  if (evidence.repaymentCount >= 8) {
    score += 30;
  } else if (evidence.repaymentCount >= 5) {
    score += 20;
  } else if (evidence.repaymentCount >= 2) {
    score += 10;
  }

  // Failed obligations
  if (evidence.failedObligations === 0) {
    score += 25;
  } else if (evidence.failedObligations === 1) {
    score += 10;
  } else {
    score -= 20;
  }

  // Collateral coverage
  const collateralRatio =
    application.requestedAmount > 0
      ? evidence.collateral / application.requestedAmount
      : 0;

  if (collateralRatio >= 1.5) {
    score += 20;
  } else if (collateralRatio >= 1) {
    score += 15;
  } else if (collateralRatio >= 0.5) {
    score += 5;
  } else {
    score -= 15;
  }

  // Financial activity
  if (evidence.activityDays >= 90) {
    score += 15;
  } else if (evidence.activityDays >= 30) {
    score += 10;
  } else if (evidence.activityDays >= 7) {
    score += 5;
  }

  // Evidence must be cryptographically verified before approval.
  if (!evidence.verified) {
    score = Math.min(score, 49);
  }

  const risk =
    score >= 80
      ? "LOW"
      : score >= 55
        ? "MEDIUM"
        : "HIGH";

  const confidence = Math.min(
    99,
    Math.max(50, score + 5)
  );

  let recommendedAmount = 0;
  let recommendedDuration = 0;
  let recommendation: "APPROVE" | "REJECT" = "REJECT";

  if (risk === "LOW" && evidence.verified) {
    recommendation = "APPROVE";

    const collateralBasedLimit =
      evidence.collateral * 0.67;

    recommendedAmount = Math.min(
      application.requestedAmount,
      5000,
      Math.floor(collateralBasedLimit / 50) * 50
    );

    recommendedDuration = Math.min(
      application.durationDays,
      90
    );
  } else if (risk === "MEDIUM" && evidence.verified) {
    recommendation = "APPROVE";

    const collateralBasedLimit =
      evidence.collateral * 0.5;

    recommendedAmount = Math.min(
      application.requestedAmount,
      2500,
      Math.floor(collateralBasedLimit / 50) * 50
    );

    recommendedDuration = Math.min(
      application.durationDays,
      60
    );
  }

  const reasoning =
    risk === "LOW"
      ? `Strong repayment history with ${evidence.repaymentCount} verified repayments, ` +
        `${evidence.failedObligations} failed obligations, ` +
        `$${evidence.collateral.toLocaleString()} verified collateral, and ` +
        `${evidence.activityDays} days of financial activity. ` +
        `The verified evidence supports a low-risk credit decision.`
      : risk === "MEDIUM"
        ? `The borrower has moderate verified financial strength. ` +
          `${evidence.repaymentCount} repayments, ` +
          `${evidence.failedObligations} failed obligations, ` +
          `$${evidence.collateral.toLocaleString()} collateral, and ` +
          `${evidence.activityDays} days of activity were evaluated.`
        : `The verified financial evidence does not satisfy the minimum ` +
          `risk requirements for autonomous credit approval.`;

  return {
    risk,
    confidence,
    recommendedAmount,
    recommendedDuration,
    recommendation,
    reasoning,
  };
}