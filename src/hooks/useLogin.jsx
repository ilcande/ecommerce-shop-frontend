import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('/users/sign_in', { user: values });
      const { message, admin } = response.data;

      if (admin) {
        localStorage.setItem('admin', response.data.admin);
        localStorage.setItem('adminToken', response.data.token); 
        toast.success(message, { autoClose: 3000 });
        navigate('/admin/dashboard');
      } else {
        toast.info('Successfully signed in as an admin', { autoClose: 3000 });
        navigate('/');
      }
    } catch (error) {
      toast.error('Error logging in: ' + error.response.data.error, { autoClose: 3000 });
    }
  };

  return { handleLogin };
};

export default useLogin;
