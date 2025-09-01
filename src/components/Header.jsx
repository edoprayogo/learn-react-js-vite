export default function Header({author}){
  return <h1>Learn react with {author? author : 'Edo'}</h1>
}