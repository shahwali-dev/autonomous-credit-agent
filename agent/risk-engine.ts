import type {
  AIDecision,
  CreditApplication,
  Evidence,
} from "@/lib/store/credit-store";

const MAX_CREDIT_EXPOSURE = 5000;
const MAX_DURATION_DAYS = 90;
const MEDIUM_CREDIT_CAP = 2500;

export function generateRiskDecision(
  evidence: Evidence,
  application: CreditApplication
): AIDecision {
  let score = 0;

  /*
   * Attestcoin verification is a hard prerequisite.
   * Unverified evidence can never produce an approval.
   */
  if (!evidence.verified) {
    return {
      risk: "HIGH",
      confidence: 99,
      recommendedAmount: 0,
      recommendedDuration: 0,
      recommendation: "REJECT",
      reasoning:
        "The financial evidence has not been cryptographically verified by Attestcoin. " +
        "Autonomous credit approval is blocked until verified evidence is available.",
    };
  }

  /*
   * Repayment history
   */
  if (evidence.repaymentCount >= 8) {
    score += 30;
  } else if (evidence.repaymentCount >= 5) {
    score += 25;
  } else if (evidence.repaymentCount >= 2) {
    score += 20;
  } else if (evidence.repaymentCount >= 1) {
    score += 12;
  }

  /*
   * Obligation history
   */
  if (evidence.failedObligations === 0) {
    score += 25;
  } else if (evidence.failedObligations === 1) {
    score += 5;
  } else {
    score -= 25;
  }

  /*
   * Collateral coverage against requested amount
   */
  const collateralRatio =
    application.requestedAmount > 0
      ? evidence.collateral / application.requestedAmount
      : 0;

  if (collateralRatio >= 1.5) {
    score += 25;
  } else if (collateralRatio >= 1) {
    score += 20;
  } else if (collateralRatio >= 0.75) {
    score += 12;
  } else if (collateralRatio >= 0.5) {
    score += 5;
  } else {
    score -= 20;
  }

  /*
   * Financial activity history
   */
  if (evidence.activityDays >= 180) {
    score += 15;
  } else if (evidence.activityDays >= 90) {
    score += 12;
  } else if (evidence.activityDays >= 30) {
    score += 8;
  } else if (evidence.activityDays >= 7) {
    score += 4;
  }

  /*
   * Evidence quality bonus.
   * This represents the fact that the underlying financial facts
   * were cryptographically verified rather than supplied by the UI.
   */
  score += 8;

  /*
   * Risk classification
   *
   * LOW requires stronger history.
   * MEDIUM can support conservative secured credit.
   */
  const risk =
    score >= 80
      ? "LOW"
      : score >= 45
        ? "MEDIUM"
        : "HIGH";

  const confidence = Math.min(
    99,
    Math.max(60, score + 10)
  );

  let recommendedAmount = 0;
  let recommendedDuration = 0;
  let recommendation: "APPROVE" | "REJECT" = "REJECT";

  /*
   * LOW-risk approval
   */
  if (risk === "LOW") {
    recommendation = "APPROVE";

    const collateralBasedLimit =
      evidence.collateral * 0.67;

    recommendedAmount = Math.min(
      application.requestedAmount,
      MAX_CREDIT_EXPOSURE,
      Math.floor(collateralBasedLimit / 50) * 50
    );

    recommendedDuration = Math.min(
      application.durationDays,
      MAX_DURATION_DAYS
    );
  }

  /*
   * MEDIUM-risk approval
   *
   * More conservative:
   * - maximum $2,500
   * - maximum 50% of verified collateral
   * - maximum 60 days
   */
  if (risk === "MEDIUM") {
    const collateralBasedLimit =
      evidence.collateral * 0.5;

    recommendedAmount = Math.min(
      application.requestedAmount,
      MEDIUM_CREDIT_CAP,
      Math.floor(collateralBasedLimit / 50) * 50
    );

    recommendedDuration = Math.min(
      application.durationDays,
      60
    );

    if (recommendedAmount > 0) {
      recommendation = "APPROVE";
    }
  }

  const reasoning =
    risk === "LOW"
      ? `Strong verified financial profile. The agent evaluated ` +
      `${evidence.repaymentCount} verified repayments, ` +
      `${evidence.failedObligations} failed obligations, ` +
      `$${evidence.collateral.toLocaleString()} verified collateral, and ` +
      `${evidence.activityDays} days of financial activity. ` +
      `The evidence supports a low-risk credit decision.`

      : risk === "MEDIUM"
        ? `The agent identified a moderate-risk but sufficiently secured ` +
        `credit profile. Attestcoin-verified evidence shows ` +
        `${evidence.repaymentCount} repayment(s), ` +
        `${evidence.failedObligations} failed obligations, ` +
        `$${evidence.collateral.toLocaleString()} collateral, and ` +
        `${evidence.activityDays} days of activity. ` +
        `Credit capacity is conservatively limited by verified collateral.`

        : `The verified financial evidence does not currently satisfy ` +
        `the minimum risk requirements for autonomous credit approval.`;

  return {
    risk,
    confidence,
    recommendedAmount,
    recommendedDuration,
    recommendation,
    reasoning,
  };
}