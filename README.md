# Autonomous Cross-Chain Credit Agent

<p align="center">
  <strong>AI-powered cross-chain credit decisioning using verified financial evidence, Attestcoin, RiskGuard, and Creditcoin.</strong>
</p>

<p align="center">
  <a href="https://autonomous-credit-agent.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/shahwali-dev/autonomous-credit-agent">GitHub</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/BUIDL%20CTC-2026-blue" alt="BUIDL CTC 2026">
  <img src="https://img.shields.io/badge/Track-AI-purple" alt="AI Track">
  <img src="https://img.shields.io/badge/Creditcoin-Testnet-orange" alt="Creditcoin Testnet">
  <img src="https://img.shields.io/badge/Attestcoin-Verified-success" alt="Attestcoin Verified">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

## Overview

**Autonomous Cross-Chain Credit Agent** is an AI-powered credit infrastructure prototype that transforms financial activity from another blockchain into a structured credit decision and controlled execution workflow on Creditcoin.

The system combines:

* Cross-chain financial evidence
* Attestcoin Protocol
* AI-driven credit risk assessment
* Deterministic RiskGuard policies
* Creditcoin execution infrastructure
* Solidity smart contracts

The core architecture is:

```text
Cross-Chain Financial Activity
            ↓
      Attestcoin Proof
            ↓
    Verified Evidence
            ↓
      AI Credit Agent
            ↓
        RiskGuard
            ↓
   Creditcoin Execution
            ↓
        Credit Line
```

The key design principle is:

> **AI provides intelligence. Deterministic code provides authority.**

---

# The Problem

Traditional on-chain credit systems face several limitations:

* Financial history may exist across different blockchains.
* Borrowers may have meaningful financial activity outside the destination chain.
* Cross-chain information requires a trustworthy verification mechanism.
* AI-generated financial decisions require deterministic safety boundaries.
* Autonomous agents should not have unrestricted authority over financial execution.

This creates a gap between:

**Cross-chain financial activity → verifiable evidence → intelligent credit decisions → controlled execution.**

Autonomous Cross-Chain Credit Agent explores an architecture that connects these layers.

---

# The Solution

The system converts source-chain financial activity into verifiable evidence, evaluates that evidence using an AI credit agent, and applies deterministic safety policies before an execution flow can proceed.

The workflow is:

```text
Observe
   ↓
Verify
   ↓
Analyze
   ↓
Decide
   ↓
Validate
   ↓
Execute
```

The system separates probabilistic AI reasoning from deterministic financial authority.

---

# Architecture

```text
┌────────────────────────────────────────────┐
│                SOURCE CHAIN                │
│                                            │
│  Repayments    Collateral    Obligations   │
│       Financial Activity / Events          │
└──────────────────────┬─────────────────────┘
                       │
                       │ Real Transaction
                       ▼
┌────────────────────────────────────────────┐
│                ATTESTCOIN                  │
│                                            │
│  Source Block Attestation                  │
│  Proof Builder                             │
│  Merkle Proof                              │
│  Continuity Proof                          │
└──────────────────────┬─────────────────────┘
                       │
                       │ Verified Evidence
                       ▼
┌────────────────────────────────────────────┐
│             AI CREDIT AGENT                │
│                                            │
│  Risk Assessment                           │
│  Confidence                                │
│  Credit Recommendation                     │
│  Approval / Rejection                      │
│  Decision Reasoning                        │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│                 RISKGUARD                  │
│                                            │
│  Maximum Exposure                          │
│  Collateral Coverage                       │
│  Maximum Duration                          │
│  Evidence Verification                     │
│  Risk Threshold                            │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│                CREDITCOIN                  │
│                                            │
│  Credit Execution Flow                     │
│  Credit Line Management                    │
│  Draws / Repayments                        │
└────────────────────────────────────────────┘
```

---

# How It Works

## 1. Financial Activity

The prototype includes a Solidity smart contract named `FinancialActivityEmitter`.

Location:

```text
contracts/source/FinancialActivityEmitter.sol
```

It records borrower activity on Ethereum Sepolia.

Supported activities include:

```text
Repayments
Collateral
Failed Obligations
Activity Timestamps
```

The contract emits events that provide source-chain financial evidence.

### Deployed Contract

```text
Ethereum Sepolia

FinancialActivityEmitter:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

The contract has been deployed successfully and tested with real transactions.

---

# 2. Real Source-Chain Activity

The prototype has generated actual Ethereum Sepolia transactions from the project wallet.

### Collateral Transaction

```text
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1
```

### Repayment Transaction

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

Repayment details:

```text
Repayment ID: 1
Amount: 100
Source Chain: Ethereum Sepolia
Source Block: 11704112
```

The source contract state was also read back from Ethereum Sepolia after the transactions.

---

# 3. Attestcoin Verification

Attestcoin provides the cross-chain verification layer.

The project integrates the official:

```text
@gluwa/usc-sdk
```

The integration uses the Attestcoin proof workflow:

```text
Real Source Transaction
        ↓
Source Transaction Block
        ↓
Creditcoin Block Attestation
        ↓
Attestcoin Proof Builder
        ↓
Transaction Proof
        ↓
Creditcoin Verification Precompile
```

## Real Proof Generation

For the repayment transaction:

```text
TX:
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

the Attestcoin Proof Builder returned:

```text
success: true
```

The generated proof contained:

* Source-chain header number
* Transaction index
* Encoded transaction
* Merkle proof
* Continuity proof

The proof corresponded to:

```text
Chain Key: 1
Header Number: 11704112
Transaction Index: 87
```

---

# 4. Attestcoin Cryptographic Verification

The generated proof was then passed to the official `PrecompileBlockProver.verifySingle()` flow.

The verification call used:

```text
chainKey
headerNumber
encodedTransaction
merkleProof
continuityProof
```

The actual result was:

```text
VERIFICATION RESULT:
true
```

This means the prototype has successfully demonstrated:

```text
Real Ethereum Sepolia Transaction
             ↓
      Attestcoin Proof
             ↓
 Creditcoin Verification
             ↓
            TRUE
```

This is a real proof-verification result rather than a mocked frontend status.

---

# 5. AI Credit Agent

The AI Credit Agent evaluates the available financial evidence.

The current risk engine considers signals including:

```text
Repayment Count
Failed Obligations
Collateral
Activity Duration
Evidence Verification
```

It produces structured decision data:

```text
Risk Level
Confidence
Recommended Credit Amount
Recommended Duration
Approval / Rejection
Decision Reasoning
```

Supported risk levels:

```text
LOW
MEDIUM
HIGH
```

Example prototype decision:

```text
Requested Amount: $1,000
Duration: 30 days

Risk: LOW
Confidence: 95%

Recommended Credit: $1,000
Decision: APPROVE
```

The AI decision is intended to be evaluated by RiskGuard before execution.

---

# 6. RiskGuard

The AI does not have unrestricted financial authority.

RiskGuard acts as a deterministic safety layer between AI decisioning and execution.

It evaluates policies including:

```text
Maximum Credit Exposure
Collateral Coverage
Maximum Duration
Evidence Verification
Risk Threshold
```

Example policy configuration:

```text
Maximum Exposure: $5,000
Minimum Collateral Coverage: 50%
Maximum Duration: 90 days
Evidence: Required
Risk: LOW or MEDIUM
```

The architectural separation is:

```text
AI
 ↓
Recommendation

RiskGuard
 ↓
Permission / Rejection

Creditcoin
 ↓
Execution
```

---

# 7. Creditcoin Execution

Creditcoin is the destination environment for the credit execution layer.

The application contains a credit-line workflow for:

* Credit limits
* Available credit
* Used credit
* Outstanding balance
* Draws
* Repayments
* Transaction history

The current prototype separates the verified Attestcoin evidence path from the Creditcoin execution path.

**Important:** the project does not claim a Creditcoin execution transaction unless an actual on-chain execution transaction has been submitted and verified.

---

# Example Credit Decision

The application demonstration uses the following scenario:

| Metric                |   Value |
| --------------------- | ------: |
| Requested Credit      |  $1,000 |
| Duration              | 30 days |
| Collateral            |  $1,499 |
| Successful Repayments |       8 |
| Failed Obligations    |       0 |
| Financial Activity    | 90 days |
| AI Risk               |     LOW |
| AI Confidence         |     95% |
| Recommended Credit    |  $1,000 |

The recommendation is then evaluated by RiskGuard before the execution workflow.

> The values above represent the application's demonstration scenario. The currently verified live on-chain evidence is the real Ethereum Sepolia activity described in the **Real On-Chain Evidence** section.

---

# Credit Line Lifecycle

## Initial Credit Line

```text
Credit Limit:     $1,000
Used:             $0
Available:        $1,000
Outstanding:      $0
```

## After $500 Draw

```text
Credit Limit:     $1,000
Used:             $500
Available:        $500
Outstanding:      $500
Utilization:      50%
```

## After $200 Repayment

```text
Credit Limit:     $1,000
Used:             $300
Available:        $700
Outstanding:      $300
```

These values represent the application's credit-line workflow and should not be interpreted as a completed on-chain Creditcoin lending transaction unless separately identified with a real transaction hash.

---

# Real On-Chain Evidence

The most important verified blockchain evidence currently demonstrated by the prototype is:

### Source Contract

```text
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

### Collateral Transaction

```text
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1
```

### Repayment Transaction

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

### Attested Source Block

```text
11704112
```

### Attestcoin Chain Key

```text
1
```

### Attestcoin Proof

```text
Generated: SUCCESS
```

### Attestcoin Verification

```text
Precompile Verification: TRUE
```

---

# Attestcoin Integration

The Attestcoin integration is located under:

```text
lib/attestcoin/
```

The current implementation includes:

```text
lib/attestcoin/client.ts
lib/attestcoin/proof-service.ts
```

The proof workflow is designed around:

```text
1. Wait for source transaction
2. Detect source block
3. Wait for Creditcoin attestation
4. Request proof from Proof Builder
5. Receive proof data
6. Verify proof through Attestcoin infrastructure
```

The proof-generation and verification flow has now been tested successfully against a real Ethereum Sepolia transaction.

---

# Environment Configuration

Create:

```text
.env.local
```

Example configuration:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

If a private key is required for local deployment or transaction signing, it must remain local.

> **Never commit `.env.local`, private keys, seed phrases, wallet passwords, or other secrets to GitHub.**

---

# Smart Contracts

## FinancialActivityEmitter

Location:

```text
contracts/source/FinancialActivityEmitter.sol
```

Main functions:

```solidity
recordRepayment(...)
recordCollateral(...)
recordObligationFailure(...)
getActivity(...)
```

Events:

```text
RepaymentRecorded
CollateralRecorded
ObligationFailureRecorded
ActivityRecorded
```

The contract is deployed on Ethereum Sepolia and has been used to create real source-chain activity.

---

# AI Risk Engine

Location:

```text
agent/risk-engine.ts
```

The risk engine transforms financial evidence into a bounded credit recommendation.

Conceptually:

```text
Repayment History
        +
Failed Obligations
        +
Collateral
        +
Activity Duration
        +
Evidence Verification
        ↓
     Risk Score
        ↓
     Risk Level
        ↓
Credit Recommendation
```

---

# Application Flow

```text
Dashboard
    ↓
Credit Application
    ↓
Wallet Connection
    ↓
Evidence
    ↓
Cross-Chain Verification
    ↓
AI Credit Agent
    ↓
RiskGuard
    ↓
Creditcoin Execution Flow
    ↓
Credit Line
    ↓
Draw
    ↓
Repayment
    ↓
Transaction History
```

---

# Frontend

The application is built with Next.js and provides a dedicated interface for each stage of the credit lifecycle.

```text
/
├── Dashboard
├── Apply
├── Evidence
├── AI Agent
├── Decision
├── Credit Lines
└── Transactions
```

The interface is designed to make the decision pipeline visible rather than hiding it behind a single transaction button.

---

# Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Zustand

## Blockchain

* Solidity
* Foundry
* Ethereum Sepolia
* Creditcoin Testnet
* EVM Wallets

## Cross-Chain

* Attestcoin Protocol
* `@gluwa/usc-sdk`
* Attestcoin Proof Builder
* Creditcoin verification infrastructure

## AI / Decisioning

* TypeScript
* Custom Risk Engine
* Deterministic RiskGuard policies

## Development

* Node.js
* pnpm
* Foundry
* forge-std
* ethers

---

# Project Structure

```text
autonomous-credit-agent/
│
├── app/
│   ├── page.tsx
│   ├── apply/
│   ├── evidence/
│   ├── agent/
│   ├── decision/
│   ├── credit-lines/
│   └── transactions/
│
├── components/
│
├── lib/
│   ├── attestcoin/
│   └── store/
│
├── contracts/
│   ├── source/
│   ├── attestcoin/
│   └── creditcoin/
│
├── agent/
│   └── risk-engine.ts
│
├── attestcoin-worker/
│
├── scripts/
├── tests/
├── docs/
├── public/
│
├── foundry.toml
├── package.json
├── README.md
└── .env.example
```

---

# Getting Started

## Prerequisites

Install:

* Node.js
* pnpm
* Foundry
* MetaMask or another EVM-compatible wallet

The current testnet configuration uses:

```text
Ethereum Sepolia
Creditcoin Testnet
```

---

## Installation

```bash
pnpm install
```

---

## Environment

Create:

```text
.env.local
```

Add:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

For operations requiring wallet signing, configure the private key only in your local environment.

---

## Run the Application

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# Testing

The project uses Foundry for smart-contract testing.

Run:

```bash
forge test
```

The test suite covers areas including:

* Repayment recording
* Collateral recording
* Obligation failures
* Multiple financial activities
* Invalid repayment amounts
* Invalid collateral amounts

---

# Build

Build the smart contracts:

```bash
forge build
```

---

# Type Checking

```bash
pnpm exec tsc --noEmit
```

---

# Security Philosophy

Autonomous financial agents should not have unrestricted control over capital.

This project separates:

```text
AI Decision
     ↓
Deterministic Policy
     ↓
Execution
```

The AI proposes a decision.

RiskGuard evaluates whether the recommendation satisfies predefined safety constraints.

The execution layer is therefore bounded independently of the AI's reasoning.

---

# Why Attestcoin?

Cross-chain financial applications need a trustworthy mechanism for bringing information from one blockchain into another execution environment.

Attestcoin provides the verification infrastructure used by this architecture.

The demonstrated pipeline is:

```text
Real Source-Chain Transaction
        ↓
Source Block Attestation
        ↓
Attestcoin Proof
        ↓
Creditcoin Verification Precompile
        ↓
TRUE
```

Attestcoin is therefore a core component of the project's trust model rather than an optional integration.

---

# Why Creditcoin?

Creditcoin provides the destination environment for the credit execution layer.

The project combines:

```text
Cross-Chain Financial Evidence
            +
AI Credit Decisioning
            +
Deterministic Safety Controls
            +
Creditcoin Execution
```

This creates a foundation for autonomous credit applications that can evaluate financial activity originating outside the destination chain.

---

# What Makes It Different?

A basic AI + blockchain application might look like:

```text
User Data
    ↓
AI
    ↓
Recommendation
```

Autonomous Cross-Chain Credit Agent is designed as:

```text
Verified Cross-Chain Data
          ↓
      AI Decision
          ↓
   Deterministic Guard
          ↓
    Credit Execution
```

The AI is not simply a chatbot or scoring interface.

It is designed as a decision-making component inside a controlled financial execution pipeline.

---

# Current Prototype Status

## Implemented

* ✅ Next.js product interface
* ✅ Credit application workflow
* ✅ EVM wallet connection
* ✅ Financial evidence interface
* ✅ AI risk engine
* ✅ Deterministic RiskGuard logic
* ✅ Credit-line lifecycle
* ✅ Draw and repayment workflow
* ✅ Transaction history
* ✅ Financial activity source contract
* ✅ Foundry smart-contract tests
* ✅ Ethereum Sepolia contract deployment
* ✅ Real collateral transaction
* ✅ Real repayment transaction
* ✅ Creditcoin source-block attestation detection
* ✅ Attestcoin SDK integration
* ✅ Real Attestcoin proof generation
* ✅ Real Attestcoin precompile verification
* ✅ Verified result: `true`

## Next Engineering Steps

* ⏳ Connect verified proof generation directly into the application workflow
* ⏳ Automated verified-evidence ingestion
* ⏳ Automated worker execution
* ⏳ Production-grade Creditcoin smart-contract execution
* ⏳ Additional security hardening

> The current application is a hackathon prototype. UI credit-line states and local execution flows should not be interpreted as completed production lending transactions unless accompanied by verifiable on-chain transaction evidence.

---

# Verified Demonstration

The strongest verified path currently demonstrated by the project is:

```text
Ethereum Sepolia
      │
      │ Real repayment transaction
      ▼
FinancialActivityEmitter
      │
      ▼
Block 11704112
      │
      │ Attested by Creditcoin
      ▼
Attestcoin Proof Builder
      │
      ▼
Merkle Proof + Continuity Proof
      │
      ▼
Creditcoin Attestcoin Precompile
      │
      ▼
TRUE
```

This demonstrates that a real source-chain transaction can be transformed into cryptographically verifiable cross-chain evidence.

---

# Demo

### Live Application

https://autonomous-credit-agent.vercel.app/

### GitHub

https://github.com/shahwali-dev/autonomous-credit-agent

### Demo Video

https://youtu.be/lUKRRT1O2_A

---

# Hackathon

## BUIDL CTC 2026 — BUIDL For The Real World

**Track:** AI

**Core Ecosystem:** Creditcoin

**Key Protocol:** Attestcoin Protocol

**Focus:** Autonomous Cross-Chain Credit

The project explores how verified cross-chain financial activity can become input to an AI credit agent while keeping execution bounded by deterministic policies.

---

# Roadmap

## Phase 1 — Hackathon Prototype

* Cross-chain financial evidence
* Ethereum Sepolia source contract
* Attestcoin integration
* Real Attestcoin proof generation
* Real Attestcoin verification
* AI credit decisioning
* RiskGuard
* Credit-line management
* Creditcoin execution workflow

## Phase 2 — Autonomous Worker

* Source-chain event monitoring
* Automated proof generation
* Automated proof verification
* Verified evidence ingestion
* Retry and failure handling
* End-to-end automated workflow

## Phase 3 — Production Credit Infrastructure

* Production-grade contracts
* Stronger risk policies
* Multiple source chains
* Additional financial evidence
* On-chain decision commitments
* Expanded credit products
* Security audits

---

# Vision

The long-term vision is to build infrastructure for **autonomous financial agents** that can evaluate verified financial history, make bounded decisions, and interact with decentralized credit markets without requiring centralized intermediaries for every decision.

The fundamental model is:

```text
Verified Data
      ↓
  AI Decision
      ↓
Deterministic Safety
      ↓
Controlled Execution
```

The broader goal is to make financial intelligence **portable across chains while keeping autonomous agents bounded by verifiable rules**.

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.
