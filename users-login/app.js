const { UserNotFound } = require('/challenge/commons/errors')
const db = require('/challenge/commons/db')
const loginsIndex = db.in('logins')
const usersIndex = db.in('users')

module.exports = ({ body: { email } }, res) => {
  const user = usersIndex.selectOne({ email })
  if (!user) throw new UserNotFound({ email })

  const login = loginsIndex.new()

  login.writeMany({
    user_id: user.getId(),
    created_at: Date.now().toString()
  })

  return res.json({ token: login.getId(), admin: user.readString('admin') })
}
