export default function Format({ schema }) {
  return <pre className="XForm-Format">{JSON.stringify(schema, null, 2)}</pre>
}
