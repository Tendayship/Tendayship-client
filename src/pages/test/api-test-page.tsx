import {
    echo,
    health,
} from '../../entities/echo/api/echo.api';

export default function ApiTestPage() {
    async function onPing() {
        const res = await health();
        console.log(res);
    }
    async function onEcho() {
        const res = await echo({ message: 'hello' });
        console.log(res);
    }
    return (
        <>
            <button onClick={onPing}>Health</button>
            <button onClick={onEcho}>Echo</button>
        </>
    );
}
