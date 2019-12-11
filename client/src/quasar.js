import Vue from 'vue'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QFooter,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QInput,
  QAvatar,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QForm,
  QSpace,
  QMenu,
  QSpinnerBars,
  QTooltip,
  Notify,
  QTabs,
  QTab,
  QRouteTab,
  QTabPanels,
  QTabPanel,
  QScrollArea,
  QSplitter,
  QCard,
  QCardSection,
  QCardActions,
  QSelect,
  QSlider,
  QSeparator,
  QToggle,
  Ripple,
  QBar,
  QDialog,
  ClosePopup,
  QVirtualScroll,
  QBanner,
  QScrollObserver,
  QChatMessage
} from 'quasar'

Vue.use(Quasar, {
  config: {
  },
  components: {
    QLayout,
    QHeader,
    QFooter,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QForm,
    QInput,
    QAvatar,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSpace,
    QMenu,
    QSpinnerBars,
    QTooltip,
    QTabs,
    QTab,
    QRouteTab,
    QTabPanels,
    QTabPanel,
    QScrollArea,
    QSplitter,
    QCard,
    QCardSection,
    QCardActions,
    QSelect,
    QSlider,
    QSeparator,
    QToggle,   
    QDialog,
    QBanner,
    QVirtualScroll,
    QScrollObserver,
    QChatMessage,
    QBar
  },
  directives: {
    Ripple,
    ClosePopup
  },
  plugins: {
    Notify
  }
})
