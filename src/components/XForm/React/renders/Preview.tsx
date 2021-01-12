export default function ({ schema, index }) {
  return (
    <div className="XForm-Preview" key={index}>
      <span className="title">{schema.title || index}</span>
      <span className="content">{schema.data}</span>
    </div>
  )
}
