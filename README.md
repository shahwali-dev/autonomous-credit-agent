# Autonomous Cross-Chain Credit Agent

<p align="center">
  <strong>AI-powered cross-chain credit decisioning using cryptographically verified financial evidence, Attestcoin, RiskGuard, and Creditcoin.</strong>
</p>

<p align="center">
  <a href="https://autonomous-credit-agent.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/shahwali-dev/autonomous-credit-agent">GitHub</a>
  ·
  <a href="https://youtu.be/lUKRRT1O2_A">Demo Video</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/BUIDL%20CTC-2026-blue" alt="BUIDL CTC 2026">
  <img src="https://img.shields.io/badge/Track-AI-purple" alt="AI Track">
  <img src="https://img.shields.io/badge/Creditcoin-Testnet-orange" alt="Creditcoin Testnet">
  <img src="https://img.shields.io/badge/Attestcoin-Verified-success" alt="Attestcoin Verified">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

# Overview

**Autonomous Cross-Chain Credit Agent** is an AI-powered credit infrastructure prototype that transforms financial activity from one blockchain into **cryptographically verified cross-chain evidence**, structured AI credit intelligence, deterministic risk validation, and controlled credit execution.

The project combines:

* Ethereum Sepolia source-chain financial activity
* Attestcoin Protocol
* Creditcoin native proof verification
* A custom Creditcoin ASC contract
* AI-driven credit risk assessment
* Deterministic RiskGuard policies
* Smart-contract-based execution infrastructure

The core architecture is:

```text
Source-Chain Financial Activity
              ↓
       Attestcoin Proof
              ↓
   Cryptographic Verification
              ↓
     Creditcoin ASC State
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

On-chain financial history is increasingly distributed across multiple blockchain ecosystems.

A borrower may have:

* Repayment history on one chain
* Collateral on another
* Failed obligations somewhere else
* Financial activity that is invisible to a destination credit protocol

This creates several challenges:

1. How can financial activity from another blockchain be verified?
2. How can verified evidence become persistent state on the destination chain?
3. How can AI use that evidence to make structured credit decisions?
4. How can an autonomous AI agent be prevented from having unrestricted financial authority?

The project explores a complete architecture for:

```text
Cross-Chain Activity
        ↓
Verified Evidence
        ↓
AI Credit Intelligence
        ↓
Deterministic Policy
        ↓
Controlled Execution
```

---

# The Solution

Autonomous Cross-Chain Credit Agent separates the credit process into distinct layers:

```text
OBSERVE
   ↓
VERIFY
   ↓
RECORD
   ↓
ANALYZE
   ↓
DECIDE
   ↓
VALIDATE
   ↓
EXECUTE
```

Each layer has a specific responsibility.

### Attestcoin

Provides cryptographically verified cross-chain evidence.

### CreditASC

Processes the verified proof on Creditcoin and converts the proven source-chain event into persistent verified evidence state.

### AI Credit Agent

Interprets verified financial evidence and produces a structured credit recommendation.

### RiskGuard

Applies deterministic policies to constrain what the AI is allowed to request.

### Creditcoin

Provides the destination environment for controlled credit execution.

---

# Architecture

```text
┌─────────────────────────────────────────────┐
│                 SOURCE CHAIN                │
│                                             │
│   Repayments   Collateral   Obligations     │
│          Financial Activity Events          │
└──────────────────────┬──────────────────────┘
                       │
                       │ Real Transaction
                       ▼
┌─────────────────────────────────────────────┐
│                 ATTESTCOIN                  │
│                                             │
│   Block Attestation                         │
│   Proof Builder                             │
│   Transaction Proof                         │
│   Merkle Proof                              │
│   Continuity Proof                          │
└──────────────────────┬──────────────────────┘
                       │
                       │ Cryptographically Verified
                       ▼
┌─────────────────────────────────────────────┐
│                  CREDITCOIN                 │
│                                             │
│                CreditASC                    │
│                                             │
│   ASCBase.execute()                         │
│   Native Attestcoin Verification            │
│   Source Receipt Decoding                   │
│   Evidence Extraction                       │
└──────────────────────┬──────────────────────┘
                       │
                       │ Persistent Verified State
                       ▼
┌─────────────────────────────────────────────┐
│              VERIFIED EVIDENCE              │
│                                             │
│   Repayments                                │
│   Failed Obligations                        │
│   Collateral                                │
│   Activity Timestamps                       │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              AI CREDIT AGENT                │
│                                             │
│   Risk Assessment                           │
│   Confidence                                │
│   Credit Recommendation                     │
│   Duration Recommendation                   │
│   Decision Reasoning                         │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                  RISKGUARD                  │
│                                             │
│   Maximum Exposure                          │
│   Collateral Coverage                       │
│   Maximum Duration                          │
│   Evidence Verification                     │
│   Risk Threshold                            │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 CREDITCOIN                  │
│                                             │
│   Controlled Credit Execution               │
│   Credit Line Management                    │
└─────────────────────────────────────────────┘
```

---

# 1. Real Source-Chain Financial Activity

The project includes a Solidity smart contract called:

```text
FinancialActivityEmitter
```

Location:

```text
contracts/source/FinancialActivityEmitter.sol
```

The contract records borrower-specific financial activity on Ethereum Sepolia.

Supported activity:

```text
Repayments
Collateral
Failed Obligations
Activity Timestamps
```

The contract emits:

```text
RepaymentRecorded
CollateralRecorded
ObligationFailureRecorded
ActivityRecorded
```

## Deployed Contract

```text
Ethereum Sepolia

FinancialActivityEmitter:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

---

# 2. Real On-Chain Activity

The prototype has generated real Ethereum Sepolia transactions through the deployed source contract.

## Collateral

Transaction:

```text
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1
```

Source block:

```text
11704100
```

Collateral:

```text
1499
```

Transaction status:

```text
SUCCESS
```

---

## Repayment

Transaction:

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

Source block:

```text
11704112
```

Repayment ID:

```text
1
```

Repayment amount:

```text
100
```

Transaction status:

```text
SUCCESS
```

These are real Ethereum Sepolia transactions rather than simulated frontend values.

---

# 3. Dynamic Evidence Discovery

The application can discover borrower activity from the deployed source-chain contract rather than relying exclusively on a hardcoded credit profile.

The intended evidence flow is:

```text
Connected Borrower Wallet
          ↓
Source-Chain Activity
          ↓
Relevant Financial Event
          ↓
Source Transaction
          ↓
Attestcoin Verification
```

This allows the credit agent to work from blockchain activity rather than manually entered financial history.

---

# 4. Attestcoin Integration

The project integrates the official:

```text
@gluwa/usc-sdk
```

Attestcoin is used as the cross-chain verification layer.

The implemented workflow is:

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
Merkle + Continuity Proof
        ↓
Creditcoin Native Verification
```

The proof contains the structured information required by the Creditcoin ASC infrastructure, including:

* Source chain key
* Source block height
* Encoded transaction
* Merkle root
* Merkle siblings
* Lower endpoint digest
* Continuity roots

---

# 5. Real Attestcoin Proof Generation

The project has successfully generated an Attestcoin proof for a real Ethereum Sepolia transaction.

Repayment transaction:

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

Source block:

```text
11704112
```

Attestcoin chain key:

```text
1
```

Proof generation result:

```text
SUCCESS
```

The proof was obtained through the Attestcoin Proof Builder after the corresponding source block became attested on Creditcoin.

---

# 6. Real Attestcoin Cryptographic Verification

The generated proof was independently verified using the Creditcoin Attestcoin verification infrastructure.

The project uses:

```text
PrecompileBlockProver.verifySingle()
```

with:

```text
chainKey
headerNumber
encodedTransaction
merkleProof
continuityProof
```

The actual verification result was:

```text
true
```

Therefore the demonstrated flow is:

```text
Real Ethereum Transaction
          ↓
    Attestcoin Proof
          ↓
Creditcoin Verification
          ↓
        TRUE
```

This is a real cryptographic verification result, not a frontend-generated verification flag.

---

# 7. CreditASC — On-Chain Evidence Processing

The project implements a custom Creditcoin ASC contract:

```text
CreditASC
```

CreditASC is built on the official:

```text
ASCBase
```

infrastructure.

Its purpose is to take the verified Attestcoin proof and convert the proven source-chain event into persistent verified evidence on Creditcoin.

The contract receives:

```text
Action
Chain Key
Block Height
Encoded Transaction
Merkle Root
Merkle Siblings
Lower Endpoint Digest
Continuity Roots
```

It then executes the official:

```solidity
ASCBase.execute(...)
```

verification path.

After proof verification, the source transaction receipt is decoded and the relevant financial event is extracted.

---

# 8. CreditASC Evidence Actions

CreditASC currently supports three evidence actions:

```text
1 — REPAYMENT

2 — COLLATERAL

3 — OBLIGATION FAILURE
```

The contract verifies that the decoded source transaction contains the expected event emitted by the configured source contract.

For example:

```text
Ethereum Sepolia
      ↓
RepaymentRecorded(...)
      ↓
Attestcoin Proof
      ↓
CreditASC.execute(action = 1)
      ↓
Verified Repayment State
```

This makes Attestcoin part of the actual smart-contract state transition rather than merely a frontend verification indicator.

---

# 9. CreditASC Deployment

CreditASC has been deployed on Creditcoin testnet.

```text
Creditcoin Chain ID:
102031
```

Contract:

```text
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

Deployment transaction:

```text
0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f
```

Deployment block:

```text
5497977
```

The deployed contract is configured to process evidence originating from:

```text
Ethereum Sepolia FinancialActivityEmitter
```

---

# 10. Real Collateral Proof → CreditASC Execution

The real collateral transaction was processed through the complete proof pipeline.

Source transaction:

```text
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1
```

Source block:

```text
11704100
```

Attestcoin verification:

```text
true
```

CreditASC action:

```text
2 — COLLATERAL
```

CreditASC transaction:

```text
0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03
```

Creditcoin block:

```text
5498184
```

The transaction successfully executed and persisted the verified collateral in CreditASC state.

Resulting verified state:

```text
repaymentCount    = 0
failedObligations = 0
collateral        = 1499
```

---

# 11. Real Repayment Proof → CreditASC Execution

The real repayment transaction was independently processed through the same Attestcoin-to-Creditcoin pipeline.

Source transaction:

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

Source block:

```text
11704112
```

Attestcoin verification:

```text
true
```

CreditASC action:

```text
1 — REPAYMENT
```

CreditASC transaction:

```text
0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5
```

Creditcoin block:

```text
5498192
```

The transaction successfully executed and updated the persistent verified evidence state.

Final verified CreditASC state:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

---

# 12. Verified Cross-Chain Evidence State

The current on-chain evidence state demonstrates:

```text
Ethereum Sepolia
        │
        ├── CollateralRecorded(1499)
        │
        └── RepaymentRecorded(100)
                │
                ▼
        Attestcoin Proof Builder
                │
                ▼
        Creditcoin Native Verifier
                │
                ▼
            CreditASC
                │
                ▼
     Persistent Verified State
                │
                ├── Repayments: 1
                ├── Failed obligations: 0
                └── Collateral: 1499
```

This is an actual cross-chain state transition based on cryptographically verified source-chain evidence.

---

# 13. AI Credit Agent

Once financial evidence is available, the AI credit layer evaluates the borrower's profile.

The current risk engine considers:

```text
Repayment History
Failed Obligations
Verified Collateral
Financial Activity
Requested Amount
Requested Duration
Evidence Verification
```

The agent produces structured decision data:

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

Conceptually:

```text
Verified Evidence
       ↓
AI Risk Engine
       ↓
Risk Assessment
       ↓
Credit Recommendation
```

---

# Important: Demonstration Values vs Verified On-Chain Evidence

The application contains demonstration scenarios for showing the AI and credit-line experience.

For example:

```text
Requested Amount: $1,000
Duration: 30 days
Risk: LOW
Confidence: 95%
Recommendation: APPROVE
```

These values are part of the application's demonstration flow.

They should **not** be interpreted as an actual completed on-chain Creditcoin lending transaction.

The currently verified live evidence is:

```text
Repayments: 1
Failed Obligations: 0
Collateral: 1499
```

The project intentionally separates demonstration UI state from independently verifiable blockchain evidence.

---

# 14. RiskGuard

The AI does not have unrestricted financial authority.

RiskGuard is the deterministic policy layer between AI decisioning and financial execution.

Current policy constraints include:

```text
Maximum Credit Exposure
Minimum Collateral Coverage
Maximum Duration
Evidence Verification
Risk Threshold
```

Current configuration:

```text
Maximum Exposure:        $5,000
Minimum Collateral:      50%
Maximum Duration:        90 days
Evidence Verification:   Required
Allowed Risk:            LOW / MEDIUM
```

The intended execution model is:

```text
AI
 ↓
Recommendation
 ↓
RiskGuard
 ↓
Policy Validation
 ↓
Creditcoin Execution
```

The purpose of RiskGuard is to ensure that AI reasoning does not itself constitute unlimited execution authority.

---

# 15. RiskGuard Smart Contract

A Solidity RiskGuard contract has also been implemented and deployed on Ethereum Sepolia.

Contract:

```text
0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C
```

Deployment transaction:

```text
0xe048e13d4d056bafea674337e02359df3719511475cedae2a2c32d419570bfaf
```

The contract and application-level RiskGuard logic have been tested against the defined policy constraints.

The current architecture keeps the final business logic bounded by deterministic checks rather than relying solely on AI output.

---

# 16. Creditcoin Execution

Creditcoin is the destination environment for the credit execution layer.

The project now has a **real Creditcoin execution path for verified cross-chain evidence** through:

```text
Attestcoin Proof
      ↓
Creditcoin Verification
      ↓
CreditASC.execute()
      ↓
Persistent Verified Evidence
```

However, the project does **not** claim that a completed AI-approved credit line has already been issued through a final on-chain Creditcoin lending transaction.

The current distinction is intentional.

### Completed

* Real source-chain transactions
* Real Attestcoin proof generation
* Real cryptographic proof verification
* CreditASC deployment
* Real `CreditASC.execute()` transactions
* Persistent verified evidence on Creditcoin
* AI credit decision layer
* RiskGuard implementation and tests

### In Development

* Final AI → RiskGuard → Creditcoin credit-execution transaction
* Complete autonomous credit-line lifecycle on-chain
* Final frontend integration of the complete execution path

---

# 17. Credit Line Workflow

The frontend contains a credit-line workflow for representing:

```text
Credit Limit
Used Amount
Available Amount
Outstanding Balance
Draws
Repayments
Status
Transaction History
```

Example UI lifecycle:

## Initial

```text
Credit Limit:  $1,000
Used:          $0
Available:     $1,000
Outstanding:   $0
```

## After $500 Draw

```text
Credit Limit:  $1,000
Used:          $500
Available:     $500
Outstanding:   $500
```

## After $200 Repayment

```text
Credit Limit:  $1,000
Used:          $300
Available:     $700
Outstanding:   $300
```

These values represent the application's credit-line workflow and are not claimed as completed on-chain lending transactions unless accompanied by a verifiable transaction hash.

---

# 18. End-to-End Architecture

The complete intended architecture is:

```text
                 SOURCE CHAIN
                      │
                      │
             Financial Activity
                      │
                      ▼
             FinancialActivityEmitter
                      │
                      │ Real Transaction
                      ▼
              Attestcoin Protocol
                      │
             ┌────────┴────────┐
             │                 │
       Merkle Proof      Continuity Proof
             │                 │
             └────────┬────────┘
                      ▼
          Creditcoin Native Verifier
                      │
                      ▼
                  CreditASC
                      │
                      ▼
          Verified Evidence State
                      │
                      ▼
               AI Credit Agent
                      │
                      ▼
                 RiskGuard
                      │
              Policy Validation
                      │
                      ▼
              Creditcoin Execution
                      │
                      ▼
                 Credit Line
```

---

# 19. Why Attestcoin?

Cross-chain credit requires more than simply reading data from another blockchain.

The destination chain needs a mechanism to verify that the source-chain transaction actually occurred.

The demonstrated architecture is:

```text
Real Source Transaction
        ↓
Source Block
        ↓
Block Attestation
        ↓
Attestcoin Proof
        ↓
Merkle + Continuity Verification
        ↓
Creditcoin Native Verification
        ↓
CreditASC State Update
```

Attestcoin therefore serves as the project's **cross-chain truth layer**.

It is not merely a UI status or a hash stored in application state.

The proof is actually submitted to and processed by the Creditcoin ASC contract.

---

# 20. Why Creditcoin?

Creditcoin provides the destination environment for the credit infrastructure.

The project uses Creditcoin to demonstrate how verified financial activity from another blockchain can become persistent evidence in a credit-oriented execution environment.

The architecture combines:

```text
Cross-Chain Evidence
        +
Cryptographic Verification
        +
AI Credit Intelligence
        +
Deterministic Risk Controls
        +
Creditcoin Execution
```

---

# 21. What Makes It Different?

A basic AI + blockchain application may look like:

```text
User Input
    ↓
AI
    ↓
Recommendation
```

This project is designed as:

```text
Verified Cross-Chain Evidence
              ↓
        Persistent Proof
              ↓
          AI Decision
              ↓
      Deterministic Guard
              ↓
       Controlled Execution
```

The important distinction is the separation between:

```text
TRUTH
  ↓
INTELLIGENCE
  ↓
AUTHORITY
  ↓
EXECUTION
```

Where:

```text
Attestcoin  = Verified Truth
AI          = Decision Intelligence
RiskGuard   = Deterministic Authority
Creditcoin  = Execution Environment
```

---

# 22. Security Philosophy

Autonomous financial agents should not have unrestricted control over capital.

The project therefore separates:

```text
AI Decision
      ↓
Deterministic Policy
      ↓
Execution
```

The AI proposes a decision.

RiskGuard evaluates whether the decision satisfies predefined constraints.

The execution layer is designed to operate only after the required conditions are satisfied.

This creates a bounded architecture for autonomous financial agents.

---

# 23. Smart Contracts

## FinancialActivityEmitter

Location:

```text
contracts/source/FinancialActivityEmitter.sol
```

Functions:

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

---

## CreditASC

Location:

```text
contracts/CreditASC.sol
```

Built on:

```text
@gluwa/asc-contracts
ASCBase
EvmV1Decoder
```

Responsibilities:

```text
Verify Attestcoin Proof
        ↓
Decode Source Receipt
        ↓
Validate Expected Event
        ↓
Extract Borrower
        ↓
Update Verified Evidence
        ↓
Emit CreditEvidenceVerified
```

Supported actions:

```text
REPAYMENT
COLLATERAL
OBLIGATION_FAILURE
```

---

## RiskGuard

Location:

```text
contracts/RiskGuard.sol
```

Responsibilities include:

```text
Maximum Exposure
Collateral Ratio
Maximum Duration
Evidence Verification
Risk Threshold
```

---

# 24. Attestcoin Implementation

The Attestcoin integration is located under:

```text
lib/attestcoin/
```

Important components include:

```text
proof-service.ts
credit-proof.ts
credit-config.ts
credit-worker.ts
```

The implementation performs:

```text
1. Wait for source transaction
2. Detect source block
3. Wait for block attestation
4. Request Attestcoin proof
5. Verify proof using native infrastructure
6. Build CreditASC.execute() calldata
7. Estimate proof execution gas
8. Submit proof to CreditASC
9. Wait for Creditcoin confirmation
10. Persist verified evidence on-chain
```

---

# 25. Real CreditASC Worker

The project includes a server-side worker responsible for processing verified evidence.

Conceptually:

```text
Source Transaction
       ↓
Proof Service
       ↓
Attestcoin Verification
       ↓
Credit Proof Builder
       ↓
CreditASC.execute()
       ↓
Creditcoin Confirmation
```

The worker uses a server-side signer for Creditcoin transactions.

Private keys are never intended to be exposed to the browser or committed to the repository.

---

# 26. Verified Evidence API

The application exposes the verified evidence state for use by the decision layer.

The evidence model includes:

```text
repaymentCount
failedObligations
collateral
activityDays
verified
proofHash
txHash
sourceBlock
verificationStatus
```

Verification status values include:

```text
PENDING
VERIFYING
VERIFIED
FAILED
```

The important distinction is that `VERIFIED` should correspond to an actual successful Attestcoin verification path rather than merely a frontend boolean.

---

# 27. Application Flow

```text
Dashboard
    ↓
Credit Application
    ↓
Wallet Connection
    ↓
Evidence Discovery
    ↓
Source-Chain Transaction
    ↓
Attestcoin Verification
    ↓
CreditASC Verified Evidence
    ↓
AI Credit Agent
    ↓
RiskGuard
    ↓
Creditcoin Execution
    ↓
Credit Line
    ↓
Draw / Repayment
    ↓
Transaction History
```

---

# 28. Frontend

The application is built with Next.js and exposes the major stages of the credit lifecycle.

Conceptual structure:

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

The UI is intentionally designed to make the decision pipeline visible rather than hiding everything behind a single transaction button.

---

# 29. Technology Stack

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
* ethers.js

## Cross-Chain

* Attestcoin Protocol
* `@gluwa/usc-sdk`
* Attestcoin Proof Builder
* Merkle Proofs
* Continuity Proofs
* Creditcoin Native Verification Precompile
* `ASCBase`

## AI / Decisioning

* TypeScript
* Custom Risk Engine
* Deterministic RiskGuard Policies

## Development

* Node.js
* pnpm
* Foundry
* forge-std
* ethers

---

# 30. Project Structure

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
│   │   ├── proof-service.ts
│   │   ├── credit-proof.ts
│   │   ├── credit-config.ts
│   │   └── credit-worker.ts
│   ├── engine/
│   │   └── riskguard.ts
│   └── store/
│
├── contracts/
│   ├── source/
│   │   └── FinancialActivityEmitter.sol
│   ├── CreditASC.sol
│   ├── CreditTypes.sol
│   └── RiskGuard.sol
│
├── script/
│   └── DeployCreditASC.s.sol
│
├── scripts/
│   └── run-credit-proof.ts
│
├── tests/
│
├── agent/
│   └── risk-engine.ts
│
├── public/
├── docs/
│
├── foundry.toml
├── package.json
├── README.md
└── .env.example
```

---

# 31. Getting Started

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

Example:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
CREDITASC_CONTRACT_ADDRESS=YOUR_CREDITASC_ADDRESS
PRIVATE_KEY=YOUR_LOCAL_SERVER_SIDE_KEY
```

Never commit:

```text
.env.local
```

or any private key, seed phrase, wallet password, or other secret.

---

# 32. Run the Application

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# 33. Smart Contract Tests

The project uses Foundry.

Run:

```bash
forge test
```

The current complete test suite covers:

```text
CreditASC
RiskGuard
FinancialActivityEmitter
```

Current test result:

```text
16 passing
```

Coverage includes:

* Repayment recording
* Collateral recording
* Obligation failures
* Multiple financial activities
* Invalid repayment amounts
* Invalid collateral amounts
* CreditASC evidence processing
* RiskGuard policy validation
* Invalid decision scenarios

---

# 34. Build

Build the contracts:

```bash
forge build
```

---

# 35. Type Checking

```bash
pnpm exec tsc --noEmit
```

The current TypeScript implementation passes type checking.

---

# 36. Current Verified Testnet Evidence

## Ethereum Sepolia

### Source Contract

```text
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

### Collateral Transaction

```text
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1
```

Source block:

```text
11704100
```

Collateral:

```text
1499
```

### Repayment Transaction

```text
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5
```

Source block:

```text
11704112
```

Repayment amount:

```text
100
```

---

# 37. Creditcoin Testnet Evidence

## CreditASC

```text
Contract:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

Deployment transaction:

```text
0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f
```

Deployment block:

```text
5497977
```

---

## Collateral Proof Execution

CreditASC transaction:

```text
0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03
```

Creditcoin block:

```text
5498184
```

Result:

```text
collateral = 1499
```

---

## Repayment Proof Execution

CreditASC transaction:

```text
0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5
```

Creditcoin block:

```text
5498192
```

Result:

```text
repaymentCount = 1
```

---

# 38. Final Verified Evidence State

The current CreditASC contract state is:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

The evidence was not simply calculated locally.

It was produced through:

```text
Ethereum Sepolia
      ↓
Real Financial Event
      ↓
Attestcoin Proof
      ↓
Native Cryptographic Verification
      ↓
CreditASC.execute()
      ↓
Creditcoin On-Chain State
```

---

# 39. Current Prototype Status

## Completed

* ✅ Next.js application
* ✅ Credit application workflow
* ✅ EVM wallet connection
* ✅ Financial evidence interface
* ✅ AI risk engine
* ✅ Deterministic RiskGuard logic
* ✅ Credit-line lifecycle UI
* ✅ Draw and repayment workflow
* ✅ Transaction history
* ✅ Ethereum Sepolia source contract
* ✅ Real collateral transaction
* ✅ Real repayment transaction
* ✅ Dynamic source-chain evidence discovery
* ✅ Attestcoin SDK integration
* ✅ Creditcoin block attestation detection
* ✅ Real Attestcoin proof generation
* ✅ Real Attestcoin cryptographic verification
* ✅ CreditASC smart contract
* ✅ CreditASC Foundry tests
* ✅ CreditASC deployment on Creditcoin testnet
* ✅ Real collateral proof execution
* ✅ Real repayment proof execution
* ✅ Persistent verified evidence on Creditcoin
* ✅ Verified collateral: `1499`
* ✅ Verified repayment count: `1`
* ✅ Verified failed obligations: `0`
* ✅ RiskGuard smart contract
* ✅ RiskGuard application logic
* ✅ 16/16 Foundry tests passing
* ✅ TypeScript type checking passing

---

# 40. In Development

The remaining major execution layer is:

```text
AI Decision
     ↓
RiskGuard Validation
     ↓
Creditcoin Credit Execution
     ↓
On-Chain Credit Line
```

Specifically:

* ⏳ Final AI → RiskGuard → Creditcoin credit-execution transaction
* ⏳ Complete autonomous on-chain credit-line lifecycle
* ⏳ Direct application integration of the complete proof worker
* ⏳ Automated verified-evidence ingestion
* ⏳ Additional security hardening
* ⏳ Final hackathon presentation and documentation polish

The project intentionally does not claim a completed on-chain credit issuance transaction until one is actually submitted and independently verifiable.

---

# 41. Verified Demonstration

The strongest currently demonstrated path is:

```text
Ethereum Sepolia
       │
       │ Real Collateral / Repayment
       ▼
FinancialActivityEmitter
       │
       ▼
Source Transaction
       │
       ▼
Attestcoin Proof Builder
       │
       ├── Merkle Proof
       └── Continuity Proof
       │
       ▼
Creditcoin Native Verification
       │
       ▼
       TRUE
       │
       ▼
CreditASC.execute()
       │
       ▼
Verified Evidence State
       │
       ├── Repayments: 1
       ├── Failed Obligations: 0
       └── Collateral: 1499
```

This is the core verified technical milestone of the project.

---

# 42. Why This Matters

The central design principle is:

> **AI should not be trusted with unlimited financial authority.**

Instead:

```text
Attestcoin
    ↓
Verified Truth

AI Agent
    ↓
Decision Intelligence

RiskGuard
    ↓
Deterministic Authority

Creditcoin
    ↓
Controlled Execution
```

The result is a bounded architecture in which:

1. Financial evidence must be verifiable.
2. Verified evidence becomes persistent state.
3. AI reasons over the verified evidence.
4. Deterministic policies constrain the AI.
5. Execution occurs only through the permitted financial infrastructure.

---

# 43. Roadmap

## Phase 1 — Verified Cross-Chain Credit Prototype

* [x] Ethereum Sepolia source contract
* [x] Real financial activity
* [x] Attestcoin proof generation
* [x] Attestcoin cryptographic verification
* [x] CreditASC
* [x] Verified evidence on Creditcoin
* [x] AI credit decisioning
* [x] RiskGuard
* [x] Credit-line frontend

## Phase 2 — Autonomous Worker

* [ ] Continuous source-chain event monitoring
* [ ] Automatic proof generation
* [ ] Automatic proof verification
* [ ] Automatic CreditASC evidence ingestion
* [ ] Retry and failure handling
* [ ] End-to-end automated workflow

## Phase 3 — Controlled Credit Execution

* [ ] AI decision commitment
* [ ] RiskGuard on-chain authorization
* [ ] Creditcoin credit execution
* [ ] On-chain credit-line lifecycle
* [ ] Draw authorization
* [ ] Repayment accounting

## Phase 4 — Production Credit Infrastructure

* [ ] Production-grade contracts
* [ ] Security audit
* [ ] Multiple source chains
* [ ] Additional financial evidence types
* [ ] Stronger risk policies
* [ ] Expanded credit products

---

# 44. Vision

The long-term vision is to build infrastructure for **autonomous financial agents** that can:

```text
Observe verified financial activity
             ↓
      Understand evidence
             ↓
       Make decisions
             ↓
   Operate within policies
             ↓
    Execute controlled actions
```

The broader goal is to make financial intelligence:

* Portable across chains
* Cryptographically verifiable
* Explainable
* Deterministically bounded
* Auditable

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

## BUIDL For The Real World — BUIDL CTC 2026 Fall

**Track:** AI

**Core Ecosystem:** Creditcoin

**Key Protocol:** Attestcoin Protocol

**Project:** Autonomous Cross-Chain Credit Agent

The project demonstrates how real financial activity from one blockchain can be transformed into **cryptographically verified evidence on Creditcoin**, consumed by an AI credit decision layer, constrained by deterministic policies, and ultimately prepared for controlled autonomous credit execution.

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.
