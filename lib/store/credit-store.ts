import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type DecisionStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "READY_TO_EXECUTE"
  | "EXECUTED";

export interface Evidence {
  repaymentCount: number;
  failedObligations: number;
  collateral: number;
  activityDays: number;

  verified: boolean;

  proofHash: string;

  txHash: string;

  sourceBlock: number | null;

  verificationStatus:
  | "PENDING"
  | "VERIFYING"
  | "VERIFIED"
  | "FAILED";
}

export interface CreditApplication {
  requestedAmount: number;
  durationDays: number;
  sourceChain: string;
  collateral: number;
  walletAddress: string | null;
}

export interface AIDecision {
  risk: RiskLevel;
  confidence: number;
  recommendedAmount: number;
  recommendedDuration: number;
  recommendation: "APPROVE" | "REJECT";
  reasoning: string;
}

export interface CreditLine {
  approvedAmount: number;
  usedAmount: number;
  availableAmount: number;
  collateral: number;
  status: "ACTIVE" | "PAID" | "SUSPENDED";
}

export interface Transaction {
  id: string;
  type:
  | "CREDIT_APPROVED"
  | "CREDIT_DRAWN"
  | "RISKGUARD"
  | "AI_DECISION"
  | "EVIDENCE_VERIFIED"
  | "COLLATERAL_VERIFIED"
  | "REPAYMENT";
  amount?: number;
  status:
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "VERIFIED"
  | "FAILED";
  network: string;
  hash?: string;
  timestamp: number;
}

interface CreditStore {
  application: CreditApplication;

  evidence: Evidence;

  aiDecision: AIDecision | null;

  decisionStatus: DecisionStatus;

  creditLine: CreditLine | null;

  transactions: Transaction[];

  setApplication: (
    data: Partial<CreditApplication>
  ) => void;

  setEvidence: (
    data: Partial<Evidence>
  ) => void;

  setAIDecision: (
    decision: AIDecision
  ) => void;

  setDecisionStatus: (
    status: DecisionStatus
  ) => void;

  setCreditLine: (
    creditLine: CreditLine
  ) => void;

  addTransaction: (
    transaction: Transaction
  ) => void;

  executeCredit: () => void;

  repayCredit: (amount: number) => void;
  drawCredit: (amount: number) => void;

  resetApplication: () => void;
}

const initialApplication: CreditApplication = {
  requestedAmount: 1000,
  durationDays: 30,
  sourceChain: "Ethereum Sepolia",
  collateral: 1500,
  walletAddress: null,
};

const initialEvidence: Evidence = {
  repaymentCount: 0,
  failedObligations: 0,
  collateral: 0,
  activityDays: 0,

  verified: false,

  proofHash: "",

  txHash: "",

  sourceBlock: null,

  verificationStatus: "PENDING",
};

export const useCreditStore = create<CreditStore>()(
  persist(
    (set) => ({
      application: initialApplication,

      evidence: initialEvidence,

      aiDecision: null,

      decisionStatus: "PENDING",

      creditLine: null,

      transactions: [],

      setApplication: (data) =>
        set((state) => ({
          application: {
            ...state.application,
            ...data,
          },
        })),

      setEvidence: (data) =>
        set((state) => ({
          evidence: {
            ...state.evidence,
            ...data,
          },
        })),

      setAIDecision: (decision) =>
        set({
          aiDecision: decision,
          decisionStatus:
            decision.recommendation === "APPROVE"
              ? "APPROVED"
              : "REJECTED",
        }),

      setDecisionStatus: (status) =>
        set({
          decisionStatus: status,
        }),

      setCreditLine: (creditLine) =>
        set({
          creditLine,
        }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            transaction,
            ...state.transactions,
          ],
        })),

      executeCredit: () =>
        set((state) => {
          if (!state.aiDecision) {
            return state;
          }

          const approvedAmount =
            state.aiDecision.recommendedAmount;

          return {
            decisionStatus: "EXECUTED",

            creditLine: {
              approvedAmount,
              usedAmount: 0,
              availableAmount: approvedAmount,
              collateral: state.application.collateral,
              status: "ACTIVE",
            },

            transactions: [
              {
                id: `credit-${Date.now()}`,
                type: "CREDIT_APPROVED",
                amount: approvedAmount,
                status: "COMPLETED",
                network: "Creditcoin Testnet",
                timestamp: Date.now(),
              },
              ...state.transactions,
            ],
          };
        }),

      drawCredit: (amount) =>
        set((state) => {
          if (!state.creditLine || amount <= 0) {
            return state;
          }

          const drawAmount = Math.min(
            amount,
            state.creditLine.availableAmount
          );

          if (drawAmount <= 0) {
            return state;
          }

          const newUsedAmount =
            state.creditLine.usedAmount + drawAmount;

          const newAvailableAmount =
            state.creditLine.availableAmount - drawAmount;

          return {
            creditLine: {
              ...state.creditLine,
              usedAmount: newUsedAmount,
              availableAmount: newAvailableAmount,
              status: "ACTIVE",
            },

            transactions: [
              {
                id: `draw-${Date.now()}`,
                type: "CREDIT_DRAWN",
                amount: drawAmount,
                status: "COMPLETED",
                network: "Creditcoin Testnet",
                timestamp: Date.now(),
              },
              ...state.transactions,
            ],
          };
        }),

      repayCredit: (amount) =>
        set((state) => {
          if (!state.creditLine || amount <= 0) {
            return state;
          }

          const repaymentAmount = Math.min(
            amount,
            state.creditLine.usedAmount
          );

          if (repaymentAmount <= 0) {
            return state;
          }

          const newUsedAmount =
            state.creditLine.usedAmount - repaymentAmount;

          const newAvailableAmount =
            state.creditLine.availableAmount + repaymentAmount;

          return {
            creditLine: {
              ...state.creditLine,

              usedAmount: newUsedAmount,

              availableAmount: newAvailableAmount,

              status:
                newUsedAmount === 0
                  ? "PAID"
                  : "ACTIVE",
            },

            transactions: [
              {
                id: `repayment-${Date.now()}`,

                type: "REPAYMENT",

                amount: repaymentAmount,

                status: "COMPLETED",

                network: "Creditcoin Testnet",

                timestamp: Date.now(),
              },

              ...state.transactions,
            ],
          };
        }),

      resetApplication: () =>
        set({
          application: initialApplication,
          evidence: initialEvidence,
          aiDecision: null,
          decisionStatus: "PENDING",
          creditLine: null,
          transactions: [],
        }),
    }),
    {
      name: "autonomous-credit-agent",
    }
  )
);