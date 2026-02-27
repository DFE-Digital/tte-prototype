const _ = require('lodash')

// version
var v = '/v1/'

module.exports = router => {

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


  // Submitted or changed provider - show correct success message 
  router.get(v + 'submit', (req, res) => {
    var referrer = req.session.data['referrer']

    if(referrer == 'newprovider'){
      res.redirect(v + 'registration-status/registration-status')
    }
    else {
      const data = req.session.data
      data.referrer = 'Submitted'
      res.redirect(v + 'registration-status/registration-status')
    }
  })

// ------------
// Registration flow  
// ------------
  
  router.post(v + 'chosen', function(req, res){
    var startdatet = req.session.data['startdate']

    if (startdatet == 'no') {
      res.redirect(v + 'apply-later')
    } else {
      res.redirect(v + 'choose-tte')
    }
  })

  router.post(v + 'route-choose-provider', function(req, res){
    var chooseprovider = req.session.data['provider']

    if (chooseprovider == 'I have not chosen a provider yet') {
      res.redirect(v + 'choose-a-provider')
    } else {
      res.redirect(v + 'where-do-you-work')
    }
  })

  // Does the user work in a state or private childcare setting?
  router.post(v + 'eyll/nursery-type', function (req, res){
    var nurserysettingt = req.session.data['nurserysetting']

    if (nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)' || nurserysettingt == 'Local authority-maintained nursery') {
      res.redirect(v + 'which-school')
    } else {
      res.redirect(v + 'funding/funding-not-available-setting')
    }
  })

  router.post(v + 'route-which-school', function (req, res){
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']
    if(locationt == 'No'){
      res.redirect(v + 'funding/funding-not-available-england')
    }
    else if (settingt == 'Early years or childcare, before reception year') {
      res.redirect(v + 'eyll/nursery-type')
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

  router.post(v + 'route-change-provider', function (req, res){
    var changet = req.session.data['changeprovider']

    if(changet == 'no'){
      res.redirect(v + 'registration-status/registration-status')
    }
    else {
      res.redirect(v + 'new-provider')
    }
  })

}
