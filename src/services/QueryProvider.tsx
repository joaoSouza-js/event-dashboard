import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type QueryProviderContextProps = {
    children: JSX.Element
}

const queryClient = new QueryClient()

export function QueryProviderContext({children}:QueryProviderContextProps){
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}