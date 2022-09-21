const { loginUserByToken } = require('/challenge/commons/middlewares')
const db = require('/challenge/commons/db')
const usersIndex = db.in('users')
const tasksIndex = db.in('tasks')

module.exports = ({ body: { token } }, res) => {
  const user = loginUserByToken(token)

  let list = user.readString('admin') === '1'
    ? tasksIndex.listJSON()
    : tasksIndex.selectJSON({ user_id: user.getId() })

  const usersMap = usersIndex.mapJSON('email')

  list = list.map((task) => ({ ...task, user_email: usersMap[task.user_id] }))
  return res.json({ list })
}
