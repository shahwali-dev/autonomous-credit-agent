# Autonomous Cross-Chain Credit Agent

<p align="center">
  <strong>AI-powered cross-chain credit infrastructure that turns cryptographically verified financial activity into real Creditcoin credit execution.</strong>
</p>

<p align="center">
  <a href="https://autonomous-credit-agent.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/shahwali-dev/autonomous-credit-agent">GitHub</a>
  ·
  <a href="https://youtu.be/oMpFVnARkwk">Demo Video</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/BUIDL%20CTC-2026-blue" alt="BUIDL CTC 2026">
  <img src="https://img.shields.io/badge/Track-AI-purple" alt="AI Track">
  <img src="https://img.shields.io/badge/Creditcoin-Testnet-orange" alt="Creditcoin Testnet">
  <img src="https://img.shields.io/badge/Attestcoin-Verified-success" alt="Attestcoin Verified">
  <img src="https://img.shields.io/badge/Loan%20%231-Funded-brightgreen" alt="Loan 1 Funded">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

# Table of Contents

* [Overview](#overview)
* [Judge Verification — Start Here](#judge-verification--start-here)
* [The Core Achievement](#the-core-achievement)
* [Architecture](#architecture)
* [The Problem](#the-problem)
* [The Solution](#the-solution)
* [Live Application](#live-application)
* [Network Configuration](#network-configuration)
* [Deployed Contracts](#deployed-contracts)
* [Real Borrower Evidence](#real-borrower-evidence)
* [Attestcoin Integration](#attestcoin-integration)
* [CreditASC](#creditasc)
* [AI Credit Agent](#ai-credit-agent)
* [RiskGuard](#riskguard)
* [Real Creditcoin Loan Infrastructure](#real-creditcoin-loan-infrastructure)
* [Loan #1 — Complete On-Chain Lifecycle](#loan-1--complete-on-chain-lifecycle)
* [Funding Proof — Attestcoin → Creditcoin](#funding-proof--attestcoin--creditcoin)
* [Final Loan Status](#final-loan-status)
* [Complete Evidence Chain](#complete-evidence-chain)
* [Security Architecture](#security-architecture)
* [Frontend & User Experience](#frontend--user-experience)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Testing](#testing)
* [Reproducing the Proof Flow](#reproducing-the-proof-flow)
* [Verification Matrix](#verification-matrix)
* [Current System Status](#current-system-status)
* [Production Extensions](#production-extensions)
* [Vision](#vision)
* [Links](#links)
* [Hackathon](#hackathon)
* [License](#license)

---

# Overview

**Autonomous Cross-Chain Credit Agent** is an AI-powered credit infrastructure prototype that connects:

```text
Ethereum Sepolia
        ↓
Real Financial Activity
        ↓
Attestcoin Cryptographic Verification
        ↓
Creditcoin Verified Evidence
        ↓
AI Credit Decision
        ↓
Deterministic RiskGuard
        ↓
Real Creditcoin Loan Execution
        ↓
Attestcoin Funding Proof
        ↓
On-Chain Funded Loan
```

The project demonstrates how financial activity originating on one blockchain can become trusted evidence and ultimately support a real credit execution flow on another blockchain.

The core design principle is:

> **Attestcoin provides the truth. AI provides the intelligence. RiskGuard provides deterministic safety. Creditcoin provides execution.**

---

# Judge Verification — Start Here

If you are a judge and want to verify the project quickly, the following links provide the shortest path from source-chain activity to the final funded Creditcoin loan.

## 1. Source-chain financial activity

### Borrower collateral

[View real collateral transaction on Ethereum Sepolia](https://sepolia.etherscan.io/tx/0xac5418a7f9293ad89de92ffd7c46066cb4292f9e8d26f0a50f6886953206f34a)

```text
Event:
CollateralRecorded

Amount:
1499

Block:
11725413

Status:
SUCCESS
```

### Borrower repayment

[View real repayment transaction on Ethereum Sepolia](https://sepolia.etherscan.io/tx/0x5949ebb3b25e8776297bfcff0b9fd953d34b6a552a27094e4786ea109210136c)

```text
Event:
RepaymentRecorded

Repayment ID:
1

Amount:
100

Block:
11725417

Status:
SUCCESS
```

---

# 2. Creditcoin verified evidence

The deployed CreditASC contract processes Attestcoin proofs and stores verified financial evidence on Creditcoin.

[View CreditASC on Creditcoin Blockscout](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

```text
Chain ID:
102031

CreditASC:
0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d

Deployment block:
5497977
```

Historical verified proof executions are also available:

### Verified collateral

[Creditcoin collateral proof execution](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)

```text
Action:
2 — COLLATERAL

Creditcoin block:
5498184

Verified collateral:
1499
```

### Verified repayment

[Creditcoin repayment proof execution](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)

```text
Action:
1 — REPAYMENT

Creditcoin block:
5498192

Verified repayment count:
1
```

---

# 3. Real Creditcoin loan registration

Loan #1 was registered on the deployed `ASCLoanManager`.

[View Loan #1 registration on Creditcoin](https://creditcoin-testnet.blockscout.com/tx/0x4a6b7de43c20969703a1b84170c70e2abd59f07c8cbb5a4287197e068c310d40)

```text
Loan ID:
1

Loan amount:
700 TEST

Interest:
5%

Expected repayment:
735 TEST

Duration:
~30 days

Status after registration:
Created
```

---

# 4. Real source-chain loan funding

The official Creditcoin loan flow was used to fund the loan through the source-chain loan contract.

### Register funding

[Register Loan #1 funding](https://eth-sepolia.blockscout.com/tx/0x109695384f1b63ecc1228eb7087cc066e23ac8965a24930b8537b238b86d1aac)

### ERC20 approval

[View TEST token approval](https://eth-sepolia.blockscout.com/tx/0x180a31de7c5f1c33dfbf0aeb44b0652bad134ff959c258658726d7b25865b330)

### Actual 700 TEST funding

[View real Loan #1 funding transaction](https://eth-sepolia.blockscout.com/tx/0xd303577e6021927677745a32e432a6f58e9446e48991a7e0364ef349544426c7)

```text
Loan:
#1

Amount:
700 TEST

From:
Lender

To:
Borrower

Status:
SUCCESS
```

---

# 5. Attestcoin funding proof

The source-chain funding transaction was then processed through Attestcoin.

[View funding proof submission on Creditcoin](https://creditcoin-testnet.blockscout.com/tx/0xacd75d9c33b64d58ffe07ecc6dff8b5085220a1d2496f26959409619b47540e8)

```text
Source block:
11725463

Attestcoin proof:
Generated successfully

Proof submission:
SUCCESS

Creditcoin block:
5505285
```

---

# 6. Final on-chain loan status

The final on-chain read from `ASCLoanManager.getLoanOrder(1)` returned:

```text
Loan ID:
1

Status:
1

Status meaning:
Funded

Loan amount:
700000000000000000000

Repaid amount:
0
```

Therefore:

> **Loan #1 is definitively `Funded` on Creditcoin Testnet.**

This is not a frontend status.

It is the result of the deployed Creditcoin loan manager's actual on-chain state.

---

# The Core Achievement

The project now demonstrates the following complete technical pipeline:

```text
┌──────────────────────────────────────────────┐
│ Ethereum Sepolia                             │
│                                              │
│ Real borrower financial activity             │
│                                              │
│ Collateral = 1499                            │
│ Repayment = 100                              │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Attestcoin                                   │
│                                              │
│ Block attestation                            │
│ Transaction proof                            │
│ Merkle proof                                 │
│ Continuity proof                             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Creditcoin Native Verification               │
│                                              │
│ Cryptographic proof verification             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ CreditASC                                    │
│                                              │
│ Verified evidence → persistent state         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ AI Credit Agent                              │
│                                              │
│ Risk assessment                              │
│ Credit recommendation                        │
│ Duration recommendation                      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ RiskGuard                                    │
│                                              │
│ Deterministic policy validation              │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Creditcoin Loan Infrastructure               │
│                                              │
│ Loan registration                            │
│ Source-chain funding                         │
│ Funding proof                                │
│                                              │
│ Loan #1 = FUNDED                             │
└──────────────────────────────────────────────┘
```

The important distinction is that the system is not merely an AI dashboard.

It contains real smart contracts, real source-chain transactions, real Attestcoin proofs, real Creditcoin transactions, and a real funded loan state.

---

# Architecture

```text
                    ┌──────────────────────┐
                    │   Ethereum Sepolia   │
                    │                      │
                    │ Financial Activity   │
                    │ Collateral           │
                    │ Repayments           │
                    │ Obligations          │
                    └──────────┬───────────┘
                               │
                               │ Real transaction
                               ▼
                    ┌──────────────────────┐
                    │      Attestcoin      │
                    │                      │
                    │ Block Attestation    │
                    │ Transaction Proof    │
                    │ Merkle Proof         │
                    │ Continuity Proof     │
                    └──────────┬───────────┘
                               │
                               │ Cryptographic verification
                               ▼
                    ┌──────────────────────┐
                    │     Creditcoin       │
                    │                      │
                    │ CreditASC            │
                    │ Native Verification  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Verified Evidence    │
                    │                      │
                    │ Repayments           │
                    │ Collateral           │
                    │ Obligations          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    AI Credit Agent   │
                    │                      │
                    │ Risk                 │
                    │ Confidence           │
                    │ Credit Amount        │
                    │ Duration             │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      RiskGuard       │
                    │                      │
                    │ Deterministic Policy │
                    │ Validation            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Creditcoin Loan      │
                    │ Infrastructure       │
                    │                      │
                    │ Register             │
                    │ Fund                 │
                    │ Prove                │
                    │ Execute              │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Loan #1          │
                    │                      │
                    │ 700 TEST             │
                    │ Status: FUNDED       │
                    └──────────────────────┘
```

---

# The Problem

On-chain financial history is distributed across blockchain ecosystems.

A borrower can have:

* repayment history on Ethereum
* collateral on another chain
* failed obligations elsewhere
* valuable financial activity that a destination lending protocol cannot natively trust

Traditional applications often solve this through centralized APIs or manually supplied data.

That creates a trust problem:

```text
Who says the financial history is real?
```

This project explores a different architecture:

```text
Source-chain activity
        ↓
Cryptographic proof
        ↓
Destination-chain verification
        ↓
AI decisioning
        ↓
Deterministic authorization
        ↓
On-chain execution
```

---

# The Solution

The system divides responsibility into explicit layers.

## 1. Observe

Read real source-chain financial activity.

## 2. Verify

Use Attestcoin to cryptographically prove that the source-chain transaction occurred.

## 3. Record

Convert verified events into persistent Creditcoin evidence.

## 4. Analyze

The AI credit agent evaluates the verified evidence.

## 5. Validate

RiskGuard applies deterministic policy constraints.

## 6. Execute

Creditcoin loan infrastructure performs the actual credit operation.

This creates:

```text
OBSERVE
   ↓
VERIFY
   ↓
RECORD
   ↓
ANALYZE
   ↓
VALIDATE
   ↓
EXECUTE
```

---

# Live Application

### Live Demo

https://autonomous-credit-agent.vercel.app/

### GitHub

https://github.com/shahwali-dev/autonomous-credit-agent

### Demo Video

https://youtu.be/oMpFVnARkwk

---

# Network Configuration

## Ethereum Sepolia

| Parameter | Value                                              |
| --------- | -------------------------------------------------- |
| Network   | Ethereum Sepolia                                   |
| Chain ID  | `11155111`                                         |
| Role      | Source financial activity + loan funding           |
| Explorer  | [Etherscan Sepolia](https://sepolia.etherscan.io/) |

## Creditcoin Testnet

| Parameter | Value                                                               |
| --------- | ------------------------------------------------------------------- |
| Network   | Creditcoin Testnet                                                  |
| Chain ID  | `102031`                                                            |
| Role      | Verified evidence + loan manager                                    |
| RPC       | `https://rpc.cc3-testnet.creditcoin.network`                        |
| Explorer  | [Creditcoin Blockscout](https://creditcoin-testnet.blockscout.com/) |

## Attestcoin

| Parameter        | Value                                            |
| ---------------- | ------------------------------------------------ |
| Source chain key | `1`                                              |
| Source chain     | Ethereum Sepolia                                 |
| Proof builder    | `https://prover.cc3-testnet.creditcoin.network/` |

The project uses the current Creditcoin USC/Attestcoin SDK architecture rather than the older pre-native-verifier flow. The official Creditcoin examples also expose the loan lifecycle through `authorize`, `register_source_contract`, `register_loan`, `fund_loan`, and repayment tooling.
Reference: [Gluwa USC Testnet Bridge Examples](https://github.com/gluwa/usc-testnet-bridge-examples).

---

# Deployed Contracts

## Ethereum Sepolia

### FinancialActivityEmitter

`0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d`

[View on Etherscan](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

Purpose:

```text
Repayments
Collateral
Obligation failures
Activity timestamps
```

---

### RiskGuard

`0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C`

[View on Etherscan](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)

[View deployment transaction](https://sepolia.etherscan.io/tx/0xe048e13d4d056bafea674337e02359df3719511475cedae2a2c32d419570bfaf)

Purpose:

```text
Maximum exposure
Collateral coverage
Maximum duration
Evidence verification
Risk threshold
```

---

### TestERC20

`0xA57804f8C52a0106571288B82E3526c5584C81d5`

Purpose:

```text
TEST token used by the real Creditcoin loan-flow demonstration
```

---

### AuxiliaryLoanContract

`0xd88b23BBB4AD3217dB650D1850d2a7A95c56E9EA`

[View on Etherscan](https://sepolia.etherscan.io/address/0xd88b23BBB4AD3217dB650D1850d2a7A95c56E9EA)

Purpose:

```text
Source-chain loan funding
Loan fund registration
ERC20 transfer
LoanFunded event
```

Deployment transaction:

[View deployment](https://sepolia.etherscan.io/tx/0xd7b87f643d2d897fecfb5d886c067cd916ebfa950fdc4f4b4c4c7f79cde12e4c)

---

# Creditcoin Testnet

## CreditASC

`0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d`

[View CreditASC](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

Deployment:

[View deployment transaction](https://creditcoin-testnet.blockscout.com/tx/0x3f92d3c96e21044efd353357e7925d4d9b9e31cb2f1f815b5af64103de48403f)

```text
Deployment block:
5497977
```

---

## ASCLoanManager

`0xeC94BCe03B15c4721DB4468a071B566130ac2766`

[View ASCLoanManager](https://creditcoin-testnet.blockscout.com/address/0xeC94BCe03B15c4721DB4468a071B566130ac2766)

Purpose:

```text
Loan registration
Loan state management
Loan funding verification
Loan repayment state
Cross-chain loan lifecycle
```

Deployment transaction:

[View deployment transaction](https://creditcoin-testnet.blockscout.com/tx/0x3c7ce2ba806652278fe964e582ec4cae269143d5f0b41fba4c698e8f4da71028)

---

# Real Borrower Evidence

The source-chain contract is capable of recording:

```text
Repayments
Collateral
Failed obligations
Activity timestamps
```

The current borrower-owned source-chain state was created through real transactions.

## Borrower collateral

[View transaction](https://eth-sepolia.blockscout.com/tx/0xac5418a7f9293ad89de92ffd7c46066cb4292f9e8d26f0a50f6886953206f34a)

```text
Collateral:
1499

Block:
11725413

Status:
SUCCESS
```

## Borrower repayment

[View transaction](https://eth-sepolia.blockscout.com/tx/0x5949ebb3b25e8776297bfcff0b9fd953d34b6a552a27094e4786ea109210136c)

```text
Repayment ID:
1

Amount:
100

Block:
11725417

Status:
SUCCESS
```

Read-only contract verification produced:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

This is directly read from the deployed source contract.

---

# Attestcoin Integration

Attestcoin is the project's cross-chain trust layer.

The implementation uses:

```text
@gluwa/usc-sdk
```

and the Creditcoin native proof-verification architecture.

The official Attestcoin examples describe the same general architecture of moving source-chain data into Creditcoin through ASC contracts and proof verification.
Reference: [Gluwa Attestcoin Protocol Examples](https://github.com/gluwa/attestcoin-protocol-examples).

The project's flow is:

```text
Ethereum transaction
        ↓
Source block
        ↓
Creditcoin attestation
        ↓
Attestcoin Proof Builder
        ↓
Transaction proof
        ↓
Merkle proof
        ↓
Continuity proof
        ↓
Creditcoin native verification
        ↓
CreditASC
```

---

# Real Attestcoin Proof

A real Ethereum Sepolia transaction was successfully processed through the Attestcoin proof pipeline.

The demonstrated repayment proof was generated from:

[Repayment transaction](https://sepolia.etherscan.io/tx/0x0e70933bde51ea11af6f153d1f0489d83a8fb7a363697512807644e059241eb5)

```text
Source block:
11704112

Chain key:
1

Proof:
Generated successfully
```

The proof contains:

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

# CreditASC

CreditASC is the custom destination-chain ASC contract.

Source:

```text
contracts/CreditASC.sol
```

It is built around:

```text
ASCBase
EvmV1Decoder
Creditcoin native verification
```

Its responsibility is:

```text
Receive proof
     ↓
Verify source-chain transaction
     ↓
Decode proven receipt
     ↓
Identify expected event
     ↓
Extract financial evidence
     ↓
Update persistent state
```

Supported evidence actions:

```text
1 — REPAYMENT
2 — COLLATERAL
3 — OBLIGATION FAILURE
```

---

# Verified CreditASC State

The demonstrated proof executions produced persistent Creditcoin state:

```text
repaymentCount    = 1
failedObligations = 0
collateral        = 1499
```

### Collateral proof

[Creditcoin transaction](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)

```text
Action:
2 — COLLATERAL

Result:
collateral = 1499
```

### Repayment proof

[Creditcoin transaction](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)

```text
Action:
1 — REPAYMENT

Result:
repaymentCount = 1
```

---

# AI Credit Agent

Once verified evidence is available, the AI credit engine evaluates the borrower.

Inputs include:

```text
Repayment history
Failed obligations
Collateral
Activity duration
Requested amount
Requested duration
Evidence verification
```

Outputs include:

```text
Risk level
Confidence
Recommended amount
Recommended duration
Approval / rejection
Decision reasoning
```

The current risk engine is designed around:

```text
LOW
MEDIUM
HIGH
```

A demonstrated decision configuration produced:

```text
Risk:
MEDIUM

Confidence:
75%

Recommended amount:
700

Recommended duration:
30 days

Recommendation:
APPROVE
```

The AI recommendation is deliberately not the final authority.

---

# RiskGuard

RiskGuard is the deterministic safety layer.

The principle is:

```text
AI proposes
   ↓
RiskGuard validates
   ↓
Execution is permitted only when policy conditions pass
```

Current policy:

| Policy                      |          Value |
| --------------------------- | -------------: |
| Maximum exposure            |       `$5,000` |
| Minimum collateral coverage |          `50%` |
| Maximum duration            |      `90 days` |
| Evidence verification       |       Required |
| Allowed AI risk             | `LOW / MEDIUM` |

For the demonstrated `$700` recommendation:

```text
Requested credit:
$700

Maximum exposure:
$5,000

Duration:
30 days

Maximum duration:
90 days

Collateral:
1499

Collateral coverage:
214%

Evidence:
Verified

Risk:
MEDIUM

Result:
PASS
```

The deterministic layer prevents AI reasoning from becoming unrestricted financial authority.

---

# Real Creditcoin Loan Infrastructure

The project does not stop at an AI recommendation.

It integrates the Creditcoin loan-flow infrastructure:

```text
ASCLoanManager
        ↓
Source Loan Contract
        ↓
Loan Registration
        ↓
Funding
        ↓
Attestcoin Funding Proof
        ↓
Funded Loan State
```

The official Creditcoin loan examples expose the corresponding lifecycle through loan authorization, source-contract registration, registration, funding, repayment, and inspection tooling.
Reference: [official USC testnet loan-flow examples](https://github.com/gluwa/usc-testnet-bridge-examples).

---

# Loan #1 — Complete On-Chain Lifecycle

The project's first real Creditcoin loan is:

```text
Loan ID:
1

Loan Amount:
700 TEST

Interest Rate:
5%

Expected Repayment:
735 TEST

Duration:
~30 days
```

## Step 1 — Source loan contract registration

The source loan contract was registered with the Creditcoin loan manager.

[View source contract registration](https://creditcoin-testnet.blockscout.com/tx/0x718af3c9f57cabdbc4afac6ef40e95d759ff3dc964b040fa0ac1eb48752abb3b)

```text
Source Loan Contract:
0xd88b23BBB4AD3217dB650D1850d2a7A95c56E9EA

Status:
SUCCESS

Creditcoin block:
5503766
```

---

## Step 2 — Loan registration

Loan #1 was registered on Creditcoin.

[View Loan #1 registration](https://creditcoin-testnet.blockscout.com/tx/0x4a6b7de43c20969703a1b84170c70e2abd59f07c8cbb5a4287197e068c310d40)

```text
Loan ID:
1

Amount:
700 TEST

Interest:
5%

Expected repayment:
735 TEST

Initial status:
Created
```

---

## Step 3 — Register funding

The source-chain loan contract was configured to fund Loan #1.

[View funding registration](https://eth-sepolia.blockscout.com/tx/0x109695384f1b63ecc1228eb7087cc066e23ac8965a24930b8537b238b86d1aac)

```text
Loan:
1

Fund amount:
700 TEST

Status:
SUCCESS
```

---

## Step 4 — ERC20 authorization

The lender authorized the source loan contract to transfer the funding amount.

[View ERC20 approval](https://eth-sepolia.blockscout.com/tx/0x180a31de7c5f1c33dfbf0aeb44b0652bad134ff959c258658726d7b25865b330)

```text
Approved:
700 TEST
```

---

## Step 5 — Real funding transaction

The actual 700 TEST loan funding was executed.

[View funding transaction](https://eth-sepolia.blockscout.com/tx/0xd303577e6021927677745a32e432a6f58e9446e48991a7e0364ef349544426c7)

```text
Loan:
#1

Amount:
700 TEST

From:
Lender

To:
Borrower

Status:
SUCCESS
```

The borrower's TEST balance increased by the funded amount.

---

# Funding Proof — Attestcoin → Creditcoin

The source-chain funding transaction occurred at:

```text
Block:
11725463
```

The Attestcoin proof pipeline then:

```text
Detected source block
        ↓
Waited for attestation
        ↓
Generated proof
        ↓
Produced Merkle proof
        ↓
Produced continuity proof
        ↓
Submitted proof to Creditcoin
```

The generated proof contained:

```text
Continuity roots:
8
```

The proof execution gas estimate was successfully calculated before submission.

---

## Funding Proof Submission

[View funding proof transaction on Creditcoin](https://creditcoin-testnet.blockscout.com/tx/0xacd75d9c33b64d58ffe07ecc6dff8b5085220a1d2496f26959409619b47540e8)

```text
Source block:
11725463

Proof:
Valid

Submission:
SUCCESS

Creditcoin block:
5505285
```

This is the cross-chain proof that connects the real source-chain funding transaction to the Creditcoin loan state.

---

# Final Loan Status

After the funding proof was submitted, the deployed `ASCLoanManager` was queried directly.

Result:

```text
Loan ID:
1

Status:
1

Status meaning:
Funded

Loan amount:
700 TEST

Repaid amount:
0 TEST
```

Therefore:

```text
┌───────────────────────────────┐
│        CREDITCOIN LOAN #1     │
├───────────────────────────────┤
│ Amount:       700 TEST        │
│ Interest:     5%              │
│ Repayment:    735 TEST        │
│ Status:       FUNDED          │
│ Repaid:       0 TEST          │
└───────────────────────────────┘
```

**Loan #1 is now a real funded loan state on Creditcoin Testnet.**

---

# Complete Evidence Chain

The complete demonstrated system can be summarized as:

```text
                    REAL SOURCE DATA
                           │
                           ▼
             Ethereum Sepolia Transaction
                           │
                           ▼
                    Attestcoin Proof
                           │
             ┌─────────────┴─────────────┐
             │                           │
        Merkle Proof              Continuity Proof
             │                           │
             └─────────────┬─────────────┘
                           ▼
               Creditcoin Native Verifier
                           │
                           ▼
                      CreditASC
                           │
                           ▼
             Verified Financial Evidence
                           │
                           ▼
                    AI Credit Agent
                           │
                           ▼
                       RiskGuard
                           │
                           ▼
                  Creditcoin Loan Manager
                           │
                           ▼
                 Real Source Funding
                           │
                           ▼
                Attestcoin Funding Proof
                           │
                           ▼
                   Loan #1 = FUNDED
```

This is the project's central technical achievement.

---

# Security Architecture

The architecture deliberately separates intelligence from authority.

```text
Attestcoin
    │
    └── Verified truth

AI Agent
    │
    └── Decision intelligence

RiskGuard
    │
    └── Deterministic policy

Creditcoin
    │
    └── Financial execution
```

The AI does not directly control arbitrary capital.

The intended authority boundary is:

```text
AI Decision
     ↓
Policy Validation
     ↓
Protocol Execution
```

Server-side private keys are never exposed to the browser.

Sensitive configuration belongs in:

```text
.env.local
```

and must never be committed to Git.

---

# Frontend & User Experience

The application is built as a full credit-agent experience rather than a single transaction page.

Major surfaces include:

```text
Dashboard
Apply
Evidence
AI Agent
Decision
Credit Lines
Transactions
```

The UI exposes the decision pipeline:

```text
Wallet
 ↓
Financial Evidence
 ↓
Verification
 ↓
AI Analysis
 ↓
RiskGuard
 ↓
Credit Decision
 ↓
Credit Line
 ↓
Transactions
```

The frontend is designed so that a judge can understand the relationship between:

```text
Evidence
Decision
Policy
Execution
```

rather than seeing an isolated AI output.

---

# Demo State vs Blockchain State

The application includes UI scenarios for demonstrating the complete credit-agent experience.

Those UI states are presentation-layer experiences.

The project separately verifies actual blockchain state through transaction hashes and contract reads.

The distinction is:

```text
UI / Demo State
        ≠
Verified Blockchain State
```

The following are independently verifiable:

```text
Real source transactions
Real Attestcoin proofs
Real CreditASC executions
Real Creditcoin loan registration
Real 700 TEST funding
Real funding proof
Real Loan #1 Funded status
```

This README intentionally links directly to the relevant transactions so that judges do not have to trust screenshots or frontend labels.

---

# Smart Contracts

## FinancialActivityEmitter

```text
contracts/source/FinancialActivityEmitter.sol
```

[View source contract](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

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

```text
contracts/CreditASC.sol
```

[View deployed contract](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)

Responsibilities:

```text
Attestcoin proof verification
Receipt decoding
Event validation
Evidence extraction
Persistent evidence state
```

---

## RiskGuard

```text
contracts/RiskGuard.sol
```

[View deployed contract](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)

---

## ASCLoanManager

Creditcoin deployment:

```text
0xeC94BCe03B15c4721DB4468a071B566130ac2766
```

[View ASCLoanManager](https://creditcoin-testnet.blockscout.com/address/0xeC94BCe03B15c4721DB4468a071B566130ac2766)

The contract manages:

```text
Loan registration
Loan terms
Loan status
Funding state
Repayment state
Cross-chain proof execution
```

---

# Attestcoin Implementation

The Attestcoin implementation is organized under:

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

The proof pipeline performs:

```text
1. Observe source transaction
2. Wait for confirmation
3. Detect source block
4. Wait for block attestation
5. Generate Attestcoin proof
6. Obtain Merkle proof
7. Obtain continuity proof
8. Verify proof
9. Build CreditASC calldata
10. Estimate gas
11. Submit transaction
12. Confirm Creditcoin state
```

The current implementation follows the native Attestcoin verification architecture. The SDK itself exposes helpers for waiting until a source height is attested and retrieving proof data.

---

# Creditcoin Loan Implementation

The project follows the official Creditcoin loan-flow architecture rather than inventing a separate mock lending mechanism.

Relevant official components include:

```text
authorize.ts
register_source_contract.ts
register.ts
fund_loan.ts
loan_proof.ts
repay_loan.ts
wait_loan_status.ts
```

Reference:

https://github.com/gluwa/usc-testnet-bridge-examples/tree/main/loan

The project adapted this infrastructure into the autonomous credit-agent architecture.

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
│   │
│   ├── engine/
│   │   └── riskguard.ts
│   │
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
│   └── creditcoin/
│       ├── register-loan.ts
│       ├── fund-loan.ts
│       └── ...
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
* ethers.js 6
* EVM wallets

## Cross-Chain

* Attestcoin Protocol
* `@gluwa/usc-sdk`
* Creditcoin native verification
* Merkle proofs
* Continuity proofs
* ASCBase
* EvmV1Decoder

## AI

* TypeScript
* Custom risk engine
* Structured AI credit decisioning
* Deterministic RiskGuard policy layer

## Infrastructure

* Next.js server-side API routes
* Vercel
* Creditcoin proof infrastructure
* Ethereum Sepolia RPC

---

# Getting Started

## Prerequisites

Install:

* Node.js
* pnpm
* Foundry
* MetaMask or another EVM wallet

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

Example configuration:

```env
CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
CREDITCOIN_PROOF_BUILDER_URL=https://prover.cc3-testnet.creditcoin.network/
SOURCE_CHAIN_KEY=1
SOURCE_CHAIN_RPC_URL=YOUR_SEPOLIA_RPC
CREDITASC_CONTRACT_ADDRESS=0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d
ASC_LOAN_MANAGER_CONTRACT_ADDRESS=0xeC94BCe03B15c4721DB4468a071B566130ac2766
SOURCE_CHAIN_ERC20_CONTRACT_ADDRESS=0xA57804f8C52a0106571288B82E3526c5584C81d5
RISKGUARD_CONTRACT_ADDRESS=0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C
```

Private keys must remain local/server-side.

Never commit:

```text
.env.local
```

Never publish:

```text
Private keys
Seed phrases
Wallet credentials
Secrets
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

## Foundry

```bash
forge test -vv
```

Verified project test result:

```text
16 passing
0 failing
```

Coverage includes:

```text
FinancialActivityEmitter
CreditASC
RiskGuard
```

---

## TypeScript

```bash
pnpm exec tsc --noEmit
```

Result:

```text
PASS
```

---

## Production Build

```bash
pnpm run build
```

The production build has been successfully deployed through Vercel.

---

# Reproducing the Verified Proof Flow

The repository contains the proof worker infrastructure.

The flow is:

```text
Source transaction
      ↓
Wait for confirmation
      ↓
Find source block
      ↓
Wait for Creditcoin attestation
      ↓
Generate Attestcoin proof
      ↓
Verify proof
      ↓
Build destination calldata
      ↓
Estimate gas
      ↓
Submit proof
      ↓
Wait for confirmation
      ↓
Read destination state
```

For the demonstrated funding proof:

```text
Source block:
11725463

Continuity roots:
8

Proof:
SUCCESS

Creditcoin proof transaction:
0xacd75d9c33b64d58ffe07ecc6dff8b5085220a1d2496f26959409619b47540e8
```

---

# Verification Matrix

| Component                         | Status   | Direct Evidence                                                                                                                           |
| --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum source contract          | Verified | [Etherscan](https://sepolia.etherscan.io/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)                                              |
| Real borrower collateral          | Verified | [Transaction](https://sepolia.etherscan.io/tx/0xac5418a7f9293ad89de92ffd7c46066cb4292f9e8d26f0a50f6886953206f34a)                         |
| Real borrower repayment           | Verified | [Transaction](https://sepolia.etherscan.io/tx/0x5949ebb3b25e8776297bfcff0b9fd953d34b6a552a27094e4786ea109210136c)                         |
| Attestcoin proof generation       | Verified | Source transaction + proof pipeline                                                                                                       |
| CreditASC deployment              | Verified | [Blockscout](https://creditcoin-testnet.blockscout.com/address/0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d)                                |
| CreditASC collateral proof        | Verified | [Transaction](https://creditcoin-testnet.blockscout.com/tx/0x87596ed99f64cf99f207393f26e47d7d1fd81effa9a7aa9e27ccee6b191edd03)            |
| CreditASC repayment proof         | Verified | [Transaction](https://creditcoin-testnet.blockscout.com/tx/0xa85744feee9b5d9c01b853667cd8b83dfc613c0eaa42efb5f4ac87644814b5f5)            |
| RiskGuard deployment              | Verified | [Etherscan](https://sepolia.etherscan.io/address/0xbC7115626d7Cf967Fb01Ca808Fc48b4A45220e0C)                                              |
| Source loan contract registration | Verified | [Transaction](https://creditcoin-testnet.blockscout.com/tx/0x718af3c9f57cabdbc4afac6ef40e95d759ff3dc964b040fa0ac1eb48752abb3b)            |
| Loan #1 registration              | Verified | [Transaction](https://creditcoin-testnet.blockscout.com/tx/0x4a6b7de43c20969703a1b84170c70e2abd59f07c8cbb5a4287197e068c310d40)            |
| Loan funding registration         | Verified | [Transaction](https://eth-sepolia.blockscout.com/tx/0x109695384f1b63ecc1228eb7087cc066e23ac8965a24930b8537b238b86d1aac)                   |
| ERC20 approval                    | Verified | [Transaction](https://eth-sepolia.blockscout.com/tx/0x180a31de7c5f1c33dfbf0aeb44b0652bad134ff959c258658726d7b25865b330)                   |
| Real 700 TEST funding             | Verified | [Transaction](https://eth-sepolia.blockscout.com/tx/0xd303577e6021927677745a32e432a6f58e9446e48991a7e0364ef349544426c7)                   |
| Funding Attestcoin proof          | Verified | [Creditcoin transaction](https://creditcoin-testnet.blockscout.com/tx/0xacd75d9c33b64d58ffe07ecc6dff8b5085220a1d2496f26959409619b47540e8) |
| Loan #1 final state               | Verified | `Status = Funded`                                                                                                                         |
| Foundry tests                     | Verified | `16 passing`                                                                                                                              |
| TypeScript                        | Verified | `tsc --noEmit`                                                                                                                            |
| Production build                  | Verified | Vercel deployment                                                                                                                         |
| Live frontend                     | Verified | [Open App](https://autonomous-credit-agent.vercel.app/)                                                                                   |

---

# Current System Status

The core system has reached a complete working testnet milestone.

## Completed

* [x] Next.js application
* [x] Wallet connection
* [x] Credit application flow
* [x] Dynamic source-chain evidence discovery
* [x] Ethereum Sepolia source contract
* [x] Real borrower collateral transaction
* [x] Real borrower repayment transaction
* [x] Attestcoin SDK integration
* [x] Creditcoin block attestation
* [x] Real Attestcoin proof generation
* [x] Native proof verification
* [x] CreditASC contract
* [x] Persistent verified evidence on Creditcoin
* [x] AI credit risk engine
* [x] Deterministic RiskGuard
* [x] Creditcoin source loan contract
* [x] ASCLoanManager deployment
* [x] Source loan contract registration
* [x] Loan #1 registration
* [x] Real ERC20 approval
* [x] Real 700 TEST loan funding
* [x] Funding proof generation
* [x] Funding proof submission to Creditcoin
* [x] Final `ASCLoanManager` state verification
* [x] **Loan #1 = Funded**
* [x] Credit-line frontend
* [x] Transaction history UI
* [x] Foundry tests
* [x] TypeScript validation
* [x] Production build
* [x] Vercel deployment

---

# Production Extensions

The demonstrated hackathon system is complete as a working testnet prototype.

The natural production extensions are:

```text
Testnet
   ↓
Security hardening
   ↓
Independent audit
   ↓
Continuous monitoring
   ↓
Multiple source chains
   ↓
Production liquidity
   ↓
Production credit products
```

These are scalability and productionization extensions rather than missing pieces of the demonstrated core.

---

# Vision

The long-term vision is infrastructure for autonomous financial agents that can safely operate across blockchain ecosystems.

The model is:

```text
Observe
   ↓
Verify
   ↓
Understand
   ↓
Decide
   ↓
Validate
   ↓
Execute
   ↓
Audit
```

The fundamental architecture is:

```text
Verified Data
      ↓
AI Intelligence
      ↓
Deterministic Safety
      ↓
On-Chain Execution
```

This can extend beyond credit into:

```text
DeFi
RWA
Insurance
Treasury Management
Trade Finance
Underwriting
Autonomous Financial Agents
```

---

# Links

## Project

* **Live Application:** https://autonomous-credit-agent.vercel.app/
* **GitHub:** https://github.com/shahwali-dev/autonomous-credit-agent
* **Demo Video:** https://youtu.be/oMpFVnARkwk

## Official Protocol Resources

* **Gluwa USC SDK:** https://github.com/gluwa/usc-sdk
* **Attestcoin Protocol Examples:** https://github.com/gluwa/attestcoin-protocol-examples
* **USC Testnet Bridge Examples:** https://github.com/gluwa/usc-testnet-bridge-examples
* **Creditcoin USC Networks:** https://github.com/gluwa/creditcoin-usc-networks

## Explorers

* **Ethereum Sepolia:** https://sepolia.etherscan.io/
* **Creditcoin Testnet:** https://creditcoin-testnet.blockscout.com/

---

# Hackathon

## BUIDL For The Real World — BUIDL CTC 2026 Fall

```text
Track:
AI

Ecosystem:
Creditcoin

Protocol:
Attestcoin

Project:
Autonomous Cross-Chain Credit Agent
```

The project demonstrates a complete technical path:

```text
Real Cross-Chain Financial Activity
        ↓
Attestcoin Cryptographic Verification
        ↓
Persistent Creditcoin Evidence
        ↓
AI Credit Intelligence
        ↓
Deterministic RiskGuard
        ↓
Real Creditcoin Loan Infrastructure
        ↓
Real Source-Chain Funding
        ↓
Attestcoin Funding Proof
        ↓
Loan #1 = FUNDED
```

The key architectural separation is:

```text
Attestcoin
    = Truth

AI Agent
    = Intelligence

RiskGuard
    = Deterministic Safety

Creditcoin
    = Execution
```

The result is not simply an AI credit demo.

It is a working testnet demonstration of how **cryptographically verified cross-chain financial evidence can feed an AI credit agent and connect to real Creditcoin loan infrastructure.**

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.
