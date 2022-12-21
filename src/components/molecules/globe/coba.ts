import {
  _ as M,
  u as P,
  i as x,
  j as m,
  M as D,
  T as R,
  s as f,
  R as S,
  C as E,
  W as z,
  k as C,
  S as G,
  P as T,
  O as b,
  A as I,
  D as j,
  l as _,
  o as k,
  c as y,
  a as B,
  m as W,
} from "./cob2.ts"
const $ = {
  __name: "HeliumGlobe",
  setup(w, { expose: u }) {
    u()
    const { $ThreeGlobe: l } = P(),
      d = {
        type: "FlightsCollection",
        flights: [
          {
            order: 1,
            status: !1,
            startLat: "39.3779437",
            startLng: "112.9410981",
            endLat: "48.9985308",
            endLng: "2.5802448",
            arcAlt: "0.12",
          },
          {
            order: 2,
            status: !1,
            startLat: "48.3470603",
            startLng: "-122.6630168",
            endLat: "39.3779437",
            endLng: "112.9410981",
            arcAlt: "0.12",
          },
          {
            order: 2.5,
            status: !0,
            startLat: "48.3477566",
            startLng: "-122,6630168",
            endLat: "25.7951074",
            endLng: "-80.2918096",
            arcAlt: "0.12",
          },
          {
            order: 2.8,
            status: !0,
            startLat: "25.7951074",
            startLng: "-80.2918096",
            endLat: "35.3960296",
            endLng: "-97.5967826",
            arcAlt: "0.12",
          },
          {
            order: 3,
            status: !0,
            startLat: "35.3960296",
            startLng: "-97.5967826",
            endLat: "37.9009788",
            endLng: "-78.0974152",
            arcAlt: "0.12",
          },
          {
            order: 3.5,
            status: !1,
            startLat: "48.9985308",
            startLng: "2.5761116",
            endLat: "33.6861404",
            endLng: "-78.9287554",
            arcAlt: "0.12",
          },
          {
            order: 4,
            status: !1,
            startLat: "-7.970092",
            startLng: "-14.393662",
            endLat: "48.9985308",
            endLng: "2.5802448",
            arcAlt: "0.12",
          },
          {
            order: 4.2,
            status: !1,
            startLat: "0.5368451",
            startLng: "35.2817786",
            endLat: "48.9985308",
            endLng: "2.5802448",
            arcAlt: "0.12",
          },
          {
            order: 4.7,
            status: !1,
            startLat: "25.7951074",
            startLng: "-80.2918096",
            endLat: "-22.8016033",
            endLng: "-43.2491236",
            arcAlt: "0.12",
          },
          {
            order: 6.7,
            status: !0,
            startLat: "48.3477566",
            startLng: "-122.6559687",
            endLat: "25.7939516",
            endLng: "-80.2916727",
            arcAlt: "0.12",
          },
          {
            order: 7,
            status: !0,
            startLat: "49.2537759",
            startLng: "-104,448036",
            endLat: "36.8998796",
            endLng: "-91.2944968",
            arcAlt: "0.12",
          },
          {
            order: 7.5,
            status: !0,
            startLat: "-26.9823427",
            startLng: "-47,6568138",
            endLat: "36.8998796",
            endLng: "-91.2944968",
            arcAlt: "0.12",
          },
          {
            order: 8,
            status: !0,
            startLat: "40.6450046",
            startLng: "-77.6042156",
            endLat: "33.9101084",
            endLng: "-116.9182191",
            arcAlt: "0.12",
          },
          {
            order: 8.5,
            status: !0,
            startLat: "34.9101084",
            startLng: "-116.9182191",
            endLat: "44.7694276",
            endLng: "-92.9863044",
            arcAlt: "0.12",
          },
        ],
      },
      n = x("webgl", () => null),
      t = { width: 0, height: 0 }
    m(() => {
      const c = new l({ waitForGlobeReady: !0, animateIn: !0 })
        .showAtmosphere(!1)
        .globeMaterial(new D())
        .arcsData(d.flights)
        .arcColor(i => (i.status ? "#88cad6" : "#7ee885"))
        .arcAltitude(i => i.arcAlt)
        .arcDashLength(0.9)
        .arcDashGap(0.5)
        .arcDashAnimateTime(5e3)
        .arcsTransitionDuration(1e3)
      c.rotateY(-Math.PI * (5 / 9))
      const s = c.globeMaterial(),
        A = new R().setPath("/")
        ; (s.roughness = 0.7), (s.metalness = 0.6)
      const L = A.load("globe_dark3.jpg")
        ; (L.encoding = f),
          (s.map = L),
          (s.map.wrapS = S),
          (s.emissive = new E(1776411)),
          (s.emissiveIntensity = 0.05)
      const r = new z({
        canvas: n.value,
        alpha: !0,
        antialias: !0,
        powerPreference: "high-performance",
      })
      r.setPixelRatio(window.devicePixelRatio),
        (r.outputEncoding = f),
        r.setSize(t.width, t.height),
        (r.toneMapping = C)
      const o = new G()
      o.add(c)
      const a = new T()
        ; (a.aspect = t.width / t.height),
          a.updateProjectionMatrix(),
          (a.position.z = 250)
      const e = new b(a, r.domElement)
        ; (e.enableDamping = !0),
          (e.dynamicDampingFactor = 0.01),
          (e.enablePan = !1),
          (e.minDistance = 200),
          (e.maxDistance = 500),
          (e.rotateSpeed = 0.8),
          (e.zoomSpeed = 0),
          (e.autoRotate = !1),
          (e.minPolarAngle = Math.PI / 3.5),
          (e.maxPolarAngle = Math.PI - Math.PI / 3),
          o.add(new I(12303291, 1 * 2.5))
      const p = new j(16777215, 0.5 * 2)
      p.position.set(-200, 500, 200), o.add(p)
      function v() {
        ; (t.width = n.value.parentElement.clientWidth),
          (t.height = n.value.parentElement.clientHeight),
          (a.aspect = t.width / t.height),
          a.updateProjectionMatrix(),
          r.setSize(t.width, t.height)
      }
      const h = new ResizeObserver(v)
      h.observe(n.value.parentElement),
        _(() => {
          h.unobserve(n.value.parentElement)
        }),
        (function i() {
          a.lookAt(o.position),
            e.update(),
            r.render(o, a),
            requestAnimationFrame(i)
        })()
    })
    const g = {
      $ThreeGlobe: l,
      flights: d,
      webgl: n,
      sizes: t,
      onBeforeUnmount: _,
      onMounted: m,
      THREE: W,
      OrbitControls: b,
    }
    return (
      Object.defineProperty(g, "__isScriptSetup", {
        enumerable: !1,
        value: !0,
      }),
      g
    )
  },
},
  F = { class: "relative h-full w-full" },
  O = { ref: "webgl", class: "fullscreen-canvas" }
function H(w, u, l, d, n, t) {
  return k(), y("div", F, [B("canvas", O, null, 512)])
}
var q = M($, [["render", H]])
console.log(q);

export { q as _ }
