import type {
  AIDecision,
  CreditApplication,
  Evidence,
} from "@/lib/store/credit-store";

export interface RiskGuardCheck {
  name: string;
  value: string;
  passed: boolean;
}

export interface RiskGuardResult {
  passed: boolean;
  checks: RiskGuardCheck[];
  reason: string;
}

const MAX_CREDIT_EXPOSURE = 5000;
const MIN_COLLATERAL_RATIO = 0.5;
const MAX_DURATION_DAYS = 90;

export function validateRiskGuard(
  aiDecision: AIDecision | null,
  application: CreditApplication,
  evidence: Evidence
): RiskGuardResult {
  const recommendedAmount = aiDecision?.recommendedAmount ?? 0;
  const recommendedDuration = aiDecision?.recommendedDuration ?? 0;

  const checks: RiskGuardCheck[] = [
    {
      name: "Maximum credit exposure",
      value: `$${recommendedAmount.toLocaleString()} / $${MAX_CREDIT_EXPOSURE.toLocaleString()}`,
      passed: recommendedAmount <= MAX_CREDIT_EXPOSURE,
    },
    {
      name: "Collateral coverage",
      value:
        recommendedAmount > 0
          ? `${Math.round(
              (application.collateral / recommendedAmount) * 100
            )}%`
          : "N/A",
      passed:
        recommendedAmount === 0 ||
        application.collateral >=
          recommendedAmount * MIN_COLLATERAL_RATIO,
    },
    {
      name: "Maximum duration",
      value: `${recommendedDuration} / ${MAX_DURATION_DAYS} days`,
      passed: recommendedDuration <= MAX_DURATION_DAYS,
    },
    {
      name: "Evidence verification",
      value: evidence.verified
        ? "Attestcoin VALID"
        : "NOT VERIFIED",
      passed: evidence.verified,
    },
    {
      name: "Risk threshold",
      value: `${aiDecision?.risk ?? "PENDING"} ≤ MEDIUM`,
      passed:
        aiDecision?.risk === "LOW" ||
        aiDecision?.risk === "MEDIUM",
    },
  ];

  const passed = checks.every((check) => check.passed);

  return {
    passed,
    checks,
    reason: passed
      ? "All deterministic RiskGuard policies passed."
      : "Credit execution is blocked because one or more RiskGuard policies failed.",
  };
}
