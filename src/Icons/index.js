const FashionLogo = ({
  className,
  logoStyle,
  iconStyle,
  textStyle,
  bgLogo,
  yAction,
}) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" className={`${logoStyle}`}>
      <rect width="100%" height="100%" fill={`${bgLogo ? bgLogo : "black"}`} />
      <image
        href="https://static.vecteezy.com/system/resources/previews/025/468/659/non_2x/letter-d-butterfly-logo-concept-for-luxury-beauty-spa-and-fashion-symbol-free-vector.jpg"
        x="0"
        y="0"
        className={`text-center self-center ${iconStyle}`}
      />
      <text
        x="50%"
        y={`${yAction}`}
        className={`text-[15px] font-bree hover:font-arial ${
          textStyle ? textStyle : "fill-white"
        }  mt-3`}
        textAnchor="middle"
      >
        Nxt Fashion
      </text>
    </svg>
  </div>
);

const BackWordIcon = ({ onClick }) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6 w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  </div>
);

const DeleteIcon = ({ onClick , className }) => (
  <div onClick={onClick} className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-6 w-6 h-6 text-black ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  </div>
);

export { FashionLogo, BackWordIcon, DeleteIcon };
