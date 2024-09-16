import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 1 minuto evita que a requisição seja feita a cada render
  })

  if (!data) {
    return null
  }

  async function handleCompletionGoals(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] }) // invalida a query de summary
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] }) // invalida a query de pending-goals
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal?.id}
            disabled={goal?.completetionCount >= goal?.desiredWeeklyFrequency}
            onClick={() => handleCompletionGoals(goal?.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal?.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
