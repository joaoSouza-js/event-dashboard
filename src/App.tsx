import dayjs from "dayjs";
import { AttendeeList } from "./components/AttendeeList";
import { Header } from "./components/Header";
import {  IconButton} from "./components/IconButton";
import RelativeTime from  "dayjs/plugin/relativeTime"

import "dayjs/locale/pt-br"
import { QueryProviderContext } from "./services/QueryProvider";
dayjs.locale("pt-br")
dayjs.extend(RelativeTime)

export function App(){
  return (
    <QueryProviderContext>
      <div className="max-w-7xl px-4 py-5 mx-auto">
        <Header/>
        <AttendeeList/>
      </div>
    </QueryProviderContext>
  )
}