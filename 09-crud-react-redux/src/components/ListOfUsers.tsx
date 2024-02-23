import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Title
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export function ListOfUsers() {
    const [tooltip, setTooltip] = useState("key");

    const users = useAppSelector((state) => state.users)
    const { removeUser, editUser } = useUserActions()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get("nombre") as string
        const email = formData.get("correo") as string
        const github = formData.get("github") as string

        editUser({ name, email, github }, tooltip)
        form.reset()
        setTooltip("")
    }

    return (
        <Card>
            <Title>
                Usuarios
                <Badge color="gray" style={{ marginLeft: '8px' }}>{users.length}</Badge>
            </Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell> Id </TableHeaderCell>
                        <TableHeaderCell> Nombre </TableHeaderCell>
                        <TableHeaderCell> Email </TableHeaderCell>
                        <TableHeaderCell> Acciones </TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody >
                    {users.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        marginRight: '8px'
                                    }}
                                    src={`https://unavatar.io/github/${item.github}`}
                                    alt={item.name}
                                />
                                {item.name}
                            </TableCell>
                            <TableCell >{item.email}</TableCell>
                            <TableCell>
                                <button type='button' onClick={() => setTooltip(item.id)}>
                                    {tooltip === item.id &&
                                        <div className='absolute z-50 w-[100%] h-[200%] bg-slate-800 left-0 top-0 cursor-default flex flex-col justify-center space-y-10'>
                                            <strong className='text-white text-2xl'>Editando Usuario {item.name}</strong>
                                            <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-5'>
                                                <div className='flex flex-col'>
                                                    <label className='text-white text-left'>Nombre</label>
                                                    <input defaultValue={item.name} name="nombre" className='w-72' type='text' placeholder='Ingrese nuevo nombre' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className='text-white text-left'>Correo</label>
                                                    <input defaultValue={item.email} name="correo" className='w-72' type='text' placeholder='Ingrese nuevo correo' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className='text-white text-left'>Usuario Github</label>
                                                    <input defaultValue={item.github} name="github" className='w-72' type='text' placeholder='Ingrese nuevo usuario github' />
                                                </div>
                                                <div className='flex gap-10'>
                                                    <button className='w-24 h-8 bg-slate-400 text-white' type='submit'>Guardar</button>
                                                    <button className='w-24 h-8 bg-red-600 text-white' onClick={() => setTooltip("")}>Cancelar</button>
                                                </div>
                                            </form>
                                        </div>}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                        />
                                    </svg>
                                </button>
                                <button onClick={() => removeUser(item.id)} type='button'>
                                    <svg
                                        aria-label='Remove element'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                        />
                                    </svg>
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card >
    )
}