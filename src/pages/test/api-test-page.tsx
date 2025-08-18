import {
  echo,
  ping,
} from '../../entities/echo/api/echo.api';

export default function ApiTestPage() {
  async function onPing() {
    const res = await ping();
    console.log(res);
  }
  async function onEcho() {
    const res = await echo({ message: 'hello' });
    console.log(res);
  }
  return (
    <>
      <button onClick={onPing}>Ping</button>
      <button onClick={onEcho}>Echo</button>
      <header>
        <img src="" alt="" />
      </header>
    </>
  );
}
