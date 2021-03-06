'use strict';

// TODO: cross/in/out callouts
// TODO: fix tail end (seemed to not work??)
// TODO: add phase tracking (so death from above/below can tell you to swap or not)
// TODO: add swap callout after exaflares
// TODO: debuff tracking for when you lose the barrier to remind you to run?
// TODO: ice head markers
// TODO: stack head markers

// O10S - Alphascape 2.0 Savage
[{
  zoneRegex: /^Alphascape V2.0 \(Savage\)$/,
  timelineFile: 'o10s.txt',
  triggers: [
    {
      id: 'O10S Tail End',
      regex: / 14:31AA:Midgardsormr starts using Tail End on (\y{Name})/,
      alertText: function(data, matches) {
        if (matches[1] == data.me) {
          return {
            en: 'Tank Buster on YOU',
            de: 'Tenkbuster auf DIR',
            fr: 'Tankbuster sur VOUS',
          };
        }
        if (data.role == 'healer') {
          return {
            en: 'Buster on ' + data.ShortName(matches[1]),
            de: 'Tenkbuster auf ' + data.ShortName(matches[1]),
            fr: 'Tankbuster sur ' + data.ShortName(matches[1]),
          };
        }
      },
      tts: function(data, matches) {
        if (matches[1] == data.me) {
          return {
            en: 'buster',
            de: 'basta',
            fr: 'tankbuster',
          };
        }
      },
    },
    {
      id: 'O10S Fire Marker',
      regex: / 1B:........:(\y{Name}):....:....:0017:0000:0000:0000:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      alarmText: {
        en: 'Fire Marker on YOU',
      },
      infoText: function(data, matches) {
        if (data.me != matches[1])
          return 'Fire on ' + data.ShortName(matches[1]);
      },
    },
    {
      id: 'O10S Death From Below',
      regex: / 1B:........:(\y{Name}):....:....:008F:0000:0000:0000:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      infoText: {
        en: 'Death From Below',
      },
    },
    {
      id: 'O10S Death From Above',
      regex: / 1B:........:(\y{Name}):....:....:008E:0000:0000:0000:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      infoText: {
        en: 'Death From Above',
      },
    },
  ],
}];
