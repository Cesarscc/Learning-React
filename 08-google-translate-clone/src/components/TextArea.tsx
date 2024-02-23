import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Introducir texto'
    if (loading === true) return 'Cargando...'
    return 'Traducción'
}



export const TextArea = ({ type, loading, value, onChange }: Props) => {



    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as={"textarea"}
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({ type, loading })}
            style={type === SectionType.From ? { border: 0, width: '300px', height: '200px', resize: 'none' } : { backgroundColor: '#f5f5f5' }}
            value={value}
            onChange={handleChange}
        />
    )
}