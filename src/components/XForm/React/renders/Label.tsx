export default function Label({ children, schema: { title }, index }) {
  return (
    <div className="XForm-Label" key={index}>
      <span className="title">{title}</span>
      <span className="content">{children}</span>
    </div>
  )
}
