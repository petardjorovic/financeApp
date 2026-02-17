import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  PieChart,
  Target,
  Bell,
  Download,
  Shield,
} from "lucide-react";
import pdfinanceLogo from "../assets/images/pdfinance logo.svg";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Track Transactions",
      description:
        "Monitor all your income and expenses in one place. Get detailed insights into your spending patterns.",
    },
    {
      icon: PieChart,
      title: "Smart Budgets",
      description:
        "Set category-based budgets and watch your spending in real-time. Stay in control of your finances.",
    },
    {
      icon: Target,
      title: "Savings Pots",
      description:
        "Create multiple savings goals and track your progress toward achieving them. Easy deposits and withdrawals.",
    },
    {
      icon: Bell,
      title: "Recurring Bills",
      description:
        "Keep track of your recurring payments and never miss a bill deadline. Plan your finances better.",
    },
    {
      icon: Download,
      title: "Export & Reports",
      description:
        "Export your transaction data in various formats for further analysis or record-keeping.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and secure. We prioritize your privacy and trust.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up in seconds with your email and secure password. Verify your email to get started.",
    },
    {
      number: "02",
      title: "Add Your Transactions",
      description:
        "Manually add transactions or import them. Categorize your income and expenses effortlessly.",
    },
    {
      number: "03",
      title: "Set Your Budget",
      description:
        "Define spending limits for different categories based on your financial goals.",
    },
    {
      number: "04",
      title: "Monitor & Adjust",
      description:
        "Watch your progress on the dashboard, visualize trends, and adjust your budget as needed.",
    },
  ];

  return (
    <div className="min-h-screen bg-Beige-100">
      {/* Navigation Header */}
      <header className="bg-Grey-900 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-Beige-500 rounded-lg p-2 flex items-center justify-center">
              <img
                src={pdfinanceLogo}
                alt="PDFinance Logo"
                className="h-6 w-[100px] sm:w-auto"
              />
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="px-3 sm:px-5 py-2 text-White font-medium hover:bg-Grey-500 transition rounded-lg text-sm sm:text-base"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-3 sm:px-5 py-2 bg-Beige-500 text-Grey-900 rounded-lg font-medium hover:bg-Beige-100 transition text-sm sm:text-base"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-Grey-900 leading-tight">
              Keep track of your money and{" "}
              <span className="text-Beige-500">save for the future</span>
            </h1>
            <p className="text-lg md:text-xl text-Grey-500 max-w-2xl mx-auto leading-relaxed">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
              Everything you need to achieve your financial goals in one place.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-Grey-900 text-White rounded-lg font-semibold hover:bg-Grey-500 transition text-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border-2 border-Grey-900 text-Grey-900 rounded-lg font-semibold hover:bg-Grey-100 transition text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-Grey-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-Grey-500 text-lg max-w-2xl mx-auto">
              Everything you need to manage your personal finances effectively
              and achieve your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-Beige-100 hover:shadow-lg transition duration-300 space-y-4"
                >
                  <div className="w-12 h-12 bg-Grey-900 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-White" />
                  </div>
                  <h3 className="text-xl font-semibold text-Grey-900">
                    {feature.title}
                  </h3>
                  <p className="text-Grey-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-Grey-900 mb-4">
              How It Works
            </h2>
            <p className="text-Grey-500 text-lg max-w-2xl mx-auto">
              Get started in just four simple steps. It takes less than 5
              minutes to set up your first budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 h-full border-2 border-Grey-100 hover:border-Beige-500 transition">
                  <div className="text-5xl font-bold text-Beige-500 mb-4 opacity-50">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-Grey-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-Grey-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-Beige-500 transform -translate-y-1/2">
                    <div className="absolute right-0 w-2 h-2 bg-Beige-500 rounded-full transform translate-x-1 -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-Grey-900 text-White">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose PDFinance?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="rounded-full bg-Beige-500 w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-Grey-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Easy to Use</h3>
                    <p className="text-Grey-300">
                      Intuitive interface designed for everyone, regardless of
                      financial expertise.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-full bg-Beige-500 w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-Grey-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Real-Time Insights
                    </h3>
                    <p className="text-Grey-300">
                      Get instant updates on your spending and financial
                      progress with visual charts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-full bg-Beige-500 w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-Grey-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Always Synced
                    </h3>
                    <p className="text-Grey-300">
                      Access your financial data anytime, anywhere on any device
                      seamlessly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-full bg-Beige-500 w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-Grey-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Completely Free
                    </h3>
                    <p className="text-Grey-300">
                      No hidden fees, no premium plans. All features available
                      for free forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-Beige-500 rounded-xl p-8 md:p-12">
              <div className="space-y-6">
                <div className="bg-White rounded-lg p-6">
                  <p className="text-Grey-500 text-sm font-medium mb-2">
                    Total Balance
                  </p>
                  <p className="text-3xl font-bold text-Grey-900">$24,574.00</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-White rounded-lg p-4">
                    <p className="text-Grey-500 text-sm font-medium mb-2">
                      Income
                    </p>
                    <p className="text-2xl font-bold text-Green">+$5,200</p>
                  </div>
                  <div className="bg-White rounded-lg p-4">
                    <p className="text-Grey-500 text-sm font-medium mb-2">
                      Expenses
                    </p>
                    <p className="text-2xl font-bold text-Red">-$3,100</p>
                  </div>
                </div>
                <div className="bg-White rounded-lg p-6">
                  <p className="text-Grey-500 text-sm font-medium mb-3">
                    Budget Status
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-Grey-900 font-medium">
                        Groceries
                      </span>
                      <span className="text-Grey-500">85% of $500</span>
                    </div>
                    <div className="w-full bg-Grey-200 rounded-full h-2">
                      <div
                        className="bg-Green h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-Grey-900 mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-Grey-500 mb-8 max-w-xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter. Start your journey to financial freedom today.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-Grey-900 text-White rounded-lg font-semibold hover:bg-Grey-500 transition text-lg"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-Grey-900 text-White py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-Beige-500 rounded p-1 flex items-center justify-center">
                  <img
                    src={pdfinanceLogo}
                    alt="PDFinance Logo"
                    className="h-5 w-auto"
                  />
                </div>
                <span className="font-bold">PDFinance</span>
              </div>
              <p className="text-Grey-300 text-sm">
                Your trusted personal finance management tool for a better
                financial future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-Grey-300">
                <li>
                  <a href="#" className="hover:text-Beige-500 transition">
                    Transactions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-Beige-500 transition">
                    Budgets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-Beige-500 transition">
                    Savings Pots
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-Beige-500 transition">
                    Recurring Bills
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-Grey-300">
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-Beige-500 transition"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="hover:text-Beige-500 transition"
                  >
                    Create Account
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-Beige-500 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-Grey-500 pt-8 text-center text-sm text-Grey-300">
            <p>
              &copy; 2025 PDFinance. All rights reserved. Securing your
              financial future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
