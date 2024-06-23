import RightSidebar from "@/components/RightSidebar";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  const userId = loggedIn.$id;

  const accounts = await getAccounts({userId});
  if(!accounts) return;

  const currentPage = Number(page as string) || 1;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId});
  
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
