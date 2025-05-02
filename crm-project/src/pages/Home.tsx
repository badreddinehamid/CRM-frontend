import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiCheckCircle, FiCircle } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get username from localStorage (set during login)
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token || !username) {
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tasks/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            handleLogout();
          }
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, token, username]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleTaskCompletion = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/toggle/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to update task');

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating task');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md mx-4 my-2">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">You don't have any tasks yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        {task.completed ? (
                          <FiCheckCircle className="text-green-500" size={20} />
                        ) : (
                          <FiCircle size={20} />
                        )}
                      </button>
                      <div>
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-gray-600 mt-1">{task.description}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Created: {new Date(task.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;