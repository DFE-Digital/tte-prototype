const _ = require('lodash')

// version
var v = '/v2/'

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
    var choosette = req.session.data['choosette']

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
    else if(choosette == ''){
      res.redirect(v + 'choose-course')
    }
    else {
      res.redirect(v + 'confirm-course')
    }
  })


// ------------
// Registration flow  
// ------------

  // Pre-select provider + course if come from provider site 
  router.get(v + 'cedar-teacher', (req, res) => {
    const data = req.session.data
    data.provider = 'Cedar trust'
    data.choosette = 'SEND and inclusion for teachers'
    res.redirect(v + 'start-id')
  })

  router.get(v + 'cedar-leader', (req, res) => {
    const data = req.session.data
    data.provider = 'Cedar trust'
    data.choosette = 'SEND and inclusion for leaders'
    res.redirect(v + 'start-id')
  })

  router.get(v + 'send-leader', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for leaders'
    res.redirect(v + 'start-id')
  })

  router.get(v + 'send-leader-table', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for leaders'
    res.redirect('../gov-uk-guidance/providers')
  })

  router.get(v + 'send-leader-blurb', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for leaders'
    res.redirect('../gov-uk-guidance/providers-blurbs')
  })

  router.get(v + 'send-leader-quiz', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for leaders'
    res.redirect(v + 'choose-a-provider/course-start')
  })

  router.get(v + 'send-teacher', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for teachers'
    res.redirect(v + 'start-id')
  })

    router.get(v + 'send-teacher-table', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for teachers'
    res.redirect('../gov-uk-guidance/providers')
  })

  router.get(v + 'send-teacher-blurb', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for teachers'
    res.redirect('../gov-uk-guidance/providers-blurbs')
  })

  router.get(v + 'send-teacher-quiz', (req, res) => {
    const data = req.session.data
    data.choosette = 'SEND and inclusion for teachers'
    res.redirect(v + 'choose-a-provider/course-start')
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

  router.get(v + 'route-provider', (req, res) => {
    var provider = req.session.data['provider']

    if (provider == 'No preference – we have auto-assigned you to Cedar trust') {
      res.redirect(v + 'where-do-you-work')
    } 
    else {
      res.redirect(v + 'second-provider')
    }
  })

  router.get(v + 'route-second-provider', (req, res) => {
    var secondprovider = req.session.data['secondprovider']

    if (secondprovider == 'Yes') {
      res.redirect(v + 'choose-backup-provider')
    } 
    else {
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
      res.redirect(v + 'what-setting')
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
    else if (settingt == 'Special post 16 institution') {
      res.redirect(v + 'which-fe')
    } 
    else {
      res.redirect(v + 'funding/funding-not-available-setting')
    } 
  })

  router.post(v + 'route-which-fe', function (req, res){
    var locationt = req.session.data['wheredoyouwork']
    var fe = req.session.data['whatfe']
    if(locationt == 'No'){
      res.redirect(v + 'funding/funding-not-available-england')
    }
    else if (fe == 'School or academy') {
      res.redirect(v + 'which-school')
    } 
    else if (fe == 'College') {
      res.redirect(v + 'which-school')
    } 
    else if (fe == 'Special post 16 institution') {
      res.redirect(v + 'which-school')
    }
    else if (fe == 'Independent learning provider') {
      res.redirect(v + 'which-fe')
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
