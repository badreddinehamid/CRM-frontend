// pages/Home.tsx
import Button from "../components/Button";
import { FiUsers, FiCheckCircle, FiBarChart2, FiCalendar } from "react-icons/fi";

const Home = () => {
  // Sample data
  const stats = [
    { icon: <FiUsers size={24} />, title: "Total Customers", value: "1,248", change: "+12% this month" },
    { icon: <FiCheckCircle size={24} />, title: "Completed Tasks", value: "342", change: "+8% this week" },
    { icon: <FiBarChart2 size={24} />, title: "Revenue", value: "$48,950", change: "+24% this quarter" },
    { icon: <FiCalendar size={24} />, title: "Upcoming", value: "27", change: "meetings scheduled" }
  ];

  const quickActions = [
    { icon: "👥", label: "Add Customer", path: "/customers/new" },
    { icon: "📝", label: "Create Task", path: "/tasks/new" },
    { icon: "📊", label: "View Reports", path: "/reports" },
    { icon: "⚙️", label: "Settings", path: "/settings" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-blue-100">Here's what's happening with your CRM today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-3">
                  {stat.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-300">{stat.title}</h3>
              </div>
              <p className="text-2xl font-bold dark:text-white mb-1">{stat.value}</p>
              <p className="text-sm text-green-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-32 p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => window.location.href = action.path}
                >
                  <span className="text-2xl mb-2">{action.icon}</span>
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {[
                { id: 1, user: "Alex Johnson", action: "added a new customer", time: "10 min ago" },
                { id: 2, user: "Sam Wilson", action: "completed task 'Follow up'", time: "25 min ago" },
                { id: 3, user: "Taylor Smith", action: "updated deal status", time: "1 hour ago" },
                { id: 4, user: "Jordan Lee", action: "scheduled meeting with Acme Inc", time: "2 hours ago" },
                { id: 5, user: "Casey Kim", action: "exported customer list", time: "3 hours ago" }
              ].map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-medium mr-3">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        <span className="text-gray-900 dark:text-white">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Need help getting started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our CRM is designed to help you manage customer relationships efficiently. Check out our guides or contact support if you need assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary">View Documentation</Button>
            <Button variant="secondary">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;