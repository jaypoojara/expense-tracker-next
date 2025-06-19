import { chartData } from "@/data/ChartData"
import { ExpenseData } from "@/types/chart.types"

export const fetchExpenseData = (): Promise<ExpenseData> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(chartData), 100)
    })
}