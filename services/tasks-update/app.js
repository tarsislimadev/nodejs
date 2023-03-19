const { loginUserByToken } = require('/challenge/commons/middlewares')
const tasksIndex = require('/challenge/commons/db').in('tasks')

module.exports = ({ body: { token, _id, description, deadline } }, res) => {
  const user_id = loginUserByToken(token).getId()
  const updated_at = Date.now().toString()

  const task = tasksIndex.selectById(_id)
  task.writeMany({ description, deadline, updated_at, updated_by: user_id })
  return res.json({ id: task.getId(), updated_at })
}
