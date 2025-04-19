import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for users
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ email: '', username: '' });

  // State for profiles
  const [newProfile, setNewProfile] = useState({ bio: '', userId: '' });

  // State for posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', authorId: '', published: new Date().toISOString() });

  // API base URL
  const API_URL = 'http://localhost:5001';

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch user by ID
  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Create user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        alert('User created successfully');
      }
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ email: '', username: '' });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch all profiles
  const _fetchProfiles = async () => {
    try {
      // We don't have a direct endpoint to get all profiles, so we'll get them from users
      await fetchUsers();
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Create profile
  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProfile)
      });
      await response.json(); // We don't need to store the data since it's not used
      fetchUsers(); // Refresh users to see the new profile
      setNewProfile({ bio: '', userId: '' });
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  // Fetch profile by user ID
  const fetchProfileByUserId = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/profiles/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        alert(`Profile found: ${data.bio}`);
      } else {
        alert('Profile not found');
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Create post
  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ title: '', content: '', authorId: '', published: new Date().toISOString() });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">API Testing Dashboard</h1>

      {/* Users Section */}
      <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        
        {/* Create User Form */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-2">Create User</h3>
          <form onSubmit={createUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username:</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create User
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="bg-white rounded shadow">
          <h3 className="text-lg font-medium p-4 border-b">User List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => fetchUserById(user.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => fetchProfileByUserId(user.id)}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profiles Section */}
      <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Profiles</h2>
        
        {/* Create Profile Form */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-2">Create Profile</h3>
          <form onSubmit={createProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID:</label>
              <input
                type="number"
                value={newProfile.userId}
                onChange={(e) => setNewProfile({...newProfile, userId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio:</label>
              <textarea
                value={newProfile.bio}
                onChange={(e) => setNewProfile({...newProfile, bio: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        
        {/* Create Post Form */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-2">Create Post</h3>
          <form onSubmit={createPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title:</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content:</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author ID:</label>
              <input
                type="number"
                value={newPost.authorId}
                onChange={(e) => setNewPost({...newPost, authorId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded shadow">
          <h3 className="text-lg font-medium p-4 border-b">Post List</h3>
          <div className="space-y-4 p-4">
            {posts.map(post => (
              <div key={post.id} className="border p-4 rounded">
                <h4 className="text-xl font-medium">{post.title}</h4>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <div className="mt-2 text-sm text-gray-500">Author ID: {post.authorId}</div>
                <div className="mt-4">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current User Details (when selected) */}
      {currentUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">User Details</h3>
            <p><strong>ID:</strong> {currentUser.id}</p>
            <p><strong>Username:</strong> {currentUser.username}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            
            {currentUser.profile && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h4 className="font-medium">Profile</h4>
                <p><strong>Bio:</strong> {currentUser.profile.bio}</p>
              </div>
            )}
            
            {currentUser.post && currentUser.post.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium">Posts</h4>
                <ul className="list-disc list-inside pl-4">
                  {currentUser.post.map(post => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              onClick={() => setCurrentUser(null)}
              className="mt-6 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
