import { health } from '../../entities/echo/api/echo.api';

export default function ApiTestPage() {
    async function onPing() {
        const res = await health();
        console.log(res);
    }
    return (
        <>
            <button onClick={onPing}>Health</button>
        </>
    );
}
