import CleanClassnames from '@/utils/functions/CleanClassnames';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import { useEffect, useState } from 'react';
import { authClient } from '@/utils/auth';
import { useNavigate } from 'react-router';

const loginCallbackUrl = '/inventory/list';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isAvailable, setIsAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const session = await authClient.getSession();

      console.info(session);

      // session is present
      if (session.data) {
        // session is not expired
        if (session?.data?.session?.expiresAt > Date.now())
          navigate(loginCallbackUrl);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (type, value) => {
    setForm((p) => {
      p[type] = value;
      return p;
    });
  };

  const onLogin = async () => {
    try {
      setErrorMessage(null);
      setIsAvailable(false);

      const { data, error } = await authClient.signIn.email({
        ...form,
        callbackURL: loginCallbackUrl,
      });

      if (error) {
        throw error;
      }

      console.info({ data });
      navigate(loginCallbackUrl);
    } catch (err) {
      console.error({ err });
      setErrorMessage(err.message || 'Login failed');
    } finally {
      setIsAvailable(true);
    }
  };

  const onRegister = async () => {
    try {
      setErrorMessage(null);
      setIsAvailable(false);
      const { data, error } = await authClient.signUp.email({
        ...form,
        callbackURL: loginCallbackUrl,
      });

      if (error) {
        throw error;
      }

      console.info({ data });
      navigate(loginCallbackUrl);
    } catch (err) {
      console.error({ err });
      setErrorMessage(err.message || 'Registration failed');
    } finally {
      setIsAvailable(true);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-1 items-center justify-center w-[75%] gap-3">
        <section className="w-full flex flex-col items-center justify-center">
          <Text className="w-full">email</Text>
          <Input
            placeholder="email"
            onValueChange={(v) => onInputChange('email', v)}
            disabled={!isAvailable}
          />
        </section>

        <section className="w-full flex flex-col items-center justify-center">
          <Text className="w-full">password</Text>
          <Input
            placeholder="password"
            type="password"
            onValueChange={(v) => onInputChange('password', v)}
            disabled={!isAvailable}
          />
        </section>

        {errorMessage && (
          <section className="border w-full p-2 shake text-red-500">
            <Text>{errorMessage}</Text>
          </section>
        )}

        <section className="w-full flex flex-row items-center justify-center gap-1">
          <Button className="w-full" onClick={onLogin} disabled={!isAvailable}>
            Login
          </Button>
          <Button
            className="w-[25%]"
            onClick={onRegister}
            disabled={!isAvailable}
          >
            Register
          </Button>
        </section>
      </div>
    </div>
  );
}

export default Register;
