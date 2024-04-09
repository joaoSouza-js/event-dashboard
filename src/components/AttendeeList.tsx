
import { Input } from "./Input";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRightIcon, Ellipsis, Search } from "lucide-react"
import { Table } from "./Table";
import { CheckBox } from "./CheckBox";
import { TableBodyRow } from "./Table/TableBodyRow";

import { TableHeaderData } from "./Table/TableHeaderData";
import { TableBodyData } from "./Table/TableBodyData";
import { IconButton } from "./IconButton";
import { ChangeEvent, useState } from "react";
import { attendees } from "../utils/attends";

import { useQuery } from "@tanstack/react-query";
import { api, api_base_url } from "../services/api";


type AttendeeResponse ={
    attendees: ATTENDEE_DTO[],
    total: number
}


const amountAttendsVisible = 10

export function AttendeeList() {
    const eventSlug = "show-em-east-abdielfort-eVKJ2p"
    const [search, setSearch] = useState<string>(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has("query")){
            const searchInParams = url.searchParams.get("query") ?? ""
            return searchInParams
        }
        return ""
    })
    const [attendeeListPage, setAttendeeListPage] = useState<number>(() => {
        const url = new URL(window.location.toString())
        if (url.searchParams.has("page")){
            const page = Number(url.searchParams.get("page")) ?? 1
            return page
        }
        return 1
    })
    
    async function fetchAttendees() {
        const url = new URL(`/events/${eventSlug}/attendees`, api_base_url)
        url.searchParams.set("pageIndex", String(attendeeListPage - 1))
        if(search.length > 1) url.searchParams.set("search", search)

        const response =  await api.get(url.toString())
        const attendees: AttendeeResponse = response.data
        return attendees
    }


    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        setSearchInParams(event.target.value)
        setCurrentPage(1)
        setAttendeeListPage(1)
    }

    function calculeTimeDistanceFromNow(date: Date | string | null) {
        if(!date) return "Não fez check-in"
        return dayjs().to(date)
    }

    function handleNavigateToNextPage() {
        if(!data?.attendees.length) return
        if (attendeeListPage >= totalPages ) return

        setCurrentPage(attendeeListPage + 1)
        setAttendeeListPage(attendeeListPage + 1)
    }

    function handleNavigateToFirstPage() {
        setCurrentPage(1)
        setAttendeeListPage(1)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())
        url.searchParams.set("page", String(page))
        window.history.pushState({}, "", url)
    }

    function handleNavigateToLastPage() {
        setCurrentPage(totalPages)
        setAttendeeListPage(totalPages)
    }

    function handleNavigateToPreviousPage() {
        if (attendeeListPage <= 1) return
        setCurrentPage(attendeeListPage - 1)
        setAttendeeListPage(attendeeListPage - 1)
    }

    
    const {data} =  useQuery(
        {
            queryKey: ['attendees',attendeeListPage,search], 
            queryFn: fetchAttendees,
            placeholderData: {attendees: [], total: 0}
            
        }
    )

    function setSearchInParams(search: string) {
        const url = new URL(window.location.toString())
        url.searchParams.set("query", search)
        window.history.pushState({}, "", url)
    }

    const totalPages = Math.ceil((data?.total ?? 0) / amountAttendsVisible)
    const previousButtonDisabled = attendeeListPage <= 1
    const nextButtonDisabled = attendeeListPage === totalPages


    return (
        <div className="flex gap-3 mt-7  flex-col" >
            <header className="flex gap-3">
                <h1 className="font-bold text-2xl">Participates</h1>
                <Input
                    value={search}
                    onChange={handleSearch}
                    className="w-72"
                    LeftIcon={<Search className="size-4  text-emerald-300" />}
                    placeholder="Buscar participante..."
                />

            </header>
            <Table >
                <thead >
                    <tr className="border-b border-b-white/10">
                        <TableHeaderData style={{ width: 48 }} className="py-3 px-4 text-sm  font-semibold text-left">
                            <CheckBox />
                        </TableHeaderData>
                        <TableHeaderData  >Código</TableHeaderData>
                        <TableHeaderData  >Participante</TableHeaderData>
                        <TableHeaderData  >Data da inscrição</TableHeaderData>
                        <TableHeaderData >Data do check-in</TableHeaderData>
                        <TableHeaderData ></TableHeaderData>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        data?.attendees.map((attendee) => (
                            <TableBodyRow
                                key={attendee.id}
                            >
                                <TableBodyData style={{ width: 48 }}>
                                    <CheckBox />
                                </TableBodyData>
                                <TableBodyData>{attendee.id}</TableBodyData>
                                <TableBodyData>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-zinc-50">{attendee.name}</span>
                                        <span>{attendee.email}</span>

                                    </div>
                                </TableBodyData>
                                <TableBodyData>{calculeTimeDistanceFromNow(attendee.createdAt)}</TableBodyData>
                                <TableBodyData className={attendee.checkedInAt === null ? "text-zinc-500": ''}>
                                    {calculeTimeDistanceFromNow(attendee.checkedInAt)}
                                    </TableBodyData>
                                <td style={{ width: 64 }}>
                                    <div className="flex  justify-end px-4">
                                        <IconButton>
                                            <Ellipsis className="size-4" />


                                        </IconButton>

                                    </div>
                                </td>
                            </TableBodyRow>

                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <TableBodyData
                            colSpan={3}
                            className=" text-sm text-zinc-300 py-4 px-4"
                        >
                            Mostrando {data?.attendees.length} de {data?.total} itens
                        </TableBodyData>
                        <TableBodyData colSpan={3} className="py-3">
                            <div className="flex gap-6 items-center  justify-end px-4">
                                <span className="text-sm text-gray-200">
                                    Página {attendeeListPage} de {totalPages} </span>
                                <div className="flex gap-1.5">
                                    <IconButton
                                        disabled={previousButtonDisabled}
                                        variant="secondary"
                                        onClick={handleNavigateToFirstPage}
                                    >
                                        <ChevronsLeft
                                            className="size-4"

                                        />
                                    </IconButton>
                                    <IconButton
                                        disabled={previousButtonDisabled}
                                        variant="secondary"
                                        onClick={handleNavigateToPreviousPage}
                                    >
                                        <ChevronLeft

                                            className="size-4"

                                        />

                                    </IconButton>
                                    <IconButton
                                        disabled={nextButtonDisabled}
                                        variant="secondary"
                                        onClick={handleNavigateToNextPage}
                                    >
                                        <ChevronRight


                                            className="size-4"
                                        />
                                    </IconButton>
                                    <IconButton
                                        variant="secondary"
                                        disabled={nextButtonDisabled}
                                        onClick={handleNavigateToLastPage}
                                    >
                                        <ChevronsRightIcon

                                            className="size-4"
                                        />
                                    </IconButton>
                                </div>

                            </div>
                        </TableBodyData>

                    </tr>
                </tfoot>
            </Table>


        </div>
    )
}