import * as HoverCard from '@radix-ui/react-hover-card';
import { IconButton } from '../IconButton';
import { Ellipsis, Trash } from 'lucide-react';

type TableAttendeeSettingsProps = {
    deleteAttendee:() => void
    
    
}
export function TableAttendeeSettings({deleteAttendee}:TableAttendeeSettingsProps) {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger >
                <IconButton>
                    <Ellipsis className="size-4" />


                </IconButton>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade  rounded-md bg-zinc-800  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                    sideOffset={5}
                >
                    <button onClick={deleteAttendee} className='justify-between flex items-center py-2 px-4 gap-3'>
                        <span className='text-base  font-bold'>deletar</span>
                        <Trash className='size-5  text-red-500'/>
                    </button>

                    <HoverCard.Arrow className="fill-zinc-800" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>

    )
}