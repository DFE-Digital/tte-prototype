const _ = require('lodash')

// version
var v = '/v4/'

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

  router.get(v + 'route-returning-to-service', (req, res) => {
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
      res.redirect(v + 'data-stored')
    }
  })

  // ------------
  // From start page
  // ------------

  router.get(v + 'route-course', (req, res) => {
    var choosette = req.session.data['choosette']

    if(choosette == ''){
      res.redirect(v + 'choose-course')
    }
    else {
      res.redirect(v + 'confirm-course')
    }
  })


// ------------
// Registration flow  
// ------------

  // Pre-select course if come from course page 
  router.get(v + 'send-leader', (req, res) => {
    const data = req.session.data
    data.choosette = 'Embedding inclusive practice for leaders'
    res.redirect(v + 'start-id')
  })

  router.get(v + 'send-teacher', (req, res) => {
    const data = req.session.data
    data.choosette = 'Embedding inclusive practice'
    res.redirect(v + 'start-id')
  })

  router.get(v + 'route-start-date', (req, res) => {
    var startdatet = req.session.data['startdate']

    if (startdatet == 'I want to start later') {
      res.redirect(v + 'apply-later')
    } 
    else {
      res.redirect(v + 'choose-provider')
    }
  })

  router.post(v + 'route-where-do-you-work', function(req, res){
    var selffund = req.session.data['selffund']

    if (selffund == 'self-fund') {
      res.redirect(v + 'check-answers')
    } else {
      res.redirect(v + 'where-do-you-work')
    }
  })

  router.post(v + 'route-wherework', function(req, res){
    var wheredoyouwork = req.session.data['wheredoyouwork']

    if (wheredoyouwork == 'No') {
      res.redirect(v + 'overseas')
    } else {
      res.redirect(v + 'what-setting')
    }
  })

  router.post(v + 'route-overseas', function(req, res){
    var overseasschool = req.session.data['overseasschool']

    if (overseasschool == 'Yes') {
      res.redirect(v + 'which-school')
    } else {
      res.redirect(v + 'funding/funding-not-available-england')
    }
  })

  router.post(v + 'route-which-school', function (req, res){
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']
    if(locationt == 'No'){
      res.redirect(v + 'funding/funding-not-available-england')
    }
    else if (settingt == 'State-funded setting') {
      res.redirect(v + 'which-school')
    } 
    else if (settingt == 'Independent learning provider') {
      res.redirect(v + 'which-fe')
    }
    else if (settingt == 'Other') {
      res.redirect(v + 'rtta')
    } 
    else {
      res.redirect(v + 'funding/funding-not-available-setting')
    } 
  })

  router.post(v + 'route-rtta', function(req, res){
    var rtta = req.session.data['rtta']

    if (rtta == 'Yes') {
      res.redirect(v + 'funding/funding-inreview')
    } else {
      res.redirect(v + 'other-setting')
    }
  })

  router.post(v + 'route-other-funding-outcome', function(req, res){
    var othersetting = req.session.data['othersetting']

    if (othersetting == 'As a teacher employed by a local authority to teach in more than one school') {
      res.redirect(v + 'funding/funding-eligible')
    } 
    else {
      res.redirect(v + 'funding/funding-inreview')
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
