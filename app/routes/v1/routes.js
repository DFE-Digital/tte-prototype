const _ = require('lodash')

// version
var v = '/v1/'

module.exports = router => {

  // ------------
// DfE Identity in/out links
       // only work for most recent version so identity prototype doesn't have to be updated each time. 
// ------------

  // Redirect from Identity prototype - NPQ create account
  router.get('/user-research/npq/new-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'course-start') 
  })


  // Redirect from Identity prototype - NPQ show account
    router.get('/user-research/npq/existing-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'registration-status/registration-status')
  })

  // Redirect from Identity prototype - Closed state - sign up to email  
  router.get('/user-research/npq/closed-eoi', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedEoi = 'True'
    res.redirect(v + 'closed/eoi-senco-interest')
  })

  // Redirect from Identity prototype - Closed state - sign in  
  router.get('/user-research/npq/closed-signin', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedSignin = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })

  router.get('/npq-account', (req, res) => {
    res.redirect(v + 'registration-status/registration-status')
  })

  // -----------------
  //  Set closed states 
  // -----------------

  // Closed state - partial
  router.get(v + 'closed-for-registations', (req, res) => {
    const data = req.session.data
    data.closedState = 'Partial'
    res.redirect(v + 'start-id')
  })

  // Closed state - full 
  router.get(v + 'closed-fully', (req, res) => {
    const data = req.session.data
    data.closedState = 'Full'
    res.redirect(v + 'start-id')
  })

  // Closed state - Remove any closed states
  router.get(v + 'start-page', (req, res) => {
    const data = req.session.data
    data.closedState = ''
    res.redirect(v + 'start-id')
  })

  // Closed state - Header link 
  router.get(v + 'header-link', function (req, res) {

    let closedState = req.session.data.closedState
  
    if (closedState === 'full') {
        res.redirect(v + 'start-id')
      } else if (closedState === 'partial'){
        res.redirect(v + 'registrations-closed')
      } else {
      res.redirect(v + 'course-start')
    }
  })

    // Closed state - Header link 
    router.get(v + 'registration-status/header-link', function (req, res) {

      let closedState = req.session.data.closedState
    
      if (closedState === 'full') {
          res.redirect(v + 'start-id')
        } else if (closedState === 'partial'){
          res.redirect(v + 'registrations-closed')
        } else {
        res.redirect(v + 'course-start')
      }
    })

  // -----------------
  //  Set the number of registrations  
  // -----------------

  // 0 registrations 
    router.get(v + 'no-registrations', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '0'
      res.redirect(v + '')
    })
  // 1 registration
    router.get(v + 'one-registration', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '1'
      res.redirect(v + '')
    })
  // >1 registration
  router.get(v + 'multiple-registrations', (req, res) => {
    const data = req.session.data
    data.numberOfRegistrations = '3'
    res.redirect(v + '')
  })

  // Redirect to correct account page if have 0,1 or >1 registrations

  router.get(v + 'registration-account', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect(v + 'registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect(v + 'registration-status/registration-status')
      } else {
        res.redirect(v + 'registration-status/multiple-registrations')
    }
  })

  router.get(v + 'registration-status/registration-account', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect(v + 'registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect(v + 'registration-status/registration-status')
      } else {
        res.redirect(v + 'registration-status/multiple-registrations')
    }
  })

  // Just submitted - show success message 
  router.get(v + 'submit', (req, res) => {
    const data = req.session.data
    data.submittedNow = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

// ------------
// Registration flow  
// ------------
  
  router.post(v + 'chosen', function(req, res){
    var startdatet = req.session.data['startdate']

    if (startdatet == 'no') {
      res.redirect(v + 'apply-later')
    } else {
      res.redirect(v + 'choose-npq')
    }
  })

  router.post(v + 'route-choose-npq', function(req, res){
    var choosenpq = req.session.data['choosenpq']

    if (choosenpq == 'I have not chosen a course yet') {
      res.redirect(v + 'choose-an-npq-and-provider')
    } else {
      res.redirect(v + 'choose-provider')
    }
  })

  router.post(v + 'route-choose-provider', function(req, res){
    var chooseprovider = req.session.data['provider']

    if (chooseprovider == 'I have not chosen a provider yet') {
      res.redirect(v + 'choose-an-npq-and-provider')
    } else {
      res.redirect(v + 'where-do-you-work')
    }
  })

  // Does the user work in England and a state funded school?
  router.post(v + 'where-school', function (req, res) {
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']

    if (locationt == "Yes"){
      if (settingt == "Early years or childcare") {
        res.redirect(v + 'eyll/nursery-type')
      } 
      else if (settingt == "Another setting"){
        res.redirect(v + 'other/employment')
      } 
      else if (settingt == "Other"){
        res.redirect(v + 'return-to-teaching')
      } 
      else {
        res.redirect(v + 'which-school')
      }
    } else {
      res.redirect(v + 'choose-npq')
      funded = "no"
    }
  })

  // Does the user work in a state or private childcare setting?
  router.post(v + 'eyll/nursery-type', function (req, res){
    var nurserysettingt = req.session.data['nurserysetting']

    if (nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)' || nurserysettingt == 'Local authority-maintained nursery') {
      res.redirect(v + 'which-school')
    } else {
      res.redirect(v + 'eyll/do-you-have-urn')
    }
  })

  // Does the school have a URN?
  router.post(v + 'eyll/find-early-years', function(req, res){
    var hasurnt = req.session.data['haveurn']
    
    if (hasurnt == 'Yes'){
      res.redirect(v + 'eyll/find-early-years')
    } else {
      res.redirect(v + 'choose-npq')
    }
  })

  // Is the user a mentor?
  router.post(v + 'other/role', function (req, res){
    var mentort = req.session.data['mentor']
    
    if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
      res.redirect(v + 'other/find-itt')
    } 
    else if (mentort == 'Other') {
      res.redirect(v + 'choose-npq')
    } 
    else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution') {
      res.redirect(v + 'other/employer')
    } 
    else {
      res.redirect(v + 'other/role')
    }
  })

  router.post(v + 'route-which-school', function (req, res){
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']
    if(locationt == 'No'){
      res.redirect(v + 'funding/funding-not-available-england')
    }
    else if (settingt == 'Early years or childcare, before reception year') {
      res.redirect(v + 'funding/funding-not-available-setting')
    } 
    else if (settingt == 'Other') {
      res.redirect(v + 'funding/funding-not-available-setting')
    } 
    else {
      res.redirect(v + 'which-school')
    }
  })

// to be able to pinpoint data within selectedWorkplace 
  router.post(v + 'route-funding-outcome', (req, res) => {
    const selectedWorkplaceRaw = req.body.selectedWorkplace;
    let selectedWorkplace = {};

    try {
      selectedWorkplace = JSON.parse(selectedWorkplaceRaw);
    } catch (err) {
      console.error('Invalid JSON in selectedWorkplace:', err);
    }

    // Store in session for Nunjucks {{ data[...] }}
    req.session.data.selectedWorkplace = selectedWorkplace;
     if(selectedWorkplace["TypeOfEstablishment (name)"] == 'Other independent school'){
      res.redirect(v + 'funding/funding-not-available-setting')
    }
    else {
      res.redirect(v + 'funding/funding-eligible')
    }
  });

}
