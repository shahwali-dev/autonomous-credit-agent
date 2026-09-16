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

# Table of Contents

* [Overview](#overview)
* [Judge Verification — Start Here](#judge-verification--start-here)
* [Verified Technical Milestone](#verified-technical-milestone)
* [Architecture](#architecture)
* [The Problem](#the-problem)
* [The Solution](#the-solution)
* [Live Application](#live-application)
* [Network Configuration](#network-configuration)
* [Deployment & Contract Addresses](#deployment--contract-addresses)
* [Real Source-Chain Activity](#real-source-chain-activity)
* [Attestcoin Integration](#attestcoin-integration)
* [Real Attestcoin Proof Verification](#real-attestcoin-proof-verification)
* [CreditASC](#creditasc)
* [Real Cross-Chain Proof Executions](#real-cross-chain-proof-executions)
* [Verified On-Chain Evidence State](#verified-on-chain-evidence-state)
* [AI Credit Agent](#ai-credit-agent)
* [RiskGuard](#riskguard)
* [Creditcoin Execution Status](#creditcoin-execution-status)
* [Demo Values vs Verified Blockchain Evidence](#demo-values-vs-verified-blockchain-evidence)
* [End-to-End Workflow](#end-to-end-workflow)
* [Why Attestcoin](#why-attestcoin)
* [Why Creditcoin](#why-creditcoin)
* [Security Philosophy](#security-philosophy)
* [Smart Contracts](#smart-contracts)
* [Attestcoin Implementation](#attestcoin-implementation)
* [Project Structure](#project-structure)
* [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)
* [Testing](#testing)
* [Reproducing the Verified Proof Flow](#reproducing-the-verified-proof-flow)
* [Current Status](#current-status)
* [Roadmap](#roadmap)
* [Vision](#vision)
* [Links](#links)
* [Hackathon](#hackathon)
* [License](#license)

---

# Overview

**Autonomous Cross-Chain Credit Agent** is an AI-powered credit infrastructure prototype that transforms financial activity from one blockchain into:

```text
Real Source-Chain Activity
        ↓
Cryptographically Verified Cross-Chain Evidence
        ↓
Persistent Creditcoin State
        ↓
AI Credit Intelligence
        ↓
Deterministic Risk Validation
        ↓
Controlled Credit Execution
```

The project combines:

* Ethereum Sepolia financial activity
* Attestcoin Protocol
* Creditcoin native proof verification
* A custom Creditcoin ASC contract
* AI-driven credit risk assessment
* Deterministic RiskGuard policies
* Smart-contract-based execution infrastructure

The core design principle is:

> **AI provides intelligence. Deterministic code provides authority.**

---

# Judge Verification — Start Here

The fastest way to verify the core technical claim is to follow one of the two real proof trails below.

## 60–90 Second Verification Path

### 1. Verify the real source transaction

**Collateral transaction — Ethereum Sepolia**

[0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1](https://sepolia.etherscan.io/tx/0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1)

* Block: `11704100`
* Status: `SUCCESS`
* Event: `CollateralRecorded`
* Amount: `1499`

**Repayment transaction — Ethereum Sepolia**

[0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

* Block: `11704112`
* Status: `SUCCESS`
* Event: `RepaymentRecorded`
* Repayment ID: `1`
* Amount: `100`

### 2. Verify the Creditcoin ASC deployment

[CreditASC contract — Creditcoin Testnet](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

* Chain ID: `102031`
* Deployment block: `5497977`

### 3. Verify the collateral proof execution

[CreditASC collateral execution — Creditcoin Blockscout](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)

This transaction corresponds to:

```text
Ethereum collateral transaction
        ↓
Attestcoin proof
        ↓
Native verification
        ↓
CreditASC.execute(action = 2)
        ↓
collateral = 1499
```

Creditcoin block:

```text
5498184
```

### 4. Verify the repayment proof execution

[CreditASC repayment execution — Creditcoin Blockscout](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)

This transaction corresponds to:

```text
Ethereum repayment transaction
        ↓
Attestcoin proof
        ↓
Native verification
        ↓
CreditASC.execute(action = 1)
        ↓
repaymentCount = 1
```

Creditcoin block:

```text
5498192
```

### 5. Verify the resulting CreditASC state

The resulting on-chain evidence state is:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

This is the core independently verifiable technical milestone of the project.

---

# Verified Technical Milestone

The strongest currently demonstrated path is:

```text
Ethereum Sepolia
      │
      │ Real Financial Events
      ▼
FinancialActivityEmitter
      │
      │ Real Transactions
      ▼
Attestcoin Proof Builder
      │
      ├── Merkle Proof
      └── Continuity Proof
      │
      ▼
Creditcoin Native Verification
      │
      │ verifySingle() = true
      ▼
CreditASC.execute()
      │
      ▼
Persistent Creditcoin State
      │
      ├── Repayments: 1
      ├── Failed Obligations: 0
      └── Collateral: 1499
```

The important point is that the cross-chain evidence is not represented only by a frontend boolean.

The proof is:

1. Generated from a real source-chain transaction.
2. Cryptographically verified through Creditcoin's native Attestcoin infrastructure.
3. Submitted to the deployed `CreditASC` contract.
4. Used to update persistent on-chain evidence state.

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
                       │ Cryptographic Verification
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

# The Problem

On-chain financial history is increasingly distributed across multiple blockchain ecosystems.

A borrower may have:

* Repayment history on one chain
* Collateral on another
* Failed obligations somewhere else
* Financial activity that is invisible to a destination credit protocol

This creates several technical problems:

1. How can activity from another blockchain be verified?
2. How can verified evidence become persistent state on the destination chain?
3. How can AI consume that evidence?
4. How can an autonomous AI agent be prevented from having unrestricted financial authority?

The project explores:

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

The system separates the credit process into distinct layers:

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

Each component has a defined responsibility.

### Attestcoin

Provides cryptographically verified cross-chain evidence.

### CreditASC

Processes verified Attestcoin proofs and converts proven source-chain events into persistent verified evidence on Creditcoin.

### AI Credit Agent

Interprets verified financial evidence and produces a structured credit recommendation.

### RiskGuard

Applies deterministic policies that constrain what the AI is allowed to request.

### Creditcoin

Provides the destination environment for controlled credit execution.

---

# Live Application

**Live Demo**

https://autonomous-credit-agent.vercel.app/

**GitHub**

https://github.com/shahwali-dev/autonomous-credit-agent

**Demo Video**

https://youtu.be/lUKRRT1O2_A

---

# Network Configuration

## Ethereum Sepolia

| Parameter | Value                                              |
| --------- | -------------------------------------------------- |
| Network   | Ethereum Sepolia                                   |
| Purpose   | Source-chain financial activity                    |
| Explorer  | [Etherscan Sepolia](https://sepolia.etherscan.io/) |

## Creditcoin Testnet

| Parameter | Value                                                                       |
| --------- | --------------------------------------------------------------------------- |
| Network   | Creditcoin Testnet                                                          |
| Chain ID  | `102031`                                                                    |
| Currency  | CTC                                                                         |
| RPC       | `https://rpc.cc3-testnet.creditcoin.network`                                |
| Explorer  | [Creditcoin Testnet Blockscout](https://creditcoin-testnet.blockscout.com/) |

Creditcoin's EVM testnet uses Blockscout as its EVM block explorer.

---

# Deployment & Contract Addresses

| Network            | Contract                   | Purpose                         | Address                                                                                                                                      |
| ------------------ | -------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Sepolia   | `FinancialActivityEmitter` | Source financial activity       | [`0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d`](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)              |
| Creditcoin Testnet | `CreditASC`                | Verified cross-chain evidence   | [`0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d`](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d) |
| Ethereum Sepolia   | `RiskGuard`                | Deterministic policy validation | [`0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C`](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)              |

> The identical `FinancialActivityEmitter` / `CreditASC` hexadecimal address is not a mistake: these are deployments on different networks.

---

# Real Source-Chain Activity

The project uses a real deployed Solidity contract:

```text
FinancialActivityEmitter
```

Source:

```text
contracts/source/FinancialActivityEmitter.sol
```

The contract records:

```text
Repayments
Collateral
Failed Obligations
Activity Timestamps
```

Supported events:

```text
RepaymentRecorded
CollateralRecorded
ObligationFailureRecorded
ActivityRecorded
```

## Source Contract

[View FinancialActivityEmitter on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

---

## Collateral Transaction

[View collateral transaction on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1)

```text
Transaction:
0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1

Block:
11704100

Amount:
1499

Status:
SUCCESS
```

---

## Repayment Transaction

[View repayment transaction on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

```text
Transaction:
0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5

Block:
11704112

Repayment ID:
1

Amount:
100

Status:
SUCCESS
```

These transactions are real Ethereum Sepolia transactions generated through the deployed source contract.

---

# Dynamic Evidence Discovery

The application can discover borrower activity from the deployed source-chain contract rather than relying exclusively on a hardcoded credit profile.

The intended flow is:

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

# Attestcoin Integration

The project integrates:

```text
@gluwa/usc-sdk
```

Attestcoin is the cross-chain verification layer.

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

The generated proof contains the structured information required by the Creditcoin ASC infrastructure:

* Source chain key
* Source block height
* Encoded transaction
* Merkle root
* Merkle siblings
* Lower endpoint digest
* Continuity roots

---

# Real Attestcoin Proof Generation

The project has successfully generated an Attestcoin proof for a real Ethereum Sepolia repayment transaction.

Source transaction:

[0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

```text
Source block:
11704112

Attestcoin chain key:
1

Proof generation:
SUCCESS
```

The proof was obtained through the Attestcoin Proof Builder after the corresponding source block became attested on Creditcoin.

---

# Real Attestcoin Cryptographic Verification

The generated proof is verified using Creditcoin's native Attestcoin verification infrastructure.

The project calls:

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

The demonstrated verification result was:

```text
true
```

The flow is therefore:

```text
Real Ethereum Transaction
          ↓
    Attestcoin Proof
          ↓
Creditcoin Verification
          ↓
        TRUE
```

This is not a frontend-generated verification flag.

---

# CreditASC

The project implements a custom Creditcoin ASC contract:

```text
CreditASC
```

Source:

```text
contracts/CreditASC.sol
```

CreditASC is built on:

```text
@gluwa/asc-contracts
ASCBase
EvmV1Decoder
```

Its purpose is to take a verified Attestcoin proof and convert the proven source-chain event into persistent verified evidence on Creditcoin.

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

and executes the official:

```solidity
ASCBase.execute(...)
```

verification path.

After verification, the source transaction receipt is decoded and the relevant financial event is extracted.

---

# CreditASC Evidence Actions

CreditASC supports:

```text
1 — REPAYMENT

2 — COLLATERAL

3 — OBLIGATION FAILURE
```

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

This makes Attestcoin part of the actual smart-contract state transition.

---

# CreditASC Deployment

CreditASC is deployed on Creditcoin Testnet.

[View CreditASC on Creditcoin Blockscout](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

```text
Network:
Creditcoin Testnet

Chain ID:
102031

Contract:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d

Deployment transaction:
0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f

Deployment block:
5497977
```

[View deployment transaction](https://creditcoin-testnet.blockscout.com/tx/0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f)

The deployed contract is configured to process evidence originating from:

```text
Ethereum Sepolia FinancialActivityEmitter
```

---

# Real Cross-Chain Proof Executions

## Proof Trail A — Collateral

### Source Event

[View Ethereum source transaction](https://sepolia.etherscan.io/tx/0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1)

```text
Source:
Ethereum Sepolia

Block:
11704100

Event:
CollateralRecorded

Amount:
1499
```

### Attestcoin Verification

```text
Proof generated:
YES

Native verification:
true
```

### CreditASC Execution

[View Creditcoin execution transaction](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)

```text
Action:
2 — COLLATERAL

Creditcoin block:
5498184

Transaction status:
SUCCESS
```

### Result

```text
collateral = 1499
```

---

## Proof Trail B — Repayment

### Source Event

[View Ethereum source transaction](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

```text
Source:
Ethereum Sepolia

Block:
11704112

Event:
RepaymentRecorded

Repayment ID:
1

Amount:
100
```

### Attestcoin Verification

```text
Proof generated:
YES

Native verification:
true
```

### CreditASC Execution

[View Creditcoin execution transaction](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)

```text
Action:
1 — REPAYMENT

Creditcoin block:
5498192

Transaction status:
SUCCESS
```

### Result

```text
repaymentCount = 1
```

---

# Verified On-Chain Evidence State

The resulting CreditASC state is:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

The complete evidence chain is:

```text
┌─────────────────────────────┐
│ Ethereum Sepolia            │
│                             │
│ Collateral: 1499            │
│ Repayment: 100              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Attestcoin                  │
│                             │
│ Transaction Proof           │
│ Merkle Proof                │
│ Continuity Proof            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Creditcoin Native Verifier  │
│                             │
│ verifySingle() = true       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ CreditASC                   │
│                             │
│ execute(...)                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Persistent State            │
│                             │
│ Repayments: 1               │
│ Failed: 0                   │
│ Collateral: 1499            │
└─────────────────────────────┘
```

This state is the strongest currently demonstrated cross-chain milestone.

---

# AI Credit Agent

Once verified evidence is available, the AI credit layer evaluates the borrower's profile.

The risk engine considers:

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

# RiskGuard

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

| Policy                      |          Value |
| --------------------------- | -------------: |
| Maximum Exposure            |       `$5,000` |
| Minimum Collateral Coverage |          `50%` |
| Maximum Duration            |      `90 days` |
| Evidence Verification       |       Required |
| Allowed AI Risk             | `LOW / MEDIUM` |

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

The purpose is to ensure that AI reasoning does not itself constitute unlimited execution authority.

---

# RiskGuard Smart Contract

A Solidity RiskGuard contract has been implemented and deployed on Ethereum Sepolia.

[View RiskGuard on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)

```text
Contract:
0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C

Deployment transaction:
0xe048e13d4d056bafea674337e02359df3719511475cedae2a2c32d419570bfaf
```

[View RiskGuard deployment transaction](https://sepolia.etherscan.io/tx/0xe048e13d4d056bafea674337e02359df3719511475cedae2a2c32d419570bfaf)

The contract and application-level RiskGuard logic have been tested against the defined policy constraints.

---

# Creditcoin Execution Status

Creditcoin is the destination environment for the credit execution layer.

The project currently has a real Creditcoin execution path for **verified cross-chain evidence**:

```text
Attestcoin Proof
      ↓
Creditcoin Verification
      ↓
CreditASC.execute()
      ↓
Persistent Verified Evidence
```

However, the project does **not** claim that an AI-approved credit line has already been issued through a final on-chain Creditcoin lending transaction.

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

* AI → RiskGuard → final Creditcoin credit-execution transaction
* Complete autonomous on-chain credit-line lifecycle
* Automated end-to-end execution
* Final frontend integration of the complete execution path

This distinction is intentional: the README only claims an on-chain lending action when there is a corresponding verifiable transaction hash.

---

# Demo Values vs Verified Blockchain Evidence

The application contains demonstration scenarios for showing the AI decision and credit-line experience.

For example:

```text
Requested Amount: $1,000
Duration: 30 days
Risk: LOW
Confidence: 95%
Recommendation: APPROVE
```

These values belong to the application's demonstration flow.

They are **not** presented as an already completed Creditcoin lending transaction.

The currently verified live blockchain evidence is:

```text
Repayments: 1
Failed Obligations: 0
Collateral: 1499
```

The project intentionally separates:

```text
DEMO / UI STATE
```

from:

```text
VERIFIED ON-CHAIN STATE
```

A completed lending action will only be claimed as on-chain when accompanied by a verifiable transaction.

---

# Credit Line Workflow

The frontend contains a credit-line workflow representing:

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

# End-to-End Workflow

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

# Why Attestcoin?

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

Attestcoin therefore serves as the project's:

> **Cross-chain truth layer**

It is not merely:

* a frontend status
* a manually entered proof hash
* a centralized API response
* a value stored only in application state

The proof is actually submitted to and processed by the deployed Creditcoin ASC contract.

---

# Why Creditcoin?

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

# Security Philosophy

Autonomous financial agents should not have unrestricted control over capital.

The project therefore separates:

```text
AI Decision
      ↓
Deterministic Policy
      ↓
Execution
```

The AI proposes.

RiskGuard validates.

The execution layer is intended to operate only after the required conditions are satisfied.

The architectural separation is:

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

---

# Smart Contracts

## FinancialActivityEmitter

Source:

```text
contracts/source/FinancialActivityEmitter.sol
```

Network:

```text
Ethereum Sepolia
```

[View contract on Etherscan](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

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

Source:

```text
contracts/CreditASC.sol
```

Network:

```text
Creditcoin Testnet
```

[View contract on Blockscout](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

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

Source:

```text
contracts/RiskGuard.sol
```

Network:

```text
Ethereum Sepolia
```

[View contract on Etherscan](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)

Responsibilities:

```text
Maximum Exposure
Collateral Ratio
Maximum Duration
Evidence Verification
Risk Threshold
```

---

# Attestcoin Implementation

The Attestcoin integration is located under:

```text
lib/attestcoin/
```

Important components:

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

The proof payload follows the Creditcoin ASC proof structure:

```text
chainKey
headerNumber
txBytes
merkleProof.root
merkleProof.siblings
continuityProof.lowerEndpointDigest
continuityProof.roots
```

---

# Real CreditASC Worker

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

Private keys are not exposed to the browser and must never be committed to the repository.

---

# Verified Evidence API

The application's evidence model includes:

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

Verification states:

```text
PENDING
VERIFYING
VERIFIED
FAILED
```

The important distinction is that a `VERIFIED` result is intended to correspond to a successful Attestcoin verification path rather than merely a manually assigned frontend boolean.

---

# Application Flow

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

# Frontend

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

The UI is designed to make the decision pipeline visible rather than hiding everything behind a single transaction button.

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

or any:

```text
Private key
Seed phrase
Wallet password
API secret
```

---

# Run the Application

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# Testing

## Foundry Tests

Run:

```bash
forge test -vv
```

Current result:

```text
16 passing
0 failing
```

The suite covers:

```text
RiskGuardTest
CreditASCTest
FinancialActivityEmitterTest
```

Including:

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

# Type Checking

Run:

```bash
pnpm exec tsc --noEmit
```

Current result:

```text
PASS
```

---

# Production Build

Run:

```bash
pnpm run build
```

The project uses the Next.js production build.

The current deployed application is built successfully through Vercel.

---

# Reproducing the Verified Proof Flow

The repository includes the proof-processing worker:

```text
lib/attestcoin/credit-worker.ts
```

and a runner:

```text
scripts/run-credit-proof.ts
```

The worker performs:

```text
Source transaction
      ↓
Wait for confirmation
      ↓
Determine source block
      ↓
Wait for Creditcoin attestation
      ↓
Generate Attestcoin proof
      ↓
Verify proof natively
      ↓
Build CreditASC calldata
      ↓
Estimate gas
      ↓
Submit CreditASC.execute()
      ↓
Wait for Creditcoin confirmation
```

The demonstrated collateral proof execution used:

```text
Action = 2
```

The demonstrated repayment proof execution used:

```text
Action = 1
```

A reproduced execution should always produce a new transaction hash that can be independently checked on the appropriate explorer.

---

# Current Verified Testnet Evidence

## Ethereum Sepolia

### Source Contract

[FinancialActivityEmitter](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

```text
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
```

### Collateral

[Transaction](https://sepolia.etherscan.io/tx/0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1)

```text
Block: 11704100
Amount: 1499
Status: SUCCESS
```

### Repayment

[Transaction](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

```text
Block: 11704112
Repayment ID: 1
Amount: 100
Status: SUCCESS
```

---

# Creditcoin Testnet Evidence

## CreditASC

[Contract](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

```text
Chain ID: 102031

Contract:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d

Deployment block:
5497977
```

### Deployment

[View deployment transaction](https://creditcoin-testnet.blockscout.com/tx/0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f)

```text
0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f8155baf64103de48403f
```

---

## Collateral Proof Execution

[View CreditASC transaction](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)

```text
0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03

Block:
5498184

Action:
2 — COLLATERAL

Result:
collateral = 1499
```

---

## Repayment Proof Execution

[View CreditASC transaction](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)

```text
0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5

Block:
5498192

Action:
1 — REPAYMENT

Result:
repaymentCount = 1
```

---

# Evidence Chain — Claim → Evidence → Verification

The project is intentionally structured so that important claims can be checked directly.

| Claim                     | Evidence                          | Verification                                                                                                                  |
| ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Real collateral exists    | Ethereum Sepolia transaction      | [Etherscan](https://sepolia.etherscan.io/tx/0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1)               |
| Real repayment exists     | Ethereum Sepolia transaction      | [Etherscan](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)               |
| CreditASC is deployed     | Contract address + deployment tx  | [Blockscout](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)                    |
| Collateral proof executed | Creditcoin transaction            | [Blockscout](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03) |
| Repayment proof executed  | Creditcoin transaction            | [Blockscout](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5) |
| RiskGuard deployed        | Contract + deployment transaction | [Etherscan](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)                                  |
| Source contract deployed  | Contract address                  | [Etherscan](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)                                  |

---

# Final Verified Evidence State

Current CreditASC state:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

The evidence was produced through:

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

# Current Status

## Completed

* [x] Next.js application
* [x] Credit application workflow
* [x] EVM wallet connection
* [x] Financial evidence interface
* [x] AI risk engine
* [x] Deterministic RiskGuard logic
* [x] Credit-line lifecycle UI
* [x] Draw and repayment workflow
* [x] Transaction history
* [x] Ethereum Sepolia source contract
* [x] Real collateral transaction
* [x] Real repayment transaction
* [x] Dynamic source-chain evidence discovery
* [x] Attestcoin SDK integration
* [x] Creditcoin block attestation detection
* [x] Real Attestcoin proof generation
* [x] Real Attestcoin cryptographic verification
* [x] CreditASC smart contract
* [x] CreditASC Foundry tests
* [x] CreditASC deployment on Creditcoin Testnet
* [x] Real collateral proof execution
* [x] Real repayment proof execution
* [x] Persistent verified evidence on Creditcoin
* [x] Verified collateral: `1499`
* [x] Verified repayment count: `1`
* [x] Verified failed obligations: `0`
* [x] RiskGuard smart contract
* [x] RiskGuard application logic
* [x] 16/16 Foundry tests passing
* [x] TypeScript type checking passing
* [x] Production Next.js build passing
* [x] Vercel deployment

---

# In Development

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

* [ ] Final AI → RiskGuard → Creditcoin credit-execution transaction
* [ ] Complete autonomous on-chain credit-line lifecycle
* [ ] Direct application integration of the complete proof worker
* [ ] Automated verified-evidence ingestion
* [ ] Continuous source-chain monitoring
* [ ] Retry and failure handling
* [ ] Additional security hardening
* [ ] Production-grade security audit
* [ ] Final hackathon presentation polish

The project intentionally does not claim a completed on-chain credit issuance transaction until one is actually submitted and independently verifiable.

---

# Roadmap

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

# Vision

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

# Links

### Live Application

https://autonomous-credit-agent.vercel.app/

### GitHub Repository

https://github.com/shahwali-dev/autonomous-credit-agent

### Demo Video

https://youtu.be/lUKRRT1O2_A

### Ethereum Sepolia Explorer

https://sepolia.etherscan.io/

### Creditcoin Testnet Explorer

https://creditcoin-testnet.blockscout.com/

---

# Hackathon

## BUIDL For The Real World — BUIDL CTC 2026 Fall

```text
Track:
AI

Core Ecosystem:
Creditcoin

Key Protocol:
Attestcoin Protocol

Project:
Autonomous Cross-Chain Credit Agent
```

The project demonstrates how real financial activity from one blockchain can be transformed into:

```text
Cryptographically Verified Evidence
        ↓
Persistent Creditcoin State
        ↓
AI Credit Decisioning
        ↓
Deterministic Risk Controls
        ↓
Controlled Credit Execution
```

The currently demonstrated on-chain milestone is the complete:

```text
Source Transaction
        ↓
Attestcoin Proof
        ↓
Native Verification
        ↓
CreditASC.execute()
        ↓
Persistent Verified Evidence
```

The final autonomous credit issuance layer remains in development and is explicitly identified as such.

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.
