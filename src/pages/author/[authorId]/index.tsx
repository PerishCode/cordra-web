import './index.sass'

export default function ({
  match: {
    params: { authorId },
  },
}) {
  return <div className="page author-single container">{authorId}</div>
}
