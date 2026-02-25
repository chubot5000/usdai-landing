import {
  AaveIcon,
  AkashIcon,
  AnchorageIcon,
  ArbitrumIcon,
  BalancerIcon,
  BinanceIcon,
  CantinaLogo,
  ChainlinkIcon,
  ChronicleIcon,
  Coin98Icon,
  CoinbaseIcon,
  CopperIcon,
  CurveIcon,
  EthenaIcon,
  EthereumIcon,
  EulerIcon,
  FireblocksIcon,
  FluidIcon,
  GearboxIcon,
  ImmunefiIcon,
  LayerZeroIcon,
  M0Icon,
  MorphoIcon,
  OKXIcon,
  PendleIcon,
  PlasmaIcon,
  SpearbitLogo,
  UniswapIcon,
} from "./icons";

export interface EcosystemPartner {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const iconClass =
  "w-12 h-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300";

export const ECOSYSTEM_DATA: EcosystemPartner[] = [
  {
    icon: <ArbitrumIcon className={iconClass} />,
    title: "Arbitrum",
    description:
      "An Ethereum layer-two scaling solution using optimistic rollups for improved speed, scalability and cost-efficiency.",
    tags: ["Network"],
  },
  {
    icon: <LayerZeroIcon className={iconClass} />,
    title: "LayerZero",
    description:
      "Technology enabling applications to move data across blockchains with censorship-resistant messages.",
    tags: ["Network"],
  },
  {
    icon: <M0Icon className={iconClass} />,
    title: "M0",
    description:
      "Infrastructure powering builders of safe, programmable, interoperable stablecoins.",
    tags: ["Stablecoin"],
  },
  {
    icon: <CoinbaseIcon className={iconClass} />,
    title: "Coinbase Wallet",
    description:
      "The largest U.S. exchange and secure platform for cryptocurrency transactions.",
    tags: ["Wallet"],
  },
  {
    icon: <EulerIcon className={iconClass} />,
    title: "Euler",
    description:
      "Modular lending platform featuring the Euler Vault Kit for custom lending vaults.",
    tags: ["Money Markets", "DEX"],
  },
  {
    icon: <PendleIcon className={iconClass} />,
    title: "Pendle",
    description:
      "DeFi protocol focused on yield trading, allowing users to fix or leverage their yield.",
    tags: ["Yield / Derivatives"],
  },
  {
    icon: <EthenaIcon className={iconClass} />,
    title: "Ethena",
    description:
      "Synthetic dollar protocol providing crypto-native money (USDe) and dollar savings (sUSDe).",
    tags: ["Stablecoin"],
  },
  {
    icon: <UniswapIcon className={iconClass} />,
    title: "Uniswap",
    description:
      "The largest decentralized exchange operating on the Ethereum blockchain.",
    tags: ["DEX"],
  },
  {
    icon: <CurveIcon className={iconClass} />,
    title: "Curve",
    description:
      "DEX platform focused on efficient and cost-effective stablecoin trading.",
    tags: ["DEX"],
  },
  {
    icon: <BalancerIcon className={iconClass} />,
    title: "Balancer",
    description:
      "Decentralized automated market maker protocol for programmable liquidity.",
    tags: ["DEX"],
  },
  {
    icon: <PlasmaIcon className={iconClass} />,
    title: "Plasma",
    description:
      "High-performance, scalable, and secure blockchain purpose-built for stablecoins.",
    tags: ["Network"],
  },
  {
    icon: <AkashIcon className={iconClass} />,
    title: "Akash Network",
    description:
      "Open network for buying and selling computing resources securely and efficiently.",
    tags: ["Hardware"],
  },
  {
    icon: <ChronicleIcon className={iconClass} />,
    title: "Chronicle",
    description:
      "Novel Oracle solution developing scalable, cost-efficient, decentralized Oracles.",
    tags: ["Market Data"],
  },
  {
    icon: <CopperIcon className={iconClass} />,
    title: "Copper",
    description:
      "Digital asset infrastructure developed in partnership with pioneering institutions.",
    tags: ["Custodian"],
  },
  {
    icon: <FireblocksIcon className={iconClass} />,
    title: "Fireblocks",
    description:
      "Enterprise-grade platform for moving, storing, and issuing digital assets securely.",
    tags: ["Custodian"],
  },
  {
    icon: <CantinaLogo className={iconClass} />,
    title: "Cantina",
    description:
      "Leading Web3 security platform for comprehensive audits and penetration testing.",
    tags: ["Security"],
  },
  {
    icon: <SpearbitLogo className={iconClass} />,
    title: "Spearbit",
    description:
      "Distributed network of security researchers tackling complex web3 protocols.",
    tags: ["Security"],
  },
  {
    icon: <BinanceIcon className={iconClass} />,
    title: "Binance Wallet",
    description:
      "World's leading cryptocurrency exchange serving 270M+ users in 180+ countries.",
    tags: ["Wallet"],
  },
  {
    icon: <OKXIcon className={iconClass} />,
    title: "OKX Wallet",
    description:
      "Innovative cryptocurrency exchange with advanced financial services.",
    tags: ["Wallet"],
  },
  {
    icon: <Coin98Icon className={iconClass} />,
    title: "Coin98 Wallet",
    description:
      "Open, decentralized crypto wallet providing tools for the Open Internet.",
    tags: ["Wallet"],
  },
  {
    icon: <EthereumIcon className={iconClass} />,
    title: "Ethereum",
    description: "Decentralized blockchain with smart contract functionality.",
    tags: ["Network"],
  },
  {
    icon: <AnchorageIcon className={iconClass} />,
    title: "Anchorage Digital",
    description:
      "Global crypto platform enabling institutional participation in digital assets.",
    tags: ["Custodian"],
  },
  {
    icon: <ImmunefiIcon className={iconClass} />,
    title: "Immunefi",
    description: "Leading crowdsourced security platform for Web3.",
    tags: ["Security"],
  },
  {
    icon: <FluidIcon className={iconClass} />,
    title: "Fluid",
    description:
      "Liquidity layer combining lending, vaults, and DEX for maximum capital efficiency.",
    tags: ["DEX"],
  },
  {
    icon: <ChainlinkIcon className={iconClass} />,
    title: "Chainlink",
    description:
      "Decentralized oracle platform connecting smart contracts to real-world data.",
    tags: ["Market Data"],
  },
  {
    icon: <MorphoIcon className={iconClass} />,
    title: "Morpho",
    description:
      "Peer-to-peer lending platform matching borrowers and lenders efficiently.",
    tags: ["Money Markets"],
  },
  {
    icon: <AaveIcon className={iconClass} />,
    title: "Aave",
    description:
      "Non-custodial liquidity protocol for earning yield or borrowing against collateral.",
    tags: ["Money Markets"],
  },
  {
    icon: <GearboxIcon className={iconClass} />,
    title: "Gearbox",
    description:
      "Composable leverage protocol enabling credit accounts for leveraged DeFi strategies.",
    tags: ["Yield / Derivatives"],
  },
];

export const ALL_TAGS = Array.from(
  new Set(ECOSYSTEM_DATA.flatMap((item) => item.tags))
).sort();
