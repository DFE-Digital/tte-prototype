const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

require('./routes/v1/routes')(router)
require('./routes/admin-v1/admin-routes')(router)
require('./routes/concept-testing/concept-testing-routes')(router)
