(function() {
  'use strict';
  const LNT = window.LNT || (window.LNT = {});


  LNT.presets = {
    general: {
      genericVoicemail: {
        status: 'CN',
        connection: 'GV',
        purpose: 'UK',
        notes: '19'
      },

      voicemail: {
        status: 'CN',
        connection: 'VM',
        purpose: 'UK',
        notes: '19'
      },

      disconnected: {
        status: 'DI',
        connection: 'NA',
        purpose: 'UK',
        notes: '17'
      },

      busy: {
        status: 'BU',
        connection: 'NA',
        purpose: 'UK',
        notes: '19'
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
        connection: 'RM',
        purpose: 'S2',
        textNotes: 'no one is available, press 2 to be added to dnc list'
      },
      destinationDialedDisabled: {
        status: 'CN',
        connection: 'RM',
        purpose: 'UK',
        textNotes: 'Destination Dialed Disabled for your account'
      },
      ext5: {
        status: 'CN',
        connection: 'RM',
        purpose: 'S2',
        textNotes: 'Extension 5 is on the phone'
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
      nrcc: {
        name: 'National Republican Congressional Committee',
        status: 'CN',
        purpose: 'PO',
        connection: 'RM',
      },
      nrsc: {
        name: 'National Republican Senatorial Committee',
        status: 'CN',
        purpose: 'PO',
        connection: 'RM',
      },
      busy: {
        status: 'BU',
        connection: 'NA',
        purpose: 'UK',
        notes: '19'
      },
    },
  };
})()