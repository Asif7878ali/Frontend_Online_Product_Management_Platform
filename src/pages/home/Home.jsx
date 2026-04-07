import MainLayout from "../../component/layouts/MainLayout";
import Icons from "../../utills/Icons";

const Home = () => {
  return (
    <MainLayout>
      <div className="w-full bg-white relative top-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-100 via-white to-white opacity-70 -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
              Manage products from <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                idea to execution
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Unify your roadmap, align your teams, and launch features faster
              with the ultimate product management platform designed for modern
              product teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-indigo-200">
                Start your free trial
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
                <Icons.InfoIcon className="w-5 h-5" />
                Book a demo
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-3">
                Core Features
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Everything you need to ship great products
              </h3>
              <p className="text-lg text-gray-600">
                ProSync replaces your scattered spreadsheets and disjointed
                tools with a unified platform designed exclusively for product
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.Edit className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Interactive Roadmapping
                </h4>
                <p className="text-gray-600">
                  Visualize your product strategy with drag-and-drop roadmaps.
                  Share beautiful timelines with stakeholders instantly.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.Checked className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Task Management
                </h4>
                <p className="text-gray-600">
                  Break down large epics into actionable tasks. Assign owners,
                  set priorities, and track progress effortlessly.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.Dial className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Insights & Analytics
                </h4>
                <p className="text-gray-600">
                  Measure what matters. Get real-time dashboards on team
                  velocity, feature adoption, and goal completion.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.Msg className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Customer Feedback
                </h4>
                <p className="text-gray-600">
                  Consolidate user feedback from all channels into one inbox.
                  Link requests directly to roadmap items.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.AddUser className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Team Collaboration
                </h4>
                <p className="text-gray-600">
                  Keep engineering, design, and marketing aligned. Comment, tag,
                  and notify the right people at the right time.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Icons.Upload className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Seamless Integrations
                </h4>
                <p className="text-gray-600">
                  Connect with the tools you already use. Sync with Jira,
                  GitHub, Slack, and Figma with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to build better products?
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of product managers who are already using ProSync
              to launch features faster and delight their users.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
                Get Started for Free
              </button>
              <button className="bg-transparent border border-indigo-300 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
