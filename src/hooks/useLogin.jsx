import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('/users/sign_in', { user: values });
      const { message, admin, token } = response.data;

      if (admin) {
        localStorage.setItem('admin', admin);
        localStorage.setItem('adminToken', token);
        toast.success(message, { autoClose: 3000 });

        // Instead of navigating directly, make a request to the admin dashboard to ensure authorization
        axios.get('/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }).then(() => {
          navigate('/admin/dashboard');
        }).catch((error) => {
          toast.error('Not authorized as admin: ' + error.response.data.error, { autoClose: 3000 });
        });
      } else {
        toast.info('Successfully signed in', { autoClose: 3000 });
        navigate('/');
      }
    } catch (error) {
      toast.error('Error logging in: ' + error.response.data.error, { autoClose: 3000 });
    }
  };

  return { handleLogin };
};

export default useLogin;
