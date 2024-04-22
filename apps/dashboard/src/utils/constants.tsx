import { ReactNode } from "react"

export type LinkProps = { route: string; label: string; icon?: ReactNode }

// NOTE: icons are from https://hugeicons.com/
export const LINKS: LinkProps[] = [
  {
    label: "Dashboard",
    route: "/overview",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          opacity="0.3"
          d="M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50271 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50271 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 12.25C7.41421 12.25 7.75 12.5858 7.75 13L7.75 17C7.75 17.4142 7.41421 17.75 7 17.75C6.58579 17.75 6.25 17.4142 6.25 17L6.25 13C6.25 12.5858 6.58579 12.25 7 12.25Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7L12.75 17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17L11.25 7C11.25 6.58579 11.5858 6.25 12 6.25Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 10.25C17.4142 10.25 17.75 10.5858 17.75 11L17.75 17C17.75 17.4142 17.4142 17.75 17 17.75C16.5858 17.75 16.25 17.4142 16.25 17L16.25 11C16.25 10.5858 16.5858 10.25 17 10.25Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    label: "Transações",
    route: "/transactions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M15.7138 4.29577C16.1006 4.69001 16.0945 5.32314 15.7003 5.70992L6.67027 14.5457L6.67025 14.5457C6.29581 14.9203 5.93244 15.2838 5.61629 15.5271C5.32406 15.7519 4.66669 16.1956 3.91819 15.905C3.16969 15.6145 3.04953 14.869 3.01731 14.5182C2.98245 14.1387 3.00694 13.6437 3.03216 13.1335L3.07997 12.1625C3.10435 11.6649 3.12813 11.1797 3.19945 10.803C3.26669 10.4478 3.45766 9.71857 4.20958 9.37706C4.97311 9.03027 5.59082 9.40861 5.86995 9.61238C6.16305 9.82634 6.4909 10.1544 6.82421 10.4879L7.39382 11.0575L14.2997 4.28227C14.6939 3.89549 15.327 3.90154 15.7138 4.29577Z"
          fill="currentColor"
        ></path>
        <path
          opacity="0.4"
          d="M8.28619 19.7003C7.89941 19.3061 7.90546 18.673 8.29969 18.2862L17.3297 9.45037L17.3298 9.45036C17.7042 9.07576 18.0676 8.71225 18.3837 8.46902C18.6759 8.24421 19.3333 7.80051 20.0818 8.09106C20.8303 8.38161 20.9505 9.12713 20.9827 9.47788C21.0175 9.85736 20.9931 10.3524 20.9678 10.8626L20.92 11.8336C20.8956 12.3311 20.8719 12.8164 20.8006 13.1931C20.7333 13.5483 20.5423 14.2775 19.7904 14.619C19.0269 14.9658 18.4092 14.5875 18.13 14.3837C17.837 14.1697 17.5091 13.8417 17.1758 13.5082L16.6062 12.9386L9.70034 19.7138C9.3061 20.1006 8.67297 20.0946 8.28619 19.7003Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  // {
  //   label: "Clientes",
  //   route: "/clients",
  //   icon: Factory,
  // },
  {
    label: "Contas",
    route: "/accounts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          opacity="0.4"
          d="M22.75 12.0528C22.75 13.7768 22.75 15.1427 22.6124 16.2222C22.4707 17.3333 22.1732 18.239 21.507 18.9862C21.3093 19.208 21.0919 19.4125 20.8574 19.5977C20.074 20.2164 19.1316 20.4901 17.9694 20.6214C16.8308 20.75 15.3866 20.75 13.5475 20.75H10.4525C8.61345 20.75 7.16917 20.75 6.03058 20.6214C4.86842 20.4901 3.926 20.2164 3.14263 19.5977C2.90811 19.4125 2.69068 19.2079 2.49298 18.9862C1.82681 18.239 1.52932 17.3333 1.38763 16.2222C1.24998 15.1427 1.24999 13.7767 1.25 12.0527V11.9473C1.25 11.3715 1.24999 10.8357 1.25512 10.3371C1.25795 10.0614 1.25937 9.92356 1.34704 9.83678C1.43472 9.75 1.57361 9.75 1.85139 9.75H22.1486C22.4264 9.75 22.5653 9.75 22.653 9.83678C22.7406 9.92356 22.7421 10.0614 22.7449 10.3371C22.75 10.8356 22.75 11.3715 22.75 11.9473V12.0528Z"
          fill="currentColor"
        ></path>
        <path
          d="M13.5485 3.25C15.3875 3.24999 16.8317 3.24998 17.9703 3.3786C19.1325 3.50988 20.0749 3.78362 20.8583 4.40229C21.0928 4.58749 21.3102 4.79205 21.5079 5.0138C22.1741 5.76101 22.4716 6.66669 22.6133 7.77785C22.6296 7.9057 22.6377 7.96963 22.6231 8.02579C22.5996 8.11553 22.5308 8.19375 22.4447 8.22835C22.3909 8.25 22.3235 8.25 22.1887 8.25H1.81314C1.67836 8.25 1.61097 8.25 1.55712 8.22835C1.47105 8.19375 1.40218 8.11554 1.37874 8.02579C1.36408 7.96963 1.37223 7.9057 1.38854 7.77785C1.53023 6.66669 1.82772 5.76101 2.49389 5.0138C2.69159 4.79205 2.90902 4.58749 3.14354 4.40229C3.92692 3.78362 4.86933 3.50988 6.03149 3.3786C7.17008 3.24998 8.61437 3.24999 10.4534 3.25H13.5485Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.25 16C10.25 15.5858 10.5858 15.25 11 15.25H12.5C12.9142 15.25 13.25 15.5858 13.25 16C13.25 16.4142 12.9142 16.75 12.5 16.75H11C10.5858 16.75 10.25 16.4142 10.25 16Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.75 16C14.75 15.5858 15.0858 15.25 15.5 15.25L19 15.25C19.4142 15.25 19.75 15.5858 19.75 16C19.75 16.4142 19.4142 16.75 19 16.75L15.5 16.75C15.0858 16.75 14.75 16.4142 14.75 16Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    label: "Categorias",
    route: "/categories",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          opacity="0.4"
          d="M19.4595 1.57208C20.2081 1.74402 20.9663 2.0252 21.4705 2.5294C21.9747 3.0336 22.2559 3.79184 22.4279 4.54046C22.6055 5.3138 22.6927 6.19907 22.7288 7.06907C22.8011 8.81159 22.6717 10.5921 22.588 11.5022C22.5359 12.0702 22.3035 12.5946 21.9406 13.0168C19.2313 16.1691 16.4228 19.0388 13.3563 21.7845C11.9532 23.0408 9.85825 23.0541 8.39712 21.9228C5.98744 20.0571 3.94283 18.0125 2.07709 15.6028C0.945789 14.1417 0.959114 12.0467 2.21543 10.6436C4.9611 7.57712 7.83082 4.76863 10.9831 2.05931C11.4053 1.69644 11.9298 1.46409 12.4977 1.4119C13.4078 1.32827 15.1884 1.19887 16.9309 1.27116C17.8009 1.30726 18.6861 1.39446 19.4595 1.57208Z"
          fill="currentColor"
        ></path>
        <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 16 8)" fill="currentColor"></circle>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.29289 13.2929C6.68342 12.9024 7.31658 12.9024 7.70711 13.2929L10.7071 16.2929C11.0976 16.6834 11.0976 17.3166 10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L6.29289 14.7071C5.90237 14.3166 5.90237 13.6834 6.29289 13.2929Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  // {
  //   label: "Relatórios",
  //   route: "/reports",
  //   icon: FileDown,
  // },
]

export const LOCAL_STORAGE_KEYS = {
  ONBOARDING_ACCOUNTS: "onboarding-accounts",
  ONBOARDING_CATEGORIES: "onboarding-categories",
  SIDEBAR_IS_COLLAPSED: "sidebar-is-collapsed",
  SIDEBAR_SIZES: "sidebar-sizes",
}
