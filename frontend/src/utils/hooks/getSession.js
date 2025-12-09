import { authClient } from '../auth';

export default async function getSession({ onSession, onNoSession }) {
  const session = await authClient.getSession();

  console.info(session);

  if (!session?.data?.user) {
    onNoSession?.();
    return;
  }

  onSession?.(session);
}
