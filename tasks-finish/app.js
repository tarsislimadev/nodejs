const { loginUserByToken } = require('/challenge/commons/middlewares')
const tasksIndex = require('/challenge/commons/db').in('tasks')

module.exports = ({ body: { token, _id } }, res) => {
  const user_id = loginUserByToken(token).getId()
  const finished_at = Date.now().toString()

  const task = tasksIndex.selectById(_id)
  task.writeMany({ finished_at })
  return res.json({ id: task.getId(), finished_at, finished_by: user_id })
}
