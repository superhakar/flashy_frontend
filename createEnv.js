const fs = require('fs')
const path = `./.env`
const vars = `
 REACT_APP_BACKEND_URL=${process.env.REACT_APP_BACKEND_URL}
`
fs.writeFileSync(path, vars)
