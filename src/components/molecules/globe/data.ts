const N = 10000;
const arcsData = [
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 46.227638,
    endLng: 2.213749,
    color: ["blue", "red"],
    stroke: 1.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 56.130366,
    endLng: -106.34677099999999,
    color: ["blue", "red"],
    stroke: 0.39
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 40.463667,
    endLng: -3.7492199999999998,
    color: ["blue", "red"],
    stroke: 0.28
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 4.210483999999999,
    endLng: 101.97576600000001,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 51.165690999999995,
    endLng: 10.451526,
    color: ["blue", "red"],
    stroke: 0.32
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 23.634501,
    endLng: -102.552784,
    color: ["blue", "red"],
    stroke: 0.15
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 23.885942,
    endLng: 45.079162,
    color: ["blue", "red"],
    stroke: 0.19
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 50.503887,
    endLng: 4.469936,
    color: ["blue", "red"],
    stroke: 0.16
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 60.128161,
    endLng: 18.643501,
    color: ["blue", "red"],
    stroke: 0.23
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -14.235004,
    endLng: -51.92528,
    color: ["blue", "red"],
    stroke: 0.16
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 46.818188,
    endLng: 8.227511999999999,
    color: ["blue", "red"],
    stroke: 0.16
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -40.900557,
    endLng: 174.88597099999998,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 51.919438,
    endLng: 19.145135999999997,
    color: ["blue", "red"],
    stroke: 0.18
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 26.820553000000004,
    endLng: 30.802497999999996,
    color: ["blue", "red"],
    stroke: 0.24
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 9.145,
    endLng: 40.489672999999996,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 33.886917,
    endLng: 9.537499,
    color: ["blue", "red"],
    stroke: 0.22
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 21.512583,
    endLng: 55.923255000000005,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -30.559482,
    endLng: 22.937506,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 20.593684,
    endLng: 78.96288,
    color: ["blue", "red"],
    stroke: 0.16
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 15.552726999999999,
    endLng: 48.516388,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -0.023559,
    endLng: 37.906193,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 28.033886,
    endLng: 1.6596259999999998,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 4.570868,
    endLng: -74.297333,
    color: ["blue", "red"],
    stroke: 0.15
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 31.046051000000002,
    endLng: 34.851612,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 29.311659999999996,
    endLng: 47.481766,
    color: ["blue", "red"],
    stroke: 0.15
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 36.204824,
    endLng: 138.252924,
    color: ["blue", "red"],
    stroke: 0.14
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 41.87194,
    endLng: 12.56738,
    color: ["blue", "red"],
    stroke: 0.16
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 39.074208,
    endLng: 21.824312,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -25.274398,
    endLng: 133.775136,
    color: ["blue", "red"],
    stroke: 0.14
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 56.879635,
    endLng: 24.603189,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 1.352083,
    endLng: 103.819836,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 39.399871999999995,
    endLng: -8.224454,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 47.162494,
    endLng: 19.503304,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 32.427908,
    endLng: 53.68804599999999,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 45.1,
    endLng: 15.2,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 28.394857000000002,
    endLng: 84.12400799999999,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -7.789275,
    endLng: 111.921327,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -1.8312389999999998,
    endLng: -78.183406,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -35.675146999999996,
    endLng: -71.542969,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -6.369028,
    endLng: 34.888822,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 1.373333,
    endLng: 32.290275,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 30.375321000000003,
    endLng: 69.345116,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 38.963745,
    endLng: 35.243322,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 42.733883,
    endLng: 25.48583,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 49.817492,
    endLng: 15.472961999999999,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 45.943160999999996,
    endLng: 24.96676,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 48.379433,
    endLng: 31.16558,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 41.153332,
    endLng: 20.168331,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 33.854721000000005,
    endLng: 35.862285,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 9.081999,
    endLng: 8.675277000000001,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 14.058323999999999,
    endLng: 108.277199,
    color: ["blue", "red"],
    stroke: 0.13
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 61.92411,
    endLng: 25.748151,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 60.472024,
    endLng: 8.468946,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 56.26392,
    endLng: 9.501785,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 35.907757000000004,
    endLng: 127.766922,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -9.189967,
    endLng: -75.015152,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 12.879721,
    endLng: 121.77401699999999,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 40.143105,
    endLng: 47.576927000000005,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 41.377491,
    endLng: 64.585262,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 7.946527000000001,
    endLng: -1.0231940000000002,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 58.595271999999994,
    endLng: 25.013607,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 48.019573,
    endLng: 66.923684,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -38.416097,
    endLng: -63.616671999999994,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 43.750298,
    endLng: 7.412841,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 46.151241,
    endLng: 14.995463,
    color: ["blue", "red"],
    stroke: 0.11
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 61.52401,
    endLng: 105.31875600000001,
    color: ["blue", "red"],
    stroke: 0.12
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 12.862807,
    endLng: 30.217636,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 33.223191,
    endLng: 43.679291,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: -1.940278,
    endLng: 29.873888,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 25.354826,
    endLng: 51.183884,
    color: ["blue", "red"],
    stroke: 0.1
  },
  {
    startLat: 31.791702,
    startLng: -7.09262,
    endLat: 9.748917,
    endLng: -83.753428,
    color: ["blue", "red"],
    stroke: 0.1
  }
];
const data = arcsData.slice(0, N);
export default data;
