import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';


type AlertToastProps = Toast.ToastProps & {
    setTostIsVisible: Dispatch<SetStateAction<boolean>>,
    title?: string,
    undoDeletedAttend: () => void,
    description?: string
}

export function AlertToast(props: AlertToastProps) {
    const {
        open,
        setTostIsVisible,
        undoDeletedAttend,
        title = "Informação deleta",
        description = "Você acabou de Deletar algo"
    } = props
    return (
        <Toast.Provider swipeDirection="left">


            <Toast.Root
                className="bg-red-500 pt-3 pb-4 px-3 relative rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]  [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                open={open}
                duration={2000}
                onOpenChange={setTostIsVisible}
            >
                <Toast.Close asChild>
                    <X
                        className='absolute size-4  right-1.5 top-1'
                    />

                </Toast.Close>

                <div className='flex gap-2  mt-1 justify-between items-center'>
                    <div className=''>
                        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-base">
                            {title}
                        </Toast.Title>

                        <Toast.Description className='text-sm' >
                            {description}
                        </Toast.Description>

                    </div>
                    <Toast.Action
                        onClick={undoDeletedAttend}
                        className="border border-zinc-100 py-1.5 px-3 text-sm font-bold rounded-lg"
                        altText="Goto schedule to undo"
                    >

                        desfazer

                    </Toast.Action>

                </div>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[360px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    )
}