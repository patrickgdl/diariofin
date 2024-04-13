import i18next from "i18next"

import common_es from "./es/common.json"
import common_en from "./en/common.json"
import common_pt from "./pt/common.json"
import dashboard_en from "./en/dashboard.json"
import dashboard_es from "./es/dashboard.json"
import dashboard_pt from "./pt/dashboard.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: "pt",
  resources: {
    pt: {
      common: common_pt,
      dashboard: dashboard_pt,
    },
    en: {
      common: common_en,
      dashboard: dashboard_en,
    },
    es: {
      common: common_es,
      dashboard: dashboard_es,
    },
  },
})
