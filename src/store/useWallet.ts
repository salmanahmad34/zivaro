import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id: string
  title: string
  amount: number
  type: 'credit' | 'debit' | 'payout' | 'expense' | 'milestone'
  status: 'Paid' | 'Pending' | 'Processing'
  date: string
  category: string
  reference?: string
  recipientName?: string
}

export interface EarningSummaryItem {
  label: string
  value: number
}

interface StudentWallet {
  totalEarnings: number
  pendingPayouts: number
  completedPayouts: number
  transactions: Transaction[]
  weeklyEarnings: EarningSummaryItem[]
}

interface ProviderWallet {
  totalSpending: number
  activePayouts: number
  completedPayments: number
  transactions: Transaction[]
  spendingByCategory: EarningSummaryItem[]
}

interface WalletState {
  studentWallet: StudentWallet
  providerWallet: ProviderWallet
  
  // Actions
  requestStudentPayout: (amount: number, bankDetails: string) => boolean
  simulateStudentEarning: (jobTitle: string, amount: number, category: string) => void
  fundProviderWallet: (amount: number) => void
  payWorker: (workerName: string, jobTitle: string, amount: number, category: string) => void
}

const INITIAL_STUDENT_WALLET: StudentWallet = {
  totalEarnings: 18450,
  pendingPayouts: 3200,
  completedPayouts: 15250,
  weeklyEarnings: [
    { label: 'Week 1', value: 3200 },
    { label: 'Week 2', value: 4800 },
    { label: 'Week 3', value: 4500 },
    { label: 'Week 4', value: 5950 },
  ],
  transactions: [
    {
      id: 'tx-s1',
      title: 'Weekend Barista shift at Third Wave Coffee',
      amount: 900,
      type: 'credit',
      status: 'Paid',
      date: 'May 23, 2026',
      category: 'Hospitality',
      reference: 'TXN-9382048'
    },
    {
      id: 'tx-s2',
      title: 'Zepto Delivery shift (4 hours)',
      amount: 450,
      type: 'credit',
      status: 'Pending',
      date: 'May 23, 2026',
      category: 'Delivery',
      reference: 'TXN-Pending'
    },
    {
      id: 'tx-s3',
      title: 'Monthly Hustle Milestone: 5 Jobs Completed',
      amount: 1000,
      type: 'milestone',
      status: 'Paid',
      date: 'May 22, 2026',
      category: 'Rewards',
      reference: 'ZVR-MLS-09'
    },
    {
      id: 'tx-s4',
      title: 'HDFC Bank Transfer Payout',
      amount: 2500,
      type: 'payout',
      status: 'Processing',
      date: 'May 21, 2026',
      category: 'Payout',
      reference: 'PAY-8392019'
    },
    {
      id: 'tx-s5',
      title: 'Barista shift at Blue Tokai',
      amount: 850,
      type: 'credit',
      status: 'Paid',
      date: 'May 20, 2026',
      category: 'Hospitality',
      reference: 'TXN-8394820'
    },
    {
      id: 'tx-s6',
      title: 'Tech Summit Event Assistant',
      amount: 1500,
      type: 'credit',
      status: 'Paid',
      date: 'May 18, 2026',
      category: 'Events',
      reference: 'TXN-7391039'
    }
  ]
}

const INITIAL_PROVIDER_WALLET: ProviderWallet = {
  totalSpending: 82400,
  activePayouts: 12800,
  completedPayments: 69600,
  spendingByCategory: [
    { label: 'Hospitality', value: 32000 },
    { label: 'Servers & Staff', value: 24000 },
    { label: 'Deliveries', value: 14400 },
    { label: 'Events & Promos', value: 12000 },
  ],
  transactions: [
    {
      id: 'tx-p1',
      title: 'Shift Payout to Rahul Sharma (Weekend Barista)',
      amount: 450,
      type: 'expense',
      status: 'Paid',
      date: 'May 23, 2026',
      category: 'Hospitality',
      recipientName: 'Rahul Sharma',
      reference: 'TXN-9382049'
    },
    {
      id: 'tx-p2',
      title: 'Shift Payout to Priya Patel (Weekend Barista)',
      amount: 450,
      type: 'expense',
      status: 'Pending',
      date: 'May 23, 2026',
      category: 'Hospitality',
      recipientName: 'Priya Patel',
      reference: 'TXN-Pending'
    },
    {
      id: 'tx-p3',
      title: 'Monthly Store Assistant Payments Batch #4',
      amount: 8400,
      type: 'expense',
      status: 'Processing',
      date: 'May 22, 2026',
      category: 'Hiring',
      reference: 'PAY-8392020'
    },
    {
      id: 'tx-p4',
      title: 'Shift Payout to Amit Kumar (Cafe Manager)',
      amount: 3500,
      type: 'expense',
      status: 'Paid',
      date: 'May 21, 2026',
      category: 'Hiring',
      recipientName: 'Amit Kumar',
      reference: 'TXN-8394821'
    },
    {
      id: 'tx-p5',
      title: 'Promotional Staffing - Pop-up Stall',
      amount: 4800,
      type: 'expense',
      status: 'Paid',
      date: 'May 19, 2026',
      category: 'Events & Promos',
      reference: 'TXN-7391040'
    }
  ]
}

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      studentWallet: INITIAL_STUDENT_WALLET,
      providerWallet: INITIAL_PROVIDER_WALLET,

      requestStudentPayout: (amount, bankDetails) => {
        const wallet = get().studentWallet
        if (wallet.totalEarnings - wallet.completedPayouts - wallet.pendingPayouts < amount) {
          return false
        }

        const newTx: Transaction = {
          id: `tx-payout-${Date.now()}`,
          title: `Bank Transfer Payout to ${bankDetails.substring(0, 15)}...`,
          amount: amount,
          type: 'payout',
          status: 'Processing',
          date: 'Today',
          category: 'Payout',
          reference: `PAY-${Math.floor(1000000 + Math.random() * 9000000)}`
        }

        set({
          studentWallet: {
            ...wallet,
            pendingPayouts: wallet.pendingPayouts + amount,
            transactions: [newTx, ...wallet.transactions]
          }
        })
        return true
      },

      simulateStudentEarning: (jobTitle, amount, category) => {
        const wallet = get().studentWallet
        const newTx: Transaction = {
          id: `tx-earn-${Date.now()}`,
          title: `Completed shift for: ${jobTitle}`,
          amount: amount,
          type: 'credit',
          status: 'Paid',
          date: 'Today',
          category: category,
          reference: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`
        }

        // Add to total earnings, complete payouts etc.
        set({
          studentWallet: {
            ...wallet,
            totalEarnings: wallet.totalEarnings + amount,
            transactions: [newTx, ...wallet.transactions]
          }
        })
      },

      fundProviderWallet: (amount) => {
        // Increases provider credit limits or represents total funding
        const wallet = get().providerWallet
        set({
          providerWallet: {
            ...wallet,
            completedPayments: wallet.completedPayments + amount
          }
        })
      },

      payWorker: (workerName, jobTitle, amount, category) => {
        const wallet = get().providerWallet
        const newTx: Transaction = {
          id: `tx-pay-${Date.now()}`,
          title: `Shift Payout to ${workerName} (${jobTitle})`,
          amount: amount,
          type: 'expense',
          status: 'Paid',
          date: 'Today',
          category: category,
          recipientName: workerName,
          reference: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`
        }

        // Update provider spending metrics
        const updatedSpendingByCategory = wallet.spendingByCategory.map(item => {
          if (item.label === category) {
            return { ...item, value: item.value + amount }
          }
          return item
        })

        // If category is not in list, add it
        const categoryExists = wallet.spendingByCategory.some(item => item.label === category)
        if (!categoryExists) {
          updatedSpendingByCategory.push({ label: category, value: amount })
        }

        set({
          providerWallet: {
            ...wallet,
            totalSpending: wallet.totalSpending + amount,
            completedPayments: wallet.completedPayments + amount,
            spendingByCategory: updatedSpendingByCategory,
            transactions: [newTx, ...wallet.transactions]
          }
        })
      }
    }),
    {
      name: 'zivaro-wallet-storage'
    }
  )
)
