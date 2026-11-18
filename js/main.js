(function () {
  const v = document.createElement("link").relList;
  if (v && v.supports && v.supports("modulepreload")) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) l(m);
  new MutationObserver((m) => {
    for (const L of m)
      if (L.type === "childList")
        for (const G of L.addedNodes)
          G.tagName === "LINK" && G.rel === "modulepreload" && l(G);
  }).observe(document, { childList: !0, subtree: !0 });
  function C(m) {
    const L = {};
    return (
      m.integrity && (L.integrity = m.integrity),
      m.referrerPolicy && (L.referrerPolicy = m.referrerPolicy),
      m.crossOrigin === "use-credentials"
        ? (L.credentials = "include")
        : m.crossOrigin === "anonymous"
          ? (L.credentials = "omit")
          : (L.credentials = "same-origin"),
      L
    );
  }
  function l(m) {
    if (m.ep) return;
    m.ep = !0;
    const L = C(m);
    fetch(m.href, L);
  }
})();
var Qt = () => {
    window.va ||
      (window.va = function (...v) {
        (window.vaq || (window.vaq = []), window.vaq.push(v));
      });
  },
  ea = "@vercel/analytics",
  ta = "2.0.1";
function St() {
  return typeof window != "undefined";
}
function Lt() {
  try {
    const b = "production";
  } catch (b) {}
  return "production";
}
function aa(b = "auto") {
  if (b === "auto") {
    window.vam = Lt();
    return;
  }
  window.vam = b;
}
function na() {
  return (St() ? window.vam : Lt()) || "production";
}
function Qe() {
  return na() === "development";
}
function ia(b) {
  return b.scriptSrc
    ? we(b.scriptSrc)
    : Qe()
      ? "https://va.vercel-scripts.com/v1/script.debug.js"
      : b.basePath
        ? we(`${b.basePath}/insights/script.js`)
        : "/_vercel/insights/script.js";
}
function ra(b, v) {
  var C;
  let l = b;
  if (v)
    try {
      l = { ...((C = JSON.parse(v)) == null ? void 0 : C.analytics), ...b };
    } catch (L) {}
  aa(l.mode);
  const m = { sdkn: ea + (l.framework ? `/${l.framework}` : ""), sdkv: ta };
  return (
    l.disableAutoTrack && (m.disableAutoTrack = "1"),
    l.viewEndpoint && (m.viewEndpoint = we(l.viewEndpoint)),
    l.eventEndpoint && (m.eventEndpoint = we(l.eventEndpoint)),
    l.sessionEndpoint && (m.sessionEndpoint = we(l.sessionEndpoint)),
    Qe() && l.debug === !1 && (m.debug = "false"),
    l.dsn && (m.dsn = l.dsn),
    l.endpoint
      ? (m.endpoint = l.endpoint)
      : l.basePath && (m.endpoint = we(`${l.basePath}/insights`)),
    { beforeSend: l.beforeSend, src: ia(l), dataset: m }
  );
}
function we(b) {
  return b.startsWith("http://") ||
    b.startsWith("https://") ||
    b.startsWith("/")
    ? b
    : `/${b}`;
}
function oa(b = { debug: !0 }, v) {
  var C;
  if (!St()) return;
  const { beforeSend: l, src: m, dataset: L } = ra(b, v);
  if (
    (Qt(),
    l && ((C = window.va) == null || C.call(window, "beforeSend", l)),
    document.head.querySelector(`script[src*="${m}"]`))
  )
    return;
  const G = document.createElement("script");
  G.src = m;
  for (const [pe, He] of Object.entries(L)) G.dataset[pe] = He;
  ((G.defer = !0),
    (G.onerror = () => {
      const pe = Qe()
        ? "Please check if any ad blockers are enabled and try again."
        : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
      console.log(
        `[Vercel Web Analytics] Failed to load script from ${m}. ${pe}`,
      );
    }),
    document.head.appendChild(G));
}
const sa = {
  email: "jsb@johnbolster.design",
  instagram: "https://www.instagram.com/johnbolster.design/",
  linkedin: "https://www.linkedin.com/in/johnbolster/",
  distinkt: "https://distinktai.com",
  stats: [
    ["Creating since", "2026"],
    ["Projects", "10+"],
    ["Worked with", "2"],
  ],
  services: [
    [
      "Brand Identity",
      [
        "Logo design",
        "Typography and color systems",
        "Guidelines and brand playbooks",
      ],
    ],
    ["Art Direction", ["Campaign concepts", "Art direction and imagery"]],
    ["Print", ["Brand books", "Brochures and collateral"]],
    [
      "Web and Digital",
      ["Web design", "Digital assets and social", "Presentation design"],
    ],
    [
      "Brand Strategy",
      [
        "Positioning and differentiation",
        "Audience definition",
        "Voice, mission, vision and onlyness statements",
      ],
    ],
  ],
  projects: [
    {
      slug: "alliance-180",
      title: "Alliance 180",
      category: "Brand Strategy and Design",
      year: "2018",
      client: "Alliance 180",
      description: `Veterans and first responders dealing with trauma have stopped trusting the system. Alliance 180 works differently: peer to peer, action based, built on trust instead of treatment.

A typical nonprofit look would have sounded like everything this audience had already tuned out. So we built the brand around the idea of "doing a 180", with bold type, high energy visuals and a direct, peer level voice. It meets people on their terms.`,
      services: ["Brand Strategy", "Visual Identity", "Web Design"],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/A180-1-50_uhu3j4.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739166/A1805-50_pm98cc.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739166/A180-8-50_tpsviw.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739166/A180-7-50_q82zbz.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739166/A180-2-50_chup0v.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/A180-9-50_hpnlhi.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/Asset_15_c5q1sa.png",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/A180.psd-50_ndnaeu.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/IMG_6652.psd-50_oxcfog.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/Asset_12-50_fjwhdp.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/Asset_16_e1faeu.png",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772739165/A180.psd-50_ndnaeu.jpg",
      summary:
        "A peer-to-peer brand for veterans and first responders, built on the idea of doing a 180.",
      discipline: "Identity",
      seoTitle: "Alliance 180 · Nonprofit Brand Identity Design",
      seoDescription:
        "Brand strategy, visual identity and web design for Alliance 180, a peer to peer program for veterans and first responders.",
    },
    {
      slug: "king-brothers-dairy",
      title: "King Brothers Dairy",
      category: "Brand Strategy and Design",
      year: "2017",
      client: "King Brothers Dairy",
      description: `King Brothers had great product, deep history and local trust. What they lacked was memorability in a category where everyone says "fresh," "local" and "family owned."

So we built the brand around personality instead of expected heritage. The idea: Drink like a King. A crown ties together packaging, environment and merch, giving a farm brand people notice and remember.`,
      services: ["Brand Strategy", "Brand Identity", "Environmental Design"],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741870/4_pb4mnm.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741864/2_vpd8jl.png",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741867/11_xpaay2.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741867/7_qi3ieh.png",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741866/19_bkwn2o.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741862/17_aokwzd.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741858/8_mip4nd.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741858/10_kdcp2q.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741855/9_g9l3y9.png",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741856/12_gngzn1.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741871/6_jg6jua.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741859/14_eqlvil.jpg",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772741866/19_bkwn2o.jpg",
      summary:
        "A farm brand with a crown and a point of view. Drink like a King.",
      discipline: "Identity",
      seoTitle: "King Brothers Dairy · Brand Strategy and Identity Design",
      seoDescription:
        "A crown, a point of view and a brand people remember. Brand strategy, identity, packaging and environmental design for King Brothers Dairy.",
    },
    {
      slug: "dlg",
      title: "DLG",
      category: "Brand Strategy and Design",
      year: "2018",
      client: "DLG",
      description: `DLG had grown into a national force in high stakes litigation, but its identity hadn't caught up.

We built a bold, editorial system of stark black and white, precise type and no color, because when everything is gray, clarity gets lost. At its center is DNA, a hardcover brand book written as a manifesto that aligns the team and positions DLG as principled advocates.`,
      services: ["Rebranding", "Print Design", "Digital Assets"],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1775302294/DLG_MG_5557-Edit-print_eipjl6.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742866/1_g1vd9h.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742867/2_xhtwke.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742868/4_qzpvn0.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742869/5_ajfwz4.png",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742871/6_kmt0b7.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742872/7a_ri4slx.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742873/7_epcss9.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742879/8a_gxsoqk.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742884/9_vm293p.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742887/11_hwvfuw.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772742876/15_ql5wug.jpg",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1775302294/DLG_MG_5557-Edit-print_eipjl6.jpg",
      summary:
        "An editorial, black-and-white identity for a national litigation firm, anchored by a hardcover brand book.",
      discipline: "Identity",
      seoTitle: "DLG · Law Firm Rebrand and Brand Book Design",
      seoDescription:
        "A bold black and white rebrand and a hardcover brand manifesto for national litigation firm DLG, designed by John Bolster.",
    },
    {
      slug: "auryon",
      title: "Auryon",
      category: "Brand Strategy and Guidelines",
      client: "AngioDynamics",
      description: `Auryon, AngioDynamics' laser system for treating peripheral artery disease, already had a strong look and feel. What it needed was the strategy behind it, and a system to keep it consistent as it grew.

We worked backwards from the existing identity to define who the brand serves, from vascular surgeons to interventional cardiologists and radiologists, along with its Hero and Explorer archetypes and a voice that is confident but not cocky. Then we built it out into complete guidelines covering logo, typography, color, imagery, icons and data, giving employees and agency partners one clear way to bring the brand to life.`,
      services: ["Brand Strategy", "Brand Guidelines"],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115680/Artboard_1-80_nqpz0q.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115671/Artboard_1_copy-80_q0vzag.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115610/Artboard_1_copy_3-80_okwbb8.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115619/Artboard_1_copy_4-80_icglzs.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115628/Artboard_1_copy_5-80_q7dz6f.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115637/Artboard_1_copy_6-80_qcndx2.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115645/Artboard_1_copy_7-80_xai0ya.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793116232/Auryon_Brand_Guidelines_nnix7q.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115663/Artboard_1_copy_9-80_rer8lb.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793115654/Artboard_1_copy_8-80_j5fpyp.jpg",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793116232/Auryon_Brand_Guidelines_nnix7q.jpg",
      summary:
        "Turning an existing look into a complete brand strategy and system.",
      discipline: "Strategy",
      seoTitle: "Auryon · Medical Device Brand Strategy and Brand Guidelines",
      seoDescription:
        "Brand strategy and complete brand style guidelines for Auryon, AngioDynamics' laser system for peripheral artery disease, designed by John Bolster.",
    },
    {
      slug: "siena",
      title: "Siena University",
      category: "Social Media and Motion",
      client: "Siena University",
      description: `An ongoing mix of work for Siena University, built to stand out in a crowded feed.

Bold green and gold social campaigns that lead with proof points, animated social pieces, plus a logo for The Stack Center for Innovation and Ethical Entrepreneurship and a campus banner.`,
      services: [
        "Social Media",
        "Motion Graphics",
        "Logo Design",
        "Environmental Graphics",
      ],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946894/1-80_mwkbnc.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946885/2-80_fqvync.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946873/3-80_tloqpj.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946878/4-80_k23wo9.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946881/5-80_oadotk.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946870/6-80_vzoexh.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946889/7-80_wctauo.jpg",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1792946894/1-80_mwkbnc.jpg",
      videos: [
        {
          src: "https://res.cloudinary.com/dnf3dn2wb/video/upload/v1792947128/Siena-Social-Master_ljvcno.mp4",
          after: 4,
        },
        {
          src: "https://res.cloudinary.com/dnf3dn2wb/video/upload/v1792947360/SIEN_SOBGradCerts_1080x1080_br3s2n.mp4",
          after: 5,
        },
      ],
      summary:
        "Social campaigns, motion, a logo and a banner for Siena University.",
      discipline: "Social",
      seoTitle: "Siena University · Higher Education Social Media and Branding",
      seoDescription:
        "Social media campaigns, motion graphics, a logo and a campus banner for Siena University, designed by brand identity designer John Bolster.",
    },
    {
      slug: "finishline",
      title: "Finish Line",
      category: "Art Direction / Design",
      year: "2016",
      client: "Finish Line",
      description: `Finish Line needed to attract a new generation of talent across 700+ stores, candidates in their twenties looking for purpose, growth and belonging.

We created a recruitment brand storybook built on energy and momentum, with layered type, dynamic composition and bold color drawn from sport. The message: opportunity over role, built for real use in stores and at job fairs.`,
      services: ["Creative Direction", "Art Direction"],
      images: [
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772818230/1_ajppmc.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793020249/Spread_1_ox7jo6.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772818232/3_lxi3wv.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772818227/5_yscwdj.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772818237/7_tkykmr.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793019860/6_durbwt.jpg",
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1772818228/4_lzrxip.jpg",
      ],
      cover:
        "https://res.cloudinary.com/dnf3dn2wb/image/upload/v1793021185/FL_hbcweb.png",
      summary:
        "A recruitment brand storybook for 700+ stores, built on energy and momentum.",
      discipline: "Art Direction",
      seoTitle: "Finish Line · Recruitment Brand Storybook and Art Direction",
      seoDescription:
        "Creative direction and a recruitment brand storybook for Finish Line, built to attract a new generation of talent across 700+ stores.",
    },
  ],
};
window.JB = sa;
oa();
(function () {
  var b = window.JB,
    v = document,
    C = v.documentElement,
    l = function (e, n) {
      return (n || v).querySelector(e);
    },
    m = function (e, n) {
      return Array.prototype.slice.call((n || v).querySelectorAll(e));
    };
  function L(e, n) {
    return e.indexOf("/upload/") < 0
      ? e
      : e.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_" + n + "/");
  }
  function G(e) {
    return [600, 900, 1200, 1600, 1900]
      .map(function (n) {
        return L(e, n) + " " + n + "w";
      })
      .join(", ");
  }
  var pe = b.services.map(function (e, n) {
    return { i: n, n: e[0], items: e[1] };
  });
  pe = pe
    .filter(function (e) {
      return e.n !== "Packaging and Environments";
    })
    .map(function (e, n) {
      return ((e.i = n), e);
    });
  var He = [
    [-0.27, -0.1, 0.5, -0.16, -0.2],
    [0.26, 0.2, 0.18, 0.16, 0.02],
    [0.29, -0.24, 0.85, 0.2, -0.3],
    [-0.2, 0.27, -0.12, 0, 0.22],
    [-0.02, 0.04, 1.2, -0.1, 0.38],
  ];
  l(".svc-st").insertAdjacentHTML(
    "beforeend",
    pe
      .map(function (e, n) {
        var a = He[n];
        return (
          '<div class="el" data-abs="1" data-p="' +
          a[0] +
          "," +
          a[1] +
          '" data-mp="' +
          a[3] +
          "," +
          a[4] +
          '" data-z="' +
          a[2] +
          '" data-f="0,0"><p class="d svc-nm">' +
          e.n +
          "</p></div>"
        );
      })
      .join("") +
      (function () {
        var e = "",
          n = 7;
        function a() {
          return ((n = (n * 16807) % 2147483647), n / 2147483647);
        }
        for (var i = 0; i < 34; i++) {
          var t = (a() - 0.5) * 1.3,
            r = (a() - 0.5) * 1.05,
            d = -0.3 + a() * 1.9,
            o = 3 + Math.round(a() * 4);
          e +=
            '<div class="el" data-abs="1" data-p="' +
            t.toFixed(3) +
            "," +
            r.toFixed(3) +
            '" data-mp="' +
            (t * 0.8).toFixed(3) +
            "," +
            r.toFixed(3) +
            '" data-z="' +
            d.toFixed(2) +
            '" data-f="0,0" aria-hidden="true"><i class="star" style="width:' +
            o +
            "px;height:" +
            o +
            'px"></i></div>';
        }
        return e;
      })(),
  );
  var Et = [
      {
        x: -0.22,
        y: -0.02,
        w: "clamp(260px,30vw,560px)",
        ar: "4/3",
        ax: 0.05,
        ay: 0.3,
      },
      {
        x: 0.21,
        y: 0.05,
        w: "clamp(260px,30vw,560px)",
        ar: "4/3",
        ax: -0.02,
        ay: -0.3,
      },
      {
        x: -0.18,
        y: 0,
        w: "clamp(280px,34vw,640px)",
        ar: "16/9",
        ax: 0.26,
        ay: 0.34,
      },
      {
        x: 0.19,
        y: -0.04,
        w: "clamp(280px,34vw,640px)",
        ar: "16/9",
        ax: 0,
        ay: 0.32,
      },
      {
        x: -0.24,
        y: 0.03,
        w: "clamp(230px,25vw,460px)",
        ar: "3/2",
        ax: 0.04,
        ay: -0.3,
      },
      {
        x: 0.23,
        y: 0,
        w: "clamp(230px,25vw,460px)",
        ar: "3/2",
        ax: -0.12,
        ay: 0.36,
      },
    ],
    Ft = [
      "siena",
      "king-brothers-dairy",
      "dlg",
      "alliance-180",
      "finishline",
      "auryon",
    ],
    U = Ft.map(function (e) {
      return b.projects.filter(function (n) {
        return n.slug === e;
      })[0];
    });
  ((l("#work-stops").outerHTML = U.map(function (e, n) {
    var a = Et[n],
      i = a.x < 0 ? 1 : -1;
    return (
      '<section class="st" data-label="Work" data-gap="' +
      (n ? 1.55 : 2.2) +
      '" data-hold=".38" data-ease=".5" data-a="' +
      a.ax +
      "," +
      a.ay +
      '" data-ma="' +
      0.43 * i +
      ',0.36"><div class="el" data-p="' +
      a.x +
      "," +
      a.y +
      '" data-mp="0,-0.02" data-z="0" data-f="' +
      (a.x < 0 ? -0.25 : 0.25) +
      ',0" data-r="' +
      (a.x < 0 ? 18 : -18) +
      '"><button class="card ' +
      (a.x < 0 ? "l" : "r") +
      (e.coverAr ? " full" : "") +
      '" data-proj="' +
      n +
      '" style="width:' +
      a.w +
      '"><span class="fig" style="--ar:' +
      (e.coverAr || a.ar) +
      '"><img src="' +
      L(e.cover, 1200) +
      '" srcset="' +
      G(e.cover) +
      '" sizes="(max-width:760px) 80vw, 36vw" alt="' +
      e.title +
      ' project" loading="lazy" decoding="async"></span><span class="meta"><span class="mono">' +
      String(n + 1).padStart(2, "0") +
      ' / 06</span></span><span class="d ' +
      (n % 2 ? "t2" : "b7") +
      '">' +
      e.title +
      '</span><span class="small">' +
      e.category +
      '</span><span class="mono open">View project<i aria-hidden="true"></i></span></button></div></section>'
    );
  }).join("")),
    m(".split").forEach(function (e) {
      var n = 0;
      ((function a(i) {
        (m("*", i),
          Array.prototype.slice.call(i.childNodes).forEach(function (t) {
            if (t.nodeType === 3) {
              var r = v.createDocumentFragment();
              (t.textContent.split(/(\s+)/).forEach(function (d) {
                if (d) {
                  if (/^\s+$/.test(d)) {
                    r.appendChild(v.createTextNode(" "));
                    return;
                  }
                  var o = v.createElement("span");
                  ((o.className = "w"),
                    d.split("").forEach(function (u) {
                      var s = v.createElement("span");
                      ((s.className = "c"),
                        s.style.setProperty("--i", n++),
                        (s.textContent = u),
                        o.appendChild(s));
                    }),
                    r.appendChild(o));
                }
              }),
                i.replaceChild(r, t));
            } else t.nodeType === 1 && a(t);
          }));
      })(e),
        e.setAttribute("aria-label", e.textContent));
    }),
    l("#copy").addEventListener("click", function () {
      var e = this,
        n = b.email;
      function a(t) {
        ((e.textContent = t),
          setTimeout(function () {
            e.textContent = "Copy email";
          }, 1800));
      }
      try {
        navigator.clipboard.writeText(n).then(
          function () {
            a("Copied");
          },
          function () {
            (i(), a("Press ⌘C"));
          },
        );
      } catch (t) {
        (i(), a("Press ⌘C"));
      }
      function i() {
        var t = v.createRange();
        t.selectNodeContents(l("#mail"));
        var r = getSelection();
        (r.removeAllRanges(), r.addRange(t));
      }
    }));
  var Ee = l("#fx"),
    O = Ee.getContext && Ee.getContext("2d"),
    _e = [],
    Ie = !1,
    et = ["😄", "👍", "😎", "🙌", "✨", "😄", "👍"];
  function tt() {
    var e = innerWidth,
      n = innerHeight;
    (O.clearRect(0, 0, e, n),
      (_e = _e.filter(function (a) {
        return a.life < 120 && a.y < n + 80;
      })),
      _e.forEach(function (a) {
        ((a.vy += 0.42),
          (a.vx *= 0.99),
          (a.x += a.vx),
          (a.y += a.vy),
          (a.r += a.vr),
          a.life++,
          O.save(),
          (O.globalAlpha = Math.max(0, 1 - a.life / 120)),
          O.translate(a.x, a.y),
          O.rotate(a.r),
          (O.font = a.s + "px serif"),
          (O.textAlign = "center"),
          (O.textBaseline = "middle"),
          O.fillText(a.e, 0, 0),
          O.restore());
      }),
      _e.length
        ? requestAnimationFrame(tt)
        : ((Ie = !1), O.clearRect(0, 0, e, n)));
  }
  var fe = l("#thumbs");
  fe &&
    O &&
    fe.addEventListener("click", function () {
      var e = Math.min(devicePixelRatio || 1, 2);
      ((Ee.width = innerWidth * e),
        (Ee.height = innerHeight * e),
        O.setTransform(e, 0, 0, e, 0, 0));
      for (
        var n = fe.getBoundingClientRect(),
          a = n.left + n.width / 2,
          i = n.top + n.height / 2,
          t = 0;
        t < 54;
        t++
      ) {
        var r = Math.random() * Math.PI * 2,
          d = 6 + Math.random() * 13;
        _e.push({
          x: a,
          y: i,
          vx: Math.cos(r) * d,
          vy: Math.sin(r) * d - 7,
          r: Math.random() * 6.3,
          vr: (Math.random() - 0.5) * 0.3,
          s: 20 + Math.random() * 30,
          e: et[t % et.length],
          life: 0,
        });
      }
      (Ie || ((Ie = !0), requestAnimationFrame(tt)),
        fe.classList.remove("pop"),
        fe.offsetWidth,
        fe.classList.add("pop"),
        setTimeout(function () {
          fe.classList.remove("pop");
        }, 600),
        (l("#thumbtt").textContent = "Ha. You remember. Respect."));
    });
  var at = [
      "Ah, a youngster. Ask your parents about Skip Intro buttons.",
      "Let me guess. You were born after Flash died.",
      "OK, zoomer. Back to your 9 second videos.",
      "No Flash? You never waited 4 minutes for a website. Lucky you.",
    ],
    Pt = 0,
    ke = l("#thumbsdn");
  (ke &&
    ke.addEventListener("click", function () {
      ((l("#thumbtt").textContent = at[Pt++ % at.length]),
        ke.classList.remove("nope"),
        ke.offsetWidth,
        ke.classList.add("nope"));
    }),
    (function () {
      var e = l("#dkvid"),
        n = l("#dkfig");
      if (!e) return;
      var a = l("#dkpp"),
        i = l("#dkbig"),
        t = l("#dkseek"),
        r = l("#dktime"),
        d = l("#dksnd");
      function o(f) {
        return (
          (f = Math.max(0, Math.floor(f || 0))),
          Math.floor(f / 60) + ":" + String(f % 60).padStart(2, "0")
        );
      }
      function u() {
        if (e.paused) {
          e.preload !== "auto" && (e.preload = "auto");
          var f = e.play();
          f && f.catch && f.catch(function () {});
        } else e.pause();
      }
      (i.addEventListener("click", u),
        a.addEventListener("click", u),
        e.addEventListener("click", u),
        e.addEventListener("play", function () {
          (n.classList.add("playing"), a.setAttribute("aria-label", "Pause"));
        }),
        e.addEventListener("pause", function () {
          (n.classList.remove("playing"), a.setAttribute("aria-label", "Play"));
        }));
      function s() {
        var f = e.duration || 0,
          j = f ? e.currentTime / f : 0;
        ((t.value = Math.round(j * 1e3)),
          t.style.setProperty("--pct", (j * 100).toFixed(2) + "%"),
          (r.textContent = o(e.currentTime) + " / " + o(f)));
      }
      (e.addEventListener("timeupdate", s),
        e.addEventListener("loadedmetadata", s),
        e.addEventListener("ended", function () {
          ((e.currentTime = 0), s());
        }),
        t.addEventListener("input", function () {
          e.duration && ((e.currentTime = (t.value / 1e3) * e.duration), s());
        }),
        d.addEventListener("click", function () {
          ((e.muted = !e.muted),
            d.setAttribute("aria-pressed", String(!e.muted)),
            d.setAttribute("aria-label", e.muted ? "Unmute" : "Mute"));
        }));
    })());
  var nt = l("#burger");
  function Re(e) {
    (C.classList.toggle("menu-open", e), nt.setAttribute("aria-expanded", e));
  }
  nt.addEventListener("click", function () {
    Re(!C.classList.contains("menu-open"));
  });
  var V = l("#proj"),
    it = l("#pvx"),
    X = -1,
    Fe = null,
    rt = {
      t: "John Bolster · Brand Identity Designer and Art Director, Saratoga Springs NY",
      d: "Independent brand identity designer and art director in Saratoga Springs, NY. Brand strategy, identity, print and web for businesses, higher ed, healthcare and nonprofits.",
    };
  function zt(e) {
    var n = v.querySelector('meta[name="description"]'),
      a = v.querySelector('link[rel="canonical"]');
    if (e < 0) {
      ((v.title = rt.t),
        n && (n.content = rt.d),
        a && (a.href = "https://johnbolster.design/"));
      return;
    }
    var i = U[e];
    ((v.title = (i.seoTitle || i.title) + " | John Bolster"),
      n && i.seoDescription && (n.content = i.seoDescription),
      a && (a.href = "https://johnbolster.design/projects/" + i.slug));
  }
  function je(e, n) {
    var a = e < 0 ? "/" : "/projects/" + U[e].slug;
    if ((zt(e), location.pathname !== a))
      try {
        history[n ? "pushState" : "replaceState"]({ proj: e }, "", a);
      } catch (i) {}
  }
  function Dt() {
    var e = location.pathname.match(/^\/projects\/([^\/]+)/),
      n = -1;
    return (
      e &&
        U.forEach(function (a, i) {
          a.slug === e[1] && (n = i);
        }),
      n
    );
  }
  var ot = "(max-width:760px) 100vw, 58vw";
  function st(e, n) {
    return Promise.all(
      U[e].images.slice(0, 2).map(function (a) {
        var i = new Image();
        return (
          (i.sizes = ot),
          (i.srcset = G(a)),
          (i.src = L(a, 1600)),
          i.decode ? i.decode().catch(function () {}) : Promise.resolve()
        );
      }),
    );
  }
  function Pe(e, n) {
    var a = U[e],
      i = U[(e + 1) % U.length],
      t = a.description
        .split(
          `
`,
        )
        .filter(Boolean)
        .map(function (s) {
          return "<p>" + s + "</p>";
        })
        .join(""),
      r = a.images.map(function (s, f) {
        return (
          '<figure><img src="' +
          L(s, 1600) +
          '" srcset="' +
          G(s) +
          '" sizes="' +
          ot +
          '" alt="' +
          a.title +
          " image " +
          (f + 1) +
          '"' +
          (f > 1 ? ' loading="lazy" decoding="async"' : "") +
          "></figure>"
        );
      });
    function d(s, f) {
      var j = s.src || s,
        c = j.replace("/upload/", "/upload/f_auto:video,q_auto,w_900/"),
        w = j
          .replace("/upload/", "/upload/so_1,f_jpg,q_auto,w_900/")
          .replace(/\.mp4$/, ".jpg");
      return (
        '<figure class="pv-vid ' +
        f +
        '"><video src="' +
        c +
        '" poster="' +
        w +
        '" muted loop playsinline autoplay preload="metadata"></video></figure>'
      );
    }
    var o = [];
    (a.videos || [])
      .slice()
      .reverse()
      .forEach(function (s) {
        s.after != null ? r.splice(s.after, 0, d(s, "mid")) : o.unshift(s);
      });
    var u = r.join("");
    (o.length &&
      (u +=
        '<div class="pv-vids">' +
        o
          .map(function (s) {
            return d(s, "");
          })
          .join("") +
        "</div>"),
      (V.innerHTML =
        '<div class="pv"><div class="pv-l"><span class="mono">' +
        String(e + 1).padStart(2, "0") +
        ' / 06</span><h2 class="d b9">' +
        a.title +
        '</h2><div><span class="mono">Overview</span><div style="margin-top:12px">' +
        t +
        '</div></div><dl class="pv-dl"><dt>Client</dt><dd>' +
        a.client +
        "</dd><dt>Services</dt><dd>" +
        a.services.join(", ") +
        '</dd></dl><button class="pv-next" id="pvn"><span class="mono">Next project</span><span class="d t1">' +
        i.title +
        '</span></button></div><div class="pv-r">' +
        u +
        "</div></div>"),
      (V.scrollTop = 0),
      l("#pvn").addEventListener("click", function () {
        dt((e + 1) % U.length);
      }),
      setTimeout(function () {
        st((e + 1) % U.length);
      }, 1200),
      V.animate &&
        !n &&
        m(".pv-r figure, .pv-l > *", V).forEach(function (s, f) {
          s.animate(
            [
              { opacity: 0, transform: "translateY(40px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 900,
              delay: 120 + f * 60,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "backwards",
            },
          );
        }));
  }
  function Ne(e, n, a) {
    (a || je(e, !0), (X = e), (Fe = n), Pe(e));
    var i = n.getBoundingClientRect(),
      t = innerWidth,
      r = innerHeight,
      d =
        "inset(" +
        Math.max(0, i.top) +
        "px " +
        Math.max(0, t - i.right) +
        "px " +
        Math.max(0, r - i.bottom) +
        "px " +
        Math.max(0, i.left) +
        "px)";
    (V.classList.add("show"),
      (C.style.overflow = "hidden"),
      V.animate && !De
        ? V.animate([{ clipPath: d }, { clipPath: "inset(0px 0px 0px 0px)" }], {
            duration: 900,
            easing: "cubic-bezier(.7,0,.2,1)",
            fill: "forwards",
          })
        : (V.style.clipPath = "inset(0)"),
      it.focus({ preventScroll: !0 }));
  }
  var ne = l("#wipe"),
    me = l("#wpath"),
    he = l("#wtitle"),
    Tt = l("#wnum"),
    ze = !1;
  function dt(e, n) {
    if (!ne.animate || De) {
      ((X = e), n || je(e, !0), Pe(e));
      return;
    }
    if (!ze) {
      ze = !0;
      var a = U[e],
        i = st(e);
      ((Tt.textContent =
        "Next project · " + String(e + 1).padStart(2, "0") + " / 06"),
        (he.innerHTML = a.title
          .split("")
          .map(function (o) {
            return o === " " ? " " : '<span class="c">' + o + "</span>";
          })
          .join("")),
        (ne.style.visibility = "visible"),
        (he.style.fontSize = ""));
      var t = he.scrollWidth,
        r = innerWidth * 0.9;
      (t > r &&
        (he.style.fontSize =
          ((parseFloat(getComputedStyle(he).fontSize) * r) / t).toFixed(1) +
          "px"),
        me.getAnimations &&
          me.getAnimations().forEach(function (o) {
            o.cancel();
          }),
        ne.getAnimations &&
          ne.getAnimations().forEach(function (o) {
            o.cancel();
          }));
      var d = me.getTotalLength();
      ((me.style.strokeDasharray = d),
        (me.style.strokeDashoffset = d),
        me.animate(
          [{ strokeDashoffset: d + "px" }, { strokeDashoffset: "0px" }],
          {
            duration: 1e3,
            delay: 650,
            easing: "cubic-bezier(.6,0,.2,1)",
            fill: "both",
          },
        ),
        (ne.animate(
          [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }],
          {
            duration: 650,
            easing: "cubic-bezier(.7,0,.2,1)",
            fill: "forwards",
          },
        ).onfinish = function () {
          (ne.classList.add("on"),
            m(".c", he).forEach(function (u, s) {
              u.animate(
                [
                  { transform: "translateY(110%) rotate(6deg)", opacity: 0 },
                  { transform: "none", opacity: 1 },
                ],
                {
                  duration: 750,
                  delay: 60 + s * 38,
                  easing: "cubic-bezier(.2,.8,.2,1)",
                  fill: "both",
                },
              );
            }),
            setTimeout(function () {
              Promise.race([
                i,
                new Promise(function (u) {
                  setTimeout(u, 2500);
                }),
              ]).then(o);
            }, 1250));
          function o() {
            ((X = e), n || je(e, !0), Pe(e, !0));
            var u = ne.animate(
              [
                { clipPath: "inset(0 0 0% 0)" },
                { clipPath: "inset(0 0 100% 0)" },
              ],
              {
                duration: 750,
                easing: "cubic-bezier(.7,0,.2,1)",
                fill: "forwards",
              },
            );
            u.onfinish = function () {
              ((ne.style.visibility = "hidden"),
                ne.classList.remove("on"),
                (ze = !1));
            };
          }
        }));
    }
  }
  function Ge(e, n) {
    if (!(X < 0)) {
      n || je(-1, !0);
      var a = v.querySelector('[data-proj="' + X + '"]');
      if (a) {
        if (((Fe = a), (C.style.overflow = ""), Oe && W.length)) {
          var i = ve.filter(function (o) {
            return o.el.contains(a);
          })[0];
          if (i) {
            var t = i.st.sHold + 2;
            (scrollTo(0, t), (K = t));
          }
        } else a.scrollIntoView({ block: "center" });
        C.style.overflow = "hidden";
      }
      var r = function () {
        (V.classList.remove("show"),
          (V.innerHTML = ""),
          (C.style.overflow = ""),
          (X = -1),
          Fe && e === !0 && Fe.focus({ preventScroll: !0 }));
      };
      if (V.animate && !De) {
        var d = V.animate(
          [
            { clipPath: "inset(0px 0px 0px 0px)" },
            { clipPath: "inset(50% 50% 50% 50%)" },
          ],
          {
            duration: 700,
            easing: "cubic-bezier(.7,0,.2,1)",
            fill: "forwards",
          },
        );
        d.onfinish = r;
      } else r();
    }
  }
  (it.addEventListener("click", function () {
    Ge(!1);
  }),
    addEventListener("popstate", function () {
      var e = Dt();
      if (e < 0) {
        X >= 0 && Ge(!1, !0);
        return;
      }
      if (X < 0) {
        var n = v.querySelector('[data-proj="' + e + '"]');
        n && Ne(e, n, !0);
      } else X !== e && (ze ? ((X = e), Pe(e, !0)) : dt(e, !0));
    }),
    v.addEventListener("keydown", function (e) {
      e.key === "Escape" && (X >= 0 ? Ge(!0) : Re(!1));
    }),
    v.addEventListener("click", function (e) {
      var n = e.target.closest && e.target.closest("[data-proj]");
      n && Ne(+n.dataset.proj, n);
    }));
  var De = matchMedia("(prefers-reduced-motion: reduce)").matches,
    Oe =
      !De &&
      !!window.requestAnimationFrame &&
      !!v.createElement("canvas").getContext;
  if (
    (v.addEventListener("click", function (e) {
      var n = e.target.closest && e.target.closest("[data-go]");
      if (n) {
        (e.preventDefault(), Re(!1));
        var a = n.dataset.go;
        if (!Oe) {
          var i = l("#" + (a === "distinkt" ? "distinkt" : a));
          i && i.scrollIntoView({ behavior: "smooth" });
          return;
        }
        var t = W.filter(function (r) {
          return r.id === a || (a === "distinkt" && r.dk);
        })[0];
        t && scrollTo(0, t.sHold + (t.dk ? t.holdPx * 0.45 : 2));
      }
    }),
    !Oe)
  )
    return;
  C.classList.add("is3d");
  try {
    "scrollRestoration" in history && (history.scrollRestoration = "manual");
  } catch (e) {}
  (scrollTo(0, 0),
    addEventListener("pageshow", function () {
      scrollTo(0, 0);
    }));
  var Ke = l("#cv"),
    k = Ke.getContext("2d"),
    Bt = l("#spacer"),
    se = l("#distinkt"),
    Te = l(".panel", se),
    Ct = m(".fly", se),
    Be = l(".dk-in", se),
    q,
    x,
    p,
    Z,
    Me,
    W = [],
    ve = [],
    ae = [],
    ge = [],
    Ce = 0,
    ye = null,
    de = 0,
    K = 0,
    Ae = 0,
    qt = performance.now();
  function le(e, n) {
    return ((e = parseFloat(e)), isNaN(e) ? n : e);
  }
  function Ye(e) {
    var n = (e || "0,0").split(",");
    return [le(n[0], 0), le(n[1], 0)];
  }
  function M(e, n, a) {
    return e < n ? n : e > a ? a : e;
  }
  function E(e) {
    return ((e = M(e, 0, 1)), e * e * e * (e * (e * 6 - 15) + 10));
  }
  var lt = 0,
    Se = null;
  function Wt() {
    return (
      Se ||
        ((Se = v.createElement("div")),
        (Se.style.cssText =
          "position:fixed;left:0;top:0;width:1px;height:100vh;height:100lvh;visibility:hidden;pointer-events:none"),
        v.body.appendChild(Se)),
      Math.max(innerHeight, Se.offsetHeight || 0)
    );
  }
  function $e() {
    var e = de ? M(scrollY / de, 0, 1) : 0;
    ((q = innerWidth),
      (x = Wt()),
      (Z = q < 760),
      (lt = q),
      (p = Z ? 900 : M(q * 0.8, 900, 1400)),
      (Me = Math.min(devicePixelRatio || 1, 2)),
      (Ke.width = q * Me),
      (Ke.height = x * Me),
      k.setTransform(Me, 0, 0, Me, 0, 0),
      m(".el .d").forEach(function (h) {
        if (getComputedStyle(h).whiteSpace === "nowrap") {
          h.style.fontSize = "";
          var J = h.offsetWidth,
            ee = q * 0.9;
          J > ee &&
            (h.style.fontSize =
              ((parseFloat(getComputedStyle(h).fontSize) * ee) / J).toFixed(1) +
              "px");
        }
      }),
      (W = []),
      (ve = []));
    var n = 0;
    (m(".st").forEach(function (h, J) {
      var ee = le(h.dataset.gap, 3);
      J && (n += ee * p);
      var ue = Ye(Z && h.dataset.ma ? h.dataset.ma : h.dataset.a),
        T = {
          sec: h,
          id: h.id,
          label: h.dataset.label || "",
          z: n,
          gap: ee,
          hold: le(h.dataset.hold, 0.6),
          ease: le(h.dataset.ease, 1),
          ax: ue[0],
          ay: ue[1],
          dk: !!h.dataset.dk,
          end: !!h.dataset.end,
          nodes: m(".node", h),
        };
      (W.push(T),
        m(".el", h).forEach(function (B) {
          var ie = Ye(Z && B.dataset.mp ? B.dataset.mp : B.dataset.p),
            re = Ye(B.dataset.f),
            oe = le(B.dataset.z, 0);
          ((B.style.visibility = "hidden"),
            ve.push({
              abs: le(B.dataset.abs, 0),
              el: B,
              st: T,
              x: ie[0],
              y: ie[1],
              zo: oe,
              z: n + oe * p,
              ff: Math.min(1.7, Math.max(1, T.gap * 0.82)) * p,
              fx: Z ? re[0] * 0.5 : re[0],
              fy: re[1],
              r: Z ? 0 : le(B.dataset.r, 0),
              vis: !1,
              node: B.querySelector(".node"),
            }),
            B.classList.toggle("far", oe > 0.2));
        }),
        T.dk && (ye = T));
    }),
      (ae = []));
    var a = 0,
      i = Z ? 0.52 : 0.46;
    (W.forEach(function (h, J) {
      var ee = h.z - p;
      J && (a += h.gap * i * x);
      var ue = h.dk || J === 0 ? 0 : 0.11,
        T = h.dk ? h.hold * x : h.hold * x * 0.55;
      (ae.push({ s: a, zc: ee - ue * p, ease: J ? h.ease * 0.45 : 0 }),
        (h.sHold = a),
        (h.holdPx = T),
        (a += T),
        ae.push({
          s: a,
          zc: ee + (h.dk ? 0 : J === 0 ? 0.18 : 0.11) * p,
          ease: 0,
        }));
    }),
      (de = a),
      (Bt.style.height = de + x + "px"));
    for (
      var t = [{ z: W[0].z, x: W[0].ax * q, y: W[0].ay * x }], r = 1, d = 1;
      d < W.length;
      d++
    ) {
      var o = W[d - 1],
        u = W[d];
      (u.gap >= 2.2 &&
        ((r = -r),
        t.push({
          z: o.z + (u.z - o.z) * 0.5,
          x: r * (d === 1 ? 0.65 : Z ? 0.85 : 1.05) * q,
          y: (r > 0 ? -0.42 : 0.46) * x,
        })),
        t.push({ z: u.z, x: u.ax * q, y: u.ay * x }));
    }
    ((Ce = t[t.length - 1].z), (ge = []));
    for (var s = t.length, f = [], j = [], c = 0; c < s; c++) {
      var w = t[Math.max(0, c - 1)],
        A = t[Math.min(s - 1, c + 1)],
        _ = Math.max(1, A.z - w.z);
      ((f[c] = c === 0 || c === s - 1 ? 0 : (A.x - w.x) / _),
        (j[c] = c === 0 || c === s - 1 ? 0 : (A.y - w.y) / _));
    }
    for (var c = 0; c < s - 1; c++)
      for (
        var g = t[c],
          H = t[c + 1],
          S = Math.max(1, H.z - g.z),
          P = Math.max(24, Math.round((S / p) * 40)),
          z = 0;
        z < P;
        z++
      ) {
        var I = z / P,
          D = I * I,
          F = D * I,
          y = 2 * F - 3 * D + 1,
          N = F - 2 * D + I,
          Q = -2 * F + 3 * D,
          Y = F - D;
        ge.push({
          z: g.z + S * I,
          x: y * g.x + N * S * f[c] + Q * H.x + Y * S * f[c + 1],
          y: y * g.y + N * S * j[c] + Q * H.y + Y * S * j[c + 1],
        });
      }
    if ((ge.push({ z: Ce, x: t[t.length - 1].x, y: t[t.length - 1].y }), Be)) {
      Be.style.transform = "";
      var R = Be.offsetHeight,
        $ = x - (Z ? 126 : 160);
      Be.style.transform = R > $ ? "scale(" + ($ / R).toFixed(3) + ")" : "";
    }
    ((K = e * de), e > 0 && X < 0 && scrollTo(0, K));
  }
  function Ht(e) {
    if (e <= ae[0].s) return ae[0].zc;
    for (var n = 1; n < ae.length; n++) {
      var a = ae[n - 1],
        i = ae[n];
      if (e <= i.s) {
        var t = (e - a.s) / Math.max(1, i.s - a.s),
          r = i.ease;
        return ((t = t * (1 - r) + E(t) * r), a.zc + (i.zc - a.zc) * t);
      }
    }
    return ae[ae.length - 1].zc;
  }
  function Je(e, n, a) {
    return (
      "rgb(" +
      Math.round(e[0] + (n[0] - e[0]) * a) +
      "," +
      Math.round(e[1] + (n[1] - e[1]) * a) +
      "," +
      Math.round(e[2] + (n[2] - e[2]) * a) +
      ")"
    );
  }
  var ct = [34, 52, 224],
    ut = [124, 138, 255];
  function It(e) {
    k.clearRect(0, 0, q, x);
    var n = q / 2,
      a = x / 2,
      i = 0.1 * p,
      t = Math.min(e + Ae, Ce);
    for (var mirror = 0; mirror < 2; mirror++) {
      k.save();
      if (mirror) {
        k.translate(q, 0);
        k.scale(-1, 1);
      }
      var r = null,
        d = null;
    ((k.lineCap = "butt"),
      (k.lineJoin = "round"),
      (k.miterLimit = 1),
      (k.strokeStyle = Je(ct, ut, ce)));
    for (var o = null, u = 0; u < ge.length; u++) {
      var s = ge[u];
      if (s.z < e + i) {
        r = null;
        continue;
      }
      if (s.z > t)
        if (r) {
          var f = ge[u - 1],
            j = (t - f.z) / Math.max(1, s.z - f.z);
          s = { z: t, x: f.x + (s.x - f.x) * j, y: f.y + (s.y - f.y) * j };
        } else break;
      var c = s.z - e,
        w = p / c,
        A = n + s.x * w,
        _ = a + s.y * w,
        g = { X: A, Y: _, dz: c, z: s.z };
      if (!(r && s.z < t && Math.abs(A - r.X) + Math.abs(_ - r.Y) < 1.2)) {
        if (r) {
          var H = M(2.4 * w, 0.5, 7),
            S =
              (1 - 0.82 * E((c - 1.2 * p) / (Ae - 1.2 * p))) *
              E((c - i) / (0.3 * p)),
            P = Math.round(S * 40) / 40,
            z = Math.round(H * 4) / 4;
          if (P <= 0) {
            (o && (k.stroke(), (o = null)), (r = g));
            continue;
          }
          ((!o || o.a !== P || o.w !== z) &&
            (o && k.stroke(),
            (o = { a: P, w: z }),
            (k.globalAlpha = P),
            (k.lineWidth = z),
            k.beginPath(),
            k.moveTo(r.X, r.Y)),
            k.lineTo(A, _));
        } else o && (k.stroke(), (o = null));
        if (((r = g), (d = g), s.z >= t)) break;
      }
    }
    if ((o && k.stroke(), (k.globalAlpha = 1), d)) {
      var I = p / d.dz,
        D = M(5 * I, 2.5, 14),
        F = t >= Ce - 1;
      ((k.fillStyle = Je(ct, ut, ce)),
        k.beginPath(),
        k.arc(d.X, d.Y, F ? M(11 * I, 6, 22) : D, 0, Math.PI * 2),
        k.fill(),
        F ||
          ((k.globalAlpha = 0.18),
          k.beginPath(),
          k.arc(d.X, d.Y, D * 2.6, 0, Math.PI * 2),
          k.fill(),
          (k.globalAlpha = 1)));
    }
      k.restore();
    }
  }
  function Rt(e) {
    for (var n = q / 2, a = x / 2, i = 0; i < ve.length; i++) {
      var t = ve[i],
        r = t.z - e,
        d = p * (1 + t.zo),
        o = r - d;
      const isHero = t.el.classList.contains("hero-scene");
      if (o > 2.7 * p || r < 0.16 * p) {
        t.vis && ((t.el.style.visibility = "hidden"), (t.vis = !1));
        continue;
      }
      var u = (t.abs ? p * t.abs : d) / r,
        s = o > 0 ? E(o / (1.9 * p)) : 0,
        f = (t.x + t.fx * s) * q,
        j = (t.y + t.fy * s) * x,
        c = n + f * u,
        w = a + j * u,
        A = t.ff,
        _ =
          o > 0
            ? 1 - E((o - 0.45 * A) / (0.55 * A))
            : 1 - E((-o - 0.22 * p) / (0.42 * p));
      if (_ < 0.01 && !isHero) {
        t.vis && ((t.el.style.visibility = "hidden"), (t.vis = !1));
        continue;
      }
      const elementOpacity = isHero ? Math.max(_, 0.7) : _;
      (t.vis || ((t.el.style.visibility = "visible"), (t.vis = !0)),
        (t.el.style.opacity = elementOpacity.toFixed(3)),
        (t.el.style.transform =
          "translate3d(" +
          c.toFixed(1) +
          "px," +
          w.toFixed(1) +
          "px,0) translate(-50%,-50%) perspective(1100px) rotateY(" +
          (t.r * s).toFixed(2) +
          "deg) scale(" +
          u.toFixed(4) +
          ")"),
        t.el.style.setProperty("--k", s.toFixed(3)),
        t.el.style.setProperty(
          "--fp",
          M((0.55 * p - o) / (0.65 * p), 0, 1).toFixed(3),
        ),
        t.el.style.setProperty(
          "--dp",
          E((-o - 0.03 * p) / (0.38 * p)).toFixed(3),
        ));
      var g = Math.max(0, (-o - 0.03 * p) / (0.38 * p)),
        H =
          g < 1
            ? 3 * g * g - 2 * g * g * g + 0.35 * (g * g * g - g * g)
            : 1 + 0.35 * (g - 1);
      if (
        (t.el.style.setProperty("--sp", H.toFixed(3)),
        t.pose === void 0 &&
          (t.pose = [].slice.call(t.el.querySelectorAll(".pose img"))),
        t.pose.length)
      ) {
        var S = Math.round(
          M((-o + 0.04 * p) / (0.42 * p), 0, 1) * (t.pose.length - 1),
        );
        S !== t.pf &&
          (t.pf != null
            ? t.pose[t.pf].classList.remove("on")
            : t.pose[0].classList.remove("on"),
          t.pose[S].classList.add("on"),
          (t.pf = S));
      }
      if (
        (t.runner === void 0 && (t.runner = t.el.querySelector(".runner")),
        t.runner)
      ) {
        var P = M((0.55 * p - o) / (0.65 * p), 0, 1),
          z = M((-o - 0.1 * p) / (0.42 * p), 0, 1),
          I = P * 96 + z * 26,
          D = -1.5 * z + 2.9 * z * z;
        t.runner.style.left = I.toFixed(2) + "%";
        var F = t.runner.parentNode,
          y = F.offsetWidth;
        t.jw !== y &&
          ((t.jw = y),
          (t.jc = [].slice.call(F.querySelectorAll(".c")).map(function (Y) {
            for (var R = 0, $ = Y; $ && $ !== F;)
              ((R += $.offsetLeft), ($ = $.offsetParent));
            return [Y, (R / y) * 100, (Y.offsetWidth / y) * 100];
          })),
          (t.jx = null));
        var N = Math.min(I, 100);
        (t.jx !== N &&
          ((t.jx = N),
          t.jc.forEach(function (Y) {
            Y[0].style.setProperty(
              "--cf",
              (M((N - Y[1]) / Y[2], 0, 1) * 100).toFixed(1) + "%",
            );
          })),
          (t.runner.style.transform =
            "translate(-50%," +
            D.toFixed(3) +
            "em) rotate(" +
            (z * 24).toFixed(1) +
            "deg)"));
        var Q = z > 0.01 ? "pj" : "run";
        (t.runner._p !== Q &&
          (t.runner.classList.remove("run", "pj"),
          t.runner.classList.add(Q),
          (t.runner._p = Q)),
          Q === "run" &&
            t.runner._ph !== P &&
            ((t.runner._ph = P), ft(t.runner, P * 7 * Math.PI * 2)));
      }
      (t.spr === void 0 && (t.spr = t.el.querySelector(".spray")),
        t.spr &&
          Ot(
            t.spr,
            M((M((0.55 * p - o) / (0.65 * p), 0, 1) - 0.3) / 0.68, 0, 1),
          ),
        t.ctw === void 0 && (t.ctw = t.el.querySelector(".ct-wrap")),
        t.ctw &&
          Kt(
            t.ctw,
            M(
              (K - (t.st.sHold - 0.4 * x)) / (0.4 * x + t.st.holdPx * 0.95),
              0,
              1,
            ),
          ),
        (t.el.style.pointerEvents = _ > 0.6 && u < 1.6 ? "auto" : "none"),
        t.node && t.node.classList.toggle("on", o < 0.05 * p));
    }
  }
  function Nt(e) {
    if (ye) {
      var n = ye.sHold,
        a = ye.holdPx,
        i = E((e - (n - 0.75 * x)) / (1.05 * x)),
        t = (e - (n + 0.05 * x)) / (0.95 * x),
        r = E((e - (n + a - 1.05 * x)) / (1 * x));
      if (i <= 0 || r >= 1) {
        se.style.visibility !== "hidden" &&
          ((se.style.visibility = "hidden"), (se.style.pointerEvents = "none"));
        return;
      }
      se.style.visibility = "visible";
      var d = Math.hypot(q, x) * 0.62 * i + 1;
      Te.style.clipPath =
        "circle(" +
        d.toFixed(1) +
        "px at " +
        (q / 2 + ye.ax * q) +
        "px " +
        (x / 2 + ye.ay * x) +
        "px)";
      var o = 1 - 0.84 * r;
      ((Te.style.transform =
        "perspective(1200px) translate3d(0," +
        -r * x * 0.04 +
        "px,0) rotateX(" +
        r * 14 +
        "deg) scale(" +
        o.toFixed(4) +
        ")"),
        (Te.style.borderRadius = r * 36 + "px"),
        (Te.style.opacity = (1 - E((r - 0.7) / 0.3)).toFixed(3)),
        Ct.forEach(function (s, f) {
          var j = 1 - E(t * 1.6 - f * 0.13);
          s.style.setProperty("--q", j.toFixed(3));
        }),
        (se.style.pointerEvents = i > 0.98 && r < 0.2 ? "auto" : "none"));
      var u = l("#dkvid");
      u && !u.paused && !(i > 0.9 && r < 0.85) && u.pause();
    }
  }
  var qe = l("#count"),
    We = !1,
    ce = 0,
    pt = -1,
    Ue = 0;
  qe && (qe.textContent = "0");
  var Ve = {
    bg: [
      [236, 234, 226],
      [11, 12, 11],
    ],
    ink: [
      [18, 20, 19],
      [241, 241, 238],
    ],
    muted: [
      [94, 99, 96],
      [154, 160, 156],
    ],
    hair: [
      [211, 208, 198],
      [44, 47, 45],
    ],
    line: [
      [34, 52, 224],
      [124, 138, 255],
    ],
  };
  function Gt(e) {
    var n = W.filter(function (o) {
      return o.sec.dataset.dark;
    });
    if (n.length) {
      ((ce = 0),
        n.forEach(function (o) {
          var u = o.z - e - p;
          ce = Math.max(
            ce,
            Math.min(
              1 - E((u - 0.45 * p) / (0.85 * p)),
              1 - E((-u - 0.6 * p) / (0.65 * p)),
            ),
          );
        }));
      var a = n[0],
        i = a.z - e - p;
      if (Math.abs(ce - pt) > 0.003) {
        pt = ce;
        for (var t in Ve)
          C.style.setProperty("--" + t, Je(Ve[t][0], Ve[t][1], ce));
      }
      if (!We && i < 0.5 * p && i > -0.8 * p) {
        We = !0;
        var r = performance.now(),
          d = ++Ue;
        (function o(u) {
          if (d === Ue) {
            var s = M((u - r) / 1100, 0, 1),
              f = 1 - Math.pow(1 - s, 3);
            ((qe.textContent = Math.round(10 * f)),
              s < 1 && requestAnimationFrame(o));
          }
        })(r);
      }
      We && i > 1.4 * p && ((We = !1), Ue++, (qe.textContent = "0"));
    }
  }
  function Ot(e, n) {
    if (e._p !== n) {
      e._p = n;
      var a = e.querySelector(".spray-p"),
        i = e.querySelector(".spray-mist");
      if (!e._L) {
        let R = function () {
          return ((r = (r * 16807) % 2147483647), r / 2147483647);
        };
        var Y = R;
        ((e._L = a.getTotalLength()), (a.style.strokeDasharray = e._L));
        var t = e.querySelector(".spray-dots"),
          r = 11,
          d = "";
        e._dots = [];
        for (var o = 0; o < 55; o++) {
          var u = R(),
            s = a.getPointAtLength(u * e._L),
            f = R() * Math.PI * 2,
            j = 10 + Math.pow(R(), 1.6) * 20;
          ((d +=
            '<circle cx="' +
            (s.x + Math.cos(f) * j).toFixed(1) +
            '" cy="' +
            (s.y + Math.sin(f) * j).toFixed(1) +
            '" r="' +
            (0.7 + R() * 2).toFixed(1) +
            '" opacity="0"/>'),
            e._dots.push(u));
        }
        ((t.innerHTML = d), (e._dc = [].slice.call(t.children)));
      }
      var c = Math.min(1, n / 0.55),
        w = E((n - 0.4) / 0.5),
        A = M((n - 0.72) / 0.28, 0, 1);
      a.style.strokeDashoffset = (e._L * (1 - c)).toFixed(1);
      var _ = e.querySelector(".spray-pool"),
        g = e.querySelector(".spray-drip");
      (_ && (_.style.transform = "scale(" + w.toFixed(3) + ")"),
        g &&
          ((g.style.strokeDashoffset = (40 * (1 - A)).toFixed(1)),
          (g.style.opacity = A > 0.01 ? 1 : 0)),
        (a.style.opacity = c > 0.005 ? 1 : 0),
        e._dc.forEach(function (R, $) {
          var h = e._dots[$];
          R.setAttribute(
            "opacity",
            c > h ? (0.35 + (0.5 * (($ * 37) % 10)) / 10).toFixed(2) : 0,
          );
        }),
        (i.style.opacity = n > 0.01 && n < 0.9 ? 1 : 0));
      var H = a.getPointAtLength(Math.max(0.001, c) * e._L);
      (i.setAttribute("cx", (H.x + 34).toFixed(1)),
        i.setAttribute("cy", (H.y - 8).toFixed(1)));
      var S = e.parentNode.querySelector(".spray-can");
      if (S) {
        var P = e.parentNode,
          z = P.offsetWidth / 160,
          I = P.offsetHeight / 300,
          D = e._st || (e._st = a.getPointAtLength(0)),
          F = D.x + 64 + (H.x - D.x) * 0.12,
          y = D.y - 16 + n * 14,
          N = F * z - S.offsetWidth * 0.781,
          Q = y * I - S.offsetHeight * 0.056;
        S.style.transform =
          "translate(" +
          N.toFixed(1) +
          "px," +
          Q.toFixed(1) +
          "px) rotate(" +
          (Math.sin(n * 6) * 2).toFixed(1) +
          "deg)";
      }
    }
  }
  function Kt(e, n) {
    if (e._p === n) return;
    ((e._p = n),
      e._k ||
        (e._k = {
          h: e.querySelector("h2"),
          pa: e.querySelector(".para"),
          cs: [].slice.call(e.querySelectorAll(".c")),
        }));
    var a = e._k,
      i = e.offsetWidth,
      t = parseFloat(getComputedStyle(a.h).fontSize);
    a.sig !== i + "|" + t &&
      ((a.sig = i + "|" + t),
      (a.home = a.cs.map(function (te) {
        for (var Mt = 0, At = 0, xe = te; xe && xe !== e;)
          ((Mt += xe.offsetLeft), (At += xe.offsetTop), (xe = xe.offsetParent));
        return [Mt + te.offsetWidth / 2, At + te.offsetHeight / 2];
      })),
      (a.sw = Math.max(0.8 * t, 52)),
      (a.pa.style.width = a.sw + "px"));
    var r = e.getBoundingClientRect(),
      d = r.width / Math.max(1, i),
      o = -r.left / d,
      u = (innerWidth - r.left) / d;
    -r.top / d;
    var s = a.cs.length,
      f = a.sw / 60,
      j = a.home[0][1] - 0.35 * t,
      c = 0.15 * t,
      w = 0.3,
      A = 0.18 * t,
      _ = 0.04,
      g = 0.9,
      H = o - a.sw,
      S = u + a.sw;
    function P(te) {
      return H + (S - H) * M((te - _) / (g - _), 0, 1);
    }
    function z(te) {
      return _ + ((g - _) * (te - H)) / (S - H);
    }
    var I = P(n),
      D = 0.07,
      F = 0,
      y,
      N = a.home.map(function (te) {
        return z(te[0] - 0.04 * t);
      });
    for (y = 0; y < s; y++) n < N[y] && F++;
    var Q = 1 - E(M((n - _) / 0.25, 0, 1)),
      Y = function (te) {
        return te * c + 0.12 * t;
      },
      R = 0;
    for (y = 0; y < s; y++) {
      var $ = M((n - N[y] + 0.02) / 0.06, 0, 1);
      R += 1 - $;
    }
    var h = j - A - Y(R) - Q * ((innerHeight * 0.6) / d),
      J = Math.sin(n * 22);
    n >= g - 0.12 && (h -= E((n - (g - 0.12)) / 0.12) * t * 0.8);
    var ee = 0;
    for (y = 0; y < s; y++) {
      var ue = a.cs[y],
        T = a.home[y],
        B,
        ie,
        re,
        oe;
      if (n < N[y]) {
        var Xe = F - 1 - ee;
        (ee++,
          (B = I + (y % 2 ? 1 : -1) * 0.035 * t + J * 0.02 * t * (Xe / s)),
          (ie = h + 0.06 * t + (F - 1 - (F - 1 - Xe)) * 0 + Xe * c + c * 0.5),
          (re = w),
          (oe = ((y % 3) - 1) * 6 + J * 2));
      } else {
        var be = M((n - N[y]) / D, 0, 1),
          kt = P(N[y]) + (y % 2 ? 1 : -1) * 0.035 * t,
          Ze = h + 0.06 * t + c * (F + 0.5),
          Xt = be * be;
        if (
          ((B = kt + (T[0] - kt) * E(be)),
          (ie = Ze + (T[1] - Ze) * Xt),
          (re = w + (1 - w) * E(Math.min(1, be * 1.6))),
          (oe = ((y % 3) - 1) * 6 * (1 - be)),
          be >= 1)
        ) {
          var Zt = M((n - N[y] - D) / 0.03, 0, 1);
          ie -= Math.sin(Math.PI * Zt) * 0.05 * t;
        }
        Ze = 0;
      }
      var jt =
        (B - T[0]).toFixed(1) +
        "," +
        (ie - T[1]).toFixed(1) +
        "," +
        re.toFixed(3) +
        "," +
        oe.toFixed(1);
      ue._t !== jt &&
        ((ue._t = jt),
        (ue.style.transform =
          Math.abs(B - T[0]) < 0.05 &&
          Math.abs(ie - T[1]) < 0.05 &&
          re > 0.999 &&
          Math.abs(oe) < 0.05
            ? "none"
            : "translate(" +
              (B - T[0]).toFixed(1) +
              "px," +
              (ie - T[1]).toFixed(1) +
              "px) rotate(" +
              oe.toFixed(1) +
              "deg) scale(" +
              re.toFixed(3) +
              ")"));
    }
    ((a.pa.style.visibility = n > _ && n < g ? "visible" : "hidden"),
      (a.pa.style.transform =
        "translate(" +
        (I - 30 * f).toFixed(1) +
        "px," +
        (h - 74 * f).toFixed(1) +
        "px) rotate(" +
        (J * 5).toFixed(2) +
        "deg)"));
  }
  function ft(e, n) {
    e._k ||
      ((e._k = {}),
      m("[data-k]", e).forEach(function (c) {
        e._k[c.dataset.k] = c;
      }));
    var a = e._k,
      i = Math.PI / 180,
      t = Math.abs(Math.sin(n)) * 1.1,
      r = 17,
      d = 25.5 - t,
      o = 19.6,
      u = 14.2 - t;
    function s(c, w) {
      return [Math.sin(c * i) * w, Math.cos(c * i) * w];
    }
    function f(c) {
      var w = 40 * Math.sin(c),
        A =
          12 +
          78 * Math.max(0, Math.cos(c)) * Math.max(0, Math.cos(c) * 0.6 + 0.5),
        _ = s(w, 8.6),
        g = s(w - A, 8.8);
      return (
        "M" +
        r +
        " " +
        d +
        "l" +
        _[0].toFixed(2) +
        " " +
        _[1].toFixed(2) +
        "l" +
        g[0].toFixed(2) +
        " " +
        g[1].toFixed(2)
      );
    }
    function j(c) {
      var w = -52 * Math.sin(c) + 4,
        A = s(w, 6.4),
        _ = s(w + 78, 5.6);
      return (
        "M" +
        o +
        " " +
        u +
        "l" +
        A[0].toFixed(2) +
        " " +
        A[1].toFixed(2) +
        "l" +
        _[0].toFixed(2) +
        " " +
        _[1].toFixed(2)
      );
    }
    (a.lf.setAttribute("d", f(n)),
      a.lb.setAttribute("d", f(n + Math.PI)),
      a.af.setAttribute("d", j(n + Math.PI)),
      a.ab.setAttribute("d", j(n)),
      a.tor.setAttribute(
        "d",
        "M" + r + " " + d + "L" + (o + 0.4) + " " + (u - 1.2),
      ),
      a.hd.setAttribute("cx", 21.4),
      a.hd.setAttribute("cy", (6.4 - t).toFixed(2)));
  }
  m(".runner").forEach(function (e) {
    ft(e, 0);
  });
  var Yt = l("#hudn"),
    $t = l("#hudl"),
    Jt = l("#hud"),
    mt = l("#ticks"),
    ht = "",
    vt = "";
  function Ut(e) {
    var n = W[0],
      a = 0,
      i = 0;
    (W.forEach(function (d) {
      (d.gap >= 2.2 || d === W[0]) &&
        (e >= d.sHold - 0.6 * x && ((n = d), (a = i)), i++);
    }),
      n.label !== ht &&
        ((ht = n.label),
        ($t.textContent = n.label),
        (Yt.textContent = String(a + 1).padStart(2, "0"))));
    var t = M(e / de, 0, 1);
    Jt.style.setProperty("--p", t.toFixed(4));
    var r = de + "|" + x;
    (r !== vt &&
      ((vt = r),
      (mt.innerHTML = W.filter(function (d, o) {
        return o === 0 || d.gap >= 2.2;
      })
        .map(function (d) {
          return (
            '<i class="tk" data-s="' +
            d.sHold +
            '" style="top:' +
            ((d.sHold / de) * 100).toFixed(2) +
            '%"></i>'
          );
        })
        .join(""))),
      m(".tk", mt).forEach(function (d) {
        d.classList.toggle("on", +d.dataset.s <= e + 2);
      }));
  }
  var gt = performance.now(),
    yt = null,
    bt = null,
    xt = -1,
    Le = !0;
  function wt(e) {
    var n = Math.min(0.05, (e - gt) / 1e3);
    gt = e;
    var a = scrollY,
      i = a - K;
    ((K += i * (1 - Math.exp(-n * (Math.abs(i) > 3 * x ? 9 : 5.5)))),
      Math.abs(i) < 0.3 && (K = a));
    var t = M((e - qt - 250) / 1700, 0, 1);
    Ae = (Z ? 3 : 3.3) * p * E(t);
    var r = Ht(K);
    ((r !== yt || K !== bt || Ae !== xt || Le) &&
      ((yt = r),
      (bt = K),
      (xt = Ae),
      (Le = !1),
      Gt(r),
      It(r),
      Rt(r),
      Nt(K),
      Ut(K)),
      requestAnimationFrame(wt));
  }
  var Vt = matchMedia("(pointer: coarse)").matches,
    _t;
  (addEventListener("resize", function () {
    (Vt && innerWidth === lt) ||
      (clearTimeout(_t),
      (_t = setTimeout(function () {
        ($e(), (Le = !0));
      }, 150)));
  }),
    $e(),
    scrollTo(0, 0),
    requestAnimationFrame(wt),
    (function () {
      var e = location.pathname.match(/^\/projects\/([^\/]+)/);
      if (e) {
        var n = -1;
        if (
          (U.forEach(function (a, i) {
            a.slug === e[1] && (n = i);
          }),
          n < 0)
        ) {
          je(-1);
          return;
        }
        setTimeout(function () {
          var a = v.querySelector('[data-proj="' + n + '"]');
          if (a) {
            var i = ve.filter(function (r) {
              return r.el.contains(a);
            })[0];
            if (i) {
              var t = i.st.sHold + 2;
              (scrollTo(0, t), (K = t), (Le = !0));
            }
            Ne(n, a, !0);
          }
        }, 700);
      }
    })(),
    v.fonts &&
      v.fonts.ready &&
      v.fonts.ready.then(function () {
        ($e(), (Le = !0));
      }));
})();
