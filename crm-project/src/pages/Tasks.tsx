import { FiPlus, FiSearch, FiCalendar, FiFlag, FiCheckCircle, FiClock, FiFilter } from 'react-icons/fi';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample task data - replace with real data from your API
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Follow up with Acme Corp', 
      description: 'Discuss new project requirements', 
      dueDate: '2023-06-15', 
      priority: 'high', 
      status: 'pending',
      assignedTo: 'John Doe'
    },
    { 
      id: 2, 
      title: 'Prepare quarterly report', 
      description: 'Financial summary for Q2', 
      dueDate: '2023-06-20', 
      priority: 'medium', 
      status: 'in-progress',
      assignedTo: 'Jane Smith'
    },
    { 
      id: 3, 
      title: 'Update client database', 
      description: 'Verify contact information', 
      dueDate: '2023-06-10', 
      priority: 'low', 
      status: 'completed',
      assignedTo: 'Mike Johnson'
    },
    { 
      id: 4, 
      title: 'Team meeting', 
      description: 'Weekly sync with development team', 
      dueDate: '2023-06-08', 
      priority: 'medium', 
      status: 'pending',
      assignedTo: 'Sarah Williams'
    },
  ]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
                         task.status === activeFilter || 
                         task.priority === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📝 Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your tasks and deadlines</p>
        </div>
        
        <Link 
          to="/tasks/new" 
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Task
        </Link>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeFilter === 'all' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              All Tasks
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeFilter === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setActiveFilter('in-progress')}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeFilter === 'in-progress' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeFilter === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setActiveFilter('high')}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeFilter === 'high' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              High Priority
            </button>
          </div>
        </div>
      </div>

      {/* Tasks list */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 ${
                task.priority === 'high' ? 'border-red-500' :
                task.priority === 'medium' ? 'border-yellow-500' :
                'border-gray-300 dark:border-gray-600'
              } ${task.status === 'completed' ? 'opacity-80' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-1 flex-shrink-0 ${
                      task.status === 'completed' 
                        ? 'text-green-500' 
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <FiCheckCircle size={20} />
                  </button>
                  <div>
                    <h3 className={`font-medium ${
                      task.status === 'completed' 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiFlag className={`mr-1 ${
                          task.priority === 'high' ? 'text-red-500' :
                          task.priority === 'medium' ? 'text-yellow-500' :
                          'text-gray-500 dark:text-gray-400'
                        }`} />
                        {task.priority} priority
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1" />
                        {task.assignedTo}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/tasks/edit/${task.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                  >
                    <FiEdit2 size={18} />
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No tasks found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Task status summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Tasks</h3>
          <p className="text-2xl font-bold dark:text-white">{tasks.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;