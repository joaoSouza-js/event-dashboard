import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime"

import "dayjs/locale/pt-br"
import { QueryProviderContext } from "./services/QueryProvider";
import { SignIn } from "./screens/SignIn";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

dayjs.locale("pt-br")
dayjs.extend(RelativeTime)

export function App() {
  return (
    <QueryProviderContext>
      <div className="max-w-7xl flex flex-col px-4 py-5 mx-auto min-h-screen ">
        <RouterProvider router={router} />

      </div>

    </QueryProviderContext>
  )
}