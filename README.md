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
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

## Overview

**Autonomous Cross-Chain Credit Agent** is an AI-powered credit infrastructure prototype that transforms financial activity from another blockchain into an autonomous credit decision and execution flow on Creditcoin.

The system combines:

```text
Cross-Chain Financial Evidence
            ↓
      Attestcoin Layer
            ↓
      AI Credit Agent
            ↓
        RiskGuard
            ↓
   Creditcoin Execution
            ↓
        Credit Line
````

The goal is to demonstrate how verified financial evidence can be used by an autonomous agent to make bounded credit decisions without giving the AI unrestricted authority over execution.

---

## The Problem

Traditional on-chain credit systems face several challenges:

* Financial history may exist across different blockchains.
* Borrowers often rely on manually submitted financial information.
* Cross-chain data requires a trustworthy verification mechanism.
* AI-generated financial decisions need deterministic safety boundaries.
* Autonomous agents require controlled access to financial execution.

This creates a gap between **cross-chain financial activity** and **autonomous credit decisioning**.

---

## The Solution

Autonomous Cross-Chain Credit Agent connects these components into one workflow.

The system evaluates financial evidence such as:

* Repayment history
* Failed obligations
* Verified collateral
* Financial activity duration
* Source-chain activity

The evidence is passed through the Attestcoin verification architecture and made available to the AI Credit Agent.

The AI produces:

* Risk level
* Confidence score
* Recommended credit amount
* Recommended duration
* Approval or rejection recommendation
* Decision reasoning

Before execution, **RiskGuard** validates the AI recommendation against deterministic safety policies.

---

# Architecture

```text
┌───────────────────────────────────────┐
│             SOURCE CHAIN              │
│                                       │
│  Repayments   Collateral   Activity   │
│  Failed Obligations                   │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│              ATTESTCOIN               │
│                                       │
│  Cross-chain verification layer       │
│  Proof Builder / Attestation flow     │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│           AI CREDIT AGENT             │
│                                       │
│  Risk Assessment                      │
│  Confidence                           │
│  Credit Recommendation                │
│  Approval / Rejection                 │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│               RISKGUARD               │
│                                       │
│  Maximum Exposure                     │
│  Collateral Coverage                  │
│  Maximum Duration                     │
│  Evidence Verification                │
│  Risk Threshold                       │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│              CREDITCOIN               │
│                                       │
│  Credit Execution Flow                │
│  Credit Line Management               │
│  Draws / Repayments                   │
└───────────────────────────────────────┘
```

---

# How It Works

### 1. Financial Activity

The prototype includes a `FinancialActivityEmitter` smart contract that records borrower activity on the source chain.

Supported activities include:

```text
Repayments
Collateral
Failed Obligations
Activity Timestamps
```

The contract emits events that can be used as source-chain financial evidence.

---

### 2. Attestcoin Verification

Attestcoin provides the cross-chain verification layer in the architecture.

The project integrates the official:

```text
@gluwa/usc-sdk
```

The integration is structured around the Attestcoin proof-generation and verification workflow.

The intended pipeline is:

```text
Source Transaction
        ↓
Source Chain RPC
        ↓
Attestcoin Proof Builder
        ↓
Creditcoin Attestation
        ↓
Proof Data
        ↓
Verification Infrastructure
        ↓
Verified Cross-Chain Evidence
```

---

### 3. AI Credit Agent

The AI Credit Agent evaluates the available financial evidence.

The current risk engine considers:

```text
Repayment Count
Failed Obligations
Collateral Ratio
Activity Duration
Evidence Verification
```

It produces a structured decision:

```text
Risk
Confidence
Recommended Amount
Recommended Duration
Approval / Rejection
Reasoning
```

The current prototype supports:

```text
LOW
MEDIUM
HIGH
```

---

### 4. RiskGuard

The AI does not have unlimited execution authority.

RiskGuard acts as a deterministic safety layer between AI decisioning and execution.

It validates:

```text
Maximum Credit Exposure
Collateral Coverage
Maximum Duration
Evidence Verification
Risk Threshold
```

Only decisions that satisfy the predefined policies are allowed to continue through the execution flow.

---

### 5. Creditcoin

After the AI recommendation passes RiskGuard policies, the system moves into the Creditcoin execution flow.

The prototype manages:

* Credit limit
* Available credit
* Used credit
* Outstanding balance
* Draws
* Repayments
* Transaction history

---

# Example Credit Decision

The demonstration scenario uses:

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

The recommendation then passes through RiskGuard before entering the Creditcoin execution flow.

---

# Credit Line Lifecycle

### Initial Credit Line

```text
Credit Limit:     $1,000
Used:             $0
Available:        $1,000
Outstanding:      $0
```

### After $500 Draw

```text
Credit Limit:     $1,000
Used:             $500
Available:        $500
Outstanding:      $500
Utilization:      50%
```

### After $200 Repayment

```text
Credit Limit:     $1,000
Used:             $300
Available:        $700
Outstanding:      $300
```

---

# Attestcoin Integration

The project uses:

```text
@gluwa/usc-sdk
```

The Attestcoin integration is located under:

```text
lib/attestcoin/
```

The proof service handles the proof-generation workflow:

```text
1. Wait for source transaction
2. Detect source block
3. Wait for block attestation
4. Request proof from Proof Builder
5. Return proof data
6. Pass proof data to verification flow
```

### Environment Configuration

Create a `.env.local` file:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

> **Never commit `.env.local`, private keys, seed phrases, or other secrets.**

---

# Smart Contracts

## FinancialActivityEmitter

Location:

```text
contracts/source/FinancialActivityEmitter.sol
```

The contract records financial activity for borrowers.

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

---

# AI Risk Engine

Location:

```text
agent/risk-engine.ts
```

The risk engine calculates a bounded credit recommendation based on financial evidence.

Conceptually:

```text
Repayment History
        +
Failed Obligations
        +
Collateral Coverage
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
Evidence Selection
    ↓
Cross-Chain Evidence
    ↓
Attestcoin Verification Layer
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

The interface is designed to make the autonomous decision pipeline visible rather than hiding it behind a single transaction button.

---

# Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Zustand

### Blockchain

* Solidity
* Foundry
* Ethereum Sepolia
* Creditcoin Testnet
* EVM Wallets

### Cross-Chain

* Attestcoin Protocol
* `@gluwa/usc-sdk`
* Attestcoin Proof Builder
* Creditcoin verification infrastructure

### AI / Decisioning

* TypeScript
* Custom Risk Engine
* Deterministic Policy Validation

### Development

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

Make sure the following are installed:

* Node.js
* pnpm
* Foundry
* MetaMask or another EVM wallet

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

Then add:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

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

The project uses Foundry for smart contract testing.

Run:

```bash
forge test
```

The current test suite covers:

* Repayment recording
* Collateral recording
* Obligation failures
* Multiple financial activities
* Invalid repayment amounts
* Invalid collateral amounts

---

# Build

Build the smart contracts with:

```bash
forge build
```

---

# Type Checking

Run:

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

RiskGuard evaluates whether that decision satisfies predefined safety constraints.

This separation provides a controlled boundary between probabilistic AI reasoning and deterministic financial execution.

---

# Why Attestcoin?

Cross-chain financial applications need a trustworthy mechanism for bringing information from one blockchain into another execution environment.

Attestcoin provides the cross-chain verification infrastructure used by this architecture.

The resulting data pipeline is:

```text
Source-Chain Activity
        ↓
     Attestcoin
        ↓
Verified Evidence
        ↓
   AI Decision
```

Attestcoin is therefore a core part of the project's architecture rather than an optional add-on.

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

### Implemented

* Next.js product interface
* Credit application flow
* EVM wallet connection
* Financial evidence interface
* AI risk engine
* Deterministic RiskGuard logic
* Credit-line lifecycle
* Draw and repayment flow
* Transaction history
* Financial activity source contract
* Foundry test suite
* Attestcoin SDK integration
* Creditcoin testnet RPC configuration
* Attestcoin proof-service infrastructure

### In Progress

* Full end-to-end Attestcoin proof verification pipeline
* Automated verified-evidence ingestion
* Production-grade Creditcoin smart-contract execution
* Automated worker flow
* Additional security hardening

> The current application is a hackathon prototype. UI flows and local prototype execution should not be interpreted as proof of a production lending system.

---

# Demo

### Live Application

[https://autonomous-credit-agent.vercel.app/](https://autonomous-credit-agent.vercel.app/)

### GitHub

[https://github.com/shahwali-dev/autonomous-credit-agent](https://github.com/shahwali-dev/autonomous-credit-agent)

### Demo Video

https://youtu.be/lUKRRT1O2_A

---

# Hackathon

Built for:

## BUIDL CTC 2026 — BUIDL For The Real World

**Track:** AI

The project focuses on AI-powered credit decisioning using verified cross-chain financial evidence and controlled on-chain execution.

---

# Roadmap

### Phase 1 — Hackathon Prototype

* Cross-chain financial evidence
* Attestcoin integration
* AI credit decisioning
* RiskGuard
* Credit-line management
* Creditcoin testnet execution flow

### Phase 2 — Autonomous Worker

* Source-chain event monitoring
* Automated proof generation
* Automated proof submission
* Verified evidence ingestion
* Retry and failure handling

### Phase 3 — Production Credit Infrastructure

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
Autonomous Execution
```

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---
