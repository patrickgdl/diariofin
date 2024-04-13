import { useTheme } from "next-themes"
import { SVGAttributes } from "react"

const Logo = ({ className, ...rest }: SVGAttributes<SVGElement>) => {
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <svg
      width="197"
      height="30"
      viewBox="0 0 197 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.22218 6.95357H15.6093V0.68182H0.950195V15.3409C0.950195 23.4368 7.51346 29.9998 15.6093 30C23.7051 29.9998 30.2684 23.4368 30.2684 15.3409C30.2684 7.96341 24.8182 1.85981 17.7249 0.834259V7.22257C21.3337 8.15971 23.9967 11.4376 23.9967 15.3409C23.9967 19.975 20.2434 23.728 15.6093 23.7283C10.9752 23.7283 7.22218 19.975 7.22218 15.3409H15.6093V9.06917H7.22218V6.95357Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M41.0411 23.6591H43.4275V4.36364H41.0411V2.11364H60.0298V8.45455H56.0752V4.56819H48.9502V12.7841H53.4502V10.7386H55.973V17.2841H53.4502V15.2387H48.9502V23.6591H52.1889V25.9091H41.0411V23.6591Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M62.3368 23.6591H64.3822V3.85228L62.3368 3.40909V1.46591L69.5641 0V23.6591H71.6095V25.9091H62.3368V23.6591Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M81.2972 26.3182C79.1154 26.3182 77.5699 25.7728 76.6608 24.6818C75.7745 23.5682 75.3313 21.9091 75.3313 19.7046V11.4886L73.2858 11.0455V9.10228L80.5131 7.63637V19.5341C80.5131 20.7387 80.7177 21.6023 81.1268 22.125C81.5586 22.625 82.2745 22.875 83.2745 22.875C83.6609 22.875 84.0472 22.8296 84.4336 22.7387C84.8199 22.625 85.1609 22.4659 85.4563 22.2614C85.7518 22.0341 85.9904 21.7614 86.1722 21.4432C86.354 21.1023 86.4449 20.6932 86.4449 20.2159V11.4886L84.3995 11.0455V9.10228L91.6268 7.63637V22.4659L93.6722 22.9091V24.8523L86.5472 26.3182V22.9432H86.3768C86.0586 23.8523 85.4904 24.6478 84.6722 25.3296C83.854 25.9887 82.729 26.3182 81.2972 26.3182Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M95.0175 23.6591H96.8925L101.597 17.4205L96.6538 10.2955H95.1198V8.04546H104.802V10.2955H102.756L105.824 14.7273H106.029L109.199 10.2955H107.256V8.04546H114.04V10.2955H112.165L107.427 16.5341L112.574 23.6591H114.108V25.9091H104.324V23.6591H106.37L103.199 19.2273H102.995L99.8584 23.6591H101.802V25.9091H95.0175V23.6591Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M124.005 23.8637C126.096 23.8637 127.141 22.6137 127.141 20.1137V13.8409C127.141 11.3409 126.096 10.0909 124.005 10.0909C121.914 10.0909 120.868 11.3409 120.868 13.8409V20.1137C120.868 22.6137 121.914 23.8637 124.005 23.8637ZM124.005 26.3182C122.709 26.3182 121.527 26.1137 120.459 25.7046C119.414 25.2728 118.505 24.6591 117.732 23.8637C116.982 23.0682 116.402 22.0909 115.993 20.9318C115.584 19.7727 115.38 18.4546 115.38 16.9773C115.38 15.5 115.584 14.1818 115.993 13.0227C116.402 11.8636 116.982 10.8864 117.732 10.0909C118.505 9.29547 119.414 8.69319 120.459 8.2841C121.527 7.85228 122.709 7.63637 124.005 7.63637C125.3 7.63637 126.471 7.85228 127.516 8.2841C128.584 8.69319 129.493 9.29547 130.243 10.0909C131.016 10.8864 131.607 11.8636 132.016 13.0227C132.425 14.1818 132.63 15.5 132.63 16.9773C132.63 18.4546 132.425 19.7727 132.016 20.9318C131.607 22.0909 131.016 23.0682 130.243 23.8637C129.493 24.6591 128.584 25.2728 127.516 25.7046C126.471 26.1137 125.3 26.3182 124.005 26.3182Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M134.829 23.5228L147.34 4.56819H139.294V8.45455H135.34V2.11364H153.613V4.50001L141.101 23.4546H149.999V18.8864H153.954V25.9091H134.829V23.5228Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M165.389 26.3182C163.98 26.3182 162.73 26.0909 161.639 25.6364C160.571 25.1591 159.662 24.5114 158.912 23.6932C158.184 22.8523 157.628 21.8637 157.241 20.7273C156.855 19.5682 156.662 18.3068 156.662 16.9432C156.662 15.5114 156.855 14.2159 157.241 13.0568C157.65 11.8977 158.218 10.9205 158.946 10.125C159.696 9.32956 160.582 8.71592 161.605 8.2841C162.65 7.85228 163.809 7.63637 165.082 7.63637C166.355 7.63637 167.503 7.82955 168.525 8.21592C169.548 8.60228 170.412 9.1591 171.116 9.88637C171.843 10.5909 172.4 11.4546 172.787 12.4773C173.173 13.5 173.366 14.6364 173.366 15.8864V17.0455H162.15V18.4091C162.15 19.9318 162.548 21.0796 163.343 21.8523C164.139 22.625 165.196 23.0114 166.514 23.0114C167.741 23.0114 168.73 22.7387 169.48 22.1932C170.23 21.625 170.764 20.9432 171.082 20.1477L172.957 21.2727C172.753 21.8409 172.457 22.4205 172.071 23.0114C171.684 23.6023 171.184 24.1478 170.571 24.6478C169.957 25.125 169.218 25.5228 168.355 25.8409C167.491 26.1591 166.503 26.3182 165.389 26.3182ZM162.15 14.8977H168.014V14.4205C168.014 12.7841 167.753 11.6364 167.23 10.9773C166.707 10.3182 165.991 9.98865 165.082 9.98865C164.173 9.98865 163.457 10.3182 162.934 10.9773C162.412 11.6364 162.15 12.7841 162.15 14.4205V14.8977Z"
        fill={isDark ? "white" : "#121212"}
      />
      <path
        d="M175.937 23.6591H177.982V11.4886L175.937 11.0455V9.10228L183.062 7.63637V11.0114H183.232C183.55 10.1023 184.119 9.31819 184.937 8.6591C185.755 7.97728 186.88 7.63637 188.312 7.63637C190.494 7.63637 192.028 8.19319 192.914 9.30683C193.823 10.3977 194.278 12.0455 194.278 14.25V23.6591H196.323V25.9091H187.221V23.6591H189.096V14.4205C189.096 13.2159 188.88 12.3636 188.448 11.8636C188.039 11.3409 187.335 11.0796 186.335 11.0796C185.948 11.0796 185.562 11.1364 185.175 11.25C184.789 11.3409 184.448 11.5 184.153 11.7273C183.857 11.9318 183.619 12.2046 183.437 12.5455C183.255 12.8636 183.164 13.2614 183.164 13.7387V23.6591H185.039V25.9091H175.937V23.6591Z"
        fill={isDark ? "white" : "#121212"}
      />
    </svg>
  )
}

export default Logo