const N = 10000;
const arcsData = [
  {
    startLat: -7.789275,
    startLng: 111.921327,
    endLat: 46.227638,
    endLng: 2.213749,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 4.210483999999999,
    startLng: 101.97576600000001,
    endLat: -7.789275,
    endLng: 111.921327,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 36.204824,
    startLng: 138.252924,
    endLat: 4.210483999999999,
    endLng: 101.97576600000001,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: -25.274398,
    startLng: 133.775136,
    endLat: -7.789275,
    endLng: 111.921327,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 46.227638,
    startLng: 2.213749,
    endLat: 56.130366,
    endLng: -106.34677099999999,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 46.227638,
    startLng: 2.213749,
    endLat: -0.023559,
    endLng: 37.906193,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 56.130366,
    startLng: -106.34677099999999,
    endLat: -38.416097,
    endLng: -63.616671999999994,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 56.130366,
    startLng: -106.34677099999999,
    endLat: 36.204824,
    endLng: 138.252924,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: -38.416097,
    startLng: -63.616671999999994,
    endLat: -14.235004,
    endLng: -51.92528,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: -14.235004,
    startLng: -51.92528,
    endLat: 28.033886,
    endLng: 1.6596259999999998,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: 28.033886,
    startLng: 1.6596259999999998,
    endLat: -30.559482,
    endLng: 22.937506,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: -0.023559,
    startLng: 37.906193,
    endLat: -30.559482,
    endLng: 22.937506,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  {
    startLat: -30.559482,
    startLng: 22.937506,
    endLat: -25.274398,
    endLng: 133.775136,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // hi > jpn
  {
    startLat: 21.3279755,
    startLng: -157.9395007,
    endLat: 36.204824,
    endLng: 138.252924,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // la > hi
  {
    startLat: 34.0201598,
    startLng: -118.6926009,
    endLat: 21.3279755,
    endLng: -157.9395007,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // la > col
  {
    startLat: 34.0201598,
    startLng: -118.6926009,
    endLat: 39.7149536,
    endLng: -105.0578383,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // col > ny
  {
    startLat: 39.7149536,
    startLng: -105.0578383,
    endLat: 40.7282345,
    endLng: -73.939371,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // ny > cnd
  {
    startLat: 40.7282345,
    startLng: -73.939371,
    endLat: 56.130366,
    endLng: -106.34677099999999,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // ny > fld
  {
    startLat: 40.7282345,
    startLng: -73.939371,
    endLat: 28.4811011,
    endLng: -81.4830923,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // fld > msk
  {
    startLat: 28.4811011,
    startLng: -81.4830923,
    endLat: 19.3906797,
    endLng: -99.2840404,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // msk > brz
  {
    startLat: 19.3906797,
    startLng: -99.2840404,
    endLat: -14.235004,
    endLng: -51.92528,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // ind > hk
  {
    startLat: -7.789275,
    startLng: 111.921327,
    endLat: 22.3654296,
    endLng: 114.1127764,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
  // hk > mly
  {
    startLat: 22.3654296,
    startLng: 114.1127764,
    endLat: 4.210483999999999,
    endLng: 101.97576600000001,
    color: ["blue", "#D6BCFA"],
    stroke: 0.11
  },
];
const data = arcsData.slice(0, N);
export default data;
