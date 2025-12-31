export default function SimplePage() {
    return (
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
            color: 'black',
            minHeight: '100vh'
        }}>
            <h1>STM Customer Management - Simple Test Page</h1>
            <p>If you can see this page, the Next.js app is running correctly.</p>
            <p>Current time: {new Date().toISOString()}</p>
            <p>Environment: {process.env.NODE_ENV}</p>
            
            <div style={{ marginTop: '20px' }}>
                <h2>Navigation Test</h2>
                <ul>
                    <li><a href="/api/health" style={{ color: 'blue' }}>Health Check API</a></li>
                    <li><a href="/api/debug" style={{ color: 'blue' }}>Debug Info API</a></li>
                    <li><a href="/" style={{ color: 'blue' }}>Main Page (with Tailwind)</a></li>
                </ul>
            </div>
        </div>
    );
}