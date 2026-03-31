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

  router.get(v + 'registration-status/start-page', (req, res) => {
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

  // header links 
  router.get(v + 'route-account', function(req, res){
    var referrer = req.session.data['referrer']

    if (referrer == 'Submitted') {
      res.redirect(v + 'registration-status/registration-status')
    } else {
      res.redirect(v + 'registration-status/no-registrations')
    }
  })

  router.get(v + 'registration-status/route-account', function(req, res){
    var referrer = req.session.data['referrer']

    if (referrer == 'Submitted') {
      res.redirect(v + 'registration-status/registration-status')
    } else {
      res.redirect(v + 'registration-status/no-registrations')
    }
  })

// ------------
// Log back in journeys 
// ------------

  // after on login page 

  router.get(v + 'logged-in', (req, res) => {
    var referrer = req.session.data['referrer']

    if(referrer == 'change-provider'){
      res.redirect(v + 'registration-status/registration-status--scholarship-only')
    }
    else if(referrer == 'successful'){
      res.redirect(v + 'registration-status/registration-status--scholarship-only')
    }
    else if(referrer == 'unsuccessful'){
      res.redirect(v + 'registration-status/registration-status--unsuccessful')
    }
    else if(referrer == 'deferred'){
      res.redirect(v + 'registration-status/registration-status--deferred')
    }
    else if(referrer == 'withdrawn'){
      res.redirect(v + 'registration-status/registration-status--withdrawn')
    }
    else if(referrer == 'certificate'){
      res.redirect(v + 'registration-status/registration-status--passed')
    }
    else {
      res.redirect(v + 'course-start')
    }
  })


// ------------
// Registration flow  
// ------------
  
  router.post(v + 'chosen', function(req, res){
    var startdatet = req.session.data['startdate']

    if (startdatet == 'I want to start later') {
      res.redirect(v + 'apply-later')
    } else {
      res.redirect(v + 'choose-provider')
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

  router.post(v + 'route-which-school', function (req, res){
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']
    if(locationt == 'No'){
      res.redirect(v + 'funding/funding-not-available-england')
    }
    else if (settingt == 'State-funded nursery, pre-school or school') {
      res.redirect(v + 'which-school')
    } 
    else {
      res.redirect(v + 'funding/funding-not-available-setting')
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
