const { DuplicatedError } = require('/challenge/commons/errors')
const userIndex = require('/challenge/commons/db').in('users')

module.exports = ({ body: { email, password, admin } }, res) => {
  if (userIndex.selectOne({ email }))
    throw new DuplicatedError({ email })

  const created_at = Date.now().toString()
  userIndex.new().writeMany({ email, password, admin, created_at })
  return res.json({ created_at })
}
