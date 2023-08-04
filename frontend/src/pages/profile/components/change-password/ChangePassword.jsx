import { HttpsOutlined } from '@mui/icons-material';
import Button from '../../../../common/Button';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../../../common/SectionHeader';

const ChangeProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <SectionHeader
        title="Change Password"
        text="If you want to change your password, click the button below, and we will send password reset instructions to your email address."
        icon={<HttpsOutlined />}
        span="Your password will always remain private."
      />
      <div>
        <Button
          onClick={() => navigate('/account/forgot-password-reset')}
          style={{ padding: '1.4rem 1.8rem' }}
          value={'RESET PASSWORD'}
        />
      </div>
    </div>
  );
};

export default ChangeProfile;
