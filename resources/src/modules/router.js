import { createRouter, createWebHistory } from "vue-router";

const Dashboard = () => import("@/main/Dashboard.vue");
const Trading = () => import("@/main/Trading.vue");
const Investments = () => import("@/main/Investments.vue");
const Wallets = () => import("@/main/Wallets.vue");
const WalletDetail = () => import("@/main/wallets/WalletDetail.vue");
const MainWalletDetail = () => import("@/main/wallets/MainWalletDetail.vue");
const DepositHistory = () => import("@/main/logs/Deposit.vue");
const WithdrawHistory = () => import("@/main/logs/Withdraw.vue");
const TransactionsHistory = () => import("@/main/logs/Transactions.vue");
const SupportPage = () => import("@/main/support/Support.vue");
const ChatPage = () => import("@/main/support/ChatPage.vue");
const NewTicketPage = () => import("@/main/support/NewTicket.vue");
const Api = () => import("@/main/Api.vue");
const Swap = () => import("@/extensions/swap/index.vue");
const Identification = () => import("@/main/Identification.vue");
const KycApplication = () => import("@/main/identification/KycApplication.vue");
const routes = [
    { path: "/", component: Dashboard, meta: { title: "Dashboard" } },
    { path: "/dashboard", component: Dashboard, meta: { title: "Dashboard" } },
    { path: "/public/app", redirect: "/" },
    { path: "/user", redirect: "/" },
    { path: "/dashboard", component: Dashboard, meta: { title: "Dashboard" } },
    {
        path: "/identity",
        component: Identification,
        meta: { title: "Verification Center" },
    },
    {
        path: '/identity/application',
        component: KycApplication,
        meta: { title: "KYC Application Submittion" },
    },
    {
        path: "/trade/:symbol/:currency",
        component: Trading,
        meta: { title: "Trading", type: "trading" },
    },
    { path: "/swap", component: Swap, meta: { title: "Swap Crypto" } },
    {
        path: "/investment",
        component: Investments,
        meta: { title: "Investments" },
    },
    {
        path: "/wallets",
        component: Wallets,
        meta: { title: "My Wallets", type: "wallets" },
    },
    {
        path: "/wallet/:type(trading|funding)/:symbol/:address",
        component: WalletDetail,
        meta: { title: "Wallet Details", type: "wallets" },
    },
    {
        path: "/wallet/:type(main)/:symbol/:address",
        component: MainWalletDetail,
        meta: {
            title: "Wallet Details",
            type: "wallets",
            subtype: "main",
        },
    },
    {
        path: "/deposit/history",
        component: DepositHistory,
        meta: { title: "Deposit History" },
    },
    {
        path: "/withdraw/history",
        component: WithdrawHistory,
        meta: { title: "Withdraw History" },
    },
    {
        path: "/transaction/history",
        component: TransactionsHistory,
        meta: { title: "Transactions History" },
    },
    {
        path: "/api-management",
        component: Api,
        meta: { title: "API Management" },
    },
    {
        path: "/support",
        component: SupportPage,
        meta: { title: "Support" },
    },
    {
        path: "/support/ticket",
        component: NewTicketPage,
        meta: { title: "New Support Ticket" },
    },
    {
        path: "/support/ticket/:id",
        component: ChatPage,
        meta: { title: "Support Ticket" },
    },
];
if (plat.trading.binary_status == 1) {
    const Binary = () => import("@/main/binary/Binary.vue");
    const BinaryTrading = () => import("@/main/binary/BinaryTrading.vue");
    const PracticeContracts = () => import("@/main/binary/logs/Practice.vue");
    const TradeContracts = () => import("@/main/binary/logs/Trade.vue");
    const ContractPreview = () => import("@/main/binary/logs/Preview.vue");
    routes.push({
        path: "/binary",
        component: Binary,
        meta: { title: "Binary Dashboard" },
    });
    routes.push({
        path: "/binary/:type/:symbol/:currency",
        component: BinaryTrading,
        meta: { title: "Binary Trading" },
    });
    routes.push({
        path: "/binary/practice/contracts",
        component: PracticeContracts,
        meta: { title: "Binary Practice Logs" },
    });
    routes.push({
        path: "/binary/trade/contracts",
        component: TradeContracts,
        meta: { title: "Binary Trading Logs" },
    });
    routes.push({
        path: "/binary/contract/view/:type/:id",
        component: ContractPreview,
        meta: { title: "Binary Contract Preview" },
    });
}
if (ext.botTrader == 1) {
    const Bots = () => import("@/extensions/bot/Bots.vue");
    const BotTradePage = () => import("@/extensions/bot/BotTradePage.vue");
    routes.push({
        path: "/bot",
        component: Bots,
        meta: { title: "Bots Dashboard" },
    });
    routes.push({
        path: "/bot/:symbol/:currency",
        component: BotTradePage,
        meta: { title: "Bot Trader" },
    });
}
if (ext.ico == 1) {
    const ICO = () => import("@/extensions/ico/ICO.vue");
    const ICODetails = () => import("@/extensions/ico/ICODetails.vue");
    routes.push({
        path: "/ico",
        component: ICO,
        meta: { title: "Token Offers" },
    });
    routes.push({
        path: "/ico/:symbol",
        component: ICODetails,
        meta: { title: "Offer Details" },
    });
}
if (ext.mlm == 1) {
    const Referral = () => import("@/extensions/mlm/Referral.vue");
    routes.push({
        path: "/referral",
        component: Referral,
        meta: { title: "My Referrals" },
    });
}
if (ext.forex == 1) {
    const Forex = () => import("@/extensions/Forex/Forex.vue");
    const ForexTrading = () => import("@/extensions/Forex/Trading.vue");
    routes.push({
        path: "/forex",
        component: Forex,
        meta: { title: "Forex Dashboard" },
    });
    routes.push({
        path: "/forex/trade",
        component: ForexTrading,
        meta: { title: "Forex Trading" },
    });
}
if (ext.staking == 1) {
    const Staking = () => import("@/extensions/staking/Staking.vue");
    const StakingLogs = () => import("@/extensions/staking/StakingLogs.vue");
    routes.push({
        path: "/staking",
        component: Staking,
        meta: { title: "Staking Dashboard" },
    });
    routes.push({
        path: "/staking/logs",
        component: StakingLogs,
        meta: { title: "Staking Logs" },
    });
}
if (ext.builder == 1) {
    const PageBuilder = () => import("@/extensions/builder/PageBuilder.vue");
    routes.push({
        path: "/page/:slug",
        component: PageBuilder,
    });
}
if (ext.eco == 1) {
    const EcoTrading = () => import("@/extensions/eco/EcoTrading.vue");
    routes.push({
        path: "/trade/:symbol-:currency",
        component: EcoTrading,
        meta: { title: "Trading", type: "eco" },
    });
}
if (ext.p2p == 1) {
    const P2P = () => import("@/extensions/p2p/Index.vue");
    const P2POrders = () => import("@/extensions/p2p/UserOrders.vue");
    const P2POrder = () => import("@/extensions/p2p/Order.vue");
    const P2PSeller = () => import("@/extensions/p2p/Seller.vue");
    routes.push({
        path: "/p2p",
        name: "Index",
        component: P2P,
        meta: { title: "Peer To Peer Dashboard" },
    });
    routes.push({
        path: "/p2p/orders",
        name: "Orders",
        component: P2POrders,
        meta: { title: "My Orders" },
    });
    routes.push({
        path: "/p2p/order/:id",
        name: "OrderPage",
        component: P2POrder,
        meta: { title: "Order Page" },
        props: true,
    });
    routes.push({
        path: "/p2p/seller/dashboard",
        name: "Seller",
        component: P2PSeller,
        meta: { title: "Merchent Dashboard" },
    });
}
if (ext.knowledge == 1) {
    const KnowledgeBase = () => import("@/extensions/knowledge/Index.vue");
    routes.push({
        path: "/knowledge",
        component: KnowledgeBase,
        meta: { title: "Knowledge Base" },
    });
    const Categories = () => import("@/extensions/knowledge/Categories.vue");
    routes.push({
        path: "/knowledge/categories/:slug/:id",
        component: Categories,
        meta: { title: "Categories" },
    });
    const Tags = () => import("@/extensions/knowledge/Tags.vue");
    routes.push({
        path: "/knowledge/tags/:slug/:id",
        component: Tags,
        meta: { title: "Tags" },
    });
    const Article = () => import("@/extensions/knowledge/Article.vue");
    routes.push({
        path: "/knowledge/articles/:slug/:id",
        component: Article,
        meta: { title: "Article" },
    });
    const Faq = () => import("@/extensions/knowledge/Faq.vue");
    routes.push({
        path: "/knowledge/faq",
        component: Faq,
        meta: { title: "Faq" },
    });
    const FaqSearch = () => import("@/extensions/knowledge/FaqSearch.vue");
    routes.push({
        path: "/knowledge/faq/:search",
        component: FaqSearch,
        meta: { title: "Search Faq" },
    });
}
if (ext.ecommerce == 1) {
    const Marketplace = () => import("@/extensions/ecommerce/Index.vue");
    const Wishlist = () => import("@/extensions/ecommerce/Wishlist.vue");
    const OrderHistory = () =>
        import("@/extensions/ecommerce/OrderHistory.vue");
    const ProductInfo = () =>
        import("@/extensions/ecommerce/components/ProductInfo.vue");

    routes.push({
        path: "/marketplace",
        component: Marketplace,
        meta: { title: "Marketplace" },
        redirect: "/marketplace/index",
        children: [
            {
                path: "index",
                component: Marketplace,
                meta: { title: "Marketplace" },
            },
            {
                path: "wishlist",
                component: Wishlist,
                meta: { title: "Wishlist" },
            },
            {
                path: "order-history",
                component: OrderHistory,
                meta: { title: "Order History" },
            },
            {
                path: "product/:id",
                component: ProductInfo,
                meta: { title: "Product Info" },
            },
        ],
    });
}


if (ext.futures == 1) {
    const FuturesTrading = () => import("@/extensions/futures/Trading.vue");
    routes.push({
        path: "/futures/:symbol/:currency",
        component: FuturesTrading,
        meta: { title: "Trading", type: "futures" },
    });
    const FuturesWalletDetail = () => import("@/extensions/futures/WalletDetail.vue");
    routes.push({
        path: "/wallet/:type(futures)/:symbol",
        component: FuturesWalletDetail,
        meta: { title: "Wallet Details" },
    });
}

const router = createRouter({
    history: createWebHistory("/app/"),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.path === "/") {
        let defaultPage = plat.dashboard.default_page;

        if (defaultPage === "trading") {
            next("/trade/" + plat.trading.first_trade_page);
        } else if (defaultPage === "binary") {
            next("/binary");
        } else if (defaultPage === "bot") {
            next("/bot");
        } else if (defaultPage === "ico") {
            next("/ico");
        } else if (defaultPage === "mlm") {
            next("/network");
        } else if (defaultPage === "forex") {
            next("/forex");
        } else if (defaultPage === "staking") {
            next("/staking");
        } else if (defaultPage === "knowledge") {
            next("/knowledge");
        } else {
            next();
        }
    } else {
        next();
    }
});

router.beforeEach((to, from) => {
    const pageTitle = to.meta.title || "Dashboard";
    document.title = pageTitle;
});

export default router;
