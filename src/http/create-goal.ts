interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  return fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
