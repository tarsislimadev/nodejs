const { loginUserByToken } = require('/challenge/commons/middlewares')
const tasksIndex = require('/challenge/commons/db').in('tasks')

module.exports = ({ body: { token, deadline, description } }, res) => {
  const user_id = loginUserByToken(token).getId()

  const created_at = Date.now().toString()

  const task = tasksIndex.new()
  task.writeMany({ deadline, description, created_at, user_id })

  return res.json({ id: task.getId(), created_at })
}
