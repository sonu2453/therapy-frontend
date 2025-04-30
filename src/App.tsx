import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePage from "./pages/Public/HomePage";
import Users from "./pages/Dashboard/Users";
import Therapists from "./pages/Dashboard/Therapists";
import TherapistEarnings from "./pages/Dashboard/Earnings/Therapists";
import ManualAdjustments from "./pages/Dashboard/Earnings/Manual";
import AllPlans from "./pages/Dashboard/Subscriptions/AllPlans";
import PaymentHistory from "./pages/Dashboard/Subscriptions/PaymentHistory";
import RefundRequests from "./pages/Dashboard/Subscriptions/RefundRequests";
import MatchMe from "./pages/Dashboard/MatchMe";
import Chat from "./pages/Dashboard/Chat";
import SupportPage from "./pages/Dashboard/Support";
import SubscriptionPage from "./pages/Public/SubscriptionPage";
import SuccessPage from "./pages/Public/SuccessPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/make-payment" element={<SubscriptionPage />} />
          <Route path="/success" element={<SuccessPage />} /> {/* Success Page */}

          {/* Dashboard Layout - All admin routes under /dashboard */}
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Home />} />

            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
            <Route path="users" element={<Users />} />
            <Route path="therapists" element={<Therapists />} />
            <Route path="support-staff" element={<SupportPage />} />

            <Route path="match-me" element={<MatchMe />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
          
            {/* Earnings Routes */}
            <Route path="earnings">
              <Route path="therapists" element={<TherapistEarnings />} />
              <Route path="manual" element={<ManualAdjustments />} />
            </Route>

            {/* Subscription Routes */}
            <Route path="subscriptions">
              <Route path="plans" element={<AllPlans />} />
              <Route path="payments" element={<PaymentHistory />} />
              <Route path="refunds" element={<RefundRequests />} />
            </Route>

            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
