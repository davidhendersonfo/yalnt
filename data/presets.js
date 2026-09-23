(function() {
  'use strict';
  const LNT = window.LNT || (window.LNT = {});


  LNT.presets = {
    general: {
      genericVoicemail: {
        status: 'CN',
        connection: 'GV',
        purpose: 'UK',
        notes: '23'
      },

      voicemail: {
        status: 'CN',
        connection: 'VM',
        purpose: 'UK',
        notes: 'NA'
      },

      disconnected: {
        status: 'DI',
        connection: 'NA',
        purpose: 'S2',
        notes: '17'
      },

      busy: {
        status: 'BU',
        connection: 'NA',
        purpose: 'UK',
        notes: 'NA'
      },

      notAvailable: {
        status: 'CN',
        connection: 'AV',
        purpose: 'UK',
        notes: 'NA'
      },

      miscPromScamRecording: {
        status: 'CN',
        connection: 'RM',
        purpose: 'S2',
        notes: '10'
      },

      otherError: {
        status: 'OT',
        connection: 'NA',
        purpose: 'UK',
        notes: 'NA'
      },

      music: {
        status: 'CN',
        connection: 'MU',
        purpose: 'UK',
        notes: 'NA'
      },

      ringForever: {
        status: 'RG',
        connection: 'NA',
        purpose: 'UK',
      },

      miscLoanScamRecording: {
        status: 'CN',
        connection: 'RM',
        purpose: 'S2',
        notes: '6'
      },

      nextAvailableAgentScam: {
        status: 'CN',
        connection: 'RM',
        purpose: 'S2',
        notes: '15'
      },

      americanTaxAdvisors: {
        status: 'CN',
        connection: 'RM',
        purpose: 'S2',
        textNotes: 'American Tax Advisors'
      },
      localHomeBuyer: {
        status: 'CN',
        connection: 'PN',
        purpose: 'S3',
        textNotes: 'Local Home Buyers'
      },
      destinationDialedDisabled: {
        status: 'CN',
        connection: 'RM',
        purpose: 'UK',
        textNotes: 'Destination Dialed Disabled for your account'
      },
    },
    tmo: {
      personalNumberVM: {
        status: 'CN',
        connection: "VM",
        purpose: "PN",
      },
      personalNumberGV: {
        status: 'CN',
        connection: 'GV',
        purpose: 'PN',
      },
      personalNumberAnswered: {
        status: 'CN',
        connection: 'PN',
        purpose: 'PN',
      },
      phoneScreening: {
        status: 'CN',
        connection: 'RM',
        purpose: 'PN',
        textNotes: 'Phone screening',
      },
      busy: {
        status: 'BU',
        connection: 'NA',
        purpose: 'UK',
      },
    },
  };
})()