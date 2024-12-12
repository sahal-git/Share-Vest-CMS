import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {/* Next.js will handle routing through the app directory */}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;