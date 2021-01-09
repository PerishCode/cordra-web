export default function Input({ schema, index }) {
  return (
    <input
      key={index}
      value={schema.data || ''}
      onChange={e => (schema.data = e.target.value)}
    />
  )
}
